/**
 * GrainBubbleMap – Force-Layout Bubble Visualisierung
 * Design: Grain OS · Pastell-Radial-Gradienten · Dark Background
 * Größe = Score/Wert · Farbe = Kategorie aus GRAIN_PASTEL
 * Interaktion: Hover-Glow, Klick-Select, Filter-Tags
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";

/* ── Grain Pastell-Palette ── */
const GRAIN_PASTEL = [
  ["#F4A0B5", "#D98AE8"],   // Rose → Orchid
  ["#F5C87A", "#F0956A"],   // Peach → Orange
  ["#6DDBA0", "#5ECECE"],   // Mint → Aqua
  ["#D98AE8", "#7AB8F5"],   // Orchid → Sky
  ["#7AB8F5", "#6DDBA0"],   // Sky → Mint
  ["#E8C840", "#F5C87A"],   // Butter → Peach
  ["#F0956A", "#F4A0B5"],   // Orange → Rose
  ["#5ECECE", "#E8C840"],   // Aqua → Butter
];

const LIME = "#E4FF97";

/* ── Typen ── */
export interface BubbleNode {
  id: string;
  label: string;
  value: number;       // Größe der Bubble (z.B. Score 0–200)
  maxValue?: number;   // Für Label "value/maxValue"
  category?: string;
  description?: string;
}

