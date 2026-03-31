/**
 * SkeuomorphicIconsSection – Volt UI
 * Design System: Schwarz/Weiß-Basis, Space Grotesk Display, DM Sans UI
 * Sektion: 9 skeuomorphische SVG-Icons im 3D-Plastik-Grau-Stil (macOS-Ära)
 * Layout: section-label + h2 + Beschreibung, dann Icon-Grid + Detail-Panel
 */

import React, { useState } from "react";
import { toast } from "sonner";
import {
  IconFinder, IconDocument, IconCloud, IconDownload,
  IconFolder, IconTrash, IconGear, IconSearch, IconNetwork,
  SKEUOMORPHIC_ICONS,
} from "@/components/volt/SkeuomorphicIcons";

/* ── Technische Details pro Icon ── */
const ICON_DETAILS: Record<string, {
  elements: string[];
  techniques: string[];
  code: string;
}> = {
  finder: {
    elements: ["Abgerundetes Rechteck", "Radiale Glanzlichter", "Augen-Ellipsen", "Lächeln-Pfad"],
    techniques: ["linearGradient (vertikal)", "feDropShadow", "Glanzlicht-Overlay (white 50%)"],
    code: `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#E8E8E8" />
  <stop offset="100%" stopColor="#A8A8A8" />
</linearGradient>
<rect rx="14" fill="url(#bg)" filter="url(#shadow)" />`,
  },
  document: {
    elements: ["3 gestapelte Blätter", "Binder-Clip", "Linien", "Mini-Diagramm"],
    techniques: ["Rotation (rotate transform)", "Mehrfach-Layering", "Glanzlicht-Overlay"],
    code: `<rect transform="rotate(-6 41 41)" fill="url(#paper2)" />
<rect transform="rotate(-2 39 39)" fill="url(#paper)" />
<rect fill="url(#paper)" /> {/* Vorderblatt */}`,
  },
  cloud: {
    elements: ["Organischer Wolkenpfad", "Pfeil nach oben", "Glanzlicht-Maske"],
    techniques: ["Komplexer SVG-Pfad", "radialGradient", "Glanzlicht via clip-path"],
    code: `<path d="M58 52 C66 52 72 46 72 38 ..."
  fill="url(#cloud-body)"
  filter="url(#shadow)" />`,
  },
  download: {
    elements: ["3D-Pfeil-Körper", "Rechte Seitenfläche", "Tiefenschatten"],
    techniques: ["Isometrische Projektion", "Zwei Gradienten (Vorder-/Seitenfläche)", "Glanzlicht oben"],
    code: `{/* Vorderseite */}
<path d="M40 68 L14 42 L26 42 L26 16 L54 16 ..."
  fill="url(#arrow-face)" />
{/* Seitenfläche (Tiefe) */}
<path d="M54 16 L58 20 L58 46 ..."
  fill="url(#arrow-side)" />`,
  },
  folder: {
    elements: ["Rückwand + Tab", "Vorderwand", "User-Badge", "Glanzlicht"],
    techniques: ["Zwei-Schicht-Aufbau", "Organischer Glanzlicht-Bogen", "Kreis-Clip für Badge"],
    code: `{/* Rückwand */}
<path d="M10 32 L10 66 Q10 70 14 70 ..." fill="url(#back)" />
{/* Tab */}
<path d="M10 32 L10 26 Q10 22 14 22 L34 22 ..." fill="url(#back)" />
{/* Vorderwand */}
<path d="M10 38 L10 66 ..." fill="url(#front)" />`,
  },
  trash: {
    elements: ["Zylindrischer Körper", "Vertikale Stäbe", "Horizontale Ringe", "Deckel + Griff"],
    techniques: ["Horizontaler Gradient (Metallschimmer)", "Array.map für Stäbe", "Elliptische Basis"],
    code: `{/* Stäbe via map */}
{[28, 33, 38, 43, 48, 53].map((x, i) => (
  <line key={i} x1={x} y1="32" x2={x-1} y2="72"
    stroke="#A0A0A0" strokeWidth="2.5" />
))}`,
  },
  gear: {
    elements: ["Zahnrad-Zähne (Pfad)", "Innerer Ring", "Mittelloch", "Glanzlicht"],
    techniques: ["radialGradient (Tiefe)", "Komplexer Polygon-Pfad", "Konzentrische Kreise"],
    code: `<path d="M40 8 L44 14 L50 12 L52 18 L58 18
  L58 24 L64 26 L62 32 L68 36 L64 40 ..."
  fill="url(#gear-body)" />
<circle cx="40" cy="40" r="14" fill="url(#inner)" />
<circle cx="40" cy="40" r="7" fill="#707070" />`,
  },
  search: {
    elements: ["Metallring", "Glas-Linse", "Griff", "Glanzlicht-Ellipse"],
    techniques: ["radialGradient (Glaseffekt)", "Rotation für Griff", "Glanzlicht via Ellipse"],
    code: `{/* Metallring */}
<circle cx="32" cy="32" r="20"
  stroke="url(#ring-metal)" strokeWidth="7" />
{/* Glas */}
<circle cx="32" cy="32" r="16" fill="url(#lens-glass)" />
{/* Glanzlicht */}
<ellipse cx="26" cy="26" rx="7" ry="5"
  fill="white" opacity="0.6" transform="rotate(-30 26 26)" />`,
  },
  network: {
    elements: ["3 Monitor-Körper", "Bildschirme", "Verbindungslinien", "Ständer"],
    techniques: ["Gestrichelte Linien (strokeDasharray)", "Wiederholte Strukturen", "feDropShadow pro Gruppe"],
    code: `{/* Verbindungslinien */}
<line x1="40" y1="41" x2="18" y2="56"
  stroke="#B0B0B0" strokeWidth="2"
  strokeDasharray="3 2" />`,
  },
};

