/**
 * VoltNodeCanvas v2
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Volt UI · Interaktives Node-Canvas-System
 *
 * Node-Typen (12):
 *   trigger, text, image, generator, list, data,
 *   decision, api, transform, output, webhook, note
 *
 * Edge-Stile: bezier | straight | step | smoothstep
 *
 * Node-Status: idle | running | success | error | warning | disabled
 *
 * Interaktion:
 *   – Pan:    Mittlere Maustaste
 *   – Zoom:   Scroll-Rad (0.15× – 3×)
 *   – Drag:   Linke Maustaste auf Node-Header
 *   – Resize: Handle rechts unten
 *   – Select: Klick auf Node
 */
import React, {
  useRef, useEffect, useState, useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  AlignLeft, Image, Sparkles, List, Table2, Play,
  GitBranch, Globe, Shuffle, Download, Webhook, StickyNote,
  CheckCircle2, XCircle, AlertTriangle, Loader2, Ban,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

/* ══════════════════════════════════════════════════════════════════════════════
   TYPEN
══════════════════════════════════════════════════════════════════════════════ */

export type NodeType =
  | "trigger" | "text" | "image" | "generator" | "list" | "data"
  | "decision" | "api" | "transform" | "output" | "webhook" | "note";

export type NodeStatus = "idle" | "running" | "success" | "error" | "warning" | "disabled";

export type EdgeStyle = "bezier" | "straight" | "step" | "smoothstep";

export interface CanvasNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label?: string;
  status?: NodeStatus;
  /** Typ-spezifische Metadaten */
  meta?: Record<string, unknown>;
  /** Ältere Props – abwärtskompatibel */
  imageUrl?: string;
  imageColor?: string;
  placeholder?: string;
  items?: string[];
  model?: string;
  selected?: boolean;
  accent?: boolean;
}

