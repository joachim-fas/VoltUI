/**
 * BackgroundsSection – Volt UI
 * Hintergründe & Patterns: Volt-Textur, Dot-Grid, Linien, Pastell-Verläufe, Atmosphärische Hintergründe
 * Farbsystem: #E4FF97 + #000000 + 8 Pastell-Töne
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

/* ── Volt SVG als Data-URI ── */
const VOLT_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`;

/* ── Pattern-Definitionen ── */
const PATTERNS = [
  {
    id: "volt-texture",
    name: "Volt Textur",
    description: "Atmosphärisches Rauschen – das Markenzeichen von Volt UI",
    cssClass: "pattern-volt",
    bg: "#F8F8F8",
    code: `.pattern-volt-texture::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image: ${VOLT_SVG};\n  opacity: 0.06;\n  pointer-events: none;\n}`,
    preview: (
      <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ background: "#F8F8F8" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: VOLT_SVG,
          opacity: 0.35,
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground">volt · noise · texture</span>
        </div>
      </div>
    ),
  },
  {
    id: "dots",
    name: "Dot Grid",
    description: "Gleichmäßiges Punktraster – für strukturierte Layouts",
    cssClass: "pattern-dots",
    bg: "#FFFFFF",
    code: `.pattern-dots {\n  background-image: radial-gradient(rgba(0, 0, 0, 0.12) 0.75px, transparent 0.75px);\n  background-size: 24px 24px;\n}`,
    preview: (
      <div className="w-full h-full rounded-xl overflow-hidden" style={{
        backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.12) 0.75px, transparent 0.75px)",
        backgroundSize: "24px 24px",
        backgroundColor: "#FFFFFF",
      }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">dot · grid · 24px</span>
        </div>
      </div>
    ),
  },
  {
    id: "lines-h",
    name: "Horizontale Linien",
    description: "Feine Querlinien – für tabellarische Strukturen",
    cssClass: "pattern-lines-h",
    bg: "#FFFFFF",
    code: `.pattern-lines-h {\n  background-image: repeating-linear-gradient(\n    0deg,\n    transparent,\n    transparent 23px,\n    #E8E8E8 23px,\n    #E8E8E8 24px\n  );\n}`,
    preview: (
      <div className="w-full h-full rounded-xl overflow-hidden" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 23px, #E8E8E8 23px, #E8E8E8 24px)",
        backgroundColor: "#FFFFFF",
      }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">lines · 24px · horizontal</span>
        </div>
      </div>
    ),
  },
  {
    id: "grid",
    name: "Grid Raster",
    description: "Kreuzlinien-Raster – für Dashboard-Hintergründe",
    cssClass: "pattern-grid",
    bg: "#FFFFFF",
    code: `.pattern-grid {\n  background-image:\n    linear-gradient(#E8E8E8 1px, transparent 1px),\n    linear-gradient(90deg, #E8E8E8 1px, transparent 1px);\n  background-size: 32px 32px;\n}`,
    preview: (
      <div className="w-full h-full rounded-xl overflow-hidden" style={{
        backgroundImage: "linear-gradient(#E8E8E8 1px, transparent 1px), linear-gradient(90deg, #E8E8E8 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        backgroundColor: "#FFFFFF",
      }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">grid · 32px · cross</span>
        </div>
      </div>
    ),
  },
  {
    id: "diagonal",
    name: "Diagonale Streifen",
    description: "Schraffur-Muster – für Statusanzeigen und Warnbereiche",
    cssClass: "pattern-diagonal",
    bg: "#FFFFFF",
    code: `.pattern-diagonal {\n  background-image: repeating-linear-gradient(\n    45deg,\n    transparent,\n    transparent 14px,\n    #E8E8E8 14px,\n    #E8E8E8 15px\n  );\n}`,
    preview: (
      <div className="w-full h-full rounded-xl overflow-hidden" style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(10,10,10,0.12) 14px, rgba(10,10,10,0.12) 15px)",
      }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">diagonal · 45° · 15px</span>
        </div>
      </div>
    ),
  },
  {
    id: "dots-lime",
    name: "Lime Dot Grid",
    description: "Punktraster auf Lime – für Hero-Bereiche",
    cssClass: "pattern-dots-lime",
    bg: "#E4FF97",
    code: `.pattern-dots-lime {\n  background-color: #E4FF97;\n  background-image: radial-gradient(rgba(0, 0, 0, 0.14) 0.75px, transparent 0.75px);\n  background-size: 24px 24px;\n}`,
    preview: (
      <div className="w-full h-full rounded-xl overflow-hidden" style={{
        backgroundColor: "#E4FF97",
        backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.14) 0.75px, transparent 0.75px)",
        backgroundSize: "24px 24px",
      }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-xs text-foreground bg-[#E4FF97]/80 px-2 py-1 rounded">lime · dots · hero</span>
        </div>
      </div>
    ),
  },
];

