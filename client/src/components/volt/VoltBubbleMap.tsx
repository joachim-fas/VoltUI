/**
 * VoltBubbleMap – Force-Layout Bubble Visualisierung
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Volt OS · Pastell-Radial-Gradienten
 *
 * Visuelles Hierarchie-System:
 *   Größe      → Wert (Score / Gewichtung)
 *   Farbe      → Kategorie (je Kategorie eine Farbe aus der Pastell-Palette)
 *   Lime-Rand  → Top-Performer (über accentThreshold)
 *
 * Architektur:
 *   D3 wird NUR zur einmaligen Positionsberechnung verwendet (force simulation).
 *   Das Rendering erfolgt als reines React-SVG – kein D3-DOM-Eingriff.
 *   Hover-Effekte: reines CSS (opacity, stroke) – keine Simulation-Reaktivierung.
 *   Animation: sanfte CSS-@keyframes Float-Animation pro Bubble (unterschiedliche
 *   Dauer/Verzögerung), kein D3-Eingriff beim Hover.
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

/* ── Volt Kategorie-Farben ── */
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

/* ── Typen ── */
export interface BubbleNode {
  id: string;
  label: string;
  value: number;
  maxValue?: number;
  category?: string;
  description?: string;
}

export interface VoltBubbleMapProps {
  nodes: BubbleNode[];
  categories?: string[];
  height?: number;
  className?: string;
  onNodeClick?: (node: BubbleNode) => void;
  showStats?: boolean;
  title?: string;
  subtitle?: string;
  accentThreshold?: number;
}

/* ── Berechnete Bubble-Position ── */
interface PlacedBubble extends BubbleNode {
  x: number;
  y: number;
  radius: number;
  categoryColor: string;
  isAccent: boolean;
  gradientId: string;
  floatDuration: number; // CSS-Animation-Dauer in Sekunden
  floatDelay: number;    // CSS-Animation-Verzögerung in Sekunden
  floatAmpX: number;    // Amplitude X in px
  floatAmpY: number;    // Amplitude Y in px
}

/* ── Tooltip-State ── */
interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  node: BubbleNode | null;
  categoryColor: string;
  isAccent: boolean;
}

