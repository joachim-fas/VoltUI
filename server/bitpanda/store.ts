/**
 * Bitpanda-Integration – persistenter Store für Alert-Regeln & ausgelöste Alerts.
 * Bewusst dateibasiert (JSON), damit das Self-Run-Tool ohne Datenbank läuft.
 * Pfad via BITPANDA_STORE_PATH überschreibbar; Standard: ./data/bitpanda-store.json
 * (gitignored). Ein In-Memory-Cache ist die Quelle der Wahrheit, write-through.
 */

import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

export type RuleType = "PRICE" | "ALLOCATION";
export type Comparator = "ABOVE" | "BELOW";

export interface AlertRule {
  id: string;
  type: RuleType;
  /** PRICE: instrument_code (z. B. BTC_EUR) · ALLOCATION: Währung (z. B. SOL) */
  target: string;
  comparator: Comparator;
  value: number;
  note?: string;
  enabled: boolean;
  createdAt: number;
  lastTriggeredAt?: number;
}

export interface TriggeredAlert {
  id: string;
  ruleId: string;
  type: RuleType;
  title: string;
  detail: string;
  target: string;
  observedValue: number;
  comparator: Comparator;
  threshold: number;
  createdAt: number;
}

interface StoreShape {
  rules: AlertRule[];
  alerts: TriggeredAlert[];
}

const FILE = process.env.BITPANDA_STORE_PATH || join(process.cwd(), "data", "bitpanda-store.json");
const MAX_ALERTS = 100;

let cache: StoreShape | null = null;

function read(): StoreShape {
  if (cache) return cache;
  try {
    if (existsSync(FILE)) {
      cache = JSON.parse(readFileSync(FILE, "utf8")) as StoreShape;
      cache.rules ??= [];
      cache.alerts ??= [];
      return cache;
    }
  } catch (e) {
    console.warn("[bitpanda] Store-Lesefehler:", (e as Error).message);
  }
  cache = { rules: [], alerts: [] };
  return cache;
}

function write(data: StoreShape): void {
  cache = data;
  try {
    mkdirSync(dirname(FILE), { recursive: true });
    writeFileSync(FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn("[bitpanda] Store-Schreibfehler:", (e as Error).message);
  }
}

/* ── Rules ── */
export function listRules(): AlertRule[] {
  return read().rules;
}

export function getEnabledRules(): AlertRule[] {
  return read().rules.filter((r) => r.enabled);
}

export function createRule(input: {
  type: RuleType; target: string; comparator: Comparator; value: number; note?: string;
}): AlertRule {
  const data = read();
  const rule: AlertRule = {
    id: randomUUID(),
    type: input.type,
    target: input.target,
    comparator: input.comparator,
    value: input.value,
    note: input.note,
    enabled: true,
    createdAt: Date.now(),
  };
  data.rules.push(rule);
  write(data);
  return rule;
}

export function deleteRule(id: string): void {
  const data = read();
  data.rules = data.rules.filter((r) => r.id !== id);
  write(data);
}

export function toggleRule(id: string, enabled: boolean): AlertRule | null {
  const data = read();
  const rule = data.rules.find((r) => r.id === id);
  if (!rule) return null;
  rule.enabled = enabled;
  write(data);
  return rule;
}

export function markTriggered(ruleId: string, at: number): void {
  const data = read();
  const rule = data.rules.find((r) => r.id === ruleId);
  if (rule) {
    rule.lastTriggeredAt = at;
    write(data);
  }
}

/* ── Alerts ── */
export function listAlerts(): TriggeredAlert[] {
  return read().alerts;
}

export function addAlert(input: Omit<TriggeredAlert, "id" | "createdAt">): TriggeredAlert {
  const data = read();
  const alert: TriggeredAlert = { ...input, id: randomUUID(), createdAt: Date.now() };
  data.alerts = [alert, ...data.alerts].slice(0, MAX_ALERTS);
  write(data);
  return alert;
}

export function dismissAlert(id: string): void {
  const data = read();
  data.alerts = data.alerts.filter((a) => a.id !== id);
  write(data);
}

export function clearAlerts(): void {
  const data = read();
  data.alerts = [];
  write(data);
}
