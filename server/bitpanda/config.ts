/**
 * Bitpanda-Integration – zentrale Konfiguration & Sicherheitsschalter.
 *
 * Alle Werte kommen aus Umgebungsvariablen (.env, gitignored). Der API-Key
 * wird NIE eingecheckt. Defaults sind bewusst auf die sicherste Haltung gesetzt:
 * Trading aus, Dry-Run an. Echtes Traden muss vom Betreiber (dir) aktiv
 * eingeschaltet werden – nicht durch dieses Tool selbst.
 *
 * Endpunkte/Base-URL beziehen sich auf die Bitpanda Exchange / Fusion API.
 * Bitte gegen deine eigene Bitpanda-API-Doku und deinen Key-Typ verifizieren.
 */

const bool = (v: string | undefined, fallback: boolean) =>
  v === undefined ? fallback : v.toLowerCase() === "true";

const num = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export const BITPANDA = {
  /** Base-URL der Trading-/Market-API. Default: Bitpanda Exchange/Fusion. */
  baseUrl: process.env.BITPANDA_API_URL ?? "https://api.exchange.bitpanda.com/public/v1",
  /** Dein API-Key (nur lesend, bis du Trading aktivierst). Aus .env. */
  apiKey: process.env.BITPANDA_API_KEY ?? "",

  /** Master-Schalter für echtes Traden. Default: AUS. */
  tradingEnabled: bool(process.env.BITPANDA_TRADING_ENABLED, false),
  /** Dry-Run: simuliert Orders statt sie zu senden. Default: AN. */
  dryRun: bool(process.env.BITPANDA_DRY_RUN, true),
  /** Not-Aus: blockt jegliche Order, egal welche anderen Schalter. Default: AUS. */
  killSwitch: bool(process.env.BITPANDA_KILL_SWITCH, false),

  /** Guardrail: maximaler Gegenwert pro Order in EUR. */
  maxOrderEur: num(process.env.BITPANDA_MAX_ORDER_EUR, 100),
  /** Standard-Quote-Währung für EUR-Schätzungen. */
  quoteCurrency: (process.env.BITPANDA_QUOTE_CURRENCY ?? "EUR").toUpperCase(),

  /** Alert-Engine: Poll-Intervall in Sekunden (0 = aus). */
  alertPollSec: num(process.env.BITPANDA_ALERT_POLL_SEC, 60),
  /** Cooldown pro Regel in Minuten – verhindert wiederholtes Auslösen. */
  alertCooldownMin: num(process.env.BITPANDA_ALERT_COOLDOWN_MIN, 60),
} as const;

export function hasApiKey(): boolean {
  return BITPANDA.apiKey.trim().length > 0;
}

/** Endpunkt-Pfade – an einer Stelle, leicht gegen die Doku abzugleichen. */
export const ENDPOINTS = {
  balances: "/account/balances",
  orders: "/account/orders",
  order: (id: string) => `/account/orders/${encodeURIComponent(id)}`,
  ticker: "/market-ticker",
  tickerOne: (code: string) => `/market-ticker/${encodeURIComponent(code)}`,
  instruments: "/instruments",
} as const;