const getCategoryColor = (category: string | undefined, categories: string[]): string => {
  if (!category) return CATEGORY_COLORS[0];
  const idx = categories.indexOf(category);
  if (idx >= 0) return CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
  const hash = Math.abs(category.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
  return CATEGORY_COLORS[hash % CATEGORY_COLORS.length];
};

/* ── CSS-Keyframes einmalig injizieren ── */
let keyframesInjected = false;
function injectKeyframes() {
  if (keyframesInjected || typeof document === "undefined") return;
  keyframesInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes gbm-float {
      0%   { transform: translate(0px, 0px); }
      25%  { transform: translate(var(--gbm-ax), calc(var(--gbm-ay) * -0.5)); }
      50%  { transform: translate(calc(var(--gbm-ax) * 0.3), var(--gbm-ay)); }
      75%  { transform: translate(calc(var(--gbm-ax) * -0.6), calc(var(--gbm-ay) * 0.3)); }
      100% { transform: translate(0px, 0px); }
    }
    .gbm-bubble {
      animation: gbm-float var(--gbm-dur) var(--gbm-delay) ease-in-out infinite;
      will-change: transform;
    }
    .gbm-bubble:hover .gbm-main-circle {
      stroke-opacity: 0.85 !important;
      stroke-width: 2px !important;
    }
  `;
  document.head.appendChild(style);
}

/* ── D3-Positionsberechnung (einmalig, kein DOM-Eingriff) ── */
function computePositions(
  nodes: BubbleNode[],
  categories: string[],
  W: number,
  H: number,
  accentThreshold: number
): Promise<PlacedBubble[]> {
  return new Promise(resolve => {
    if (nodes.length === 0) { resolve([]); return; }

    const maxVal = d3.max(nodes, d => d.value) ?? 200;
    const minVal = d3.min(nodes, d => d.value) ?? 0;
    const rMin = W < 500 ? 22 : 28;
    const rMax = W < 500 ? 58 : 80;
    const radiusScale = d3.scaleSqrt().domain([minVal, maxVal]).range([rMin, rMax]);

    type SimNode = d3.SimulationNodeDatum & BubbleNode & { radius: number };

    const simNodes: SimNode[] = nodes.map(n => ({
      ...n,
      radius: radiusScale(n.value),
      x: W / 2 + (Math.random() - 0.5) * W * 0.3,
      y: H / 2 + (Math.random() - 0.5) * H * 0.3,
    }));

    const sim = d3.forceSimulation<SimNode>(simNodes)
      .alphaDecay(0.15)
      .velocityDecay(0.85)
      .alphaMin(0.05)
      .force("center", d3.forceCenter(W / 2, H / 2).strength(0.05))
      .force("collision", d3.forceCollide<SimNode>().radius(d => d.radius + 6).strength(0.9).iterations(3))
      .force("x", d3.forceX(W / 2).strength(0.02))
      .force("y", d3.forceY(H / 2).strength(0.03))
      .stop();

    // Simulation synchron durchlaufen (kein DOM-Eingriff)
    const ticks = Math.ceil(Math.log(sim.alphaMin()) / Math.log(1 - sim.alphaDecay()));
    for (let i = 0; i < ticks; i++) sim.tick();

    const placed: PlacedBubble[] = simNodes.map((n, i) => {
      const pad = n.radius + 22;
      const x = Math.max(pad, Math.min(W - pad, n.x ?? W / 2));
      const y = Math.max(pad, Math.min(H - pad - 20, n.y ?? H / 2));
      const catColor = getCategoryColor(n.category, categories);
      const isAccent = n.value >= accentThreshold;

      // Sanfte, individuelle Float-Parameter
      const seed = i * 137.508; // goldener Winkel als Pseudo-Zufall
      const floatDuration = 4.5 + (seed % 3.5);      // 4.5s – 8s
      const floatDelay    = -(seed % floatDuration);  // negativer Delay = sofort starten
      const floatAmpX     = 2 + (seed % 3);           // 2px – 5px
      const floatAmpY     = 2 + ((seed * 1.3) % 3);  // 2px – 5px

      return {
        ...n,
        x, y,
        radius: n.radius,
        categoryColor: catColor,
        isAccent,
        gradientId: `gbm-grad-${n.id.replace(/[^a-z0-9]/gi, "-")}`,
        floatDuration,
        floatDelay,
        floatAmpX,
        floatAmpY,
      };
    });

    resolve(placed);
  });
}

/* ── Haupt-Komponente ── */
export const VoltBubbleMap: React.FC<VoltBubbleMapProps> = ({
  nodes,
  categories = [],
  height = 480,
  className,
  onNodeClick,
  showStats = true,
  title,
  subtitle,
  accentThreshold = 140,
}) => {
  const { darkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Alle");
  const [containerWidth, setContainerWidth] = useState(800);
  const [bubbles, setBubbles] = useState<PlacedBubble[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, node: null, categoryColor: "", isAccent: false,
  });

  const isDark = darkMode === "dark";

  const bg            = isDark ? "#111111" : "#FAFAFA";
  const borderColor   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const labelFill     = isDark ? "rgba(255,255,255,0.90)" : "rgba(10,10,10,0.85)";
  const labelSubFill  = isDark ? "rgba(255,255,255,0.50)" : "rgba(10,10,10,0.45)";
  const statsMuted    = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const statsStrong   = isDark ? "#FFFFFF" : "#0A0A0A";
  const filterInactiveFg = isDark ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.45)";
  const filterInactiveBd = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
  const gridColor     = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const ttBg      = isDark ? "rgba(18,18,18,0.97)" : "rgba(255,255,255,0.98)";
  const ttBorder  = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const ttText    = isDark ? "#FFFFFF" : "#0A0A0A";
  const ttMuted   = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.42)";

  // CSS-Keyframes einmalig injizieren
  useEffect(() => { injectKeyframes(); }, []);

  // Responsive width
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

  // Stabile Referenzen mit useMemo – verhindert Endlosschleife durch neue Array-Referenzen bei jedem Render
  const allCategories = useMemo(
    () => categories.length > 0
      ? categories
      : (Array.from(new Set(nodes.map(n => n.category).filter(Boolean))) as string[]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes, categories.length]
  );

  const filteredNodes = useMemo(
    () => activeFilter === "Alle" ? nodes : nodes.filter(n => n.category === activeFilter),
    [nodes, activeFilter]
  );

  // Positionen berechnen wenn sich Daten oder Größe ändern
  useEffect(() => {
    if (containerWidth < 10) return;
    computePositions(filteredNodes, allCategories, containerWidth, height, accentThreshold)
      .then(setBubbles);
  }, [filteredNodes, allCategories, containerWidth, height, accentThreshold]);

  // Stats
  const stark   = filteredNodes.filter(n => n.value >= accentThreshold).length;
  const moderat = filteredNodes.filter(n => n.value >= accentThreshold * 0.6 && n.value < accentThreshold).length;
  const schwach = filteredNodes.filter(n => n.value < accentThreshold * 0.6).length;

  const tooltipPct = tooltip.node
    ? Math.round((tooltip.node.value / (tooltip.node.maxValue ?? tooltip.node.value)) * 100)
    : 0;

  // Glow-Filter-ID (einmalig pro Instanz)
  const glowId = "gbm-glow";

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
            const catColor = cat === "Alle" ? null : getCategoryColor(cat, allCategories);
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all duration-150"
                style={{
                  background: active
                    ? (cat === "Alle" ? (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)") : catColor + "28")
                    : "transparent",
                  color: active ? (cat === "Alle" ? statsStrong : isDark ? "#FFFFFF" : "#0A0A0A") : filterInactiveFg,
                  border: `1px solid ${active
                    ? (cat === "Alle" ? (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)") : catColor + "60")
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
            <span>Größe = Wert</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {CATEGORY_COLORS.slice(0, 3).map((c, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
            </div>
            <span>Farbe = Kategorie</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: LIME, display: "inline-block", boxShadow: `0 0 6px ${LIME}88` }} />
            <span style={{ color: isDark ? LIME : "#4A7A00" }}>= Top-Performer</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas + Tooltip */}
      <div ref={containerRef} className="relative flex-1 w-full" style={{ overflow: "visible" }}>
        <svg
          width={containerWidth}
          height={height}
          viewBox={`0 0 ${containerWidth} ${height}`}
          style={{ display: "block" }}
        >
          <defs>
            {/* Glow-Filter */}
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Radial-Gradienten */}
            {bubbles.map(b => (
              <radialGradient key={b.gradientId} id={b.gradientId} cx="35%" cy="30%" r="72%">
                {b.isAccent ? (
                  <>
                    <stop offset="0%"   stopColor={isDark ? "#F0FFD0" : "#EEFF99"} stopOpacity="0.95" />
                    <stop offset="45%"  stopColor={LIME}                            stopOpacity="0.85" />
                    <stop offset="100%" stopColor={b.categoryColor}                 stopOpacity={isDark ? "0.65" : "0.50"} />
                  </>
                ) : (
                  <>
                    <stop offset="0%"   stopColor="#FFFFFF"              stopOpacity={isDark ? "0.28" : "0.60"} />
                    <stop offset="40%"  stopColor={b.categoryColor + "EE"} stopOpacity="0.90" />
                    <stop offset="100%" stopColor={b.categoryColor}        stopOpacity={isDark ? "0.55" : "0.70"} />
                  </>
                )}
              </radialGradient>
            ))}
          </defs>

          {/* Hintergrund-Raster */}
          {Array.from({ length: Math.ceil(containerWidth / 40) + 1 }, (_, i) => i * 40).map(x => (
            <line key={`gx-${x}`} x1={x} y1={0} x2={x} y2={height} stroke={gridColor} strokeWidth={0.5} />
          ))}
          {Array.from({ length: Math.ceil(height / 40) + 1 }, (_, i) => i * 40).map(y => (
            <line key={`gy-${y}`} x1={0} y1={y} x2={containerWidth} y2={y} stroke={gridColor} strokeWidth={0.5} />
          ))}

          {/* Bubbles */}
          {bubbles.map(b => {
            const mainStrokeColor = b.isAccent ? LIME_DARK : (isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)");
            const mainStrokeWidth = b.isAccent ? 2 : 1;
            const mainStrokeOpacity = b.isAccent ? 0.8 : 0.35;
            const fontSize = Math.max(10, b.radius * 0.28);
            const labelFontSize = Math.max(9, Math.min(11, b.radius * 0.20));
            const words = b.label.split(" ");
            const labelLines = (b.label.length > 14 && words.length > 1)
              ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")]
              : [b.label];

            return (
              <g
                key={b.id}
                transform={`translate(${b.x}, ${b.y})`}
                onMouseEnter={() => {
                  const tooltipW = 200;
                  const offsetX = b.x + b.radius + 14 + tooltipW > containerWidth
                    ? -(b.radius + 14 + tooltipW)
                    : b.radius + 14;
                  setTooltip({
                    visible: true,
                    x: b.x + offsetX,
                    y: b.y,
                    node: b,
                    categoryColor: b.categoryColor,
                    isAccent: b.isAccent,
                  });
                }}
                onMouseLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
                onClick={() => { onNodeClick?.(b); }}
              >
                {/* Inneres g: CSS-Float-Animation – transformOrigin relativ zur Bubble-Mitte (0,0) */}
                <g
                  className="gbm-bubble"
                  style={{
                    "--gbm-ax": `${b.floatAmpX}px`,
                    "--gbm-ay": `${b.floatAmpY}px`,
                    "--gbm-dur": `${b.floatDuration}s`,
                    "--gbm-delay": `${b.floatDelay}s`,
                    cursor: "pointer",
                    transformOrigin: "0px 0px",
                  } as React.CSSProperties}
                >
                {/* Äußerer Glow-Ring für Accent-Nodes */}
                {b.isAccent && (
                  <circle
                    r={b.radius + 8}
                    fill="none"
                    stroke={LIME}
                    strokeWidth={1.5}
                    strokeOpacity={isDark ? 0.30 : 0.45}
                    strokeDasharray="4 3"
                  />
                )}

                {/* Haupt-Kreis */}
                <circle
                  className="gbm-main-circle"
                  r={b.radius}
                  fill={`url(#${b.gradientId})`}
                  stroke={mainStrokeColor}
                  strokeWidth={mainStrokeWidth}
                  strokeOpacity={mainStrokeOpacity}
                  filter={b.isAccent ? `url(#${glowId})` : undefined}
                  style={{ transition: "stroke-opacity 0.15s, stroke-width 0.15s" }}
                />

                {/* Kategorie-Farbpunkt */}
                {b.category && b.radius > 36 && (
                  <circle
                    cx={-b.radius * 0.38}
                    cy={-b.radius * 0.38}
                    r={4}
                    fill={b.isAccent ? LIME : b.categoryColor}
                    opacity={isDark ? 0.7 : 0.6}
                  />
                )}

                {/* Score-Text */}
                <text
                  textAnchor="middle"
                  dy="0.15em"
                  fill={b.isAccent ? (isDark ? "#0A0A0A" : "#1A3A00") : labelFill}
                  fontSize={fontSize}
                  fontFamily='"DM Mono", "DM Sans", system-ui, sans-serif'
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  pointerEvents="none"
                >
                  {b.maxValue ? `${b.value}/${b.maxValue}` : `${b.value}`}
                </text>

                {/* Label unterhalb */}
                <text
                  textAnchor="middle"
                  fill={labelSubFill}
                  fontSize={labelFontSize}
                  fontFamily='"DM Sans", system-ui, sans-serif'
                  fontWeight="500"
                  letterSpacing="0.01em"
                  pointerEvents="none"
                >
                  {labelLines.map((line, i) => (
                    <tspan key={i} x={0} dy={i === 0 ? b.radius + 16 : "1.25em"}>
                      {line}
                    </tspan>
                  ))}
                </text>
                </g>{/* end animation-g */}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {tooltip.visible && tooltip.node && (
          <div
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              transform: "translateY(-50%)",
              pointerEvents: "none",
              zIndex: 50,
              width: 196,
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
              {tooltip.node.category && (
                <div className="flex items-center gap-1.5 mb-2">
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: tooltip.categoryColor,
                    display: "inline-block", flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 10, fontFamily: '"DM Mono", monospace', color: ttMuted, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {tooltip.node.category}
                  </span>
                  {tooltip.isAccent && (
                    <span style={{
                      marginLeft: "auto",
                      fontSize: 9, fontFamily: '"DM Mono", monospace',
                      color: isDark ? LIME : "#3A6A00",
                      background: isDark ? "rgba(228,255,151,0.12)" : "rgba(100,180,0,0.10)",
                      border: `1px solid ${isDark ? "rgba(228,255,151,0.25)" : "rgba(100,180,0,0.25)"}`,
                      borderRadius: 4, padding: "1px 5px",
                    }}>
                      TOP
                    </span>
                  )}
                </div>
              )}

              {/* Label */}
              <div style={{
                fontSize: 13, fontWeight: 700,
                fontFamily: '"DM Sans", system-ui, sans-serif',
                color: ttText, lineHeight: 1.3, marginBottom: 6,
              }}>
                {tooltip.node.label}
              </div>

              {/* Score + Balken */}
              <div style={{ marginBottom: tooltip.node.description ? 8 : 0 }}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span style={{ fontSize: 10, fontFamily: '"DM Mono", monospace', color: ttMuted }}>Score</span>
                  <span style={{
                    fontSize: 14, fontWeight: 700,
                    fontFamily: '"DM Mono", monospace',
                    color: tooltip.isAccent ? (isDark ? LIME : "#2A6A00") : ttText,
                  }}>
                    {tooltip.node.value}
                    {tooltip.node.maxValue && (
                      <span style={{ fontSize: 10, fontWeight: 400, color: ttMuted }}>/{tooltip.node.maxValue}</span>
                    )}
                  </span>
                </div>
                {tooltip.node.maxValue && (
                  <div style={{
                    height: 3, borderRadius: 2,
                    background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${tooltipPct}%`,
                      borderRadius: 2,
                      background: tooltip.isAccent
                        ? `linear-gradient(90deg, ${LIME_DARK}, ${LIME})`
                        : `linear-gradient(90deg, ${tooltip.categoryColor}CC, ${tooltip.categoryColor})`,
                      transition: "width 0.3s ease",
                    }} />
                  </div>
                )}
              </div>

              {/* Beschreibung */}
              {tooltip.node.description && (
                <p style={{
                  fontSize: 11,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  color: ttMuted,
                  lineHeight: 1.55,
                  margin: 0,
                  paddingTop: 8,
                  borderTop: `1px solid ${ttBorder}`,
                }}>
                  {tooltip.node.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      {showStats && (
        <div
          className="flex items-center gap-6 px-5 py-3"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          {[
            { label: "Top-Performer", value: stark,   color: isDark ? LIME : "#3A7A00" },
            { label: "Moderat",       value: moderat, color: isDark ? "#F5C87A" : "#8A6000" },
            { label: "Entwicklung",   value: schwach, color: statsMuted },
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

export default VoltBubbleMap;