export interface CanvasEdge {
  id: string;
  from: string;
  to: string;
  fromPort?: "right" | "bottom" | "left" | "top";
  toPort?: "right" | "bottom" | "left" | "top";
  animated?: boolean;
  /** Datenfluss-Partikel */
  pulseCount?: number;
  style?: EdgeStyle;
  color?: string;
  label?: string;
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

export interface VoltNodeCanvasProps {
  nodes: CanvasNode[];
  edges?: CanvasEdge[];
  groups?: CanvasGroup[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  onNodeChange?: (id: string, x: number, y: number, w: number, h: number) => void;
  onNodeSelect?: (id: string | null) => void;
}

/* ══════════════════════════════════════════════════════════════════════════════
   HILFSFUNKTIONEN
══════════════════════════════════════════════════════════════════════════════ */

/**
 * Dunkelt eine Hex-Farbe für den Light-Mode ab, damit Icons und Badges
 * genügend Kontrast auf weißem Hintergrund haben.
 */
function darkenColor(hex: string): string {
  // Hex → RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // 55% dunkler
  const factor = 0.45;
  const dr = Math.round(r * factor);
  const dg = Math.round(g * factor);
  const db = Math.round(b * factor);
  return `rgb(${dr},${dg},${db})`;
}

/* ══════════════════════════════════════════════════════════════════════════════
   KONSTANTEN
══════════════════════════════════════════════════════════════════════════════ */

const HEADER_H = 44;
const MIN_NODE_W = 180;
const MIN_NODE_H = 90;
const MIN_ZOOM = 0.15;
const MAX_ZOOM = 3.0;

export const NODE_COLORS: Record<NodeType, string> = {
  trigger:   "#E4FF97",
  text:      "#A8D8FF",
  image:     "#FFD6A5",
  generator: "#B5EAD7",
  list:      "#C9B8FF",
  data:      "#FFB7C5",
  decision:  "#FFE08A",
  api:       "#80DEEA",
  transform: "#F8BBD9",
  output:    "#E4FF97",
  webhook:   "#FF9E80",
  note:      "#D4D4D4",
};

/**
 * Im Light-Mode werden die Neon-Farben durch kontraststarke,
 * gesättigte Varianten ersetzt, die auf weißem Hintergrund gut lesbar sind.
 */
export const NODE_COLORS_LIGHT: Record<NodeType, string> = {
  trigger:   "#1D4ED8",  // Trigger   → kräftiges Blau   (WCAG AA auf Weiß)
  text:      "#1D4ED8",  // Text      → kräftiges Blau
  image:     "#92400E",  // Image     → tiefes Amber-Braun
  generator: "#065F46",  // Generator → tiefes Smaragd
  list:      "#5B21B6",  // List      → tiefes Violett
  data:      "#991B1B",  // Data      → tiefes Rot
  decision:  "#78350F",  // Decision  → dunkles Amber-Braun
  api:       "#164E63",  // API       → tiefes Teal
  transform: "#831843",  // Transform → tiefes Pink
  output:    "#1D4ED8",  // Output    → kräftiges Blau
  webhook:   "#9A3412",  // Webhook   → tiefes Orange-Rot
  note:      "#1F2937",  // Note      → fast Schwarz
};

export const NODE_ICONS: Record<NodeType, LucideIcon> = {
  trigger:   Play,
  text:      AlignLeft,
  image:     Image,
  generator: Sparkles,
  list:      List,
  data:      Table2,
  decision:  GitBranch,
  api:       Globe,
  transform: Shuffle,
  output:    Download,
  webhook:   Webhook,
  note:      StickyNote,
};

export const NODE_DEFAULTS: Record<NodeType, { width: number; height: number; label: string }> = {
  trigger:   { width: 200, height: 110, label: "Trigger"      },
  text:      { width: 280, height: 160, label: "Text"          },
  image:     { width: 270, height: 230, label: "Bild"          },
  generator: { width: 310, height: 260, label: "Generator"     },
  list:      { width: 270, height: 200, label: "Liste"         },
  data:      { width: 270, height: 165, label: "Daten"         },
  decision:  { width: 260, height: 155, label: "Entscheidung"  },
  api:       { width: 290, height: 195, label: "API-Call"      },
  transform: { width: 260, height: 155, label: "Transform"     },
  output:    { width: 250, height: 150, label: "Output"        },
  webhook:   { width: 270, height: 150, label: "Webhook"       },
  note:      { width: 260, height: 130, label: "Notiz"         },
};

const STATUS_COLORS: Record<NodeStatus, string> = {
  idle:     "transparent",
  running:  "#E4FF97",
  success:  "#6DDBA0",
  error:    "#FF6B6B",
  warning:  "#FFD93D",
  disabled: "#666666",
};

const STATUS_ICONS: Partial<Record<NodeStatus, LucideIcon>> = {
  running:  Loader2,
  success:  CheckCircle2,
  error:    XCircle,
  warning:  AlertTriangle,
  disabled: Ban,
};

/* ══════════════════════════════════════════════════════════════════════════════
   HILFSFUNKTIONEN
══════════════════════════════════════════════════════════════════════════════ */

function portPos(node: CanvasNode, port: "right" | "bottom" | "left" | "top") {
  const w = node.width  ?? NODE_DEFAULTS[node.type].width;
  const h = node.height ?? NODE_DEFAULTS[node.type].height;
  switch (port) {
    case "right":  return { x: node.x + w,    y: node.y + h / 2 };
    case "left":   return { x: node.x,         y: node.y + h / 2 };
    case "bottom": return { x: node.x + w / 2, y: node.y + h     };
    case "top":    return { x: node.x + w / 2, y: node.y         };
  }
}

function buildPath(
  from: { x: number; y: number },
  to:   { x: number; y: number },
  fromPort: string = "right",
  toPort:   string = "left",
  style: EdgeStyle = "bezier"
): string {
  if (style === "straight") {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  if (style === "step") {
    const mx = (from.x + to.x) / 2;
    return `M ${from.x} ${from.y} L ${mx} ${from.y} L ${mx} ${to.y} L ${to.x} ${to.y}`;
  }
  if (style === "smoothstep") {
    const mx = (from.x + to.x) / 2;
    const r = 14;
    return (
      `M ${from.x} ${from.y} ` +
      `L ${mx - r} ${from.y} ` +
      `Q ${mx} ${from.y} ${mx} ${from.y + r} ` +
      `L ${mx} ${to.y - r} ` +
      `Q ${mx} ${to.y} ${mx + r} ${to.y} ` +
      `L ${to.x} ${to.y}`
    );
  }
  // bezier
  const dx = Math.abs(to.x - from.x) * 0.5;
  const dy = Math.abs(to.y - from.y) * 0.5;
  let c1x = from.x, c1y = from.y, c2x = to.x, c2y = to.y;
  if (fromPort === "right")  c1x = from.x + Math.max(dx, 60);
  if (fromPort === "left")   c1x = from.x - Math.max(dx, 60);
  if (fromPort === "bottom") c1y = from.y + Math.max(dy, 60);
  if (fromPort === "top")    c1y = from.y - Math.max(dy, 60);
  if (toPort === "left")   c2x = to.x - Math.max(dx, 60);
  if (toPort === "right")  c2x = to.x + Math.max(dx, 60);
  if (toPort === "top")    c2y = to.y - Math.max(dy, 60);
  if (toPort === "bottom") c2y = to.y + Math.max(dy, 60);
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

/* ══════════════════════════════════════════════════════════════════════════════
   NODE BODY – Inhalt je nach Typ
══════════════════════════════════════════════════════════════════════════════ */

function NodeBody({ node, isDark }: { node: CanvasNode; isDark: boolean }) {
  const textCol  = isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)";
  const mutedCol = isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.52)";
  const typeColor = isDark ? NODE_COLORS[node.type] : NODE_COLORS_LIGHT[node.type];
  const bodyH = (node.height ?? NODE_DEFAULTS[node.type].height) - HEADER_H - 22;

  // Ältere Props → meta normalisieren
  const meta = node.meta ?? {};
  const content   = (meta.content   as string) ?? node.placeholder ?? "";
  const url       = (meta.url       as string) ?? node.imageUrl ?? "";
  const bgColor   = (meta.bgColor   as string) ?? node.imageColor ?? "";
  const itemList  = (meta.items     as string[]) ?? node.items ?? [];
  const modelName = (meta.model     as string) ?? node.model ?? "Auto";

  switch (node.type) {

    case "trigger":
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "4px 0" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: typeColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 14px ${typeColor}55`,
          }}>
            <Play size={13} style={{ color: isDark ? "#000" : "#fff", marginLeft: 2 }} />
          </div>
          <span style={{ fontSize: 12, color: content ? textCol : mutedCol, fontFamily: '"DM Mono", monospace' }}>
            {content || (meta.event as string) || "on:start"}
          </span>
        </div>
      );

    case "text":
      return (
        <div style={{
          minHeight: Math.max(bodyH, 36), fontSize: 12,
          color: content ? textCol : mutedCol,
          fontFamily: '"DM Sans", sans-serif', lineHeight: 1.65,
        }}>
          {content || "Texteingabe…"}
        </div>
      );

    case "image":
      return (
        <div style={{
          height: Math.max(bodyH, 56), borderRadius: 8, overflow: "hidden",
          background: bgColor || (isDark ? "#2A2A2A" : "#F0F0F0"),
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {url ? (
            <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Image size={26} style={{ color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)" }} />
          )}
        </div>
      );

    case "generator":
      return (
        <>
          <div style={{
            height: Math.max(bodyH - 46, 48), borderRadius: 8,
            background: bgColor || (isDark ? "#1E2A1E" : "#EFF8EF"),
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 8, overflow: "hidden",
          }}>
            {url ? (
              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            ) : (
              <Sparkles size={22} style={{ color: "#6DDBA0", opacity: 0.55 }} />
            )}
          </div>
          <div style={{
            fontSize: 11, color: content ? textCol : mutedCol,
            fontFamily: '"DM Mono", monospace',
            padding: "4px 8px",
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)"}`,
            borderRadius: 6, marginBottom: 6,
          }}>
            {content || "Prompt eingeben…"}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontSize: 10, color: mutedCol, fontFamily: '"DM Mono", monospace',
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)"}`,
              padding: "2px 6px", borderRadius: 4,
            }}>{modelName}</span>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", background: "#E4FF97",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Play size={10} style={{ color: "#000", marginLeft: 1 }} />
            </div>
          </div>
        </>
      );

    case "list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {itemList.length > 0 ? itemList.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: textCol, fontFamily: '"DM Sans", sans-serif' }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: typeColor, flexShrink: 0 }} />
              {item}
            </div>
          )) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "10px 0" }}>
              <List size={20} style={{ color: mutedCol }} />
              <span style={{ fontSize: 11, color: mutedCol, fontFamily: '"DM Sans", sans-serif' }}>Keine Einträge</span>
            </div>
          )}
        </div>
      );

    case "data":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[100, 75, 88, 60].map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                height: 7, borderRadius: 4,
                background: isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)",
                width: `${w}%`, flex: "none",
              }} />
              <span style={{ fontSize: 9, color: mutedCol, fontFamily: '"DM Mono", monospace' }}>
                {["id", "name", "value", "ts"][i]}
              </span>
            </div>
          ))}
        </div>
      );

    case "decision":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{
            fontSize: 11, color: content ? textCol : mutedCol,
            fontFamily: '"DM Mono", monospace',
            padding: "4px 8px",
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)"}`,
            borderRadius: 6,
          }}>
            {content || "if condition…"}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["TRUE", "FALSE"].map((lbl, i) => (
              <div key={lbl} style={{
                flex: 1, padding: "4px 0", textAlign: "center",
                borderRadius: 6, fontSize: 10,
                fontFamily: '"DM Mono", monospace', fontWeight: 600,
                letterSpacing: "0.07em",
                background: i === 0
                  ? (isDark ? "rgba(109,219,160,0.15)" : "rgba(109,219,160,0.18)")
                  : (isDark ? "rgba(255,107,107,0.15)" : "rgba(255,107,107,0.18)"),
                color: i === 0 ? "#6DDBA0" : "#FF6B6B",
              }}>{lbl}</div>
            ))}
          </div>
        </div>
      );

    case "api":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              fontSize: 9, fontFamily: '"DM Mono", monospace', fontWeight: 700,
              padding: "2px 6px", borderRadius: 4,
              background: (meta.method as string) === "POST"
                ? (isDark ? "rgba(228,255,151,0.18)" : "rgba(140,160,0,0.15)")
                : (isDark ? "rgba(128,222,234,0.18)" : "rgba(0,130,160,0.12)"),
              color: (meta.method as string) === "POST"
                ? (isDark ? "#C8E84A" : "#5A7000")
                : (isDark ? "#80DEEA" : "#006080"),
            }}>
              {(meta.method as string) || "GET"}
            </span>
            <span style={{
              fontSize: 10, color: textCol, fontFamily: '"DM Mono", monospace',
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {(meta.endpoint as string) || "/api/endpoint"}
            </span>
          </div>
          <div style={{
            fontSize: 10, color: mutedCol, fontFamily: '"DM Mono", monospace',
            padding: "4px 8px",
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)"}`,
            borderRadius: 6,
          }}>
            {(meta.body as string) || '{ "key": "value" }'}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6DDBA0" }} />
            <span style={{ fontSize: 9, color: mutedCol, fontFamily: '"DM Mono", monospace' }}>
              {(meta.status as string) || "200 OK"}
            </span>
          </div>
        </div>
      );

    case "transform":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            {["INPUT", "OUTPUT"].map((lbl, i) => (
              <React.Fragment key={lbl}>
                <div style={{
                  flex: 1, height: 26, borderRadius: 6,
                  background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.12)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}><span style={{ fontSize: 9, color: mutedCol, fontFamily: '"DM Mono", monospace' }}>{lbl}</span></div>
                {i === 0 && <Shuffle size={12} style={{ color: typeColor, flexShrink: 0 }} />}
              </React.Fragment>
            ))}
          </div>
          <div style={{
            fontSize: 10, color: content ? textCol : mutedCol,
            fontFamily: '"DM Mono", monospace',
            padding: "3px 8px",
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)"}`,
            borderRadius: 6,
          }}>
            {content || "map(x => x)"}
          </div>
        </div>
      );

    case "output":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{
            height: Math.max(bodyH - 22, 36), borderRadius: 8,
            background: isDark ? "rgba(228,255,151,0.05)" : "rgba(0,0,0,0.04)",
            border: `1px dashed ${isDark ? "rgba(228,255,151,0.22)" : "rgba(0,0,0,0.18)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Download size={18} style={{ color: isDark ? typeColor : darkenColor(typeColor), opacity: 0.65 }} />
          </div>
          <span style={{ fontSize: 10, color: textCol, fontFamily: '"DM Mono", monospace', textAlign: "center" }}>
            {(meta.format as string) || "JSON · CSV · Webhook"}
          </span>
        </div>
      );

    case "webhook":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF9E80", boxShadow: "0 0 5px #FF9E8055" }} />
            <span style={{ fontSize: 10, color: textCol, fontFamily: '"DM Mono", monospace' }}>
              {(meta.event as string) || "POST /webhook"}
            </span>
          </div>
          <div style={{
            fontSize: 10, color: mutedCol, fontFamily: '"DM Mono", monospace',
            padding: "4px 8px",
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)"}`,
            borderRadius: 6,
          }}>
            {(meta.payload as string) || '{ "event": "…" }'}
          </div>
        </div>
      );

    case "note":
      return (
        <div style={{
          fontSize: 11, color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.60)",
          fontFamily: '"DM Sans", sans-serif',
          lineHeight: 1.65, fontStyle: "italic",
        }}>
          {content || "Notiz hier eingeben…"}
        </div>
      );

    default:
      return null;
  }
}

