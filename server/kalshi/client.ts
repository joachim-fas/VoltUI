/** Kalshi-Integration – schlanker read-only HTTP-Client. */
import { KALSHI } from "./config";

export class KalshiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "KalshiError";
  }
}

export async function kalshiGet<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
  const url = new URL(`${KALSHI.baseUrl}${path}`);
  for (const [k, v] of Object.entries(params ?? {})) url.searchParams.set(k, String(v));

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent": "VoltUI-Copilot/1.0 (read-only market data)",
      },
    });
  } catch (err) {
    throw new KalshiError(`Netzwerkfehler bei ${path}: ${(err as Error).message}`);
  }
  const text = await res.text();
  if (!res.ok) throw new KalshiError(`Kalshi ${res.status} bei ${path}`, res.status);
  return (text ? JSON.parse(text) : undefined) as T;
}
