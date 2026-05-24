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
import { stepSandbox } from "./sandbox";
import { runSweep, walkForward, incomeAnalysis, edgeRequirement } from "./backtest";

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
    paused: store.isPaused(),
    maxOrderEur: BITPANDA.maxOrderEur,
    dailyLimitEur: BITPANDA.dailyLimitEur,
    spentTodayEur: store.getSpentToday(),
    quoteCurrency: BITPANDA.quoteCurrency,
    baseUrl: BITPANDA.baseUrl,
  })),

  /** Not-Pause umschalten (Laufzeit, persistent) – hält alle Orders an. */
  setPaused: publicProcedure
    .input(z.object({ paused: z.boolean() }))
    .mutation(({ input }) => {
      store.setPaused(input.paused);
      store.addJournal({ kind: "PAUSE", summary: input.paused ? "Not-Pause aktiviert" : "Not-Pause aufgehoben" });
      return { paused: input.paused };
    }),

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
    .mutation(async ({ input }) => {
      const res = await service.cancelOrder(input.orderId);
      store.addJournal({ kind: "CANCEL", summary: `Order ${input.orderId} storniert` });
      return res;
    }),

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
    .mutation(async ({ input }) => {
      const { confirm, ...order } = input;
      void confirm;
      const outcome = await service.placeOrder(order);
      store.addJournal({
        kind: "ORDER",
        summary: `${order.side} ${order.amount} ${order.instrument_code}${order.type === "LIMIT" ? ` @ ${order.price}` : ""}`,
        detail: outcome.message,
      });
      return outcome;
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
    .mutation(({ input }) => {
      const alert = store.listAlerts().find((a) => a.id === input.id);
      store.dismissAlert(input.id);
      if (alert) store.addJournal({ kind: "DISMISS", summary: `Alert verworfen: ${alert.title}` });
      return { ok: true };
    }),

  clearAlerts: publicProcedure.mutation(() => { store.clearAlerts(); return { ok: true }; }),

  /** Entscheidungs-Journal (Audit-Log). */
  listJournal: publicProcedure.query(() => store.listJournal()),

  /** Regeln sofort prüfen (zusätzlich zum Hintergrund-Polling). */
  evaluateNow: publicProcedure.mutation(() => evaluateOnce()),

  /* ── Paper-Trading-Sandbox ("Gamble-Mode" mit Spielgeld) ── */
  sandbox: router({
    get: publicProcedure.query(() => store.getSandbox()),

    configure: publicProcedure
      .input(z.object({
        instrument: z.string().min(3).optional(),
        strategy: z.enum(["DIP_BUY", "MOMENTUM"]).optional(),
        tradeEur: z.number().positive().optional(),
        dipPct: z.number().positive().optional(),
        takeProfitPct: z.number().positive().optional(),
        stopLossPct: z.number().positive().optional(),
        startCash: z.number().positive().optional(),
      }))
      .mutation(({ input }) => store.configureSandbox(input)),

    toggle: publicProcedure
      .input(z.object({ enabled: z.boolean() }))
      .mutation(({ input }) => store.setSandboxEnabled(input.enabled)),

    reset: publicProcedure.mutation(() => store.resetSandbox()),

    /** Einen Schritt mit echtem Live-Kurs ausführen (virtuell). */
    step: publicProcedure.mutation(() => stepSandbox()),

    /**
     * Parameter-Sweep: sucht die Effizienzgrenze (max. Rendite / min. Risiko)
     * über Monte-Carlo-Kurspfade. Reine Analyse, kein echtes Geld.
     */
    backtest: publicProcedure
      .input(z.object({
        instrument: z.string().min(3).optional(),
        tradeEur: z.number().positive().optional(),
        paths: z.number().int().min(1).max(200).optional(),
        vol: z.number().positive().max(0.2).optional(),
      }).optional())
      .mutation(({ input }) => {
        const ranked = runSweep(input);
        return { top: ranked.slice(0, 10), total: ranked.length };
      }),

    /** Walk-Forward: ehrlicher Out-of-Sample-Test gegen Overfitting. */
    walkForward: publicProcedure
      .input(z.object({
        instrument: z.string().min(3).optional(),
        tradeEur: z.number().positive().optional(),
        paths: z.number().int().min(2).max(200).optional(),
        vol: z.number().positive().max(0.2).optional(),
      }).optional())
      .mutation(({ input }) => walkForward(input)),

    /** Fixed-Stake-/Income-Verteilung der aktuellen Strategie (kein Compounding). */
    income: publicProcedure
      .input(z.object({
        windows: z.number().int().min(10).max(2000).optional(),
        windowTicks: z.number().int().min(4).max(500).optional(),
        vol: z.number().positive().max(0.2).optional(),
        stake: z.number().positive().optional(),
      }).optional())
      .mutation(({ input }) => incomeAnalysis(store.getSandbox().config, input)),

    /** Realitäts-Check: nötige Trefferquote für ein Tagesrenditeziel. */
    edgeCalc: publicProcedure
      .input(z.object({
        targetDailyReturnPct: z.number(),
        tradesPerDay: z.number().int().min(1).max(1000),
        moveSizePct: z.number().positive().max(100),
      }))
      .mutation(({ input }) => edgeRequirement(input.targetDailyReturnPct, input.tradesPerDay, input.moveSizePct)),
  }),
});
