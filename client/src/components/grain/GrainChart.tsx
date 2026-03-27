/**
 * GrainChart – Atmospheric Grain Design System v3
 * Alle Graphen-Typen: Area, Bar, Line, Donut/Pie, Radar, Scatter, Composed, RadialBar, Funnel, Trend
 * Font: DM Sans überall – kein Serif, keine Monospace in Achsen/Labels
 */

import React from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ZAxis,
  ComposedChart,
  RadialBarChart, RadialBar,
  FunnelChart, Funnel, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine,
} from "recharts";

/* ── Grain Farbpaletten für Recharts ── */

/** Standard-Palette: Neon Yellow + Black + Signalfarben + Pastell */
export const GRAIN_HEX = [
  "#E4FF97", // Neon Yellow (Primär)
  "#000000", // Black (Fundament)
  "#1A9E5A", // Signal Positiv (Smaragd)
  "#E8402A", // Signal Negativ (Koralle)
  "#6B7A9A", // Signal Neutral (Slate)
  "#C3F4D3", // Mint Green
  "#D4E8FF", // Baby Blue
  "#FFD6E0", // Rose Quartz
];

/** Neon-Palette: maximale Chroma, elektrische Leuchtkraft */
export const GRAIN_NEON = [
  "#00F5FF", // Neon Cyan
  "#FF0090", // Hot Pink
  "#AAFF00", // Acid Green
  "#FF6600", // Laser Orange
  "#7B00FF", // Electric Violet
  "#00FF88", // Neon Mint
  "#FFE600", // Electric Yellow
  "#FF2D55", // Neon Red
];

/** Pastell-Palette: exakt nach Vorgabe – 8 harmonische Töne */
export const GRAIN_PASTEL = [
  "#FFD6E0", // Rose Quartz
  "#FFECD2", // Peach Cream
  "#C3F4D3", // Mint Green
  "#FDE2FF", // Soft Orchid
  "#D4E8FF", // Baby Blue
  "#FFF5BA", // Butter Yellow
  "#FFE0CC", // Powder Orange
  "#D6F5F5", // Aqua Mist
];

export const GRAIN_CHART_COLORS = GRAIN_HEX; // backwards compat

export type GrainPalette = "standard" | "neon" | "pastel";
export const getPalette = (p?: GrainPalette) =>
  p === "neon" ? GRAIN_NEON : p === "pastel" ? GRAIN_PASTEL : GRAIN_HEX;

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3.5 py-2.5 border border-border/60 font-ui text-xs" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {label && <p className="text-muted-foreground mb-1.5 font-medium tracking-wide">{label}</p>}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-foreground/70">{entry.name}:</span>
          <span className="font-semibold text-foreground ml-auto pl-2">{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
        </div>
      ))}
    </div>
  );
};

/* ── Chart Wrapper Card ── */
interface ChartWrapperProps {
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
  children: React.ReactNode;
}
export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title, subtitle, height = 280, className, children
}) => (
  <div className={cn("bg-card border border-border rounded-xl overflow-hidden", className)}>
    {(title || subtitle) && (
      <div className="px-5 pt-5 pb-2">
        {title && <h4 className="font-ui font-semibold text-sm text-foreground leading-tight">{title}</h4>}
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5 font-ui">{subtitle}</p>}
      </div>
    )}
    <div style={{ height }} className="px-1 pb-3">
      {children}
    </div>
  </div>
);

