/**
 * RadarSection – Quadranten-Radar & Ranked List
 * ─────────────────────────────────────────────────────────────────────────────
 * Teil von "Templates & Visualisierungen"
 * Zeigt VoltRadarChart + VoltRankedList mit Intelligence-Dashboard-Demo-Daten.
 */

import React from "react";
import { VoltRadarChart, RadarBubble } from "@/components/volt/VoltRadarChart";
import { VoltRankedList, RankedCategory } from "@/components/volt/VoltRankedList";

/* ── Demo-Daten: VoltRadarChart (Quadranten-Blasen) ── */
const quadrantBubbles: RadarBubble[] = [
  { id: "b1",  label: "AI & Automation",              x: 0.85, y: 0.92, influence: 98, confidence: 0.97, horizon: "Kurz",   meta: { signals: 420, sources: ["Gartner", "McKinsey"], relevance: 98 } },
  { id: "b2",  label: "Generative AI",                x: 0.80, y: 0.88, influence: 96, confidence: 0.94, horizon: "Kurz",   meta: { signals: 380, sources: ["OpenAI", "Anthropic"], relevance: 96 } },
  { id: "b3",  label: "Climate & Sustainability",     x: 0.60, y: 0.85, influence: 94, confidence: 0.92, horizon: "Mittel", meta: { signals: 310, sources: ["IPCC", "WEF"],       relevance: 95 } },
  { id: "b4",  label: "Energy Transition",            x: 0.55, y: 0.78, influence: 88, confidence: 0.88, horizon: "Mittel", meta: { signals: 260, sources: ["IEA", "Bloomberg"],  relevance: 90 } },
  { id: "b5",  label: "Digital Networks",             x: 0.70, y: 0.75, influence: 85, confidence: 0.90, horizon: "Kurz",   meta: { signals: 200, sources: ["ITU", "Ericsson"],   relevance: 92 } },
  { id: "b6",  label: "Autonomous Mobility",          x: 0.75, y: 0.55, influence: 72, confidence: 0.78, horizon: "Mittel", meta: { signals: 180, sources: ["Tesla", "Waymo"],    relevance: 75 } },
  { id: "b7",  label: "Demographic Shifts",           x: 0.40, y: 0.70, influence: 80, confidence: 0.85, horizon: "Lang",   meta: { signals: 150, sources: ["UN", "WHO"],         relevance: 88 } },
  { id: "b8",  label: "Edge Computing & IoT",         x: 0.65, y: 0.50, influence: 68, confidence: 0.75, horizon: "Mittel", meta: { signals: 140, sources: ["IDC", "Cisco"],      relevance: 72 } },
  { id: "b9",  label: "Social Instability",           x: 0.25, y: 0.60, influence: 75, confidence: 0.72, horizon: "Kurz",   meta: { signals: 120, sources: ["WEF", "Oxfam"],     relevance: 76 } },
  { id: "b10", label: "Skills Gap & Upskilling",      x: 0.35, y: 0.45, influence: 65, confidence: 0.70, horizon: "Mittel", meta: { signals: 100, sources: ["OECD", "LinkedIn"], relevance: 70 } },
  { id: "b11", label: "Digital Health",               x: 0.50, y: 0.55, influence: 70, confidence: 0.76, horizon: "Mittel", meta: { signals: 130, sources: ["WHO", "Deloitte"],  relevance: 72 } },
  { id: "b12", label: "Knowledge & Lifelong Learning", x: 0.30, y: 0.35, influence: 60, confidence: 0.68, horizon: "Lang",   meta: { signals: 90,  sources: ["UNESCO", "MIT"],   relevance: 73 } },
];

