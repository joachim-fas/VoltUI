/**
 * ColorSection – Flux UI
 * Semantisches Farbsystem: Positiv (Smaragd) · Negativ (Koralle) · Neutral (Slate)
 * Primär: Lime #E4FF97 + Schwarz #0A0A0A
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, AlertTriangle, Info, Minus,
  CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, ArrowRight,
  Copy, CheckCheck,
} from "lucide-react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";

/* ── Signalfarben – direkte Hex-Werte (kein oklch) ── */
const SIGNAL = {
  positive: {
    key: "positive",
    label: "Positiv",
    sublabel: "Wachstum · Erfolg · Über Ziel",
    icon: TrendingUp,
    color:  "#1A9E5A",
    light:  "#E8F8EF",
    border: "#7DD4A8",
    text:   "#0F6038",
    cssVar: "--signal-positive",
    usage: ["Positive Veränderungen (+%)", "Ziele übertroffen", "Erfolgreiche Transaktionen", "Wachstumsindikatoren"],
    examples: ["+12.4%", "+€ 48.200", "Ziel erreicht", "Bestätigt"],
    dontUse: "Nicht für neutrale Informationen oder Standardzustände verwenden",
  },
  negative: {
    key: "negative",
    label: "Negativ",
    sublabel: "Rückgang · Fehler · Unter Ziel",
    icon: TrendingDown,
    color:  "#E8402A",
    light:  "#FDEEE9",
    border: "#F4A090",
    text:   "#A01A08",
    cssVar: "--signal-negative",
    usage: ["Negative Veränderungen (-%)", "Ziele verfehlt", "Fehlgeschlagene Aktionen", "Fehler & Validierung"],
    examples: ["−8.3%", "−€ 12.400", "Ziel verfehlt", "Abgelehnt"],
    dontUse: "Nicht für Warnungen oder Hinweise verwenden – dafür Neutral nutzen",
  },
  neutral: {
    key: "neutral",
    label: "Neutral",
    sublabel: "Stabil · Unverändert · Unbekannt",
    icon: Minus,
    color:  "#6B7A9A",
    light:  "#F0F2F7",
    border: "#B0BACC",
    text:   "#3A4560",
    cssVar: "--signal-neutral",
    usage: ["Keine Veränderung (0%)", "Unbekannte Werte", "Deaktivierte Zustände", "Nicht verfügbare Daten"],
    examples: ["0.0%", "Unbekannt", "Inaktiv", "N/A"],
    dontUse: "Nicht für positive oder negative Werte verwenden – diese haben eigene Farben",
  },
};

const SEMANTIC_COLORS = Object.values(SIGNAL);

/* ── Pastell-Palette ── */
const PASTEL_PALETTE = [
  { name: "Lime",           sub: "#E4FF97",  bg: "#E4FF97", fg: "#0A0A0A", project: "Free Agents",    open: false },
  { name: "Blau-Pastell",   sub: "#C8DCFF",  bg: "#C8DCFF", fg: "#1A2A4A", project: "Projekt Blau",   open: true  },
  { name: "Orchid-Pastell", sub: "#E8D4FF",  bg: "#E8D4FF", fg: "#3A1A5A", project: "Projekt Orchid", open: true  },
  { name: "Rose-Pastell",   sub: "#FFD4E4",  bg: "#FFD4E4", fg: "#5A1A2A", project: "Projekt Rose",   open: true  },
  { name: "Mint-Pastell",   sub: "#C8F0DC",  bg: "#C8F0DC", fg: "#0A3A20", project: "Projekt Mint",   open: true  },
  { name: "Butter-Pastell", sub: "#FFF4C0",  bg: "#FFF4C0", fg: "#4A3A00", project: "Projekt Butter", open: true  },
];

/* ── Primäre Systemfarben ── */
const PRIMARY_COLORS = [
  { name: "Lime (Leading)",   hex: "#E4FF97", fg: "#0A0A0A", desc: "Primäre Akzentfarbe · Buttons · Highlights · CTAs" },
  { name: "Schwarz",          hex: "#0A0A0A", fg: "#FFFFFF", desc: "Fundament · Sidebar · Überschriften · Kontrast" },
  { name: "Weiß",             hex: "#FFFFFF", fg: "#0A0A0A", desc: "Seitenhintergrund · Cards · Content-Flächen", border: true },
  { name: "Grau (Muted)",     hex: "#6B6B6B", fg: "#FFFFFF", desc: "Sekundärtext · Icons · Beschriftungen" },
];

