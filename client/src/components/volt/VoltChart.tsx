/**
 * VoltChart – Atmospheric Volt UI Design System v4
 * Alle Graphen-Typen: Area, Bar, Line, Donut/Pie, Radar, Scatter, Composed, RadialBar, Funnel, Trend
 * Animationen: isAnimationActive + Intersection Observer Fade-in + staggered Entrance
 * Font: DM Sans überall
 */

import React, { useRef, useEffect, useState, useCallback } from "react";
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

/* ── Volt Farbpaletten für Recharts ── */

export const VOLT_HEX = [
  "#E4FF97", "#000000", "#1A9E5A", "#E8402A",
  "#6B7A9A", "#C3F4D3", "#D4E8FF", "#FFD6E0",
];

export const VOLT_NEON = [
  "#00F5FF", "#FF0090", "#AAFF00", "#FF6600",
  "#7B00FF", "#00FF88", "#FFE600", "#FF2D55",
];

export const VOLT_PASTEL = [
  "#F4A0B5", "#F5C87A", "#6DDBA0", "#D98AE8",
  "#7AB8F5", "#E8C840", "#F0956A", "#5ECECE",
];

export const VOLT_CHART_COLORS = VOLT_PASTEL;

export type VoltPalette = "standard" | "neon" | "pastel";
export const getPalette = (p?: VoltPalette) =>
  p === "neon" ? VOLT_NEON : VOLT_PASTEL;

const C = VOLT_PASTEL;

/* ══════════════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK – triggert Animation beim Einblenden
══════════════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ══════════════════════════════════════════════════════════════════════
   COUNT-UP HOOK – animiert Zahlen von 0 auf Zielwert
══════════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration = 1200, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const from = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return value;
}

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3.5 py-2.5 border border-border/60 font-ui text-xs"
      style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {label && <p className="text-muted-foreground mb-1.5 font-medium tracking-wide">{label}</p>}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-foreground/70">{entry.name}:</span>
          <span className="font-semibold text-foreground ml-auto pl-2">
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   CHART WRAPPER – Fade-in + Slide-up beim Einblenden
══════════════════════════════════════════════════════════════════════ */
interface ChartWrapperProps {
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
  children: React.ReactNode;
  delay?: number; // stagger delay in ms
  badge?: React.ReactNode; // optionaler Live-Badge
}
export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title, subtitle, height = 280, className, children, delay = 0, badge
}) => {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={cn("bg-card border border-border rounded-xl overflow-hidden", className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {(title || subtitle || badge) && (
        <div className="px-5 pt-5 pb-2 flex items-start justify-between gap-3">
          <div>
            {title && <h4 className="font-ui font-semibold text-sm text-foreground leading-tight">{title}</h4>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5 font-ui">{subtitle}</p>}
          </div>
          {badge}
        </div>
      )}
      <div style={{ height }} className="px-1 pb-3">
        {children}
      </div>
    </div>
  );
};

/* ── Live-Puls-Badge ── */
export const LiveBadge: React.FC<{ color?: string }> = ({ color = "#1A9E5A" }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
    color, padding: "2px 8px", borderRadius: 99,
    background: `${color}18`, border: `1px solid ${color}40`,
  }}>
    <span style={{
      width: 6, height: 6, borderRadius: "50%", background: color,
      boxShadow: `0 0 0 0 ${color}`,
      animation: "livePulse 1.4s ease-in-out infinite",
      display: "inline-block",
    }} />
    LIVE
  </span>
);

/* ══════════════════════════════════════════════════════════════════════
   CSS KEYFRAMES (einmalig injiziert)
══════════════════════════════════════════════════════════════════════ */
const CHART_STYLES = `
@keyframes livePulse {
  0%   { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
  70%  { box-shadow: 0 0 0 5px transparent; opacity: 0.6; }
  100% { box-shadow: 0 0 0 0 transparent; opacity: 1; }
}
@keyframes dotPulse {
  0%, 100% { r: 4; opacity: 1; }
  50%       { r: 7; opacity: 0.5; }
}
@keyframes barRise {
  from { transform: scaleY(0); transform-origin: bottom; }
  to   { transform: scaleY(1); transform-origin: bottom; }
}
`;