/* ── Demo-Daten: VoltRankedList ── */
const rankedCategories: RankedCategory[] = [
  {
    id: "adopt",
    label: "Übernehmen",
    entries: [
      { id: "ai",       label: "Artificial Intelligence & Automation",  value: 98, previousValue: 95, category: "Übernehmen" },
      { id: "climate",  label: "Climate Change & Sustainability",        value: 96, previousValue: 94, category: "Übernehmen" },
      { id: "genai",    label: "Generative AI & Foundation Models",      value: 96, previousValue: 91, category: "Übernehmen" },
      { id: "disrupt",  label: "Technological Disruption",               value: 95, previousValue: 95, category: "Übernehmen" },
      { id: "connect",  label: "Connectivity & Digital Networks",         value: 92, previousValue: 90, category: "Übernehmen" },
      { id: "agents",   label: "AI Agents & Autonomous Systems",          value: 92, previousValue: 88, category: "Übernehmen" },
      { id: "energy",   label: "Energy Transition & Decarbonization",    value: 90, previousValue: 89, category: "Übernehmen" },
      { id: "demo",     label: "Demographic Shifts & Aging",              value: 88, previousValue: 90, category: "Übernehmen" },
    ],
  },
  {
    id: "test",
    label: "Testen",
    entries: [
      { id: "social",   label: "Social Instability & Inequality",         value: 76, previousValue: 72, category: "Testen" },
      { id: "mobility", label: "Mobility & Autonomous Transport",          value: 75, previousValue: 75, category: "Testen" },
      { id: "know",     label: "Knowledge Culture & Lifelong Learning",   value: 73, previousValue: 70, category: "Testen" },
      { id: "edge",     label: "Edge Computing & IoT",                    value: 72, previousValue: 68, category: "Testen" },
      { id: "health",   label: "Digital Health & Telemedicine",           value: 72, previousValue: 71, category: "Testen" },
      { id: "skills",   label: "Skills Gap & Upskilling",                 value: 70, previousValue: 73, category: "Testen" },
      { id: "evs",      label: "Autonomous Mobility & EVs",               value: 68, previousValue: 66, category: "Testen" },
    ],
  },
];

export default function RadarSection() {
  return (
    <div className="space-y-8">
      {/* Section-Header */}
      <div>
        <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-2">
          Templates & Visualisierungen
        </p>
        <h2 className="font-display font-bold text-2xl text-foreground leading-tight">
          Quadranten-Radar & Ranked List
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Zwei Volt UI Komponenten für Intelligence-Dashboards: Der Quadranten-Radar
          visualisiert Datenpunkte in einem 2D-Raum (Position, Größe, Deckkraft).
          Die Ranked List zeigt kategorisierte Ranglisten mit Trend-Pfeilen.
        </p>
      </div>

      {/* Demo: Radar + Ranked List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quadranten-Radar – nimmt 2/3 der Breite */}
        <div className="lg:col-span-2">
          <VoltRadarChart
            bubbles={quadrantBubbles}
            quadrants={["Beobachten", "Bewerten", "Testen", "Übernehmen"]}
            title="Technologie-Radar"
            subtitle="12 Trends · Zeithorizont × Reifegrad · Größe = Einfluss"
            height={460}
            colorMode="horizon"
            showLegend
          />
        </div>
        {/* Ranked List – nimmt 1/3 der Breite */}
        <div>
          <VoltRankedList
            categories={rankedCategories}
            title="Trend-Ranking"
            subtitle="Relevanz-Score · Trend-Richtung"
            showProgressBar
            maxHeight={460}
          />
        </div>
      </div>

      {/* Erklärung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div className="p-4 rounded-xl bg-secondary/40 border border-border">
          <p className="text-xs font-mono font-semibold text-foreground mb-1.5">Quadranten-Radar</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Positioniert Datenpunkte in einem 2D-Quadrantensystem. X-Achse = Zeithorizont,
            Y-Achse = Reifegrad. Blasengröße kodiert Einfluss, Deckkraft kodiert Vertrauen.
            Pastell-Radial-Gradienten nach Zeithorizont (Kurz / Mittel / Lang).
          </p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/40 border border-border">
          <p className="text-xs font-mono font-semibold text-foreground mb-1.5">Ranked List</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kategorisierte Rangliste mit farbkodierten Einträgen, Trend-Pfeilen (↑ ↓ →)
            und optionalen Fortschrittsbalken. Ideal für Intelligence-Dashboards,
            Technologie-Radare und Prioritäts-Rankings.
          </p>
        </div>
      </div>
    </div>
  );
}
