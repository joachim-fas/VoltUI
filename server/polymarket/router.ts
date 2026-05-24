/**
 * Polymarket-Integration – tRPC-Router (read-only).
 * Liest Marktdaten und rechnet Arbitrage/Edge. Es werden NIE Wetten platziert –
 * Funding und Ausführung liegen ausschließlich beim Nutzer.
 */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { POLYMARKET } from "./config";
import { getMarkets } from "./service";
import { scanArbitrage, evaluateBet } from "./scanner";
import { crossVenueArb } from "./crossvenue";

export const polymarketRouter = router({
  /** Aktive Märkte mit Preisen (= implizite Wahrscheinlichkeiten). */
  markets: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(500).optional() }).optional())
    .query(({ input }) => getMarkets({ limit: input?.limit })),

  /** Arbitrage-Scan: Märkte, deren Preissumme von 1 abweicht. */
  scan: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(500).optional(), tolerancePct: z.number().min(0).max(20).optional() }).optional())
    .query(async ({ input }) => {
      const markets = await getMarkets({ limit: input?.limit ?? 200 });
      return scanArbitrage(markets, input?.tolerancePct ?? POLYMARKET.arbTolerancePct);
    }),

  /** Edge-Evaluator: deine Wahrscheinlichkeit vs. Marktpreis → EV & Kelly. */
  evaluate: publicProcedure
    .input(z.object({ price: z.number().min(0).max(1), myProb: z.number().min(0).max(1) }))
    .mutation(({ input }) => evaluateBet(input.price, input.myProb)),

  /** Cross-Venue-Arbitrage: YES-Preis desselben Events auf zwei Börsen. */
  crossVenue: publicProcedure
    .input(z.object({
      yesA: z.number().min(0).max(1),
      yesB: z.number().min(0).max(1),
      feePct: z.number().min(0).max(100).optional(),
    }))
    .mutation(({ input }) => crossVenueArb(input.yesA, input.yesB, input.feePct ?? 0)),
});
