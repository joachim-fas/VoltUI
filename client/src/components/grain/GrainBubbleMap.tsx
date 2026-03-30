/**
 * GrainBubbleMap – Force-Layout Bubble Visualisierung
 * Design: Grain OS · Pastell-Radial-Gradienten
 * theme="dark"  → schwarzer Hintergrund (Standard)
 * theme="light" → weißer Hintergrund
 * Simulation: ruhig, hoher alphaDecay, hohe Dämpfung, kein Nachzittern
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";

/* ── Grain Pastell-Palette ── */
const GRAIN_PASTEL: Array<[string, string]> = [
  ["#F4A0B5", "#D98AE8"],
  ["#F5C87A", "#F0956A"],
  ["#6DDBA0", "#5ECECE"],
  ["#D98AE8", "#7AB8F5"],
  ["#7AB8F5", "#6DDBA0"],
  ["#E8C840", "#F5C87A"],
  ["#F0956A", "#F4A0B5"],
  ["#5ECECE", "#E8C840"],
];

const LIME = "#E4FF97";

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
  /** "dark" = schwarzer Hintergrund (Standard), "light" = weißer Hintergrund */
  theme?: "dark" | "light";
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
  colorPair: [string, string];
  isAccent: boolean;
}

const getCategoryIndex = (category: string | undefined, categories: string[]): number => {
  if (!category) return 0;
  const idx = categories.indexOf(category);
  return idx >= 0
    ? idx
    : Math.abs(category.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % GRAIN_PASTEL.length;
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
  theme = "dark",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<d3.Simulation<SimNode, undefined> | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Alle");
  const [selectedNode, setSelectedNode] = useState<BubbleNode | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  const isDark = theme === "dark";

  // Theme-Tokens
  const bg          = isDark ? "#0A0A0A" : "#FFFFFF";
  const borderColor = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const labelFill   = isDark ? "rgba(255,255,255,0.82)" : "rgba(10,10,10,0.80)";
  const statsMuted  = isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.40)";
  const statsStrong = isDark ? "#FFFFFF" : "#0A0A0A";
  const filterInactiveFg = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.50)";
  const filterInactiveBd = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)";
  const gradientEndColor = isDark ? "#0A0A0A" : "#FFFFFF";
  const gradientEndOpacity = isDark ? "0.82" : "0.35";
  const bubbleStroke = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";

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

    // Laufende Simulation sauber stoppen
    if (simRef.current) {
      simRef.current.stop();
      simRef.current = null;
    }

    const W = containerWidth;
    const H = height;

    d3.select(svg).selectAll("*").remove();

    const maxVal = d3.max(filteredNodes, d => d.value) ?? 200;
    const minVal = d3.min(filteredNodes, d => d.value) ?? 0;
    const rMin = W < 500 ? 24 : 32;
    const rMax = W < 500 ? 62 : 88;
    const radiusScale = d3.scaleSqrt().domain([minVal, maxVal]).range([rMin, rMax]);

    const simNodes: SimNode[] = filteredNodes.map(n => {
      const catIdx = getCategoryIndex(n.category, allCategories);
      const pair = GRAIN_PASTEL[catIdx % GRAIN_PASTEL.length];
      const isAccent = n.value >= accentThreshold;
      return {
        ...n,
        radius: radiusScale(n.value),
        gradientId: `gbg-${n.id.replace(/[^a-z0-9]/gi, "-")}`,
        colorPair: isAccent ? [LIME, pair[0]] : pair,
        isAccent,
        // Startpositionen leicht gestreut – verhindert initiale Überlappungs-Explosion
        x: W / 2 + (Math.random() - 0.5) * W * 0.25,
        y: H / 2 + (Math.random() - 0.5) * H * 0.25,
      };
    });

    const svgEl = d3.select(svg).attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
    const defs = svgEl.append("defs");

    // Dezenter Glow nur für Accent-Nodes
    const glow = defs.append("filter")
      .attr("id", "gbg-glow")
      .attr("x", "-35%").attr("y", "-35%")
      .attr("width", "170%").attr("height", "170%");
    glow.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "blur");
    const fm = glow.append("feMerge");
    fm.append("feMergeNode").attr("in", "blur");
    fm.append("feMergeNode").attr("in", "SourceGraphic");

    // Radial-Gradienten
    simNodes.forEach(node => {
      const g = defs.append("radialGradient")
        .attr("id", node.gradientId)
        .attr("cx", "38%").attr("cy", "32%").attr("r", "68%");
      g.append("stop").attr("offset", "0%")
        .attr("stop-color", node.colorPair[0]).attr("stop-opacity", "1");
      g.append("stop").attr("offset", "58%")
        .attr("stop-color", node.colorPair[1]).attr("stop-opacity", "0.78");
      g.append("stop").attr("offset", "100%")
        .attr("stop-color", gradientEndColor).attr("stop-opacity", gradientEndOpacity);
    });

    // ── D3 Force Simulation ──
    // alphaDecay 0.055  → friert nach ~60 Ticks ein (statt 300)
    // velocityDecay 0.6 → starke Dämpfung, kein Schwingen
    // Keine repulsive charge-Kraft → keine nervösen Abstoßungen
    const simulation = d3.forceSimulation<SimNode>(simNodes)
      .alphaDecay(0.055)
      .velocityDecay(0.60)
      .force("center", d3.forceCenter(W / 2, H / 2).strength(0.06))
      .force(
        "collision",
        d3.forceCollide<SimNode>()
          .radius(d => d.radius + 4)
          .strength(0.9)
          .iterations(4),
      )
      .force("x", d3.forceX(W / 2).strength(0.025))
      .force("y", d3.forceY(H / 2).strength(0.035));

    simRef.current = simulation;

    // Bubble-Gruppen
    const groups = svgEl.append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(simNodes)
      .enter()
      .append("g")
      .style("cursor", "pointer")
      .on("mouseenter", function(_, d) {
        d3.select(this).select("circle.main")
          .transition().duration(160).ease(d3.easeQuadOut)
          .attr("r", d.radius * 1.055);
      })
      .on("mouseleave", function(_, d) {
        d3.select(this).select("circle.main")
          .transition().duration(160).ease(d3.easeQuadOut)
          .attr("r", d.radius);
      })
      .on("click", (_, d) => {
        setSelectedNode(prev => (prev?.id === d.id ? null : d));
        onNodeClick?.(d);
      });

    // Halo-Ring für Accent-Nodes
    groups
      .filter(d => d.isAccent)
      .append("circle")
      .attr("r", d => d.radius + 6)
      .attr("fill", "none")
      .attr("stroke", LIME)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", isDark ? 0.38 : 0.55);

    // Haupt-Kreis
    groups
      .append("circle")
      .attr("class", "main")
      .attr("r", d => d.radius)
      .attr("fill", d => `url(#${d.gradientId})`)
      .attr("stroke", d => (d.isAccent ? LIME : bubbleStroke))
      .attr("stroke-width", d => (d.isAccent ? 1.5 : 0.8))
      .attr("filter", d => (d.isAccent ? "url(#gbg-glow)" : "none"));

    // Score-Text (innerhalb Bubble)
    groups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", d => (d.isAccent ? "#0A0A0A" : labelFill))
      .attr("font-size", d => Math.max(10, d.radius * 0.27))
      .attr("font-family", '"DM Sans", system-ui, sans-serif')
      .attr("font-weight", "600")
      .attr("pointer-events", "none")
      .text(d => (d.maxValue ? `${d.value}/${d.maxValue}` : `${d.value}`));

    // Label unterhalb der Bubble
    groups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", d => d.radius + 15)
      .attr("fill", labelFill)
      .attr("font-size", d => Math.max(9, Math.min(12, d.radius * 0.21)))
      .attr("font-family", '"DM Sans", system-ui, sans-serif')
      .attr("font-weight", "500")
      .attr("pointer-events", "none")
      .each(function(d) {
        const el = d3.select(this);
        const words = d.label.split(" ");
        if (d.label.length > 16 && words.length > 1) {
          const mid = Math.ceil(words.length / 2);
          el.text(words.slice(0, mid).join(" "));
          el.append("tspan")
            .attr("x", 0)
            .attr("dy", "1.2em")
            .text(words.slice(mid).join(" "));
        } else {
          el.text(d.label);
        }
      });

    // Tick: Positionen + Bounds
    simulation.on("tick", () => {
      groups.attr("transform", d => {
        const pad = d.radius + 20;
        d.x = Math.max(pad, Math.min(W - pad, d.x ?? W / 2));
        d.y = Math.max(pad, Math.min(H - pad - 24, d.y ?? H / 2));
        return `translate(${d.x},${d.y})`;
      });
    });

    // Nach Ende: Positionen einfrieren → kein weiteres Zittern
    simulation.on("end", () => {
      groups.each(function(d) {
        d.fx = d.x;
        d.fy = d.y;
      });
    });
  }, [
    filteredNodes,
    containerWidth,
    height,
    accentThreshold,
    allCategories,
    isDark,
    gradientEndColor,
    gradientEndOpacity,
    labelFill,
    bubbleStroke,
    onNodeClick,
  ]);

  useEffect(() => {
    drawBubbles();
    return () => {
      simRef.current?.stop();
    };
  }, [drawBubbles]);

  // Stats
  const stark   = filteredNodes.filter(n => n.value >= accentThreshold).length;
  const moderat = filteredNodes.filter(n => n.value >= accentThreshold * 0.6 && n.value < accentThreshold).length;
  const schwach = filteredNodes.filter(n => n.value < accentThreshold * 0.6).length;
  const avg =
    filteredNodes.length > 0
      ? Math.round(filteredNodes.reduce((s, n) => s + n.value, 0) / filteredNodes.length)
      : 0;

  return (
    <div
      className={cn("flex flex-col rounded-2xl overflow-hidden", className)}
      style={{ background: bg, border: `1px solid ${borderColor}` }}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-6 pt-5 pb-3" style={{ borderBottom: `1px solid ${borderColor}` }}>
          {title && (
            <h3
              className="font-display font-bold text-lg"
              style={{ color: isDark ? "#FFFFFF" : "#0A0A0A" }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs font-mono mt-0.5" style={{ color: statsMuted }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filter-Tags */}
      {allCategories.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-2 px-5 py-3"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          {["Alle", ...allCategories].map(cat => {
            const active = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium transition-all duration-150"
                style={{
                  background: active ? LIME : "transparent",
                  color: active ? "#0A0A0A" : filterInactiveFg,
                  border: `1px solid ${active ? LIME : filterInactiveBd}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* SVG Canvas */}
      <div ref={containerRef} className="relative flex-1 w-full">
        <svg ref={svgRef} className="w-full" style={{ height, display: "block" }} />
      </div>

      {/* Stats-Leiste */}
      {showStats && (
        <div
          className="flex items-center justify-center gap-6 py-3 px-6 text-xs font-mono"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <span style={{ color: statsMuted }}>
            {filteredNodes.length} Einträge · Ø{" "}
            <span style={{ color: statsStrong, fontWeight: 700 }}>{avg}</span>
          </span>
          <span style={{ color: "#6DDBA0", fontWeight: 600 }}>{stark} stark</span>
          <span style={{ color: "#F5C87A", fontWeight: 600 }}>{moderat} moderat</span>
          <span style={{ color: statsMuted }}>{schwach} schwach</span>
        </div>
      )}

      {/* Selected Node Detail */}
      {selectedNode && (
        <div
          className="px-5 py-3 flex items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <div>
            <span
              className="font-semibold text-sm font-mono"
              style={{ color: isDark ? "#FFFFFF" : "#0A0A0A" }}
            >
              {selectedNode.label}
            </span>
            {selectedNode.category && (
              <span className="ml-2 text-xs" style={{ color: statsMuted }}>
                {selectedNode.category}
              </span>
            )}
            {selectedNode.description && (
              <p className="text-xs mt-0.5" style={{ color: statsMuted }}>
                {selectedNode.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="font-bold font-mono text-sm"
              style={{ color: isDark ? LIME : "#0A8A50" }}
            >
              {selectedNode.value}
              {selectedNode.maxValue ? `/${selectedNode.maxValue}` : ""}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-mono transition-opacity opacity-40 hover:opacity-70"
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