/* ── Delta-Badge ── */
const DeltaBadge: React.FC<{
  value: string;
  type: "positive" | "negative" | "neutral" | "warning";
}> = ({ value, type }) => {
  const map = {
    positive: { icon: ArrowUpRight,   color: "#0F6038", bg: "#E8F8EF", border: "#7DD4A8" },
    negative: { icon: ArrowDownRight, color: "#A01A08", bg: "#FDEEE9", border: "#F4A090" },
    warning:  { icon: ArrowRight,     color: "#7A4A00", bg: "#FFF8E8", border: "#F0D080" },
    neutral:  { icon: Minus,          color: "#3A4560", bg: "#F0F2F7", border: "#B0BACC" },
  };
  const { icon: Icon, color, bg, border } = map[type];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono border"
      style={{ color, background: bg, borderColor: border }}>
      <Icon className="w-3 h-3" />{value}
    </span>
  );
};

/* ── Signal-Token-Karte ── */
const SignalCard: React.FC<{ item: typeof SEMANTIC_COLORS[0] }> = ({ item }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const Icon = item.icon;

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const tokens = [
    { label: "Hauptfarbe",  var: item.cssVar,          swatch: item.color },
    { label: "Hintergrund", var: `${item.cssVar}-light`, swatch: item.light },
    { label: "Rahmen",      var: `${item.cssVar}-border`, swatch: item.border },
    { label: "Text",        var: `${item.cssVar}-text`,   swatch: item.text },
  ];

  return (
    <GrainCard className="overflow-hidden">
      {/* Farbstreifen */}
      <div className="h-2 w-full" style={{ background: item.color }} />
      <GrainCardContent className="pt-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: item.light }}>
            <Icon className="w-5 h-5" style={{ color: item.color }} />
          </div>
          <div>
            <h3 className="font-ui font-semibold text-sm text-[#0A0A0A]">{item.label}</h3>
            <p className="text-[11px] font-ui text-[#6B6B6B]">{item.sublabel}</p>
          </div>
        </div>

        {/* Tokens */}
        <div className="space-y-1.5">
          {tokens.map(token => (
            <button key={token.var}
              onClick={() => copy(`var(${token.var})`, token.var)}
              className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#F7F7F7] hover:bg-[#F0F0F0] transition-colors group text-left">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-3 h-3 rounded-sm flex-shrink-0 border border-[#E8E8E8]"
                  style={{ background: token.swatch }} />
                <span className="text-[10px] font-mono text-[#6B6B6B] truncate">{token.var}</span>
              </div>
              {copied === token.var
                ? <CheckCheck className="w-3 h-3 text-[#1A9E5A] flex-shrink-0" />
                : <Copy className="w-3 h-3 text-[#6B6B6B]/40 group-hover:text-[#6B6B6B] flex-shrink-0" />
              }
            </button>
          ))}
        </div>

        {/* Verwendung */}
        <div>
          <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-[#6B6B6B] mb-2">Verwendung</p>
          <ul className="space-y-1">
            {item.usage.map(u => (
              <li key={u} className="flex items-center gap-1.5 text-[11px] font-ui text-[#6B6B6B]">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: item.color }} />
                {u}
              </li>
            ))}
          </ul>
        </div>

        {/* Nicht verwenden */}
        <div className="flex items-start gap-1.5 p-2.5 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8]">
          <XCircle className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#6B6B6B]/50" />
          <p className="text-[10px] font-ui text-[#6B6B6B] leading-relaxed">{item.dontUse}</p>
        </div>
      </GrainCardContent>
    </GrainCard>
  );
};

