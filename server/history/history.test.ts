import { describe, expect, it } from "vitest";
import { parseInstrument } from "./coingecko";
import { walkForwardOnSeries } from "../bitpanda/backtest";

describe("parseInstrument", () => {
  it("mappt bekannte Tickers auf CoinGecko-IDs", () => {
    expect(parseInstrument("BTC_EUR")).toEqual({ coinId: "bitcoin", vs: "eur" });
    expect(parseInstrument("eth_usd")).toEqual({ coinId: "ethereum", vs: "usd" });
    expect(parseInstrument("SOL_EUR").coinId).toBe("solana");
  });

  it("fällt für unbekannte Tickers auf den Lowercase-Namen zurück", () => {
    expect(parseInstrument("XYZ_EUR")).toEqual({ coinId: "xyz", vs: "eur" });
  });
});

describe("walkForwardOnSeries", () => {
  it("teilt die Serie in In- und Out-of-Sample und gibt eine Sieger-Config", () => {
    const series = Array.from({ length: 60 }, (_, i) => 100 + Math.sin(i / 5) * 5);
    const wf = walkForwardOnSeries(series);
    expect(wf.inSample.config).toEqual(wf.outOfSample.config);
    expect(Number.isFinite(wf.overfitGapPct)).toBe(true);
  });

  it("wirft bei zu kurzer Serie", () => {
    expect(() => walkForwardOnSeries([1, 2, 3])).toThrow();
  });
});
