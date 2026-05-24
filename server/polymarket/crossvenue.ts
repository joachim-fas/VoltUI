/**
 * Cross-Venue-Arbitrage (venue-neutral, rein & testbar).
 *
 * Dasselbe binäre Event auf zwei Börsen (z. B. Polymarket vs. Kalshi). Ist der
 * YES-Preis unterschiedlich, kauft man YES auf der billigeren und NO auf der
 * teureren Seite – egal wie das Event ausgeht, eine Seite zahlt 1. Kosten =
 * 1 − |yesA − yesB|, der Rest ist die risikofreie Marge (vor Gebühren).
 *
 * Prognosefrei: man muss die Zukunft nicht kennen, nur die Preisdifferenz.
 */
export interface CrossVenueArb {
  yesA: number;
  yesB: number;
  divergencePct: number;       // |yesA − yesB| · 100
  costToLock: number;          // Kosten, um 1 garantiert zurückzubekommen
  profitPct: number;           // risikofreie Marge in % (vor Gebühren)
  feeAdjustedProfitPct: number;
  buyYesOn: "A" | "B";
  buyNoOn: "A" | "B";
  worthwhile: boolean;         // Marge nach Gebühren positiv?
}

export function crossVenueArb(yesA: number, yesB: number, feePct = 0): CrossVenueArb {
  const cheaperYesIsA = yesA <= yesB;
  const cost = Math.min(yesA, yesB) + (1 - Math.max(yesA, yesB)); // = 1 − |yesA−yesB|
  const profitPct = (1 - cost) * 100;
  const feeAdjustedProfitPct = profitPct - feePct;
  return {
    yesA,
    yesB,
    divergencePct: Math.abs(yesA - yesB) * 100,
    costToLock: cost,
    profitPct,
    feeAdjustedProfitPct,
    buyYesOn: cheaperYesIsA ? "A" : "B",
    buyNoOn: cheaperYesIsA ? "B" : "A",
    worthwhile: feeAdjustedProfitPct > 0,
  };
}

/** Normalisiert einen Titel für key-basiertes Matching gleicher Events über Venues. */
export function matchKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").sort().join(" ");
}
