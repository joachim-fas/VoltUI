/**
 * FoundationsSection – Design Tokens, Farben, Typografie, Volt-Effekte, Patterns
 * Volt UI – Atmospheric Design System
 */

import React, { useState } from "react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VOLT_NEON, VOLT_PASTEL } from "@/components/volt/VoltChart";

const colorTokens = [
  { name: "--neon-yellow",     hex: "#E4FF97", role: "Neon Yellow (Leading)", bg: "bg-[#E4FF97]" },
  { name: "--black",           hex: "#000000", role: "Black (Fundament)",     bg: "bg-[#000000]" },
  { name: "--signal-positive", hex: "#1A9E5A", role: "Signal Positiv",        bg: "bg-[#1A9E5A]" },
  { name: "--signal-negative", hex: "#E8402A", role: "Signal Negativ",        bg: "bg-[#E8402A]" },
  { name: "--signal-neutral",  hex: "#6B7A9A", role: "Signal Neutral",        bg: "bg-[#6B7A9A]" },
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
  { name: "Display XL",  size: "text-5xl",  weight: "font-black",  family: "font-display", sample: "Volt UI", font: "Bricolage Grotesque" },
  { name: "Display L",   size: "text-4xl",  weight: "font-bold",   family: "font-display", sample: "Atmospheric", font: "Bricolage Grotesque" },
  { name: "Display M",   size: "text-2xl",  weight: "font-bold",   family: "font-display", sample: "Design System", font: "Bricolage Grotesque" },
  { name: "UI Heading",  size: "text-xl",   weight: "font-semibold", family: "font-ui",    sample: "Component Library", font: "DM Sans" },
  { name: "UI Body",     size: "text-base", weight: "font-medium", family: "font-ui",      sample: "Portables Design System für jedes Projekt und jede Plattform", font: "DM Sans" },
  { name: "Body Serif",  size: "text-sm",   weight: "font-normal", family: "font-body",    sample: "Tiefe durch Schichtung von Volt-Textur, Gradienten und Glasmorphismus.", font: "Lora" },
  { name: "Caption",     size: "text-xs",   weight: "font-medium", family: "font-ui",      sample: "Subtile Texturen als verbindendes Element", font: "DM Sans" },
  { name: "Mono",        size: "text-sm",   weight: "font-normal", family: "font-mono",    sample: "const flux = oklch(0.95 0.18 120); // Lime", font: "JetBrains Mono" },
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
  {
    label: "Volt Gradient",
    desc: "Lime → Schwarz (Brand-Verlauf)",
    style: { background: "linear-gradient(135deg, #E4FF97 0%, #0A0A0A 100%)" },
    textDark: false,
  },
  {
    label: "Atmospheric",
    desc: "Radiale Orbs · Lime-Akzent",
    style: {
      background:
        "radial-gradient(ellipse at 25% 35%, rgba(228,255,151,0.55) 0%, transparent 55%), " +
        "radial-gradient(ellipse at 75% 65%, rgba(228,255,151,0.25) 0%, transparent 50%), " +
        "#0A0A0A",
    },
    textDark: false,
  },
  {
    label: "Hero Background",
    desc: "Lime-Basis · subtile Orbs",
    style: {
      background:
        "radial-gradient(ellipse at 20% 50%, rgba(10,10,10,0.08) 0%, transparent 60%), " +
        "radial-gradient(ellipse at 80% 20%, rgba(10,10,10,0.05) 0%, transparent 50%), " +
        "#E4FF97",
    },
    textDark: true,
  },
  {
    label: "Soft Lime",
    desc: "Heller Verlauf · UI-Flächen",
    style: { background: "linear-gradient(135deg, #E4FF97 0%, #C8F060 100%)" },
    textDark: true,
  },
  {
    label: "Pastel Blend",
    desc: "Rose → Mint · Datenkodierung",
    style: { background: "linear-gradient(135deg, #F9D0D0 0%, #C8F0E0 100%)" },
    textDark: true,
  },
  {
    label: "Deep Dark",
    desc: "Schwarz → Dunkelgrau · Nacht",
    style: { background: "linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 100%)" },
    textDark: false,
  },
];

