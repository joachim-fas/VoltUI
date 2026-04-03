/**
 * NetworkViewSection – Template: Netzwerk-View
 * Zeigt einen interaktiven Kausal-Graph mit farbcodierten Kanten (treibt/ermöglicht/hemmt/korreliert)
 * und dem Intelligence Feed darunter.
 */

import React, { useEffect, useRef, useState } from "react";
import { VoltCard, VoltCardContent } from "@/components/volt/VoltCard";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import { VoltSignalBar, type TrendDirection } from "@/components/volt/VoltTrendCard";

/* ── Kausal-Graph Daten ── */
const NODES = [
  { id: "ai",        label: "Artificial Intelligence &…",      x: 0.48, y: 0.52, r: 22, color: "#C4B5FD" },
  { id: "energy",    label: "Energy Transition & Decarb.",     x: 0.22, y: 0.42, r: 18, color: "#BAE6FD" },
  { id: "mobility",  label: "Autonomous Mobility & EVs",       x: 0.28, y: 0.14, r: 16, color: "#BAE6FD" },
  { id: "future",    label: "Future of Work",                  x: 0.52, y: 0.22, r: 14, color: "#C4B5FD" },
  { id: "cities",    label: "Design & Smart Cities",           x: 0.62, y: 0.14, r: 14, color: "#C4B5FD" },
  { id: "demo",      label: "Demographic Shifts & Aging",      x: 0.76, y: 0.18, r: 16, color: "#BAE6FD" },
  { id: "remote",    label: "Remote & Hybrid Work",            x: 0.44, y: 0.14, r: 13, color: "#C4B5FD" },
  { id: "geo",       label: "Geopolitical Fragmentation",      x: 0.50, y: 0.48, r: 18, color: "#C4B5FD" },
  { id: "cyber",     label: "Cybersecurity & Zero Trust",      x: 0.72, y: 0.46, r: 14, color: "#C4B5FD" },
  { id: "conn",      label: "Connectivity & Digital Networks", x: 0.68, y: 0.56, r: 16, color: "#C4B5FD" },
  { id: "climate",   label: "Climate Change & Sustainab.",     x: 0.30, y: 0.54, r: 16, color: "#BAE6FD" },
  { id: "renew",     label: "Renewable Energy & Green T.",     x: 0.14, y: 0.46, r: 14, color: "#BAE6FD" },
  { id: "conscious", label: "Conscious Consumption & Ea.",     x: 0.16, y: 0.60, r: 13, color: "#BAE6FD" },
  { id: "quantum",   label: "Quantum Computing",               x: 0.68, y: 0.68, r: 14, color: "#C4B5FD" },
  { id: "data",      label: "Data Economy & Data Sovere.",     x: 0.60, y: 0.72, r: 13, color: "#C4B5FD" },
  { id: "web3",      label: "Web3 & Decentralization",         x: 0.74, y: 0.78, r: 12, color: "#C4B5FD" },
  { id: "hmc",       label: "Human–Machine Collaboration",     x: 0.38, y: 0.72, r: 13, color: "#C4B5FD" },
  { id: "circular",  label: "Circular Economy",                x: 0.44, y: 0.80, r: 12, color: "#BAE6FD" },
  { id: "edge",      label: "Edge Computing & IoT",            x: 0.82, y: 0.38, r: 14, color: "#C4B5FD" },
  { id: "health",    label: "Health, Biotech & Longevity",     x: 0.90, y: 0.28, r: 15, color: "#C4B5FD" },
  { id: "genomics",  label: "Genomics & Personalized Medi.",   x: 0.96, y: 0.50, r: 12, color: "#C4B5FD" },
  { id: "eng",       label: "Engineered Evolution",            x: 0.92, y: 0.66, r: 12, color: "#C4B5FD" },
  { id: "trust",     label: "Safety, Trust & Resilience",      x: 0.60, y: 0.44, r: 14, color: "#FBCFE8" },
];

type EdgeType = "treibt" | "ermoeglicht" | "hemmt" | "korreliert";
const EDGE_COLORS: Record<EdgeType, string> = {
  treibt:      "#10B981",
  ermoeglicht: "#3B82F6",
  hemmt:       "#EF4444",
  korreliert:  "#F59E0B",
};

const EDGES: Array<{ from: string; to: string; type: EdgeType; dashed?: boolean }> = [
  { from: "energy",   to: "mobility",  type: "treibt" },
  { from: "energy",   to: "ai",        type: "treibt" },
  { from: "energy",   to: "climate",   type: "ermoeglicht" },
  { from: "mobility", to: "future",    type: "treibt" },
  { from: "future",   to: "cities",    type: "ermoeglicht" },
  { from: "future",   to: "remote",    type: "ermoeglicht" },
  { from: "ai",       to: "future",    type: "treibt" },
  { from: "ai",       to: "geo",       type: "treibt" },
  { from: "ai",       to: "hmc",       type: "treibt" },
  { from: "ai",       to: "quantum",   type: "ermoeglicht" },
  { from: "geo",      to: "trust",     type: "hemmt", dashed: true },
  { from: "geo",      to: "conn",      type: "treibt" },
  { from: "conn",     to: "cyber",     type: "treibt" },
  { from: "conn",     to: "edge",      type: "ermoeglicht" },
  { from: "climate",  to: "renew",     type: "treibt" },
  { from: "climate",  to: "conscious", type: "treibt" },
  { from: "climate",  to: "circular",  type: "treibt" },
  { from: "quantum",  to: "data",      type: "ermoeglicht" },
  { from: "data",     to: "web3",      type: "korreliert" },
  { from: "edge",     to: "health",    type: "ermoeglicht" },
  { from: "health",   to: "genomics",  type: "treibt" },
  { from: "health",   to: "eng",       type: "ermoeglicht" },
  { from: "demo",     to: "health",    type: "treibt" },
];

