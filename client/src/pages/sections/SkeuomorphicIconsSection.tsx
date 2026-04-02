/**
 * SkeuomorphicIconsSection – Volt UI
 * 18 skeuomorphische SVG-Icons im 3D-Plastik-Grau-Stil
 */

import React, { useState } from "react";
import { toast } from "sonner";
import {
  SKEU_ICONS,
  IconSettings,
} from "@/components/volt/SkeuomorphicIcons";

type IconEntry = typeof SKEU_ICONS[number];

/* ── Technische Details pro Icon ── */
const ICON_DETAILS: Record<string, {
  elements: string[];
  techniques: string[];
  code: string;
}> = {
  finder: {
    elements: ["Abgerundetes Rechteck", "Linke Hälfte (dunkler)", "Augen-Ellipsen", "Lächeln-Pfad"],
    techniques: ["linearGradient (vertikal)", "feDropShadow", "Glanzlicht-Overlay (white 55%)"],
    code: `<linearGradient id="bg" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
  <stop offset="0%" stopColor="#EBEBEB" />
  <stop offset="100%" stopColor="#AAAAAA" />
</linearGradient>
<rect x="6" y="6" width="52" height="52" rx="12"
  fill="url(#bg)" filter="url(#shadow)" />`,
  },
  document: {
    elements: ["Hinteres Blatt (rotiert)", "Vorderes Blatt", "Eselsohren-Ecke", "Linien"],
    techniques: ["rotate() transform", "Mehrfach-Layering", "Glanzlicht-Overlay"],
    code: `{/* Hinteres Blatt, leicht rotiert */}
<rect x="17" y="10" width="34" height="44" rx="3"
  fill="url(#p2)" transform="rotate(-5 34 32)" />
{/* Eselsohren-Ecke */}
<path d="M37 8 L49 8 L49 20 Z" fill="#C0C0C0" />`,
  },
  folder: {
    elements: ["Rückwand + Tab", "Vorderwand", "Glanzlicht-Bogen"],
    techniques: ["Zwei-Schicht-Aufbau", "Organischer Glanzlicht-Bogen", "feDropShadow"],
    code: `{/* Rückwand */}
<path d="M8 26 L8 52 Q8 56 12 56 L52 56 ..." fill="url(#bk)" />
{/* Tab */}
<path d="M8 26 L8 20 Q8 16 12 16 L26 16 ..." fill="url(#bk)" />
{/* Vorderwand */}
<path d="M8 32 L8 52 Q8 56 12 56 ..." fill="url(#fr)" />`,
  },
  trash: {
    elements: ["Deckel + Griff", "Zylindrischer Körper", "Vertikale Streifen"],
    techniques: ["linearGradient", "feDropShadow", "Glanzlicht-Dreieck"],
    code: `{/* Deckel */}
<rect x="10" y="14" width="44" height="7" rx="3.5" fill="#C8C8C8" />
{/* Streifen */}
<line x1="26" y1="28" x2="25" y2="51"
  stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />`,
  },
  settings: {
    elements: ["Zahnrad-Pfad", "Innerer Kreis", "radialGradient", "Glanzlicht-Ellipse"],
    techniques: ["Komplexer Polygon-Pfad", "radialGradient (Tiefe)", "Konzentrische Kreise"],
    code: `<path d="M32 4 L36 4 L38 10 Q42 11 45 13 ..."
  fill="url(#bd)" filter="url(#sd)" />
<circle cx="32" cy="32" r="11" fill="url(#rg)" />`,
  },
  search: {
    elements: ["Metallring", "Glas-Linse", "Griff", "Glanzlicht-Ellipse"],
    techniques: ["radialGradient (Glaseffekt)", "Rotation für Griff", "Glanzlicht via Ellipse"],
    code: `{/* Linsenring */}
<circle cx="25" cy="25" r="18" fill="url(#gl)" />
{/* Glas */}
<circle cx="25" cy="25" r="13" fill="url(#rg)" />
{/* Glanzlicht */}
<ellipse cx="20" cy="19" rx="5" ry="3.5"
  fill="white" opacity="0.55" transform="rotate(-20 20 19)" />`,
  },
  cloud: {
    elements: ["Organischer Wolkenpfad", "Pfeil nach oben", "Glanzlicht-Maske"],
    techniques: ["Komplexer SVG-Pfad", "linearGradient", "Glanzlicht via Pfad"],
    code: `<path d="M46 42 C52 42 57 37 57 31 ..."
  fill="url(#bd)" filter="url(#sd)" />
{/* Pfeil */}
<line x1="32" y1="54" x2="32" y2="36"
  stroke="#999" strokeWidth="3.5" strokeLinecap="round" />`,
  },
  download: {
    elements: ["Schaft", "Pfeilkopf", "Basis-Balken", "Glanzlichter"],
    techniques: ["linearGradient", "feDropShadow", "Glanzlicht-Overlay"],
    code: `{/* Schaft */}
<rect x="26" y="8" width="12" height="30" rx="2" fill="url(#fc)" />
{/* Pfeilkopf */}
<path d="M14 36 L32 54 L50 36 Z" fill="url(#fc)" />
{/* Basis */}
<rect x="10" y="54" width="44" height="6" rx="3" fill="url(#fc)" />`,
  },
  network: {
    elements: ["Verbindungslinien", "Satelliten-Knoten", "Zentrum-Kreis", "Glanzlichter"],
    techniques: ["radialGradient", "feDropShadow", "Wiederholte Kreise"],
    code: `{/* Verbindungslinien */}
<line x1="32" y1="32" x2="12" y2="14"
  stroke="#C0C0C0" strokeWidth="2.5" />
{/* Knoten */}
<circle cx="12" cy="14" r="6" fill="url(#nd)" />
{/* Zentrum */}
<circle cx="32" cy="32" r="10" fill="url(#nd)" />`,
  },
  mail: {
    elements: ["Umschlag-Körper", "V-Falz", "Innenfläche", "Glanzlicht"],
    techniques: ["linearGradient", "feDropShadow", "Glanzlicht-Overlay"],
    code: `<rect x="6" y="16" width="52" height="36" rx="4"
  fill="url(#bd)" filter="url(#sd)" />
{/* V-Falz */}
<path d="M6 16 L32 36 L58 16"
  stroke="#AAAAAA" strokeWidth="2" fill="none" />`,
  },
  calendar: {
    elements: ["Körper", "Kopfzeile", "Bindungsringe", "Tage-Grid"],
    techniques: ["linearGradient", "Array.map für Grid", "feDropShadow"],
    code: `{/* Tage-Grid via map */}
{[0,1,2,3,4,5].map(col => [0,1,2].map(row => (
  <rect key={\`\${col}-\${row}\`}
    x={12 + col * 7} y={31 + row * 8}
    width="5" height="5" rx="1.5"
    fill={col===0 && row===0 ? "#888" : "#C8C8C8"} />
)))}`,
  },
  camera: {
    elements: ["Gehäuse", "Sucher-Buckel", "Linsen-Ring", "Glas + Glanzlicht"],
    techniques: ["linearGradient + radialGradient", "Konzentrische Kreise", "Glanzlicht-Ellipse"],
    code: `{/* Linsen-Ring */}
<circle cx="32" cy="36" r="14" fill="url(#ln)" />
{/* Glas */}
<circle cx="32" cy="36" r="10" fill="url(#rg)" />
{/* Glanzlicht */}
<ellipse cx="28" cy="31" rx="3.5" ry="2.5"
  fill="white" opacity="0.6" transform="rotate(-25 28 31)" />`,
  },
  music: {
    elements: ["Notenhals", "Fähnchen", "Notenkopf (elliptisch)", "Glanzlichter"],
    techniques: ["linearGradient", "Ellipse + rotate", "Glanzlicht-Overlay"],
    code: `{/* Notenhals */}
<rect x="30" y="8" width="5" height="36" rx="2.5" fill="url(#bd)" />
{/* Notenkopf */}
<ellipse cx="24" cy="46" rx="9" ry="7"
  fill="url(#bd)" transform="rotate(-15 24 46)" />`,
  },
  browser: {
    elements: ["Fenster-Körper", "Toolbar", "Traffic-Lights", "Content-Linien"],
    techniques: ["linearGradient", "feDropShadow", "Glanzlicht-Overlay"],
    code: `{/* Toolbar */}
<rect x="6" y="8" width="52" height="18" rx="6" fill="url(#tb)" />
{/* Traffic-Lights */}
<circle cx="17" cy="17" r="4" fill="#C0C0C0" />
<circle cx="28" cy="17" r="4" fill="#C8C8C8" />
<circle cx="39" cy="17" r="4" fill="#D0D0D0" />`,
  },
  notes: {
    elements: ["Körper", "Spiralbindung", "Lochkreise", "Linien"],
    techniques: ["linearGradient", "Array.map für Löcher", "feDropShadow"],
    code: `{/* Spiralbindung */}
<rect x="10" y="6" width="8" height="52" rx="4" fill="url(#ln)" />
{/* Löcher via map */}
{[14, 22, 30, 38, 46].map(y => (
  <circle key={y} cx="14" cy={y} r="3"
    fill="#EEEEEE" stroke="#C0C0C0" strokeWidth="1" />
))}`,
  },
  contacts: {
    elements: ["Karte", "Avatar-Kreis", "Person-Silhouette", "Linien rechts"],
    techniques: ["radialGradient", "feDropShadow", "Glanzlicht-Overlay"],
    code: `{/* Avatar */}
<circle cx="24" cy="28" r="10" fill="url(#av)" />
<circle cx="24" cy="25" r="5" fill="#C0C0C0" />
<path d="M14 38 Q14 32 24 32 Q34 32 34 38"
  fill="#C0C0C0" />`,
  },
  terminal: {
    elements: ["Fenster (dunkel)", "Toolbar", "Traffic-Lights", "Prompt-Text"],
    techniques: ["linearGradient (dunkel)", "SVG text-Element", "feDropShadow"],
    code: `{/* Dunkler Hintergrund */}
<rect x="6" y="8" width="52" height="48" rx="6"
  fill="url(#bd)" />
{/* Prompt */}
<text x="12" y="36" fontFamily="monospace"
  fontSize="8" fill="#AAAAAA">$ volt run</text>`,
  },
  lock: {
    elements: ["Bügel", "Körper", "Schlüsselloch", "Glanzlichter"],
    techniques: ["linearGradient", "feDropShadow", "Glanzlicht-Overlay"],
    code: `{/* Bügel */}
<path d="M18 30 L18 20 Q18 8 32 8 Q46 8 46 20 L46 30"
  stroke="url(#bd)" strokeWidth="8"
  strokeLinecap="round" fill="none" />
{/* Schlüsselloch */}
<circle cx="32" cy="40" r="5" fill="#AAAAAA" />`,
  },
};

