/**
 * FoundationsSection – Design Tokens, Farben, Typografie, Grain-Effekte, Patterns
 * Grain UI v2 – Atmospheric Design System
 */

import React, { useState } from "react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GRAIN_HEX, GRAIN_NEON, GRAIN_PASTEL } from "@/components/grain/GrainChart";

const colorTokens = [
  { name: "--lime",          hex: "#E4FF97", role: "Primär (Leading)",   bg: "bg-[#E4FF97]" },
  { name: "--ink",           hex: "#0A0A0A", role: "Schwarz (Fundament)", bg: "bg-[#0A0A0A]" },
  { name: "--signal-positive", hex: "#1A9E5A", role: "Signal Positiv",    bg: "bg-[#1A9E5A]" },
  { name: "--signal-negative", hex: "#E8402A", role: "Signal Negativ",    bg: "bg-[#E8402A]" },
  { name: "--signal-neutral",  hex: "#6B7A9A", role: "Signal Neutral",    bg: "bg-[#6B7A9A]" },
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
  { name: "Display XL",  size: "text-5xl",  weight: "font-black",  family: "font-display", sample: "Grain UI", font: "Bricolage Grotesque" },
  { name: "Display L",   size: "text-4xl",  weight: "font-bold",   family: "font-display", sample: "Atmospheric", font: "Bricolage Grotesque" },
  { name: "Display M",   size: "text-2xl",  weight: "font-bold",   family: "font-display", sample: "Design System", font: "Bricolage Grotesque" },
  { name: "UI Heading",  size: "text-xl",   weight: "font-semibold", family: "font-ui",    sample: "Component Library", font: "DM Sans" },
  { name: "UI Body",     size: "text-base", weight: "font-medium", family: "font-ui",      sample: "Inspired by grain textures and atmospheric gradients", font: "DM Sans" },
  { name: "Body Serif",  size: "text-sm",   weight: "font-normal", family: "font-body",    sample: "Tiefe durch Schichtung von Grain-Textur, Gradienten und Glasmorphismus.", font: "Lora" },
  { name: "Caption",     size: "text-xs",   weight: "font-medium", family: "font-ui",      sample: "Subtile Texturen als verbindendes Element", font: "DM Sans" },
  { name: "Mono",        size: "text-sm",   weight: "font-normal", family: "font-mono",    sample: "const grain = oklch(0.45 0.31 268);", font: "JetBrains Mono" },
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
  { label: "Theme Gradient",    cls: "bg-grain-gradient",      desc: "Primär → Sekundär (theme-aware)" },
  { label: "Atmospheric",       cls: "bg-atmospheric",         desc: "Radiale Orbs (theme-aware)" },
  { label: "Hero Background",   cls: "bg-grain-hero border border-border", desc: "Für Hero-Sektionen" },
  { label: "Primary",           cls: "bg-grain-blue",          desc: "Primärfarbe (theme-aware)" },
  { label: "Accent",            cls: "bg-grain-red",           desc: "Akzentfarbe (theme-aware)" },
  { label: "Secondary",         cls: "bg-grain-violet",        desc: "Sekundärfarbe (theme-aware)" },
];

