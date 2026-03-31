/**
 * BubbleMapSection – Dokumentation der VoltBubbleMap Komponente
 * Design: Volt OS · Dark Background · Pastell-Gradienten
 * Zeigt: Skill-Map, Projekt-Prioritäten, Keyword-Analyse
 */

import React, { useState } from "react";
import { VoltBubbleMap, BubbleNode } from "@/components/volt/VoltBubbleMap";

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-3">
    {children}
  </div>
);

/* ── Beispiel-Datensätze ── */

const SKILL_DATA: BubbleNode[] = [
  { id: "strategy", label: "Strategie", value: 185, maxValue: 200, category: "Führung", description: "Langfristige Ausrichtung und Entscheidungsrahmen" },
  { id: "design", label: "Design", value: 172, maxValue: 200, category: "Kreativ", description: "UI/UX, Brand Identity, Visuelles System" },
  { id: "code", label: "Code", value: 168, maxValue: 200, category: "Tech", description: "React, TypeScript, Python, SQL" },
  { id: "ops", label: "Operations", value: 155, maxValue: 200, category: "Führung", description: "Prozesse, Workflows, Automatisierung" },
  { id: "ai", label: "KI & Prompting", value: 162, maxValue: 200, category: "Tech", description: "LLM-Integration, Prompt Engineering" },
  { id: "content", label: "Content", value: 138, maxValue: 200, category: "Kreativ", description: "Texte, Skripte, Redaktionsplanung" },
  { id: "data", label: "Daten", value: 145, maxValue: 200, category: "Tech", description: "Analyse, Visualisierung, Reporting" },
  { id: "sales", label: "Sales", value: 120, maxValue: 200, category: "Business", description: "Akquise, Pitches, Vertragsverhandlung" },
  { id: "finance", label: "Finanzen", value: 98, maxValue: 200, category: "Business", description: "Budgetplanung, Controlling, Forecasting" },
  { id: "legal", label: "Recht", value: 75, maxValue: 200, category: "Business", description: "Vertragsrecht, DSGVO, IP" },
  { id: "video", label: "Video", value: 110, maxValue: 200, category: "Kreativ", description: "Schnitt, Produktion, Regie" },
  { id: "community", label: "Community", value: 88, maxValue: 200, category: "Business", description: "Aufbau, Moderation, Events" },
];

const PROJECT_DATA: BubbleNode[] = [
  { id: "fa", label: "Free Agents", value: 195, maxValue: 200, category: "Core", description: "Zentrale Marke und Betriebssystem" },
  { id: "pm", label: "Politik-Monitor", value: 158, maxValue: 200, category: "Produkt", description: "KI-gestützte politische Analyse" },
  { id: "cd", label: "Culture Drops", value: 142, maxValue: 200, category: "Produkt", description: "Kulturelle Trends und Releases" },
  { id: "gai", label: "Gestalten mit AI", value: 165, maxValue: 200, category: "Produkt", description: "AI-Bildung und Workshops" },
  { id: "os", label: "Omnishopper", value: 130, maxValue: 200, category: "Produkt", description: "Smart Shopping Aggregator" },
  { id: "ze", label: "Zeiterfassung", value: 118, maxValue: 200, category: "Tool", description: "Freelancer Zeiterfassung & Abrechnung" },
  { id: "voltui", label: "Volt UI", value: 175, maxValue: 200, category: "Tool", description: "Portables Design System & Komponenten-Bibliothek" },
];

const KEYWORD_DATA: BubbleNode[] = [
  { id: "k1", label: "Autonomie", value: 180, category: "Werte" },
  { id: "k2", label: "Klarheit", value: 165, category: "Werte" },
  { id: "k3", label: "Qualität", value: 172, category: "Werte" },
  { id: "k4", label: "Geschwindigkeit", value: 148, category: "Prozess" },
  { id: "k5", label: "Iteration", value: 155, category: "Prozess" },
  { id: "k6", label: "Dokumentation", value: 130, category: "Prozess" },
  { id: "k7", label: "Vertrauen", value: 160, category: "Werte" },
  { id: "k8", label: "Fokus", value: 142, category: "Prozess" },
  { id: "k9", label: "Skalierung", value: 125, category: "Strategie" },
  { id: "k10", label: "Netzwerk", value: 118, category: "Strategie" },
  { id: "k11", label: "Expertise", value: 168, category: "Werte" },
  { id: "k12", label: "Output", value: 145, category: "Prozess" },
  { id: "k13", label: "Wirkung", value: 158, category: "Strategie" },
  { id: "k14", label: "Freiheit", value: 175, category: "Werte" },
];