export interface GrainBubbleMapProps {
  nodes: BubbleNode[];
  categories?: string[];
  width?: number;
  height?: number;
  className?: string;
  onNodeClick?: (node: BubbleNode) => void;
  showStats?: boolean;
  title?: string;
  subtitle?: string;
  accentThreshold?: number; // Nodes über diesem Wert bekommen Lime-Akzent
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

/* ── Hilfsfunktionen ── */
const getCategoryIndex = (category: string | undefined, categories: string[]): number => {
  if (!category) return 0;
  const idx = categories.indexOf(category);
  return idx >= 0 ? idx : Math.abs(category.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % GRAIN_PASTEL.length;
};

/* ── Statistik-Leiste ── */
const StatsBar: React.FC<{ nodes: BubbleNode[]; accentThreshold: number }> = ({ nodes, accentThreshold }) => {
  const total = nodes.length;
  const totalScore = nodes.reduce((s, n) => s + n.value, 0);
  const stark = nodes.filter(n => n.value >= accentThreshold).length;
  const moderat = nodes.filter(n => n.value >= accentThreshold * 0.6 && n.value < accentThreshold).length;
  const schwach = nodes.filter(n => n.value < accentThreshold * 0.6).length;

  return (
    <div className="flex items-center justify-center gap-6 py-3 px-6 border-t border-white/10 text-xs font-mono">
      <span className="text-white/50">{total} Einträge</span>
      <span className="text-white/50">Ø Score: <span className="text-white font-bold">{Math.round(totalScore / total)}</span></span>
      <span className="text-[#6DDBA0] font-semibold">{stark} stark</span>
      <span className="text-[#F5C87A] font-semibold">{moderat} moderat</span>
      <span className="text-white/40">{schwach} schwach</span>
    </div>
  );
};

/* ── Haupt-Komponente ── */
export const GrainBubbleMap: React.FC<GrainBubbleMapProps> = ({
  nodes,
  categories = [],
  width,
  height = 520,
  className,
  onNodeClick,
  showStats = true,
  title,
  subtitle,
  accentThreshold = 140,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Alle");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<BubbleNode | null>(null);
  const [containerWidth, setContainerWidth] = useState(width || 800);

  // Responsive width
  useEffect(() => {
    if (width) return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width;
      if (w) setContainerWidth(w);
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [width]);

  const allCategories = categories.length > 0
    ? categories
    : Array.from(new Set(nodes.map(n => n.category).filter(Boolean))) as string[];

  const filteredNodes = activeFilter === "Alle"
    ? nodes
    : nodes.filter(n => n.category === activeFilter);

  const drawBubbles = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const W = containerWidth;
    const H = height;

    d3.select(svg).selectAll("*").remove();

    const maxVal = d3.max(filteredNodes, d => d.value) || 200;
    const minVal = d3.min(filteredNodes, d => d.value) || 0;
    const radiusScale = d3.scaleSqrt()
      .domain([minVal, maxVal])
      .range([W < 500 ? 28 : 38, W < 500 ? 72 : 100]);

    const simNodes: SimNode[] = filteredNodes.map((n, i) => {
      const catIdx = getCategoryIndex(n.category, allCategories);
      const colorPair = GRAIN_PASTEL[catIdx % GRAIN_PASTEL.length] as [string, string];
      const isAccent = n.value >= accentThreshold;
      return {
        ...n,
        radius: radiusScale(n.value),
        gradientId: `grain-bubble-grad-${n.id.replace(/\s/g, "-")}`,
        colorPair: isAccent ? [LIME, colorPair[0]] : colorPair,
        isAccent,
        x: W / 2 + (Math.random() - 0.5) * 100,
        y: H / 2 + (Math.random() - 0.5) * 100,
      };
    });

    // SVG setup
    const svgEl = d3.select(svg)
      .attr("width", W)
      .attr("height", H)
      .attr("viewBox", `0 0 ${W} ${H}`);

    // Defs: Radial Gradienten + Glow-Filter
    const defs = svgEl.append("defs");

    // Glow filter
    const glow = defs.append("filter").attr("id", "grain-bubble-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    glow.append("feGaussianBlur").attr("stdDeviation", "8").attr("result", "coloredBlur");
    const feMerge = glow.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Hover glow filter
    const hoverGlow = defs.append("filter").attr("id", "grain-bubble-hover-glow").attr("x", "-60%").attr("y", "-60%").attr("width", "220%").attr("height", "220%");
    hoverGlow.append("feGaussianBlur").attr("stdDeviation", "14").attr("result", "coloredBlur");
    const feMerge2 = hoverGlow.append("feMerge");
    feMerge2.append("feMergeNode").attr("in", "coloredBlur");
    feMerge2.append("feMergeNode").attr("in", "SourceGraphic");

    simNodes.forEach(node => {
      const grad = defs.append("radialGradient")
        .attr("id", node.gradientId)
        .attr("cx", "35%").attr("cy", "35%")
        .attr("r", "65%");
      grad.append("stop").attr("offset", "0%").attr("stop-color", node.colorPair[0]).attr("stop-opacity", "0.95");
      grad.append("stop").attr("offset", "55%").attr("stop-color", node.colorPair[1]).attr("stop-opacity", "0.7");
      grad.append("stop").attr("offset", "100%").attr("stop-color", "#0A0A0A").attr("stop-opacity", "0.85");
    });

    // Force simulation
    const simulation = d3.forceSimulation<SimNode>(simNodes)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collision", d3.forceCollide<SimNode>().radius(d => d.radius + 6).strength(0.85))
      .force("x", d3.forceX(W / 2).strength(0.04))
      .force("y", d3.forceY(H / 2).strength(0.06));

    // Bubble groups
    const bubbleGroup = svgEl.append("g").attr("class", "bubbles");

    const groups = bubbleGroup.selectAll<SVGGElement, SimNode>("g.bubble")
      .data(simNodes)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .style("cursor", "pointer")
      .on("mouseenter", function(_, d) {
        setHoveredId(d.id);
        d3.select(this).select("circle.main")
          .transition().duration(200)
          .attr("r", d.radius * 1.08)
          .attr("filter", "url(#grain-bubble-hover-glow)");
      })
      .on("mouseleave", function(_, d) {
        setHoveredId(null);
        d3.select(this).select("circle.main")
          .transition().duration(200)
          .attr("r", d.radius)
          .attr("filter", d.isAccent ? "url(#grain-bubble-glow)" : "none");
      })
      .on("click", (_, d) => {
        setSelectedNode(d);
        onNodeClick?.(d);
      });

    // Halo (glow ring für Accent-Nodes)
    groups.filter(d => d.isAccent)
      .append("circle")
      .attr("r", d => d.radius + 8)
      .attr("fill", "none")
      .attr("stroke", LIME)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.3);

    // Haupt-Kreis
    groups.append("circle")
      .attr("class", "main")
      .attr("r", d => d.radius)
      .attr("fill", d => `url(#${d.gradientId})`)
      .attr("stroke", d => d.isAccent ? LIME : "rgba(255,255,255,0.12)")
      .attr("stroke-width", d => d.isAccent ? 1.5 : 0.8)
      .attr("filter", d => d.isAccent ? "url(#grain-bubble-glow)" : "none");

    // Score-Label innerhalb der Bubble
    groups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", d => d.isAccent ? "#0A0A0A" : "rgba(255,255,255,0.9)")
      .attr("font-size", d => Math.max(10, d.radius * 0.28))
      .attr("font-family", '"DM Sans", system-ui, sans-serif')
      .attr("font-weight", "600")
      .attr("pointer-events", "none")
      .text(d => d.maxValue ? `${d.value}/${d.maxValue}` : `${d.value}`);

    // Label unterhalb der Bubble
    groups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", d => d.radius + 18)
      .attr("fill", "rgba(255,255,255,0.85)")
      .attr("font-size", d => Math.max(9, Math.min(13, d.radius * 0.22)))
      .attr("font-family", '"DM Sans", system-ui, sans-serif')
      .attr("font-weight", "500")
      .attr("pointer-events", "none")
      .each(function(d) {
        const el = d3.select(this);
        const words = d.label.split(" ");
        const maxWidth = d.radius * 2.2;
        // Einfacher Zeilenumbruch bei langen Labels
        if (d.label.length > 18 && words.length > 1) {
          const mid = Math.ceil(words.length / 2);
          el.text(words.slice(0, mid).join(" "));
          el.append("tspan")
            .attr("x", 0).attr("dy", "1.2em")
            .text(words.slice(mid).join(" "));
        } else {
          el.text(d.label);
        }
      });

    // Simulation tick
    simulation.on("tick", () => {
      groups.attr("transform", d => {
        const r = d.radius + 16;
        d.x = Math.max(r, Math.min(W - r, d.x ?? W / 2));
        d.y = Math.max(r, Math.min(H - r - 30, d.y ?? H / 2));
        return `translate(${d.x},${d.y})`;
      });
    });

    // Nach 300 Ticks stoppen
    simulation.alphaDecay(0.02);
    setTimeout(() => simulation.stop(), 4000);

    return () => simulation.stop();
  }, [filteredNodes, containerWidth, height, accentThreshold, allCategories, onNodeClick]);

  useEffect(() => {
    drawBubbles();
  }, [drawBubbles]);

  return (
    <div className={cn("flex flex-col rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10", className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-6 pt-5 pb-3 border-b border-white/10">
          {title && <h3 className="font-display font-bold text-lg text-white">{title}</h3>}
          {subtitle && <p className="text-xs text-white/50 font-mono mt-0.5">{subtitle}</p>}
        </div>
      )}

      {/* Filter-Tags */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-white/8">
          {["Alle", ...allCategories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-mono font-medium transition-all duration-200 border",
                activeFilter === cat
                  ? "bg-[#E4FF97] text-[#0A0A0A] border-[#E4FF97]"
                  : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* SVG Canvas */}
      <div ref={containerRef} className="relative flex-1">
        <svg ref={svgRef} className="w-full" style={{ height }} />

        {/* Tooltip bei Hover */}
        {hoveredId && (() => {
          const node = filteredNodes.find(n => n.id === hoveredId);
          if (!node?.description) return null;
          return (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-xs text-white/80 font-mono pointer-events-none max-w-xs text-center">
              {node.description}
            </div>
          );
        })()}
      </div>

      {/* Stats-Leiste */}
      {showStats && <StatsBar nodes={filteredNodes} accentThreshold={accentThreshold} />}

      {/* Selected Node Detail */}
      {selectedNode && (
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <span className="text-white/90 font-semibold text-sm font-mono">{selectedNode.label}</span>
            {selectedNode.category && (
              <span className="ml-2 text-white/40 text-xs">{selectedNode.category}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#E4FF97] font-bold font-mono text-sm">
              {selectedNode.value}{selectedNode.maxValue ? `/${selectedNode.maxValue}` : ""}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-white/30 hover:text-white/60 text-xs font-mono transition-colors"
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