const FEED_ITEMS = [
  { title: "Mega-Trend",                    subtitle: "8 steigende Trends",   direction: "stable" as TrendDirection, bg: "bg-[#FEF9C3]" },
  { title: "Makro-Trend",                   subtitle: "11 steigende Trends",  direction: "stable" as TrendDirection, bg: "bg-[#FEF9C3]" },
  { title: "Health, Biotech & Longevity",   subtitle: "Impact 92% · Conf 67%", direction: "up" as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { title: "Demographic Shifts & Aging",    subtitle: "Impact 90% · Conf 83%", direction: "up" as TrendDirection, status: "adopt", bg: "bg-[#FEF9C3]" },
  { title: "Artificial Intelligence & Auto",subtitle: "98% · 500 signals",    direction: "up" as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { title: "Climate Change & Sustainability",subtitle: "96% · 450 signals",   direction: "up" as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { title: "Generative AI & Foundation Mo", subtitle: "96% · 420 signals",    direction: "up" as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { title: "Technological Disruption",      subtitle: "95% · 400 signals",    direction: "up" as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { title: "AI Agents & Autonomous Systems",subtitle: "92% · 180 signals",    direction: "up" as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
];

function KausalGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 800, h: 380 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const e of entries) {
        setSize({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    if (svgRef.current?.parentElement) obs.observe(svgRef.current.parentElement);
    return () => obs.disconnect();
  }, []);

  const getPos = (node: typeof NODES[0]) => ({
    x: node.x * size.w,
    y: node.y * size.h,
  });

  return (
    <div className="relative w-full h-[380px] bg-[#FAFAFA] border border-border rounded-xl overflow-hidden">
      {/* Legend */}
      <div className="absolute top-3 left-3 flex items-center gap-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border">
        <span className="text-[10px] font-mono text-muted-foreground">Kausal-Graph</span>
        {(Object.entries(EDGE_COLORS) as [EdgeType, string][]).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1">
            <div className="w-4 h-0.5 rounded" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-mono text-muted-foreground">{type}</span>
          </div>
        ))}
      </div>

      <svg ref={svgRef} width="100%" height="100%" className="absolute inset-0">
        <defs>
          {(Object.entries(EDGE_COLORS) as [EdgeType, string][]).map(([type, color]) => (
            <marker
              key={type}
              id={`arrow-${type}`}
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* Edges */}
        {EDGES.map((edge, i) => {
          const from = NODES.find(n => n.id === edge.from);
          const to   = NODES.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const fp = getPos(from);
          const tp = getPos(to);
          const color = EDGE_COLORS[edge.type];
          const isActive = hoveredNode === edge.from || hoveredNode === edge.to;
          return (
            <line
              key={i}
              x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y}
              stroke={color}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={isActive ? 0.9 : 0.4}
              strokeDasharray={edge.dashed ? "4 3" : undefined}
              markerEnd={`url(#arrow-${edge.type})`}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map(node => {
          const pos = getPos(node);
          const isHovered = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={pos.x} cy={pos.y} r={node.r}
                fill={node.color}
                fillOpacity={isHovered ? 0.9 : 0.7}
                stroke={isHovered ? "#0A0A0A" : node.color}
                strokeWidth={isHovered ? 2 : 1}
              />
              {(isHovered || node.r >= 16) && (
                <text
                  x={pos.x} y={pos.y + node.r + 10}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#555"
                  fontFamily="monospace"
                >
                  {node.label.length > 22 ? node.label.slice(0, 22) + "…" : node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function NetworkViewSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="section-label mb-1">26 — TEMPLATES & VISUALISIERUNG</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-2">Netzwerk-View</h2>
        <p className="font-body text-muted-foreground text-base max-w-2xl">
          Interaktiver Kausal-Graph mit farbcodierten Kanten — zeigt Beziehungen zwischen Trends
          (treibt, ermöglicht, hemmt, korreliert). Hover für Fokus-Modus.
        </p>
      </div>

      {/* Graph */}
      <KausalGraph />

      {/* Intelligence Feed */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono font-semibold text-muted-foreground tracking-widest uppercase">
            · Intelligence Feed
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            Hover für Details · Klicken für Analyse · aktualisiert jetzt
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1.5">
          {FEED_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg ${item.bg}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-body font-medium text-xs text-foreground truncate">
                    {item.title}
                  </span>
                  {item.status && (
                    <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-[#10B981] text-white flex-shrink-0">
                      {item.status}
                    </span>
                  )}
                  {item.direction === "up" && (
                    <span className="text-[#10B981] text-[10px] flex-shrink-0">▲</span>
                  )}
                </div>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{item.subtitle}</p>
              </div>
              <VoltSignalBar direction={item.direction} />
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippet */}
      <VoltCard variant="subtle">
        <VoltCardContent>
          <p className="text-xs font-mono text-muted-foreground mb-2">Verwendung</p>
          <VoltCodeBlock code={`// Kausal-Graph mit SVG + ResizeObserver\n// Nodes: { id, label, x, y, r, color }\n// Edges: { from, to, type: "treibt"|"ermoeglicht"|"hemmt"|"korreliert" }`} />
        </VoltCardContent>
      </VoltCard>
    </div>
  );
}
