/**
 * BrandArchitectureSection – Grain UI
 * Grain UI als universelle Betriebssprache fuer Free Agents und alle Tochterprojekte
 * Design: Weis/Hell, Lime+Schwarz System, Pastell-Farbzuordnung pro Projekt
 */

import React, { useState } from "react";
import { GrainCursor } from "@/components/grain/GrainCursor";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { ArrowRight, Layers, Cpu, Globe, BarChart2, ShoppingCart, Clock, Lightbulb, Megaphone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════
   DATEN
══════════════════════════════════════════════ */

const BRAND_LAYERS = [
  {
    layer: "Philosophie",
    desc: "Das >_ Signet als Weltanschauung: Praezision, kein Rauschen, Input hat Konsequenz.",
    token: "Operating Principle",
    color: "#E4FF97",
  },
  {
    layer: "Visuell",
    desc: "Signet, Lime+Schwarz, Bricolage Grotesque, Grain-Textur, Pastell-Palette.",
    token: "Design Tokens",
    color: "#D4E8FF",
  },
  {
    layer: "Sprache",
    desc: "Vokabular, Tonalitaet, E2E-Prinzip, Alltagssprache vor Tech-Sprache.",
    token: "Brand Voice",
    color: "#C3F4D3",
  },
  {
    layer: "Struktur",
    desc: "Wie Projekte benannt, gegliedert und uebergeben werden. Eingang-Ablauf-Ergebnis.",
    token: "OP-Schema",
    color: "#FFF5BA",
  },
  {
    layer: "Anwendung",
    desc: "Wie die Brand auf Website, Dokument, Pitch, Interface und Produkt wirkt.",
    token: "Templates",
    color: "#E4D4FF",
  },
];

const PROJECTS = [
  {
    id: "free-agents",
    name: "Free Agents",
    domain: "free-agents.io",
    icon: <GrainCursor size="sm" color="black" animated />,
    role: "Muttermarke",
    desc: "Die Firma. Das Operating Principle in Reinform. Jedes Projekt ist ein Ausdruck dieser Betriebsart.",
    color: "#E4FF97",
    border: "#C8F060",
    textColor: "#0A0A0A",
    status: "aktiv",
    tagline: "Weniger Abstimmung. Mehr Ergebnis.",
    tokens: ["Lime + Schwarz", "Bricolage Grotesque", ">_ Signet", "Grain-Textur"],
  },
  {
    id: "politik",
    name: "Politik-Monitor",
    domain: "intelligence.tool",
    icon: <BarChart2 size={20} />,
    role: "Produkt",
    desc: "Strategisches Intelligence-System fuer politische Parteien. Signale aus Medien-Oekosystemen zu Trends und Narrativen verdichtet.",
    color: "#D4E8FF",
    border: "#A8CEFF",
    textColor: "#0A0A0A",
    status: "konzept",
    tagline: "Signale lesen. Entscheidungen treffen.",
    tokens: ["Blau-Pastell", "Mono-Typografie", "Dashboard-Layout", "Daten-Visualisierung"],
  },
  {
    id: "culture-drops",
    name: "Culture Drops",
    domain: "culture-drops.io",
    icon: <Megaphone size={20} />,
    role: "Content",
    desc: "Kulturprojekt und Content-Plattform. Kuratierte Signale aus Kultur, Musik, Design und Gesellschaft.",
    color: "#E4D4FF",
    border: "#C8A8FF",
    textColor: "#0A0A0A",
    status: "aktiv",
    tagline: "Kultur als Signal.",
    tokens: ["Orchid-Pastell", "Serif-Akzente", "Editorial-Layout", "Atmosphaerische Bilder"],
  },
  {
    id: "gestalten-ai",
    name: "Gestalten mit AI",
    domain: "gestalten-mit.ai",
    icon: <Lightbulb size={20} />,
    role: "Bildung",
    desc: "Kreativprojekt an der Schnittstelle von Design und KI. Wie veraendert AI den kreativen Prozess?",
    color: "#FFD4E8",
    border: "#FFA8CC",
    textColor: "#0A0A0A",
    status: "recherche",
    tagline: "Gestalten als Prozess, nicht als Produkt.",
    tokens: ["Rose-Pastell", "Experimentelle Typografie", "Prozess-Visualisierung", "Grain-Textur"],
  },
  {
    id: "omnishopper",
    name: "Omnishopper",
    domain: "omnishopper.io",
    icon: <ShoppingCart size={20} />,
    role: "Produkt",
    desc: "E-Commerce Intelligence. Preise, Verfuegbarkeit und Trends ueber alle Kanaele hinweg im Blick.",
    color: "#C3F4D3",
    border: "#7ADEA0",
    textColor: "#0A0A0A",
    status: "aktiv",
    tagline: "Kaufen mit Kontext.",
    tokens: ["Mint-Pastell", "Klare Tabellen", "Vergleichs-UI", "Dichte Daten"],
  },
  {
    id: "zeiterfassung",
    name: "Zeiterfassung",
    domain: "intern",
    icon: <Clock size={20} />,
    role: "Intern",
    desc: "Internes Tool fuer Zeiterfassung und Projekttracking. Einfach, schnell, ohne Overhead.",
    color: "#FFF5BA",
    border: "#FFE87A",
    textColor: "#0A0A0A",
    status: "aktiv",
    tagline: "Zeit als Ressource, nicht als Buerokratie.",
    tokens: ["Butter-Pastell", "Kompakte UI", "Schnell-Eingabe", "Minimal-Design"],
  },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  aktiv:     { label: "Aktiv",     color: "#1A9E5A" },
  konzept:   { label: "Konzept",   color: "#E8A020" },
  recherche: { label: "Recherche", color: "#6B7A9A" },
};

const DESIGN_PRINCIPLES = [
  {
    title: "Eine Sprache, viele Ausdruecke",
    desc: "Alle Projekte teilen dieselben Grundtokens: Typografie-System, Signet, Grain-Textur, OP-Schema. Die Farbcodierung differenziert.",
  },
  {
    title: "Farbe als Kontext-Signal",
    desc: "Jedes Projekt bekommt eine Pastell-Farbe aus dem Grain-System. Die Farbe signalisiert den Kontext, nicht die Marke.",
  },
  {
    title: "Signet als Konstante",
    desc: "Das >_ Signet erscheint in allen Projekten. Es ist der Anker, der alle Ausdruecke als Teil derselben Betriebsart erkennbar macht.",
  },
  {
    title: "OP als Struktur",
    desc: "Jedes Projekt folgt dem Eingang-Ablauf-Ergebnis-Schema. Das ist nicht nur Methode, sondern sichtbare Designentscheidung.",
  },
];

/* ══════════════════════════════════════════════
   HAUPT-KOMPONENTE
══════════════════════════════════════════════ */

export const BrandArchitectureSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState("free-agents");
  const active = PROJECTS.find(p => p.id === activeProject) || PROJECTS[0];

  return (
    <div className="space-y-20">

      {/* ── HEADER ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-2">Brand Architecture</p>
        <h1 className="font-display font-bold text-4xl text-[#0A0A0A] mb-4 leading-tight">
          Eine Sprache.<br />Viele Projekte.
        </h1>
        <p className="text-[#4A4A4A] text-lg max-w-2xl leading-relaxed">
          Grain UI ist nicht nur ein Design System. Es ist die visuelle Betriebssprache von
          Free Agents und allen Projekten, die daraus entstehen. Das{" "}
          <span className="font-mono font-bold text-[#0A0A0A]">&gt;_</span> Signet ist der Anker.
          Das Operating Principle ist die Logik dahinter.
        </p>
      </div>

      {/* ── BRAND-SCHICHTEN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Die 5 Schichten der Brand Language</p>
        <div className="space-y-2">
          {BRAND_LAYERS.map((layer, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#0A0A0A] transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-sm text-[#0A0A0A]"
                style={{ background: layer.color }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-display font-bold text-sm text-[#0A0A0A]">{layer.layer}</p>
                  <span className="text-[9px] font-mono text-[#BEBEBE] uppercase tracking-wider">{layer.token}</span>
                </div>
                <p className="text-xs text-[#6B7A9A] leading-relaxed">{layer.desc}</p>
              </div>
              <ChevronRight size={14} className="text-[#BEBEBE] group-hover:text-[#0A0A0A] transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── PROJEKT-UEBERSICHT ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Projekte & Farbcodierung</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Projekt-Liste */}
          <div className="space-y-2">
            {PROJECTS.map((project) => {
              const s = STATUS_LABELS[project.status];
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                    activeProject === project.id
                      ? "border-[#0A0A0A] bg-white shadow-sm"
                      : "border-[#E8E8E8] bg-white hover:border-[#0A0A0A]/40"
                  )}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: project.color, border: `1px solid ${project.border}` }}
                  >
                    <span className="text-[#0A0A0A] scale-75">{project.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-[#0A0A0A] truncate">{project.name}</p>
                      <span className="text-[9px] font-mono shrink-0" style={{ color: s.color }}>
                        {s.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6B7A9A] font-mono truncate">{project.domain}</p>
                  </div>
                  {activeProject === project.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Projekt-Detail */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-[#E8E8E8]">

              {/* Header mit Projektfarbe */}
              <div
                className="p-6"
                style={{ background: active.color }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.6)", border: `1px solid ${active.border}` }}
                    >
                      <span className="text-[#0A0A0A]">{active.icon}</span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-[#0A0A0A]">{active.name}</p>
                      <p className="text-[10px] font-mono text-[#0A0A0A]/60">{active.domain}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <GrainBadge variant="muted" size="sm">{active.role}</GrainBadge>
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                      style={{ background: "rgba(255,255,255,0.6)", color: STATUS_LABELS[active.status].color }}
                    >
                      {STATUS_LABELS[active.status].label}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#0A0A0A]/80 leading-relaxed mb-3">{active.desc}</p>
                <p className="font-mono text-sm font-bold text-[#0A0A0A] italic">
                  &ldquo;{active.tagline}&rdquo;
                </p>
              </div>

              {/* Design-Tokens */}
              <div className="p-5 bg-white">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-3">Design-Tokens</p>
                <div className="flex gap-2 flex-wrap">
                  {active.tokens.map((token, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#0A0A0A] border border-[#E8E8E8] bg-[#F7F7F7]"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </div>

              {/* OP-Schema fuer dieses Projekt */}
              <div className="px-5 pb-5 bg-white border-t border-[#E8E8E8] pt-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-3">
                  OP-Schema angewendet
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { phase: "Eingang",  color: "#D4E8FF" },
                    { phase: "Ablauf",   color: "#FFF5BA" },
                    { phase: "Ergebnis", color: "#C3F4D3" },
                    { phase: "Wirkung",  color: active.color },
                  ].map((p, i, arr) => (
                    <div key={i} className="relative">
                      <div
                        className="rounded-lg p-2 text-center"
                        style={{ background: p.color }}
                      >
                        <p className="text-[10px] font-mono font-semibold text-[#0A0A0A]">{p.phase}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                          <ArrowRight size={10} className="text-[#BEBEBE]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESIGN-PRINZIPIEN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Design-Prinzipien der Brand Architecture</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DESIGN_PRINCIPLES.map((p, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl border border-[#E8E8E8] bg-white hover:border-[#0A0A0A] transition-colors">
              <span className="font-mono text-[10px] text-[#BEBEBE] shrink-0 mt-0.5">{String(i+1).padStart(2,"0")}</span>
              <div>
                <p className="font-display font-bold text-sm text-[#0A0A0A] mb-1">{p.title}</p>
                <p className="text-xs text-[#6B7A9A] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FARBPALETTE PRO PROJEKT ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Farbcodierung im Ueberblick</p>
        <div className="rounded-2xl border border-[#E8E8E8] overflow-hidden">
          <div className="flex">
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                className="flex-1 cursor-pointer transition-all hover:flex-[2] group"
                style={{ background: project.color, minHeight: "120px" }}
                onClick={() => setActiveProject(project.id)}
              >
                <div className="h-full flex flex-col justify-end p-3">
                  <p className="text-[9px] font-mono font-bold text-[#0A0A0A] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid border-t border-[#E8E8E8]" style={{ gridTemplateColumns: `repeat(${PROJECTS.length}, 1fr)` }}>
            {PROJECTS.map((project, i) => (
              <div key={i} className="px-3 py-2 border-r border-[#E8E8E8] last:border-0">
                <p className="text-[9px] font-mono text-[#0A0A0A] font-semibold truncate">{project.name}</p>
                <p className="text-[8px] font-mono text-[#6B7A9A] truncate">{project.tokens[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SIGNET ALS KONSTANTE ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          Das Signet als Konstante
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="rounded-2xl flex flex-col items-center justify-center gap-3 py-6 border"
              style={{ background: project.color, borderColor: project.border }}
            >
              <GrainCursor
                size="md"
                color={project.id === "free-agents" ? "black" : "black"}
                animated
              />
              <p className="text-[9px] font-mono font-bold text-[#0A0A0A] uppercase tracking-wider text-center px-2">
                {project.name}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#6B7A9A] mt-3 text-center font-mono">
          Dasselbe Signet. Sechs Kontexte. Eine Betriebssprache.
        </p>
      </div>

    </div>
  );
};

export default BrandArchitectureSection;