const themes = [
  { id: "flux",    label: "Volt Primary",  desc: "Lime #E4FF97 + Schwarz #0A0A0A. Die Primärpalette – klar, kontrastreich, modern.", light: "#E4FF97", dark: "#0A0A0A" },
  { id: "rose",    label: "Volt Rose",     desc: "Rose #F9D0D0 + Schwarz #0A0A0A. Pastell-Erweiterung für Datenkodierung.",          light: "#F9D0D0", dark: "#0A0A0A" },
  { id: "mint",    label: "Volt Mint",     desc: "Mint #C8F0E0 + Schwarz #0A0A0A. Pastell-Erweiterung für Datenkodierung.",          light: "#C8F0E0", dark: "#0A0A0A" },
  { id: "orchid",  label: "Volt Orchid",   desc: "Orchid #E8D0F0 + Schwarz #0A0A0A. Pastell-Erweiterung für Datenkodierung.",        light: "#E8D0F0", dark: "#0A0A0A" },
  { id: "butter",  label: "Volt Butter",   desc: "Butter #FFF0C0 + Schwarz #0A0A0A. Pastell-Erweiterung für Datenkodierung.",        light: "#FFF0C0", dark: "#0A0A0A" },
  { id: "sky",     label: "Volt Sky",      desc: "Sky #C8E8FF + Schwarz #0A0A0A. Pastell-Erweiterung für Datenkodierung.",           light: "#C8E8FF", dark: "#0A0A0A" },
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
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Markenfarben</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Hauptfarben: Neon Yellow #E4FF97 + Black #000000 · Signalfarben: Smaragd · Koralle · Slate</p>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {colorTokens.map((token) => (
              <div key={token.name} className="flex flex-col gap-2">
                <div className={`h-20 rounded-xl volt-texture ${token.bg}`} />
                <div>
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-xs font-semibold font-ui text-foreground">{token.role}</span>
                    <VoltBadge variant="muted" size="sm">{token.hex}</VoltBadge>
                  </div>
                  <p className="text-[0.65rem] font-mono text-muted-foreground leading-relaxed break-all">
                    {token.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Semantic Tokens */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Semantische Tokens</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Kontextbezogene CSS-Variablen für Light- und Dark-Mode</p>
        </VoltCardHeader>
        <VoltCardContent>
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
        </VoltCardContent>
      </VoltCard>

      {/* Volt Textures */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Volt-Texturen</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">SVG-basierte Rausch-Texturen – kein Bild-Asset, reiner CSS-Code</p>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Lime Volt",     cls: "",    text: "text-foreground", bg: "#E4FF97" },
              { label: "Dark Volt",     cls: "",    text: "text-white",     bg: "#0A0A0A" },
              { label: "Rose Volt",     cls: "",    text: "text-foreground", bg: "linear-gradient(135deg, #FFD6E0 0%, #FFECD2 100%)" },
              { label: "Mint Volt",     cls: "",    text: "text-foreground", bg: "linear-gradient(135deg, #C3F4D3 0%, #D6F5F5 100%)" },
              { label: "Orchid Volt",   cls: "",    text: "text-foreground", bg: "linear-gradient(135deg, #FDE2FF 0%, #E8D0F0 100%)" },
              { label: "Butter Volt",   cls: "",    text: "text-foreground", bg: "linear-gradient(135deg, #FFF5BA 0%, #FFE0CC 100%)" },
            ].map((item) => (
              <div key={item.label} className={`h-24 rounded-xl volt-texture relative overflow-hidden flex items-end p-3`} style={{ background: item.bg }}>
                <span className={`text-xs font-semibold font-ui ${item.text} relative z-10`}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-[#0A0A14] border border-border">
            <p className="text-[11px] font-mono text-[oklch(0.75_0.04_268)] leading-relaxed">
              <span className="text-[#FA716B]">.volt-texture</span> <span className="text-[#8888aa]">{"{"}</span><br />
              {"  "}<span className="text-[#4A8FD4]">position</span>: relative;<br />
              {"}"}<br />
              <span className="text-[#FA716B]">.volt-texture::after</span> <span className="text-[#8888aa]">{"{"}</span><br />
              {"  "}<span className="text-[#4A8FD4]">content</span>: <span className="text-[#72D44A]">""</span>; position: absolute; inset: 0;<br />
              {"  "}<span className="text-[#4A8FD4]">background-image</span>: <span className="text-[#72D44A]">url("data:image/svg+xml,…feTurbulence…")</span>;<br />
              {"  "}<span className="text-[#4A8FD4]">opacity</span>: 0.055; pointer-events: none;<br />
              {"}"}
            </p>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Geometric Patterns */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Geometrische Patterns</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">CSS-basierte Hintergrundmuster – kein Bild, reines CSS</p>
        </VoltCardHeader>
        <VoltCardContent>
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
        </VoltCardContent>
      </VoltCard>

      {/* Gradient Backgrounds */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Gradient-Hintergründe</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Atmosphärische Gradienten für verschiedene Einsatzbereiche</p>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gradients.map((g) => (
              <div
                key={g.label}
                className="h-28 rounded-xl volt-texture flex items-end p-3"
                style={g.style}
              >
                <div>
                  <p className={`text-xs font-semibold font-ui ${g.textDark ? "text-foreground" : "text-white"}`}>{g.label}</p>
                  <p className={`text-[10px] font-mono ${g.textDark ? "text-foreground/60" : "text-white/60"}`}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Glassmorphism */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Glassmorphismus</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Backdrop-Filter-Effekte für überlagerte Elemente</p>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="relative rounded-xl overflow-hidden p-6 volt-texture" style={{ background: 'linear-gradient(135deg, #E4FF97 0%, #C8F060 60%, #A8D840 100%)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {glassVariants.map((g) => (
                <div key={g.label} className={`${g.cls} rounded-xl p-4`}>
                  <p className="text-sm font-semibold font-ui mb-1">{g.label}</p>
                  <p className="text-xs font-body text-muted-foreground">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Typography */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Typografie-System</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            Bricolage Grotesque (Display) · DM Sans (UI) · Lora (Body Serif) · JetBrains Mono (Code)
          </p>
        </VoltCardHeader>
        <VoltCardContent>
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
        </VoltCardContent>
      </VoltCard>

      {/* Theme Overview */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Farbpaletten-System</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">1 Primärpalette + 5 Pastell-Erweiterungen · alle auf Schwarz #0A0A0A als Basis</p>
        </VoltCardHeader>
        <VoltCardContent>
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
        </VoltCardContent>
      </VoltCard>

      {/* Spacing */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Abstands-System</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">8pt-Raster – alle Abstände sind Vielfache von 4px</p>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap items-end gap-3">
            {[1, 2, 3, 4, 6, 8, 10, 12, 16, 20].map((n) => (
              <div key={n} className="flex flex-col items-center gap-1.5">
                <div className="bg-primary/70 rounded" style={{ width: `${n * 4}px`, height: `${n * 4}px` }} />
                <span className="text-[9px] font-mono text-muted-foreground">{n * 4}px</span>
              </div>
            ))}
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Border Radius */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Border-Radius-System</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Konsistente Abrundungen für alle Komponenten</p>
        </VoltCardHeader>
        <VoltCardContent>
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
                <div className={`w-12 h-12 bg-primary/70 volt-texture ${r}`} />
                <span className="text-[9px] font-mono text-muted-foreground text-center">{label}<br />{px}</span>
              </div>
            ))}
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Tiefe-System (ohne Schatten) */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Tiefe & Glow-Effekte</VoltCardTitle>
          <p className="text-xs text-muted-foreground font-ui mt-0.5">Tiefe durch Farbe und Glow – kein klassischer Schlagschatten</p>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap gap-6 items-end">
            {[
              { label: "border only",   cls: "border border-border" },
              { label: "border strong", cls: "border-2 border-primary/30" },
              { label: "glow-blue",     cls: "glow-blue" },
              { label: "glow-red",      cls: "glow-red" },
              { label: "glow-violet",   cls: "glow-violet" },
            ].map(({ label, cls }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-xl bg-secondary ${cls}`} />
                <span className="text-[9px] font-mono text-muted-foreground text-center">{label}</span>
              </div>
            ))}
          </div>
        </VoltCardContent>
      </VoltCard>

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
    desc: "Gesättigte Pastell-Farben · Harmonisch und lesbar · Ideal für alle Diagramm-Typen",
    colors: VOLT_PASTEL,
    names: ["Rose Quartz", "Peach", "Mint Green", "Soft Orchid", "Baby Blue", "Butter Yellow", "Powder Orange", "Aqua Mist"],
    roles: ["Kategorie 1", "Kategorie 2", "Kategorie 3", "Kategorie 4", "Kategorie 5", "Kategorie 6", "Kategorie 7", "Kategorie 8"],
  },
  {
    id: "neon",
    label: "Neon",
    desc: "Maximale Chroma · Elektrische Leuchtkraft · Ideal für Dark Mode & Dashboards",
    colors: VOLT_NEON,
    names: ["Cyan", "Hot Pink", "Acid Green", "Laser Orange", "Electric Violet", "Neon Mint", "Electric Yellow", "Neon Red"],
    roles: ["Primär", "Highlight", "Erfolg", "Warnung", "Sekundär", "Positiv", "Energie", "Kritisch"],
  },
  {
    id: "pastel",
    label: "Pastell",
    desc: "8 harmonische Pastell-Töne · Ideal für Reporting & Kategorien · Niedrige Ermüdung",
    colors: VOLT_PASTEL,
    names: ["Rose Quartz", "Peach Cream", "Mint Green", "Soft Orchid", "Baby Blue", "Butter Yellow", "Powder Orange", "Aqua Mist"],
    roles: ["Kategorie 1", "Kategorie 2", "Kategorie 3", "Kategorie 4", "Kategorie 5", "Kategorie 6", "Kategorie 7", "Kategorie 8"],
  },
];

const ChartPalettesSection: React.FC = () => {
  const [active, setActive] = useState("standard");
  const palette = PALETTES.find(p => p.id === active) || PALETTES[0];

  return (
    <VoltCard>
      <VoltCardHeader>
        <VoltCardTitle>Chart-Farbpaletten</VoltCardTitle>
        <p className="text-xs text-muted-foreground font-ui mt-0.5">
          3 Paletten · Konsistent über alle Visualisierungen · Neon Yellow + 8 Pastell-Töne + Signalfarben
        </p>
      </VoltCardHeader>
      <VoltCardContent>
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
          <div className="mt-4 p-3 rounded-xl border border-border bg-[#0A0A14]">
            <p className="text-[11px] font-ui" style={{ color: "#00F5FF" }}>
              ⚡ Neon-Farben entfalten ihre volle Wirkung auf dunklen Hintergründen.
              Für Light-Mode-Interfaces empfiehlt sich die Standard- oder Pastel-Palette.
            </p>
          </div>
        )}
      </VoltCardContent>
    </VoltCard>
  );
};
