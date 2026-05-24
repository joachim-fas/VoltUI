/**
 * Polymarket-Integration – Konfiguration (read-only).
 * Nutzt die öffentliche Gamma-API für Marktdaten; kein Wallet, kein Key nötig.
 * Es wird ausschließlich GELESEN – das Tool platziert niemals Wetten.
 */
export const POLYMARKET = {
  gammaUrl: process.env.POLYMARKET_GAMMA_URL ?? "https://gamma-api.polymarket.com",
  /** Toleranz in %, ab der eine Preissumme als Fehlbewertung gilt (Gebühren-Puffer). */
  arbTolerancePct: Number(process.env.POLYMARKET_ARB_TOLERANCE_PCT ?? "1"),
} as const;
