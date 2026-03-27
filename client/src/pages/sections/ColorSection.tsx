/**
 * ColorSection – Grain UI v3
 * Semantisches Farbsystem für Datenkommunikation
 * Positiv / Negativ / Warnung / Info / Kritisch / Neutral
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, AlertTriangle, Info, AlertCircle, Minus,
  CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, ArrowRight,
  Copy, CheckCheck,
} from "lucide-react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";

/* ── Semantische Farb-Definitionen ── */
const SEMANTIC_COLORS = [
  {
    key: "positive",
    label: "Positiv",
    sublabel: "Wachstum · Erfolg · Über Ziel",
    icon: TrendingUp,
    color: "var(--data-positive)",
    bg: "var(--data-positive-bg)",
    border: "var(--data-positive-border)",
    fg: "var(--data-positive-fg)",
    cssVar: "--data-positive",
    hex: "#16a34a",
    oklch: "oklch(0.52 0.22 148)",
    usage: [
      "Positive Veränderungen (+%)",
      "Ziele übertroffen",
      "Erfolgreiche Transaktionen",
      "Wachstumsindikatoren",
      "Bestätigungen & Erfolg",
    ],
    examples: ["+12.4%", "+€ 48.200", "Ziel erreicht", "Aktiv", "Bestätigt"],
    dontUse: "Nicht für neutrale Informationen oder Standardzustände verwenden",
  },
  {
    key: "negative",
    label: "Negativ",
    sublabel: "Rückgang · Fehler · Unter Ziel",
    icon: TrendingDown,
    color: "var(--data-negative)",
    bg: "var(--data-negative-bg)",
    border: "var(--data-negative-border)",
    fg: "var(--data-negative-fg)",
    cssVar: "--data-negative",
    hex: "#dc2626",
    oklch: "oklch(0.55 0.30 27)",
    usage: [
      "Negative Veränderungen (-%)",
      "Ziele verfehlt",
      "Fehlgeschlagene Aktionen",
      "Rückgangsindikatoren",
      "Fehler & Validierung",
    ],
    examples: ["−8.3%", "−€ 12.400", "Ziel verfehlt", "Fehler", "Abgelehnt"],
    dontUse: "Nicht für Warnungen oder Hinweise verwenden – dafür Warnung/Info nutzen",
  },
  {
    key: "warning",
    label: "Warnung",
    sublabel: "Aufmerksamkeit · Risiko · Grenzwert",
    icon: AlertTriangle,
    color: "var(--data-warning)",
    bg: "var(--data-warning-bg)",
    border: "var(--data-warning-border)",
    fg: "var(--data-warning-fg)",
    cssVar: "--data-warning",
    hex: "#d97706",
    oklch: "oklch(0.68 0.22 72)",
    usage: [
      "Grenzwerte fast erreicht",
      "Knapp am Ziel (80–99%)",
      "Potenzielle Risiken",
      "Ausstehende Aktionen",
      "Zeitkritische Hinweise",
    ],
    examples: ["87% Kapazität", "Fällig in 2h", "Prüfen", "Ausstehend", "Bald ablaufend"],
    dontUse: "Nicht für Fehler (→ Negativ) oder reine Informationen (→ Info) verwenden",
  },
  {
    key: "info",
    label: "Info",
    sublabel: "Hinweis · Kontext · Neutral",
    icon: Info,
    color: "var(--data-info)",
    bg: "var(--data-info-bg)",
    border: "var(--data-info-border)",
    fg: "var(--data-info-fg)",
    cssVar: "--data-info",
    hex: "#2563eb",
    oklch: "oklch(0.45 0.31 268)",
    usage: [
      "Neutrale Informationen",
      "Kontextuelle Hinweise",
      "Systemstatus (normal)",
      "Neue Features & Updates",
      "Erklärende Tooltips",
    ],
    examples: ["Neue Version", "Hinweis", "Aktualisiert", "In Bearbeitung", "Geplant"],
    dontUse: "Nicht für Aktionen die sofortige Aufmerksamkeit erfordern",
  },
  {
    key: "critical",
    label: "Kritisch",
    sublabel: "Dringend · Eskalation · Sofortmaßnahme",
    icon: AlertCircle,
    color: "var(--data-critical)",
    bg: "var(--data-critical-bg)",
    border: "var(--data-critical-border)",
    fg: "var(--data-critical-fg)",
    cssVar: "--data-critical",
    hex: "#7c3aed",
    oklch: "oklch(0.40 0.28 285)",
    usage: [
      "Systemkritische Fehler",
      "Sofortiger Handlungsbedarf",
      "Sicherheitsvorfälle",
      "Datenverlust-Risiken",
      "Eskalierte Probleme",
    ],
    examples: ["Systemausfall", "Kritisch", "Sofort handeln", "Sicherheitsalarm", "Eskaliert"],
    dontUse: "Sparsam einsetzen – nur bei echtem Handlungsbedarf, nicht für Warnungen",
  },
  {
    key: "neutral",
    label: "Neutral",
    sublabel: "Stabil · Unverändert · Unbekannt",
    icon: Minus,
    color: "var(--data-neutral)",
    bg: "var(--data-neutral-bg)",
    border: "var(--data-neutral-border)",
    fg: "var(--data-neutral-fg)",
    cssVar: "--data-neutral",
    hex: "#6b7280",
    oklch: "oklch(0.50 0.02 268)",
    usage: [
      "Keine Veränderung (0%)",
      "Unbekannte Werte",
      "Deaktivierte Zustände",
      "Archivierte Elemente",
      "Nicht verfügbare Daten",
    ],
    examples: ["0.0%", "Unbekannt", "Inaktiv", "Archiviert", "N/A"],
    dontUse: "Nicht für positive oder negative Werte verwenden – diese haben eigene Farben",
  },
];