/* ── 1. Area Chart ── */
export interface GrainAreaChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
  gradient?: boolean;
  className?: string;
}
export const GrainAreaChart: React.FC<GrainAreaChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, stacked, gradient = true, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {dataKeys.map((key, i) => (
            <linearGradient key={key} id={`grad-area-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={GRAIN_HEX[i % GRAIN_HEX.length]} stopOpacity={0.35} />
              <stop offset="95%" stopColor={GRAIN_HEX[i % GRAIN_HEX.length]} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        {dataKeys.map((key, i) => (
          <Area key={key} type="monotone" dataKey={key}
            stackId={stacked ? "s" : undefined}
            stroke={GRAIN_HEX[i % GRAIN_HEX.length]} strokeWidth={2}
            fill={gradient ? `url(#grad-area-${key})` : GRAIN_HEX[i % GRAIN_HEX.length]}
            fillOpacity={gradient ? 1 : 0.15}
            dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 2. Bar Chart ── */
export interface GrainBarChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
  horizontal?: boolean;
  className?: string;
}
export const GrainBarChart: React.FC<GrainBarChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, stacked, horizontal, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"}
        margin={{ top: 8, right: 8, left: horizontal ? 60 : -16, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={!horizontal} horizontal={horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={55} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
          </>
        )}
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted/5)" }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        {dataKeys.map((key, i) => (
          <Bar key={key} dataKey={key} stackId={stacked ? "s" : undefined}
            fill={GRAIN_HEX[i % GRAIN_HEX.length]}
            radius={stacked ? [0,0,0,0] : [4,4,0,0]} maxBarSize={48} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 3. Line Chart ── */
export interface GrainLineChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  curved?: boolean;
  className?: string;
}
export const GrainLineChart: React.FC<GrainLineChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, curved = true, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        {dataKeys.map((key, i) => (
          <Line key={key} type={curved ? "monotone" : "linear"} dataKey={key}
            stroke={GRAIN_HEX[i % GRAIN_HEX.length]} strokeWidth={2.5}
            dot={{ r: 3, fill: GRAIN_HEX[i % GRAIN_HEX.length], strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 4. Donut / Pie Chart ── */
export interface GrainDonutChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  innerLabel?: string;
  innerValue?: string | number;
  donut?: boolean;
  className?: string;
}
export const GrainDonutChart: React.FC<GrainDonutChartProps> = ({
  data, height = 280, title, subtitle, innerLabel, innerValue, donut = true, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%"
          innerRadius={donut ? "52%" : 0} outerRadius="72%"
          paddingAngle={donut ? 3 : 1} dataKey="value" strokeWidth={0}>
          {data.map((_, i) => <Cell key={i} fill={GRAIN_HEX[i % GRAIN_HEX.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        {donut && innerLabel && (
          <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}>{innerLabel}</text>
        )}
        {donut && innerValue !== undefined && (
          <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 22, fontWeight: 700, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "currentColor" }}>{innerValue}</text>
        )}
      </PieChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 5. Radar Chart ── */
export interface GrainRadarChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  angleKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const GrainRadarChart: React.FC<GrainRadarChartProps> = ({
  data, dataKeys, angleKey = "subject", height = 280, title, subtitle, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey={angleKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} />
        <PolarRadiusAxis tick={{ fontSize: 9, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        {dataKeys.map((key, i) => (
          <Radar key={key} name={key} dataKey={key}
            stroke={GRAIN_HEX[i % GRAIN_HEX.length]} fill={GRAIN_HEX[i % GRAIN_HEX.length]}
            fillOpacity={0.18} strokeWidth={2} />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 6. Scatter Chart ── */
export interface GrainScatterChartProps {
  data: Array<{ x: number; y: number; z?: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}
export const GrainScatterChart: React.FC<GrainScatterChartProps> = ({
  data, height = 280, title, subtitle, xLabel = "X", yLabel = "Y", className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="x" name={xLabel} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis dataKey="y" name={yLabel} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <ZAxis dataKey="z" range={[40, 400]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill={GRAIN_HEX[0]} fillOpacity={0.75} />
      </ScatterChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 7. Composed Chart (Bar + Line) ── */
export interface GrainComposedChartProps {
  data: Record<string, unknown>[];
  barKeys: string[];
  lineKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const GrainComposedChart: React.FC<GrainComposedChartProps> = ({
  data, barKeys, lineKeys, xKey = "name", height = 280, title, subtitle, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted/5)" }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        {barKeys.map((key, i) => (
          <Bar key={key} dataKey={key} fill={GRAIN_HEX[i % GRAIN_HEX.length]} radius={[4,4,0,0]} maxBarSize={40} fillOpacity={0.85} />
        ))}
        {lineKeys.map((key, i) => (
          <Line key={key} type="monotone" dataKey={key}
            stroke={GRAIN_HEX[(barKeys.length + i) % GRAIN_HEX.length]} strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 0 }} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 8. Radial Bar Chart ── */
export interface GrainRadialBarChartProps {
  data: Array<{ name: string; value: number; fill?: string }>;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const GrainRadialBarChart: React.FC<GrainRadialBarChartProps> = ({
  data, height = 280, title, subtitle, className
}) => {
  const coloredData = data.map((d, i) => ({ ...d, fill: d.fill || GRAIN_HEX[i % GRAIN_HEX.length] }));
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="85%"
          data={coloredData} startAngle={180} endAngle={-180}>
          <PolarGrid gridType="circle" stroke="var(--border)" />
          <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "var(--muted)" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

/* ── 9. Funnel Chart ── */
export interface GrainFunnelChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const GrainFunnelChart: React.FC<GrainFunnelChartProps> = ({
  data, height = 280, title, subtitle, className
}) => {
  const coloredData = data.map((d, i) => ({ ...d, fill: GRAIN_HEX[i % GRAIN_HEX.length] }));
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <Tooltip content={<CustomTooltip />} />
          <Funnel dataKey="value" data={coloredData} isAnimationActive>
            <LabelList position="right" fill="var(--muted-foreground)" stroke="none" dataKey="name"
              style={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

/* ── 10. Trend / Multi-Line with Reference ── */
export interface GrainTrendChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  showReferenceLine?: number;
  className?: string;
}
export const GrainTrendChart: React.FC<GrainTrendChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, showReferenceLine, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
        {showReferenceLine !== undefined && (
          <ReferenceLine y={showReferenceLine} stroke="var(--border)" strokeDasharray="4 4" />
        )}
        {dataKeys.map((key, i) => (
          <Line key={key} type="monotone" dataKey={key}
            stroke={GRAIN_HEX[i % GRAIN_HEX.length]} strokeWidth={2}
            dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 11. Stacked Area ── */
export const GrainStackedAreaChart: React.FC<GrainAreaChartProps> = (props) => (
  <GrainAreaChart {...props} stacked gradient />
);

/* ── 12. Stacked Bar ── */
export const GrainStackedBarChart: React.FC<GrainBarChartProps> = (props) => (
  <GrainBarChart {...props} stacked />
);
