import { describe, expect, it } from "vitest";
import { evaluateOrder, type SafetyConfig } from "./safety";
import { evaluateRules } from "./alerts";
import { stepStrategy } from "./sandbox";
import { simulate, makeRandomSeries, sweep, defaultGrid, makePaths, walkForward, incomeAnalysis, edgeRequirement } from "./backtest";
import type { AlertRule, SandboxState, SandboxConfig } from "./store";
import type { PlaceOrderInput } from "./types";

const allowCfg: SafetyConfig = { killSwitch: false, tradingEnabled: true, dryRun: false, maxOrderEur: 100, dailyLimitEur: 500 };

const order = (over: Partial<PlaceOrderInput> = {}): PlaceOrderInput => ({
  instrument_code: "BTC_EUR", side: "BUY", type: "LIMIT", amount: "0.001", price: "60000", ...over,
});

describe("evaluateOrder (Guardrails)", () => {
  it("erlaubt eine gültige Order, wenn alle Schalter passen", () => {
    const c = evaluateOrder(order(), 60, allowCfg);
    expect(c.allowed).toBe(true);
    expect(c.blockers).toHaveLength(0);
  });

  it("blockt, wenn Trading deaktiviert ist", () => {
    const c = evaluateOrder(order(), 60, { ...allowCfg, tradingEnabled: false });
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("Trading ist deaktiviert"))).toBe(true);
  });

  it("blockt bei aktivem Kill-Switch", () => {
    const c = evaluateOrder(order(), 60, { ...allowCfg, killSwitch: true });
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("Kill-Switch"))).toBe(true);
  });

  it("blockt, wenn der Gegenwert über dem Limit liegt", () => {
    const c = evaluateOrder(order(), 600, allowCfg);
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("überschreitet das Limit"))).toBe(true);
  });

  it("blockt eine Limit-Order ohne Preis", () => {
    const c = evaluateOrder(order({ price: undefined }), 60, allowCfg);
    expect(c.blockers.some((b) => b.includes("benötigt einen Preis"))).toBe(true);
  });

  it("blockt nicht-positive Mengen", () => {
    const c = evaluateOrder(order({ amount: "0" }), 60, allowCfg);
    expect(c.blockers.some((b) => b.includes("größer als 0"))).toBe(true);
  });

  it("dry-run blockt nicht, warnt aber", () => {
    const c = evaluateOrder(order(), 60, { ...allowCfg, dryRun: true });
    expect(c.allowed).toBe(true);
    expect(c.warnings.some((w) => w.includes("Dry-Run"))).toBe(true);
  });

  it("warnt, wenn der EUR-Gegenwert unbekannt ist", () => {
    const c = evaluateOrder(order(), null, allowCfg);
    expect(c.warnings.some((w) => w.includes("nicht geschätzt"))).toBe(true);
  });

  it("blockt bei aktiver Not-Pause", () => {
    const c = evaluateOrder(order(), 60, allowCfg, { paused: true, spentTodayEur: 0 });
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("Not-Pause"))).toBe(true);
  });

  it("blockt, wenn das Tageslimit überschritten würde", () => {
    const c = evaluateOrder(order(), 60, allowCfg, { paused: false, spentTodayEur: 480 });
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("Tageslimit"))).toBe(true);
  });

  it("erlaubt, wenn das Tageslimit noch nicht erreicht ist", () => {
    const c = evaluateOrder(order(), 60, allowCfg, { paused: false, spentTodayEur: 100 });
    expect(c.allowed).toBe(true);
  });
});

const rule = (over: Partial<AlertRule> = {}): AlertRule => ({
  id: "r1", type: "PRICE", target: "BTC_EUR", comparator: "BELOW", value: 60000,
  enabled: true, createdAt: 0, ...over,
});

