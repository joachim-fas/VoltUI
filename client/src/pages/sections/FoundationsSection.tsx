/**
 * FoundationsSection – Design Tokens, Farben, Typografie, Grain-Effekte, Patterns
 * Grain UI v2 – Atmospheric Design System
 */

import React from "react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";

const colorTokens = [
  { name: "--grain-blue",   hex: "#4A35D4", oklch: "oklch(0.42 0.22 268)", role: "Primary",     bg: "bg-grain-blue" },
  { name: "--grain-violet", hex: "#552AAF", oklch: "oklch(0.36 0.20 285)", role: "Secondary",   bg: "bg-grain-violet" },
  { name: "--grain-red",    hex: "#E8150E", oklch: "oklch(0.52 0.26 27)",  role: "Destructive", bg: "bg-grain-red" },
  { name: "--grain-coral",  hex: "#FA716B", oklch: "oklch(0.68 0.18 28)",  role: "Accent",      bg: "bg-grain-coral" },
  { name: "--background",   hex: "#F8F7FC", oklch: "oklch(0.985 0.003 268)", role: "Base",      bg: "bg-background border border-border" },
];

const semanticTokens = [
  { name: "--background",       role: "Seitenhintergrund",    bg: "bg-background border border-border" },
  { name: "--foreground",       role: "Haupttext",            bg: "bg-foreground" },
  { name: "--primary",          role: "Primäre Aktionen",     bg: "bg-primary" },
  { name: "--secondary",        role: "Sekundäre Flächen",    bg: "bg-secondary border border-border" },
  { name: "--muted",            role: "Gedämpfte Flächen",    bg: "bg-muted border border-border" },
  { name: "--accent",           role: "Akzent / Highlight",   bg: "bg-accent border border-border" },
  { name: "--destructive",      role: "Fehler / Löschen",     bg: "bg-destructive" },
  { name: "--border",           role: "Rahmenlinien",         bg: "bg-border" },
];

const typeScale = [
  { name: "Display XL",  size: "text-5xl",  weight: "font-black",  family: "font-display", sample: "Grain UI", font: "Syne" },
  { name: "Display L",   size: "text-4xl",  weight: "font-bold",   family: "font-display", sample: "Atmospheric", font: "Syne" },
  { name: "Display M",   size: "text-2xl",  weight: "font-bold",   family: "font-display", sample: "Design System", font: "Syne" },
  { name: "UI Heading",  size: "text-xl",   weight: "font-semibold", family: "font-ui",    sample: "Component Library", font: "Space Grotesk" },
  { name: "UI Body",     size: "text-base", weight: "font-medium", family: "font-ui",      sample: "Inspired by grain textures", font: "Space Grotesk" },
  { name: "Body",        size: "text-sm",   weight: "font-normal", family: "font-body",    sample: "Tiefe durch Schichtung von Grain-Textur, Gradienten und Glasmorphismus.", font: "Plus Jakarta Sans" },
  { name: "Caption",     size: "text-xs",   weight: "font-medium", family: "font-body",    sample: "Subtile Texturen als verbindendes Element", font: "Plus Jakarta Sans" },
  { name: "Mono",        size: "text-sm",   weight: "font-normal", family: "font-mono",    sample: "const grain = oklch(0.42 0.22 268);", font: "JetBrains Mono" },
];

const patterns = [
  { label: "Dots",     cls: "pattern-dots",     desc: "Radiale Punkte" },
  { label: "Grid",     cls: "pattern-grid",     desc: "Quadratisches Raster" },
  { label: "Diagonal", cls: "pattern-diagonal", desc: "45° Diagonallinien" },
  { label: "Cross",    cls: "pattern-cross",     desc: "Kreuz-Raster" },
  { label: "Circuit",  cls: "pattern-circuit",  desc: "Schaltkreis-Muster" },
  { label: "Hexagon",  cls: "pattern-hexagon",  desc: "Hexagonales Muster" },
];

const gradients = [
  { label: "Grain Gradient",    cls: "bg-grain-gradient",      desc: "Blau → Violett → Rot" },
  { label: "Grain Gradient Soft", cls: "bg-grain-gradient-soft border border-border", desc: "Transparente Version" },
  { label: "Atmospheric",       cls: "bg-atmospheric",         desc: "Radiale Orbs" },
  { label: "Blue Grain",        cls: "bg-grain-blue",          desc: "Primärfarbe" },
  { label: "Red Grain",         cls: "bg-grain-red",           desc: "Akzentfarbe" },
  { label: "Violet Grain",      cls: "bg-grain-violet",        desc: "Sekundärfarbe" },
];