/* ── Code-Snippet ── */
const CODE_SNIPPET = `import { VoltBubbleMap } from "@/components/volt/VoltBubbleMap";

const nodes = [
  { id: "design", label: "Design", value: 172, maxValue: 200,
    category: "Kreativ", description: "UI/UX, Brand Identity" },
  { id: "code",   label: "Code",   value: 168, maxValue: 200,
    category: "Tech",    description: "React, TypeScript" },
  // ...
];

<VoltBubbleMap
  nodes={nodes}
  title="Skill-Map"
  subtitle="Kompetenz-Radar als Force-Layout"
  height={520}
  accentThreshold={160}
  showStats
  onNodeClick={(node) => console.log(node)}
/>`;

/* ── Props-Tabelle ── */
const PROPS = [
  { prop: "nodes", type: "BubbleNode[]", required: "✓", desc: "Array der Bubble-Datenpunkte (id, label, value, category, description)" },
  { prop: "categories", type: "string[]", required: "–", desc: "Explizite Kategorie-Liste für Filter-Tags (auto-detektiert wenn leer)" },
  { prop: "height", type: "number", required: "–", desc: "Canvas-Höhe in px (Standard: 520)" },
  { prop: "accentThreshold", type: "number", required: "–", desc: "Ab diesem Wert erhält die Bubble Lime-Akzent (Standard: 140)" },
  { prop: "showStats", type: "boolean", required: "–", desc: "Statistik-Leiste unten anzeigen (stark / moderat / schwach)" },
  { prop: "title / subtitle", type: "string", required: "–", desc: "Header-Bereich der Komponente" },
  { prop: "onNodeClick", type: "(node) => void", required: "–", desc: "Callback bei Klick auf eine Bubble" },
];