const themes = [
  { id: "grain",  label: "Grain Original",  desc: "Lime #E4FF97 + Schwarz #0A0A0A. Klar, kontrastreich, modern.", light: "#E4FF97", dark: "#0A0A0A" },
  { id: "copper", label: "Oxidized Copper", desc: "Patiniertes Petrol-Grün + Terrakotta + Elfenbein. Materiell, industriell.", light: "#4A8C6A", dark: "#C87A40" },
  { id: "ink",    label: "Midnight Ink",    desc: "Tiefschwarz + Chartreuse. Maximaler Kontrast, futuristisch, editorial.", light: "#1A1A2E", dark: "#C8F060" },
  { id: "loam",   label: "Loam & Ember",    desc: "Warmes Dunkelbraun + Bernstein. Geerdet, warm, premium.", light: "#4A3828", dark: "#D4A020" },
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
                <div className={`h-20 rounded-xl grain ${token.bg}`} />
                <div>
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-xs font-semibold font-ui text-foreground">{token.role}</span>
                    <GrainBadge variant="muted" size="sm">{token.hex}</GrainBadge>
                  </div>
                  <p className="text-[0.65rem] font-mono text-muted-foreground leading-relaxed break-all">
                    {token.name}
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
            Bricolage Grotesque (Display) · DM Sans (UI) · Lora (Body Serif) · JetBrains Mono (Code)
          </p>
        </GrainCardHeader>
        <GrainCardContent>
          {/* Font Specimens */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { name: "Bricolage Grotesque", role: "Display", sample: "Aa", cls: "font-display" },
              { name: "DM Sans", role: "UI & Zahlen", sample: "Aa", cls: "font-ui" },
              { name: "Lora", role: "Body Serif", sample: "Aa", cls: "font-body" },
              { name: "JetBrains Mono", role: "Code & Mono", sample: "Aa", cls: "font-mono" },
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

      {/* Theme Overview */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Farbpaletten-System</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">4 eigenständige Themes · je Light + Dark Mode · wählbar in der Sidebar</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themes.map((t) => (
              <div key={t.id} className="p-4 rounded-xl border border-border bg-muted/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex flex-shrink-0">
                    <div className="w-1/2 h-full" style={{ background: t.light }} />
                    <div className="w-1/2 h-full" style={{ background: t.dark }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-display text-foreground">{t.label}</p>
                    <p className="text-[0.6rem] font-mono text-muted-foreground uppercase tracking-wider">{t.id}</p>
                  </div>
                </div>
                <p className="text-xs font-body text-muted-foreground leading-relaxed">{t.desc}</p>
                <div className="mt-3 flex gap-2">
                  <div className="flex-1 h-2 rounded-full" style={{ background: t.light }} />
                  <div className="flex-1 h-2 rounded-full" style={{ background: t.dark }} />
                </div>
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

      {/* Tiefe-System (ohne Schatten) */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Tiefe & Glow-Effekte</GrainCardTitle>
          <p className="text-xs text-muted-foreground font-ui mt-0.5">Tiefe durch Farbe und Glow – kein klassischer Schlagschatten</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex flex-wrap gap-6 items-end">
            {[
              { label: "border only",   cls: "border border-border" },
              { label: "border strong", cls: "border-2 border-primary/30" },
              { label: "glow-blue",     cls: "glow-blue" },
              { label: "glow-red",      cls: "glow-red" },
              { label: "glow-violet",   cls: "glow-violet" },
            ].map(({ label, cls }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-xl bg-card ${cls}`} />
                <span className="text-[9px] font-mono text-muted-foreground text-center">{label}</span>
              </div>
            ))}
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Chart-Farbpaletten */}
      <ChartPalettesSection />
    </div>
  );
};

/* ── Chart-Farbpaletten-Sektion ── */
const PALETTES = [
  {
    id: "standard",
    label: "Standard",
    desc: "Satte, klare Farben · Optimiert für helle Hintergründe · Hoher Kontrast",
    colors: GRAIN_HEX,
    names: ["Blue", "Red", "Teal", "Amber", "Violet", "Green", "Pink", "Coral"],
    roles: ["Primär", "Akzent", "Positiv", "Warnung", "Sekundär", "Erfolg", "Highlight", "Info"],
  },
  {
    id: "neon",
    label: "Neon",
    desc: "Maximale Chroma · Elektrische Leuchtkraft · Ideal für Dark Mode & Dashboards",
    colors: GRAIN_NEON,
    names: ["Cyan", "Hot Pink", "Acid Green", "Laser Orange", "Electric Violet", "Neon Mint", "Electric Yellow", "Neon Red"],
    roles: ["Primär", "Highlight", "Erfolg", "Warnung", "Sekundär", "Positiv", "Energie", "Kritisch"],
  },
  {
    id: "pastel",
    label: "Pastel",
    desc: "Weich & harmonisch · Ideal für helle Interfaces & Reporting · Niedrige Ermüdung",
    colors: GRAIN_PASTEL,
    names: ["Lavender", "Blush", "Mint", "Butter", "Lilac", "Sage", "Rose", "Sky"],
    roles: ["Primär", "Warnung", "Positiv", "Neutral", "Sekundär", "Erfolg", "Highlight", "Info"],
  },
];

const ChartPalettesSection: React.FC = () => {
  const [active, setActive] = useState("standard");
  const palette = PALETTES.find(p => p.id === active) || PALETTES[0];

  return (
    <GrainCard>
      <GrainCardHeader>
        <GrainCardTitle>Chart-Farbpaletten</GrainCardTitle>
        <p className="text-xs text-muted-foreground font-ui mt-0.5">
          3 Paletten · Konsistent über alle Visualisierungen · OKLCH-Farbraum für gleichmäßige Helligkeit
        </p>
      </GrainCardHeader>
      <GrainCardContent>
        {/* Palette-Switcher */}
        <div className="flex gap-2 mb-6">
          {PALETTES.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-ui transition-all border ${
                active === p.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Beschreibung */}
        <p className="text-xs text-muted-foreground font-ui mb-5 leading-relaxed">{palette.desc}</p>

        {/* Farbfelder */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-4">
          {palette.colors.map((hex, i) => (
            <div key={hex} className="flex flex-col gap-2">
              <div
                className="h-16 rounded-xl"
                style={{ background: hex }}
              />
              <div>
                <p className="text-[11px] font-semibold font-ui text-foreground leading-tight">{palette.names[i]}</p>
                <p className="text-[9px] font-mono text-muted-foreground">{palette.roles[i]}</p>
                <p className="text-[9px] font-mono text-muted-foreground/60 mt-0.5">{hex}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Neon-Hinweis */}
        {active === "neon" && (
          <div className="mt-4 p-3 rounded-xl border border-border bg-[#0a0a14]">
            <p className="text-[11px] font-ui" style={{ color: "#00F5FF" }}>
              ⚡ Neon-Farben entfalten ihre volle Wirkung auf dunklen Hintergründen.
              Für Light-Mode-Interfaces empfiehlt sich die Standard- oder Pastel-Palette.
            </p>
          </div>
        )}
      </GrainCardContent>
    </GrainCard>
  );
};
