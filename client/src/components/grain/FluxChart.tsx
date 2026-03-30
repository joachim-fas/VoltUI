/**
 * FluxChart – Atmospheric Grain Design System v3
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

/** Standard-Palette: Neon Yellow + Black + Signalfarben + Pastell
 * HINWEIS: GRAIN_HEX wird NUR noch für Signalfarben-Kontext exportiert.
 * Alle Charts verwenden standardmäßig GRAIN_PASTEL.
 */
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
  "#F4A0B5", // Rose Quartz – gesättigt
  "#F5C87A", // Peach Cream – gesättigt
  "#6DDBA0", // Mint Green – gesättigt
  "#D98AE8", // Soft Orchid – gesättigt
  "#7AB8F5", // Baby Blue – gesättigt
  "#E8C840", // Butter Yellow – gesättigt
  "#F0956A", // Powder Orange – gesättigt
  "#5ECECE", // Aqua Mist – gesättigt
];

export const GRAIN_CHART_COLORS = GRAIN_PASTEL; // backwards compat – jetzt Pastell

export type FluxPalette = "standard" | "neon" | "pastel";
/** Alle Charts nutzen standardmäßig GRAIN_PASTEL. "standard" = Pastell. */
export const getPalette = (p?: FluxPalette) =>
  p === "neon" ? GRAIN_NEON : GRAIN_PASTEL; // standard + pastel = immer Pastell

