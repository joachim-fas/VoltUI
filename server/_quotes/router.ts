/**
 * Cross-Venue-Router: holt Quoten von beiden Venues, matched per Titel und
 * rankt Divergenzen. Read-only.
 */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getMarkets as getPoly } from "../polymarket/service";
import { getMarkets as getKalshi } from "../kalshi/service";
import { scanCrossVenue } from "./matcher";
import type { CrossVenueQuote } from "./types";

function polyToQuotes(arr: Awaited<ReturnType<typeof getPoly>>): CrossVenueQuote[] {
  return arr
    .map((m) => ({ venue: "polymarket" as const, id: m.id, title: m.question, yesPrice: m.prices[0] ?? 0, liquidity: m.liquidity, endDate: m.endDate }))
    .filter((q) => q.yesPrice > 0 && q.yesPrice < 1);
}

function kalshiToQuotes(arr: Awaited<ReturnType<typeof getKalshi>>): CrossVenueQuote[] {
  return arr
    .map((m) => ({ venue: "kalshi" as const, id: m.ticker, title: m.title, yesPrice: m.yesPrice, endDate: m.closeTime }))
    .filter((q) => q.yesPrice > 0 && q.yesPrice < 1);
}

export const crossVenueRouter = router({
  /** Holt beide Venues, matched per Titel und rankt nach Marge nach Gebühren. */
  scan: publicProcedure
    .input(z.object({
      limit: z.number().int().min(1).max(500).optional(),
      feePct: z.number().min(0).max(100).optional(),
    }).optional())
    .query(async ({ input }) => {
      const limit = input?.limit ?? 200;
      const fee = input?.feePct ?? 0;
      const [polyRes, kalshiRes] = await Promise.allSettled([getPoly({ limit }), getKalshi({ limit })]);
      const errors: string[] = [];
      const polyQuotes = polyRes.status === "fulfilled" ? polyToQuotes(polyRes.value) : (errors.push(`Polymarket: ${polyRes.reason?.message ?? "Fehler"}`), [] as CrossVenueQuote[]);
      const kalshiQuotes = kalshiRes.status === "fulfilled" ? kalshiToQuotes(kalshiRes.value) : (errors.push(`Kalshi: ${kalshiRes.reason?.message ?? "Fehler"}`), [] as CrossVenueQuote[]);
      const matches = scanCrossVenue(polyQuotes, kalshiQuotes, fee);
      return {
        sources: { polymarket: polyQuotes.length, kalshi: kalshiQuotes.length },
        matched: matches.length,
        opportunities: matches,
        errors,
      };
    }),
});
