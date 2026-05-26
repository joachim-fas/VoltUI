/**
 * Kalshi-Integration – Märkte holen und defensiv normalisieren.
 * Endpunkt-Pfad ist zentral; bei Doku-Änderung leicht anzupassen.
 * Kalshi liefert Preise typischerweise in Cents (1–99) → /100 = Wahrscheinlichkeit.
 */
import { kalshiGet } from "./client";
import type { KalshiMarket } from "./types";

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function pickYesPriceFromCents(raw: Record<string, unknown>): number {
  const bid = num(raw.yes_bid);
  const ask = num(raw.yes_ask);
  if (bid > 0 && ask > 0) return ((bid + ask) / 2) / 100;
  const last = num(raw.last_price);
  if (last > 0) return last / 100;
  return 0;
}

export function normalizeMarket(raw: Record<string, unknown>): KalshiMarket {
  return {
    ticker: String(raw.ticker ?? raw.market_ticker ?? ""),
    title: String(raw.title ?? raw.subtitle ?? ""),
    yesPrice: pickYesPriceFromCents(raw),
    status: String(raw.status ?? ""),
    closeTime: raw.close_time ? String(raw.close_time) : null,
  };
}

export async function getMarkets(opts?: { limit?: number; status?: string }): Promise<KalshiMarket[]> {
  const raw = await kalshiGet<unknown>("/trade-api/v2/markets", {
    limit: opts?.limit ?? 100,
    status: opts?.status ?? "open",
  });
  const list = (raw as { markets?: unknown[] })?.markets ?? (Array.isArray(raw) ? (raw as unknown[]) : []);
  return list
    .map((m) => normalizeMarket(m as Record<string, unknown>))
    .filter((m) => m.ticker.length > 0 && m.yesPrice > 0);
}
