/**
 * Strategic Intelligence System – Volt UI Template
 *
 * Layout:
 * - Navbar: Logo + Tabs (Fragen / Verstehen / Workspace) + Settings
 * - Workspace-Header: Breadcrumb + Status-Badge + View-Switcher
 * - Thema-Header: Badges + Titel + Beschreibung + Konfidenz/Signale
 * - Zweispaltig: Hauptinhalt (Szenarien, Dimensionen, Synthese) | Sidebar
 *
 * Pastell-Segmente:
 * - Szenarien     → --pastel-mint    (#C3F4D3)
 * - Dimensionen   → --pastel-butter  (#FFF5BA)
 * - Synthese      → --pastel-blue    (#D4E8FF)
 * - Quellen       → --pastel-rose    (#FFD6E0)
 * - Fragen        → --pastel-orchid  (#FDE2FF)
 *
 * Icons: w-8 h-8 rounded-xl flex items-center justify-center (Volt-Standard)
 *
 * CLAUDE CODE INTEGRATION
 * Prompt-Vorlage:
 * "Erweitere dieses Volt-UI-Template um [Feature]. Verwende ausschließlich
 *  Komponenten aus @/components/volt/. Halte dich an die bestehende
 *  Typografie (font-display, font-body, font-mono) und das Farbsystem
 *  (CSS-Variablen: --primary, --pastel-*, --signal-positive-*)."
 */

