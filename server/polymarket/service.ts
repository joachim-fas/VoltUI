/** Polymarket-Integration – Märkte holen & defensiv normalisieren. */
import { gammaGet } from "./client";
import type { PolyMarket } from "./types";

/** Felder der Gamma-API kommen teils als JSON-Strings – tolerant parsen. */
function parseStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (typeof v === "string") {
    try { const a = JSON.parse(v); return Array.isArray(a) ? a.map((x) => String(x)) : []; } catch { return []; }
  }
  return [];
}

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function normalizeMarket(raw: Record<string, unknown>): PolyMarket {
  const outcomes = parseStringArray(raw.outcomes);
  const prices = parseStringArray(raw.outcomePrices).map((p) => num(p));
  return {
    id: String(raw.id ?? raw.conditionId ?? raw.slug ?? ""),
    question: String(raw.question ?? raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    outcomes,
    prices,
    volume: num(raw.volume ?? raw.volumeNum),
    liquidity: num(raw.liquidity ?? raw.liquidityNum),
    endDate: raw.endDate ? String(raw.endDate) : null,
    closed: Boolean(raw.closed),
  };
}

export async function getMarkets(opts?: { limit?: number }): Promise<PolyMarket[]> {
  const raw = await gammaGet<unknown>("/markets", {
    closed: false,
    active: true,
    limit: opts?.limit ?? 100,
    order: "volume",
    ascending: false,
  });
  const list = Array.isArray(raw) ? raw : [];
  return list
    .map((m) => normalizeMarket(m as Record<string, unknown>))
    .filter((m) => m.prices.length >= 2 && m.question.length > 0);
}
