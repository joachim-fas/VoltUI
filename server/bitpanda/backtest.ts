/**
 * Bitpanda-Integration – Backtest & Parameter-Sweep.
 * Misst Strategien risikoadjustiert über viele (Monte-Carlo-)Kurspfade, um die
 * Effizienzgrenze zu finden: maximale Rendite bei minimalem Drawdown. Reine
 * Funktionen, kein I/O, kein echtes Geld – nur Analyse.
 */

import { stepStrategy } from "./sandbox";
import type { SandboxConfig, SandboxState } from "./store";

export interface BacktestMetrics {
  finalReturnPct: number;
  maxDrawdownPct: number; // <= 0
  trades: number;
  riskAdjusted: number;   // Rendite / |maxDrawdown| (Calmar-artig)
}

export function simulate(config: SandboxConfig, series: number[], startCash = 1000): BacktestMetrics {
  let state: SandboxState = {
    enabled: true, startCash, cash: startCash,
    position: { amount: 0, avgEntry: 0 }, referenceHigh: 0, referenceLow: 0, lastPrice: null,
    config, trades: [], startedAt: 0,
  };
  let peak = -Infinity;
  let maxDD = 0;
  for (const p of series) {
    state = stepStrategy(state, p, 0).state;
    const equity = state.cash + state.position.amount * p;
    peak = Math.max(peak, equity);
    if (peak > 0) maxDD = Math.min(maxDD, equity / peak - 1);
  }
  const last = series[series.length - 1];
  const finalEquity = state.cash + state.position.amount * last;
  const finalReturnPct = (finalEquity / startCash - 1) * 100;
  const maxDrawdownPct = maxDD * 100;
  const riskAdjusted = maxDrawdownPct < 0
    ? finalReturnPct / Math.abs(maxDrawdownPct)
    : (finalReturnPct > 0 ? Infinity : 0);
  return { finalReturnPct, maxDrawdownPct, trades: state.trades.length, riskAdjusted };
}

/** Deterministischer Random-Walk-Kurspfad (Monte Carlo via Seed). */
export function makeRandomSeries(seed: number, n = 90, start = 60000, vol = 0.02, drift = 0): number[] {
  let s = (seed >>> 0) || 1;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  let p = start;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const change = (rnd() - 0.5) * 2 * vol + drift;
    p = Math.max(1, p * (1 + change));
    out.push(p);
  }
  return out;
}

export interface SweepResult {
  config: SandboxConfig;
  avgReturnPct: number;
  avgMaxDrawdownPct: number;
  worstDrawdownPct: number;
  avgTrades: number;
  riskAdjusted: number;
}

/** Bewertet jede Config über alle Pfade und sortiert nach risikoadjustierter Leistung. */
export function sweep(grid: SandboxConfig[], paths: number[][]): SweepResult[] {
  const results = grid.map((config) => {
    let sumRet = 0, sumDD = 0, worst = 0, sumTrades = 0;
    for (const series of paths) {
      const m = simulate(config, series);
      sumRet += m.finalReturnPct;
      sumDD += m.maxDrawdownPct;
      worst = Math.min(worst, m.maxDrawdownPct);
      sumTrades += m.trades;
    }
    const k = paths.length || 1;
    const avgReturnPct = sumRet / k;
    const avgMaxDrawdownPct = sumDD / k;
    return {
      config,
      avgReturnPct,
      avgMaxDrawdownPct,
      worstDrawdownPct: worst,
      avgTrades: sumTrades / k,
      riskAdjusted: avgMaxDrawdownPct < 0
        ? avgReturnPct / Math.abs(avgMaxDrawdownPct)
        : (avgReturnPct > 0 ? Infinity : 0),
    };
  });
  return results.sort((a, b) => b.riskAdjusted - a.riskAdjusted);
}

/** Standard-Parameterraster für den Sweep. */
export function defaultGrid(instrument = "BTC_EUR", tradeEur = 100): SandboxConfig[] {
  const grid: SandboxConfig[] = [];
  const strategies: Array<SandboxConfig["strategy"]> = ["DIP_BUY", "MOMENTUM"];
  for (const strategy of strategies) {
    for (const dipPct of [1, 2, 3, 5]) {
      for (const takeProfitPct of [2, 4, 8, 15]) {
        for (const stopLossPct of [5, 10, 20]) {
          grid.push({ instrument, strategy, tradeEur, dipPct, takeProfitPct, stopLossPct });
        }
      }
    }
  }
  return grid;
}

/** Erzeugt einen Satz Monte-Carlo-Pfade mit gemischten Regimen (down/flat/up). */
export function makePaths(count = 30, n = 90, vol = 0.02): number[][] {
  const paths: number[][] = [];
  for (let i = 0; i < count; i++) {
    const drift = ((i % 3) - 1) * 0.002; // -0.2% / 0 / +0.2% pro Tick
    paths.push(makeRandomSeries(i * 7919 + 1, n, 60000, vol, drift));
  }
  return paths;
}

/** Komplettlauf: Standard-Grid über Monte-Carlo-Pfade, gerankt. */
export function runSweep(opts?: { instrument?: string; tradeEur?: number; paths?: number; vol?: number }): SweepResult[] {
  const grid = defaultGrid(opts?.instrument ?? "BTC_EUR", opts?.tradeEur ?? 100);
  const paths = makePaths(opts?.paths ?? 30, 90, opts?.vol ?? 0.02);
  return sweep(grid, paths);
}

