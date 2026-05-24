/**
 * Bitpanda-Integration – tRPC-Router.
 *
 * SICHERHEIT: Diese Prozeduren sind publicProcedure (passend zu diesem Repo)
 * und für den lokalen Eigenbetrieb gedacht. Wird das Tool je öffentlich
 * deployt, sollten balances/placeOrder auf protectedProcedure umgestellt werden.
 *
 * placeOrder verlangt confirm:true – ein autonomer Aufruf ohne ausdrückliche
 * Bestätigung ist damit auf API-Ebene nicht möglich.
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { BITPANDA, hasApiKey } from "./config";
import * as service from "./service";
import * as store from "./store";
import { evaluateOnce } from "./alerts";

const orderInput = z.object({
  instrument_code: z.string().min(3),
  side: z.enum(["BUY", "SELL"]),
  type: z.enum(["MARKET", "LIMIT"]),
  amount: z.string().min(1),
  price: z.string().optional(),
});

export const bitpandaRouter = router({
  /** Sicherheits-/Konfigurationsstatus (ohne den Key offenzulegen). */
  status: publicProcedure.query(() => ({
    hasApiKey: hasApiKey(),
    tradingEnabled: BITPANDA.tradingEnabled,
    dryRun: BITPANDA.dryRun,
    killSwitch: BITPANDA.killSwitch,
    maxOrderEur: BITPANDA.maxOrderEur,
    quoteCurrency: BITPANDA.quoteCurrency,
    baseUrl: BITPANDA.baseUrl,
  })),

  /** Kontostände (read-only, braucht API-Key). */
  balances: publicProcedure.query(() => service.getBalances()),

  /** Marktpreise (öffentlich). Optional einzelnes Instrument. */
  ticker: publicProcedure
    .input(z.object({ instrumentCode: z.string().optional() }).optional())
    .query(({ input }) => service.getTicker(input?.instrumentCode)),

  /** Offene Orders (read-only, braucht API-Key). */
  openOrders: publicProcedure.query(() => service.getOpenOrders()),

  /** Order stornieren. confirm:true ist Pflicht (menschliche Bestätigung). */
  cancelOrder: publicProcedure
    .input(z.object({ orderId: z.string().min(1), confirm: z.literal(true) }))
    .mutation(({ input }) => service.cancelOrder(input.orderId)),

  /** Order-Vorschau inkl. Guardrail-Prüfung – sendet nichts. */
  previewOrder: publicProcedure
    .input(orderInput)
    .mutation(({ input }) => service.previewOrder(input)),

  /**
   * Order ausführen. confirm:true ist Pflicht (menschliche Bestätigung).
   * Sendet nur, wenn Guardrails erlauben UND Dry-Run aus ist – sonst Simulation.
   */
  placeOrder: publicProcedure
    .input(orderInput.extend({ confirm: z.literal(true) }))
    .mutation(({ input }) => {
      const { confirm, ...order } = input;
      void confirm;
      return service.placeOrder(order);
    }),

  /* ── Alert-Regeln & ausgelöste Alerts ── */

  listRules: publicProcedure.query(() => store.listRules()),

  createRule: publicProcedure
    .input(z.object({
      type: z.enum(["PRICE", "ALLOCATION"]),
      target: z.string().min(2),
      comparator: z.enum(["ABOVE", "BELOW"]),
      value: z.number().positive(),
      note: z.string().optional(),
    }))
    .mutation(({ input }) => store.createRule({ ...input, target: input.target.toUpperCase() })),

  deleteRule: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ input }) => { store.deleteRule(input.id); return { ok: true }; }),

  toggleRule: publicProcedure
    .input(z.object({ id: z.string().min(1), enabled: z.boolean() }))
    .mutation(({ input }) => store.toggleRule(input.id, input.enabled)),

  listAlerts: publicProcedure.query(() => store.listAlerts()),

  dismissAlert: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ input }) => { store.dismissAlert(input.id); return { ok: true }; }),

  clearAlerts: publicProcedure.mutation(() => { store.clearAlerts(); return { ok: true }; }),

  /** Regeln sofort prüfen (zusätzlich zum Hintergrund-Polling). */
  evaluateNow: publicProcedure.mutation(() => evaluateOnce()),
});