/** Interner Alias – Charts verwenden immer Pastell */
const C = GRAIN_PASTEL;

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
export interface FluxAreaChartProps {
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
export const FluxAreaChart: React.FC<FluxAreaChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, stacked, gradient = true, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {dataKeys.map((key, i) => (
            <linearGradient key={key} id={`grad-area-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C[i % C.length]} stopOpacity={0.35} />
              <stop offset="95%" stopColor={C[i % C.length]} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
        {dataKeys.map((key, i) => (
          <Area key={key} type="monotone" dataKey={key}
            stackId={stacked ? "s" : undefined}
            stroke={C[i % C.length]} strokeWidth={2}
            fill={gradient ? `url(#grad-area-${key})` : C[i % C.length]}
            fillOpacity={gradient ? 1 : 0.15}
            dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 2. Bar Chart ── */
export interface FluxBarChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
  horizontal?: boolean;
  palette?: FluxPalette;
  className?: string;
}
/** Einfaches horizontales Bar Chart – eigene SVG-Implementierung für zuverlässiges Rendering */
const HorizontalBarChart: React.FC<{
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey: string;
  height: number;
  colors: string[];
}> = ({ data, dataKeys, xKey, height, colors }) => {
  const labelW = Math.max(64, Math.max(...data.map(d => String(d[xKey] ?? "").length)) * 8 + 8);
  const padT = 12, padB = 24, padR = 16;
  const chartH = height - padT - padB;
  const rowH = chartH / data.length;
  const barH = Math.min(22, rowH * 0.52);
  const maxVal = Math.max(...data.flatMap(d => dataKeys.map(k => Number(d[k] ?? 0))), 1);
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(f * maxVal));
  return (
    <div style={{ height, position: "relative", fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      <svg width="100%" height={height} style={{ overflow: "visible" }}>
        {/* Grid lines */}
        {xTicks.map(v => {
          const xPct = v / maxVal;
          return (
            <line key={v}
              x1={`calc(${labelW}px + ${xPct * 100}% - ${xPct * (labelW + padR)}px)`}
              x2={`calc(${labelW}px + ${xPct * 100}% - ${xPct * (labelW + padR)}px)`}
              y1={padT} y2={height - padB}
              stroke="var(--border)" strokeDasharray="3 3" strokeWidth={1} />
          );
        })}
        {data.map((row, ri) => {
          const label = String(row[xKey] ?? "");
          const cy = padT + ri * rowH + rowH / 2;
          return (
            <g key={ri}>
              {/* Label */}
              <text x={labelW - 8} y={cy + 4} textAnchor="end"
                fontSize={12} fontWeight={500} fill="var(--foreground)">
                {label}
              </text>
              {/* Bars */}
              {dataKeys.map((key, ki) => {
                const val = Number(row[key] ?? 0);
                const barY = cy - (dataKeys.length * barH) / 2 + ki * barH;
                return (
                  <g key={key}>
                    <rect
                      x={labelW}
                      y={barY}
                      height={barH - 2}
                      width={0}
                      rx={3} ry={3}
                      fill={colors[ki % colors.length]}
                      opacity={0.88}
                    >
                      <animate attributeName="width"
                        from="0"
                        to={`calc(${(val / maxVal) * 100}% - ${(val / maxVal) * (labelW + padR)}px)`}
                        dur="0.5s" fill="freeze" calcMode="spline"
                        keySplines="0.4 0 0.2 1" keyTimes="0;1" />
                    </rect>
                    {/* Value label */}
                    <text
                      x={labelW + 4}
                      y={barY + barH / 2 + 3}
                      fontSize={10} fill="var(--foreground)" opacity={0.6}
                    >
                      {val}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* X-Axis labels */}
        {xTicks.map(v => {
          const xPct = v / maxVal;
          return (
            <text key={v}
              x={`calc(${labelW}px + ${xPct * 100}% - ${xPct * (labelW + padR)}px)`}
              y={height - padB + 14}
              textAnchor="middle" fontSize={10} fill="var(--muted-foreground)">
              {v}
            </text>
          );
        })}
      </svg>
      {/* Legend */}
      {dataKeys.length > 1 && (
        <div style={{ position: "absolute", bottom: 0, left: labelW, display: "flex", gap: 12, fontSize: 11 }}>
          {dataKeys.map((k, i) => (
            <span key={k} style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--muted-foreground)" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: colors[i % colors.length], display: "inline-block" }} />
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export const FluxBarChart: React.FC<FluxBarChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, stacked, horizontal, palette, className
}) => {
  const colors = getPalette(palette);
  if (horizontal) {
    return (
      <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
        <HorizontalBarChart data={data} dataKeys={dataKeys} xKey={xKey} height={height} colors={colors} />
      </ChartWrapper>
    );
  }
  return (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="horizontal"
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barCategoryGap="28%">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted/5)" }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
        {dataKeys.map((key, i) => (
          <Bar key={key} dataKey={key} stackId={stacked ? "s" : undefined}
            fill={colors[i % colors.length]}
            radius={stacked ? [0,0,0,0] : [4,4,0,0]} maxBarSize={48} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </ChartWrapper>
  );
};

/* ── 3. Line Chart ── */
export interface FluxLineChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  curved?: boolean;
  className?: string;
}
export const FluxLineChart: React.FC<FluxLineChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, curved = true, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
        {dataKeys.map((key, i) => (
          <Line key={key} type={curved ? "monotone" : "linear"} dataKey={key}
            stroke={C[i % C.length]} strokeWidth={2.5}
            dot={{ r: 3, fill: C[i % C.length], strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 4. Donut / Pie Chart ── */
export interface FluxDonutChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  innerLabel?: string;
  innerValue?: string | number;
  donut?: boolean;
  className?: string;
}
export const FluxDonutChart: React.FC<FluxDonutChartProps> = ({
  data, height = 280, title, subtitle, innerLabel, innerValue, donut = true, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%"
          innerRadius={donut ? "52%" : 0} outerRadius="72%"
          paddingAngle={donut ? 3 : 1} dataKey="value" strokeWidth={0}>
          {data.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
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
export interface FluxRadarChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  angleKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const FluxRadarChart: React.FC<FluxRadarChartProps> = ({
  data, dataKeys, angleKey = "subject", height = 280, title, subtitle, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey={angleKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} />
        <PolarRadiusAxis tick={{ fontSize: 9, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
        {dataKeys.map((key, i) => (
          <Radar key={key} name={key} dataKey={key}
            stroke={C[i % C.length]} fill={C[i % C.length]}
            fillOpacity={0.25} strokeWidth={2} />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 6. Scatter Chart ── */
export interface FluxScatterChartProps {
  data: Array<{ x: number; y: number; z?: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}
export const FluxScatterChart: React.FC<FluxScatterChartProps> = ({
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
        <Scatter data={data} fill={C[0]} fillOpacity={0.75} />
      </ScatterChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 7. Composed Chart (Bar + Line) ── */
export interface FluxComposedChartProps {
  data: Record<string, unknown>[];
  barKeys: string[];
  lineKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const FluxComposedChart: React.FC<FluxComposedChartProps> = ({
  data, barKeys, lineKeys, xKey = "name", height = 280, title, subtitle, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted/5)" }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
        {barKeys.map((key, i) => (
          <Bar key={key} dataKey={key} fill={C[i % C.length]} radius={[4,4,0,0]} maxBarSize={40} fillOpacity={0.9} />
        ))}
        {lineKeys.map((key, i) => (
          <Line key={key} type="monotone" dataKey={key}
            stroke={C[(barKeys.length + i) % C.length]} strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 0 }} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 8. Radial Bar Chart ── */
export interface FluxRadialBarChartProps {
  data: Array<{ name: string; value: number; fill?: string }>;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const FluxRadialBarChart: React.FC<FluxRadialBarChartProps> = ({
  data, height = 280, title, subtitle, className
}) => {
  const coloredData = data.map((d, i) => ({ ...d, fill: d.fill || C[i % C.length] }));
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="85%"
          data={coloredData} startAngle={180} endAngle={-180}>
          <PolarGrid gridType="circle" stroke="var(--border)" />
          <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "var(--muted)" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

/* ── 9. Funnel Chart ── */
export interface FluxFunnelChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export const FluxFunnelChart: React.FC<FluxFunnelChartProps> = ({
  data, height = 280, title, subtitle, className
}) => {
  const coloredData = data.map((d, i) => ({ ...d, fill: C[i % C.length] }));
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
export interface FluxTrendChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  showReferenceLine?: number;
  className?: string;
}
export const FluxTrendChart: React.FC<FluxTrendChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle, showReferenceLine, className
}) => (
  <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1A1A1A" }} />
        {showReferenceLine !== undefined && (
          <ReferenceLine y={showReferenceLine} stroke="var(--border)" strokeDasharray="4 4" />
        )}
        {dataKeys.map((key, i) => (
          <Line key={key} type="monotone" dataKey={key}
            stroke={C[i % C.length]} strokeWidth={2}
            dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ── 11. Stacked Area ── */
export const FluxStackedAreaChart: React.FC<FluxAreaChartProps> = (props) => (
  <FluxAreaChart {...props} stacked gradient />
);

/* ── 12. Stacked Bar ── */
export const FluxStackedBarChart: React.FC<FluxBarChartProps> = (props) => (
  <FluxBarChart {...props} stacked palette={props.palette ?? "pastel"} />
);
