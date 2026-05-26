import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { themeRouter } from "./themeRouter";
import { themeTransformRouter } from "./themeTransformRouter";
import { tokenRouter } from "./tokenRouter";
import { bitpandaRouter } from "./bitpanda/router";
import { polymarketRouter } from "./polymarket/router";
import { kalshiRouter } from "./kalshi/router";
import { crossVenueRouter } from "./_quotes/router";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  theme: themeRouter,
  themeTransform: themeTransformRouter,
  githubToken: tokenRouter,
  bitpanda: bitpandaRouter,
  polymarket: polymarketRouter,
  kalshi: kalshiRouter,
  crossVenue: crossVenueRouter,
});

export type AppRouter = typeof appRouter;
