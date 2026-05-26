/**
 * Historische Kurse von CoinGecko (public, kein API-Key).
 * Liefert tägliche Schlusskurse für ein Coin/Vs-Currency-Paar über die
 * letzten N Tage. Defensiv: bei Netz-/Format-Problemen wirft eine klare Fehlermeldung.
 */

const BASE = process.env.COINGECKO_API_URL ?? "https://api.coingecko.com/api/v3";

export class HistoryError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "HistoryError";
  }
}

/** Reine Hilfsfunktion: gängiges Bitpanda-Instrument wie "BTC_EUR" → CoinGecko-IDs. */
export function parseInstrument(instrument: string): { coinId: string; vs: string } {
  const [baseRaw, quoteRaw] = instrument.toUpperCase().split("_");
  const map: Record<string, string> = {
    BTC: "bitcoin", ETH: "ethereum", SOL: "solana", ADA: "cardano",
    DOT: "polkadot", XRP: "ripple", DOGE: "dogecoin", LTC: "litecoin",
    AVAX: "avalanche-2", MATIC: "matic-network", LINK: "chainlink",
  };
  const coinId = map[baseRaw] ?? baseRaw.toLowerCase();
  const vs = (quoteRaw ?? "EUR").toLowerCase();
  return { coinId, vs };
}

export async function fetchDailyCloses(instrument: string, days = 90): Promise<number[]> {
  const { coinId, vs } = parseInstrument(instrument);
  const url = new URL(`${BASE}/coins/${encodeURIComponent(coinId)}/market_chart`);
  url.searchParams.set("vs_currency", vs);
  url.searchParams.set("days", String(days));
  url.searchParams.set("interval", "daily");

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Accept: "application/json", "User-Agent": "VoltUI-Copilot/1.0 (read-only history)" },
    });
  } catch (err) {
    throw new HistoryError(`Netzwerkfehler bei CoinGecko: ${(err as Error).message}`);
  }
  if (!res.ok) throw new HistoryError(`CoinGecko ${res.status} bei /market_chart`, res.status);
  const body = (await res.json()) as { prices?: Array<[number, number]> };
  if (!Array.isArray(body.prices) || body.prices.length === 0) {
    throw new HistoryError(`Unerwartete CoinGecko-Antwort für ${instrument}`);
  }
  return body.prices.map(([, price]) => price).filter((p) => Number.isFinite(p) && p > 0);
}
