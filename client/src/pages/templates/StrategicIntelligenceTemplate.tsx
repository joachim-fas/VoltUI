/**
 * Strategic Intelligence System – Volt UI Template
 *
 * Layout nach Referenz:
 * - Navbar: Logo + Tabs (Fragen / Verstehen / Workspace) + Settings
 * - Workspace-Header: Breadcrumb + Status-Badge + View-Switcher (Board/CLI/Nodes/Kanban)
 * - Thema-Header: Badges + Titel + Beschreibung + Konfidenz/Signale-Metriken
 * - Zweispaltig: Hauptinhalt (Szenarien, Dimensionen, Synthese) | Sidebar (Quellen, Fragen)
 *
 * CLAUDE CODE INTEGRATION
 * Prompt-Vorlage:
 * "Erweitere dieses Volt-UI-Template um [Feature]. Verwende ausschließlich
 *  Komponenten aus @/components/volt/. Halte dich an die bestehende
 *  Typografie (font-display, font-body, font-mono) und das Farbsystem
 *  (CSS-Variablen: --primary, --signal-positive-*, --signal-negative-*)."
 */

import React, { useState } from "react";
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltProgress } from "@/components/volt/VoltProgress";
import {
  ArrowLeft,
  Settings,
  LayoutGrid,
  Terminal,
  Network,
  Columns,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  ExternalLink,
  BookOpen,
  MessageSquare,
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
}

interface Dimension {
  label: string;
  value: number;
  delta: number;
  color: string;
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
    accentColor: "#6EDFA0",
  },
  {
    id: "base",
    type: "base",
    title: "Basisfall: Inkrementelle Transition mit Reibung",
    description:
      "Stetiger Ausbau, aber gebremst durch Fachkräftemangel, Netzengpässe und bürokratische Hürden. IRA-Konkurrenz hält an.",
    probability: 60,
    tags: ["STRATEGIE"],
    accentColor: "#7BBCF5",
  },
  {
    id: "pes",
    type: "pessimistic",
    title: "Pessimistisch: Backlash und Investitionsstopp",
    description:
      "Politische Richtungswechsel, anhaltende Inflation und Lieferketten-Schocks verlangsamen die Transition signifikant.",
    probability: 20,
    tags: [],
    accentColor: "#F5829A",
  },
];

const DIMENSIONS: Dimension[] = [
  { label: "Technologie & Innovation", value: 82, delta: 5,  color: "#7BBCF5" },
  { label: "Markt & Investitionen",    value: 68, delta: -2, color: "#F5D860" },
  { label: "Geopolitik & Versorgung",  value: 45, delta: 0,  color: "#F5829A" },
  { label: "Regulierung & Politik",    value: 90, delta: 12, color: "#6EDFA0" },
];

