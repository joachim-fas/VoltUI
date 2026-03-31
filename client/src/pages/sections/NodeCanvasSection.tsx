/**
 * NodeCanvasSection v2
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Volt UI · Node Canvas Dokumentation
 *
 * Inhalte:
 *   1. Node-Typen-Galerie (12 Typen in einer Reihe)
 *   2. Pipeline-Templates (5 auswählbare Vorlagen)
 *   3. Edge-Stile (4 Verbindungstypen)
 *   4. Node-Status (6 Zustände)
 *   5. Konfigurations-Panel (Sidebar mit Node-Details)
 *   6. Code-Referenz & Props-Tabelle
 */
import React, { useState, useMemo } from "react";
import {
  VoltNodeCanvas,
  NODE_COLORS, NODE_COLORS_LIGHT, NODE_ICONS, NODE_DEFAULTS,
  type CanvasNode, type CanvasEdge, type CanvasGroup, type NodeType, type NodeStatus, type EdgeStyle,
} from "@/components/volt/VoltNodeCanvas";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Play, AlignLeft, Image, Sparkles, List, Table2,
  GitBranch, Globe, Shuffle, Download, Webhook, StickyNote,
  Settings, ChevronRight, Info, Code2, Layers,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════════
   HILFKOMPONENTEN
══════════════════════════════════════════════════════════════════════════════ */

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: 10, fontFamily: '"DM Mono", monospace',
    fontWeight: 600, letterSpacing: "0.12em",
    color: "var(--muted-foreground)", textTransform: "uppercase",
    marginBottom: 12,
  }}>
    <span style={{ color: "#E4FF97" }}>&gt;_</span>
    {children}
  </div>
);

const CodeBlock: React.FC<{ code: string; label?: string }> = ({ code, label }) => (
  <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
    {label && (
      <div style={{
        background: "#1A1A1A", padding: "6px 14px",
        fontSize: 10, fontFamily: '"DM Mono", monospace',
        color: "#7A7A7A", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ color: "#E4FF97" }}>&gt;_</span>
        {label}
      </div>
    )}
    <pre style={{
      background: "#111111", margin: 0, padding: "16px 14px",
      fontSize: 11, fontFamily: '"DM Mono", monospace',
      color: "rgba(255,255,255,0.75)", lineHeight: 1.7,
      overflowX: "auto",
    }}>
      <code>{code}</code>
    </pre>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════════
   PIPELINE-TEMPLATES
══════════════════════════════════════════════════════════════════════════════ */

interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  badgeColor: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  groups?: CanvasGroup[];
  canvasHeight: number;
  initialZoom?: number;
}