/* ── Delta-Badge-Komponente ── */
const DeltaBadge: React.FC<{
  value: string;
  type: "positive" | "negative" | "warning" | "neutral";
}> = ({ value, type }) => {
  const configs = {
    positive: { icon: ArrowUpRight,   cls: "delta delta-positive" },
    negative: { icon: ArrowDownRight, cls: "delta delta-negative" },
    warning:  { icon: ArrowRight,     cls: "delta delta-warning" },
    neutral:  { icon: Minus,          cls: "delta delta-neutral" },
  };
  const { icon: Icon, cls } = configs[type];
  return (
    <span className={cls}>
      <Icon className="w-3 h-3" />
      {value}
    </span>
  );
};

/* ── Farb-Token-Karte ── */
const ColorTokenCard: React.FC<{ item: typeof SEMANTIC_COLORS[0] }> = ({ item }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const Icon = item.icon;

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <GrainCard className="overflow-hidden">
      {/* Farbstreifen oben */}
      <div
        className="h-2 w-full"
        style={{ background: item.color }}
      />
      <GrainCardContent className="pt-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: item.bg }}
            >
              <Icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div>
              <h3 className="font-ui font-semibold text-sm text-foreground">{item.label}</h3>
              <p className="text-[11px] font-ui text-muted-foreground">{item.sublabel}</p>
            </div>
          </div>
        </div>

        {/* Farb-Tokens */}
        <div className="space-y-1.5">
          {[
            { label: "Hauptfarbe", var: item.cssVar, value: item.oklch },
            { label: "Hintergrund", var: `${item.cssVar}-bg`, value: `${item.oklch.slice(0, -1)} / 0.12)` },
            { label: "Rahmen", var: `${item.cssVar}-border`, value: `${item.oklch.slice(0, -1)} / 0.35)` },
          ].map(token => (
            <button
              key={token.var}
              onClick={() => copy(`var(${token.var})`, token.var)}
              className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors group text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0 border border-border/50"
                  style={{ background: token.label === "Hauptfarbe" ? item.color : token.label === "Hintergrund" ? item.bg : item.border }}
                />
                <span className="text-[10px] font-mono text-muted-foreground truncate">{token.var}</span>
              </div>
              {copied === token.var
                ? <CheckCheck className="w-3 h-3 text-data-positive flex-shrink-0" style={{ color: "var(--data-positive)" }} />
                : <Copy className="w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0" />
              }
            </button>
          ))}
        </div>

        {/* Verwendungsbeispiele */}
        <div>
          <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-muted-foreground mb-2">Verwendung</p>
          <ul className="space-y-1">
            {item.usage.slice(0, 3).map(u => (
              <li key={u} className="flex items-center gap-1.5 text-[11px] font-ui text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: item.color }} />
                {u}
              </li>
            ))}
          </ul>
        </div>

        {/* Nicht verwenden */}
        <div className="flex items-start gap-1.5 p-2.5 rounded-lg bg-muted/30 border border-border">
          <XCircle className="w-3 h-3 flex-shrink-0 mt-0.5 text-muted-foreground/50" />
          <p className="text-[10px] font-ui text-muted-foreground/70 leading-relaxed">{item.dontUse}</p>
        </div>
      </GrainCardContent>
    </GrainCard>
  );
};