const SIGNALS: Signal[] = [
  { source: "Reuters",    age: "Heute, 14:28",  headline: "EU kündigt neue Förderrichtlinien für Batterie-Recycling an." },
  { source: "AgendaTen",  age: "Gestern",        headline: "Signifikanter Anstieg von Publikationen zu Perowskit-Solarzellen (+45% YoY)." },
  { source: "Hacker News",age: "Vor 2 Tagen",    headline: "Diskussion über Open-Source Grid-Management Software trendet." },
  { source: "Bloomberg",  age: "Vor 3 Tagen",    headline: "Kupferpreise erreichen 6-Monats-Hoch aufgrund erwarteter Nachfrage." },
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
   HILFSFUNKTIONEN
   ───────────────────────────────────────────────────────────────────────── */

function DeltaBadge({ delta }: { delta: number }) {
  if (delta === 0) return <span className="text-xs font-mono text-muted-foreground ml-1">–</span>;
  const pos = delta > 0;
  return (
    <span className={`text-xs font-mono ml-1 ${pos ? "text-emerald-600" : "text-rose-500"}`}>
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
        <div className="flex items-center h-12 px-4 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-sm font-bold text-primary">&gt;_</span>
            <span className="font-display font-bold text-sm tracking-tight">SIS</span>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {(["fragen", "verstehen", "workspace"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors capitalize ${
                  activeTab === tab
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Settings */}
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Workspace-Header ── */}
      <div className="border-b border-border px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Workspace</span>
          <VoltBadge variant="positive" size="sm">Aktiv</VoltBadge>
        </div>
        {/* View-Switcher */}
        <div className="flex items-center gap-1">
          {views.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors ${
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
          <div className="mb-8">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                {/* Kategorie-Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <VoltBadge variant="muted" size="sm">Deep-Dive</VoltBadge>
                  <VoltBadge variant="positive" size="sm">Adopt</VoltBadge>
                </div>
                <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
                  Renewable Energy &amp; Green Tech
                </h1>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  Der Übergang zu erneuerbaren Energien beschleunigt sich global, getrieben durch sinkende Kosten für
                  Solar/Wind, geopolitische Autarkiebestrebungen (z.B. REPowerEU) und regulatorischen Druck. Engpässe
                  bestehen weiterhin bei Netzinfrastruktur, Energiespeicherung und kritischen Rohstoffen.
                </p>
              </div>

              {/* Metriken */}
              <div className="flex items-start gap-6 flex-shrink-0">
                <div className="text-right">
                  <div className="font-display font-bold text-4xl tracking-tight">74%</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5">Konfidenz</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-4xl tracking-tight">1.2k</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5">Signale</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Zweispaltiges Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

            {/* ── Linke Spalte: Hauptinhalt ── */}
            <div className="space-y-8">

              {/* Zukunftsszenarien */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-primary" />
                  <h2 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                    Zukunftsszenarien (2030)
                  </h2>
                </div>
                <div className="space-y-3">
                  {SCENARIOS.map((s) => (
                    <div
                      key={s.id}
                      className="border border-border rounded-lg p-4 hover:border-foreground/30 transition-colors"
                      style={{ borderLeftColor: s.accentColor, borderLeftWidth: 3 }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3
                          className="font-display font-semibold text-sm leading-snug"
                          style={{ color: s.accentColor }}
                        >
                          {s.title}
                        </h3>
                        <span className="font-mono text-sm font-bold flex-shrink-0 text-muted-foreground">
                          {s.probability}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {s.description}
                      </p>
                      {s.tags.length > 0 && (
                        <div className="flex items-center gap-2">
                          {s.tags.map((tag) => (
                            <button
                              key={tag}
                              className="px-2 py-0.5 text-xs font-mono font-semibold border border-border rounded hover:bg-secondary transition-colors"
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

              {/* Dimensions-Grid */}
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DIMENSIONS.map((d) => (
                    <div key={d.label} className="border border-border rounded-lg p-4">
                      <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                        {d.label}
                      </div>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="font-display font-bold text-3xl">{d.value}%</span>
                        <DeltaBadge delta={d.delta} />
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${d.value}%`, backgroundColor: d.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Synthese & Handlungsempfehlungen */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h2 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                    Synthese &amp; Handlungsempfehlungen
                  </h2>
                </div>
                <div className="border border-border rounded-lg p-5 space-y-5">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                      Strategische Interpretation
                    </div>
                    <ul className="space-y-2">
                      {SYNTHESIS.interpretation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                      Empfohlene Aktionen
                    </div>
                    <ul className="space-y-2">
                      {SYNTHESIS.actions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="font-mono text-xs text-primary mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

            </div>

            {/* ── Rechte Sidebar ── */}
            <aside className="space-y-6">

              {/* Quellen & Signale */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                    Quellen &amp; Signale
                  </h3>
                </div>
                <div className="space-y-0 border border-border rounded-lg overflow-hidden">
                  {SIGNALS.map((s, i) => (
                    <div
                      key={i}
                      className="px-3 py-3 border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{s.age}</span>
                        <span className="text-xs font-mono font-semibold text-primary">{s.source}</span>
                      </div>
                      <p className="text-xs text-foreground leading-snug">{s.headline}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Weiterführende Fragen */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                    Weiterführende Fragen
                  </h3>
                </div>
                <div className="space-y-2">
                  {FOLLOW_UP.map((q, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-3 py-2.5 text-xs text-muted-foreground border border-border rounded-lg hover:border-foreground/40 hover:text-foreground transition-colors leading-snug"
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
      <div className="border-t border-border px-6 py-3 flex items-center justify-between">
        <Link
          href="/showcase"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Zurück zum Showcase
        </Link>
        <span className="text-xs font-mono text-muted-foreground">volt ui · Strategic Intelligence</span>
      </div>

    </div>
  );
}
