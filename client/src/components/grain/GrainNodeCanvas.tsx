/**
 * GrainNodeCanvas
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Grain OS · Node-basiertes Canvas-System
 * Zeigt ein statisches Design-Showcase mit verschiedenen Node-Typen,
 * Bezier-Verbindungslinien, Gruppen-Containern und Dotted-Grid-Hintergrund.
 *
 * Node-Typen:
 *   text        – Texteingabe / Prompt-Node
 *   image       – Bild-Node mit Preview
 *   generator   – KI-Generator-Node (Bild/Text)
 *   list        – Listen-Node mit Items
 *   data        – Daten/Tabellen-Node
 *
 * Verbindungen: Bezier-Kurven mit animiertem Dash-Offset (aktiv) oder statisch
 * Gruppen: Farbige Container, die mehrere Nodes zusammenfassen
 */

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

/* ── Typen ── */
export type NodeType = "text" | "image" | "generator" | "list" | "data" | "trigger";

export interface CanvasNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  width?: number;
  label?: string;
  /** Für image-Nodes: URL oder Farbe als Placeholder */
  imageUrl?: string;
  imageColor?: string;
  /** Für text-Nodes: Placeholder-Text */
  placeholder?: string;
  /** Für list-Nodes: Items */
  items?: string[];
  /** Für generator-Nodes: Modell-Label */
  model?: string;
  /** Ob der Node selektiert/aktiv ist */
  selected?: boolean;
  /** Ob der Node ein Accent-Highlight hat */
  accent?: boolean;
}

export interface CanvasEdge {
  id: string;
  from: string;
  to: string;
  /** Verbindungspunkt: "right" | "bottom" | "left" | "top" */
  fromPort?: "right" | "bottom" | "left" | "top";
  toPort?: "right" | "bottom" | "left" | "top";
  /** Ob die Verbindung animiert (aktiv) ist */
  animated?: boolean;
  /** Farbe der Linie */
  color?: string;
}

