/**
 * Venue-übergreifendes Matching: gleicher Event-Titel über `matchKey`,
 * dann Cross-Venue-Arbitrage je Paar. Rein, testbar.
 */
import { matchKey, crossVenueArb } from "../polymarket/crossvenue";
import type { CrossVenueQuote, MatchedPair } from "./types";

export function matchByKey(a: CrossVenueQuote[], b: CrossVenueQuote[]): Array<{ key: string; a: CrossVenueQuote; b: CrossVenueQuote }> {
  const indexB = new Map<string, CrossVenueQuote>();
  for (const q of b) indexB.set(matchKey(q.title), q);
  const out: Array<{ key: string; a: CrossVenueQuote; b: CrossVenueQuote }> = [];
  for (const qa of a) {
    const key = matchKey(qa.title);
    const qb = indexB.get(key);
    if (qb) out.push({ key, a: qa, b: qb });
  }
  return out;
}

export function scanCrossVenue(a: CrossVenueQuote[], b: CrossVenueQuote[], feePct = 0): MatchedPair[] {
  return matchByKey(a, b)
    .map((m) => {
      const arb = crossVenueArb(m.a.yesPrice, m.b.yesPrice, feePct);
      return {
        key: m.key,
        a: m.a,
        b: m.b,
        divergencePct: arb.divergencePct,
        arbProfitPct: arb.profitPct,
        feeAdjustedProfitPct: arb.feeAdjustedProfitPct,
        buyYesOn: arb.buyYesOn === "A" ? m.a.venue : m.b.venue,
        buyNoOn: arb.buyNoOn === "A" ? m.a.venue : m.b.venue,
        worthwhile: arb.worthwhile,
      };
    })
    .sort((x, y) => y.feeAdjustedProfitPct - x.feeAdjustedProfitPct);
}