/* ── Haupt-Komponente ── */
export const ColorSection: React.FC = () => {
  return (
    <section className="space-y-10">

      {/* ── Pastell-Palette Übersicht ── */}
      <div>
        <p className="section-label mb-3">FARBCODIERUNG IM UEBERBLICK</p>
        <div className="rounded-2xl overflow-hidden border border-[#E8E8E8] flex">
          {PASTEL_PALETTE.map((c, i) => (
            <div key={c.name} className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
              <div className="h-40" style={{ background: c.bg }} />
              <div
                className="p-4 border-t border-[#E8E8E8]"
                style={{ borderLeft: i > 0 ? "1px solid #E8E8E8" : "none" }}
              >
                <p className="text-xs font-semibold font-ui text-[#0A0A0A] leading-tight">{c.project}</p>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: "#6B6B6B" }}>{c.name}</p>
                {c.open && (
                  <span className="inline-block mt-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#F4F4F4", color: "#9B9B9B", letterSpacing: "0.05em" }}>— offen —</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <div>
        <p className="section-label mb-2">02 — Farbsystem</p>
        <h2 className="font-display text-3xl font-bold text-[#0A0A0A] tracking-tight mb-3">
          Semantische Farbkodierung
        </h2>
        <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-2xl mb-4">
          Farbe kommuniziert Bedeutung – nicht Dekoration.{" "}
          <strong className="text-[#0A0A0A]">#E4FF97 Lime + #0A0A0A Schwarz</strong> als führende Systemfarben,
          ergänzt durch drei eindeutige Signalfarben für die Datenbewertung.
        </p>
        <div className="flex flex-wrap gap-2">
          <GrainBadge variant="default" size="sm">Lime + Schwarz</GrainBadge>
          <GrainBadge variant="positive" size="sm">Positiv</GrainBadge>
          <GrainBadge variant="negative" size="sm">Negativ</GrainBadge>
          <GrainBadge variant="neutral" size="sm">Neutral</GrainBadge>
          <GrainBadge variant="muted" size="sm">CSS Custom Properties</GrainBadge>
        </div>
      </div>

      {/* ── Primäre Systemfarben ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Primäre Systemfarben</GrainCardTitle>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Lime und Schwarz sind die führenden Farben – alles andere ist unterstützend
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRIMARY_COLORS.map(c => (
              <div key={c.name} className="rounded-2xl overflow-hidden">
                <div className="h-20 flex items-center justify-center"
                  style={{ background: c.hex, border: c.border ? "1px solid #E8E8E8" : "none" }}>
                  <span className="font-mono text-xs font-bold" style={{ color: c.fg }}>{c.hex}</span>
                </div>
                <div className="p-3 border border-t-0 border-[#E8E8E8] rounded-b-2xl">
                  <p className="text-xs font-semibold font-ui text-[#0A0A0A]">{c.name}</p>
                  <p className="text-[10px] font-ui text-[#6B6B6B] mt-0.5 leading-snug">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* ── Signalfarben Übersicht ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Signalfarben: 3 semantische Zustände</GrainCardTitle>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Jeder Zustand hat 4 Farbebenen: Hauptfarbe · Hintergrund · Rahmen · Text
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-3 gap-3">
            {SEMANTIC_COLORS.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.key}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border text-center"
                  style={{ borderColor: item.border, background: item.light }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: item.color }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-ui" style={{ color: item.text }}>{item.label}</p>
                    <p className="text-[10px] font-ui mt-0.5" style={{ color: item.text, opacity: 0.7 }}>{item.sublabel.split(" · ")[0]}</p>
                    <div className="w-full h-1 rounded-full mt-2" style={{ background: item.color }} />
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
          <p className="text-xs text-[#6B6B6B] mt-0.5">
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
              <DeltaBadge value="0.0%" type="neutral" />
              <DeltaBadge value="N/A" type="neutral" />
            </div>

            {/* KPI-Demo */}
            <div>
              <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-[#6B6B6B] mb-3">
                KPI-Karten mit Signalfarben
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Umsatz",       value: "€ 284.500", delta: "+12.4%",       type: "positive" as const, sub: "vs. Vormonat" },
                  { label: "Kosten",       value: "€ 142.300", delta: "−8.3%",        type: "negative" as const, sub: "vs. Vormonat" },
                  { label: "Kapazität",    value: "87 / 100",  delta: "87% Auslastung",type: "warning"  as const, sub: "Grenzwert: 90%" },
                  { label: "Verfügbarkeit",value: "99.9%",     delta: "0.0%",          type: "neutral"  as const, sub: "Stabil" },
                ].map(kpi => {
                  const sig = kpi.type === "warning"
                    ? { color: "#C87A00", light: "#FFF8E8", border: "#F0D080", text: "#7A4A00" }
                    : kpi.type === "positive" ? SIGNAL.positive
                    : kpi.type === "negative" ? SIGNAL.negative
                    : SIGNAL.neutral;
                  const Icon = { positive: TrendingUp, negative: TrendingDown, warning: AlertTriangle, neutral: Minus }[kpi.type];
                  return (
                    <div key={kpi.label} className="p-4 rounded-2xl border"
                      style={{ borderColor: sig.border, background: sig.light }}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-semibold font-ui text-[#6B6B6B]">{kpi.label}</p>
                        <Icon className="w-4 h-4" style={{ color: sig.color }} />
                      </div>
                      <p className="text-lg font-display font-bold text-[#0A0A0A] leading-tight">{kpi.value}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <DeltaBadge value={kpi.delta} type={kpi.type} />
                      </div>
                      <p className="text-[10px] font-ui text-[#6B6B6B] mt-1">{kpi.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tabellen-Demo */}
            <div>
              <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-[#6B6B6B] mb-3">
                Tabellen mit Status-Farbkodierung
              </p>
              <div className="rounded-xl border border-[#E8E8E8] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E8E8E8] bg-[#F7F7F7]">
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold font-ui text-[#6B6B6B]">Produkt</th>
                      <th className="text-right px-4 py-2.5 text-[11px] font-semibold font-ui text-[#6B6B6B]">Umsatz</th>
                      <th className="text-right px-4 py-2.5 text-[11px] font-semibold font-ui text-[#6B6B6B]">Veränderung</th>
                      <th className="text-center px-4 py-2.5 text-[11px] font-semibold font-ui text-[#6B6B6B]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Flux Pro",        revenue: "€ 84.200",  delta: "+18.2%",       type: "positive" as const, status: "Aktiv" },
                      { name: "Flux Basic",       revenue: "€ 42.100",  delta: "+4.1%",        type: "positive" as const, status: "Aktiv" },
                      { name: "Flux Team",        revenue: "€ 31.800",  delta: "−6.4%",        type: "negative" as const, status: "Rückgang" },
                      { name: "Flux Free",        revenue: "€ 0",       delta: "0.0%",          type: "neutral"  as const, status: "Stabil" },
                      { name: "Flux Enterprise",  revenue: "€ 126.400", delta: "87% Ziel",      type: "warning"  as const, status: "Prüfen" },
                    ].map((row, i) => {
                      const sig = row.type === "warning"
                        ? { color: "#C87A00", light: "#FFF8E8", border: "#F0D080" }
                        : row.type === "positive" ? SIGNAL.positive
                        : row.type === "negative" ? SIGNAL.negative
                        : SIGNAL.neutral;
                      return (
                        <tr key={row.name} className={`border-b border-[#E8E8E8]/50 ${i % 2 !== 0 ? "bg-[#FAFAFA]" : ""}`}>
                          <td className="px-4 py-3 font-ui text-sm font-medium text-[#0A0A0A]">{row.name}</td>
                          <td className="px-4 py-3 font-ui text-sm text-right text-[#0A0A0A] font-semibold">{row.revenue}</td>
                          <td className="px-4 py-3 text-right"><DeltaBadge value={row.delta} type={row.type} /></td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-ui border"
                              style={{ color: sig.color, background: sig.light, borderColor: sig.border }}>
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

      {/* ── Signal-Token-Karten ── */}
      <div>
        <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-[#6B6B6B] mb-4">
          Signalfarben — Tokens & Verwendung
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SEMANTIC_COLORS.map((item, i) => (
            <motion.div key={item.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <SignalCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CSS-Variablen Referenz ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>CSS Custom Properties Referenz</GrainCardTitle>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Alle Tokens sind als CSS-Variablen verfügbar und können direkt in Tailwind verwendet werden
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="rounded-xl bg-[#0A0A0A] p-5 font-mono text-[11px] leading-relaxed overflow-x-auto">
            <div className="text-white/30">{"/* Semantisches Datenfarbsystem */"}</div>
            <div className="mt-3 space-y-3">
              {[
                { comment: "Positiv: Wachstum · Erfolg · Über Ziel", var: "--signal-positive", val: "#1A9E5A", color: "#5EEAA0" },
                { comment: "Negativ: Rückgang · Fehler · Unter Ziel", var: "--signal-negative", val: "#E8402A", color: "#FF9080" },
                { comment: "Neutral: Stabil · Unverändert · Unbekannt", var: "--signal-neutral", val: "#6B7A9A", color: "#AABBDD" },
              ].map(t => (
                <div key={t.var}>
                  <div className="text-white/30">{`/* ${t.comment} */`}</div>
                  <div>
                    <span style={{ color: t.color }}>{t.var}</span>
                    <span className="text-white/60">: {t.val};</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 text-white/30">{"/* Tailwind-Klassen */"}</div>
            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
              {["signal-positive-badge","signal-negative-badge","signal-neutral-badge","delta-up","delta-down","delta-neutral","value-positive","value-negative"].map(cls => (
                <span key={cls} className="text-[#E4FF97]">.{cls}</span>
              ))}
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

    </section>
  );
};
