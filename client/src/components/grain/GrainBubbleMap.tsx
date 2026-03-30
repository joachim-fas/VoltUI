/**
 * GrainBubbleMap – Force-Layout Bubble Visualisierung
 * Design: Grain OS · Pastell-Radial-Gradienten
 *
 * Visuelles Hierarchie-System:
 *   Größe      → Wert (Score / Gewichtung)
 *   Farbe      → Kategorie (je Kategorie eine Farbe aus der Pastell-Palette)
 *   Lime-Rand  → Top-Performer (über accentThreshold)
 *
 * Tooltip: floating HTML-Overlay, erscheint direkt an der Bubble beim Hover
 * theme="dark"  → schwarzer Hintergrund (Standard)
 * theme="light" → weißer Hintergrund
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

/* ── Grain Kategorie-Farben ── */
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

export interface GrainBubbleMapProps {
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

/* ── Interne D3-Node ── */
interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  value: number;
  maxValue?: number;
  category?: string;
  description?: string;
  radius: number;
  gradientId: string;
  categoryColor: string;
  isAccent: boolean;
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

/* ── Haupt-Komponente ── */
export const GrainBubbleMap: React.FC<GrainBubbleMapProps> = ({
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
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<d3.Simulation<SimNode, undefined> | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Alle");
  const [selectedNode, setSelectedNode] = useState<BubbleNode | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);
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

  // Tooltip-Farben
  const ttBg      = isDark ? "rgba(18,18,18,0.97)" : "rgba(255,255,255,0.98)";
  const ttBorder  = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const ttText    = isDark ? "#FFFFFF" : "#0A0A0A";
  const ttMuted   = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.42)";

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

  const allCategories =
    categories.length > 0
      ? categories
      : (Array.from(new Set(nodes.map(n => n.category).filter(Boolean))) as string[]);

  const filteredNodes =
    activeFilter === "Alle" ? nodes : nodes.filter(n => n.category === activeFilter);