let stylesInjected = false;
function injectChartStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = CHART_STYLES;
  document.head.appendChild(el);
  stylesInjected = true;
}

/* ══════════════════════════════════════════════════════════════════════
   1. AREA CHART
══════════════════════════════════════════════════════════════════════ */
export interface VoltAreaChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
  gradient?: boolean;
  className?: string;
  delay?: number;
  live?: boolean;
}
export const VoltAreaChart: React.FC<VoltAreaChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle,
  stacked, gradient = true, className, delay = 0, live,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}
      delay={delay} badge={live ? <LiveBadge /> : undefined}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              {dataKeys.map((key, i) => (
                <linearGradient key={key} id={`grad-area-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C[i % C.length]} stopOpacity={0.40} />
                  <stop offset="95%" stopColor={C[i % C.length]} stopOpacity={0.02} />
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
                stroke={C[i % C.length]} strokeWidth={2}
                fill={gradient ? `url(#grad-area-${key})` : C[i % C.length]}
                fillOpacity={gradient ? 1 : 0.15}
                dot={false} activeDot={{ r: 5, strokeWidth: 0 }}
                isAnimationActive={inView}
                animationDuration={900}
                animationEasing="ease-out"
                animationBegin={i * 120}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   2. BAR CHART
══════════════════════════════════════════════════════════════════════ */
export interface VoltBarChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
  horizontal?: boolean;
  palette?: VoltPalette;
  className?: string;
  delay?: number;
}

const HorizontalBarChart: React.FC<{
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey: string;
  height: number;
  colors: string[];
  animate: boolean;
}> = ({ data, dataKeys, xKey, height, colors, animate }) => {
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
              <text x={labelW - 8} y={cy + 4} textAnchor="end"
                fontSize={12} fontWeight={500} fill="var(--foreground)">{label}</text>
              {dataKeys.map((key, ki) => {
                const val = Number(row[key] ?? 0);
                const barY = cy - (dataKeys.length * barH) / 2 + ki * barH;
                const targetW = `calc(${(val / maxVal) * 100}% - ${(val / maxVal) * (labelW + padR)}px)`;
                return (
                  <g key={key}>
                    <rect x={labelW} y={barY} height={barH - 2} width={0} rx={3} ry={3}
                      fill={colors[ki % colors.length]} opacity={0.88}>
                      {animate && (
                        <animate attributeName="width" from="0" to={targetW}
                          dur={`${0.5 + ri * 0.06}s`} fill="freeze" calcMode="spline"
                          keySplines="0.4 0 0.2 1" keyTimes="0;1"
                          begin={`${ri * 0.08}s`} />
                      )}
                    </rect>
                    <text x={labelW + 4} y={barY + barH / 2 + 3} fontSize={10}
                      fill="var(--foreground)" opacity={0.6}>{val}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
        {xTicks.map(v => {
          const xPct = v / maxVal;
          return (
            <text key={v}
              x={`calc(${labelW}px + ${xPct * 100}% - ${xPct * (labelW + padR)}px)`}
              y={height - padB + 14} textAnchor="middle" fontSize={10} fill="var(--muted-foreground)">{v}</text>
          );
        })}
      </svg>
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

export const VoltBarChart: React.FC<VoltBarChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle,
  stacked, horizontal, palette, className, delay = 0,
}) => {
  injectChartStyles();
  const colors = getPalette(palette);
  const { ref, inView } = useInView(0.1);
  if (horizontal) {
    return (
      <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
        <div ref={ref} style={{ width: "100%", height: "100%" }}>
          <HorizontalBarChart data={data} dataKeys={dataKeys} xKey={xKey}
            height={height} colors={colors} animate={inView} />
        </div>
      </ChartWrapper>
    );
  }
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal"
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted/5)" }} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
            {dataKeys.map((key, i) => (
              <Bar key={key} dataKey={key} stackId={stacked ? "s" : undefined}
                fill={colors[i % colors.length]}
                radius={stacked ? [0,0,0,0] : [4,4,0,0]} maxBarSize={48}
                isAnimationActive={inView}
                animationDuration={700}
                animationEasing="ease-out"
                animationBegin={i * 80}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   3. LINE CHART – mit animiertem Pulse-Dot am letzten Datenpunkt
══════════════════════════════════════════════════════════════════════ */
export interface VoltLineChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  curved?: boolean;
  className?: string;
  delay?: number;
  live?: boolean;
}

/** Animierter Puls-Dot für den letzten Datenpunkt */
const PulseDot = (props: any) => {
  const { cx, cy, fill } = props;
  if (cx === undefined || cy === undefined) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill={fill} />
      <circle cx={cx} cy={cy} r={4} fill={fill} opacity={0.4}
        style={{ animation: "dotPulse 1.6s ease-in-out infinite" }} />
    </g>
  );
};

export const VoltLineChart: React.FC<VoltLineChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle,
  curved = true, className, delay = 0, live,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  const lastIdx = data.length - 1;
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}
      delay={delay} badge={live ? <LiveBadge /> : undefined}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
            {dataKeys.map((key, i) => (
              <Line key={key} type={curved ? "monotone" : "linear"} dataKey={key}
                stroke={C[i % C.length]} strokeWidth={2.5}
                dot={(dotProps: any) => {
                  if (live && dotProps.index === lastIdx) {
                    return <PulseDot key={`dot-${i}`} {...dotProps} fill={C[i % C.length]} />;
                  }
                  return <circle key={`dot-${i}-${dotProps.index}`} cx={dotProps.cx} cy={dotProps.cy} r={3}
                    fill={C[i % C.length]} />;
                }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                isAnimationActive={inView}
                animationDuration={1000}
                animationEasing="ease-out"
                animationBegin={i * 150}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   4. DONUT / PIE CHART – CountUp für innerValue
══════════════════════════════════════════════════════════════════════ */
export interface VoltDonutChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  innerLabel?: string;
  innerValue?: string | number;
  donut?: boolean;
  className?: string;
  delay?: number;
}
export const VoltDonutChart: React.FC<VoltDonutChartProps> = ({
  data, height = 280, title, subtitle, innerLabel, innerValue,
  donut = true, className, delay = 0,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  const numericTarget = typeof innerValue === "number" ? innerValue : 0;
  const animated = useCountUp(numericTarget, 1200, inView && typeof innerValue === "number");
  const displayValue = typeof innerValue === "number" ? animated : innerValue;
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%"
              innerRadius={donut ? "52%" : 0} outerRadius="72%"
              paddingAngle={donut ? 3 : 1} dataKey="value" strokeWidth={0}
              isAnimationActive={inView}
              animationBegin={delay}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {data.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8}
              wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
            {donut && innerLabel && (
              <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle"
                style={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}>
                {innerLabel}
              </text>
            )}
            {donut && innerValue !== undefined && (
              <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle"
                style={{ fontSize: 22, fontWeight: 700, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "currentColor" }}>
                {displayValue}
              </text>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   5. RADAR CHART
══════════════════════════════════════════════════════════════════════ */
export interface VoltRadarChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  angleKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}
export const VoltRadarChart: React.FC<VoltRadarChartProps> = ({
  data, dataKeys, angleKey = "subject", height = 280, title, subtitle, className, delay = 0,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey={angleKey}
              tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }} />
            <PolarRadiusAxis
              tick={{ fontSize: 9, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}
              axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
            {dataKeys.map((key, i) => (
              <Radar key={key} name={key} dataKey={key}
                stroke={C[i % C.length]} fill={C[i % C.length]}
                fillOpacity={0.25} strokeWidth={2}
                isAnimationActive={inView}
                animationDuration={800}
                animationEasing="ease-out"
                animationBegin={i * 100}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   6. SCATTER CHART
══════════════════════════════════════════════════════════════════════ */
export interface VoltScatterChartProps {
  data: Array<{ x: number; y: number; z?: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  className?: string;
  delay?: number;
}
export const VoltScatterChart: React.FC<VoltScatterChartProps> = ({
  data, height = 280, title, subtitle, xLabel = "X", yLabel = "Y", className, delay = 0,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="x" name={xLabel}
              tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}
              axisLine={false} tickLine={false} />
            <YAxis dataKey="y" name={yLabel}
              tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}
              axisLine={false} tickLine={false} />
            <ZAxis dataKey="z" range={[40, 400]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill={C[0]} fillOpacity={0.75}
              isAnimationActive={inView}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   7. COMPOSED CHART (Bar + Line)
══════════════════════════════════════════════════════════════════════ */
export interface VoltComposedChartProps {
  data: Record<string, unknown>[];
  barKeys: string[];
  lineKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}
export const VoltComposedChart: React.FC<VoltComposedChartProps> = ({
  data, barKeys, lineKeys, xKey = "name", height = 280, title, subtitle, className, delay = 0,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey={xKey}
              tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}
              axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}
              axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted/5)" }} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
            {barKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={C[i % C.length]} radius={[4,4,0,0]} maxBarSize={40}
                fillOpacity={0.9}
                isAnimationActive={inView}
                animationDuration={700}
                animationEasing="ease-out"
                animationBegin={i * 80}
              />
            ))}
            {lineKeys.map((key, i) => (
              <Line key={key} type="monotone" dataKey={key}
                stroke={C[(barKeys.length + i) % C.length]} strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 0 }}
                isAnimationActive={inView}
                animationDuration={900}
                animationEasing="ease-out"
                animationBegin={300 + i * 100}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   8. RADIAL BAR CHART
══════════════════════════════════════════════════════════════════════ */
export interface VoltRadialBarChartProps {
  data: Array<{ name: string; value: number; fill?: string }>;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}
export const VoltRadialBarChart: React.FC<VoltRadialBarChartProps> = ({
  data, height = 280, title, subtitle, className, delay = 0,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  const coloredData = data.map((d, i) => ({ ...d, fill: d.fill || C[i % C.length] }));
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="85%"
            data={coloredData} startAngle={180} endAngle={-180}>
            <PolarGrid gridType="circle" stroke="var(--border)" />
            <RadialBar dataKey="value" cornerRadius={4}
              background={{ fill: "var(--muted)" }}
              isAnimationActive={inView}
              animationDuration={900}
              animationEasing="ease-out"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8}
              wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   9. FUNNEL CHART
══════════════════════════════════════════════════════════════════════ */
export interface VoltFunnelChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}
export const VoltFunnelChart: React.FC<VoltFunnelChartProps> = ({
  data, height = 280, title, subtitle, className, delay = 0,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  const coloredData = data.map((d, i) => ({ ...d, fill: C[i % C.length] }));
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className} delay={delay}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <Tooltip content={<CustomTooltip />} />
            <Funnel dataKey="value" data={coloredData}
              isAnimationActive={inView}
              animationDuration={800}
              animationEasing="ease-out"
            >
              <LabelList position="right" fill="var(--muted-foreground)" stroke="none" dataKey="name"
                style={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   10. TREND / MULTI-LINE WITH REFERENCE
══════════════════════════════════════════════════════════════════════ */
export interface VoltTrendChartProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  showReferenceLine?: number;
  className?: string;
  delay?: number;
  live?: boolean;
}
export const VoltTrendChart: React.FC<VoltTrendChartProps> = ({
  data, dataKeys, xKey = "name", height = 280, title, subtitle,
  showReferenceLine, className, delay = 0, live,
}) => {
  injectChartStyles();
  const { ref, inView } = useInView(0.1);
  return (
    <ChartWrapper title={title} subtitle={subtitle} height={height} className={className}
      delay={delay} badge={live ? <LiveBadge /> : undefined}>
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey={xKey}
              tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}
              axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif', fill: "var(--muted-foreground)" }}
              axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: '"DM Sans", system-ui, sans-serif' }} />
            {showReferenceLine !== undefined && (
              <ReferenceLine y={showReferenceLine} stroke="var(--border)" strokeDasharray="4 4" />
            )}
            {dataKeys.map((key, i) => (
              <Line key={key} type="monotone" dataKey={key}
                stroke={C[i % C.length]} strokeWidth={2}
                dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
                isAnimationActive={inView}
                animationDuration={1000}
                animationEasing="ease-out"
                animationBegin={i * 120}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

/* ── 11. Stacked Area ── */
export const VoltStackedAreaChart: React.FC<VoltAreaChartProps> = (props) => (
  <VoltAreaChart {...props} stacked gradient />
);

/* ── 12. Stacked Bar ── */
export const VoltStackedBarChart: React.FC<VoltBarChartProps> = (props) => (
  <VoltBarChart {...props} stacked palette={props.palette ?? "pastel"} />
);
