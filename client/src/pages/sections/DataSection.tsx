/**
 * DataSection – Grain UI v3
 * Fokus: Klare Informationsvermittlung
 * Jeder Chart-Typ erklärt: Was zeigt er? Wann nutze ich ihn? Was lese ich ab?
 */

import React, { useState } from "react";
import {
  GrainAreaChart, GrainBarChart, GrainLineChart, GrainDonutChart,
  GrainRadarChart, GrainScatterChart, GrainComposedChart,
  GrainRadialBarChart, GrainFunnelChart, GrainTrendChart,
  GrainStackedAreaChart, GrainStackedBarChart,
  GRAIN_PASTEL,
} from "@/components/grain/GrainChart";
import { GrainTable } from "@/components/grain/GrainTable";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, Zap, BarChart2, Activity,
  PieChart, GitBranch, Layers, Target, Info,
  CheckCircle2, ArrowRight,
} from "lucide-react";

/* ── Data ── */
const monthlyData = [
  { name: "Jan", Besucher: 1200, Konversionen: 180, Umsatz: 4200 },
  { name: "Feb", Besucher: 1900, Konversionen: 240, Umsatz: 5800 },
  { name: "Mär", Besucher: 1600, Konversionen: 210, Umsatz: 5100 },
  { name: "Apr", Besucher: 2400, Konversionen: 320, Umsatz: 7600 },
  { name: "Mai", Besucher: 2100, Konversionen: 290, Umsatz: 6900 },
  { name: "Jun", Besucher: 2800, Konversionen: 380, Umsatz: 9200 },
  { name: "Jul", Besucher: 3200, Konversionen: 440, Umsatz: 10800 },
];

const weeklyData = [
  { name: "Mo", Design: 42, Code: 65, Review: 28 },
  { name: "Di", Design: 55, Code: 78, Review: 35 },
  { name: "Mi", Design: 38, Code: 90, Review: 42 },
  { name: "Do", Design: 62, Code: 72, Review: 55 },
  { name: "Fr", Design: 70, Code: 85, Review: 48 },
  { name: "Sa", Design: 25, Code: 30, Review: 18 },
  { name: "So", Design: 15, Code: 20, Review: 10 },
];

const donutData = [
  { name: "Buttons",    value: 28 },
  { name: "Cards",      value: 22 },
  { name: "Forms",      value: 18 },
  { name: "Navigation", value: 15 },
  { name: "Charts",     value: 12 },
  { name: "Sonstiges",  value: 5  },
];

const radarData = [
  { subject: "Performance",   A: 88, B: 72 },
  { subject: "Accessibility", A: 95, B: 80 },
  { subject: "SEO",           A: 76, B: 68 },
  { subject: "Design",        A: 92, B: 85 },
  { subject: "Usability",     A: 84, B: 78 },
  { subject: "Security",      A: 70, B: 90 },
];

const scatterData = Array.from({ length: 24 }, (_, i) => ({
  x: Math.floor(Math.random() * 90) + 10,
  y: Math.floor(Math.random() * 90) + 10,
  z: Math.floor(Math.random() * 180) + 60,
}));

const composedData = [
  { name: "Q1", Budget: 4000, Ausgaben: 2400, Effizienz: 60 },
  { name: "Q2", Budget: 3000, Ausgaben: 1398, Effizienz: 47 },
  { name: "Q3", Budget: 5000, Ausgaben: 4200, Effizienz: 84 },
  { name: "Q4", Budget: 2780, Ausgaben: 3908, Effizienz: 141 },
];

const radialData = [
  { name: "Neon Yellow", value: 88 },
  { name: "Positiv",    value: 72 },
  { name: "Negativ",    value: 65 },
  { name: "Neutral",    value: 54 },
  { name: "Mint",       value: 42 },
];

const funnelData = [
  { name: "Besucher",      value: 10000 },
  { name: "Interessenten", value: 6800  },
  { name: "Leads",         value: 3200  },
  { name: "Qualifiziert",  value: 1500  },
  { name: "Kunden",        value: 620   },
];