export interface IncomeResult {
  windows: number;
  stake: number;
  medianReturnPct: number;
  meanReturnPct: number;
  doubledPct: number;     // Anteil "Tage" mit >= +100%
  profitablePct: number;  // Anteil "Tage" > 0
  ruinedPct: number;      // Anteil "Tage" <= -50%
  bestPct: number;
  worstPct: number;
}

/**
 * Fixed-Stake-/Income-Analyse OHNE Compounding: jeder "Tag" startet mit
 * demselben festen Einsatz, Gewinn wird gedanklich entnommen. Zeigt die reale
 * Verteilung der Tagesrenditen statt der Compounding-Illusion.
 */
export function incomeAnalysis(
  config: SandboxConfig,
  opts?: { windows?: number; windowTicks?: number; vol?: number; stake?: number },
): IncomeResult {
  const windows = opts?.windows ?? 400;
  const len = opts?.windowTicks ?? 24;
  const vol = opts?.vol ?? 0.03;
  const stake = opts?.stake ?? 100;

  const rets: number[] = [];
  for (let i = 0; i < windows; i++) {
    const series = makeRandomSeries(i * 2654435761 + 1, len, 60000, vol, ((i % 3) - 1) * 0.001);
    rets.push(simulate(config, series, stake).finalReturnPct);
  }
  rets.sort((a, b) => a - b);
  const pct = (p: number) => rets[Math.floor((p / 100) * (rets.length - 1))];
  const count = (f: (r: number) => boolean) => (rets.filter(f).length / rets.length) * 100;

  return {
    windows,
    stake,
    medianReturnPct: pct(50),
    meanReturnPct: rets.reduce((s, r) => s + r, 0) / rets.length,
    doubledPct: count((r) => r >= 100),
    profitablePct: count((r) => r > 0),
    ruinedPct: count((r) => r <= -50),
    bestPct: rets[rets.length - 1],
    worstPct: rets[0],
  };
}

export interface EdgeRequirement {
  targetDailyReturnPct: number;
  tradesPerDay: number;
  moveSizePct: number;
  requiredPerTradeReturnPct: number; // nötige Erwartung je Trade
  requiredWinRate: number;           // nötige Trefferquote (kann > 1 = unmöglich sein)
  feasible: boolean;                 // mathematisch möglich (Trefferquote <= 100%)
  realistic: boolean;                // dauerhaft plausibel (Trefferquote <= 60%)
}

/**
 * Reine Spezifikations-Rechnung: Welche Trefferquote bräuchte man, um ein
 * Tagesrenditeziel zu erreichen? Bei symmetrischem Payoff (Gewinn = Verlust =
 * moveSize) und N Trades/Tag. Macht aus "es muss möglich sein" eine prüfbare Zahl.
 */
export function edgeRequirement(targetDailyReturnPct: number, tradesPerDay: number, moveSizePct: number): EdgeRequirement {
  const target = targetDailyReturnPct / 100;
  const n = Math.max(1, tradesPerDay);
  const perTrade = Math.pow(1 + target, 1 / n) - 1; // nötige Erwartung je Trade
  const x = moveSizePct / 100;
  // Erwartung = (2p − 1) · x  ⇒  p = (perTrade/x + 1) / 2
  const requiredWinRate = x > 0 ? (perTrade / x + 1) / 2 : Infinity;
  return {
    targetDailyReturnPct,
    tradesPerDay: n,
    moveSizePct,
    requiredPerTradeReturnPct: perTrade * 100,
    requiredWinRate,
    feasible: requiredWinRate <= 1 && requiredWinRate >= 0,
    realistic: requiredWinRate <= 0.6 && requiredWinRate >= 0,
  };
}

export interface WalkForwardResult {
  inSample: SweepResult;      // beste Config, gemessen auf Trainingsdaten
  outOfSample: SweepResult;   // dieselbe Config auf ungesehenen Daten
  overfitGapPct: number;      // Rendite-Differenz IS − OS (Overfitting-Steuer)
  holdsUp: boolean;           // bleibt sie out-of-sample profitabel?
}

/**
 * Walk-Forward: optimiert auf der Hälfte der Pfade (In-Sample) und misst die
 * Sieger-Config auf den anderen, ungesehenen Pfaden (Out-of-Sample). Die
 * Differenz ist der ehrliche Overfitting-Test – eine Strategie, die nur
 * in-sample glänzt, ist Selbstbetrug.
 */
export function walkForward(opts?: { instrument?: string; tradeEur?: number; paths?: number; vol?: number }): WalkForwardResult {
  const grid = defaultGrid(opts?.instrument ?? "BTC_EUR", opts?.tradeEur ?? 100);
  const all = makePaths(opts?.paths ?? 40, 90, opts?.vol ?? 0.02);
  const inPaths = all.filter((_, i) => i % 2 === 0);
  const outPaths = all.filter((_, i) => i % 2 === 1);

  const ranked = sweep(grid, inPaths);
  const inSample = ranked[0];
  const outOfSample = sweep([inSample.config], outPaths)[0];
  const overfitGapPct = inSample.avgReturnPct - outOfSample.avgReturnPct;

  return { inSample, outOfSample, overfitGapPct, holdsUp: outOfSample.avgReturnPct > 0 };
}
