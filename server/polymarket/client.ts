/** Polymarket-Integration – schlanker read-only HTTP-Client (Gamma-API). */
import { POLYMARKET } from "./config";

export class PolymarketError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "PolymarketError";
  }
}

export async function gammaGet<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
  const url = new URL(`${POLYMARKET.gammaUrl}${path}`);
  for (const [k, v] of Object.entries(params ?? {})) url.searchParams.set(k, String(v));

  let res: Response;
  try {
    // Legitime Client-Hygiene: viele öffentliche APIs lehnen Requests ohne
    // User-Agent ab. Kein Geo-/WAF-Umgehen – nur korrekte Identifikation.
    res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent": "VoltUI-Copilot/1.0 (read-only market data)",
      },
    });
  } catch (err) {
    throw new PolymarketError(`Netzwerkfehler bei ${path}: ${(err as Error).message}`);
  }
  const text = await res.text();
  if (!res.ok) throw new PolymarketError(`Polymarket Gamma ${res.status} bei ${path}`, res.status);
  return (text ? JSON.parse(text) : undefined) as T;
}
