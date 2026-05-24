/** Polymarket-Integration – Typen (nur was wir nutzen). */
export interface PolyMarket {
  id: string;
  question: string;
  slug: string;
  outcomes: string[];
  prices: number[]; // implizite Wahrscheinlichkeiten je Outcome (0..1)
  volume: number;
  liquidity: number;
  endDate: string | null;
  closed: boolean;
}

export interface ArbOpportunity {
  id: string;
  question: string;
  outcomes: string[];
  prices: number[];
  sum: number;       // Summe aller Outcome-Preise
  profitPct: number; // risikofreie Marge in % (positiv = Chance)
  kind: "UNDERPRICED" | "OVERPRICED";
}

export interface BetEval {
  impliedProb: number;  // Marktpreis = implizite Wahrscheinlichkeit
  myProb: number;       // deine Schätzung
  payoff: number;       // 1 / Preis
  edge: number;         // myProb − impliedProb
  evPerBetPct: number;  // Netto-Erwartungswert je Einsatz in %
  kellyFraction: number;
}
