/**
 * VoltRadarChart – Quadranten-Blasen-Visualisierung
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Volt OS · Pastell-Radial-Gradienten (identisch zu VoltBubbleMap)
 *
 * Visuelles Kodiersystem:
 *   Position X   → Zeithorizont (kurzfristig ↔ langfristig)
 *   Position Y   → Reifegrad / Priorität (beobachten ↔ übernehmen)
 *   Blasengröße  → Einfluss (influence)
 *   Deckkraft    → Vertrauen (confidence)
 *   Farbe        → Zeithorizont-Kategorie oder benutzerdefiniert
 *
 * Architektur:
 *   D3 wird NUR für Skalenberechnung verwendet (scaleLinear).
 *   Rendering: reines React-SVG – kein D3-DOM-Eingriff.
 *   Hover: reines CSS + React-State (kein D3-Eingriff).
 *   Animation: CSS-Transition (scale 0→1, gestaffelt nach Index).
 */

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

/* ── Pastell-Kategoriefarben (identisch zu VoltBubbleMap) ── */
const CATEGORY_COLORS: string[] = [
  "#F4A0B5", // Rose
  "#7AB8F5", // Sky
  "#6DDBA0", // Mint
  "#F5C87A", // Amber
  "#D98AE8", // Orchid
  "#F0956A", // Peach
  "#5ECECE", // Aqua
  "#E8C840", // Yellow
];

const LIME = "#E4FF97";
const LIME_DARK = "#C8F060";

/* ── Zeithorizont-Farben ── */
const HORIZON_COLORS: Record<string, string> = {
  "Kurz":   "#F4A0B5", // Rose
  "Mittel": "#7AB8F5", // Sky
  "Lang":   "#D98AE8", // Orchid
};

/* ── Typen ── */
export interface RadarBubble {
  id: string;
  label: string;
  /** X-Achse: Zeithorizont (0–1, 0 = kurzfristig, 1 = langfristig) */
  x: number;
  /** Y-Achse: Reifegrad (0–1, 0 = beobachten, 1 = übernehmen) */
  y: number;
  /** Blasengröße: Einfluss (1–100) */
  influence: number;
  /** Deckkraft: Vertrauen (0–1) */
  confidence: number;
  /** Kategorie für Farbzuweisung */
  category?: string;
  /** Zeithorizont für Farbkodierung im "horizon"-Modus */
  horizon?: "Kurz" | "Mittel" | "Lang";
  /** Metadaten für Tooltip */
  meta?: {
    signals?: number;
    sources?: string[];
    relevance?: number;
    description?: string;
  };
}

export interface VoltRadarChartProps {
  bubbles: RadarBubble[];
  /** Quadranten-Labels: [oben-links, oben-rechts, unten-links, unten-rechts] */
  quadrants?: [string, string, string, string];
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  onBubbleClick?: (bubble: RadarBubble) => void;
  /** Farbmodus */
  colorMode?: "horizon" | "category";
  showLegend?: boolean;
}

/* ── Tooltip-State ── */
interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  bubble: RadarBubble | null;
  color: string;
}