/* ══════════════════════════════════════════════════════════════════════════════
   STATUS-BADGE
══════════════════════════════════════════════════════════════════════════════ */

function StatusBadge({ status, isDark }: { status: NodeStatus; isDark: boolean }) {
  if (status === "idle") return null;
  const color = STATUS_COLORS[status];
  const Icon  = STATUS_ICONS[status];
  return (
    <div style={{
      position: "absolute", top: -8, right: -8, zIndex: 4,
      width: 18, height: 18, borderRadius: "50%",
      background: isDark ? "#1A1A1A" : "#FFFFFF",
      border: `2px solid ${color}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 8px ${color}55`,
    }}>
      {Icon && (
        <Icon size={10} style={{
          color,
          animation: status === "running" ? "ncSpin 1s linear infinite" : undefined,
        }} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HAUPT-KOMPONENTE
══════════════════════════════════════════════════════════════════════════════ */

const VoltNodeCanvas: React.FC<VoltNodeCanvasProps> = ({
  nodes: initialNodes,
  edges = [],
  groups = [],
  height = 500,
  className,
  showGrid = true,
  onNodeChange,
  onNodeSelect,
}) => {
  const { darkMode } = useTheme();
  const isDark = darkMode === "dark";

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    type: "pan" | "node" | "resize";
    nodeId?: string;
    startX: number; startY: number;
    panX?: number; panY?: number;
    origX?: number; origY?: number;
    origW?: number; origH?: number;
  } | null>(null);

  const [nodes, setNodes] = useState<CanvasNode[]>(() =>
    initialNodes.map(n => ({
      ...n,
      width:  n.width  ?? NODE_DEFAULTS[n.type].width,
      height: n.height ?? NODE_DEFAULTS[n.type].height,
    }))
  );
  const [zoom, setZoom]     = useState(0.85);
  const [pan, setPan]       = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [animTick,   setAnimTick]   = useState(0);
  const [localEdges, setLocalEdges] = useState<CanvasEdge[]>(edges);

  /* Drag-to-Connect State */
  const [connecting, setConnecting] = useState<{
    fromNodeId: string;
    fromPort: "right" | "bottom" | "left" | "top";
    cursorX: number;
    cursorY: number;
  } | null>(null);
  const [hoveredPort, setHoveredPort] = useState<{
    nodeId: string;
    port: "right" | "bottom" | "left" | "top";
  } | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  /* Sync localEdges wenn prop sich ändert – JSON-Vergleich verhindert Infinite-Loop */
  const edgesJsonRef = useRef("");
  useEffect(() => {
    const json = JSON.stringify(edges);
    if (json !== edgesJsonRef.current) {
      edgesJsonRef.current = json;
      setLocalEdges(edges);
    }
  });

  /* Animations-Tick für Datenfluss-Partikel */
  useEffect(() => {
    const hasAnim = edges.some(e => e.animated || (e.pulseCount ?? 0) > 0);
    if (!hasAnim) return;
    const id = setInterval(() => setAnimTick(t => (t + 1) % 200), 30);
    return () => clearInterval(id);
  }, [edges]);

  /* Nodes neu laden wenn Props sich ändern */
  useEffect(() => {
    setNodes(initialNodes.map(n => ({
      ...n,
      width:  n.width  ?? NODE_DEFAULTS[n.type].width,
      height: n.height ?? NODE_DEFAULTS[n.type].height,
    })));
  }, [initialNodes]);

  /* Zoom via Scroll */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * factor)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* Pan via mittlere Maustaste */
  const onMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.button === 1) {
      e.preventDefault();
      dragRef.current = { type: "pan", startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    }
  }, [pan]);

  /* Drag-to-Connect: Port-Drag starten */
  const startConnect = useCallback((
    e: ReactMouseEvent,
    nodeId: string,
    port: "right" | "bottom" | "left" | "top"
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setConnecting({
      fromNodeId: nodeId,
      fromPort: port,
      cursorX: (e.clientX - rect.left - pan.x) / zoom,
      cursorY: (e.clientY - rect.top  - pan.y) / zoom,
    });
  }, [pan, zoom]);

  /* Drag-to-Connect: Cursor-Position aktualisieren */
  useEffect(() => {
    if (!connecting) return;
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setConnecting(prev => prev ? {
        ...prev,
        cursorX: (e.clientX - rect.left - pan.x) / zoom,
        cursorY: (e.clientY - rect.top  - pan.y) / zoom,
      } : null);
    };
    const onUp = () => {
      if (connecting && hoveredPort && hoveredPort.nodeId !== connecting.fromNodeId) {
        /* Validierung: kein Duplikat */
        const isDuplicate = localEdges.some(
          e => e.from === connecting.fromNodeId && e.to === hoveredPort.nodeId &&
               e.fromPort === connecting.fromPort && e.toPort === hoveredPort.port
        );
        if (!isDuplicate) {
          const newEdge: CanvasEdge = {
            id: `e-${Date.now()}`,
            from: connecting.fromNodeId,
            to:   hoveredPort.nodeId,
            fromPort: connecting.fromPort,
            toPort:   hoveredPort.port,
            style: "bezier",
          };
          setLocalEdges(prev => [...prev, newEdge]);
        }
      }
      setConnecting(null);
      setHoveredPort(null);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",  onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",  onUp);
    };
  }, [connecting, hoveredPort, localEdges, pan, zoom]);

  const startNodeDrag = useCallback((e: ReactMouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    setSelectedId(nodeId);
    onNodeSelect?.(nodeId);
    dragRef.current = { type: "node", nodeId, startX: e.clientX, startY: e.clientY, origX: node.x, origY: node.y };
  }, [nodes, onNodeSelect]);

  const startResize = useCallback((e: ReactMouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    dragRef.current = {
      type: "resize", nodeId,
      startX: e.clientX, startY: e.clientY,
      origW: node.width  ?? NODE_DEFAULTS[node.type].width,
      origH: node.height ?? NODE_DEFAULTS[node.type].height,
    };
  }, [nodes]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = (e.clientX - d.startX) / zoom;
      const dy = (e.clientY - d.startY) / zoom;
      if (d.type === "pan") {
        setPan({ x: (d.panX ?? 0) + dx * zoom, y: (d.panY ?? 0) + dy * zoom });
      } else if (d.type === "node" && d.nodeId) {
        setNodes(prev => prev.map(n =>
          n.id === d.nodeId ? { ...n, x: (d.origX ?? 0) + dx, y: (d.origY ?? 0) + dy } : n
        ));
      } else if (d.type === "resize" && d.nodeId) {
        setNodes(prev => prev.map(n =>
          n.id === d.nodeId ? {
            ...n,
            width:  Math.max(MIN_NODE_W, (d.origW ?? 200) + dx),
            height: Math.max(MIN_NODE_H, (d.origH ?? 120) + dy),
          } : n
        ));
      }
    };
    const onUp = () => {
      const d = dragRef.current;
      if (d && (d.type === "node" || d.type === "resize") && d.nodeId) {
        const node = nodes.find(n => n.id === d.nodeId);
        if (node) onNodeChange?.(node.id, node.x, node.y, node.width ?? 200, node.height ?? 120);
      }
      dragRef.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [zoom, nodes, onNodeChange]);

  /* ── Farben ── */
  const bg       = isDark ? "#0E0E0E" : "#F2F2F2";
  const dotColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const nodeMap  = new Map(nodes.map(n => [n.id, n]));
  const canvasW  = Math.max(...nodes.map(n => n.x + (n.width  ?? 300)), 800) + 200;
  const canvasH  = Math.max(...nodes.map(n => n.y + (n.height ?? 200)), 500) + 200;

  /* Preview-Linie: Startpunkt der aktuellen Verbindung */
  const connectPreview = connecting ? (() => {
    const fromNode = nodeMap.get(connecting.fromNodeId);
    if (!fromNode) return null;
    const from = portPos(fromNode, connecting.fromPort);
    return { from, to: { x: connecting.cursorX, y: connecting.cursorY } };
  })() : null;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-xl select-none", className)}
      style={{ height, background: bg, border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.14)"}`, contain: "paint" as const }}
      onMouseDown={onMouseDown}
      onClick={() => { setSelectedId(null); onNodeSelect?.(null); }}
    >
      {/* Animationen */}
      <style>{`
        @keyframes ncSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ncRunPulse {
          0%,100% { box-shadow: 0 0 0 2px #E4FF9733, 0 4px 20px rgba(0,0,0,0.18); }
          50%      { box-shadow: 0 0 0 4px #E4FF9766, 0 4px 28px rgba(228,255,151,0.18); }
        }
        @keyframes ncSuccessGlow {
          0%,100% { box-shadow: 0 0 0 2px #6DDBA033; }
          50%      { box-shadow: 0 0 0 4px #6DDBA066, 0 4px 24px rgba(109,219,160,0.18); }
        }
        @keyframes ncErrorGlow {
          0%,100% { box-shadow: 0 0 0 2px #FF6B6B33; }
          50%      { box-shadow: 0 0 0 4px #FF6B6B66; }
        }
        @keyframes ncEdgeDash {
          from { stroke-dashoffset: 20; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Zoom-Anzeige */}
      <div style={{
        position: "absolute", top: 10, right: 12, zIndex: 10,
        fontSize: 10, fontFamily: '"DM Mono", monospace',
        color: isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.50)",
        background: isDark ? "rgba(0,0,0,0.40)" : "rgba(255,255,255,0.90)",
        padding: "2px 7px", borderRadius: 6, backdropFilter: "blur(4px)",
        pointerEvents: "none",
      }}>
        {Math.round(zoom * 100)}%
      </div>

      {/* Canvas */}
      <div style={{
        position: "absolute",
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        transformOrigin: "0 0",
        width: canvasW, height: canvasH,
      }}>
        {/* Grid */}
        {showGrid && (
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            <defs>
              <pattern id="ncGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill={dotColor} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ncGrid)" />
          </svg>
        )}

        {/* Gruppen */}
        {groups.map(g => (
          <div key={g.id} style={{
            position: "absolute", left: g.x, top: g.y, width: g.width, height: g.height,
            borderRadius: 16,
            border: `1.5px dashed ${g.color ?? (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)")}`,
            background: g.color ? `${g.color}0D` : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"),
          }}>
            {g.label && (
              <div style={{
                position: "absolute", top: -11, left: 14,
                fontSize: 10, fontFamily: '"DM Mono", monospace',
                color: g.color ?? (isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)"),
                background: bg, padding: "0 6px", letterSpacing: "0.08em",
              }}>{g.label}</div>
            )}
          </div>
        ))}

        {/* SVG-Edges */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          <defs>
            {edges.map(edge => {
              const col = edge.color ?? (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.65)");
              return (
                <marker key={`arr-${edge.id}`} id={`arr-${edge.id}`}
                  markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L7,3 z" fill={col} />
                </marker>
              );
            })}
          </defs>

          {/* Preview-Linie beim Verbinden */}
          {connectPreview && (
            <path
              d={buildPath(connectPreview.from, connectPreview.to, connecting!.fromPort, "left", "bezier")}
              stroke={isDark ? "rgba(228,255,151,0.7)" : "rgba(0,0,0,0.5)"}
              strokeWidth={1.5}
              strokeDasharray="6 4"
              fill="none"
              style={{ animation: "ncEdgeDash 0.4s linear infinite" }}
            />
          )}
          {localEdges.map(edge => {
            const fromNode = nodeMap.get(edge.from);
            const toNode   = nodeMap.get(edge.to);
            if (!fromNode || !toNode) return null;
            const fp = edge.fromPort ?? "right";
            const tp = edge.toPort   ?? "left";
            const from = portPos(fromNode, fp);
            const to   = portPos(toNode,   tp);
            const d = buildPath(from, to, fp, tp, edge.style ?? "bezier");
            const edgeColor = edge.color ?? (isDark ? "rgba(255,255,255,0.30)" : "rgba(0,0,0,0.60)");
            const pulses = edge.pulseCount ?? (edge.animated ? 1 : 0);

            // Partikel-Positionen via linearer Interpolation
            const particlePositions: Array<{ x: number; y: number }> = [];
            if (pulses > 0) {
              for (let i = 0; i < pulses; i++) {
                const t = ((animTick / 200) + i / pulses) % 1;
                particlePositions.push({
                  x: from.x + (to.x - from.x) * t,
                  y: from.y + (to.y - from.y) * t,
                });
              }
            }

            const isEdgeHovered = hoveredEdgeId === edge.id;
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;

            /* Im Light-Mode: helle Farben (z.B. #E4FF97) brauchen eine Outline */
            const isLightEdge = !isDark && edgeColor.startsWith("#") && (() => {
              const hex = edgeColor.replace("#", "");
              const r = parseInt(hex.slice(0,2), 16);
              const g = parseInt(hex.slice(2,4), 16);
              const b = parseInt(hex.slice(4,6), 16);
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              return luminance > 0.65;
            })();

            return (
              <g key={edge.id}>
                {/* Unsichtbare breite Hitbox für einfaches Hovern */}
                <path
                  d={d} fill="none" stroke="transparent" strokeWidth={18}
                  style={{ cursor: "pointer", pointerEvents: "stroke" }}
                  onMouseEnter={() => setHoveredEdgeId(edge.id)}
                  onMouseLeave={() => setHoveredEdgeId(null)}
                />
                {/* Schwarze Outline für helle Linien im Light-Mode */}
                {isLightEdge && (
                  <path
                    d={d} fill="none"
                    stroke="rgba(0,0,0,0.45)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray={edge.animated ? "6 4" : undefined}
                    style={{
                      ...(edge.animated ? { animation: "ncEdgeDash 0.7s linear infinite" } : {}),
                      pointerEvents: "none",
                    }}
                  />
                )}
                {/* Sichtbare Edge-Linie */}
                <path
                  d={d} fill="none"
                  stroke={isEdgeHovered
                    ? (isDark ? "rgba(255,100,100,0.75)" : "rgba(200,40,40,0.65)")
                    : edgeColor}
                  strokeWidth={isEdgeHovered ? 2 : 1.5}
                  strokeLinecap="round"
                  markerEnd={`url(#arr-${edge.id})`}
                  strokeDasharray={edge.animated ? "6 4" : undefined}
                  style={{
                    ...(edge.animated ? { animation: "ncEdgeDash 0.7s linear infinite" } : {}),
                    transition: "stroke 0.15s, stroke-width 0.15s",
                    pointerEvents: "none",
                  }}
                />
                {particlePositions.map((pos, i) => {
                  const typeColor = isDark ? NODE_COLORS[fromNode.type] : NODE_COLORS_LIGHT[fromNode.type];
                  return (
                    <circle key={i} cx={pos.x} cy={pos.y} r={3.5}
                      fill={typeColor}
                      style={{ filter: `drop-shadow(0 0 4px ${typeColor})`, pointerEvents: "none" }}
                    />
                  );
                })}
                {edge.label && (
                  <foreignObject x={mx - 28} y={my - 10} width={56} height={20} style={{ pointerEvents: "none" }}>
                    <div style={{
                      fontSize: 9, fontFamily: '"DM Mono", monospace',
                      color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
                      background: bg, padding: "1px 5px", borderRadius: 4,
                      textAlign: "center", whiteSpace: "nowrap",
                    }}>{edge.label}</div>
                  </foreignObject>
                )}
                {/* Scheren-Marker: Position wird im HTML-Overlay gerendert, nicht hier im SVG */}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const w = node.width  ?? NODE_DEFAULTS[node.type].width;
          const h = node.height ?? NODE_DEFAULTS[node.type].height;
          const typeColor = isDark ? NODE_COLORS[node.type] : NODE_COLORS_LIGHT[node.type];
          const Icon = NODE_ICONS[node.type];
          const isSelected = selectedId === node.id;
          const isHovered  = hoveredId  === node.id;
          const status = node.status ?? "idle";
          const isDisabled = status === "disabled";

          const nodeBg = node.type === "note"
            ? (isDark ? "#1E1E18" : "#FFFDE7")
            : (isDark ? "#161616" : "#FEFEFE");

          const border = isSelected
            ? typeColor
            : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.18)";

          const boxShadow = (() => {
            if (status === "running" || status === "success" || status === "error") return undefined;
            if (isSelected) return `0 0 0 2px ${typeColor}66, 0 4px 24px rgba(0,0,0,0.22)`;
            if (isHovered)  return isDark ? "0 4px 28px rgba(0,0,0,0.50)" : "0 4px 20px rgba(0,0,0,0.16)";
            return isDark ? "0 2px 16px rgba(0,0,0,0.38)" : "0 2px 12px rgba(0,0,0,0.10)";
          })();

          const animation = (() => {
            if (status === "running") return "ncRunPulse 1.5s ease-in-out infinite";
            if (status === "success") return "ncSuccessGlow 2s ease-in-out infinite";
            if (status === "error")   return "ncErrorGlow 1s ease-in-out infinite";
            return undefined;
          })();

          return (
            <div key={node.id} style={{
              position: "absolute", left: node.x, top: node.y, width: w, height: h,
              background: nodeBg,
              border: `1.5px solid ${border}`,
              borderRadius: 12,
              boxShadow, animation,
              overflow: "hidden",
              opacity: isDisabled ? 0.38 : 1,
              transition: "border-color 0.15s, opacity 0.15s, transform 0.1s",
              transform: isHovered && !isSelected ? "translateY(-1px)" : undefined,
              userSelect: "none",
            }}
              onClick={e => { e.stopPropagation(); setSelectedId(node.id); onNodeSelect?.(node.id); }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <StatusBadge status={status} isDark={isDark} />

              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "0 14px", height: HEADER_H,
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.12)"}`,
                borderTopLeftRadius: 11, borderTopRightRadius: 11,
                cursor: isDisabled ? "not-allowed" : "grab",
              }}
                onMouseDown={isDisabled ? undefined : e => startNodeDrag(e, node.id)}
              >
                <Icon size={16} style={{ color: isDark ? typeColor : darkenColor(typeColor), flexShrink: 0 }} strokeWidth={2} />
                <span style={{
                  fontSize: 13, fontFamily: '"DM Mono", monospace',
                  color: isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)",
                  fontWeight: 600, flex: 1,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {node.label ?? NODE_DEFAULTS[node.type].label}
                </span>
                <span style={{
                  fontSize: 9, fontFamily: '"DM Mono", monospace',
                  color: isDark ? typeColor : typeColor,
                  background: isDark ? `${typeColor}1A` : `${typeColor}18`,
                  border: isDark ? undefined : `1px solid ${typeColor}40`,
                  padding: "2px 7px", borderRadius: 5, letterSpacing: "0.05em", flexShrink: 0,
                }}>
                  {node.type.toUpperCase()}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: "12px 14px 14px", overflow: "hidden" }}>
                <NodeBody node={node} isDark={isDark} />
              </div>

               {/* Port links (Input) */}
              {(() => {
                const isHovP = hoveredPort?.nodeId === node.id && hoveredPort?.port === "left";
                const isTarget = connecting && connecting.fromNodeId !== node.id;
                return (
                  <div
                    style={{
                      position: "absolute", left: -7, top: "50%", transform: "translateY(-50%)",
                      width: isHovP ? 18 : 14, height: isHovP ? 18 : 14,
                      marginLeft: isHovP ? -2 : 0, marginTop: isHovP ? -2 : 0,
                      borderRadius: "50%",
                      background: isHovP ? (isDark ? typeColor : darkenColor(typeColor)) : (isDark ? "#1A1A1A" : "#FFFFFF"),
                      border: `2px solid ${isHovP ? (isDark ? typeColor : darkenColor(typeColor)) : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)")}`,
                      boxShadow: isHovP ? `0 0 10px ${typeColor}88` : undefined,
                      zIndex: 4,
                      cursor: isTarget ? "crosshair" : "default",
                      transition: "all 0.12s ease",
                    }}
                    onMouseEnter={() => isTarget && setHoveredPort({ nodeId: node.id, port: "left" })}
                    onMouseLeave={() => setHoveredPort(null)}
                    onMouseUp={e => {
                      if (connecting && connecting.fromNodeId !== node.id) {
                        e.stopPropagation();
                        const isDuplicate = localEdges.some(
                          ed => ed.from === connecting.fromNodeId && ed.to === node.id &&
                               ed.fromPort === connecting.fromPort && ed.toPort === "left"
                        );
                        if (!isDuplicate) {
                          setLocalEdges(prev => [...prev, {
                            id: `e-${Date.now()}`,
                            from: connecting.fromNodeId,
                            to: node.id,
                            fromPort: connecting.fromPort,
                            toPort: "left",
                            style: "bezier",
                          }]);
                        }
                        setConnecting(null);
                        setHoveredPort(null);
                      }
                    }}
                  />
                );
              })()}
              {/* Port rechts (Output) */}
              {(() => {
                const isHovP = hoveredPort?.nodeId === node.id && hoveredPort?.port === "right";
                return (
                  <div
                    style={{
                      position: "absolute", right: -7, top: "50%", transform: "translateY(-50%)",
                      width: isHovP ? 18 : 14, height: isHovP ? 18 : 14,
                      marginRight: isHovP ? -2 : 0, marginTop: isHovP ? -2 : 0,
                      borderRadius: "50%",
                      background: isDark ? "#1A1A1A" : "#FFFFFF",
                      border: `2.5px solid ${isDark ? typeColor : darkenColor(typeColor)}`,
                      boxShadow: isHovP ? `0 0 12px ${typeColor}` : `0 0 8px ${typeColor}66`,
                      zIndex: 4,
                      cursor: "crosshair",
                      transition: "all 0.12s ease",
                    }}
                    onMouseDown={e => startConnect(e, node.id, "right")}
                    onMouseEnter={() => setHoveredPort({ nodeId: node.id, port: "right" })}
                    onMouseLeave={() => setHoveredPort(null)}
                  />
                );
              })()}
              {/* Port unten (Decision: FALSE-Pfad) */}
              {node.type === "decision" && (() => {
                const isHovP = hoveredPort?.nodeId === node.id && hoveredPort?.port === "bottom";
                return (
                  <div
                    style={{
                      position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)",
                      width: isHovP ? 18 : 14, height: isHovP ? 18 : 14,
                      marginLeft: isHovP ? -2 : 0, marginBottom: isHovP ? -2 : 0,
                      borderRadius: "50%",
                      background: isDark ? "#1A1A1A" : "#FFFFFF",
                      border: `2.5px solid ${isDark ? "#FF6B6B" : "#D94040"}`,
                      boxShadow: isHovP ? "0 0 12px #FF6B6B" : "0 0 8px #FF6B6B66",
                      zIndex: 4,
                      cursor: "crosshair",
                      transition: "all 0.12s ease",
                    }}
                    onMouseDown={e => startConnect(e, node.id, "bottom")}
                    onMouseEnter={() => setHoveredPort({ nodeId: node.id, port: "bottom" })}
                    onMouseLeave={() => setHoveredPort(null)}
                  />
                );
              })()}

              {/* Resize-Handle */}
              {!isDisabled && (
                <div style={{
                  position: "absolute", right: 3, bottom: 3,
                  width: 14, height: 14, cursor: "nwse-resize",
                  display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
                  padding: 2, zIndex: 3,
                }}
                  onMouseDown={e => startResize(e, node.id)}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 9 L9 2 M5 9 L9 5 M8 9 L9 8"
                      stroke={isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.30)"}
                      strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scheren-Icon HTML-Overlay – außerhalb SVG für zuverlässige Click-Events */}
      {hoveredEdgeId && (() => {
        const edge = localEdges.find(e => e.id === hoveredEdgeId);
        if (!edge) return null;
        const fromNode = nodeMap.get(edge.from);
        const toNode   = nodeMap.get(edge.to);
        if (!fromNode || !toNode) return null;
        const fp = edge.fromPort ?? "right";
        const tp = edge.toPort   ?? "left";
        const from = portPos(fromNode, fp);
        const to   = portPos(toNode,   tp);
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        /* Canvas-Koordinaten → Bildschirm-Koordinaten */
        const screenX = mx * zoom + pan.x;
        const screenY = my * zoom + pan.y;
        return (
          <div
            key={`scissors-${hoveredEdgeId}`}
            style={{
              position: "absolute",
              left: screenX - 14,
              top:  screenY - 14,
              width: 28, height: 28,
              zIndex: 20,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredEdgeId(hoveredEdgeId)}
            onMouseLeave={() => setHoveredEdgeId(null)}
            onClick={e => {
              e.stopPropagation();
              setLocalEdges(prev => prev.filter(ed => ed.id !== hoveredEdgeId));
              setHoveredEdgeId(null);
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: isDark ? "#1A1A1A" : "#FFFFFF",
              border: `1.5px solid ${isDark ? "rgba(255,100,100,0.7)" : "rgba(200,40,40,0.6)"}`,
              boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.7)" : "0 2px 8px rgba(0,0,0,0.20)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke={isDark ? "rgba(255,100,100,0.95)" : "rgba(200,40,40,0.9)"}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
            </div>
          </div>
        );
      })()}

      {/* Toolbar */}
      <div style={{
        position: "absolute", bottom: 10, right: 12, zIndex: 10,
        display: "flex", gap: 4,
      }}>
        {[
          { label: "−", action: () => setZoom(z => Math.max(MIN_ZOOM, z / 1.25)) },
          { label: "⟳", action: () => { setZoom(1); setPan({ x: 0, y: 0 }); } },
          { label: "+", action: () => setZoom(z => Math.min(MAX_ZOOM, z * 1.25)) },
        ].map(btn => (
          <button key={btn.label}
            onClick={e => { e.stopPropagation(); btn.action(); }}
            style={{
              width: 26, height: 26, borderRadius: 7,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.85)",
              color: isDark ? "rgba(255,255,255,0.68)" : "rgba(0,0,0,0.58)",
              fontSize: 14, fontFamily: '"DM Mono", monospace',
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)", transition: "background 0.15s",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VoltNodeCanvas;
export { VoltNodeCanvas };
