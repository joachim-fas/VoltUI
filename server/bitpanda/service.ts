/**
 * Bitpanda-Integration – High-Level-Service.
 * Read-only-Methoden (Balances, Ticker) sowie der Order-Pfad, der IMMER erst
 * durch die Guardrails läuft. placeOrder sendet nur, wenn alle Schalter es
 * erlauben UND Dry-Run aus ist – sonst wird die Order nur simuliert.
 */

import { BITPANDA, ENDPOINTS } from "./config";
import { bitpandaGet, bitpandaPost } from "./client";
import { evaluateOrder } from "./safety";
import type {
  Balance, Ticker, PlaceOrderInput, OrderResult, OrderPreview, OrderOutcome,
} from "./types";

export function getBalances(): Promise<Balance[]> {
  return bitpandaGet<Balance[]>(ENDPOINTS.balances, true);
}

export function getTicker(instrumentCode?: string): Promise<Ticker | Ticker[]> {
  return instrumentCode
    ? bitpandaGet<Ticker>(ENDPOINTS.tickerOne(instrumentCode))
    : bitpandaGet<Ticker[]>(ENDPOINTS.ticker);
}

/**
 * Schätzt den EUR-Gegenwert einer Order. Bei LIMIT der angegebene Preis,
 * bei MARKET der aktuelle Ticker-Preis. Gibt null zurück, wenn nicht ermittelbar.
 */
async function estimateEur(input: PlaceOrderInput): Promise<number | null> {
  const amount = Number(input.amount);
  if (!Number.isFinite(amount)) return null;

  let unitPrice = input.price ? Number(input.price) : NaN;
  if (!Number.isFinite(unitPrice)) {
    try {
      const t = (await getTicker(input.instrument_code)) as Ticker;
      unitPrice = Number(t?.last_price);
    } catch {
      return null;
    }
  }
  if (!Number.isFinite(unitPrice)) return null;

  // Nur sinnvoll, wenn gegen die konfigurierte Quote-Währung (z. B. *_EUR) gehandelt wird.
  const quotesInEur = input.instrument_code.toUpperCase().endsWith(`_${BITPANDA.quoteCurrency}`);
  return quotesInEur ? amount * unitPrice : null;
}

export async function previewOrder(input: PlaceOrderInput): Promise<OrderPreview> {
  const estimatedEur = await estimateEur(input);
  return {
    request: input,
    estimatedEur,
    dryRun: BITPANDA.dryRun,
    check: evaluateOrder(input, estimatedEur),
  };
}

/**
 * Führt eine Order aus – aber nur, wenn die Guardrails sie erlauben und
 * Dry-Run aus ist. In allen anderen Fällen wird sie blockiert oder simuliert.
 * Diese Funktion wird vom Router nur mit ausdrücklicher Bestätigung aufgerufen.
 */
export async function placeOrder(input: PlaceOrderInput): Promise<OrderOutcome> {
  const preview = await previewOrder(input);

  if (!preview.check.allowed) {
    return {
      ...preview,
      executed: false,
      message: `Order blockiert: ${preview.check.blockers.join(" ")}`,
    };
  }

  if (BITPANDA.dryRun) {
    return {
      ...preview,
      executed: false,
      message: "Dry-Run: Order wurde simuliert, nicht gesendet.",
    };
  }

  const result = await bitpandaPost<OrderResult>(ENDPOINTS.orders, {
    instrument_code: input.instrument_code,
    side: input.side,
    type: input.type,
    amount: input.amount,
    ...(input.type === "LIMIT" ? { price: input.price } : {}),
  });

  return {
    ...preview,
    executed: true,
    result,
    message: `Order gesendet (Status: ${result?.status ?? "unbekannt"}).`,
  };
}