export interface CanvasGroup {
  id: string;
  label?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface GrainNodeCanvasProps {
  nodes: CanvasNode[];
  edges?: CanvasEdge[];
  groups?: CanvasGroup[];
  /** Canvas-Höhe in px */
  height?: number;
  className?: string;
  /** Ob das Grid angezeigt wird */
  showGrid?: boolean;
  /** Zoom-Faktor (nur visuell, kein interaktiver Zoom) */
  scale?: number;
}

/* ── Konstanten ── */
const NODE_DEFAULTS: Record<NodeType, { width: number; minHeight: number; label: string; icon: string }> = {
  text:      { width: 220, minHeight: 100, label: "Text",      icon: "T" },
  image:     { width: 200, minHeight: 180, label: "Bild",      icon: "⬜" },
  generator: { width: 260, minHeight: 200, label: "Generator", icon: "✦" },
  list:      { width: 220, minHeight: 140, label: "Liste",     icon: "≡" },
  data:      { width: 240, minHeight: 120, label: "Daten",     icon: "⊞" },
  trigger:   { width: 160, minHeight: 60,  label: "Trigger",   icon: "▶" },
};

const NODE_COLORS: Record<NodeType, string> = {
  text:      "#F4A0B5",
  image:     "#7AB8F5",
  generator: "#6DDBA0",
  list:      "#F5C87A",
  data:      "#D98AE8",
  trigger:   "#E4FF97",
};

/* ── Port-Position berechnen ── */
function getPortPos(
  node: CanvasNode,
  port: "right" | "bottom" | "left" | "top" = "right"
): { x: number; y: number } {
  const w = node.width ?? NODE_DEFAULTS[node.type].width;
  const h = NODE_DEFAULTS[node.type].minHeight + 40; // Header + Body
  switch (port) {
    case "right":  return { x: node.x + w,     y: node.y + h / 2 };
    case "left":   return { x: node.x,          y: node.y + h / 2 };
    case "bottom": return { x: node.x + w / 2,  y: node.y + h };
    case "top":    return { x: node.x + w / 2,  y: node.y };
  }
}

/* ── Bezier-Pfad ── */
function bezierPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  fromPort: "right" | "bottom" | "left" | "top" = "right",
  toPort: "right" | "bottom" | "left" | "top" = "left"
): string {
  const dx = Math.abs(to.x - from.x) * 0.5;
  const dy = Math.abs(to.y - from.y) * 0.5;

  let c1x = from.x, c1y = from.y;
  let c2x = to.x,   c2y = to.y;

  if (fromPort === "right")  { c1x = from.x + Math.max(dx, 60); }
  if (fromPort === "left")   { c1x = from.x - Math.max(dx, 60); }
  if (fromPort === "bottom") { c1y = from.y + Math.max(dy, 60); }
  if (fromPort === "top")    { c1y = from.y - Math.max(dy, 60); }

  if (toPort === "left")   { c2x = to.x - Math.max(dx, 60); }
  if (toPort === "right")  { c2x = to.x + Math.max(dx, 60); }
  if (toPort === "top")    { c2y = to.y - Math.max(dy, 60); }
  if (toPort === "bottom") { c2y = to.y + Math.max(dy, 60); }

  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

/* ── Node-Icon ── */
function NodeIcon({ type, isDark }: { type: NodeType; isDark: boolean }) {
  const color = NODE_COLORS[type];
  const icons: Record<NodeType, React.ReactNode> = {
    text: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="2" width="12" height="1.5" rx="0.75" fill={color}/>
        <rect x="1" y="5.5" width="9" height="1.5" rx="0.75" fill={color} opacity="0.7"/>
        <rect x="1" y="9" width="11" height="1.5" rx="0.75" fill={color} opacity="0.5"/>
      </svg>
    ),
    image: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="12" rx="2" stroke={color} strokeWidth="1.5"/>
        <circle cx="4.5" cy="4.5" r="1.5" fill={color} opacity="0.8"/>
        <path d="M1 10 L4 7 L7 9.5 L9.5 7 L13 10" stroke={color} strokeWidth="1.2" fill="none"/>
      </svg>
    ),
    generator: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z" fill={color} opacity="0.9"/>
      </svg>
    ),
    list: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="3" cy="4" r="1.2" fill={color}/>
        <rect x="6" y="3" width="7" height="1.5" rx="0.75" fill={color} opacity="0.7"/>
        <circle cx="3" cy="7.5" r="1.2" fill={color}/>
        <rect x="6" y="6.5" width="5" height="1.5" rx="0.75" fill={color} opacity="0.7"/>
        <circle cx="3" cy="11" r="1.2" fill={color}/>
        <rect x="6" y="10" width="6" height="1.5" rx="0.75" fill={color} opacity="0.7"/>
      </svg>
    ),
    data: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="4" rx="1" fill={color} opacity="0.8"/>
        <rect x="1" y="7" width="12" height="2.5" rx="1" fill={color} opacity="0.4"/>
        <rect x="1" y="11" width="12" height="2" rx="1" fill={color} opacity="0.25"/>
      </svg>
    ),
    trigger: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 2 L11 7 L3 12 Z" fill={color}/>
      </svg>
    ),
  };
  void isDark;
  return <span className="flex items-center justify-center w-5 h-5">{icons[type]}</span>;
}

