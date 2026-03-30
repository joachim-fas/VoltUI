/**
 * NodeCanvasSection
 * Design: Grain OS · Node Canvas System Dokumentation
 */

import React, { useState } from "react";
import { GrainNodeCanvas, CanvasNode, CanvasEdge, CanvasGroup } from "@/components/grain/GrainNodeCanvas";

/* ── SectionLabel ── */
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: 10, fontFamily: '"DM Mono", monospace',
    fontWeight: 600, letterSpacing: "0.12em",
    color: "#7A7A7A", textTransform: "uppercase",
    marginBottom: 12,
  }}>
    <span style={{ color: "#E4FF97" }}>&gt;_</span>
    {children}
  </div>
);

/* ── Code-Block ── */
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

/* ── Demo-Daten: Workflow ── */
const WORKFLOW_NODES: CanvasNode[] = [
  {
    id: "trigger",
    type: "trigger",
    x: 30, y: 160,
    label: "Start",
    placeholder: "Workflow starten",
    accent: true,
  },
  {
    id: "text-1",
    type: "text",
    x: 220, y: 80,
    label: "Prompt #1",
    placeholder: "Beschreibe den Charakter im Detail…",
  },
  {
    id: "text-2",
    type: "text",
    x: 220, y: 240,
    label: "Prompt #2",
    placeholder: "Wähle einen passenden Stil…",
  },
  {
    id: "gen-1",
    type: "generator",
    x: 490, y: 60,
    label: "Bild-Generator #1",
    placeholder: "Beschreibe das Bild…",
    model: "Auto",
    imageColor: "#1A2A1A",
    selected: true,
  },
  {
    id: "list-1",
    type: "list",
    x: 490, y: 290,
    label: "Varianten",
    items: ["Stil A – Minimalistisch", "Stil B – Editorial", "Stil C – Dramatisch"],
  },
  {
    id: "gen-2",
    type: "generator",
    x: 790, y: 150,
    label: "Bild-Generator #2",
    placeholder: "Kombinierter Output…",
    model: "GPT-5",
    imageColor: "#1A1A2A",
  },
];

const WORKFLOW_EDGES: CanvasEdge[] = [
  { id: "e1", from: "trigger", to: "text-1", fromPort: "right", toPort: "left" },
  { id: "e2", from: "trigger", to: "text-2", fromPort: "right", toPort: "left" },
  { id: "e3", from: "text-1", to: "gen-1", fromPort: "right", toPort: "left", animated: true, color: "#6DDBA0" },
  { id: "e4", from: "text-2", to: "list-1", fromPort: "right", toPort: "left" },
  { id: "e5", from: "gen-1", to: "gen-2", fromPort: "right", toPort: "left", animated: true, color: "#6DDBA0" },
  { id: "e6", from: "list-1", to: "gen-2", fromPort: "right", toPort: "left" },
];

/* ── Demo-Daten: Gruppen ── */
const GROUP_NODES: CanvasNode[] = [
  { id: "g-img1", type: "image", x: 60,  y: 60,  label: "Charakter #1", imageColor: "#2A2030" },
  { id: "g-img2", type: "image", x: 280, y: 60,  label: "Charakter #2", imageColor: "#1A2A30" },
  { id: "g-img3", type: "image", x: 60,  y: 270, label: "Szene #1",     imageColor: "#1A2A1A" },
  { id: "g-img4", type: "image", x: 280, y: 270, label: "Szene #2",     imageColor: "#2A1A1A" },
  { id: "g-text", type: "text",  x: 540, y: 150, label: "Beschreibung", placeholder: "Kombiniere Charakter und Szene…" },
  { id: "g-gen",  type: "generator", x: 790, y: 100, label: "Final Output", model: "Auto", imageColor: "#1E1E2A" },
];

const GROUP_GROUPS: CanvasGroup[] = [
  { id: "grp-char", label: "Charaktere", x: 30,  y: 30,  width: 490, height: 220, color: "#7AB8F5" },
  { id: "grp-scene",label: "Szenen",     x: 30,  y: 240, width: 490, height: 220, color: "#6DDBA0" },
];

const GROUP_EDGES: CanvasEdge[] = [
  { id: "ge1", from: "g-img1", to: "g-text", fromPort: "right", toPort: "left" },
  { id: "ge2", from: "g-img3", to: "g-text", fromPort: "right", toPort: "left" },
  { id: "ge3", from: "g-text", to: "g-gen",  fromPort: "right", toPort: "left", animated: true, color: "#6DDBA0" },
];

