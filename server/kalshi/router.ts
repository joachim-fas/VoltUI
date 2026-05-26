/** Kalshi-Integration – tRPC-Router (read-only). */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import * as service from "./service";

export const kalshiRouter = router({
  markets: publicProcedure
    .input(z.object({
      limit: z.number().int().min(1).max(500).optional(),
      status: z.string().optional(),
    }).optional())
    .query(({ input }) => service.getMarkets(input)),
});
