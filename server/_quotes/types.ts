/** Venue-neutrale Quote für Cross-Venue-Matching/Arbitrage. */
export interface CrossVenueQuote {
  venue: "polymarket" | "kalshi";
  id: string;
  title: string;
  yesPrice: number; // implizite Wahrscheinlichkeit in [0,1]
  liquidity?: number;
  endDate?: string | null;
}

export interface MatchedPair {
  key: string;
  a: CrossVenueQuote;
  b: CrossVenueQuote;
  divergencePct: number;
  arbProfitPct: number;       // = divergencePct (vor Gebühren)
  feeAdjustedProfitPct: number;
  buyYesOn: "polymarket" | "kalshi";
  buyNoOn: "polymarket" | "kalshi";
  worthwhile: boolean;
}
