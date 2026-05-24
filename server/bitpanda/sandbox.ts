/**
 * Bitpanda-Integration – Paper-Trading-Sandbox ("Gamble-Mode").
 * Führt eine regelbasierte Strategie gegen ECHTE Live-Kurse aus, aber auf
 * VIRTUELLEM Guthaben. Es wird niemals echtes Geld bewegt und keine Order an
 * Bitpanda gesendet. Reines Spielgeld zum Testen von Strategien.
 *
 * Strategie (Dip-Buy + Take-Profit/Stop-Loss):
 *  - Kauf, wenn der Kurs dipPct unter das nachlaufende Hoch fällt (und Cash da ist).
 *  - Verkauf der Position bei +takeProfitPct über dem Einstand oder −stopLossPct darunter.
 */

import { randomUUID } from "crypto";
import { getTicker } from "./service";
import * as store from "./store";
import type { SandboxState, SandboxTrade } from "./store";
import type { Ticker } from "./types";

export interface StepResult {
  state: SandboxState;
  trade: SandboxTrade | null;
}

function mkTrade(
  side: "BUY" | "SELL", instrument: string, price: number, amount: number, eur: number, reason: string, now: number,
): SandboxTrade {
  return { id: randomUUID(), at: now, side, instrument, price, amount, eur, reason };
}

/** Reine Strategie-Auswertung für einen Kurs-Tick – ohne I/O, gut testbar. */
export function stepStrategy(state: SandboxState, price: number, now: number): StepResult {
  if (!Number.isFinite(price) || price <= 0) return { state, trade: null };

  const s: SandboxState = {
    ...state,
    position: { ...state.position },
    config: { ...state.config },
    trades: state.trades,
  };
  const c = s.config;

  if (!s.referenceHigh || s.referenceHigh <= 0) s.referenceHigh = price;
  s.referenceHigh = Math.max(s.referenceHigh, price);
  s.lastPrice = price;

  const hasPosition = s.position.amount > 0;

  // 1) Verkauf prüfen (Take-Profit / Stop-Loss)
  if (hasPosition) {
    const takeProfit = s.position.avgEntry * (1 + c.takeProfitPct / 100);
    const stopLoss = s.position.avgEntry * (1 - c.stopLossPct / 100);
    if (price >= takeProfit || price <= stopLoss) {
      const eur = s.position.amount * price;
      s.cash += eur;
      const trade = mkTrade("SELL", c.instrument, price, s.position.amount, eur, price >= takeProfit ? "Take-Profit" : "Stop-Loss", now);
      s.position = { amount: 0, avgEntry: 0 };
      s.referenceHigh = price;
      s.trades = [trade, ...s.trades].slice(0, 200);
      return { state: s, trade };
    }
  }

  // 2) Kauf prüfen (Dip unter nachlaufendes Hoch)
  const buyTrigger = s.referenceHigh * (1 - c.dipPct / 100);
  if (price <= buyTrigger && s.cash >= c.tradeEur) {
    const amount = c.tradeEur / price;
    const newAmount = s.position.amount + amount;
    s.position.avgEntry = hasPosition
      ? (s.position.avgEntry * s.position.amount + price * amount) / newAmount
      : price;
    s.position.amount = newAmount;
    s.cash -= c.tradeEur;
    s.referenceHigh = price;
    const trade = mkTrade("BUY", c.instrument, price, amount, c.tradeEur, `Dip ≥ ${c.dipPct}%`, now);
    s.trades = [trade, ...s.trades].slice(0, 200);
    return { state: s, trade };
  }

  return { state: s, trade: null };
}

/** Ein Sandbox-Schritt mit echtem Live-Kurs (virtuelle Ausführung). */
export async function stepSandbox(): Promise<{ acted: boolean; price: number | null }> {
  const state = store.getSandbox();
  if (!state.enabled) return { acted: false, price: null };

  let price: number;
  try {
    const t = (await getTicker(state.config.instrument)) as Ticker;
    price = Number(t?.last_price);
  } catch (e) {
    console.warn("[bitpanda] Sandbox-Kurs nicht abrufbar:", (e as Error).message);
    return { acted: false, price: null };
  }
  if (!Number.isFinite(price)) return { acted: false, price: null };

  const { state: next, trade } = stepStrategy(state, price, Date.now());
  store.setSandbox(next);
  return { acted: trade !== null, price };
}