/* ── Verlauf-Definitionen ── */
const GRADIENTS = [
  {
    id: "lime-white",
    name: "Lime → Weiß",
    description: "Primärer System-Verlauf",
    style: { background: "linear-gradient(135deg, #E4FF97 0%, #FFFFFF 100%)" },
    code: "background: linear-gradient(135deg, #E4FF97 0%, #FFFFFF 100%);",
  },
  {
    id: "black-lime",
    name: "Schwarz → Lime",
    description: "Dramatischer Kontrast-Verlauf",
    style: { background: "linear-gradient(135deg, #0A0A0A 0%, #E4FF97 100%)" },
    code: "background: linear-gradient(135deg, #0A0A0A 0%, #E4FF97 100%);",
  },
  {
    id: "rose-peach",
    name: "Rose Quartz → Peach",
    description: "Warmer Pastell-Verlauf",
    style: { background: "linear-gradient(135deg, #FFD6E0 0%, #FFECD2 100%)" },
    code: "background: linear-gradient(135deg, #FFD6E0 0%, #FFECD2 100%);",
  },
  {
    id: "mint-blue",
    name: "Mint → Baby Blue",
    description: "Kühler Pastell-Verlauf",
    style: { background: "linear-gradient(135deg, #C3F4D3 0%, #D4E8FF 100%)" },
    code: "background: linear-gradient(135deg, #C3F4D3 0%, #D4E8FF 100%);",
  },
  {
    id: "orchid-blue",
    name: "Soft Orchid → Baby Blue",
    description: "Romantischer Verlauf",
    style: { background: "linear-gradient(135deg, #FDE2FF 0%, #D4E8FF 100%)" },
    code: "background: linear-gradient(135deg, #FDE2FF 0%, #D4E8FF 100%);",
  },
  {
    id: "butter-aqua",
    name: "Butter → Aqua Mist",
    description: "Frischer Sommer-Verlauf",
    style: { background: "linear-gradient(135deg, #FFF5BA 0%, #D6F5F5 100%)" },
    code: "background: linear-gradient(135deg, #FFF5BA 0%, #D6F5F5 100%);",
  },
  {
    id: "all-pastel",
    name: "Pastell-Spektrum",
    description: "Alle 8 Pastell-Töne als Verlauf",
    style: { background: "linear-gradient(135deg, #FFD6E0 0%, #FFECD2 16%, #FFF5BA 32%, #C3F4D3 48%, #D4E8FF 64%, #FDE2FF 80%, #D6F5F5 100%)" },
    code: "background: linear-gradient(135deg, #FFD6E0, #FFECD2, #FFF5BA, #C3F4D3, #D4E8FF, #FDE2FF, #D6F5F5);",
  },
  {
    id: "lime-black-radial",
    name: "Radial Lime",
    description: "Radialer Lime-Verlauf – für Spotlight-Effekte",
    style: { background: "radial-gradient(ellipse at 30% 40%, #E4FF97 0%, #FFFFFF 70%)" },
    code: "background: radial-gradient(ellipse at 30% 40%, #E4FF97 0%, #FFFFFF 70%);",
  },
  {
    id: "deep-dark",
    name: "Deep Dark",
    description: "Schwarz → Dunkelgrau · Nacht",
    style: { background: "linear-gradient(135deg, #0A0A0A 0%, #1C1C1C 40%, #2A2A2A 70%, #111111 100%)" },
    code: "background: linear-gradient(135deg, #0A0A0A 0%, #1C1C1C 40%, #2A2A2A 70%, #111111 100%);",
  },
  {
    id: "soft-lime",
    name: "Soft Lime",
    description: "Heller Verlauf · UI-Flächen",
    style: { background: "linear-gradient(135deg, #F5FFDC 0%, #EAFFB0 50%, #E4FF97 100%)" },
    code: "background: linear-gradient(135deg, #F5FFDC 0%, #EAFFB0 50%, #E4FF97 100%);",
  },
  {
    id: "pastel-blend",
    name: "Pastel Blend",
    description: "Rose → Mint · Datenkodierung",
    style: { background: "linear-gradient(135deg, #FFD6E0 0%, #C3F4D3 100%)" },
    code: "background: linear-gradient(135deg, #FFD6E0 0%, #C3F4D3 100%);",
  },
  {
    id: "hero-background",
    name: "Hero Background",
    description: "Lime-Basis · subtile Orbs",
    style: { background: "radial-gradient(ellipse at 20% 30%, #E4FF97 0%, #F0FFD0 40%, #FAFFF0 100%)" },
    code: "background: radial-gradient(ellipse at 20% 30%, #E4FF97 0%, #F0FFD0 40%, #FAFFF0 100%);",
  },
  {
    id: "volt-gradient",
    name: "Volt Gradient",
    description: "Lime → Schwarz (Brand-Verlauf)",
    style: { background: "linear-gradient(135deg, #E4FF97 0%, #8BAA3A 40%, #2A3A0A 70%, #0A0A0A 100%)" },
    code: "background: linear-gradient(135deg, #E4FF97 0%, #8BAA3A 40%, #2A3A0A 70%, #0A0A0A 100%);",
  },
  {
    id: "atmospheric",
    name: "Atmospheric",
    description: "Radiale Orbs · Lime-Akzent",
    style: { background: "radial-gradient(ellipse at 30% 50%, rgba(60,70,20,0.9) 0%, #0A0A0A 60%), radial-gradient(ellipse at 70% 20%, rgba(228,255,151,0.15) 0%, transparent 50%)" },
    code: "background: radial-gradient(ellipse at 30% 50%, rgba(60,70,20,0.9) 0%, #0A0A0A 60%),\n  radial-gradient(ellipse at 70% 20%, rgba(228,255,151,0.15) 0%, transparent 50%);",
  },
];