const getCategoryColor = (
  bubble: RadarBubble,
  allCategories: string[],
  colorMode: "horizon" | "category"
): string => {
  if (colorMode === "horizon" && bubble.horizon) {
    return HORIZON_COLORS[bubble.horizon] ?? CATEGORY_COLORS[0];
  }
  const cat = bubble.category ?? "default";
  const idx = allCategories.indexOf(cat);
  if (idx >= 0) return CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
  const hash = Math.abs(cat.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
  return CATEGORY_COLORS[hash % CATEGORY_COLORS.length];
};

/* ══════════════════════════════════════════════════════════════════════
   HAUPTKOMPONENTE
══════════════════════════════════════════════════════════════════════ */
export const VoltRadarChart: React.FC<VoltRadarChartProps> = ({
  bubbles,
  quadrants = ["Beobachten", "Bewerten", "Testen", "Übernehmen"],
  height = 480,
  title,
  subtitle,
  className,
  onBubbleClick,
  colorMode = "horizon",
  showLegend = true,
}) => {
  const { darkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [activeFilter, setActiveFilter] = useState<string>("Alle");
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, bubble: null, color: "",
  });

  const isDark = darkMode === "dark";

  /* ── Farb-Tokens (identisch zu VoltBubbleMap) ── */
  const bg            = isDark ? "#111111" : "#FAFAFA";
  const borderColor   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const statsMuted    = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const statsStrong   = isDark ? "#FFFFFF" : "#0A0A0A";
  const filterInactiveFg = isDark ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.45)";
  const filterInactiveBd = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
  const gridColor     = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const axisColor     = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const quadLabelColor = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const ttBg      = isDark ? "rgba(18,18,18,0.97)" : "rgba(255,255,255,0.98)";
  const ttBorder  = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const ttText    = isDark ? "#FFFFFF" : "#0A0A0A";
  const ttMuted   = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.42)";

  /* ── Responsive width ── */
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) setContainerWidth(w);
    });
    if (containerRef.current) {
      obs.observe(containerRef.current);
      const w = containerRef.current.offsetWidth;
      if (w > 0) setContainerWidth(w);
    }
    return () => obs.disconnect();
  }, []);

  /* ── Einblend-Animation ── */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* ── Kategorien ── */
  const allCategories = useMemo(() => {
    if (colorMode === "horizon") {
      return Object.keys(HORIZON_COLORS);
    }
    return Array.from(new Set(bubbles.map(b => b.category).filter(Boolean))) as string[];
  }, [bubbles, colorMode]);

  const filteredBubbles = useMemo(() => {
    if (activeFilter === "Alle") return bubbles;
    if (colorMode === "horizon") return bubbles.filter(b => b.horizon === activeFilter);
    return bubbles.filter(b => b.category === activeFilter);
  }, [bubbles, activeFilter, colorMode]);

  /* ── SVG-Dimensionen ── */
  const padding = { top: 36, right: 36, bottom: 36, left: 36 };
  const svgH = height;
  const plotW = containerWidth - padding.left - padding.right;
  const plotH = svgH - padding.top - padding.bottom;

  /* ── D3-Skalen ── */
  const xScale = useMemo(
    () => d3.scaleLinear().domain([0, 1]).range([0, plotW]),
    [plotW]
  );
  const yScale = useMemo(
    () => d3.scaleLinear().domain([0, 1]).range([plotH, 0]),
    [plotH]
  );

  /* ── Blasen-Radius ── */
  const getRadius = (influence: number) =>
    Math.max(10, Math.min(46, Math.sqrt(influence) * 3.2));

  /* ── Gradient-IDs ── */
  const getGradientId = (b: RadarBubble) =>
    `vrc-grad-${b.id.replace(/[^a-z0-9]/gi, "-")}`;

  /* ── Tooltip-Handler ── */
  const handleMouseEnter = useCallback(
    (bubble: RadarBubble, color: string, e: React.MouseEvent<SVGGElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const r = getRadius(bubble.influence);
      const bx = padding.left + xScale(bubble.x);
      const by = padding.top + yScale(bubble.y);
      const tooltipW = 200;
      const offsetX = bx + r + 14 + tooltipW > containerWidth
        ? -(r + 14 + tooltipW)
        : r + 14;
      setTooltip({
        visible: true,
        x: bx + offsetX,
        y: by,
        bubble,
        color,
      });
    },
    [xScale, yScale, padding.left, padding.top, containerWidth]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  /* ── Stats ── */
  const highConf  = filteredBubbles.filter(b => b.confidence >= 0.7).length;
  const midConf   = filteredBubbles.filter(b => b.confidence >= 0.4 && b.confidence < 0.7).length;
  const lowConf   = filteredBubbles.filter(b => b.confidence < 0.4).length;

  return (
    <div
      className={cn("flex flex-col rounded-xl overflow-hidden", className)}
      style={{ background: bg, border: `1px solid ${borderColor}` }}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-5 pt-4 pb-3.5" style={{ borderBottom: `1px solid ${borderColor}` }}>
          {title && (
            <h3 className="font-display font-bold text-base" style={{ color: isDark ? "#FFFFFF" : "#0A0A0A" }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-[11px] font-mono mt-0.5" style={{ color: statsMuted }}>{subtitle}</p>
          )}
        </div>
      )}

      {/* Filter-Tags + Legende */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {["Alle", ...allCategories].map(cat => {
            const active = activeFilter === cat;
            const catColor = cat === "Alle" ? null : (
              colorMode === "horizon"
                ? HORIZON_COLORS[cat]
                : getCategoryColor({ id: cat, label: cat, x: 0, y: 0, influence: 50, confidence: 0.8, category: cat }, allCategories, colorMode)
            );
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all duration-150"
                style={{
                  background: active
                    ? (cat === "Alle" ? (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)") : (catColor ?? "") + "28")
                    : "transparent",
                  color: active ? (cat === "Alle" ? statsStrong : isDark ? "#FFFFFF" : "#0A0A0A") : filterInactiveFg,
                  border: `1px solid ${active
                    ? (cat === "Alle" ? (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)") : (catColor ?? "") + "60")
                    : filterInactiveBd}`,
                }}
              >
                {catColor && (
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: catColor, display: "inline-block", flexShrink: 0 }} />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Legende */}
        <div className="flex items-center gap-4 text-[10px] font-mono" style={{ color: statsMuted }}>
          <div className="flex items-center gap-1.5">
            <svg width="28" height="16" viewBox="0 0 28 16">
              <circle cx="6" cy="8" r="4" fill={isDark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.15)"} />
              <circle cx="20" cy="8" r="7" fill={isDark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.15)"} />
            </svg>
            <span>Größe = Einfluss</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {CATEGORY_COLORS.slice(0, 3).map((c, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
            </div>
            <span>Farbe = {colorMode === "horizon" ? "Horizont" : "Kategorie"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "inline-block", opacity: 0.4 }} />
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "inline-block", opacity: 1 }} />
            <span>Deckkraft = Vertrauen</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas + Tooltip */}
      <div ref={containerRef} className="relative w-full" style={{ overflow: "visible" }}>
        <svg
          width={containerWidth}
          height={svgH}
          viewBox={`0 0 ${containerWidth} ${svgH}`}
          style={{ display: "block" }}
        >
          <defs>
            {/* Radial-Gradienten für jede Blase */}
            {filteredBubbles.map(b => {
              const color = getCategoryColor(b, allCategories, colorMode);
              const gradId = getGradientId(b);
              return (
                <radialGradient key={gradId} id={gradId} cx="35%" cy="30%" r="72%">
                  <stop offset="0%"   stopColor="#FFFFFF"          stopOpacity={isDark ? "0.28" : "0.60"} />
                  <stop offset="40%"  stopColor={color + "EE"}     stopOpacity="0.90" />
                  <stop offset="100%" stopColor={color}            stopOpacity={isDark ? "0.55" : "0.70"} />
                </radialGradient>
              );
            })}
          </defs>

          {/* Hintergrund-Raster */}
          {Array.from({ length: Math.ceil(containerWidth / 40) + 1 }, (_, i) => i * 40).map(x => (
            <line key={`gx-${x}`} x1={x} y1={0} x2={x} y2={svgH} stroke={gridColor} strokeWidth={0.5} />
          ))}
          {Array.from({ length: Math.ceil(svgH / 40) + 1 }, (_, i) => i * 40).map(y => (
            <line key={`gy-${y}`} x1={0} y1={y} x2={containerWidth} y2={y} stroke={gridColor} strokeWidth={0.5} />
          ))}

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Quadranten-Achsen */}
            <line
              x1={plotW / 2} y1={0}
              x2={plotW / 2} y2={plotH}
              stroke={axisColor}
              strokeWidth={1}
              strokeDasharray="6 4"
            />
            <line
              x1={0} y1={plotH / 2}
              x2={plotW} y2={plotH / 2}
              stroke={axisColor}
              strokeWidth={1}
              strokeDasharray="6 4"
            />

            {/* Konzentrische Ringe (25%, 50%, 75%) */}
            {[0.25, 0.5, 0.75].map(r => (
              <ellipse
                key={r}
                cx={plotW / 2}
                cy={plotH / 2}
                rx={(plotW / 2) * r}
                ry={(plotH / 2) * r}
                fill="none"
                stroke={axisColor}
                strokeWidth={1}
                strokeDasharray="3 5"
                opacity={0.6}
              />
            ))}

            {/* Quadranten-Labels */}
            {[
              { label: quadrants[0], x: 8, y: 16, anchor: "start" as const },
              { label: quadrants[1], x: plotW - 8, y: 16, anchor: "end" as const },
              { label: quadrants[2], x: 8, y: plotH - 6, anchor: "start" as const },
              { label: quadrants[3], x: plotW - 8, y: plotH - 6, anchor: "end" as const },
            ].map(({ label, x, y, anchor }) => (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor={anchor}
                fill={quadLabelColor}
                style={{
                  fontFamily: '"JetBrains Mono", "DM Mono", monospace',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label.toUpperCase()}
              </text>
            ))}

            {/* Achsen-Labels */}
            <text
              x={plotW / 2}
              y={plotH + 28}
              textAnchor="middle"
              fill={statsMuted}
              style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: "0.06em" }}
            >
              KURZFRISTIG ← → LANGFRISTIG
            </text>
            <text
              x={-plotH / 2}
              y={-24}
              textAnchor="middle"
              fill={statsMuted}
              transform="rotate(-90)"
              style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: "0.06em" }}
            >
              BEOBACHTEN ← → ÜBERNEHMEN
            </text>

            {/* Blasen */}
            {filteredBubbles.map((bubble, i) => {
              const cx = xScale(bubble.x);
              const cy = yScale(bubble.y);
              const r = getRadius(bubble.influence);
              const color = getCategoryColor(bubble, allCategories, colorMode);
              const gradId = getGradientId(bubble);
              const opacity = 0.35 + bubble.confidence * 0.65;
              const strokeColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";

              return (
                <g
                  key={bubble.id}
                  transform={`translate(${cx}, ${cy})`}
                  onMouseEnter={e => handleMouseEnter(bubble, color, e)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onBubbleClick?.(bubble)}
                  style={{ cursor: onBubbleClick ? "pointer" : "default" }}
                >
                  {/* Haupt-Kreis mit Radial-Gradient */}
                  <circle
                    r={r}
                    fill={`url(#${gradId})`}
                    fillOpacity={opacity}
                    stroke={strokeColor}
                    strokeWidth={1}
                    strokeOpacity={0.35}
                    style={{
                      transform: mounted ? `scale(1)` : `scale(0)`,
                      transformOrigin: "0px 0px",
                      transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 35}ms, stroke-opacity 0.15s ease`,
                    }}
                  />

                  {/* Kategorie-Farbpunkt (bei größeren Blasen) */}
                  {r > 22 && (
                    <circle
                      cx={-r * 0.38}
                      cy={-r * 0.38}
                      r={3.5}
                      fill={color}
                      opacity={isDark ? 0.7 : 0.6}
                      style={{
                        transform: mounted ? `scale(1)` : `scale(0)`,
                        transformOrigin: `${-r * 0.38}px ${-r * 0.38}px`,
                        transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 35 + 80}ms`,
                      }}
                    />
                  )}

                  {/* Label (immer sichtbar bei mittleren/großen Blasen) */}
                  {r > 18 && (
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      fill={isDark ? "rgba(255,255,255,0.85)" : "rgba(10,10,10,0.80)"}
                      fontSize={Math.max(9, Math.min(12, r * 0.26))}
                      fontFamily='"DM Sans", system-ui, sans-serif'
                      fontWeight="600"
                      pointerEvents="none"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transition: `opacity 0.3s ease ${i * 35 + 200}ms`,
                      }}
                    >
                      {bubble.label.length > 12 ? bubble.label.slice(0, 10) + "…" : bubble.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Tooltip (identisch zu VoltBubbleMap) */}
        {tooltip.visible && tooltip.bubble && (
          <div
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              transform: "translateY(-50%)",
              pointerEvents: "none",
              zIndex: 50,
              width: 200,
            }}
          >
            <div
              style={{
                background: ttBg,
                border: `1px solid ${ttBorder}`,
                borderRadius: 10,
                padding: "10px 12px",
                boxShadow: isDark
                  ? "0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)"
                  : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Kategorie-Badge */}
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: tooltip.color,
                  display: "inline-block", flexShrink: 0,
                }} />
                <span style={{ fontSize: 10, fontFamily: '"DM Mono", monospace', color: ttMuted, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {tooltip.bubble.horizon ?? tooltip.bubble.category ?? "Signal"}
                </span>
              </div>

              {/* Label */}
              <div style={{
                fontSize: 13, fontWeight: 700,
                fontFamily: '"DM Sans", system-ui, sans-serif',
                color: ttText, lineHeight: 1.3, marginBottom: 8,
              }}>
                {tooltip.bubble.label}
              </div>

              {/* Metriken */}
              {[
                { label: "Einfluss",  value: tooltip.bubble.influence,                    color: tooltip.color },
                { label: "Vertrauen", value: Math.round(tooltip.bubble.confidence * 100), color: "#6DDBA0" },
                { label: "Relevanz",  value: tooltip.bubble.meta?.relevance ?? Math.round(tooltip.bubble.confidence * 100), color: "#7AB8F5" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center gap-2 mb-1.5">
                  <span style={{ fontSize: 10, fontFamily: '"DM Mono", monospace', color: ttMuted, width: 56, flexShrink: 0 }}>{label}</span>
                  <div style={{ flex: 1, height: 3, borderRadius: 2, background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${value}%`, borderRadius: 2, background: color, transition: "width 0.3s ease" }} />
                  </div>
                  <span style={{ fontSize: 10, fontFamily: '"DM Mono", monospace', color: ttText, flexShrink: 0 }}>{value}%</span>
                </div>
              ))}

              {/* Zeithorizont-Badge */}
              {tooltip.bubble.horizon && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${ttBorder}` }}>
                  <span style={{
                    display: "inline-block",
                    padding: "1px 6px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontFamily: '"DM Mono", monospace',
                    background: `${tooltip.color}22`,
                    color: isDark ? tooltip.color : "#1A3A00",
                    border: `1px solid ${tooltip.color}44`,
                  }}>
                    {tooltip.bubble.horizon === "Kurz" ? "< 1 Jahr" : tooltip.bubble.horizon === "Mittel" ? "1–3 Jahre" : "3+ Jahre"}
                  </span>
                </div>
              )}

              {/* Beschreibung */}
              {tooltip.bubble.meta?.description && (
                <p style={{
                  fontSize: 11,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  color: ttMuted,
                  lineHeight: 1.55,
                  margin: 0,
                  paddingTop: 8,
                  marginTop: 8,
                  borderTop: `1px solid ${ttBorder}`,
                }}>
                  {tooltip.bubble.meta.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stats (identisch zu VoltBubbleMap) */}
      {showLegend && (
        <div
          className="flex items-center gap-6 px-5 py-3"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          {[
            { label: "Hohes Vertrauen",  value: highConf, color: isDark ? LIME : "#3A7A00" },
            { label: "Mittleres Vertr.", value: midConf,  color: isDark ? "#F5C87A" : "#8A6000" },
            { label: "Beobachtung",      value: lowConf,  color: statsMuted },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: s.color, display: "inline-block", flexShrink: 0,
              }} />
              <span style={{ fontSize: 11, fontFamily: '"DM Mono", monospace', color: statsMuted }}>
                {s.label}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: '"DM Mono", monospace', color: statsStrong }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoltRadarChart;