export default function SkeuomorphicIconsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedIcon = selectedId
    ? SKEUOMORPHIC_ICONS.find((i) => i.id === selectedId)
    : null;
  const selectedDetails = selectedId ? ICON_DETAILS[selectedId] : null;

  function handleCopyCode(id: string) {
    const details = ICON_DETAILS[id];
    if (!details) return;
    navigator.clipboard.writeText(details.code).then(() => {
      setCopiedId(id);
      toast.success("Code-Snippet kopiert");
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <section className="space-y-10">
      {/* ── Header ── */}
      <div>
        <p className="section-label mb-2">21 — Skeuomorphic Icons</p>
        <h2 className="font-display font-bold text-3xl tracking-tight mb-3">
          Skeuomorphisches Icon-Set
        </h2>
        <p className="text-muted-foreground font-ui text-base max-w-2xl">
          9 Icons im 3D-Plastik-Grau-Stil der klassischen macOS-Ära. Vollständig als SVG via Code –
          keine Bilddateien, maximale Skalierbarkeit. Jedes Icon nutzt SVG-Gradienten, Filter und
          Pfade um Tiefe, Glanzlichter und Materialität zu simulieren.
        </p>
      </div>

      {/* ── Stil-Beschreibung ── */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Stil-Merkmale</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Material", value: "Monochrom Grau", sub: "Plastik / Metall / Glas" },
            { label: "Tiefe", value: "3D-Projektion", sub: "Isometrische Seitenflächen" },
            { label: "Licht", value: "Oben-Links", sub: "Glanzlichter + Schatten" },
            { label: "Technik", value: "SVG-Gradienten", sub: "linearGradient / radialGradient" },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
              <p className="font-ui font-semibold text-sm text-foreground">{item.value}</p>
              <p className="font-ui text-xs text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Icon-Grid ── */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">Icon-Set — 9 Icons</p>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {SKEUOMORPHIC_ICONS.map(({ id, label, component: IconComponent }) => (
            <button
              key={id}
              onClick={() => setSelectedId(selectedId === id ? null : id)}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                selectedId === id
                  ? "border-foreground bg-muted"
                  : "border-border bg-background hover:border-muted-foreground"
              }`}
            >
              <IconComponent size={64} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground text-center leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Detail-Panel ── */}
      {selectedIcon && selectedDetails && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Linke Seite: Vorschau */}
            <div className="flex flex-col items-center justify-center gap-6 p-10 border-b md:border-b-0 md:border-r border-border bg-muted/30">
              {/* Verschiedene Größen */}
              <div className="flex items-end gap-6">
                <div className="flex flex-col items-center gap-2">
                  <selectedIcon.component size={128} />
                  <span className="font-mono text-[9px] text-muted-foreground">128px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <selectedIcon.component size={64} />
                  <span className="font-mono text-[9px] text-muted-foreground">64px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <selectedIcon.component size={32} />
                  <span className="font-mono text-[9px] text-muted-foreground">32px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <selectedIcon.component size={16} />
                  <span className="font-mono text-[9px] text-muted-foreground">16px</span>
                </div>
              </div>
              {/* Auf dunklem Hintergrund */}
              <div className="flex items-center justify-center w-full p-4 rounded-xl bg-[#1A1A1A]">
                <selectedIcon.component size={64} />
                <span className="font-mono text-[10px] text-[#666] ml-4">auf dunklem Hintergrund</span>
              </div>
            </div>

            {/* Rechte Seite: Details */}
            <div className="p-6 space-y-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  {selectedIcon.id.toUpperCase()}
                </p>
                <h3 className="font-display font-bold text-xl tracking-tight">{selectedIcon.label}</h3>
              </div>

              {/* Elemente */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">SVG-Elemente</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDetails.elements.map((el) => (
                    <span key={el} className="font-mono text-[10px] px-2 py-1 rounded border border-border bg-muted text-muted-foreground">
                      {el}
                    </span>
                  ))}
                </div>
              </div>

              {/* Techniken */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Techniken</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDetails.techniques.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-1 rounded border border-border bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code-Snippet */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Code-Snippet</p>
                  <button
                    onClick={() => handleCopyCode(selectedIcon.id)}
                    className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded border border-border bg-muted text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                  >
                    {copiedId === selectedIcon.id ? "✓ Kopiert" : "Kopieren"}
                  </button>
                </div>
                <pre className="font-mono text-[10px] leading-relaxed p-4 rounded-xl bg-[#0A0A0A] text-[#E4FF97] overflow-x-auto whitespace-pre-wrap">
                  {selectedDetails.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Größen-Referenz ── */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">Größen-Referenz</p>
        <div className="flex items-end gap-8 flex-wrap">
          {[128, 64, 48, 32, 24, 16].map((size) => (
            <div key={size} className="flex flex-col items-center gap-3">
              <IconGear size={size} />
              <span className="font-mono text-[9px] text-muted-foreground">{size}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Verwendungshinweis ── */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Verwendung</p>
        <pre className="font-mono text-[11px] leading-relaxed p-4 rounded-xl bg-[#0A0A0A] text-[#E4FF97] overflow-x-auto">
{`import { IconFolder, IconGear, IconSearch } from "@/components/volt/SkeuomorphicIcons";

// Größe via size-Prop (default: 80px)
<IconFolder size={64} />
<IconGear size={32} className="opacity-80" />

// Alle Icons als Array
import { SKEUOMORPHIC_ICONS } from "@/components/volt/SkeuomorphicIcons";
{SKEUOMORPHIC_ICONS.map(({ id, label, component: Icon }) => (
  <Icon key={id} size={48} />
))}`}
        </pre>
      </div>
    </section>
  );
}