/* ── Atmosphärische Hintergründe ── */
const ATMOSPHERIC = [
  {
    id: "lime-volt",
    name: "Lime Volt",
    description: "Hero-Hintergrund – Lime mit Volt-Textur",
    textColor: "#0A0A0A",
    style: { background: "#E4FF97" },
    volt: true,
    code: `background: #E4FF97;\n/* + Volt-Overlay mit opacity: 0.06 */`,
  },
  {
    id: "dark-volt",
    name: "Dark Volt",
    description: "Dunkler Hintergrund mit Volt-Textur",
    textColor: "#FFFFFF",
    style: { background: "#0A0A0A" },
    volt: true,
    code: `background: #0A0A0A;\n/* + Volt-Overlay mit opacity: 0.08 */`,
  },
  {
    id: "rose-volt",
    name: "Rose Volt",
    description: "Warmer Pastell-Hintergrund",
    textColor: "#0A0A0A",
    style: { background: "linear-gradient(135deg, #FFD6E0 0%, #FFECD2 100%)" },
    volt: true,
    code: `background: linear-gradient(135deg, #FFD6E0 0%, #FFECD2 100%);\n/* + Volt-Overlay */`,
  },
  {
    id: "mint-volt",
    name: "Mint Volt",
    description: "Frischer Hintergrund für Erfolgs-Zustände",
    textColor: "#0A0A0A",
    style: { background: "linear-gradient(135deg, #C3F4D3 0%, #D6F5F5 100%)" },
    volt: true,
    code: `background: linear-gradient(135deg, #C3F4D3 0%, #D6F5F5 100%);\n/* + Volt-Overlay */`,
  },
  {
    id: "orchid-volt",
    name: "Orchid Volt",
    description: "Weicher Hintergrund für kreative Bereiche",
    textColor: "#0A0A0A",
    style: { background: "linear-gradient(135deg, #FDE2FF 0%, #D4E8FF 100%)" },
    volt: true,
    code: `background: linear-gradient(135deg, #FDE2FF 0%, #D4E8FF 100%);\n/* + Volt-Overlay */`,
  },
  {
    id: "butter-volt",
    name: "Butter Volt",
    description: "Warmer Hintergrund für Warnhinweise",
    textColor: "#0A0A0A",
    style: { background: "linear-gradient(135deg, #FFF5BA 0%, #FFE0CC 100%)" },
    volt: true,
    code: `background: linear-gradient(135deg, #FFF5BA 0%, #FFE0CC 100%);\n/* + Volt-Overlay */`,
  },
];

/* ── Copy-Button ── */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
    >
      {copied ? <Check className="w-3 h-3 text-[#1A9E5A]" /> : <Copy className="w-3 h-3" />}
      {copied ? "Kopiert" : "CSS kopieren"}
    </button>
  );
}