  const drawBubbles = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || containerWidth < 10) return;

    if (simRef.current) {
      simRef.current.stop();
      simRef.current = null;
    }

    const W = containerWidth;
    const H = height;

    d3.select(svg).selectAll("*").remove();

    const maxVal = d3.max(filteredNodes, d => d.value) ?? 200;
    const minVal = d3.min(filteredNodes, d => d.value) ?? 0;
    const rMin = W < 500 ? 22 : 28;
    const rMax = W < 500 ? 58 : 80;
    const radiusScale = d3.scaleSqrt().domain([minVal, maxVal]).range([rMin, rMax]);

    const simNodes: SimNode[] = filteredNodes.map(n => {
      const catColor = getCategoryColor(n.category, allCategories);
      const isAccent = n.value >= accentThreshold;
      return {
        ...n,
        radius: radiusScale(n.value),
        gradientId: `gbg-${n.id.replace(/[^a-z0-9]/gi, "-")}`,
        categoryColor: catColor,
        isAccent,
        x: W / 2 + (Math.random() - 0.5) * W * 0.2,
        y: H / 2 + (Math.random() - 0.5) * H * 0.2,
      };
    });

    const svgEl = d3.select(svg).attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
    const defs = svgEl.append("defs");

    // Glow-Filter
    const glow = defs.append("filter")
      .attr("id", "gbg-glow")
      .attr("x", "-40%").attr("y", "-40%")
      .attr("width", "180%").attr("height", "180%");
    glow.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", "6").attr("result", "blur");
    const fm = glow.append("feMerge");
    fm.append("feMergeNode").attr("in", "blur");
    fm.append("feMergeNode").attr("in", "SourceGraphic");

    // Radial-Gradienten
    simNodes.forEach(node => {
      const g = defs.append("radialGradient")
        .attr("id", node.gradientId)
        .attr("cx", "35%").attr("cy", "30%").attr("r", "72%");
      if (node.isAccent) {
        g.append("stop").attr("offset", "0%")
          .attr("stop-color", isDark ? "#F0FFD0" : "#EEFF99").attr("stop-opacity", "0.95");
        g.append("stop").attr("offset", "45%")
          .attr("stop-color", LIME).attr("stop-opacity", "0.85");
        g.append("stop").attr("offset", "100%")
          .attr("stop-color", node.categoryColor).attr("stop-opacity", isDark ? "0.65" : "0.50");
      } else {
        g.append("stop").attr("offset", "0%")
          .attr("stop-color", "#FFFFFF").attr("stop-opacity", isDark ? "0.28" : "0.60");
        g.append("stop").attr("offset", "40%")
          .attr("stop-color", node.categoryColor + "EE").attr("stop-opacity", "0.90");
        g.append("stop").attr("offset", "100%")
          .attr("stop-color", node.categoryColor).attr("stop-opacity", isDark ? "0.55" : "0.70");
      }
    });

    // Hintergrund-Raster
    const gridSize = 40;
    for (let x = 0; x < W; x += gridSize) {
      svgEl.append("line").attr("x1", x).attr("y1", 0).attr("x2", x).attr("y2", H)
        .attr("stroke", gridColor).attr("stroke-width", 0.5);
    }
    for (let y = 0; y < H; y += gridSize) {
      svgEl.append("line").attr("x1", 0).attr("y1", y).attr("x2", W).attr("y2", y)
        .attr("stroke", gridColor).attr("stroke-width", 0.5);
    }

    // Force Simulation – bewusst kurz und ruhig:
    // alphaDecay 0.12  → friert nach ~30 Ticks ein (statt 300)
    // velocityDecay 0.8 → starke Dämpfung, kein Schwingen
    // alphaMin 0.05    → Simulation stoppt früh
    const simulation = d3.forceSimulation<SimNode>(simNodes)
      .alphaDecay(0.12)
      .velocityDecay(0.80)
      .alphaMin(0.05)
      .force("center", d3.forceCenter(W / 2, H / 2).strength(0.04))
      .force("collision", d3.forceCollide<SimNode>().radius(d => d.radius + 5).strength(0.85).iterations(2))
      .force("x", d3.forceX(W / 2).strength(0.018))
      .force("y", d3.forceY(H / 2).strength(0.025));

    simRef.current = simulation;

    // Bubble-Gruppen – KEINE D3-Event-Handler hier, nur Struktur
    // Hover-Events werden nach dem Einfrieren via native addEventListener registriert
    const groups = svgEl.append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(simNodes)
      .enter()
      .append("g")
      .style("cursor", "pointer");

    // Äußerer Glow-Ring für Accent-Nodes
    groups.filter(d => d.isAccent)
      .append("circle")
      .attr("r", d => d.radius + 8)
      .attr("fill", "none")
      .attr("stroke", LIME)
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", isDark ? 0.30 : 0.45)
      .attr("stroke-dasharray", "4 3");

    // Haupt-Kreis
    groups.append("circle")
      .attr("class", "main")
      .attr("r", d => d.radius)
      .attr("fill", d => `url(#${d.gradientId})`)
      .attr("stroke", d => d.isAccent ? LIME_DARK : (isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)"))
      .attr("stroke-width", d => d.isAccent ? 2 : 1)
      .attr("stroke-opacity", d => d.isAccent ? 0.8 : 0.35)
      .attr("filter", d => d.isAccent ? "url(#gbg-glow)" : "none");

    // Kategorie-Farbpunkt
    groups.filter(d => !!d.category && d.radius > 36)
      .append("circle")
      .attr("cx", d => -d.radius * 0.38)
      .attr("cy", d => -d.radius * 0.38)
      .attr("r", 4)
      .attr("fill", d => d.isAccent ? LIME : d.categoryColor)
      .attr("opacity", isDark ? 0.7 : 0.6);

    // Score-Text
    groups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.15em")
      .attr("fill", d => d.isAccent ? (isDark ? "#0A0A0A" : "#1A3A00") : labelFill)
      .attr("font-size", d => Math.max(10, d.radius * 0.28))
      .attr("font-family", '"DM Mono", "DM Sans", system-ui, sans-serif')
      .attr("font-weight", "700")
      .attr("letter-spacing", "-0.02em")
      .attr("pointer-events", "none")
      .text(d => (d.maxValue ? `${d.value}/${d.maxValue}` : `${d.value}`));

    // Label unterhalb
    groups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", d => d.radius + 16)
      .attr("fill", labelSubFill)
      .attr("font-size", d => Math.max(9, Math.min(11, d.radius * 0.20)))
      .attr("font-family", '"DM Sans", system-ui, sans-serif')
      .attr("font-weight", "500")
      .attr("letter-spacing", "0.01em")
      .attr("pointer-events", "none")
      .each(function(d) {
        const el = d3.select(this);
        const words = d.label.split(" ");
        if (d.label.length > 14 && words.length > 1) {
          const mid = Math.ceil(words.length / 2);
          el.text(words.slice(0, mid).join(" "));
          el.append("tspan").attr("x", 0).attr("dy", "1.25em").text(words.slice(mid).join(" "));
        } else {
          el.text(d.label);
        }
      });

    // Tick
    simulation.on("tick", () => {
      groups.attr("transform", d => {
        const pad = d.radius + 22;
        d.x = Math.max(pad, Math.min(W - pad, d.x ?? W / 2));
        d.y = Math.max(pad, Math.min(H - pad - 20, d.y ?? H / 2));
        return `translate(${d.x},${d.y})`;
      });
    });

    // Nach Ende: Simulation vollständig stoppen + zerstören,
    // dann native Event-Handler registrieren (kein D3-Kontext mehr aktiv)
    const freezeAndBind = () => {
      // 1. Alle Positionen fixieren
      simNodes.forEach(d => { d.fx = d.x; d.fy = d.y; });
      // 2. Simulation stoppen und aus Ref entfernen
      simulation.stop();
      simulation.on("tick", null).on("end", null);
      simRef.current = null;

      // 3. Native Hover-Handler auf jedes <g>-Element setzen
      groups.each(function(d) {
        const el = this as SVGGElement;
        const mainCircle = el.querySelector("circle.main") as SVGCircleElement | null;

        el.addEventListener("mouseenter", () => {
          if (mainCircle) {
            mainCircle.setAttribute("stroke-opacity", "0.9");
            mainCircle.setAttribute("stroke-width", d.isAccent ? "2.5" : "1.5");
          }
          el.style.opacity = "1";
          // Tooltip
          const rawX = d.x ?? W / 2;
          const rawY = d.y ?? H / 2;
          const tooltipW = 200;
          const offsetX = rawX + d.radius + 14 + tooltipW > W
            ? -(d.radius + 14 + tooltipW)
            : d.radius + 14;
          setTooltip({ visible: true, x: rawX + offsetX, y: rawY, node: d, categoryColor: d.categoryColor, isAccent: d.isAccent });
        });

        el.addEventListener("mouseleave", () => {
          if (mainCircle) {
            mainCircle.setAttribute("stroke-opacity", d.isAccent ? "0.8" : "0.35");
            mainCircle.setAttribute("stroke-width", d.isAccent ? "2" : "1");
          }
          el.style.opacity = "";
          setTooltip(prev => ({ ...prev, visible: false }));
        });

        el.addEventListener("click", () => {
          setSelectedNode(prev => (prev?.id === d.id ? null : d));
          onNodeClick?.(d);
        });
      });
    };

    simulation.on("end", freezeAndBind);

    // Sicherheitsnetz: nach 1.5s auf jeden Fall einfrieren
    const hardStop = setTimeout(freezeAndBind, 1500);
    simulation.on("end.cleanup", () => clearTimeout(hardStop));
  }, [
    filteredNodes, containerWidth, height, accentThreshold, allCategories,
    isDark, gridColor, labelFill, labelSubFill, onNodeClick,
  ]);

  useEffect(() => {
    drawBubbles();
    return () => { simRef.current?.stop(); };
  }, [drawBubbles]);

  // Stats
  const stark   = filteredNodes.filter(n => n.value >= accentThreshold).length;
  const moderat = filteredNodes.filter(n => n.value >= accentThreshold * 0.6 && n.value < accentThreshold).length;
  const schwach = filteredNodes.filter(n => n.value < accentThreshold * 0.6).length;
  const avg = filteredNodes.length > 0
    ? Math.round(filteredNodes.reduce((s, n) => s + n.value, 0) / filteredNodes.length)
    : 0;

  // Score-Balken-Breite für Tooltip
  const tooltipPct = tooltip.node
    ? Math.round((tooltip.node.value / (tooltip.node.maxValue ?? tooltip.node.value)) * 100)
    : 0;

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
        <svg ref={svgRef} className="w-full" style={{ height, display: "block" }} />

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
            {/* Pfeil-Connector */}
            <div
              style={{
                position: "absolute",
                left: tooltip.x > containerWidth / 2 ? "auto" : -6,
                right: tooltip.x > containerWidth / 2 ? -6 : "auto",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                ...(tooltip.x > containerWidth / 2
                  ? { borderLeft: `6px solid ${ttBorder}` }
                  : { borderRight: `6px solid ${ttBorder}` }),
              }}
            />
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
                {/* Fortschrittsbalken */}
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
                  lineHeight: 1.5,
                  margin: 0,
                  borderTop: `1px solid ${ttBorder}`,
                  paddingTop: 7,
                }}>
                  {tooltip.node.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stats-Leiste */}
      {showStats && (
        <div
          className="flex items-center gap-5 py-2.5 px-5 text-[11px] font-mono"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <span style={{ color: statsMuted }}>
            <span style={{ color: statsStrong, fontWeight: 700 }}>{filteredNodes.length}</span>
            {" "}Einträge · Ø{" "}
            <span style={{ color: statsStrong, fontWeight: 700 }}>{avg}</span>
          </span>
          <div className="flex items-center gap-1.5" style={{ color: isDark ? "#6DDBA0" : "#1A7A50" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6DDBA0", display: "inline-block" }} />
            <span style={{ fontWeight: 600 }}>{stark} stark</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: isDark ? "#F5C87A" : "#8A5A00" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F5C87A", display: "inline-block" }} />
            <span style={{ fontWeight: 600 }}>{moderat} moderat</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: statsMuted }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.20)", display: "inline-block" }} />
            <span>{schwach} schwach</span>
          </div>
        </div>
      )}

      {/* Selected Node Detail (Klick) */}
      {selectedNode && (
        <div
          className="px-5 py-3 flex items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${borderColor}`, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center gap-3">
            {selectedNode.category && (
              <span style={{
                width: 10, height: 10, borderRadius: "50%",
                background: getCategoryColor(selectedNode.category, allCategories),
                display: "inline-block", flexShrink: 0,
              }} />
            )}
            <div>
              <span className="font-semibold text-sm" style={{ color: isDark ? "#FFFFFF" : "#0A0A0A" }}>
                {selectedNode.label}
              </span>
              {selectedNode.category && (
                <span className="ml-2 text-[11px] font-mono" style={{ color: statsMuted }}>
                  {selectedNode.category}
                </span>
              )}
              {selectedNode.description && (
                <p className="text-[11px] mt-0.5" style={{ color: statsMuted }}>{selectedNode.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="font-bold font-mono text-sm" style={{ color: isDark ? LIME : "#2A6A00" }}>
              {selectedNode.value}{selectedNode.maxValue ? `/${selectedNode.maxValue}` : ""}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-mono transition-opacity opacity-35 hover:opacity-65"
              style={{ color: isDark ? "#FFFFFF" : "#0A0A0A" }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrainBubbleMap;