/* ── Anatomie-Karten ── */
const ANATOMY = [
  {
    title: "Node",
    desc: "Grundbaustein des Canvas. Jeder Node hat einen Typ, einen Header mit Label und Icon, einen Body mit typspezifischem Inhalt sowie Input- und Output-Ports.",
    color: "#7AB8F5",
  },
  {
    title: "Port",
    desc: "Kleine Kreise an den Kanten eines Nodes. Input-Ports (links) empfangen Daten, Output-Ports (rechts) senden sie. Ports sind der Verbindungspunkt für Edges.",
    color: "#6DDBA0",
  },
  {
    title: "Edge",
    desc: "Bezier-Kurve zwischen zwei Ports. Statische Edges zeigen Datenfluss, animierte (gestrichelte) Edges zeigen aktive Verbindungen.",
    color: "#F4A0B5",
  },
  {
    title: "Gruppe",
    desc: "Farbiger Container, der mehrere Nodes zusammenfasst. Gruppen haben ein Label und eine eigene Farbe aus der Pastell-Palette.",
    color: "#F5C87A",
  },
  {
    title: "Canvas",
    desc: "Interaktive Arbeitsfläche mit Dotted-Grid. Pan per Mittlere Maustaste, Zoom per Scroll-Rad (0.2×–3×). Hintergrund passt sich dem Dark/Light-Mode an.",
    color: "#D98AE8",
  },
  {
    title: "Drag & Resize",
    desc: "Nodes per Header-Drag verschieben. Resize-Handle (rechts unten) zum Skalieren. Callbacks über onNodeChange und onNodeSelect.",
    color: "#F5C87A",
  },
  {
    title: "Selektion",
    desc: "Selektierte Nodes erhalten einen farbigen Ring und Glow-Schatten in der Farbe ihres Node-Typs.",
    color: "#E4FF97",
  },
];

/* ── Props-Tabelle ── */
const PROPS = [
  { prop: "nodes",          type: "CanvasNode[]",                    req: "✓", desc: "Array der Nodes (id, type, x, y, label, …)" },
  { prop: "edges",          type: "CanvasEdge[]",                    req: "–", desc: "Verbindungen zwischen Nodes (from, to, animated, color)" },
  { prop: "groups",         type: "CanvasGroup[]",                   req: "–", desc: "Gruppen-Container (x, y, width, height, color, label)" },
  { prop: "height",         type: "number",                         req: "–", desc: "Sichtbare Canvas-Höhe in px (Standard: 500)" },
  { prop: "showGrid",       type: "boolean",                        req: "–", desc: "Dotted-Grid anzeigen (Standard: true)" },
  { prop: "onNodeChange",   type: "(id, x, y, w, h) => void",       req: "–", desc: "Callback nach Node-Drag oder Resize mit neuer Position und Größe" },
  { prop: "onNodeSelect",   type: "(id: string | null) => void",    req: "–", desc: "Callback bei Node-Selektion (null = Deselektierung)" },
  { prop: "className",      type: "string",                         req: "–", desc: "Zusätzliche CSS-Klassen für den Container" },
];

/* ── Design-Regeln ── */
const RULES = [
  { num: "01", ok: true,  title: "Node-Typen farbkodieren",   desc: "Jeder Node-Typ hat eine feste Farbe. Text=Rose, Bild=Sky, Generator=Mint, Liste=Amber, Daten=Orchid, Trigger=Lime." },
  { num: "02", ok: true,  title: "Animierte Edges sparsam",   desc: "Nur aktive Datenflüsse werden animiert. Statische Verbindungen bleiben ruhig." },
  { num: "03", ok: true,  title: "Gruppen als Kontext",       desc: "Gruppen fassen thematisch zusammengehörige Nodes zusammen. Max. 2 Ebenen Verschachtelung." },
  { num: "04", ok: false, title: "Keine Kreuz-Edges",         desc: "Edges sollten sich nicht kreuzen. Layout so wählen, dass der Datenfluss von links nach rechts lesbar ist." },
  { num: "05", ok: false, title: "Max. 15 Nodes pro Canvas",  desc: "Bei mehr als 15 Nodes wird das Canvas unübersichtlich. Gruppen oder Unter-Canvas verwenden." },
  { num: "06", ok: true,  title: "Selektion zeigt Kontext",   desc: "Nur ein Node gleichzeitig selektieren. Selektion hebt den aktiven Node hervor ohne andere zu dimmen." },
];