const trendData = [
  { name: "KW1", v1: 400, v2: 240, v3: 180 },
  { name: "KW2", v1: 300, v2: 139, v3: 220 },
  { name: "KW3", v1: 600, v2: 380, v3: 290 },
  { name: "KW4", v1: 800, v2: 430, v3: 340 },
  { name: "KW5", v1: 500, v2: 280, v3: 260 },
  { name: "KW6", v1: 900, v2: 520, v3: 410 },
  { name: "KW7", v1: 1100, v2: 680, v3: 490 },
  { name: "KW8", v1: 950, v2: 590, v3: 430 },
];

const stackedAreaData = [
  { name: "Jan", Mobile: 400, Desktop: 800, Tablet: 200 },
  { name: "Feb", Mobile: 500, Desktop: 900, Tablet: 250 },
  { name: "Mär", Mobile: 600, Desktop: 850, Tablet: 280 },
  { name: "Apr", Mobile: 700, Desktop: 1000, Tablet: 320 },
  { name: "Mai", Mobile: 800, Desktop: 1100, Tablet: 350 },
  { name: "Jun", Mobile: 900, Desktop: 1200, Tablet: 380 },
];

const frameworkData = [
  { name: "React",   Nutzung: 85 },
  { name: "Vue",     Nutzung: 62 },
  { name: "Angular", Nutzung: 48 },
  { name: "Svelte",  Nutzung: 35 },
  { name: "Solid",   Nutzung: 22 },
];

type TableRow = { name: string; version: string; status: string; downloads: string; updated: string; };
const tableData: TableRow[] = [
  { name: "GrainButton",   version: "2.0.0", status: "stable", downloads: "12.4k", updated: "heute" },
  { name: "GrainCard",     version: "2.0.0", status: "stable", downloads: "9.8k",  updated: "heute" },
  { name: "GrainInput",    version: "2.0.0", status: "stable", downloads: "8.2k",  updated: "heute" },
  { name: "GrainModal",    version: "2.0.0", status: "stable", downloads: "6.5k",  updated: "heute" },
  { name: "GrainChart",    version: "2.0.0", status: "beta",   downloads: "4.1k",  updated: "heute" },
  { name: "GrainTable",    version: "2.0.0", status: "stable", downloads: "3.7k",  updated: "heute" },
];

/* ── Chart-Typ Übersicht mit Erklärungen ── */
const chartTypes = [
  {
    icon: Activity,
    label: "Area Chart",
    color: GRAIN_PASTEL[0],
    when: "Zeitreihen mit Volumen",
    reads: "Trend + Fläche unter der Kurve",
  },
  {
    icon: BarChart2,
    label: "Bar Chart",
    color: GRAIN_PASTEL[1],
    when: "Kategorien vergleichen",
    reads: "Absolute Werte nebeneinander",
  },
  {
    icon: TrendingUp,
    label: "Line Chart",
    color: GRAIN_PASTEL[2],
    when: "Mehrere Trends vergleichen",
    reads: "Richtung und Schnittpunkte",
  },
  {
    icon: PieChart,
    label: "Donut / Pie",
    color: GRAIN_PASTEL[3],
    when: "Anteile eines Ganzen",
    reads: "Prozentuale Verteilung",
  },
  {
    icon: Target,
    label: "Radar Chart",
    color: GRAIN_PASTEL[4],
    when: "Multi-dimensionaler Vergleich",
    reads: "Stärken und Schwächen",
  },
  {
    icon: GitBranch,
    label: "Scatter / Bubble",
    color: GRAIN_PASTEL[5],
    when: "Korrelationen sichtbar machen",
    reads: "Cluster und Ausreißer",
  },
  {
    icon: Layers,
    label: "Composed Chart",
    color: GRAIN_PASTEL[6],
    when: "Verschiedene Metriken kombinieren",
    reads: "Bar + Line in einem View",
  },
  {
    icon: Activity,
    label: "Radial Bar",
    color: GRAIN_PASTEL[7 % GRAIN_PASTEL.length],
    when: "Fortschritt je Kategorie",
    reads: "Ringförmige Fortschrittsanzeige",
  },
  {
    icon: BarChart2,
    label: "Funnel Chart",
    color: GRAIN_PASTEL[0],
    when: "Conversion-Prozesse",
    reads: "Verlust zwischen Stufen",
  },
  {
    icon: TrendingUp,
    label: "Trend Chart",
    color: GRAIN_PASTEL[1],
    when: "Langzeit-Trends mit Referenz",
    reads: "Abweichung vom Zielwert",
  },
  {
    icon: Activity,
    label: "Stacked Area",
    color: GRAIN_PASTEL[2],
    when: "Zusammensetzung über Zeit",
    reads: "Anteile + Gesamtentwicklung",
  },
  {
    icon: BarChart2,
    label: "Stacked Bar",
    color: GRAIN_PASTEL[3],
    when: "Zusammensetzung je Kategorie",
    reads: "Teile und Ganzes gleichzeitig",
  },
];