const glassVariants = [
  { label: "Glass",        cls: "glass",        desc: "65% Weiß + Blur 16px" },
  { label: "Glass Strong", cls: "glass-strong", desc: "88% Weiß + Blur 24px" },
  { label: "Glass Dark",   cls: "glass-dark text-white",    desc: "72% Dunkel + Blur 20px" },
];

export const FoundationsSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="section-label mb-2">01 — Foundations</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Design Tokens & Grundlagen
        </h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl">
          Alle Farben, Abstände und typografischen Werte sind als CSS-Custom-Properties definiert.
          Die Farbpalette wurde direkt aus dem körnigen Gradienten-Bild extrahiert und in das OKLCH-Farbraum-System übertragen.
        </p>
      </div>

      {/* Brand Colors */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Markenfarben</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Aus dem Quell-Bild extrahiert, im OKLCH-Farbraum definiert</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {colorTokens.map((token) => (
              <div key={token.name} className="flex flex-col gap-2">
                <div className={`h-20 rounded-xl grain ${token.bg} shadow-sm`} />
                <div>
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-xs font-semibold font-ui text-foreground">{token.role}</span>
                    <GrainBadge variant="muted" size="sm">{token.hex}</GrainBadge>
                  </div>
                  <p className="text-[0.65rem] font-mono text-muted-foreground leading-relaxed break-all">
                    {token.name}<br />{token.oklch}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Semantic Tokens */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Semantische Tokens</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Kontextbezogene CSS-Variablen für Light- und Dark-Mode</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {semanticTokens.map((token) => (
              <div key={token.name} className="flex flex-col gap-2">
                <div className={`h-12 rounded-xl ${token.bg}`} />
                <div>
                  <p className="text-xs font-semibold font-ui text-foreground">{token.role}</p>
                  <p className="text-[0.65rem] font-mono text-muted-foreground">{token.name}</p>
                </div>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Grain Textures */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Grain-Texturen</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">SVG-basierte Rausch-Texturen – kein Bild-Asset, reiner CSS-Code</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Blue Grain",    cls: "bg-grain-blue",    text: "text-white" },
              { label: "Red Grain",     cls: "bg-grain-red",     text: "text-white" },
              { label: "Violet Grain",  cls: "bg-grain-violet",  text: "text-white" },
              { label: "Gradient Grain",cls: "bg-grain-gradient",text: "text-white" },
              { label: "Atmospheric",   cls: "bg-atmospheric",   text: "text-foreground" },
              { label: "Grain Soft",    cls: "bg-grain-gradient-soft border border-border", text: "text-foreground" },
            ].map((item) => (
              <div key={item.label} className={`h-24 rounded-xl grain ${item.cls} flex items-end p-3`}>
                <span className={`text-xs font-semibold font-ui ${item.text}`}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-[oklch(0.14_0.025_268)] border border-border">
            <p className="text-[11px] font-mono text-[oklch(0.75_0.04_268)] leading-relaxed">
              <span className="text-[#FA716B]">.grain</span> <span className="text-[#8888aa]">{"{"}</span><br />
              {"  "}<span className="text-[#4A8FD4]">position</span>: relative;<br />
              {"}"}<br />
              <span className="text-[#FA716B]">.grain::after</span> <span className="text-[#8888aa]">{"{"}</span><br />
              {"  "}<span className="text-[#4A8FD4]">content</span>: <span className="text-[#72D44A]">""</span>; position: absolute; inset: 0;<br />
              {"  "}<span className="text-[#4A8FD4]">background-image</span>: <span className="text-[#72D44A]">url("data:image/svg+xml,…feTurbulence…")</span>;<br />
              {"  "}<span className="text-[#4A8FD4]">opacity</span>: 0.055; pointer-events: none;<br />
              {"}"}
            </p>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Geometric Patterns */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Geometrische Patterns</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">CSS-basierte Hintergrundmuster – kein Bild, reines CSS</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {patterns.map((p) => (
              <div key={p.label} className={`h-28 rounded-xl ${p.cls} border border-border flex items-end p-3`}>
                <div>
                  <p className="text-xs font-semibold font-ui text-foreground">{p.label}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Gradient Backgrounds */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Gradient-Hintergründe</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Atmosphärische Gradienten für verschiedene Einsatzbereiche</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gradients.map((g) => (
              <div key={g.label} className={`h-28 rounded-xl grain ${g.cls} flex items-end p-3`}>
                <div>
                  <p className="text-xs font-semibold font-ui text-foreground">{g.label}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Glassmorphism */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Glassmorphismus</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Backdrop-Filter-Effekte für überlagerte Elemente</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="relative rounded-xl overflow-hidden p-6 bg-grain-gradient grain">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {glassVariants.map((g) => (
                <div key={g.label} className={`${g.cls} rounded-xl p-4`}>
                  <p className="text-sm font-semibold font-ui mb-1">{g.label}</p>
                  <p className="text-xs font-body text-muted-foreground">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Typography */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Typografie-System</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            Syne (Display) · Space Grotesk (UI) · Plus Jakarta Sans (Body) · JetBrains Mono (Code)
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          {/* Font Specimens */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { name: "Syne", role: "Display", sample: "Aa", cls: "font-display" },
              { name: "Space Grotesk", role: "UI", sample: "Aa", cls: "font-ui" },
              { name: "Plus Jakarta", role: "Body", sample: "Aa", cls: "font-body" },
              { name: "JetBrains Mono", role: "Code", sample: "Aa", cls: "font-mono" },
            ].map((f) => (
              <div key={f.name} className="p-4 rounded-xl border border-border bg-muted/30">
                <p className={`text-4xl font-bold text-foreground ${f.cls} mb-2`}>{f.sample}</p>
                <p className="text-xs font-semibold font-ui text-foreground">{f.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{f.role}</p>
              </div>
            ))}
          </div>

          {/* Type Scale */}
          <div className="space-y-3 divide-y divide-border">
            {typeScale.map((t, i) => (
              <div key={i} className={`flex items-baseline gap-4 ${i > 0 ? "pt-3" : ""}`}>
                <div className="w-28 flex-shrink-0">
                  <p className="text-[10px] font-mono text-muted-foreground leading-tight">{t.name}</p>
                  <p className="text-[9px] font-mono text-muted-foreground/60">{t.font}</p>
                </div>
                <p className={`${t.size} ${t.weight} ${t.family} text-foreground leading-tight flex-1 min-w-0 truncate`}>
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Spacing */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Abstands-System</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">8pt-Raster – alle Abstände sind Vielfache von 4px</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex flex-wrap items-end gap-3">
            {[1, 2, 3, 4, 6, 8, 10, 12, 16, 20].map((n) => (
              <div key={n} className="flex flex-col items-center gap-1.5">
                <div className="bg-grain-blue rounded" style={{ width: `${n * 4}px`, height: `${n * 4}px` }} />
                <span className="text-[9px] font-mono text-muted-foreground">{n * 4}px</span>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Border Radius */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Border-Radius-System</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Konsistente Abrundungen für alle Komponenten</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex flex-wrap items-end gap-4">
            {[
              { label: "sm",  r: "rounded-sm",   px: "4px" },
              { label: "md",  r: "rounded-md",   px: "6px" },
              { label: "lg",  r: "rounded-lg",   px: "8px" },
              { label: "xl",  r: "rounded-xl",   px: "12px" },
              { label: "2xl", r: "rounded-2xl",  px: "16px" },
              { label: "3xl", r: "rounded-3xl",  px: "24px" },
              { label: "full",r: "rounded-full", px: "∞" },
            ].map(({ label, r, px }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 bg-grain-blue grain ${r}`} />
                <span className="text-[9px] font-mono text-muted-foreground text-center">{label}<br />{px}</span>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Shadow System */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Schatten-System</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Tiefe durch Schatten und Glow-Effekte</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex flex-wrap gap-6 items-end">
            {[
              { label: "shadow-sm",  cls: "shadow-sm" },
              { label: "shadow",     cls: "shadow" },
              { label: "shadow-md",  cls: "shadow-md" },
              { label: "shadow-lg",  cls: "shadow-lg" },
              { label: "shadow-xl",  cls: "shadow-xl" },
              { label: "glow-blue",  cls: "glow-blue" },
              { label: "glow-red",   cls: "glow-red" },
            ].map(({ label, cls }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-xl bg-card border border-border ${cls}`} />
                <span className="text-[9px] font-mono text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>
    </div>
  );
};
