/**
 * Bitpanda-Integration – Labor für asymmetrische Wetten.
 * Modelliert kleine Einsätze mit gedeckeltem Downside (max. Einsatz verloren)
 * und großem Upside (Vielfaches des Einsatzes). Reine Mathematik + Monte Carlo,
 * kein echtes Geld. Zeigt, wo "klein rein, groß raus" echt trägt – und wo nicht.
 *
 * payoff = Brutto-Vielfaches bei Gewinn (Einsatz × payoff zurück).
 * p      = Gewinnwahrscheinlichkeit.
 */

export interface BetMath {
  breakEvenWinRate: number;   // p, ab der die Wette fair wird (= 1/payoff)
  edge: number;               // p − breakEven (>0 = positiver Erwartungswert)
  evPerBetPct: number;        // Netto-Erwartungswert je Einsatz in %
  kellyFraction: number;      // optimaler Einsatzanteil (kann <0 = nicht wetten)
}

export function betMath(p: number, payoff: number): BetMath {
  const breakEvenWinRate = payoff > 0 ? 1 / payoff : Infinity;
  const b = payoff - 1; // Netto-Quote
  return {
    breakEvenWinRate,
    edge: p - breakEvenWinRate,
    evPerBetPct: (p * payoff - 1) * 100,
    kellyFraction: b > 0 ? (p * payoff - 1) / b : 0,
  };
}

export interface BetSimResult {
  runs: number;
  betsPerRun: number;
  fraction: number;
  medianFinalMultiple: number; // Endkapital / Start (Median-Spieler)
  meanFinalMultiple: number;
  grewPct: number;             // Anteil Läufe mit Endkapital > Start
  ruinedPct: number;           // Anteil Läufe mit Endkapital < 10% Start
  p10: number;
  p90: number;
  best: number;
}

/**
 * Monte Carlo: viele Spieler setzen je betsPerRun-mal einen Anteil `fraction`
 * des Kapitals auf dieselbe Wette. Zeigt die typische rechtsschiefe Verteilung:
 * die meisten unter dem Schnitt, wenige Treffer ganz rechts.
 */
export function simulateBetting(opts: {
  p: number; payoff: number; fraction: number; betsPerRun: number; runs: number; seed?: number;
}): BetSimResult {
  const { p, payoff, fraction, betsPerRun, runs } = opts;
  let s = (opts.seed ?? 12345) >>> 0 || 1;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };

  const finals: number[] = [];
  for (let r = 0; r < runs; r++) {
    let bank = 1;
    for (let i = 0; i < betsPerRun; i++) {
      if (bank <= 1e-9) { bank = 0; break; }
      bank = rnd() < p ? bank * (1 + fraction * (payoff - 1)) : bank * (1 - fraction);
    }
    finals.push(bank);
  }
  finals.sort((a, b) => a - b);
  const pick = (q: number) => finals[Math.floor(q * (finals.length - 1))];
  const count = (f: (x: number) => boolean) => (finals.filter(f).length / finals.length) * 100;

  return {
    runs,
    betsPerRun,
    fraction,
    medianFinalMultiple: pick(0.5),
    meanFinalMultiple: finals.reduce((a, b) => a + b, 0) / finals.length,
    grewPct: count((x) => x > 1),
    ruinedPct: count((x) => x < 0.1),
    p10: pick(0.1),
    p90: pick(0.9),
    best: finals[finals.length - 1],
  };
}