/* ── Sektion-Header mit Kontext ── */
const SectionHeader: React.FC<{
  number: string;
  title: string;
  description: string;
  badge?: string;
  insight?: string;
}> = ({ number, title, description, badge, insight }) => (
  <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
    <div>
      <p className="section-label mb-1">{number}</p>
      <h3 className="font-display font-bold text-xl text-foreground tracking-tight mb-1">{title}</h3>
      <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-lg">{description}</p>
      {insight && (
        <div className="flex items-center gap-1.5 mt-2 text-[10px] font-semibold font-ui text-[#1A9E5A]">
          <Info className="w-3 h-3" />
          {insight}
        </div>
      )}
    </div>
    {badge && <GrainBadge variant="muted" size="sm">{badge}</GrainBadge>}
  </div>
);

export const DataSection: React.FC = () => {
  const [activeType, setActiveType] = useState<string | null>(null);

  return (
    <section className="space-y-14">

      {/* ── Sektion-Header ── */}
      <div>
        <p className="section-label mb-2">06 — Data & Charts</p>
        <h2 className="font-display text-3xl font-bold text-foreground tracking-tight mb-3">
          Daten & Visualisierung
        </h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl mb-4">
          12 Graphen-Typen – jeder für einen spezifischen Informationsbedarf. Das Ziel ist nicht
          der schönste Chart, sondern der <strong className="text-foreground">richtige Chart für die richtige Frage</strong>.
          Alle Visualisierungen nutzen Recharts mit der Grain-Farbpalette.
        </p>
        {/* Lese-Anleitung */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: <CheckCircle2 className="w-3 h-3" />, text: "Klick auf einen Chart-Typ für Erklärung" },
            { icon: <Info className="w-3 h-3" />,         text: "Jeder Chart zeigt: Wann? Was lese ich ab?" },
            { icon: <ArrowRight className="w-3 h-3" />,   text: "Alle Charts sind interaktiv (Hover für Tooltip)" },
          ].map((h, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] font-semibold font-ui text-muted-foreground bg-muted px-2.5 py-1.5 rounded-lg border border-border">
              <span className="text-[#0A0A0A]">{h.icon}</span>
              {h.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Chart-Typ Auswahl mit Erklärungen ── */}
      <div>
        <SectionHeader
          number="Übersicht"
          title="Welcher Chart für welche Frage?"
          description="Klicke auf einen Chart-Typ um zu sehen, wann er eingesetzt wird und was er kommuniziert."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {chartTypes.map(({ icon: Icon, label, color, when, reads }) => (
            <button
              key={label}
              onClick={() => setActiveType(activeType === label ? null : label)}
              className="flex flex-col gap-3 p-4 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: activeType === label ? color : undefined,
                background: activeType === label ? color + "10" : undefined,
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "20" }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-xs font-semibold font-ui text-foreground">{label}</span>
              </div>
              {activeType === label ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-1.5"
                >
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Wann nutzen?</span>
                    <p className="text-[11px] font-body text-foreground mt-0.5">{when}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Was ablesen?</span>
                    <p className="text-[11px] font-body text-foreground mt-0.5">{reads}</p>
                  </div>
                </motion.div>
              ) : (
                <p className="text-[10px] font-body text-muted-foreground leading-snug">{when}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI-Karten ── */}
      <div>
        <SectionHeader
          number="Kennzahlen"
          title="KPI-Karten"
          description="Einzelne Metriken mit Trend-Indikator. Ideal für Dashboards wenn eine Zahl sofort Kontext braucht."
          insight="Trend-Pfeile zeigen immer Veränderung relativ zur Vorperiode"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Gesamtbesucher", value: "24.8k", change: 12.4, icon: <Users className="w-4 h-4" />, colorClass: "bg-[#0A0A0A]", insight: "Organisch getrieben" },
            { label: "Konversionsrate", value: "3.2%", change: -0.8, icon: <Target className="w-4 h-4" />, colorClass: "bg-[#E4FF97]", lime: true, insight: "Checkout optimieren" },
            { label: "Komponenten", value: "16", change: 0, icon: <Layers className="w-4 h-4" />, insight: "Vollständige Bibliothek" },
            { label: "Performance", value: "98 pts", change: 3, icon: <Zap className="w-4 h-4" />, colorClass: "bg-[#1A9E5A]", insight: "Lighthouse Score" },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className={`relative rounded-2xl p-5 grain overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
                (kpi as any).colorClass
                  ? `${(kpi as any).colorClass} ${(kpi as any).lime ? 'text-[#0A0A0A]' : 'text-white'}`
                  : "bg-card border border-border"
              }`}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: kpi.colorClass ? "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(228,255,151,0.06) 0%, transparent 70%)" }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-[0.6rem] font-mono font-semibold uppercase tracking-[0.14em] ${(kpi as any).colorClass ? ((kpi as any).lime ? 'text-[#0A0A0A]/60' : 'text-white/60') : "text-muted-foreground"}`}>{kpi.label}</span>
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${(kpi as any).colorClass ? "bg-white/15" : "bg-foreground/10 text-foreground"}`}>{kpi.icon}</div>
                  </div>
                  <p className={`font-display font-black text-3xl leading-none tracking-tight mb-1.5 ${(kpi as any).colorClass ? ((kpi as any).lime ? 'text-[#0A0A0A]' : 'text-white') : "text-foreground"}`}>{kpi.value}</p>
                  <div className={`flex items-center gap-1 mb-2 ${kpi.colorClass ? ((kpi as any).lime ? 'text-[#0A0A0A]/70' : 'text-white/80') : kpi.change > 0 ? "text-[#0F6038]" : kpi.change < 0 ? "text-[#A01A08]" : "text-muted-foreground"}`}>
                    {kpi.change > 0 ? <TrendingUp className="w-3 h-3" /> : kpi.change < 0 ? <TrendingUp className="w-3 h-3 rotate-180" /> : null}
                    <span className="text-[10px] font-semibold font-ui">{kpi.change > 0 ? "+" : ""}{kpi.change}%</span>
                  </div>
                  <p className={`text-[10px] font-body ${(kpi as any).colorClass ? ((kpi as any).lime ? 'text-[#0A0A0A]/50' : 'text-white/50') : "text-muted-foreground"}`}>{kpi.insight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Zeitreihen ── */}
      <div>
        <SectionHeader
          number="Zeitreihen"
          title="Entwicklung über Zeit"
          description="Area Charts zeigen Volumen und Trend. Line Charts eignen sich besser wenn mehrere Metriken verglichen werden und die Fläche irreführend wäre."
          badge="Recharts"
          insight="Faustregel: Area für eine Metrik, Line für den Vergleich mehrerer"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainAreaChart data={monthlyData} dataKeys={["Besucher", "Konversionen"]} xKey="name"
            title="Besucher & Konversionen" subtitle="Area Chart · Jan–Jul · Volumen sichtbar durch Fläche" height={260} />
          <GrainLineChart data={monthlyData} dataKeys={["Besucher", "Umsatz"]} xKey="name"
            title="Trend-Vergleich" subtitle="Line Chart · Besucher vs. Umsatz · Schnittpunkte erkennbar" height={260} />
        </div>
      </div>

      {/* ── Kategorien vergleichen ── */}
      <div>
        <SectionHeader
          number="Kategorien"
          title="Vergleiche zwischen Gruppen"
          description="Bar Charts vergleichen diskrete Kategorien. Horizontal eignet sich bei langen Labels. Gestapelt zeigt Zusammensetzung und Gesamtwert gleichzeitig."
          insight="Horizontal-Bars sind lesbarer bei mehr als 5 Kategorien"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainBarChart data={weeklyData} dataKeys={["Design", "Code", "Review"]} xKey="name"
            title="Wöchentliche Aktivität" subtitle="Bar Chart · Gruppenvergleich · Design / Code / Review" height={260} />
          <GrainBarChart data={frameworkData} dataKeys={["Nutzung"]} xKey="name"
            title="Framework-Popularität" subtitle="Horizontales Bar Chart · Lesbarer bei langen Labels"
            horizontal height={260} />
        </div>
      </div>

      {/* ── Anteile und Zusammensetzung ── */}
      <div>
        <SectionHeader
          number="Anteile"
          title="Teile eines Ganzen"
          description="Donut- und Pie-Charts zeigen prozentuale Verteilung. Donut eignet sich besser wenn eine Gesamtzahl im Mittelpunkt stehen soll. Gestapelte Charts zeigen Anteile über Zeit."
          insight="Nicht mehr als 6 Segmente – sonst wird die Legende wichtiger als der Chart"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GrainDonutChart data={donutData} title="Komponenten-Nutzung"
            subtitle="Donut Chart · Gesamtzahl im Zentrum" innerLabel="Gesamt" innerValue={100} height={280} />
          <GrainDonutChart data={donutData} title="Pie Chart (Vollkreis)"
            subtitle="Ohne Donut-Loch · Für reine Anteilsdarstellung" donut={false} height={280} />
          <GrainStackedAreaChart data={stackedAreaData} dataKeys={["Mobile", "Desktop", "Tablet"]} xKey="name"
            title="Gerätenutzung über Zeit" subtitle="Stacked Area · Anteile + Gesamtentwicklung" height={280} />
        </div>
      </div>

      {/* ── Gestapelte Balken ── */}
      <div>
        <SectionHeader
          number="Gestapelt"
          title="Zusammensetzung je Kategorie"
          description="Stacked Bar Charts zeigen sowohl den Gesamtwert als auch die Zusammensetzung. Ideal wenn die Frage lautet: 'Wie viel insgesamt, und woraus besteht es?'"
        />
        <GrainStackedBarChart data={weeklyData} dataKeys={["Design", "Code", "Review"]} xKey="name"
          title="Aufgaben-Verteilung pro Woche" subtitle="Stacked Bar · Gesamtstunden + Zusammensetzung" height={260} />
      </div>

      {/* ── Vergleich & Verteilung ── */}
      <div>
        <SectionHeader
          number="Vergleich"
          title="Multi-dimensionale Analyse"
          description="Radar Charts eignen sich für den Vergleich mehrerer Dimensionen gleichzeitig. Scatter Charts zeigen Korrelationen und Cluster in zweidimensionalen Datensätzen."
          insight="Radar: maximal 8 Achsen · Scatter: mindestens 20 Datenpunkte für sinnvolle Muster"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainRadarChart data={radarData} dataKeys={["A", "B"]} angleKey="subject"
            title="Performance-Radar" subtitle="Radar Chart · Projekt A vs. B · 6 Dimensionen" height={300} />
          <GrainScatterChart data={scatterData} title="Korrelations-Analyse"
            subtitle="Scatter Chart · Reichweite vs. Engagement · Cluster sichtbar" xLabel="Reichweite" yLabel="Engagement" height={300} />
        </div>
      </div>

      {/* ── Pipeline & Fortschritt ── */}
      <div>
        <SectionHeader
          number="Pipeline"
          title="Prozesse und Fortschritt"
          description="Funnel Charts visualisieren Conversion-Prozesse und zeigen den Verlust zwischen Stufen. Radial Bar Charts zeigen Fortschritt je Kategorie in kompakter Form."
          insight="Funnel: Verlust zwischen Stufen ist oft wichtiger als die absoluten Zahlen"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GrainFunnelChart data={funnelData} title="Sales Funnel"
            subtitle="Funnel Chart · 10.000 Besucher → 620 Kunden (6.2%)" height={300} />
          <GrainRadialBarChart data={radialData} title="Fortschritt je Kategorie"
            subtitle="Radial Bar · Ringförmige Fortschrittsanzeige" height={300} />
          <GrainComposedChart data={composedData} barKeys={["Budget", "Ausgaben"]} lineKeys={["Effizienz"]} xKey="name"
            title="Budget vs. Effizienz" subtitle="Composed Chart · Bar + Line kombiniert" height={300} />
        </div>
      </div>

      {/* ── Trend mit Referenzlinie ── */}
      <div>
        <SectionHeader
          number="Trends"
          title="Langzeit-Trends mit Zielwert"
          description="Trend Charts mit Referenzlinie zeigen sofort: Liegt die Metrik über oder unter dem Ziel? Die gestrichelte Linie ist der Zielwert – alles darüber ist grün."
          insight="Referenzlinien machen Abweichungen sofort sichtbar ohne Tabelle"
        />
        <GrainTrendChart data={trendData} dataKeys={["v1", "v2", "v3"]} xKey="name"
          title="Multi-Trend Vergleich" subtitle="Trend Chart · 3 Metriken über 8 Wochen · Referenzlinie bei 500"
          showReferenceLine={500} height={280} />
      </div>

      {/* ── Daten-Tabelle ── */}
      <div>
        <SectionHeader
          number="Tabellen"
          title="Strukturierte Daten"
          description="Tabellen sind ideal wenn genaue Werte wichtig sind und Nutzer filtern, sortieren oder einzelne Zeilen vergleichen müssen. Charts zeigen Muster, Tabellen zeigen Fakten."
          badge={`${tableData.length} Einträge`}
          insight="Faustregel: Chart für Trends, Tabelle für exakte Werte"
        />
        <GrainTable<TableRow>
          columns={[
            { key: "name",      header: "Komponente",    render: (v) => <span className="font-mono text-xs font-semibold text-foreground">{String(v)}</span> },
            { key: "version",   header: "Version",       render: (v) => <span className="font-mono text-xs text-muted-foreground">{String(v)}</span> },
            { key: "status",    header: "Status",        render: (v) => <GrainBadge variant={String(v) === "stable" ? "blue" : "coral"} size="sm" dot>{String(v)}</GrainBadge> },
            { key: "downloads", header: "Downloads",     align: "right", render: (v) => <span className="font-mono text-xs font-semibold">{String(v)}</span> },
            { key: "updated",   header: "Aktualisiert",  align: "right", render: (v) => <span className="text-xs text-muted-foreground">{String(v)}</span> },
          ]}
          data={tableData} hoverable striped
          caption="Grain UI Komponenten · Version 2.0.0 · Stand: August 2025"
        />
      </div>

      {/* ── Farbpalette ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Chart-Farbpalette</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            Neon Yellow + Black + Signalfarben + Pastell · Konsistent über alle Visualisierungen
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { hex: GRAIN_PASTEL[0], name: "Butter",      role: "Warm" },
              { hex: GRAIN_PASTEL[1], name: "Mint",        role: "Frisch" },
              { hex: GRAIN_PASTEL[2], name: "Baby Blue",   role: "Ruhig" },
              { hex: GRAIN_PASTEL[3], name: "Rose Quartz", role: "Sanft" },
              { hex: GRAIN_PASTEL[4], name: "Orchid",      role: "Elegant" },
              { hex: GRAIN_PASTEL[5], name: "Peach",       role: "Warm" },
              { hex: GRAIN_PASTEL[6], name: "Aqua",        role: "Frisch" },
              { hex: GRAIN_PASTEL[7 % GRAIN_PASTEL.length], name: "Lavender", role: "Sanft" },
            ].map(({ hex, name, role }) => (
              <div key={name} className="flex flex-col gap-2">
                <div className="h-12 rounded-xl grain" style={{ background: hex }} />
                <div>
                  <p className="text-xs font-ui font-semibold text-foreground">{name}</p>
                  <p className="text-[9px] font-mono text-muted-foreground">{role}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Farbpaletten-Erklärung */}
          <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-[10px] font-semibold font-ui text-foreground mb-1">Farbsystem</p>
            <p className="text-[10px] font-body text-muted-foreground leading-relaxed">
              Neon Yellow #E4FF97 und Black #000000 als führende Systemfarben. Signalfarben (Smaragd, Koralle, Slate) für eindeutige Datenbewertung. 8 Pastell-Töne für Kategorien und Reporting.
            </p>
          </div>
        </GrainCardContent>
      </GrainCard>

    </section>
  );
};