/* ── Haupt-Komponente ── */
export const ColorSection: React.FC = () => {
  return (
    <section className="space-y-10">

      {/* ── Header ── */}
      <div>
        <p className="section-label mb-2">02 — Farbsystem</p>
        <h2 className="font-display text-3xl font-bold text-foreground tracking-tight mb-3">
          Semantische Farbkodierung
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-4">
          Farbe kommuniziert Bedeutung – nicht Dekoration. Dieses System kodiert{" "}
          <strong className="text-foreground">6 semantische Zustände</strong> konsistent über alle Komponenten:
          KPI-Karten, Charts, Badges, Tabellen, Alerts und Formulare.
        </p>
        <div className="flex flex-wrap gap-2">
          <GrainBadge variant="blue" size="sm">6 Zustände</GrainBadge>
          <GrainBadge variant="muted" size="sm">CSS Custom Properties</GrainBadge>
          <GrainBadge variant="muted" size="sm">OKLCH Farbraum</GrainBadge>
          <GrainBadge variant="muted" size="sm">WCAG AA konform</GrainBadge>
        </div>
      </div>

      {/* ── Schnellübersicht ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Schnellübersicht: Alle 6 Zustände</GrainCardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Jeder Zustand hat 4 Farbebenen: Hauptfarbe · Foreground · Hintergrund · Rahmen
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SEMANTIC_COLORS.map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border text-center"
                  style={{ borderColor: item.border, background: item.bg }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: item.color }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold font-ui" style={{ color: item.color }}>{item.label}</p>
                    <div
                      className="w-full h-1 rounded-full mt-1.5"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* ── Delta-Anzeigen ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Delta-Anzeigen</GrainCardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kompakte Veränderungsanzeigen für KPI-Karten, Tabellen und Dashboards
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="space-y-6">
            {/* Beispiele */}
            <div className="flex flex-wrap gap-3 items-center">
              <DeltaBadge value="+12.4%" type="positive" />
              <DeltaBadge value="+€ 48.200" type="positive" />
              <DeltaBadge value="−8.3%" type="negative" />
              <DeltaBadge value="−€ 12.400" type="negative" />
              <DeltaBadge value="87% Kapazität" type="warning" />
              <DeltaBadge value="Fällig in 2h" type="warning" />
              <DeltaBadge value="0.0%" type="neutral" />
              <DeltaBadge value="N/A" type="neutral" />
            </div>

            {/* KPI-Karten Demo */}
            <div>
              <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-muted-foreground mb-3">
                KPI-Karten mit Farbkodierung
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Umsatz", value: "€ 284.500", delta: "+12.4%", type: "positive" as const, sub: "vs. Vormonat" },
                  { label: "Kosten", value: "€ 142.300", delta: "−8.3%", type: "negative" as const, sub: "vs. Vormonat" },
                  { label: "Kapazität", value: "87 / 100", delta: "87% Auslastung", type: "warning" as const, sub: "Grenzwert: 90%" },
                  { label: "Verfügbarkeit", value: "99.9%", delta: "0.0%", type: "neutral" as const, sub: "Stabil" },
                ].map(kpi => {
                  const Icon = {
                    positive: TrendingUp,
                    negative: TrendingDown,
                    warning: AlertTriangle,
                    neutral: Minus,
                  }[kpi.type];
                  const color = {
                    positive: "var(--data-positive)",
                    negative: "var(--data-negative)",
                    warning: "var(--data-warning)",
                    neutral: "var(--data-neutral)",
                  }[kpi.type];
                  const bg = {
                    positive: "var(--data-positive-bg)",
                    negative: "var(--data-negative-bg)",
                    warning: "var(--data-warning-bg)",
                    neutral: "var(--data-neutral-bg)",
                  }[kpi.type];
                  const border = {
                    positive: "var(--data-positive-border)",
                    negative: "var(--data-negative-border)",
                    warning: "var(--data-warning-border)",
                    neutral: "var(--data-neutral-border)",
                  }[kpi.type];
                  return (
                    <div
                      key={kpi.label}
                      className="p-4 rounded-2xl border"
                      style={{ borderColor: border, background: bg }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-semibold font-ui text-muted-foreground">{kpi.label}</p>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <p className="text-lg font-display font-bold text-foreground leading-tight">{kpi.value}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <DeltaBadge value={kpi.delta} type={kpi.type} />
                      </div>
                      <p className="text-[10px] font-ui text-muted-foreground mt-1">{kpi.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tabellen-Demo */}
            <div>
              <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Tabellen mit Status-Farbkodierung
              </p>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold font-ui text-muted-foreground">Produkt</th>
                      <th className="text-right px-4 py-2.5 text-[11px] font-semibold font-ui text-muted-foreground">Umsatz</th>
                      <th className="text-right px-4 py-2.5 text-[11px] font-semibold font-ui text-muted-foreground">Veränderung</th>
                      <th className="text-center px-4 py-2.5 text-[11px] font-semibold font-ui text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Grain Pro", revenue: "€ 84.200", delta: "+18.2%", type: "positive" as const, status: "Aktiv" },
                      { name: "Grain Basic", revenue: "€ 42.100", delta: "+4.1%", type: "positive" as const, status: "Aktiv" },
                      { name: "Grain Team", revenue: "€ 31.800", delta: "−6.4%", type: "negative" as const, status: "Rückgang" },
                      { name: "Grain Free", revenue: "€ 0", delta: "0.0%", type: "neutral" as const, status: "Stabil" },
                      { name: "Grain Enterprise", revenue: "€ 126.400", delta: "87% Ziel", type: "warning" as const, status: "Prüfen" },
                    ].map((row, i) => {
                      const color = {
                        positive: "var(--data-positive)",
                        negative: "var(--data-negative)",
                        warning: "var(--data-warning)",
                        neutral: "var(--data-neutral)",
                      }[row.type];
                      const bg = {
                        positive: "var(--data-positive-bg)",
                        negative: "var(--data-negative-bg)",
                        warning: "var(--data-warning-bg)",
                        neutral: "var(--data-neutral-bg)",
                      }[row.type];
                      const border = {
                        positive: "var(--data-positive-border)",
                        negative: "var(--data-negative-border)",
                        warning: "var(--data-warning-border)",
                        neutral: "var(--data-neutral-border)",
                      }[row.type];
                      return (
                        <tr key={row.name} className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                          <td className="px-4 py-3 font-ui text-sm font-medium text-foreground">{row.name}</td>
                          <td className="px-4 py-3 font-ui text-sm text-right text-foreground font-semibold">{row.revenue}</td>
                          <td className="px-4 py-3 text-right">
                            <DeltaBadge value={row.delta} type={row.type} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-ui border"
                              style={{ color, background: bg, borderColor: border }}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* ── Farb-Token-Karten ── */}
      <div>
        <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Alle 6 Semantischen Farben — Tokens & Verwendung
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEMANTIC_COLORS.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ColorTokenCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CSS-Variablen Referenz ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>CSS Custom Properties Referenz</GrainCardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Alle Tokens sind als CSS-Variablen verfügbar und können direkt in Tailwind verwendet werden
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="code-block text-[11px] leading-relaxed">
            <div className="text-muted-foreground/60">{"/* Semantisches Datenfarbsystem */"}</div>
            <div className="mt-2">
              {SEMANTIC_COLORS.map(item => (
                <div key={item.key} className="mt-3">
                  <div className="text-muted-foreground/60">{`/* ${item.label}: ${item.sublabel} */`}</div>
                  <div>
                    <span style={{ color: "oklch(0.68 0.22 72)" }}>--{item.key === "positive" ? "data-positive" : item.key === "negative" ? "data-negative" : item.key === "warning" ? "data-warning" : item.key === "info" ? "data-info" : item.key === "critical" ? "data-critical" : "data-neutral"}</span>
                    <span style={{ color: "oklch(0.85 0.02 268)" }}>: {item.oklch};</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-muted-foreground/60">{"/* Tailwind-Klassen (via @theme inline) */"}</div>
            <div className="mt-1">
              <span style={{ color: "oklch(0.72 0.18 145)" }}>text-data-positive</span>
              <span style={{ color: "oklch(0.85 0.02 268)" }}> · </span>
              <span style={{ color: "oklch(0.72 0.18 145)" }}>bg-data-negative-bg</span>
              <span style={{ color: "oklch(0.85 0.02 268)" }}> · </span>
              <span style={{ color: "oklch(0.72 0.18 145)" }}>border-data-warning-border</span>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

    </section>
  );
};