describe("evaluateRules (Alert-Auswertung)", () => {
  const now = 1_000_000;
  const cooldown = 60 * 60_000;

  it("löst eine PRICE/BELOW-Regel aus, wenn der Kurs darunter liegt", () => {
    const m = evaluateRules([rule()], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(m).toHaveLength(1);
    expect(m[0].alert.observedValue).toBe(50000);
    expect(m[0].alert.threshold).toBe(60000);
  });

  it("löst NICHT aus, wenn der Kurs über der Schwelle liegt", () => {
    const m = evaluateRules([rule()], new Map([["BTC_EUR", 70000]]), null, now, cooldown);
    expect(m).toHaveLength(0);
  });

  it("löst eine PRICE/ABOVE-Regel korrekt aus", () => {
    const m = evaluateRules([rule({ comparator: "ABOVE", value: 65000 })], new Map([["BTC_EUR", 70000]]), null, now, cooldown);
    expect(m).toHaveLength(1);
  });

  it("ignoriert deaktivierte Regeln", () => {
    const m = evaluateRules([rule({ enabled: false })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(m).toHaveLength(0);
  });

  it("respektiert den Cooldown", () => {
    const recent = evaluateRules([rule({ lastTriggeredAt: now - 1000 })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(recent).toHaveLength(0);
    const old = evaluateRules([rule({ lastTriggeredAt: now - cooldown - 1 })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(old).toHaveLength(1);
  });

  it("wertet ALLOCATION-Regeln gegen die Allokations-Map aus", () => {
    const r = rule({ type: "ALLOCATION", target: "SOL", comparator: "ABOVE", value: 10 });
    const m = evaluateRules([r], new Map(), new Map([["SOL", 12]]), now, cooldown);
    expect(m).toHaveLength(1);
    expect(m[0].alert.type).toBe("ALLOCATION");
  });

  it("löst nicht aus, wenn der Zielwert fehlt", () => {
    const m = evaluateRules([rule({ target: "ETH_EUR" })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(m).toHaveLength(0);
  });
});

const sandbox = (over: Partial<SandboxState> = {}): SandboxState => ({
  enabled: true, startCash: 1000, cash: 1000,
  position: { amount: 0, avgEntry: 0 },
  referenceHigh: 0, referenceLow: 0, lastPrice: null,
  config: { instrument: "BTC_EUR", strategy: "DIP_BUY", tradeEur: 50, dipPct: 3, takeProfitPct: 8, stopLossPct: 10 },
  trades: [], startedAt: 0, ...over,
});

describe("stepStrategy (Paper-Trading-Sandbox)", () => {
  it("kauft bei ausreichendem Dip unter dem nachlaufenden Hoch", () => {
    const { state, trade } = stepStrategy(sandbox({ referenceHigh: 100 }), 96, 1);
    expect(trade?.side).toBe("BUY");
    expect(state.cash).toBeCloseTo(950);
    expect(state.position.amount).toBeCloseTo(50 / 96);
    expect(state.position.avgEntry).toBe(96);
  });

  it("kauft nicht bei zu kleinem Dip", () => {
    const { trade } = stepStrategy(sandbox({ referenceHigh: 100 }), 99, 1);
    expect(trade).toBeNull();
  });

  it("kauft nicht ohne ausreichendes Guthaben", () => {
    const { trade } = stepStrategy(sandbox({ referenceHigh: 100, cash: 10 }), 96, 1);
    expect(trade).toBeNull();
  });

  it("verkauft bei Take-Profit", () => {
    const s = sandbox({ cash: 0, position: { amount: 1, avgEntry: 100 } });
    const { state, trade } = stepStrategy(s, 110, 1);
    expect(trade?.side).toBe("SELL");
    expect(trade?.reason).toBe("Take-Profit");
    expect(state.position.amount).toBe(0);
    expect(state.cash).toBeCloseTo(110);
  });

  it("verkauft bei Stop-Loss", () => {
    const s = sandbox({ cash: 0, position: { amount: 1, avgEntry: 100 } });
    const { state, trade } = stepStrategy(s, 85, 1);
    expect(trade?.side).toBe("SELL");
    expect(trade?.reason).toBe("Stop-Loss");
    expect(state.position.amount).toBe(0);
  });

  it("hält die Position im neutralen Bereich", () => {
    const s = sandbox({ cash: 0, referenceHigh: 100, position: { amount: 1, avgEntry: 100 } });
    const { trade } = stepStrategy(s, 100, 1);
    expect(trade).toBeNull();
  });

  it("MOMENTUM kauft beim Anstieg über das nachlaufende Tief", () => {
    const s = sandbox({ referenceLow: 100, config: { instrument: "BTC_EUR", strategy: "MOMENTUM", tradeEur: 50, dipPct: 3, takeProfitPct: 8, stopLossPct: 10 } });
    const { trade } = stepStrategy(s, 103, 1);
    expect(trade?.side).toBe("BUY");
    expect(trade?.reason).toContain("Momentum");
  });

  it("MOMENTUM kauft nicht bei zu schwachem Anstieg", () => {
    const s = sandbox({ referenceLow: 100, config: { instrument: "BTC_EUR", strategy: "MOMENTUM", tradeEur: 50, dipPct: 3, takeProfitPct: 8, stopLossPct: 10 } });
    const { trade } = stepStrategy(s, 101, 1);
    expect(trade).toBeNull();
  });
});

const cfg = (over: Partial<SandboxConfig> = {}): SandboxConfig =>
  ({ instrument: "BTC_EUR", strategy: "DIP_BUY", tradeEur: 100, dipPct: 3, takeProfitPct: 8, stopLossPct: 10, ...over });

describe("backtest (Effizienzgrenze)", () => {
  it("liefert 0 % Rendite und 0 Drawdown bei flachem Kurs", () => {
    const flat = new Array(50).fill(50000);
    const m = simulate(cfg(), flat);
    expect(m.finalReturnPct).toBeCloseTo(0);
    expect(m.maxDrawdownPct).toBeCloseTo(0);
    expect(m.trades).toBe(0);
  });

  it("erzeugt einen reproduzierbaren Kurspfad pro Seed", () => {
    expect(makeRandomSeries(1, 20)).toEqual(makeRandomSeries(1, 20));
    expect(makeRandomSeries(1, 20)).not.toEqual(makeRandomSeries(2, 20));
  });

  it("rankt den Sweep absteigend nach risikoadjustierter Leistung", () => {
    const results = sweep(defaultGrid(), makePaths(8, 60, 0.02));
    expect(results.length).toBe(defaultGrid().length);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].riskAdjusted).toBeGreaterThanOrEqual(results[i].riskAdjusted);
    }
  });

  it("walk-forward liefert In- und Out-of-Sample-Werte derselben Config", () => {
    const wf = walkForward({ paths: 20, vol: 0.025 });
    expect(wf.inSample.config).toEqual(wf.outOfSample.config);
    expect(Number.isFinite(wf.overfitGapPct)).toBe(true);
    expect(typeof wf.holdsUp).toBe("boolean");
  });

  it("income-Analyse liefert eine plausible Verteilung", () => {
    const r = incomeAnalysis(cfg(), { windows: 100, windowTicks: 24, vol: 0.03 });
    expect(r.windows).toBe(100);
    expect(r.worstPct).toBeLessThanOrEqual(r.medianReturnPct);
    expect(r.medianReturnPct).toBeLessThanOrEqual(r.bestPct);
    expect(r.profitablePct).toBeGreaterThanOrEqual(0);
    expect(r.profitablePct).toBeLessThanOrEqual(100);
  });
});

describe("edgeRequirement (Realitäts-Check)", () => {
  it("entlarvt 'täglich verdoppeln' als unmöglich (Trefferquote > 100%)", () => {
    const e = edgeRequirement(100, 10, 2); // +100%/Tag, 10 Trades, 2%-Moves
    expect(e.requiredWinRate).toBeGreaterThan(1);
    expect(e.feasible).toBe(false);
  });

  it("hält ein bescheidenes Ziel für machbar (Trefferquote in (0,1))", () => {
    const e = edgeRequirement(2, 10, 2); // +2%/Tag
    expect(e.requiredWinRate).toBeGreaterThan(0);
    expect(e.requiredWinRate).toBeLessThanOrEqual(1);
    expect(e.feasible).toBe(true);
  });

  it("unterscheidet 'nur mathematisch möglich' von 'realistisch'", () => {
    const theoretical = edgeRequirement(100, 50, 2); // verdoppeln mit vielen Trades
    expect(theoretical.feasible).toBe(true);    // Trefferquote <= 100%
    expect(theoretical.realistic).toBe(false);  // aber ~85% ist nicht plausibel
    const modest = edgeRequirement(1, 10, 2);
    expect(modest.realistic).toBe(true);
  });
});