const PIPELINES: PipelineTemplate[] = [
  /* ── 1. KI-Bild-Generator ── */
  {
    id: "ai-image",
    name: "KI-Bild-Generator",
    description: "Prompt → Generator → Ausgabe mit Qualitätsprüfung",
    badge: "AI",
    badgeColor: "#B5EAD7",
    canvasHeight: 460,
    nodes: [
      { id: "t1",  type: "trigger",   x: 40,  y: 175, label: "Workflow Start",   placeholder: "on:submit" },
      { id: "p1",  type: "text",      x: 290, y: 70,  label: "Stil-Prompt",      placeholder: "Cyberpunk, neon lights, rain…", status: "success" },
      { id: "p2",  type: "text",      x: 290, y: 270, label: "Negativ-Prompt",   placeholder: "blurry, low quality…" },
      { id: "g1",  type: "generator", x: 630, y: 90,  label: "Volt Image Gen",   model: "VOLT.1", imageColor: "#1A2030", status: "running" },
      { id: "d1",  type: "decision",  x: 1010,y: 150, label: "Qualitätsprüfung", placeholder: "score >= 0.85" },
      { id: "o1",  type: "output",    x: 1340,y: 80,  label: "Veröffentlichen",  meta: { format: "PNG · WebP" } },
      { id: "o2",  type: "output",    x: 1340,y: 260, label: "Verwerfen",        meta: { format: "Log · Retry" }, status: "disabled" },
    ],
    edges: [
      { id: "e1", from: "t1", to: "p1", animated: true, color: "#E4FF97", pulseCount: 1 },
      { id: "e2", from: "t1", to: "p2", animated: true, color: "#E4FF97" },
      { id: "e3", from: "p1", to: "g1", animated: true, color: "#B5EAD7", pulseCount: 1 },
      { id: "e4", from: "p2", to: "g1", color: "#B5EAD7" },
      { id: "e5", from: "g1", to: "d1", animated: true, color: "#B5EAD7", pulseCount: 2, label: "result" },
      { id: "e6", from: "d1", to: "o1", color: "#6DDBA0", label: "TRUE" },
      { id: "e7", from: "d1", to: "o2", fromPort: "bottom", toPort: "left", color: "#FF6B6B", label: "FALSE" },
    ],
  },

  /* ── 2. API-Daten-Pipeline ── */
  {
    id: "api-pipeline",
    name: "API-Daten-Pipeline",
    description: "Webhook → Fetch → Transform → Speichern",
    badge: "ETL",
    badgeColor: "#80DEEA",
    canvasHeight: 420,
    nodes: [
      { id: "wh", type: "webhook",   x: 40,  y: 155, label: "Eingehender Hook", meta: { event: "POST /ingest", payload: '{ "source": "crm" }' } },
      { id: "a1", type: "api",       x: 370, y: 155, label: "CRM API Fetch",    meta: { method: "GET", endpoint: "/contacts", body: '{ "limit": 100 }', status: "200 OK" }, status: "success" },
      { id: "tr", type: "transform", x: 720, y: 155, label: "Normalize",        placeholder: "map(c => ({ id, email }))" },
      { id: "dt", type: "data",      x: 1050,y: 80,  label: "Staging DB" },
      { id: "a2", type: "api",       x: 1050,y: 265, label: "Notify Slack",     meta: { method: "POST", endpoint: "/slack/msg", body: '{ "text": "Done" }', status: "200 OK" } },
      { id: "ou", type: "output",    x: 1400,y: 155, label: "Fertig",           meta: { format: "JSON · DB" } },
    ],
    edges: [
      { id: "e1", from: "wh", to: "a1", animated: true, color: "#FF9E80", pulseCount: 1 },
      { id: "e2", from: "a1", to: "tr", animated: true, color: "#80DEEA", pulseCount: 1 },
      { id: "e3", from: "tr", to: "dt", color: "#F8BBD9" },
      { id: "e4", from: "tr", to: "a2", color: "#F8BBD9" },
      { id: "e5", from: "dt", to: "ou", color: "#FFB7C5" },
      { id: "e6", from: "a2", to: "ou", color: "#80DEEA" },
    ],
  },

  /* ── 3. Content-Moderations-Pipeline ── */
  {
    id: "moderation",
    name: "Content-Moderation",
    description: "Text → Analyse → Entscheidungsbaum → Routing",
    badge: "LOGIC",
    badgeColor: "#FFE08A",
    canvasHeight: 500,
    groups: [
      { id: "g1", label: "ANALYSE", x: 270, y: 20, width: 500, height: 400, color: "#FFE08A" },
    ],
    nodes: [
      { id: "in", type: "text",     x: 40,  y: 210, label: "User Input",     placeholder: "Eingehender Kommentar…" },
      { id: "a1", type: "api",      x: 300, y: 70,  label: "Toxizitäts-API", meta: { method: "POST", endpoint: "/moderate", body: '{ "text": "…" }', status: "200 OK" }, status: "running" },
      { id: "a2", type: "api",      x: 300, y: 280, label: "Spam-Detektor",  meta: { method: "POST", endpoint: "/spam",     body: '{ "text": "…" }', status: "200 OK" } },
      { id: "d1", type: "decision", x: 660, y: 175, label: "Toxic?",         placeholder: "score > 0.7" },
      { id: "d2", type: "decision", x: 990, y: 70,  label: "Spam?",          placeholder: "spam_prob > 0.8" },
      { id: "o1", type: "output",   x: 1320,y: 30,  label: "Blockieren",     meta: { format: "Ban · Log" } },
      { id: "o2", type: "output",   x: 1320,y: 200, label: "Review-Queue",   meta: { format: "Ticket" } },
      { id: "o3", type: "output",   x: 1320,y: 370, label: "Freigeben",      meta: { format: "Publish" } },
    ],
    edges: [
      { id: "e1", from: "in", to: "a1", animated: true, color: "#A8D8FF", pulseCount: 1 },
      { id: "e2", from: "in", to: "a2", animated: true, color: "#A8D8FF" },
      { id: "e3", from: "a1", to: "d1", color: "#FFE08A" },
      { id: "e4", from: "a2", to: "d1", fromPort: "bottom", toPort: "bottom", color: "#FFE08A" },
      { id: "e5", from: "d1", to: "d2", color: "#6DDBA0", label: "FALSE" },
      { id: "e6", from: "d1", to: "o2", fromPort: "bottom", toPort: "left", color: "#FF6B6B", label: "TRUE" },
      { id: "e7", from: "d2", to: "o1", color: "#FF6B6B", label: "TRUE" },
      { id: "e8", from: "d2", to: "o3", fromPort: "bottom", toPort: "left", color: "#6DDBA0", label: "FALSE" },
    ],
  },

  /* ── 4. Multi-Modal-Workflow ── */
  {
    id: "multimodal",
    name: "Multi-Modal-Workflow",
    description: "Bild + Text → KI-Analyse → Strukturierte Ausgabe",
    badge: "MM",
    badgeColor: "#C9B8FF",
    canvasHeight: 500,
    nodes: [
      { id: "t1",  type: "trigger",   x: 40,  y: 200, label: "Start",         placeholder: "on:upload" },
      { id: "im",  type: "image",     x: 300, y: 70,  label: "Eingabebild",   imageColor: "#1A1A2E" },
      { id: "tx",  type: "text",      x: 300, y: 310, label: "Kontext-Text",  placeholder: "Beschreibe was analysiert werden soll…" },
      { id: "g1",  type: "generator", x: 640, y: 70,  label: "Vision-LLM",    model: "GPT-4V", imageColor: "#1A2030", status: "running" },
      { id: "tr",  type: "transform", x: 640, y: 310, label: "JSON-Parser",   placeholder: "JSON.parse(response)" },
      { id: "li",  type: "list",      x: 1020,y: 70,  label: "Erkannte Tags", items: ["Person", "Outdoor", "Sunny", "Portrait"] },
      { id: "dt",  type: "data",      x: 1020,y: 295, label: "Metadaten",     status: "success" },
      { id: "ou",  type: "output",    x: 1360,y: 185, label: "Ergebnis",      meta: { format: "JSON · Webhook" } },
      { id: "nt",  type: "note",      x: 40,  y: 380, label: "Hinweis",       placeholder: "Bilder max. 4MB · JPEG/PNG/WebP" },
    ],
    edges: [
      { id: "e1", from: "t1",  to: "im",  animated: true, color: "#E4FF97", pulseCount: 1 },
      { id: "e2", from: "t1",  to: "tx",  animated: true, color: "#E4FF97" },
      { id: "e3", from: "im",  to: "g1",  animated: true, color: "#C9B8FF", pulseCount: 1 },
      { id: "e4", from: "tx",  to: "tr",  color: "#A8D8FF" },
      { id: "e5", from: "g1",  to: "li",  animated: true, color: "#B5EAD7", pulseCount: 1 },
      { id: "e6", from: "tr",  to: "dt",  color: "#F8BBD9" },
      { id: "e7", from: "li",  to: "ou",  color: "#C9B8FF" },
      { id: "e8", from: "dt",  to: "ou",  color: "#FFB7C5" },
    ],
  },

  /* ── 5. Scheduled-Report-Pipeline ── */
  {
    id: "report",
    name: "Scheduled Report",
    description: "Cron → Daten abrufen → Aufbereiten → Versenden",
    badge: "CRON",
    badgeColor: "#FFD6A5",
    canvasHeight: 420,
    nodes: [
      { id: "cr",  type: "trigger",   x: 40,  y: 155, label: "Cron: täglich 08:00", meta: { event: "0 8 * * *" } },
      { id: "a1",  type: "api",       x: 310, y: 70,  label: "Analytics API",      meta: { method: "GET", endpoint: "/stats/daily", body: "", status: "200 OK" }, status: "success" },
      { id: "a2",  type: "api",       x: 310, y: 265, label: "Revenue API",         meta: { method: "GET", endpoint: "/revenue",     body: "", status: "200 OK" }, status: "success" },
      { id: "tr",  type: "transform", x: 670, y: 165, label: "Report Builder",     placeholder: "merge(analytics, revenue)" },
      { id: "g1",  type: "generator", x: 1000,y: 165, label: "PDF Generator",      model: "Puppeteer", imageColor: "#2A1A10" },
      { id: "wh",  type: "webhook",   x: 1380,y: 70,  label: "E-Mail Versand",     meta: { event: "POST /send-email", payload: '{ "to": "team@…" }' } },
      { id: "dt",  type: "data",      x: 1380,y: 265, label: "Report-Archiv",      status: "success" },
    ],
    edges: [
      { id: "e1", from: "cr",  to: "a1",  animated: true, color: "#FFD6A5", pulseCount: 1 },
      { id: "e2", from: "cr",  to: "a2",  animated: true, color: "#FFD6A5" },
      { id: "e3", from: "a1",  to: "tr",  color: "#80DEEA" },
      { id: "e4", from: "a2",  to: "tr",  color: "#80DEEA" },
      { id: "e5", from: "tr",  to: "g1",  animated: true, color: "#F8BBD9", pulseCount: 1 },
      { id: "e6", from: "g1",  to: "wh",  animated: true, color: "#FFD6A5", pulseCount: 1 },
      { id: "e7", from: "g1",  to: "dt",  color: "#FFD6A5" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   EDGE-STIL-DEMOS
══════════════════════════════════════════════════════════════════════════════ */

const EDGE_STYLE_DEMOS: Array<{
  style: EdgeStyle;
  label: string;
  desc: string;
  useCase: string;
}> = [
  { style: "bezier",     label: "Bezier",     desc: "Geschwungene Kurven – Standard",    useCase: "Allgemeine Verbindungen" },
  { style: "straight",   label: "Straight",   desc: "Direkte Geraden ohne Kurven",       useCase: "Einfache Abhängigkeiten" },
  { style: "step",       label: "Step",       desc: "Rechtwinklige L-Verbindungen",      useCase: "Hierarchische Strukturen" },
  { style: "smoothstep", label: "Smoothstep", desc: "Abgerundete Ecken, orthogonal",     useCase: "Flowcharts & Diagramme" },
];

function EdgeStyleDemo({ style, isDark }: { style: EdgeStyle; isDark: boolean }) {
  const nodes: CanvasNode[] = [
    { id: "a", type: "trigger",  x: 20,  y: 55, width: 110, height: 60, label: "Von" },
    { id: "b", type: "output",   x: 230, y: 55, width: 110, height: 60, label: "Nach" },
  ];
  const edges: CanvasEdge[] = [
    { id: "e", from: "a", to: "b", style, color: "#E4FF97", animated: true },
  ];
  return (
    <VoltNodeCanvas
      nodes={nodes} edges={edges}
      height={170} showGrid={false}
      className="rounded-lg"
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   NODE-STATUS-DEMOS
══════════════════════════════════════════════════════════════════════════════ */

const STATUS_LIST: Array<{ status: NodeStatus; label: string; desc: string; color: string }> = [
  { status: "idle",     label: "Idle",     desc: "Wartet auf Ausführung",     color: "rgba(255,255,255,0.15)" },
  { status: "running",  label: "Running",  desc: "Wird gerade ausgeführt",    color: "#E4FF97" },
  { status: "success",  label: "Success",  desc: "Erfolgreich abgeschlossen", color: "#6DDBA0" },
  { status: "error",    label: "Error",    desc: "Fehler aufgetreten",        color: "#FF6B6B" },
  { status: "warning",  label: "Warning",  desc: "Warnung – Prüfen nötig",    color: "#FFD93D" },
  { status: "disabled", label: "Disabled", desc: "Deaktiviert / Übersprungen",color: "#666666" },
];

/* ══════════════════════════════════════════════════════════════════════════════
   NODE-TYPEN-GALERIE
══════════════════════════════════════════════════════════════════════════════ */

const ALL_NODE_TYPES: NodeType[] = [
  "trigger", "text", "image", "generator", "list", "data",
  "decision", "api", "transform", "output", "webhook", "note",
];

const NODE_TYPE_DESC: Record<NodeType, string> = {
  trigger:   "Startet den Workflow",
  text:      "Texteingabe / Prompt",
  image:     "Bild-Eingabe oder -Ausgabe",
  generator: "KI-Generierung (Text/Bild)",
  list:      "Aufzählung von Elementen",
  data:      "Datensatz / Tabelle",
  decision:  "Verzweigung (if/else)",
  api:       "HTTP-API-Aufruf",
  transform: "Daten-Transformation",
  output:    "Ergebnis-Ausgabe",
  webhook:   "Eingehender Webhook",
  note:      "Kommentar / Annotation",
};

/* ══════════════════════════════════════════════════════════════════════════════
   KONFIGURATIONS-PANEL
══════════════════════════════════════════════════════════════════════════════ */

interface ConfigPanelProps {
  nodeType: NodeType;
  isDark: boolean;
  onClose: () => void;
}

function ConfigPanel({ nodeType, isDark, onClose }: ConfigPanelProps) {
  const typeColor = isDark ? NODE_COLORS[nodeType] : NODE_COLORS_LIGHT[nodeType];
  const Icon = NODE_ICONS[nodeType];
  const defaults = NODE_DEFAULTS[nodeType];

  const fields: Array<{ key: string; label: string; type: "text" | "select" | "number"; options?: string[] }> = (() => {
    switch (nodeType) {
      case "trigger":   return [{ key: "event",    label: "Event",       type: "text"   }, { key: "schedule", label: "Schedule", type: "text" }];
      case "text":      return [{ key: "content",  label: "Inhalt",      type: "text"   }, { key: "maxLen",   label: "Max. Länge", type: "number" }];
      case "image":     return [{ key: "url",      label: "Bild-URL",    type: "text"   }, { key: "bgColor",  label: "Hintergrund", type: "text" }];
      case "generator": return [{ key: "content",  label: "Prompt",      type: "text"   }, { key: "model",    label: "Modell", type: "select", options: ["Auto", "VOLT.1", "GPT-4V", "DALL-E 3", "Stable Diffusion"] }];
      case "list":      return [{ key: "items",    label: "Einträge",    type: "text"   }];
      case "data":      return [{ key: "source",   label: "Datenquelle", type: "text"   }, { key: "limit",    label: "Limit", type: "number" }];
      case "decision":  return [{ key: "content",  label: "Bedingung",   type: "text"   }, { key: "operator", label: "Operator", type: "select", options: ["==", "!=", ">", "<", ">=", "<=", "includes"] }];
      case "api":       return [{ key: "endpoint", label: "Endpoint",    type: "text"   }, { key: "method",   label: "Methode", type: "select", options: ["GET", "POST", "PUT", "PATCH", "DELETE"] }];
      case "transform": return [{ key: "content",  label: "Funktion",    type: "text"   }, { key: "lang",     label: "Sprache", type: "select", options: ["JavaScript", "Python", "JSONata"] }];
      case "output":    return [{ key: "format",   label: "Format",      type: "select", options: ["JSON", "CSV", "PDF", "Webhook", "Email"] }];
      case "webhook":   return [{ key: "event",    label: "Event-URL",   type: "text"   }, { key: "payload",  label: "Payload-Schema", type: "text" }];
      case "note":      return [{ key: "content",  label: "Text",        type: "text"   }];
      default:          return [];
    }
  })();

  const bg    = isDark ? "#161616" : "#FFFFFF";
  const card  = isDark ? "#1E1E1E" : "#F8F8F8";
  const border= isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const text  = isDark ? "rgba(255,255,255,0.80)" : "rgba(0,0,0,0.78)";
  const muted = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.55)";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  return (
    <div style={{
      width: 280, background: bg, borderRadius: 14,
      border: `1px solid ${border}`,
      boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.50)" : "0 8px 32px rgba(0,0,0,0.12)",
      overflow: "hidden", flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "12px 14px",
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        borderBottom: `1px solid ${border}`,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: `${typeColor}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={14} style={{ color: typeColor }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontFamily: '"DM Mono", monospace', fontWeight: 600, color: text }}>
            {defaults.label}
          </div>
          <div style={{ fontSize: 10, color: muted, fontFamily: '"DM Mono", monospace' }}>
            {nodeType.toUpperCase()} · {defaults.width}×{defaults.height}px
          </div>
        </div>
        <button onClick={onClose} style={{
          width: 22, height: 22, borderRadius: 6, border: `1px solid ${border}`,
          background: "transparent", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: muted, fontSize: 14,
        }}>×</button>
      </div>

      {/* Felder */}
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Farb-Chip */}
        <div>
          <div style={{ fontSize: 10, color: muted, fontFamily: '"DM Mono", monospace', marginBottom: 6, letterSpacing: "0.06em" }}>
            AKZENTFARBE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: typeColor, border: `1px solid ${border}` }} />
            <span style={{ fontSize: 11, fontFamily: '"DM Mono", monospace', color: text }}>{typeColor}</span>
          </div>
        </div>

        {/* Konfigurationsfelder */}
        {fields.map(field => (
          <div key={field.key}>
            <div style={{ fontSize: 10, color: muted, fontFamily: '"DM Mono", monospace', marginBottom: 5, letterSpacing: "0.06em" }}>
              {field.label.toUpperCase()}
            </div>
            {field.type === "select" ? (
              <div style={{
                padding: "6px 10px",
                background: inputBg, borderRadius: 7,
                border: `1px solid ${border}`,
                fontSize: 11, fontFamily: '"DM Mono", monospace', color: text,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span>{field.options?.[0]}</span>
                <ChevronRight size={12} style={{ color: muted, transform: "rotate(90deg)" }} />
              </div>
            ) : (
              <div style={{
                padding: "6px 10px",
                background: inputBg, borderRadius: 7,
                border: `1px solid ${border}`,
                fontSize: 11, fontFamily: '"DM Mono", monospace', color: muted,
              }}>
                {field.type === "number" ? "100" : "Eingabe…"}
              </div>
            )}
          </div>
        ))}

        {/* Node-Beschreibung */}
        <div style={{
          padding: "10px 12px",
          background: `${typeColor}0D`,
          borderRadius: 8,
          border: `1px solid ${typeColor}22`,
          display: "flex", gap: 8,
        }}>
          <Info size={13} style={{ color: typeColor, flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 11, color: text, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.55 }}>
            {NODE_TYPE_DESC[nodeType]}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PROPS-TABELLE
══════════════════════════════════════════════════════════════════════════════ */

const CANVAS_PROPS = [
  { prop: "nodes",          type: "CanvasNode[]",  req: "✓", desc: "Array aller Nodes im Canvas" },
  { prop: "edges",          type: "CanvasEdge[]",  req: "–", desc: "Verbindungen zwischen Nodes" },
  { prop: "groups",         type: "CanvasGroup[]", req: "–", desc: "Farbige Gruppen-Container" },
  { prop: "height",         type: "number",        req: "–", desc: "Canvas-Höhe in px (Standard: 500)" },
  { prop: "showGrid",       type: "boolean",       req: "–", desc: "Dotted-Grid anzeigen (Standard: true)" },
  { prop: "onNodeChange",   type: "function",      req: "–", desc: "Callback bei Node-Verschiebung/Resize" },
  { prop: "onNodeSelect",   type: "function",      req: "–", desc: "Callback bei Node-Selektion" },
];

const NODE_PROPS = [
  { prop: "id",       type: "string",     req: "✓", desc: "Eindeutige Node-ID" },
  { prop: "type",     type: "NodeType",   req: "✓", desc: "Einer der 12 Node-Typen" },
  { prop: "x / y",   type: "number",     req: "✓", desc: "Position im Canvas (px)" },
  { prop: "label",    type: "string",     req: "–", desc: "Angezeigter Name im Header" },
  { prop: "status",   type: "NodeStatus", req: "–", desc: "idle | running | success | error | warning | disabled" },
  { prop: "meta",     type: "object",     req: "–", desc: "Typ-spezifische Daten (content, url, method, …)" },
  { prop: "width",    type: "number",     req: "–", desc: "Breite in px (Standard je nach Typ)" },
  { prop: "height",   type: "number",     req: "–", desc: "Höhe in px (Standard je nach Typ)" },
];

const EDGE_PROPS = [
  { prop: "id",         type: "string",    req: "✓", desc: "Eindeutige Edge-ID" },
  { prop: "from / to",  type: "string",    req: "✓", desc: "Node-IDs der Verbindungsenden" },
  { prop: "style",      type: "EdgeStyle", req: "–", desc: "bezier | straight | step | smoothstep" },
  { prop: "animated",   type: "boolean",   req: "–", desc: "Animierte gestrichelte Linie" },
  { prop: "pulseCount", type: "number",    req: "–", desc: "Anzahl Datenfluss-Partikel (1–3)" },
  { prop: "color",      type: "string",    req: "–", desc: "Hex-Farbe der Edge" },
  { prop: "label",      type: "string",    req: "–", desc: "Beschriftung in der Mitte" },
  { prop: "fromPort",   type: "string",    req: "–", desc: "right | bottom | left | top" },
  { prop: "toPort",     type: "string",    req: "–", desc: "right | bottom | left | top" },
];

/* ══════════════════════════════════════════════════════════════════════════════
   HAUPT-SECTION
══════════════════════════════════════════════════════════════════════════════ */

const NodeCanvasSection: React.FC = () => {
  const { darkMode } = useTheme();
  const isDark = darkMode === "dark";

  const [activePipeline, setActivePipeline] = useState(0);
  const [selectedNodeType, setSelectedNodeType] = useState<NodeType | null>(null);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"canvas" | "props" | "code">("canvas");

  const pipeline = PIPELINES[activePipeline];

  const bg    = isDark ? "#0A0A0A" : "#FAFAFA";
  const card  = isDark ? "#141414" : "#FFFFFF";
  const border= isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const text  = isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.78)";
  const muted = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.55)";
  /* singleNodeGallery: alle 12 Typen als einzelne Mini-Canvas */
  const galleryNodes = useMemo<CanvasNode[]>(() =>
    ALL_NODE_TYPES.map((type, i) => ({
      id: `gallery-${type}`,
      type,
      x: 20 + i * (NODE_DEFAULTS[type].width + 20),
      y: 20,
      label: NODE_DEFAULTS[type].label,
      status: type === "generator" ? "running" : type === "output" ? "success" : "idle",
      meta: type === "api"
        ? { method: "GET", endpoint: "/api/data", body: "", status: "200 OK" }
        : type === "decision"
        ? { content: "score > 0.8" }
        : type === "transform"
        ? { content: "map(x => x.value)" }
        : type === "webhook"
        ? { event: "POST /hook", payload: '{ "id": 42 }' }
        : type === "note"
        ? { content: "Dokumentation hier…" }
        : undefined,
      items: type === "list" ? ["Element A", "Element B", "Element C"] : undefined,
      imageColor: type === "image" ? (isDark ? "#1A1A2E" : "#E8EAF6") : undefined,
    })), [isDark]);

  const galleryWidth = ALL_NODE_TYPES.reduce((acc, t) => acc + NODE_DEFAULTS[t].width + 20, 20);

  /* Props-Tabelle */
  function PropsTable({ rows, title }: { rows: typeof CANVAS_PROPS; title: string }) {
    return (
      <div>
        <h4 style={{ fontSize: 12, fontFamily: '"DM Mono", monospace', color: muted, marginBottom: 8, letterSpacing: "0.08em" }}>
          {title}
        </h4>
        <div style={{ border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                {["Prop", "Typ", "Req.", "Beschreibung"].map(h => (
                  <th key={h} style={{
                    padding: "8px 12px", textAlign: "left",
                    fontSize: 10, fontFamily: '"DM Mono", monospace',
                    fontWeight: 600, color: muted,
                    borderBottom: `1px solid ${border}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.prop} style={{ background: i % 2 === 0 ? card : (isDark ? "#181818" : "#F5F5F5") }}>
                  <td style={{ padding: "8px 12px", fontSize: 11, fontFamily: '"DM Mono", monospace', color: "#E4FF97", fontWeight: 600 }}>{row.prop}</td>
                  <td style={{ padding: "8px 12px", fontSize: 10, fontFamily: '"DM Mono", monospace', color: "#80DEEA" }}>{row.type}</td>
                  <td style={{ padding: "8px 12px", fontSize: 12, color: row.req === "✓" ? "#6DDBA0" : muted, textAlign: "center" }}>{row.req}</td>
                  <td style={{ padding: "8px 12px", fontSize: 11, color: text, lineHeight: 1.5 }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* ── Titel ── */}
      <div>
        <SectionLabel>Templates &amp; Visualisierung</SectionLabel>
        <h2 className="font-display font-bold text-3xl text-foreground mb-4">
          Node Canvas
        </h2>
        <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, maxWidth: 640 }}>
          Ein interaktives Canvas-System für visuelle Workflows, KI-Pipelines und Datenflüsse.
          12 Node-Typen, 4 Edge-Stile, 6 Status-Zustände und vollständige Drag-Interaktion.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          1. NODE-TYPEN-GALERIE
      ══════════════════════════════════════════════════════════════════ */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 className="font-display font-bold text-xl text-foreground">
            Node-Typen <span style={{ fontSize: 13, color: muted, fontWeight: 400, fontFamily: '"DM Mono", monospace' }}>(12)</span>
          </h3>
          <div style={{
            fontSize: 10, fontFamily: '"DM Mono", monospace', color: muted,
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            padding: "4px 10px", borderRadius: 6,
          }}>
            Klick → Konfigurations-Panel
          </div>
        </div>

        {/* Galerie-Canvas */}
        <div style={{ overflowX: "auto", borderRadius: 12 }}>
        <VoltNodeCanvas
          nodes={galleryNodes}
          height={340}
          showGrid={false}
          className="rounded-xl"
            onNodeSelect={id => {
              if (id) {
                const node = galleryNodes.find(n => n.id === id);
                if (node) {
                  setSelectedNodeType(node.type);
                  setShowConfigPanel(true);
                }
              }
            }}
          />
        </div>

        {/* Typ-Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {ALL_NODE_TYPES.map(type => {
            const color = isDark ? NODE_COLORS[type] : NODE_COLORS_LIGHT[type];
            const Icon = NODE_ICONS[type];
            const isActive = selectedNodeType === type;
            return (
              <button key={type}
                onClick={() => { setSelectedNodeType(type); setShowConfigPanel(true); }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "5px 10px", borderRadius: 8,
                  border: `1px solid ${isActive ? color : border}`,
                  background: isActive ? `${color}18` : "transparent",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                <Icon size={11} style={{ color }} />
                <span style={{ fontSize: 11, fontFamily: '"DM Mono", monospace', color: isActive ? color : muted }}>
                  {type}
                </span>
              </button>
            );
          })}
        </div>

        {/* Konfigurations-Panel */}
        {showConfigPanel && selectedNodeType && (
          <div style={{ marginTop: 20 }}>
            <ConfigPanel
              nodeType={selectedNodeType}
              isDark={isDark}
              onClose={() => setShowConfigPanel(false)}
            />
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          2. PIPELINE-TEMPLATES
      ══════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-6">
          Pipeline-Templates
        </h3>

        {/* Template-Auswahl */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          {PIPELINES.map((p, i) => (
            <button key={p.id}
              onClick={() => setActivePipeline(i)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 14px", borderRadius: 10,
                border: `1px solid ${activePipeline === i ? p.badgeColor : border}`,
                background: activePipeline === i ? `${p.badgeColor}18` : "transparent",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              <span style={{
                fontSize: 9, fontFamily: '"DM Mono", monospace', fontWeight: 700,
                padding: "2px 6px", borderRadius: 4,
                background: `${p.badgeColor}22`,
                color: p.badgeColor,
                letterSpacing: "0.08em",
              }}>{p.badge}</span>
              <span style={{
                fontSize: 12, fontFamily: '"DM Mono", monospace',
                color: activePipeline === i ? text : muted,
              }}>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Pipeline-Info */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
          padding: "10px 14px", borderRadius: 10,
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
          border: `1px solid ${border}`,
        }}>
          <Layers size={14} style={{ color: pipeline.badgeColor, flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: 13, fontFamily: '"DM Mono", monospace', fontWeight: 600, color: text }}>
              {pipeline.name}
            </span>
            <span style={{ fontSize: 12, color: muted, marginLeft: 10, fontFamily: '"DM Sans", sans-serif' }}>
              {pipeline.description}
            </span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
            <span style={{ fontSize: 10, color: muted, fontFamily: '"DM Mono", monospace' }}>
              {pipeline.nodes.length} Nodes
            </span>
            <span style={{ fontSize: 10, color: muted, fontFamily: '"DM Mono", monospace' }}>
              {pipeline.edges.length} Edges
            </span>
          </div>
        </div>

        {/* Canvas */}
        <VoltNodeCanvas
          key={pipeline.id}
          nodes={pipeline.nodes}
          edges={pipeline.edges}
          groups={pipeline.groups}
          height={pipeline.canvasHeight}
          showGrid
          className="rounded-xl"
        />

        {/* Node-Status-Legende */}
        <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
          {pipeline.nodes
            .filter(n => n.status && n.status !== "idle")
            .map(n => {
              const statusInfo = STATUS_LIST.find(s => s.status === n.status);
              if (!statusInfo) return null;
              return (
                <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusInfo.color }} />
                  <span style={{ fontSize: 10, color: muted, fontFamily: '"DM Mono", monospace' }}>
                    {n.label}: {statusInfo.label}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          3. EDGE-STILE
      ══════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-6">
          Edge-Stile
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
          {EDGE_STYLE_DEMOS.map(demo => (
            <div key={demo.style} style={{
              padding: "18px 18px 14px",
              background: card, borderRadius: 14,
              border: `1px solid ${border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <span style={{
                    fontSize: 12, fontFamily: '"DM Mono", monospace',
                    fontWeight: 700, color: text,
                  }}>{demo.label}</span>
                  <span style={{
                    fontSize: 10, color: muted, marginLeft: 8,
                    fontFamily: '"DM Sans", sans-serif',
                  }}>{demo.desc}</span>
                </div>
                <span style={{
                  fontSize: 9, fontFamily: '"DM Mono", monospace',
                  color: "#80DEEA",
                  background: isDark ? "rgba(128,222,234,0.10)" : "rgba(128,222,234,0.15)",
                  padding: "2px 7px", borderRadius: 4,
                }}>style="{demo.style}"</span>
              </div>
              <EdgeStyleDemo style={demo.style} isDark={isDark} />
              <div style={{ marginTop: 8, fontSize: 10, color: muted, fontFamily: '"DM Sans", sans-serif' }}>
                Empfohlen für: {demo.useCase}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          4. NODE-STATUS
      ══════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-6">
          Node-Status
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {STATUS_LIST.map(s => (
            <div key={s.status} style={{
              padding: "16px",
              background: card, borderRadius: 12,
              border: `1px solid ${s.status !== "idle" ? `${s.color}33` : border}`,
            }}>
            <VoltNodeCanvas
              nodes={[{
                id: `status-${s.status}`,
                type: "api",
                x: 20, y: 20,
                width: 220, height: 120,
                label: `API-Call`,
                status: s.status,
                meta: { method: "GET", endpoint: "/status", body: "", status: s.label },
              }]}
              height={165}
              showGrid={false}
            />
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                  <span style={{ fontSize: 12, fontFamily: '"DM Mono", monospace', fontWeight: 600, color: s.color }}>
                    {s.label}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: muted, fontFamily: '"DM Sans", sans-serif' }}>
                  {s.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          5. TABS: CODE / PROPS
      ══════════════════════════════════════════════════════════════════ */}
      <div>
        {/* Tab-Bar */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: `1px solid ${border}`, paddingBottom: 0 }}>
          {([
            { id: "canvas", label: "Interaktives Beispiel", icon: Layers },
            { id: "props",  label: "Props-Referenz",        icon: Settings },
            { id: "code",   label: "Code-Beispiel",         icon: Code2 },
          ] as const).map(tab => (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px",
                border: "none", background: "transparent",
                borderBottom: `2px solid ${activeTab === tab.id ? "#E4FF97" : "transparent"}`,
                cursor: "pointer", transition: "all 0.15s",
                marginBottom: -1,
              }}
            >
              <tab.icon size={13} style={{ color: activeTab === tab.id ? "#E4FF97" : muted }} />
              <span style={{
                fontSize: 12, fontFamily: '"DM Mono", monospace',
                color: activeTab === tab.id ? text : muted,
              }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab-Inhalt */}
        {activeTab === "canvas" && (
          <div>
            <p style={{ fontSize: 13, color: muted, marginBottom: 16, fontFamily: '"DM Sans", sans-serif' }}>
              Vollständig interaktiver Canvas mit allen 12 Node-Typen, Gruppen und animierten Edges.
              Mittlere Maustaste zum Panning, Scroll zum Zoomen.
            </p>
            <VoltNodeCanvas
              nodes={[
                { id: "wh",  type: "webhook",   x: 40,  y: 50,  label: "Eingehend",       meta: { event: "POST /trigger", payload: '{ "run": true }' } },
                { id: "t1",  type: "trigger",   x: 40,  y: 260, label: "Manuell",         placeholder: "on:click" },
                { id: "tx",  type: "text",      x: 380, y: 50,  label: "Prompt",          placeholder: "Erstelle eine Zusammenfassung von…" },
                { id: "dt",  type: "data",      x: 380, y: 260, label: "Quelldaten",      status: "success" },
                { id: "tr",  type: "transform", x: 730, y: 155, label: "Merge & Format",  placeholder: "{ ...a, ...b }" },
                { id: "g1",  type: "generator", x: 1060,y: 50,  label: "LLM Generator",   model: "GPT-4o", imageColor: isDark ? "#1A2030" : "#E8EAF6", status: "running" },
                { id: "dc",  type: "decision",  x: 1060,y: 310, label: "Länge OK?",       placeholder: "tokens < 4096" },
                { id: "a1",  type: "api",       x: 1440,y: 50,  label: "Speichern",       meta: { method: "POST", endpoint: "/save", body: '{ "content": "…" }', status: "200 OK" } },
                { id: "nt",  type: "note",      x: 1440,y: 260, label: "Hinweis",         placeholder: "Max. 4096 Tokens pro Request" },
                { id: "ou",  type: "output",    x: 1440,y: 400, label: "Fertig",          meta: { format: "JSON · Webhook" }, status: "success" },
              ]}
              edges={[
                { id: "e1", from: "wh",  to: "tx",  animated: true, color: "#FF9E80", pulseCount: 1 },
                { id: "e2", from: "t1",  to: "dt",  animated: true, color: "#E4FF97" },
                { id: "e3", from: "tx",  to: "tr",  color: "#A8D8FF" },
                { id: "e4", from: "dt",  to: "tr",  color: "#FFB7C5" },
                { id: "e5", from: "tr",  to: "g1",  animated: true, color: "#F8BBD9", pulseCount: 2 },
                { id: "e6", from: "tr",  to: "dc",  color: "#FFE08A" },
                { id: "e7", from: "g1",  to: "a1",  animated: true, color: "#B5EAD7", pulseCount: 1 },
                { id: "e8", from: "dc",  to: "ou",  color: "#6DDBA0", label: "OK" },
                { id: "e9", from: "dc",  to: "nt",  fromPort: "bottom", toPort: "left", color: "#FF6B6B", label: "zu lang" },
                { id: "e10",from: "a1",  to: "ou",  color: "#B5EAD7" },
              ]}
              groups={[
                { id: "g1", label: "EINGABE",      x: 10,  y: 10, width: 680, height: 380, color: "#A8D8FF" },
                { id: "g2", label: "VERARBEITUNG", x: 700, y: 10, width: 320, height: 380, color: "#F8BBD9" },
              ]}
              height={560}
              showGrid
            />
          </div>
        )}

        {activeTab === "props" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <PropsTable rows={CANVAS_PROPS} title="VoltNodeCanvas Props" />
            <PropsTable rows={NODE_PROPS}   title="CanvasNode Props" />
            <PropsTable rows={EDGE_PROPS}   title="CanvasEdge Props" />
          </div>
        )}

        {activeTab === "code" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <CodeBlock label="Minimales Beispiel" code={`import { VoltNodeCanvas } from "@/components/volt/VoltNodeCanvas";

const nodes = [
  { id: "start", type: "trigger",   x: 30,  y: 80, label: "Start" },
  { id: "gen",   type: "generator", x: 240, y: 60, label: "LLM",
    model: "GPT-4o", status: "running" },
  { id: "out",   type: "output",    x: 550, y: 80, label: "Ergebnis",
    meta: { format: "JSON" } },
];

const edges = [
  { id: "e1", from: "start", to: "gen",  animated: true, pulseCount: 1, color: "#E4FF97" },
  { id: "e2", from: "gen",   to: "out",  animated: true, pulseCount: 2, color: "#B5EAD7" },
];

<VoltNodeCanvas nodes={nodes} edges={edges} height={300} showGrid />`} />

            <CodeBlock label="Decision-Pipeline mit Gruppen" code={`const nodes = [
  { id: "in",  type: "text",     x: 30,  y: 100, label: "Eingabe" },
  { id: "api", type: "api",      x: 280, y: 100, label: "Analyse",
    meta: { method: "POST", endpoint: "/analyze", body: "{}", status: "200 OK" } },
  { id: "dec", type: "decision", x: 560, y: 100, label: "Ergebnis OK?",
    meta: { content: "score >= 0.9" } },
  { id: "ok",  type: "output",   x: 820, y: 50,  label: "Veröffentlichen",
    meta: { format: "Webhook" } },
  { id: "err", type: "output",   x: 820, y: 180, label: "Review",
    meta: { format: "Ticket" }, status: "warning" },
];

const edges = [
  { id: "e1", from: "in",  to: "api", animated: true, pulseCount: 1 },
  { id: "e2", from: "api", to: "dec", animated: true, pulseCount: 1, color: "#80DEEA" },
  { id: "e3", from: "dec", to: "ok",  color: "#6DDBA0", label: "TRUE" },
  { id: "e4", from: "dec", to: "err", fromPort: "bottom", toPort: "left",
               color: "#FF6B6B", label: "FALSE", style: "smoothstep" },
];

const groups = [
  { id: "g1", label: "PIPELINE", x: 10, y: 20, width: 900, height: 260, color: "#FFE08A" },
];

<VoltNodeCanvas nodes={nodes} edges={edges} groups={groups} height={320} />`} />

            <CodeBlock label="Alle Node-Typen" code={`// Alle 12 Node-Typen:
type NodeType =
  | "trigger"    // Workflow-Startpunkt
  | "text"       // Texteingabe / Prompt
  | "image"      // Bild-Input/Output
  | "generator"  // KI-Generierung
  | "list"       // Aufzählung
  | "data"       // Datensatz / Tabelle
  | "decision"   // Verzweigung (if/else)
  | "api"        // HTTP-API-Aufruf
  | "transform"  // Daten-Transformation
  | "output"     // Ergebnis-Ausgabe
  | "webhook"    // Eingehender Webhook
  | "note";      // Kommentar / Annotation

// Alle 6 Status-Zustände:
type NodeStatus = "idle" | "running" | "success" | "error" | "warning" | "disabled";

// Alle 4 Edge-Stile:
type EdgeStyle = "bezier" | "straight" | "step" | "smoothstep";`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeCanvasSection;