import React, { useState } from "react";
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import {
  ArrowLeft,
  Settings,
  LayoutGrid,
  Terminal,
  Network,
  Columns,
  ChevronRight,
  Zap,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   TYPEN
   ───────────────────────────────────────────────────────────────────────── */

interface Scenario {
  id: string;
  type: "optimistic" | "base" | "pessimistic";
  title: string;
  description: string;
  probability: number;
  tags: string[];
  accentColor: string;
  textColor: string;
}

interface Dimension {
  label: string;
  value: number;
  delta: number;
  barColor: string;
}

interface Signal {
  source: string;
  age: string;
  headline: string;
}

interface FollowUpQuestion {
  text: string;
}

/* ─────────────────────────────────────────────────────────────────────────
   MOCK-DATEN
   ───────────────────────────────────────────────────────────────────────── */

const SCENARIOS: Scenario[] = [
  {
    id: "opt",
    type: "optimistic",
    title: "Optimistisch: Grüner Technologiesprung Europa",
    description:
      "Massive Investitionen und beschleunigte Genehmigungsverfahren führen zu einer Übererfüllung der EU-Klimaziele. Europa wird Exporteur von Green-Tech.",
    probability: 29,
    tags: ["VERTIEFEN", "WAS WENN"],
    accentColor: "#1A9E5A",
    textColor: "#1A9E5A",
  },
  {
    id: "base",
    type: "base",
    title: "Basisfall: Inkrementelle Transition mit Reibung",
    description:
      "Stetiger Ausbau, aber gebremst durch Fachkräftemangel, Netzengpässe und bürokratische Hürden. IRA-Konkurrenz hält an.",
    probability: 60,
    tags: ["STRATEGIE"],
    accentColor: "#3B82F6",
    textColor: "#1D4ED8",
  },
  {
    id: "pes",
    type: "pessimistic",
    title: "Pessimistisch: Backlash und Investitionsstopp",
    description:
      "Politische Richtungswechsel, anhaltende Inflation und Lieferketten-Schocks verlangsamen die Transition signifikant.",
    probability: 20,
    tags: [],
    accentColor: "#EF4444",
    textColor: "#B91C1C",
  },
];

const DIMENSIONS: Dimension[] = [
  { label: "Technologie & Innovation", value: 82, delta: 5,  barColor: "#3B82F6" },
  { label: "Markt & Investitionen",    value: 68, delta: -2, barColor: "#F59E0B" },
  { label: "Geopolitik & Versorgung",  value: 45, delta: 0,  barColor: "#EF4444" },
  { label: "Regulierung & Politik",    value: 90, delta: 12, barColor: "#1A9E5A" },
];

const SIGNALS: Signal[] = [
  { source: "Reuters",     age: "Heute, 14:28",  headline: "EU kündigt neue Förderrichtlinien für Batterie-Recycling an." },
  { source: "AgendaTen",   age: "Gestern",        headline: "Signifikanter Anstieg von Publikationen zu Perowskit-Solarzellen (+45% YoY)." },
  { source: "Hacker News", age: "Vor 2 Tagen",    headline: "Diskussion über Open-Source Grid-Management Software trendet." },
  { source: "Bloomberg",   age: "Vor 3 Tagen",    headline: "Kupferpreise erreichen 6-Monats-Hoch aufgrund erwarteter Nachfrage." },
];

const FOLLOW_UP: FollowUpQuestion[] = [
  { text: "Welche Startups dominieren den Bereich \"Long-Duration Energy Storage\"?" },
  { text: "Wie wirkt sich der EU Carbon Border Adjustment Mechanism (CBAM) aus?" },
];

const SYNTHESIS = {
  interpretation: [
    "Fokusverschiebung von reiner Erzeugung hin zu Speicherung und Netzintegration.",
    "Europa positioniert sich als regulatorischer Vorreiter, riskiert aber Wettbewerbsnachteile.",
    "Kritische Rohstoffabhängigkeiten bleiben strukturelles Risiko für die gesamte Wertschöpfungskette.",
  ],
  actions: [
    "Monitoring: Quartalsweise Überprüfung der EU-Netzausbau-Meilensteine.",
    "Deep-Dive: Analyse der Top-Investoren im Bereich Grid-Software und Demand-Response.",
    "Szenario-Update: Trigger-Ereignisse für Szenario-Wechsel definieren.",
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   HILFS-KOMPONENTEN
   ───────────────────────────────────────────────────────────────────────── */

/** Volt-Standard Icon-Wrapper: w-8 h-8 rounded-xl */
function IconBox({
  children,
  bg = "#E4FF97",
  color = "#0A0A0A",
}: {
  children: React.ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <div
      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </div>
  );
}

/** Sektion-Header mit Icon-Box im Volt-Stil */
function SectionHeader({
  icon,
  label,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <IconBox bg={iconBg} color={iconColor}>
        {icon}
      </IconBox>
      <span className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function DeltaTag({ delta }: { delta: number }) {
  if (delta === 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-mono text-muted-foreground">
        <Minus className="w-3 h-3" />
      </span>
    );
  const pos = delta > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-mono font-semibold ${
        pos ? "text-emerald-700" : "text-rose-600"
      }`}
    >
      {pos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {pos ? "+" : ""}{delta}%
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HAUPT-KOMPONENTE
   ───────────────────────────────────────────────────────────────────────── */

export default function StrategicIntelligenceTemplate() {
  const [activeTab, setActiveTab] = useState<"fragen" | "verstehen" | "workspace">("workspace");
  const [activeView, setActiveView] = useState<"board" | "cli" | "nodes" | "kanban">("board");

  const views = [
    { id: "board",  label: "Board",  Icon: LayoutGrid },
    { id: "cli",    label: "CLI",    Icon: Terminal },
    { id: "nodes",  label: "Nodes",  Icon: Network },
    { id: "kanban", label: "Kanban", Icon: Columns },
  ] as const;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center h-12 px-5 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-background leading-none">&gt;_</span>
            </div>
            <span className="font-display font-bold text-sm tracking-tight">SIS</span>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {(["fragen", "verstehen", "workspace"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          <button className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Workspace-Header ── */}
      <div className="border-b border-border px-5 py-2 flex items-center justify-between bg-secondary/30">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Workspace</span>
          <VoltBadge variant="positive" size="sm">Aktiv</VoltBadge>
        </div>
        <div className="flex items-center gap-1">
          {views.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition-colors ${
                activeView === id
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Hauptbereich ── */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* ── Thema-Header ── */}
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <VoltBadge variant="muted" size="sm">Deep-Dive</VoltBadge>
                  <VoltBadge variant="positive" size="sm">Adopt</VoltBadge>
                </div>
                <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
                  Renewable Energy &amp; Green Tech
                </h1>
                <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm">
                  Der Übergang zu erneuerbaren Energien beschleunigt sich global, getrieben durch sinkende Kosten für
                  Solar/Wind, geopolitische Autarkiebestrebungen (z.B. REPowerEU) und regulatorischen Druck. Engpässe
                  bestehen weiterhin bei Netzinfrastruktur, Energiespeicherung und kritischen Rohstoffen.
                </p>
              </div>
              {/* Metriken */}
              <div className="flex items-start gap-5 flex-shrink-0">
                <div className="text-right">
                  <div className="font-display font-bold text-4xl tracking-tight">74%</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5">Konfidenz</div>
                </div>
                <div className="w-px h-12 bg-border self-center" />
                <div className="text-right">
                  <div className="font-display font-bold text-4xl tracking-tight">1.2k</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5">Signale</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Zweispaltiges Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-6">

            {/* ── Linke Spalte ── */}
            <div className="space-y-6">

              {/* Zukunftsszenarien – Pastell Mint */}
              <section className="rounded-2xl p-5" style={{ backgroundColor: "#C3F4D3" }}>
                <SectionHeader
                  icon={<Zap className="w-4 h-4" />}
                  label="Zukunftsszenarien (2030)"
                  iconBg="#0A0A0A"
                  iconColor="#E4FF97"
                />
                <div className="space-y-3">
                  {SCENARIOS.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white/70 rounded-xl p-4 border-l-4 transition-colors"
                      style={{ borderLeftColor: s.accentColor }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <h3 className="font-display font-semibold text-sm leading-snug" style={{ color: s.textColor }}>
                          {s.title}
                        </h3>
                        <span className="font-mono text-sm font-bold flex-shrink-0 text-muted-foreground">
                          {s.probability}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{s.description}</p>
                      {s.tags.length > 0 && (
                        <div className="flex items-center gap-2">
                          {s.tags.map((tag) => (
                            <button
                              key={tag}
                              className="px-2 py-0.5 text-xs font-mono font-semibold border border-border/60 rounded-lg bg-white/80 hover:bg-white transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Dimensions-Grid – Pastell Butter */}
              <section className="rounded-2xl p-5" style={{ backgroundColor: "#FFF5BA" }}>
                <SectionHeader
                  icon={<BarChart3 className="w-4 h-4" />}
                  label="Dimensionen"
                  iconBg="#0A0A0A"
                  iconColor="#E4FF97"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DIMENSIONS.map((d) => (
                    <div key={d.label} className="bg-white/70 rounded-xl p-4">
                      <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                        {d.label}
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-display font-bold text-3xl">{d.value}%</span>
                        <DeltaTag delta={d.delta} />
                      </div>
                      <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${d.value}%`, backgroundColor: d.barColor }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Synthese – Pastell Blue */}
              <section className="rounded-2xl p-5" style={{ backgroundColor: "#D4E8FF" }}>
                <SectionHeader
                  icon={<Lightbulb className="w-4 h-4" />}
                  label="Synthese & Handlungsempfehlungen"
                  iconBg="#0A0A0A"
                  iconColor="#E4FF97"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Interpretation */}
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                      Strategische Interpretation
                    </div>
                    <ul className="space-y-2">
                      {SYNTHESIS.interpretation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                          <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Aktionen */}
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                      Empfohlene Aktionen
                    </div>
                    <ul className="space-y-2">
                      {SYNTHESIS.actions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-relaxed">
                          <span className="font-mono text-xs font-bold text-foreground mt-0.5 flex-shrink-0 w-5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

            </div>

            {/* ── Rechte Sidebar ── */}
            <aside className="space-y-4">

              {/* Quellen & Signale – Pastell Rose */}
              <section className="rounded-2xl p-4" style={{ backgroundColor: "#FFD6E0" }}>
                <SectionHeader
                  icon={<BookOpen className="w-4 h-4" />}
                  label="Quellen & Signale"
                  iconBg="#0A0A0A"
                  iconColor="#E4FF97"
                />
                <div className="space-y-0 rounded-xl overflow-hidden border border-black/10">
                  {SIGNALS.map((s, i) => (
                    <div
                      key={i}
                      className="px-3 py-3 border-b border-black/10 last:border-b-0 bg-white/60 hover:bg-white/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{s.age}</span>
                        <span className="text-xs font-mono font-bold text-foreground">{s.source}</span>
                      </div>
                      <p className="text-xs text-foreground leading-snug">{s.headline}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Weiterführende Fragen – Pastell Orchid */}
              <section className="rounded-2xl p-4" style={{ backgroundColor: "#FDE2FF" }}>
                <SectionHeader
                  icon={<MessageSquare className="w-4 h-4" />}
                  label="Weiterführende Fragen"
                  iconBg="#0A0A0A"
                  iconColor="#E4FF97"
                />
                <div className="space-y-2">
                  {FOLLOW_UP.map((q, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-3 py-2.5 text-xs bg-white/60 hover:bg-white/80 border border-black/10 rounded-xl transition-colors leading-snug"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              </section>

            </aside>
          </div>
        </div>
      </div>

      {/* ── Footer-Nav ── */}
      <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-secondary/20">
        <Link
          href="/showcase"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Zurück zum Showcase
        </Link>
        <span className="text-xs font-mono text-muted-foreground">&gt;_ volt ui · Strategic Intelligence</span>
      </div>

    </div>
  );
}
