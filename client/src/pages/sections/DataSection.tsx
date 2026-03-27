/**
 * DataSection – Grain UI v2
 * Alle 12 Graphen-Typen mit moderner Darstellung
 * Recharts + Grain-Farbpalette + Glasmorphismus
 */

import React, { useState } from "react";
import {
  GrainAreaChart, GrainBarChart, GrainLineChart, GrainDonutChart,
  GrainRadarChart, GrainScatterChart, GrainComposedChart,
  GrainRadialBarChart, GrainFunnelChart, GrainTrendChart,
  GrainStackedAreaChart, GrainStackedBarChart,
  GRAIN_HEX,
} from "@/components/grain/GrainChart";
import { GrainTable } from "@/components/grain/GrainTable";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainStat } from "@/components/grain/GrainStat";
import {
  TrendingUp, TrendingDown, Users, Zap, BarChart2, Activity,
  PieChart, GitBranch, Layers, Target, ArrowUpRight,
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
  { name: "Blau",   value: 88 },
  { name: "Rot",    value: 72 },
  { name: "Teal",   value: 65 },
  { name: "Amber",  value: 54 },
  { name: "Violett",value: 42 },
];

const funnelData = [
  { name: "Besucher",    value: 10000 },
  { name: "Interessenten", value: 6800 },
  { name: "Leads",       value: 3200 },
  { name: "Qualifiziert",value: 1500 },
  { name: "Kunden",      value: 620  },
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

const chartTypes = [
  { icon: Activity,   label: "Area",        color: GRAIN_HEX[0] },
  { icon: BarChart2,  label: "Bar",         color: GRAIN_HEX[1] },
  { icon: TrendingUp, label: "Line",        color: GRAIN_HEX[2] },
  { icon: PieChart,   label: "Donut / Pie", color: GRAIN_HEX[3] },
  { icon: Target,     label: "Radar",       color: GRAIN_HEX[4] },
  { icon: GitBranch,  label: "Scatter",     color: GRAIN_HEX[5] },
  { icon: Layers,     label: "Composed",    color: GRAIN_HEX[6] },
  { icon: Activity,   label: "Radial Bar",  color: GRAIN_HEX[7] },
  { icon: BarChart2,  label: "Funnel",      color: GRAIN_HEX[0] },
  { icon: TrendingUp, label: "Trend",       color: GRAIN_HEX[1] },
  { icon: Activity,   label: "Stacked Area",color: GRAIN_HEX[2] },
  { icon: BarChart2,  label: "Stacked Bar", color: GRAIN_HEX[3] },
];

export const DataSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState<string | null>(null);

  return (
    <section className="space-y-12">

      {/* Header */}
      <div>
        <p className="section-label mb-2">06 — Data</p>
        <h2 className="font-display text-3xl font-bold text-foreground tracking-tight mb-2">
          Daten & Visualisierung
        </h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xl">
          12 Graphen-Typen mit der Grain-Farbpalette. Alle Charts nutzen Recharts mit angepassten
          Tooltips, Legenden und Grain-Styling. Responsive und interaktiv.
        </p>
      </div>

      {/* Chart Type Overview */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Verfügbare Chart-Typen</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">12 verschiedene Visualisierungstypen</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {chartTypes.map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                onClick={() => setActiveChart(activeChart === label ? null : label)}
                className="flex flex-col items-center gap-2 p-2.5 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all duration-150 cursor-pointer group"
                style={{ borderColor: activeChart === label ? color : undefined }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
                  style={{ background: color + "22" }}>
                  <Icon className="w-3.5 h-3.5 transition-colors" style={{ color }} />
                </div>
                <span className="text-[9px] font-ui font-medium text-muted-foreground text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* KPI Cards */}
      <div>
        <h3 className="font-ui font-semibold text-sm text-foreground mb-4">KPI-Karten</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <GrainStat label="Gesamtbesucher" value="24.8k" change={12.4} icon={<Users className="w-4 h-4" />} variant="blue" />
          <GrainStat label="Konversionsrate" value="3.2%" change={-0.8} icon={<Target className="w-4 h-4" />} variant="gradient" />
          <GrainStat label="Komponenten" value={16} change={0} changeLabel="stabil" icon={<Layers className="w-4 h-4" />} variant="default" />
          <GrainStat label="Performance" value="98 pts" change={3} changeLabel="Lighthouse" icon={<Zap className="w-4 h-4" />} variant="red" />
        </div>
      </div>

      {/* Row 1: Area + Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-ui font-semibold text-sm text-foreground">Zeitreihen</h3>
          <GrainBadge variant="muted" size="sm">Recharts</GrainBadge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainAreaChart data={monthlyData} dataKeys={["Besucher", "Konversionen"]} xKey="name"
            title="Besucher & Konversionen" subtitle="Area Chart – letzten 7 Monate" height={260} />
          <GrainBarChart data={weeklyData} dataKeys={["Design", "Code", "Review"]} xKey="name"
            title="Wöchentliche Aktivität" subtitle="Bar Chart – Design / Code / Review" height={260} />
        </div>
      </div>

      {/* Row 2: Line + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GrainLineChart data={monthlyData} dataKeys={["Besucher", "Umsatz"]} xKey="name"
          title="Trend-Vergleich" subtitle="Line Chart – Besucher vs. Umsatz" height={260} />
        <GrainDonutChart data={donutData} title="Komponenten-Nutzung" subtitle="Donut Chart – Verteilung"
          innerLabel="Gesamt" innerValue={100} height={260} />
      </div>

      {/* Row 3: Radar + Scatter */}
      <div>
        <h3 className="font-ui font-semibold text-sm text-foreground mb-4">Vergleich & Verteilung</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainRadarChart data={radarData} dataKeys={["A", "B"]} angleKey="subject"
            title="Performance-Radar" subtitle="Radar Chart – Projekt A vs. B" height={280} />
          <GrainScatterChart data={scatterData} title="Bubble / Scatter"
            subtitle="Scatter Chart – Zufällige Verteilung" xLabel="Reichweite" yLabel="Engagement" height={280} />
        </div>
      </div>

      {/* Row 4: Composed + Radial Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GrainComposedChart data={composedData} barKeys={["Budget", "Ausgaben"]} lineKeys={["Effizienz"]} xKey="name"
          title="Budget vs. Ausgaben" subtitle="Composed Chart – Bar + Line" height={260} />
        <GrainRadialBarChart data={radialData} title="Radial Bar Chart"
          subtitle="Fortschritt nach Kategorie" height={260} />
      </div>

      {/* Row 5: Funnel + Trend */}
      <div>
        <h3 className="font-ui font-semibold text-sm text-foreground mb-4">Pipeline & Trends</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainFunnelChart data={funnelData} title="Conversion Funnel"
            subtitle="Funnel Chart – Sales Pipeline" height={280} />
          <GrainTrendChart data={trendData} dataKeys={["v1", "v2", "v3"]} xKey="name"
            title="Multi-Trend Vergleich" subtitle="Trend Chart – 3 Metriken über 8 Wochen"
            showReferenceLine={500} height={280} />
        </div>
      </div>

      {/* Row 6: Stacked Area + Stacked Bar */}
      <div>
        <h3 className="font-ui font-semibold text-sm text-foreground mb-4">Gestapelte Diagramme</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainStackedAreaChart data={stackedAreaData} dataKeys={["Mobile", "Desktop", "Tablet"]} xKey="name"
            title="Stacked Area Chart" subtitle="Gerätenutzung über 6 Monate" height={260} />
          <GrainStackedBarChart data={weeklyData} dataKeys={["Design", "Code", "Review"]} xKey="name"
            title="Stacked Bar Chart" subtitle="Aufgaben-Verteilung pro Woche" height={260} />
        </div>
      </div>

      {/* Row 7: Pie + Horizontal Bar */}
      <div>
        <h3 className="font-ui font-semibold text-sm text-foreground mb-4">Kreise & Horizontale Balken</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GrainDonutChart data={donutData} title="Pie Chart (ohne Donut-Loch)"
            subtitle="Volle Kreisdarstellung" donut={false} height={260} />
          <GrainBarChart data={frameworkData} dataKeys={["Nutzung"]} xKey="name"
            title="Horizontales Bar Chart" subtitle="Framework-Popularität"
            horizontal height={260} />
        </div>
      </div>

      {/* Tabelle */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-ui font-semibold text-sm text-foreground">Daten-Tabelle</h3>
          <GrainBadge variant="blue" size="sm" dot>{tableData.length} Einträge</GrainBadge>
        </div>
        <GrainTable<TableRow>
          columns={[
            { key: "name",      header: "Komponente",  render: (v) => <span className="font-mono text-xs font-semibold text-primary">{String(v)}</span> },
            { key: "version",   header: "Version",     render: (v) => <span className="font-mono text-xs text-muted-foreground">{String(v)}</span> },
            { key: "status",    header: "Status",      render: (v) => <GrainBadge variant={String(v) === "stable" ? "blue" : "coral"} size="sm" dot>{String(v)}</GrainBadge> },
            { key: "downloads", header: "Downloads",   align: "right", render: (v) => <span className="font-mono text-xs font-semibold">{String(v)}</span> },
            { key: "updated",   header: "Aktualisiert", align: "right", render: (v) => <span className="text-xs text-muted-foreground">{String(v)}</span> },
          ]}
          data={tableData} hoverable striped
        />
      </div>

      {/* Chart Color Palette */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Chart-Farbpalette</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">8 Farben aus der Grain-Palette für alle Visualisierungen</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { hex: GRAIN_HEX[0], name: "Blue" },
              { hex: GRAIN_HEX[1], name: "Red" },
              { hex: GRAIN_HEX[2], name: "Teal" },
              { hex: GRAIN_HEX[3], name: "Amber" },
              { hex: GRAIN_HEX[4], name: "Violet" },
              { hex: GRAIN_HEX[5], name: "Green" },
              { hex: GRAIN_HEX[6], name: "Pink" },
              { hex: GRAIN_HEX[7], name: "Coral" },
            ].map(({ hex, name }) => (
              <div key={name} className="flex flex-col gap-2">
                <div className="h-10 rounded-xl grain" style={{ background: hex }} />
                <div>
                  <p className="text-xs font-ui font-semibold text-foreground">{name}</p>
                  <p className="text-[9px] font-mono text-muted-foreground">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

    </section>
  );
};
