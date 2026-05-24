/**
 * Bitpanda-Integration – Guardrails.
 * Bewertet eine Order, BEVOR sie gesendet würde. Diese Schicht ist der Grund,
 * warum nichts versehentlich autonom mit echtem Geld passiert.
 */

import { BITPANDA } from "./config";
import type { OrderCheck, PlaceOrderInput } from "./types";

/** Nur die Felder, die die Guardrails brauchen – injizierbar für Tests. */
export interface SafetyConfig {
  killSwitch: boolean;
  tradingEnabled: boolean;
  dryRun: boolean;
  maxOrderEur: number;
  dailyLimitEur: number;
}

/** Laufzeit-Zustand, der nicht aus der Config kommt. */
export interface SafetyRuntime {
  paused: boolean;
  spentTodayEur: number;
}

export function evaluateOrder(
  input: PlaceOrderInput,
  estimatedEur: number | null,
  cfg: SafetyConfig = BITPANDA,
  runtime: SafetyRuntime = { paused: false, spentTodayEur: 0 },
): OrderCheck {
  const warnings: string[] = [];
  const blockers: string[] = [];

  if (cfg.killSwitch) {
    blockers.push("Kill-Switch aktiv – alle Orders sind gesperrt.");
  }
  if (runtime.paused) {
    blockers.push("Not-Pause aktiv – Orders sind angehalten.");
  }
  if (!cfg.tradingEnabled) {
    blockers.push("Trading ist deaktiviert (BITPANDA_TRADING_ENABLED=false).");
  }
  if (input.type === "LIMIT" && !input.price) {
    blockers.push("Limit-Order benötigt einen Preis.");
  }
  if (Number(input.amount) <= 0) {
    blockers.push("Menge muss größer als 0 sein.");
  }
  if (estimatedEur !== null && estimatedEur > cfg.maxOrderEur) {
    blockers.push(
      `Order-Gegenwert ~ ${estimatedEur.toFixed(2)} € überschreitet das Limit von ${cfg.maxOrderEur} € (BITPANDA_MAX_ORDER_EUR).`,
    );
  }
  if (estimatedEur !== null && runtime.spentTodayEur + estimatedEur > cfg.dailyLimitEur) {
    blockers.push(
      `Tageslimit überschritten: heute ~ ${runtime.spentTodayEur.toFixed(2)} € + ${estimatedEur.toFixed(2)} € > ${cfg.dailyLimitEur} € (BITPANDA_DAILY_LIMIT_EUR).`,
    );
  }
  if (estimatedEur === null) {
    warnings.push("EUR-Gegenwert konnte nicht geschätzt werden – Limit-Prüfung übersprungen.");
  }
  if (cfg.dryRun) {
    warnings.push("Dry-Run aktiv – es wird KEINE echte Order an Bitpanda gesendet.");
  }

  return { allowed: blockers.length === 0, warnings, blockers };
}
