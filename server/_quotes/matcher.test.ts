import { describe, expect, it } from "vitest";
import { matchByKey, scanCrossVenue } from "./matcher";
import type { CrossVenueQuote } from "./types";

const q = (venue: CrossVenueQuote["venue"], title: string, yesPrice: number, id = title): CrossVenueQuote =>
  ({ venue, id, title, yesPrice });

describe("matchByKey", () => {
  it("matched gleiche Frage trotz unterschiedlicher Wortreihenfolge/Zeichen", () => {
    const a = [q("polymarket", "Will BTC hit $100k by Dec?", 0.40)];
    const b = [q("kalshi", "btc hit 100k by dec will", 0.55)];
    const m = matchByKey(a, b);
    expect(m).toHaveLength(1);
    expect(m[0].a.venue).toBe("polymarket");
    expect(m[0].b.venue).toBe("kalshi");
  });

  it("ignoriert Quoten ohne Match", () => {
    const a = [q("polymarket", "Frage A", 0.3)];
    const b = [q("kalshi", "Frage B", 0.4)];
    expect(matchByKey(a, b)).toHaveLength(0);
  });
});

describe("scanCrossVenue", () => {
  it("rankt nach Marge nach Gebühren und nennt Venue-Seiten", () => {
    const a = [
      q("polymarket", "Event eins", 0.40, "pa1"),
      q("polymarket", "Event zwei", 0.48, "pa2"),
    ];
    const b = [
      q("kalshi", "Event eins", 0.55, "kb1"), // 15 Pp Differenz
      q("kalshi", "Event zwei", 0.50, "kb2"), //  2 Pp Differenz
    ];
    const res = scanCrossVenue(a, b, 1);
    expect(res).toHaveLength(2);
    expect(res[0].a.id).toBe("pa1");
    expect(res[0].feeAdjustedProfitPct).toBeCloseTo(14);
    expect(res[0].buyYesOn).toBe("polymarket");
    expect(res[0].buyNoOn).toBe("kalshi");
    expect(res[1].worthwhile).toBe(true);
  });
});
