/** Kalshi-Integration – Typen (nur was wir nutzen). */
export interface KalshiMarket {
  ticker: string;
  title: string;
  /** YES-Preis als Wahrscheinlichkeit in [0,1] (Kalshi gibt Cent zurück → /100). */
  yesPrice: number;
  status: string;
  closeTime: string | null;
}
