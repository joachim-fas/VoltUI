import { describe, expect, it } from "vitest";
import { scanArbitrage, evaluateBet } from "./scanner";
import { crossVenueArb, matchKey } from "./crossvenue";
import { normalizeMarket } from "./service";
import type { PolyMarket } from "./types";

const mkt = (prices: number[], over: Partial<PolyMarket> = {}): PolyMarket => ({
  id: "m1", question: "Frage?", slug: "frage", outcomes: prices.map((_, i) => `O${i}`), prices,
  volume: 1000, liquidity: 500, endDate: null, closed: false, ...over,
});

describe("scanArbitrage", () => {
  it("flaggt unterbewertete Märkte (Summe < 1)", () => {
    const r = scanArbitrage([mkt([0.45, 0.45])], 1);
    expect(r).toHaveLength(1);
    expect(r[0].kind).toBe("UNDERPRICED");
    expect(r[0].profitPct).toBeCloseTo(10);
  });

  it("flaggt überbewertete Märkte (Summe > 1)", () => {
    const r = scanArbitrage([mkt([0.6, 0.55])], 1);
    expect(r[0].kind).toBe("OVERPRICED");
    expect(r[0].profitPct).toBeCloseTo(15);
  });

  it("ignoriert konsistente Märkte (Summe ~ 1)", () => {
    expect(scanArbitrage([mkt([0.5, 0.5])], 1)).toHaveLength(0);
    expect(scanArbitrage([mkt([0.66, 0.34])], 1)).toHaveLength(0);
  });

  it("sortiert nach größter Marge", () => {
    const r = scanArbitrage([mkt([0.48, 0.48], { id: "a" }), mkt([0.4, 0.4], { id: "b" })], 1);
    expect(r[0].id).toBe("b");
  });
});

describe("evaluateBet", () => {
  it("kein Edge, wenn Schätzung = Marktpreis", () => {
    const e = evaluateBet(0.25, 0.25);
    expect(e.edge).toBeCloseTo(0);
    expect(e.evPerBetPct).toBeCloseTo(0);
    expect(e.payoff).toBeCloseTo(4);
  });

  it("positiver Edge, wenn deine Schätzung höher ist", () => {
    const e = evaluateBet(0.25, 0.4); // Markt 25%, du 40%
    expect(e.edge).toBeGreaterThan(0);
    expect(e.evPerBetPct).toBeGreaterThan(0);
    expect(e.kellyFraction).toBeGreaterThan(0);
  });
});

describe("crossVenueArb", () => {
  it("kauft YES auf der billigeren Seite und sichert die Differenz", () => {
    const r = crossVenueArb(0.40, 0.55);
    expect(r.buyYesOn).toBe("A");
    expect(r.buyNoOn).toBe("B");
    expect(r.profitPct).toBeCloseTo(15);
    expect(r.worthwhile).toBe(true);
  });

  it("spiegelt die Seite bei umgekehrter Preislage", () => {
    const r = crossVenueArb(0.55, 0.40);
    expect(r.buyYesOn).toBe("B");
  });

  it("keine Marge bei gleichem Preis", () => {
    const r = crossVenueArb(0.5, 0.5);
    expect(r.profitPct).toBeCloseTo(0);
    expect(r.worthwhile).toBe(false);
  });

  it("Gebühren können die Marge auffressen", () => {
    const r = crossVenueArb(0.48, 0.50, 5); // 2% Marge, 5% Gebühren
    expect(r.feeAdjustedProfitPct).toBeLessThan(0);
    expect(r.worthwhile).toBe(false);
  });

  it("matchKey erkennt dieselbe Frage trotz anderer Schreibweise", () => {
    expect(matchKey("Will BTC hit $100k?")).toBe(matchKey("btc $100k will hit"));
  });
});

describe("normalizeMarket", () => {
  it("parst JSON-String-Felder der Gamma-API", () => {
    const m = normalizeMarket({ id: "x", question: "Q", slug: "q", outcomes: '["Yes","No"]', outcomePrices: '["0.7","0.3"]', volume: "1234", liquidity: "10" });
    expect(m.outcomes).toEqual(["Yes", "No"]);
    expect(m.prices).toEqual([0.7, 0.3]);
    expect(m.volume).toBe(1234);
  });
});