export default function SkeuomorphicIconsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedIcon = selectedId
    ? (SKEU_ICONS.find((i: IconEntry) => i.id === selectedId) ?? null)
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
        <p className="section-label mb-2">Skeuomorphic Icons</p>
        <h2 className="font-display font-bold text-3xl tracking-tight mb-3">
          Skeuomorphisches Icon-Set
        </h2>
        <p className="text-muted-foreground font-ui text-base max-w-2xl">
          Icons im 3D-Plastik-Grau-Stil der klassischen macOS-Ära. Vollständig als SVG via Code –
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
            { label: "ViewBox", value: "0 0 64 64", sub: "Einheitliche Proportionen" },
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
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
          Icon-Set — {SKEU_ICONS.length} Icons
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
          {SKEU_ICONS.map(({ id, label, Component }: IconEntry) => (
            <button
              key={id}
              onClick={() => setSelectedId(selectedId === id ? null : id)}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                selectedId === id
                  ? "border-foreground bg-muted"
                  : "border-border bg-background hover:border-muted-foreground"
              }`}
            >
              <Component size={52} />
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
              <div className="flex items-end gap-6">
                {[128, 64, 32, 16].map((sz) => (
                  <div key={sz} className="flex flex-col items-center gap-2">
                    <selectedIcon.Component size={sz} />
                    <span className="font-mono text-[9px] text-muted-foreground">{sz}px</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full p-4 rounded-xl bg-[#1A1A1A]">
                <selectedIcon.Component size={64} />
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
              <IconSettings size={size} />
              <span className="font-mono text-[9px] text-muted-foreground">{size}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Verwendungshinweis ── */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Verwendung</p>
        <pre className="font-mono text-[11px] leading-relaxed p-4 rounded-xl bg-[#0A0A0A] text-[#E4FF97] overflow-x-auto">
{`import { IconFolder, IconSettings, IconSearch } from "@/components/volt/SkeuomorphicIcons";

// Größe via size-Prop (default: 64px)
<IconFolder size={64} />
<IconSettings size={32} className="opacity-80" />

// Alle Icons als Array
import { SKEU_ICONS } from "@/components/volt/SkeuomorphicIcons";
{SKEU_ICONS.map(({ id, label, Component }) => (
  <Component key={id} size={48} />
))}`}
        </pre>
      </div>
    </section>
  );
}
