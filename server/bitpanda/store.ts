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

export type JournalKind = "ORDER" | "CANCEL" | "DISMISS" | "PAUSE";

export interface JournalEntry {
  id: string;
  at: number;
  kind: JournalKind;
  summary: string;
  detail?: string;
}

/* ── Paper-Trading-Sandbox ("Gamble-Mode" mit Spielgeld) ── */
export interface SandboxConfig {
  instrument: string;
  tradeEur: number;
  dipPct: number;
  takeProfitPct: number;
  stopLossPct: number;
}

export interface SandboxTrade {
  id: string;
  at: number;
  side: "BUY" | "SELL";
  instrument: string;
  price: number;
  amount: number;
  eur: number;
  reason: string;
}

export interface SandboxState {
  enabled: boolean;
  startCash: number;
  cash: number;
  position: { amount: number; avgEntry: number };
  referenceHigh: number;
  lastPrice: number | null;
  config: SandboxConfig;
  trades: SandboxTrade[];
  startedAt: number;
}

const DEFAULT_SANDBOX = (): SandboxState => ({
  enabled: false,
  startCash: 1000,
  cash: 1000,
  position: { amount: 0, avgEntry: 0 },
  referenceHigh: 0,
  lastPrice: null,
  config: { instrument: "BTC_EUR", tradeEur: 50, dipPct: 3, takeProfitPct: 8, stopLossPct: 10 },
  trades: [],
  startedAt: Date.now(),
});

interface StoreShape {
  rules: AlertRule[];
  alerts: TriggeredAlert[];
  journal: JournalEntry[];
  spend: { date: string; eur: number } | null;
  paused: boolean;
  sandbox: SandboxState;
}

const FILE = process.env.BITPANDA_STORE_PATH || join(process.cwd(), "data", "bitpanda-store.json");
const MAX_ALERTS = 100;
const MAX_JOURNAL = 200;

let cache: StoreShape | null = null;

function read(): StoreShape {
  if (cache) return cache;
  try {
    if (existsSync(FILE)) {
      cache = JSON.parse(readFileSync(FILE, "utf8")) as StoreShape;
      cache.rules ??= [];
      cache.alerts ??= [];
      cache.journal ??= [];
      cache.spend ??= null;
      cache.paused ??= false;
      cache.sandbox ??= DEFAULT_SANDBOX();
      return cache;
    }
  } catch (e) {
    console.warn("[bitpanda] Store-Lesefehler:", (e as Error).message);
  }
  cache = { rules: [], alerts: [], journal: [], spend: null, paused: false, sandbox: DEFAULT_SANDBOX() };
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

/* ── Journal (Audit-Log getroffener Entscheidungen) ── */
export function listJournal(): JournalEntry[] {
  return read().journal;
}

export function addJournal(input: Omit<JournalEntry, "id" | "at">): JournalEntry {
  const data = read();
  const entry: JournalEntry = { ...input, id: randomUUID(), at: Date.now() };
  data.journal = [entry, ...data.journal].slice(0, MAX_JOURNAL);
  write(data);
  return entry;
}

/* ── Tagesausgaben (für das Tageslimit) ── */
function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getSpentToday(): number {
  const d = read();
  return d.spend && d.spend.date === todayKey() ? d.spend.eur : 0;
}

export function addSpend(eur: number): void {
  if (!Number.isFinite(eur) || eur <= 0) return;
  const data = read();
  const t = todayKey();
  if (!data.spend || data.spend.date !== t) data.spend = { date: t, eur: 0 };
  data.spend.eur += eur;
  write(data);
}

/* ── Not-Pause (Laufzeit, persistent) ── */
export function isPaused(): boolean {
  return read().paused === true;
}

export function setPaused(paused: boolean): void {
  const data = read();
  data.paused = paused;
  write(data);
}

/* ── Sandbox ── */
export function getSandbox(): SandboxState {
  return read().sandbox;
}

export function setSandbox(state: SandboxState): void {
  const data = read();
  data.sandbox = state;
  write(data);
}

export function configureSandbox(patch: Partial<SandboxConfig> & { startCash?: number }): SandboxState {
  const data = read();
  const sb = data.sandbox;
  const nextInstrument = (patch.instrument ?? sb.config.instrument).toUpperCase();
  const instrumentChanged = nextInstrument !== sb.config.instrument;

  sb.config = {
    instrument: nextInstrument,
    tradeEur: patch.tradeEur ?? sb.config.tradeEur,
    dipPct: patch.dipPct ?? sb.config.dipPct,
    takeProfitPct: patch.takeProfitPct ?? sb.config.takeProfitPct,
    stopLossPct: patch.stopLossPct ?? sb.config.stopLossPct,
  };
  if (patch.startCash !== undefined) {
    sb.startCash = patch.startCash;
    sb.cash = patch.startCash;
    sb.position = { amount: 0, avgEntry: 0 };
    sb.trades = [];
    sb.referenceHigh = 0;
    sb.lastPrice = null;
    sb.startedAt = Date.now();
  }
  if (instrumentChanged) {
    sb.position = { amount: 0, avgEntry: 0 };
    sb.referenceHigh = 0;
    sb.lastPrice = null;
  }
  write(data);
  return sb;
}

export function resetSandbox(): SandboxState {
  const data = read();
  const cfg = data.sandbox.config;
  const startCash = data.sandbox.startCash;
  data.sandbox = { ...DEFAULT_SANDBOX(), startCash, cash: startCash, config: cfg };
  write(data);
  return data.sandbox;
}

export function setSandboxEnabled(enabled: boolean): SandboxState {
  const data = read();
  data.sandbox.enabled = enabled;
  write(data);
  return data.sandbox;
}
