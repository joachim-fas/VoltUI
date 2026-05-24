import { describe, expect, it } from "vitest";
import { evaluateOrder, type SafetyConfig } from "./safety";
import { evaluateRules } from "./alerts";
import type { AlertRule } from "./store";
import type { PlaceOrderInput } from "./types";

const allowCfg: SafetyConfig = { killSwitch: false, tradingEnabled: true, dryRun: false, maxOrderEur: 100 };

const order = (over: Partial<PlaceOrderInput> = {}): PlaceOrderInput => ({
  instrument_code: "BTC_EUR", side: "BUY", type: "LIMIT", amount: "0.001", price: "60000", ...over,
});

describe("evaluateOrder (Guardrails)", () => {
  it("erlaubt eine gültige Order, wenn alle Schalter passen", () => {
    const c = evaluateOrder(order(), 60, allowCfg);
    expect(c.allowed).toBe(true);
    expect(c.blockers).toHaveLength(0);
  });

  it("blockt, wenn Trading deaktiviert ist", () => {
    const c = evaluateOrder(order(), 60, { ...allowCfg, tradingEnabled: false });
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("Trading ist deaktiviert"))).toBe(true);
  });

  it("blockt bei aktivem Kill-Switch", () => {
    const c = evaluateOrder(order(), 60, { ...allowCfg, killSwitch: true });
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("Kill-Switch"))).toBe(true);
  });

  it("blockt, wenn der Gegenwert über dem Limit liegt", () => {
    const c = evaluateOrder(order(), 600, allowCfg);
    expect(c.allowed).toBe(false);
    expect(c.blockers.some((b) => b.includes("überschreitet das Limit"))).toBe(true);
  });

  it("blockt eine Limit-Order ohne Preis", () => {
    const c = evaluateOrder(order({ price: undefined }), 60, allowCfg);
    expect(c.blockers.some((b) => b.includes("benötigt einen Preis"))).toBe(true);
  });

  it("blockt nicht-positive Mengen", () => {
    const c = evaluateOrder(order({ amount: "0" }), 60, allowCfg);
    expect(c.blockers.some((b) => b.includes("größer als 0"))).toBe(true);
  });

  it("dry-run blockt nicht, warnt aber", () => {
    const c = evaluateOrder(order(), 60, { ...allowCfg, dryRun: true });
    expect(c.allowed).toBe(true);
    expect(c.warnings.some((w) => w.includes("Dry-Run"))).toBe(true);
  });

  it("warnt, wenn der EUR-Gegenwert unbekannt ist", () => {
    const c = evaluateOrder(order(), null, allowCfg);
    expect(c.warnings.some((w) => w.includes("nicht geschätzt"))).toBe(true);
  });
});

const rule = (over: Partial<AlertRule> = {}): AlertRule => ({
  id: "r1", type: "PRICE", target: "BTC_EUR", comparator: "BELOW", value: 60000,
  enabled: true, createdAt: 0, ...over,
});

describe("evaluateRules (Alert-Auswertung)", () => {
  const now = 1_000_000;
  const cooldown = 60 * 60_000;

  it("löst eine PRICE/BELOW-Regel aus, wenn der Kurs darunter liegt", () => {
    const m = evaluateRules([rule()], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(m).toHaveLength(1);
    expect(m[0].alert.observedValue).toBe(50000);
    expect(m[0].alert.threshold).toBe(60000);
  });

  it("löst NICHT aus, wenn der Kurs über der Schwelle liegt", () => {
    const m = evaluateRules([rule()], new Map([["BTC_EUR", 70000]]), null, now, cooldown);
    expect(m).toHaveLength(0);
  });

  it("löst eine PRICE/ABOVE-Regel korrekt aus", () => {
    const m = evaluateRules([rule({ comparator: "ABOVE", value: 65000 })], new Map([["BTC_EUR", 70000]]), null, now, cooldown);
    expect(m).toHaveLength(1);
  });

  it("ignoriert deaktivierte Regeln", () => {
    const m = evaluateRules([rule({ enabled: false })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(m).toHaveLength(0);
  });

  it("respektiert den Cooldown", () => {
    const recent = evaluateRules([rule({ lastTriggeredAt: now - 1000 })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(recent).toHaveLength(0);
    const old = evaluateRules([rule({ lastTriggeredAt: now - cooldown - 1 })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(old).toHaveLength(1);
  });

  it("wertet ALLOCATION-Regeln gegen die Allokations-Map aus", () => {
    const r = rule({ type: "ALLOCATION", target: "SOL", comparator: "ABOVE", value: 10 });
    const m = evaluateRules([r], new Map(), new Map([["SOL", 12]]), now, cooldown);
    expect(m).toHaveLength(1);
    expect(m[0].alert.type).toBe("ALLOCATION");
  });

  it("löst nicht aus, wenn der Zielwert fehlt", () => {
    const m = evaluateRules([rule({ target: "ETH_EUR" })], new Map([["BTC_EUR", 50000]]), null, now, cooldown);
    expect(m).toHaveLength(0);
  });
});