/* ── Hauptkomponente ── */
const NodeCanvasSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<"workflow" | "groups">("workflow");

  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="max-w-3xl">
        <p className="section-label mb-2">Visualisierung — Node Canvas</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Node Canvas
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-3">
          Das <strong>GrainNodeCanvas</strong> ist das visuelle System für node-basierte Workflows.
          Nodes repräsentieren Verarbeitungsschritte — Text, Bild, Generator, Liste — und werden
          über Bezier-Edges verbunden. Gruppen fassen thematisch zusammengehörige Nodes zusammen.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Einsatz: KI-Workflow-Builder, Daten-Pipelines, Prozess-Visualisierung,
          Automations-Designer, Concept-Maps.
        </p>
      </div>

      {/* Live Demo */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 className="font-display font-bold text-xl text-foreground">
            Live Demo
          </h3>
          <div style={{ display: "flex", gap: 8 }}>
            {(["workflow", "groups"] as const).map(key => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                style={{
                  padding: "6px 16px", borderRadius: 20,
                  fontSize: 12, fontFamily: '"DM Mono", monospace', fontWeight: 500,
                  border: `1px solid ${activeDemo === key ? "#0A0A0A" : "#CCCCCC"}`,
                  background: activeDemo === key ? "#0A0A0A" : "transparent",
                  color: activeDemo === key ? "#E4FF97" : "#4A4A4A",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {key === "workflow" ? "Workflow" : "Gruppen"}
              </button>
            ))}
          </div>
        </div>

        {activeDemo === "workflow" ? (
          <GrainNodeCanvas
            nodes={WORKFLOW_NODES}
            edges={WORKFLOW_EDGES}
            height={480}
            showGrid
          />
        ) : (
          <GrainNodeCanvas
            nodes={GROUP_NODES}
            edges={GROUP_EDGES}
            groups={GROUP_GROUPS}
            height={480}
            showGrid
          />
        )}
      </div>

      {/* Anatomie */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">
          Anatomie
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {ANATOMY.map(item => (
            <div key={item.title} style={{
              padding: "18px 20px",
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 12,
              borderTop: `3px solid ${item.color}`,
            }}>
              <div style={{
                fontSize: 12, fontFamily: '"DM Mono", monospace',
                fontWeight: 700, color: "#0A0A0A", marginBottom: 8,
              }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12, color: "#5A5A5A", lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Node-Typen */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">
          Node-Typen
        </h3>
        <GrainNodeCanvas
          nodes={[
            { id: "nt-trigger", type: "trigger",   x: 20,  y: 30, label: "Trigger",    placeholder: "Ausführen" },
            { id: "nt-text",    type: "text",       x: 210, y: 30, label: "Text #1",    placeholder: "Prompt oder Texteingabe…" },
            { id: "nt-list",    type: "list",       x: 460, y: 30, label: "Liste #1",   items: ["Element A", "Element B", "Element C"] },
            { id: "nt-image",   type: "image",      x: 710, y: 30, label: "Bild #1",    imageColor: "#1A2030" },
            { id: "nt-gen",     type: "generator",  x: 940, y: 30, label: "Generator",  model: "Auto", imageColor: "#1A2A1A", selected: true },
            { id: "nt-data",    type: "data",       x: 1230,y: 30, label: "Daten #1" },
          ]}
          height={220}
          showGrid={false}
        />
      </div>

      {/* Code */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">
          Verwendung
        </h3>
        <CodeBlock
          label="GrainNodeCanvas · Beispiel"
          code={`import { GrainNodeCanvas } from "@/components/grain/GrainNodeCanvas";

const nodes = [
  { id: "prompt", type: "text",      x: 40,  y: 80,  label: "Prompt #1" },
  { id: "gen",    type: "generator", x: 320, y: 60,  label: "Generator", model: "Auto" },
  { id: "output", type: "image",     x: 620, y: 80,  label: "Output",    selected: true },
];

const edges = [
  { id: "e1", from: "prompt", to: "gen",    animated: true, color: "#6DDBA0" },
  { id: "e2", from: "gen",    to: "output", animated: true, color: "#6DDBA0" },
];

<GrainNodeCanvas
  nodes={nodes}
  edges={edges}
  height={400}
  showGrid
/>`}
        />
      </div>

      {/* Props */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">
          Props
        </h3>
        <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F5F5F5" }}>
                {["Prop", "Typ", "Req.", "Beschreibung"].map(h => (
                  <th key={h} style={{
                    padding: "10px 14px", textAlign: "left",
                    fontSize: 11, fontFamily: '"DM Mono", monospace',
                    fontWeight: 600, color: "#4A4A4A",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROPS.map((row, i) => (
                <tr key={row.prop} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}>
                  <td style={{ padding: "9px 14px", fontSize: 12, fontFamily: '"DM Mono", monospace', color: "#0A0A0A", fontWeight: 600 }}>{row.prop}</td>
                  <td style={{ padding: "9px 14px", fontSize: 11, fontFamily: '"DM Mono", monospace', color: "#6DDBA0" }}>{row.type}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12, color: row.req === "✓" ? "#0A0A0A" : "#AAAAAA", textAlign: "center" }}>{row.req}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12, color: "#5A5A5A", lineHeight: 1.5 }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Design-Regeln */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">
          Design-Regeln
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {RULES.map(rule => (
            <div key={rule.num} style={{
              padding: "18px 20px",
              background: "#FFFFFF",
              border: `1px solid ${rule.ok ? "rgba(0,0,0,0.08)" : "rgba(220,60,60,0.15)"}`,
              borderRadius: 12,
              display: "flex", gap: 14,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                background: rule.ok ? "#E4FF97" : "#FFE0E0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontFamily: '"DM Mono", monospace', fontWeight: 700,
                color: rule.ok ? "#0A0A0A" : "#CC2222",
              }}>
                {rule.ok ? "✓" : "✗"}
              </div>
              <div>
                <div style={{
                  fontSize: 12, fontFamily: '"DM Mono", monospace',
                  fontWeight: 700, color: "#0A0A0A", marginBottom: 4,
                }}>
                  <span style={{ color: "#AAAAAA", marginRight: 6 }}>{rule.num}</span>
                  {rule.title}
                </div>
                <div style={{ fontSize: 12, color: "#5A5A5A", lineHeight: 1.6 }}>
                  {rule.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NodeCanvasSection;
