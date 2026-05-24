/**
 * Polymarket-Integration – Arbitrage-Scanner & Edge-Evaluator (rein, testbar).
 *
 * Arbitrage: Auf einem konsistenten Markt summieren sich die Outcome-Preise zu
 * ~1 (eine Seite zahlt 1 $). Liegt die Summe darunter, kann man alle Seiten
 * kaufen und die Differenz risikofrei sichern (vor Gebühren/Liquidität).
 *
 * Edge: Marktpreis = implizite Wahrscheinlichkeit. Hast du eine eigene, bessere
 * Schätzung, ergibt sich daraus Edge, Erwartungswert und Kelly-Einsatz.
 */
import { betMath } from "../bitpanda/asymmetric";
import type { ArbOpportunity, BetEval, PolyMarket } from "./types";

export function scanArbitrage(markets: PolyMarket[], tolerancePct = 1): ArbOpportunity[] {
  const tol = tolerancePct / 100;
  const out: ArbOpportunity[] = [];
  for (const m of markets) {
    if (m.prices.length < 2) continue;
    const sum = m.prices.reduce((a, b) => a + b, 0);
    if (sum <= 0) continue;
    if (sum < 1 - tol) {
      out.push({ id: m.id, question: m.question, outcomes: m.outcomes, prices: m.prices, sum, profitPct: (1 - sum) * 100, kind: "UNDERPRICED" });
    } else if (sum > 1 + tol) {
      out.push({ id: m.id, question: m.question, outcomes: m.outcomes, prices: m.prices, sum, profitPct: (sum - 1) * 100, kind: "OVERPRICED" });
    }
  }
  return out.sort((a, b) => b.profitPct - a.profitPct);
}

export function evaluateBet(price: number, myProb: number): BetEval {
  const payoff = price > 0 ? 1 / price : Infinity;
  const m = betMath(myProb, payoff);
  return {
    impliedProb: price,
    myProb,
    payoff,
    edge: myProb - price,
    evPerBetPct: m.evPerBetPct,
    kellyFraction: m.kellyFraction,
  };
}
