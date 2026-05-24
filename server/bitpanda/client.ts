/**
 * Bitpanda-Integration – schlanker REST-Client.
 * Authentifizierte Calls nutzen den API-Key als Bearer-Token. Market-Daten
 * sind öffentlich und brauchen keinen Key.
 */

import { BITPANDA, hasApiKey } from "./config";

interface RequestOptions {
  method?: "GET" | "POST" | "DELETE";
  body?: unknown;
  /** true → Authorization-Header anhängen (für Konto/Order-Endpunkte). */
  auth?: boolean;
}

export class BitpandaError extends Error {
  constructor(message: string, public status?: number, public body?: string) {
    super(message);
    this.name = "BitpandaError";
  }
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false } = opts;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    if (!hasApiKey()) {
      throw new BitpandaError("BITPANDA_API_KEY fehlt – in .env hinterlegen.");
    }
    headers["Authorization"] = `Bearer ${BITPANDA.apiKey}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BITPANDA.baseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new BitpandaError(`Netzwerkfehler bei ${path}: ${(err as Error).message}`);
  }

  const text = await res.text();
  if (!res.ok) {
    throw new BitpandaError(`Bitpanda API ${res.status} bei ${path}`, res.status, text);
  }

  return (text ? JSON.parse(text) : undefined) as T;
}

export const bitpandaGet = <T>(path: string, auth = false) => request<T>(path, { method: "GET", auth });
export const bitpandaPost = <T>(path: string, body: unknown, auth = true) => request<T>(path, { method: "POST", body, auth });
export const bitpandaDelete = <T>(path: string, auth = true) => request<T>(path, { method: "DELETE", auth });