/* ── Einzel-Node ── */
function CanvasNodeCard({
  node, isDark, nodeMap,
}: {
  node: CanvasNode;
  isDark: boolean;
  nodeMap: Map<string, CanvasNode>;
}) {
  void nodeMap;
  const defaults = NODE_DEFAULTS[node.type];
  const w = node.width ?? defaults.width;
  const accent = node.accent ?? false;
  const selected = node.selected ?? false;
  const typeColor = NODE_COLORS[node.type];

  const bg       = isDark ? "#1A1A1A" : "#FFFFFF";
  const border   = selected
    ? typeColor
    : accent
    ? "#E4FF97"
    : isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const headerBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const labelCol = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";
  const textCol  = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.80)";
  const mutedCol = isDark ? "rgba(255,255,255,0.30)" : "rgba(0,0,0,0.30)";

  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: w,
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: 12,
        boxShadow: selected
          ? `0 0 0 3px ${typeColor}33, 0 4px 24px rgba(0,0,0,0.18)`
          : isDark
          ? "0 2px 16px rgba(0,0,0,0.40)"
          : "0 2px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 10px",
        background: headerBg,
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      }}>
        <NodeIcon type={node.type} isDark={isDark} />
        <span style={{
          fontSize: 11, fontFamily: '"DM Mono", monospace',
          color: labelCol, fontWeight: 500, flex: 1,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {node.label ?? `${defaults.label} #1`}
        </span>
        {/* Port-Indikator rechts */}
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
          border: `1.5px solid ${isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.20)"}`,
          flexShrink: 0,
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: "10px 10px 12px" }}>
        {node.type === "text" && (
          <div style={{
            minHeight: 60,
            fontSize: 12, color: node.placeholder ? mutedCol : textCol,
            fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6,
          }}>
            {node.placeholder ?? "Texteingabe…"}
          </div>
        )}

        {node.type === "image" && (
          <div style={{
            height: 140, borderRadius: 8, overflow: "hidden",
            background: node.imageColor ?? (isDark ? "#2A2A2A" : "#F0F0F0"),
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {node.imageUrl ? (
              <img src={node.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="2" width="28" height="28" rx="4" stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"} strokeWidth="1.5"/>
                <circle cx="10" cy="10" r="3" fill={isDark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.15)"}/>
                <path d="M2 22 L9 15 L15 20 L21 14 L30 22" stroke={isDark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.15)"} strokeWidth="1.5" fill="none"/>
              </svg>
            )}
          </div>
        )}

        {node.type === "generator" && (
          <>
            <div style={{
              height: 110, borderRadius: 8,
              background: node.imageColor ?? (isDark ? "#1E2A1E" : "#F0FAF0"),
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 8,
            }}>
              {node.imageUrl ? (
                <img src={node.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
              ) : (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 2 L16.5 9.5 L24 12 L16.5 14.5 L14 22 L11.5 14.5 L4 12 L11.5 9.5 Z" fill="#6DDBA0" opacity="0.6"/>
                </svg>
              )}
            </div>
            <div style={{
              fontSize: 11, color: mutedCol,
              fontFamily: '"DM Mono", monospace',
              padding: "6px 8px",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
              borderRadius: 6, marginBottom: 6,
            }}>
              {node.placeholder ?? "Beschreibe das Bild…"}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                fontSize: 10, color: mutedCol,
                fontFamily: '"DM Mono", monospace',
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                padding: "2px 6px", borderRadius: 4,
              }}>
                {node.model ?? "Auto"}
              </span>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "#E4FF97",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5 L8 5 M5.5 2.5 L8 5 L5.5 7.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </>
        )}

        {node.type === "list" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(node.items && node.items.length > 0) ? node.items.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 11, color: textCol,
                fontFamily: '"DM Sans", sans-serif',
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: NODE_COLORS.list, flexShrink: 0,
                }} />
                {item}
              </div>
            )) : (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 8, padding: "16px 0",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="5" cy="7" r="2" fill={mutedCol}/>
                  <rect x="9" y="6" width="10" height="2" rx="1" fill={mutedCol}/>
                  <circle cx="5" cy="12" r="2" fill={mutedCol}/>
                  <rect x="9" y="11" width="8" height="2" rx="1" fill={mutedCol}/>
                  <circle cx="5" cy="17" r="2" fill={mutedCol}/>
                  <rect x="9" y="16" width="9" height="2" rx="1" fill={mutedCol}/>
                </svg>
                <span style={{ fontSize: 11, color: mutedCol, fontFamily: '"DM Sans", sans-serif' }}>
                  Keine Einträge
                </span>
              </div>
            )}
          </div>
        )}

        {node.type === "data" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                height: 8, borderRadius: 4,
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                width: i === 1 ? "100%" : i === 2 ? "75%" : "88%",
              }} />
            ))}
          </div>
        )}

        {node.type === "trigger" && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 6, padding: "4px 0",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#E4FF97",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 2 L9 6 L3 10 Z" fill="#000"/>
              </svg>
            </div>
            <span style={{
              fontSize: 11, color: textCol,
              fontFamily: '"DM Mono", monospace', fontWeight: 600,
            }}>
              {node.placeholder ?? "Ausführen"}
            </span>
          </div>
        )}
      </div>

      {/* Port links (Input) */}
      <div style={{
        position: "absolute", left: -5, top: "50%", transform: "translateY(-50%)",
        width: 10, height: 10, borderRadius: "50%",
        background: isDark ? "#2A2A2A" : "#FFFFFF",
        border: `1.5px solid ${isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.20)"}`,
      }} />
      {/* Port rechts (Output) */}
      <div style={{
        position: "absolute", right: -5, top: "50%", transform: "translateY(-50%)",
        width: 10, height: 10, borderRadius: "50%",
        background: isDark ? "#2A2A2A" : "#FFFFFF",
        border: `1.5px solid ${isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.20)"}`,
      }} />
    </div>
  );
}