/* ── Haupt-Komponente ── */
export const BackgroundsSection: React.FC = () => {
  return (
    <div className="space-y-16">

      {/* Header */}
      <div>
        <p className="section-label mb-2">04 — Hintergründe</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Hintergründe & Patterns
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Alle Muster, Verläufe und atmosphärischen Hintergründe aus dem Volt UI Farbsystem –
          direkt als CSS-Klassen und Custom Properties einsetzbar.
        </p>
      </div>

      {/* ── Patterns ── */}
      <section>
        <h3 className="font-display font-bold text-xl text-foreground mb-1">Patterns</h3>
        <p className="text-muted-foreground text-sm mb-6">Wiederholbare Muster für strukturierte Oberflächen und Texturen.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATTERNS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border border-border rounded-2xl overflow-hidden bg-card"
            >
              {/* Preview */}
              <div className="h-36 relative">
                {p.preview}
              </div>
              {/* Info */}
              <div className="p-4 border-t border-border">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="font-display font-bold text-sm text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </div>
                </div>
                <div className="mt-3 bg-secondary rounded-lg p-2 font-mono text-[10px] text-muted-foreground leading-relaxed overflow-x-auto">
                  <code className="whitespace-pre">{p.code.split('\n')[0]}</code>
                </div>
                <div className="mt-2">
                  <CopyButton code={p.code} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Verläufe ── */}
      <section>
        <h3 className="font-display font-bold text-xl text-foreground mb-1">Farbverläufe</h3>
        <p className="text-muted-foreground text-sm mb-6">Lineare und radiale Verläufe aus der Volt UI Palette.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GRADIENTS.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="border border-border rounded-2xl overflow-hidden bg-card"
            >
              {/* Gradient Preview */}
              <div className="h-24 w-full" style={g.style} />
              {/* Info */}
              <div className="p-3 border-t border-border">
                <p className="font-display font-bold text-sm text-foreground mb-0.5">{g.name}</p>
                <p className="text-[10px] text-muted-foreground mb-2">{g.description}</p>
                <CopyButton code={g.code} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Atmosphärische Hintergründe ── */}
      <section>
        <h2 className="font-display font-bold text-2xl text-foreground mb-1">Atmosphärische Hintergründe</h2>
        <p className="text-muted-foreground text-sm mb-6">Kombinationen aus Farbe und Volt-Textur für Hero-Bereiche, Modals und Sektionen.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATMOSPHERIC.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border border-border rounded-2xl overflow-hidden"
            >
              {/* Atmospheric Preview */}
              <div className="relative h-40" style={a.style}>
                {a.volt && (
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    opacity: 0.07,
                    mixBlendMode: "multiply",
                  }} />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="font-display font-black text-lg" style={{ color: a.textColor }}>{a.name}</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{
                    color: a.textColor,
                    background: a.textColor === "#FFFFFF" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
                  }}>
                    {a.description}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="p-3 border-t border-border bg-card">
                <div className="bg-secondary rounded-lg p-2 font-mono text-[10px] text-muted-foreground leading-relaxed mb-2 overflow-x-auto">
                  <code className="whitespace-pre">{a.code}</code>
                </div>
                <CopyButton code={a.code} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Kombinations-Showcase ── */}
      <section>
        <h2 className="font-display font-bold text-2xl text-foreground mb-1">Kombinations-Showcase</h2>
        <p className="text-muted-foreground text-sm mb-6">Pattern + Verlauf + Volt kombiniert – wie sie in echten Layouts eingesetzt werden.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Hero-Variante 1: Lime + Dots */}
          <div className="relative rounded-2xl overflow-hidden h-48 border border-border" style={{
            backgroundColor: "#E4FF97",
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.06,
            }} />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <span className="font-mono text-[10px] text-foreground/60 uppercase tracking-widest mb-1">Lime + Dots + Volt</span>
              <span className="font-display font-black text-2xl text-foreground">Hero Section</span>
            </div>
          </div>

          {/* Hero-Variante 2: Dark + Grid */}
          <div className="relative rounded-2xl overflow-hidden h-48 border border-border" style={{
            backgroundColor: "#0A0A0A",
            backgroundImage: "linear-gradient(rgba(228,255,151,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(228,255,151,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.08,
            }} />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <span className="font-mono text-[10px] text-[#E4FF97]/60 uppercase tracking-widest mb-1">Dark + Lime Grid + Volt</span>
              <span className="font-display font-black text-2xl text-[#E4FF97]">Dark Mode Hero</span>
            </div>
          </div>

          {/* Pastell-Variante 1: Rose + Diagonal */}
          <div className="relative rounded-2xl overflow-hidden h-48 border border-border" style={{
            background: "linear-gradient(135deg, #FFD6E0 0%, #FFECD2 100%)",
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 24px), linear-gradient(135deg, #FFD6E0 0%, #FFECD2 100%)",
          }}>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.06,
            }} />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">Rose + Diagonal + Volt</span>
              <span className="font-display font-black text-2xl text-foreground">Pastell Section</span>
            </div>
          </div>

          {/* Pastell-Variante 2: Mint + Dots */}
          <div className="relative rounded-2xl overflow-hidden h-48 border border-border" style={{
            background: "linear-gradient(135deg, #C3F4D3 0%, #D6F5F5 100%)",
          }}>
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.06,
            }} />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">Mint + Dots + Volt</span>
              <span className="font-display font-black text-2xl text-foreground">Success Section</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default BackgroundsSection;