/* ── Hauptkomponente ── */
const BubbleMapSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<"skills" | "projects" | "keywords">("skills");

  const demos = {
    skills: { data: SKILL_DATA, title: "Skill-Map", subtitle: "Kompetenz-Profil · Score 0–200 · Größe = Stärke", threshold: 155 },
    projects: { data: PROJECT_DATA, title: "Projekt-Portfolio", subtitle: "Free Agents Ökosystem · Priorität nach Score", threshold: 160 },
    keywords: { data: KEYWORD_DATA, title: "Keyword-Cluster", subtitle: "Volt UI Konzept · Werte & Prozesse", threshold: 160 },
  };

  const current = demos[activeDemo];

  return (
    <div className="space-y-16">
      {/* ── Intro ── */}
      <div className="max-w-3xl">
        <p className="section-label mb-2">Visualisierung — Bubble Map</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Bubble Map
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-3">
          Die <strong>VoltBubbleMap</strong> visualisiert gewichtete Datenpunkte als Force-Layout.
          Jede Bubble repräsentiert einen Eintrag — ihre Größe entspricht dem Score-Wert.
          Radial-Gradienten aus der Pastell-Palette, Lime-Akzent für Top-Performer,
          Volt-Textur als atmosphärischer Hintergrund.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Einsatz: Skill-Maps, Projekt-Priorisierung, Keyword-Cluster, Kompetenz-Radar,
          Themen-Landkarten. Das D3-Force-Simulation-Layout verhindert Überlappungen
          und erzeugt organische, lesbare Anordnungen.
        </p>
      </div>

      {/* ── Live Demo ── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-xl text-foreground">Live Demo</h3>
          <div className="flex items-center gap-3">
            {(["skills", "projects", "keywords"] as const).map(key => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium border transition-all duration-200 ${
                  activeDemo === key
                    ? "bg-[#0A0A0A] text-[#E4FF97] border-[#0A0A0A]"
                    : "bg-transparent text-muted-foreground border-[#CCCCCC] hover:border-[#0A0A0A] hover:text-foreground"
                }`}
              >
                {key === "skills" ? "Skills" : key === "projects" ? "Projekte" : "Keywords"}
              </button>
            ))}
          </div>
        </div>

        <VoltBubbleMap
          nodes={current.data}
          title={current.title}
          subtitle={current.subtitle}
          height={520}
          accentThreshold={current.threshold}
          showStats
          onNodeClick={(node) => console.log("Bubble clicked:", node)}
        />
      </div>

      {/* ── Anatomie ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-6">Anatomie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "Größe = Wert",
              desc: "Die Größe jeder Bubble kodiert den Score-Wert. Größere Bubble = höherer Wert. Skalierung über d3.scaleSqrt() für proportionale Flächen.",
              color: "#7AB8F5",
            },
            {
              title: "Farbe = Kategorie",
              desc: "Jede Kategorie erhält eine feste Farbe aus der Pastell-Palette. Die Farbe erscheint im Radial-Gradienten und im Filter-Tag-Punkt.",
              color: "#F4A0B5",
            },
            {
              title: "Lime-Rand = Top-Performer",
              desc: "Nodes über dem accentThreshold erhalten Lime (#E4FF97) als Gradient-Highlight, einen gestrichelten Glow-Ring und fetten Score-Text.",
              color: "#E4FF97",
            },
            {
              title: "Score + Name-Label",
              desc: "Der Wert steht mittig in der Bubble (skaliert mit Radius). Der Name erscheint darunter, lange Labels umbrechen auf zwei Zeilen.",
              color: "#6DDBA0",
            },
            {
              title: "Filter-Tags",
              desc: "Kategorien werden als klickbare Pills angezeigt. Aktiver Filter hebt die Bubble-Gruppe hervor, inaktive verschwinden.",
              color: "#FFFFBA",
            },
            {
              title: "Stats-Leiste",
              desc: "Zeigt Gesamtanzahl, Durchschnitts-Score und Verteilung nach stark/moderat/schwach basierend auf accentThreshold.",
              color: "#BAE1FF",
            },
          ].map(item => (
            <div
              key={item.title}
              className="p-5 rounded-xl border border-border bg-card flex gap-4 items-start"
            >
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 mt-0.5"
                style={{ background: `radial-gradient(circle at 35% 35%, ${item.color}, #0A0A0A88)` }}
              />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Code-Snippet ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">Verwendung</h3>
        <div className="rounded-2xl overflow-hidden border border-border">
          <div className="flex items-center gap-2 px-5 py-3 bg-[#0A0A0A] border-b border-white/10">
            <span className="text-[#E4FF97] font-mono text-xs">&gt;_</span>
            <span className="text-white/50 font-mono text-xs">VoltBubbleMap · Beispiel</span>
          </div>
          <pre className="bg-[#111111] text-[#E4FF97] font-mono text-sm p-6 overflow-x-auto leading-relaxed">
            <code>{CODE_SNIPPET}</code>
          </pre>
        </div>
      </div>

      {/* ── Props-Tabelle ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">Props</h3>
        <div className="rounded-2xl overflow-hidden border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left px-5 py-3 font-mono font-semibold text-foreground">Prop</th>
                <th className="text-left px-5 py-3 font-mono font-semibold text-foreground">Typ</th>
                <th className="text-left px-4 py-3 font-mono font-semibold text-foreground">Req.</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Beschreibung</th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map((p, i) => (
                <tr key={p.prop} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-5 py-3 font-mono text-foreground font-medium">{p.prop}</td>
                  <td className="px-5 py-3 font-mono text-muted-foreground text-xs">{p.type}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{p.required}</td>
                  <td className="px-5 py-3 text-muted-foreground leading-relaxed">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Design-Regeln ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-5">Design-Regeln</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              rule: "01",
              title: "Lime für Top-Performer",
              desc: "Nur Nodes über dem accentThreshold erhalten Lime-Farbe. Maximal 20–30% der Nodes sollten Lime-Akzent haben.",
              ok: true,
            },
            {
              rule: "02",
              title: "Keine Einzelfarben",
              desc: "Jede Bubble muss einen Radial-Gradienten haben. Flache Einfarbigkeit widerspricht der Volt-Ästhetik.",
              ok: true,
            },
            {
              rule: "03",
              title: "Dunkler Hintergrund",
              desc: "VoltBubbleMap reagiert automatisch auf den globalen App-Theme (useTheme). Dark/Light-Wechsel über den Theme-Toggle oben rechts.",
              ok: true,
            },
            {
              rule: "04",
              title: "Max. 20 Nodes",
              desc: "Bei mehr als 20 Nodes wird das Layout unlesbar. Kategorien-Filter verwenden oder Daten aggregieren.",
              ok: false,
            },
            {
              rule: "05",
              title: "Keine Verbindungslinien",
              desc: "VoltBubbleMap zeigt keine Edges/Links. Für Netzwerk-Graphen eine separate Komponente verwenden.",
              ok: false,
            },
            {
              rule: "06",
              title: "Score-Werte normieren",
              desc: "Werte sollten auf einer einheitlichen Skala liegen (z.B. 0–200). Gemischte Skalen verfälschen die Größenverhältnisse.",
              ok: true,
            },
          ].map(item => (
            <div
              key={item.rule}
              className={`p-5 rounded-xl border ${item.ok ? "border-[#1A9E5A]/40 bg-[#1A9E5A]/10" : "border-[#E8402A]/40 bg-[#E8402A]/10"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-muted-foreground">{item.rule}</span>
                <span className={`text-xs font-mono font-bold ${item.ok ? "text-[#1A9E5A]" : "text-[#E8402A]"}`}>
                  {item.ok ? "✓ DO" : "✗ DON'T"}
                </span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BubbleMapSection;
