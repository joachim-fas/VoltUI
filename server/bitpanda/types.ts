/**
 * Bitpanda-Integration – Typen.
 * Wir typisieren nur die Felder, die wir tatsächlich nutzen; die API liefert mehr.
 */

export type OrderSide = "BUY" | "SELL";
export type OrderType = "MARKET" | "LIMIT";

export interface Balance {
  currency_code: string;
  available: string;
  locked: string;
}

export interface Ticker {
  instrument_code: string;
  last_price: string;
  price_change_percentage?: string;
}

export interface PlaceOrderInput {
  /** z. B. "BTC_EUR" */
  instrument_code: string;
  side: OrderSide;
  type: OrderType;
  /** Menge in Basis-Währung (z. B. BTC bei BTC_EUR). */
  amount: string;
  /** Pflicht bei LIMIT-Orders. */
  price?: string;
}

export interface OrderResult {
  order_id?: string;
  status?: string;
  [key: string]: unknown;
}

export interface OpenOrder {
  order_id: string;
  instrument_code: string;
  side: string;
  type: string;
  amount: string;
  price?: string;
  filled_amount?: string;
  status?: string;
}

export interface OrderCheck {
  allowed: boolean;
  warnings: string[];
  blockers: string[];
}

export interface OrderPreview {
  request: PlaceOrderInput;
  estimatedEur: number | null;
  dryRun: boolean;
  check: OrderCheck;
}

export interface OrderOutcome extends OrderPreview {
  /** true = es wurde (sofern erlaubt & nicht Dry-Run) wirklich gesendet. */
  executed: boolean;
  result?: OrderResult;
  message: string;
}
