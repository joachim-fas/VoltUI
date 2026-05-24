/**
 * Bitpanda-Integration – Guardrails.
 * Bewertet eine Order, BEVOR sie gesendet würde. Diese Schicht ist der Grund,
 * warum nichts versehentlich autonom mit echtem Geld passiert.
 */

import { BITPANDA } from "./config";
import type { OrderCheck, PlaceOrderInput } from "./types";

export function evaluateOrder(input: PlaceOrderInput, estimatedEur: number | null): OrderCheck {
  const warnings: string[] = [];
  const blockers: string[] = [];

  if (BITPANDA.killSwitch) {
    blockers.push("Kill-Switch aktiv – alle Orders sind gesperrt.");
  }
  if (!BITPANDA.tradingEnabled) {
    blockers.push("Trading ist deaktiviert (BITPANDA_TRADING_ENABLED=false).");
  }
  if (input.type === "LIMIT" && !input.price) {
    blockers.push("Limit-Order benötigt einen Preis.");
  }
  if (Number(input.amount) <= 0) {
    blockers.push("Menge muss größer als 0 sein.");
  }
  if (estimatedEur !== null && estimatedEur > BITPANDA.maxOrderEur) {
    blockers.push(
      `Order-Gegenwert ~ ${estimatedEur.toFixed(2)} € überschreitet das Limit von ${BITPANDA.maxOrderEur} € (BITPANDA_MAX_ORDER_EUR).`,
    );
  }
  if (estimatedEur === null) {
    warnings.push("EUR-Gegenwert konnte nicht geschätzt werden – Limit-Prüfung übersprungen.");
  }
  if (BITPANDA.dryRun) {
    warnings.push("Dry-Run aktiv – es wird KEINE echte Order an Bitpanda gesendet.");
  }

  return { allowed: blockers.length === 0, warnings, blockers };
}