/* ── Haupt-Komponente ── */
export const GrainNodeCanvas: React.FC<GrainNodeCanvasProps> = ({
  nodes,
  edges = [],
  groups = [],
  height = 500,
  className,
  showGrid = true,
  scale = 1,
}) => {
  const { darkMode } = useTheme();
  const isDark = darkMode === "dark";
  const canvasRef = useRef<HTMLDivElement>(null);
  const [animOffset, setAnimOffset] = useState(0);

  // Animierter Dash-Offset für aktive Edges
  useEffect(() => {
    const id = setInterval(() => {
      setAnimOffset(prev => (prev + 1) % 20);
    }, 40);
    return () => clearInterval(id);
  }, []);

  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Canvas-Ausdehnung berechnen
  const maxX = Math.max(...nodes.map(n => n.x + (n.width ?? NODE_DEFAULTS[n.type].width))) + 40;
  const maxY = Math.max(...nodes.map(n => n.y + NODE_DEFAULTS[n.type].minHeight + 60)) + 40;
  const canvasW = Math.max(maxX, 800);
  const canvasH = Math.max(maxY, height);

  const bg        = isDark ? "#0E0E0E" : "#FAFAFA";
  const dotColor  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.10)";
  const groupBorderOpacity = isDark ? 0.25 : 0.35;

  return (
    <div
      className={cn("relative overflow-auto rounded-xl", className)}
      style={{
        height,
        background: bg,
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
      }}
    >
      <div
        ref={canvasRef}
        style={{
          position: "relative",
          width: canvasW * scale,
          height: canvasH * scale,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Dotted Grid */}
        {showGrid && (
          <svg
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            width={canvasW}
            height={canvasH}
          >
            <defs>
              <pattern id="nc-dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.8" fill={dotColor} />
              </pattern>
            </defs>
            <rect width={canvasW} height={canvasH} fill="url(#nc-dot-grid)" />
          </svg>
        )}

        {/* Gruppen-Container */}
        {groups.map(group => {
          const gc = group.color ?? "#7AB8F5";
          return (
            <div
              key={group.id}
              style={{
                position: "absolute",
                left: group.x,
                top: group.y,
                width: group.width,
                height: group.height,
                borderRadius: 16,
                background: `${gc}18`,
                border: `1.5px solid ${gc}${Math.round(groupBorderOpacity * 255).toString(16).padStart(2, "0")}`,
              }}
            >
              {group.label && (
                <div style={{
                  position: "absolute", top: -11, left: 12,
                  fontSize: 11, fontFamily: '"DM Mono", monospace',
                  fontWeight: 600,
                  color: isDark ? gc : gc,
                  background: bg,
                  padding: "0 6px",
                  letterSpacing: "0.04em",
                }}>
                  {group.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Edges als SVG-Overlay */}
        <svg
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
          width={canvasW}
          height={canvasH}
        >
          <defs>
            {edges.map(edge => {
              const color = edge.color ?? (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)");
              return (
                <marker
                  key={`marker-${edge.id}`}
                  id={`arrow-${edge.id}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill={color} opacity="0.7" />
                </marker>
              );
            })}
          </defs>

          {edges.map(edge => {
            const fromNode = nodeMap.get(edge.from);
            const toNode   = nodeMap.get(edge.to);
            if (!fromNode || !toNode) return null;

            const from = getPortPos(fromNode, edge.fromPort ?? "right");
            const to   = getPortPos(toNode,   edge.toPort   ?? "left");
            const path = bezierPath(from, to, edge.fromPort ?? "right", edge.toPort ?? "left");
            const color = edge.color ?? (isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)");

            return (
              <g key={edge.id}>
                {/* Glow-Layer für animierte Edges */}
                {edge.animated && (
                  <path
                    d={path}
                    fill="none"
                    stroke={edge.color ?? "#6DDBA0"}
                    strokeWidth="4"
                    opacity="0.12"
                    strokeLinecap="round"
                  />
                )}
                <path
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth={edge.animated ? 1.8 : 1.2}
                  strokeLinecap="round"
                  strokeDasharray={edge.animated ? "6 4" : undefined}
                  strokeDashoffset={edge.animated ? -animOffset : undefined}
                  markerEnd={`url(#arrow-${edge.id})`}
                />
                {/* Port-Dots an den Enden */}
                <circle cx={from.x} cy={from.y} r="4" fill={color} opacity="0.7" />
                <circle cx={to.x}   cy={to.y}   r="4" fill={color} opacity="0.7" />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <CanvasNodeCard
            key={node.id}
            node={node}
            isDark={isDark}
            nodeMap={nodeMap}
          />
        ))}
      </div>
    </div>
  );
};

export default GrainNodeCanvas;
