import { describe, expect, it } from "vitest";
import { normalizeMarket } from "./service";

describe("Kalshi normalizeMarket", () => {
  it("rechnet Cents in Wahrscheinlichkeit um (Bid/Ask-Mid)", () => {
    const m = normalizeMarket({ ticker: "TEST", title: "Test?", yes_bid: 40, yes_ask: 42, status: "open" });
    expect(m.yesPrice).toBeCloseTo(0.41);
  });

  it("nutzt last_price, wenn kein Bid/Ask vorhanden ist", () => {
    const m = normalizeMarket({ ticker: "TEST", title: "Test?", last_price: 55, status: "open" });
    expect(m.yesPrice).toBeCloseTo(0.55);
  });

  it("liefert 0 bei fehlenden Preisdaten", () => {
    const m = normalizeMarket({ ticker: "TEST", title: "Test?" });
    expect(m.yesPrice).toBe(0);
  });

  it("akzeptiert market_ticker als Alias und liest closeTime", () => {
    const m = normalizeMarket({ market_ticker: "X", title: "Y", last_price: 50, close_time: "2026-12-31" });
    expect(m.ticker).toBe("X");
    expect(m.closeTime).toBe("2026-12-31");
  });
});
