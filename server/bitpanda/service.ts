/**
 * Bitpanda-Integration – High-Level-Service.
 * Read-only-Methoden (Balances, Ticker) sowie der Order-Pfad, der IMMER erst
 * durch die Guardrails läuft. placeOrder sendet nur, wenn alle Schalter es
 * erlauben UND Dry-Run aus ist – sonst wird die Order nur simuliert.
 */

import { BITPANDA, ENDPOINTS } from "./config";
import { bitpandaGet, bitpandaPost, bitpandaDelete } from "./client";
import { evaluateOrder } from "./safety";
import * as store from "./store";
import type {
  Balance, Ticker, PlaceOrderInput, OrderResult, OrderPreview, OrderOutcome, OpenOrder,
} from "./types";

function safetyRuntime() {
  return { paused: store.isPaused(), spentTodayEur: store.getSpentToday() };
}

export function getBalances(): Promise<Balance[]> {
  return bitpandaGet<Balance[]>(ENDPOINTS.balances, true);
}

/**
 * Normalisiert die Orders-Antwort defensiv. Die genaue Form bitte gegen deine
 * Bitpanda-Doku abgleichen – wir lesen die gängigen Felder tolerant aus.
 */
function normalizeOrders(raw: unknown): OpenOrder[] {
  const r = raw as Record<string, unknown> | unknown[];
  const list: unknown[] = Array.isArray(r)
    ? r
    : Array.isArray((r as Record<string, unknown>)?.order_history)
      ? ((r as Record<string, unknown>).order_history as unknown[])
      : Array.isArray((r as Record<string, unknown>)?.orders)
        ? ((r as Record<string, unknown>).orders as unknown[])
        : [];

  return list
    .map((item) => {
      const wrap = item as Record<string, unknown>;
      const o = (wrap.order ?? wrap) as Record<string, unknown>;
      return {
        order_id: String(o.order_id ?? o.id ?? ""),
        instrument_code: String(o.instrument_code ?? ""),
        side: String(o.side ?? ""),
        type: String(o.type ?? ""),
        amount: String(o.amount ?? ""),
        price: o.price !== undefined ? String(o.price) : undefined,
        filled_amount: o.filled_amount !== undefined ? String(o.filled_amount) : undefined,
        status: o.status !== undefined ? String(o.status) : undefined,
      } as OpenOrder;
    })
    .filter((o) => o.order_id.length > 0);
}

export async function getOpenOrders(): Promise<OpenOrder[]> {
  const raw = await bitpandaGet<unknown>(ENDPOINTS.orders, true);
  return normalizeOrders(raw);
}

/**
 * Storniert eine bestehende Order. Stornieren reduziert Risiko, daher nicht an
 * den Trading-Schalter gekoppelt – es braucht aber einen Key und (im Router)
 * eine ausdrückliche Bestätigung.
 */
export async function cancelOrder(orderId: string): Promise<{ ok: boolean; message: string }> {
  await bitpandaDelete<unknown>(ENDPOINTS.order(orderId), true);
  return { ok: true, message: `Order ${orderId} storniert.` };
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
    check: evaluateOrder(input, estimatedEur, BITPANDA, safetyRuntime()),
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

  // Tagesausgaben für das Tageslimit mitzählen (nur echte Sends mit EUR-Wert).
  if (preview.estimatedEur !== null) store.addSpend(preview.estimatedEur);

  return {
    ...preview,
    executed: true,
    result,
    message: `Order gesendet (Status: ${result?.status ?? "unbekannt"}).`,
  };
}
