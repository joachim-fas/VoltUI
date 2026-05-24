/**
 * Bitpanda-Integration – Alert-Engine.
 * Pollt periodisch Kurse (und – falls Allokations-Regeln existieren – Balances),
 * wertet die Regeln aus und erzeugt Entscheidungs-Alerts. Es wird NICHTS
 * gehandelt: ein Alert ist nur eine Benachrichtigung, dass DU entscheiden solltest.
 */

import { BITPANDA } from "./config";
import { getTicker, getBalances } from "./service";
import * as store from "./store";
import type { AlertRule, Comparator } from "./store";
import type { Ticker } from "./types";

function compare(c: Comparator, observed: number, threshold: number): boolean {
  return c === "ABOVE" ? observed >= threshold : observed <= threshold;
}

async function buildPriceMap(): Promise<Map<string, number>> {
  const t = await getTicker();
  const arr = Array.isArray(t) ? t : [t];
  return new Map(arr.map((x: Ticker) => [x.instrument_code, Number(x.last_price)]));
}

async function computeAllocations(priceMap: Map<string, number>): Promise<Map<string, number>> {
  const balances = await getBalances();
  const quote = BITPANDA.quoteCurrency;
  const valued = balances.map((b) => {
    const cur = b.currency_code.toUpperCase();
    const amount = Number(b.available) + Number(b.locked);
    const price = cur === quote ? 1 : priceMap.get(`${cur}_${quote}`);
    return { cur, value: price != null && Number.isFinite(price) ? amount * price : 0 };
  });
  const total = valued.reduce((s, v) => s + v.value, 0);
  const map = new Map<string, number>();
  if (total > 0) for (const v of valued) map.set(v.cur, (v.value / total) * 100);
  return map;
}

function describe(rule: AlertRule, observed: number) {
  const dir = rule.comparator === "ABOVE" ? "über" : "unter";
  if (rule.type === "PRICE") {
    return {
      title: `${rule.target}: Kurs ${dir} ${rule.value}`,
      detail: `Aktueller Kurs ${observed.toFixed(2)} liegt ${dir} deiner Schwelle ${rule.value}. Zeit, zu entscheiden.`,
    };
  }
  return {
    title: `${rule.target}: Allokation ${dir} ${rule.value}%`,
    detail: `Aktuelle Allokation ${observed.toFixed(1)}% liegt ${dir} deiner Schwelle ${rule.value}%. Zeit, zu entscheiden.`,
  };
}

let evaluating = false;
let timer: ReturnType<typeof setInterval> | null = null;

export async function evaluateOnce(): Promise<{ checked: number; triggered: number }> {
  if (evaluating) return { checked: 0, triggered: 0 };
  evaluating = true;
  try {
    const rules = store.getEnabledRules();
    if (rules.length === 0) return { checked: 0, triggered: 0 };

    const now = Date.now();
    const cooldownMs = BITPANDA.alertCooldownMin * 60_000;

    let priceMap = new Map<string, number>();
    try {
      priceMap = await buildPriceMap();
    } catch (e) {
      console.warn("[bitpanda] Kurse für Alerts nicht abrufbar:", (e as Error).message);
    }

    let allocMap: Map<string, number> | null = null;
    if (rules.some((r) => r.type === "ALLOCATION")) {
      try {
        allocMap = await computeAllocations(priceMap);
      } catch (e) {
        console.warn("[bitpanda] Allokation für Alerts nicht berechenbar:", (e as Error).message);
      }
    }

    let triggered = 0;
    for (const rule of rules) {
      if (rule.lastTriggeredAt && now - rule.lastTriggeredAt < cooldownMs) continue;

      const observed = rule.type === "PRICE"
        ? priceMap.get(rule.target)
        : allocMap?.get(rule.target.toUpperCase());

      if (observed === undefined || !Number.isFinite(observed)) continue;

      if (compare(rule.comparator, observed, rule.value)) {
        const { title, detail } = describe(rule, observed);
        store.addAlert({
          ruleId: rule.id,
          type: rule.type,
          title,
          detail,
          target: rule.target,
          observedValue: observed,
          comparator: rule.comparator,
          threshold: rule.value,
        });
        store.markTriggered(rule.id, now);
        triggered++;
      }
    }

    return { checked: rules.length, triggered };
  } finally {
    evaluating = false;
  }
}

export function startAlertEngine(): void {
  const sec = BITPANDA.alertPollSec;
  if (!sec || sec <= 0) {
    console.log("[bitpanda] Alert-Engine deaktiviert (BITPANDA_ALERT_POLL_SEC=0).");
    return;
  }
  if (timer) return;
  console.log(`[bitpanda] Alert-Engine aktiv – prüft alle ${sec}s.`);
  timer = setInterval(() => {
    evaluateOnce().catch((e) => console.warn("[bitpanda] Alert-Auswertung fehlgeschlagen:", e.message));
  }, sec * 1000);
  // Hält den Prozess nicht künstlich am Leben.
  if (typeof timer.unref === "function") timer.unref();
}
