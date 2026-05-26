/** Kalshi-Integration – Konfiguration (read-only, public market data). */
export const KALSHI = {
  baseUrl: process.env.KALSHI_API_URL ?? "https://api.elections.kalshi.com",
} as const;
