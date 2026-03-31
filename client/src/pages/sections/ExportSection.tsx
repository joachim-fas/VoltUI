/**
 * ExportSection – Volt UI
 * Import-Anleitung, CSS-Download, Code-Snippets für alle Zielplattformen
 * Design: Weiß + Schwarz + Lime – terminal-inspiriert
 */

import React, { useState } from "react";
import { Check, Copy, Download, Terminal, Code2, FileCode, Globe, Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Copy-Button ── */
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 bg-card/10 hover:bg-card/20 text-white/70 hover:text-white"
    >
      {copied ? <Check className="w-3 h-3 text-[#E4FF97]" /> : <Copy className="w-3 h-3" />}
      {copied ? "Kopiert" : "Kopieren"}
    </button>
  );
};

/* ── Code-Block ── */
const CodeBlock: React.FC<{ code: string; lang?: string; label?: string; dark?: boolean }> = ({
  code, lang = "html", label, dark = true,
}) => (
  <div className={cn("rounded-2xl overflow-hidden border", dark ? "border-white/10" : "border-border")}>
    <div className={cn("flex items-center justify-between px-5 py-3 border-b", dark ? "bg-[#0A0A0A] border-white/10" : "bg-secondary border-border")}>
      <div className="flex items-center gap-2">
        <span className={cn("font-mono text-xs", dark ? "text-[#E4FF97]" : "text-muted-foreground")}>&gt;_</span>
        {label && <span className={cn("font-mono text-xs", dark ? "text-white/40" : "text-muted-foreground")}>{label}</span>}
        {lang && <span className={cn("text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded", dark ? "bg-white/10 text-white/30" : "bg-border text-muted-foreground")}>{lang}</span>}
      </div>
      <CopyButton text={code} />
    </div>
    <pre className={cn("font-mono text-sm p-5 overflow-x-auto leading-relaxed", dark ? "bg-[#111111] text-[#E4FF97]/90" : "bg-white text-[#0A0A0A]")}>
      <code>{code}</code>
    </pre>
  </div>
);

/* ── Plattform-Tabs ── */
const PLATFORMS = [
  { id: "html",    label: "Plain HTML",     icon: <Globe className="w-4 h-4" /> },
  { id: "react",   label: "React / Vite",   icon: <Cpu className="w-4 h-4" /> },
  { id: "claude",  label: "Claude Code",    icon: <Terminal className="w-4 h-4" /> },
  { id: "next",    label: "Next.js",        icon: <Code2 className="w-4 h-4" /> },
  { id: "figma",   label: "Figma / Tokens", icon: <FileCode className="w-4 h-4" /> },
];

const SNIPPETS: Record<string, { steps: { title: string; code: string; lang: string; desc: string }[] }> = {
  html: {
    steps: [
      {
        title: "1. CSS-Datei einbinden",
        lang: "html",
        desc: "Lade die volt-ui.css herunter und verlinke sie im <head> deiner HTML-Datei. Alle Tokens und Utility-Klassen sind sofort verfügbar.",
        code: `<!-- Im <head> deiner HTML-Datei -->
<link rel="stylesheet" href="volt-ui.css">

<!-- Oder via CDN (nach Veröffentlichung) -->
<link rel="stylesheet" href="https://cdn.volt-ui.design/volt-ui.css">`,
      },
      {
        title: "2. Erste Komponente",
        lang: "html",
        desc: "Verwende die Flux-Klassen direkt in deinem HTML. Keine JavaScript-Abhängigkeiten nötig.",
        code: `<!-- Button -->
<button class="flux-btn flux-btn-lime">
  Jetzt starten →
</button>

<!-- Card -->
<div class="flux-card">
  <h2 class="flux-heading">Titel</h2>
  <p class="flux-body">Inhalt der Karte</p>
</div>

<!-- Badge -->
<span class="flux-badge flux-badge-lime">Neu</span>`,
      },
      {
        title: "3. Design Tokens nutzen",
        lang: "css",
        desc: "Alle Farben, Abstände und Typografie-Werte sind als CSS-Variablen verfügbar.",
        code: `/* Eigene Styles mit Flux-Tokens */
.mein-element {
  background: var(--flux-lime);       /* #E4FF97 */
  color: var(--flux-black);           /* #0A0A0A */
  font-family: var(--font-display);   /* Bricolage Grotesque */
  border-radius: var(--radius-xl);    /* 1rem */
  padding: var(--spacing-6);          /* 1.5rem */
}`,
      },
    ],
  },
  react: {
    steps: [
      {
        title: "1. CSS importieren",
        lang: "tsx",
        desc: "Importiere volt-ui.css in deiner main.tsx oder App.tsx. Alle Tokens sind dann global verfügbar.",
        code: `// main.tsx oder App.tsx
import "./volt-ui.css";

// Oder als npm-Paket (nach Veröffentlichung)
import "volt-ui/styles";`,
      },
      {
        title: "2. Komponenten kopieren",
        lang: "tsx",
        desc: "Kopiere die gewünschten Komponenten aus dem /components/volt/ Verzeichnis in dein Projekt. Jede Komponente ist eigenständig und hat keine externen Abhängigkeiten außer React.",
        code: `// Komponenten direkt aus dem Volt UI Repo kopieren:
// src/components/volt/VoltButton.tsx
// src/components/volt/VoltCard.tsx
// src/components/volt/VoltBadge.tsx
// ... etc.

import { VoltButton } from "@/components/volt/VoltButton";
import { VoltCard }   from "@/components/volt/VoltCard";

export function App() {
  return (
    <VoltCard>
      <VoltButton variant="lime">
        Volt UI · Design Concept
      </VoltButton>
    </VoltCard>
  );
}`,
      },
      {
        title: "3. Tailwind-Konfiguration",
        lang: "css",
        desc: "Falls du Tailwind CSS verwendest, füge die Flux-Tokens in deine index.css ein. Die @theme-Direktive registriert alle Tokens als Tailwind-Utilities.",
        code: `/* index.css – Volt UI Tokens für Tailwind 4 */
@import "tailwindcss";

@theme inline {
  --color-flux-lime:    #E4FF97;
  --color-flux-black:   #0A0A0A;
  --color-flux-signal-positive: #1A9E5A;
  --color-flux-signal-negative: #E8402A;
  --color-flux-signal-neutral:  #6B7A9A;

  --font-display: "Bricolage Grotesque", sans-serif;
  --font-ui:      "DM Sans", sans-serif;
  --font-body:    "Lora", serif;
  --font-mono:    "JetBrains Mono", monospace;
}`,
      },
    ],
  },
  claude: {
    steps: [
      {
        title: "1. System-Prompt mit Volt UI Kontext",
        lang: "text",
        desc: "Füge diesen Kontext am Anfang deines Claude-Code-Projekts ein. Claude wird dann automatisch Flux-UI-konforme Komponenten generieren.",
        code: `# Volt UI Design System

Du arbeitest mit dem Volt UI Design System.

## Kern-Tokens
- Primärfarbe: #E4FF97 (Lime)
- Hintergrund: #FFFFFF
- Text: #0A0A0A
- Akzent-Positiv: #1A9E5A
- Akzent-Negativ: #E8402A

## Typografie
- Display: Bricolage Grotesque (Bold/Black)
- UI: DM Sans (Regular/Medium)
- Body: Lora (Regular)
- Mono: JetBrains Mono

## Designprinzipien
- Terminal-inspiriert: >_ Signet, Mono-Akzente
- Atmosphärisch: SVG-Volt-Textur auf Flächen
- Kontrastreich: Lime + Schwarz als Primärpaar
- Portabel: Alle Styles als CSS-Variablen

## Komponenten-Konventionen
- Buttons: rounded-xl, font-display font-bold
- Cards: border border-border, rounded-2xl
- Labels: font-mono uppercase tracking-widest text-[10px]
- Badges: rounded-full, font-mono text-xs`,
      },
      {
        title: "2. Komponenten-Prompt",
        lang: "text",
        desc: "Verwende diesen Prompt um neue Komponenten im Flux-UI-Stil zu generieren.",
        code: `Erstelle eine React-Komponente im Volt UI Stil:

Anforderungen:
- Farben: Lime #E4FF97, Schwarz #0A0A0A, Weiß #FFFFFF
- Typografie: font-display (Bricolage Grotesque) für Headlines,
  font-ui (DM Sans) für Body, font-mono für Labels
- Abstände: Tailwind spacing (p-4, p-6, p-8, gap-3, gap-4)
- Rahmen: border border-border, rounded-xl oder rounded-2xl
- Hover: hover:border-[#0A0A0A], hover:-translate-y-0.5
- Kein Violett, kein Blau, keine Schatten-Überladung
- Section-Labels: text-[10px] font-mono uppercase tracking-widest text-muted-foreground`,
      },
      {
        title: "3. volt-ui.css einbinden",
        lang: "bash",
        desc: "Lade die volt-ui.css herunter und platziere sie im public/-Verzeichnis deines Projekts.",
        code: `# volt-ui.css in dein Projekt kopieren
cp volt-ui.css ./public/volt-ui.css

# In index.html einbinden
# <link rel="stylesheet" href="/volt-ui.css">

# Oder in main.tsx importieren
# import "/volt-ui.css";`,
      },
    ],
  },
  next: {
    steps: [
      {
        title: "1. Fonts einbinden",
        lang: "tsx",
        desc: "Füge die Flux-UI-Schriften in dein Next.js-Layout ein. Alle vier Schriftschnitte werden via Google Fonts geladen.",
        code: `// app/layout.tsx
import { Bricolage_Grotesque, DM_Sans, Lora, JetBrains_Mono } from "next/font/google";
import "./volt-ui.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const ui      = DM_Sans({ subsets: ["latin"], variable: "--font-ui" });
const body    = Lora({ subsets: ["latin"], variable: "--font-body" });
const mono    = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={\`\${display.variable} \${ui.variable} \${body.variable} \${mono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`,
      },
      {
        title: "2. CSS-Variablen in globals.css",
        lang: "css",
        desc: "Kopiere die Flux-Token-Definitionen in deine globals.css.",
        code: `/* globals.css */
:root {
  --flux-lime:    #E4FF97;
  --flux-black:   #0A0A0A;
  --flux-white:   #FFFFFF;
  --flux-signal-positive: #1A9E5A;
  --flux-signal-negative: #E8402A;
  --flux-signal-neutral:  #6B7A9A;

  --radius-sm:  0.5rem;
  --radius-md:  0.75rem;
  --radius-lg:  1rem;
  --radius-xl:  1.25rem;
  --radius-2xl: 1.5rem;
}`,
      },
      {
        title: "3. Komponenten importieren",
        lang: "tsx",
        desc: "Kopiere das /components/volt/ Verzeichnis in dein Next.js-Projekt und passe den Import-Pfad an.",
        code: `// Komponenten kopieren nach: components/flux/
// Dann importieren:
import { VoltButton } from "@/components/flux/VoltButton";
import { VoltCard }   from "@/components/flux/VoltCard";
import { VoltBadge }  from "@/components/flux/VoltBadge";

export default function Page() {
  return (
    <main className="p-8">
      <VoltCard>
        <h1 className="font-display font-bold text-3xl">
          Volt UI in Next.js
        </h1>
        <VoltButton variant="lime">Los geht's →</VoltButton>
      </VoltCard>
    </main>
  );
}`,
      },
    ],
  },
  figma: {
    steps: [
      {
        title: "1. Design Tokens als JSON",
        lang: "json",
        desc: "Importiere diese Token-Definitionen in Figma via dem Token Studio Plugin oder einem anderen Token-Manager.",
        code: `{
  "color": {
    "flux-lime":   { "value": "#E4FF97", "type": "color" },
    "flux-black":  { "value": "#0A0A0A", "type": "color" },
    "flux-white":  { "value": "#FFFFFF", "type": "color" },
    "signal": {
      "positive":  { "value": "#1A9E5A", "type": "color" },
      "negative":  { "value": "#E8402A", "type": "color" },
      "neutral":   { "value": "#6B7A9A", "type": "color" }
    },
    "pastel": {
      "rose":      { "value": "#FFD6E0", "type": "color" },
      "mint":      { "value": "#C3F4D3", "type": "color" },
      "orchid":    { "value": "#FDE2FF", "type": "color" },
      "butter":    { "value": "#FFF5BA", "type": "color" },
      "sky":       { "value": "#D4E8FF", "type": "color" }
    }
  },
  "typography": {
    "display":  { "value": "Bricolage Grotesque", "type": "fontFamily" },
    "ui":       { "value": "DM Sans",             "type": "fontFamily" },
    "body":     { "value": "Lora",                "type": "fontFamily" },
    "mono":     { "value": "JetBrains Mono",      "type": "fontFamily" }
  },
  "spacing": {
    "1": { "value": "0.25rem" }, "2": { "value": "0.5rem" },
    "3": { "value": "0.75rem" }, "4": { "value": "1rem" },
    "6": { "value": "1.5rem" },  "8": { "value": "2rem" },
    "12": { "value": "3rem" },   "16": { "value": "4rem" }
  },
  "borderRadius": {
    "sm":  { "value": "0.5rem" },  "md": { "value": "0.75rem" },
    "lg":  { "value": "1rem" },    "xl": { "value": "1.25rem" },
    "2xl": { "value": "1.5rem" },  "3xl": { "value": "2rem" }
  }
}`,
      },
      {
        title: "2. Schriften installieren",
        lang: "text",
        desc: "Installiere alle vier Schriften aus Google Fonts in Figma (Figma → Ressourcen → Schriften).",
        code: `Benötigte Google Fonts:

1. Bricolage Grotesque
   → Stärken: Bold (700), ExtraBold (800), Black (900)
   → Verwendung: Headlines, Display-Text, Logos

2. DM Sans
   → Stärken: Regular (400), Medium (500), SemiBold (600)
   → Verwendung: UI-Text, Buttons, Labels

3. Lora
   → Stärken: Regular (400), Italic
   → Verwendung: Fließtext, Zitate, Beschreibungen

4. JetBrains Mono
   → Stärken: Regular (400), Medium (500)
   → Verwendung: Code, Labels, Badges, Monospace-Akzente`,
      },
      {
        title: "3. Flux-Signet als SVG",
        lang: "svg",
        desc: "Das >_ Signet als reiner SVG-Code – direkt in Figma einfügbar.",
        code: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
  <!-- Pfeil > -->
  <path d="M8 10 L38 30 L8 50" stroke="#0A0A0A"
    stroke-width="8" stroke-linecap="round"
    stroke-linejoin="round" fill="none"/>
  <!-- Unterstrich _ -->
  <line x1="44" y1="50" x2="72" y2="50"
    stroke="#0A0A0A" stroke-width="8"
    stroke-linecap="round"/>
</svg>

<!-- Lime-Version (für dunkle Hintergründe) -->
<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 10 L38 30 L8 50" stroke="#E4FF97"
    stroke-width="8" stroke-linecap="round"
    stroke-linejoin="round" fill="none"/>
  <line x1="44" y1="50" x2="72" y2="50"
    stroke="#E4FF97" stroke-width="8"
    stroke-linecap="round"/>
</svg>`,
      },
    ],
  },
};

/* ── Hauptkomponente ── */
export const ExportSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState("html");
  const [copiedDownload, setCopiedDownload] = useState(false);

  const current = SNIPPETS[activePlatform];

  const handleDownloadCSS = () => {
    const link = document.createElement("a");
    link.href = "/volt-ui.css";
    link.download = "volt-ui.css";
    link.click();
    setCopiedDownload(true);
    setTimeout(() => setCopiedDownload(false), 2000);
  };

  return (
    <div className="space-y-16">

      {/* ── Header ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Export & Import</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-4 leading-tight">
          Volt UI in jedes Projekt importieren
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Das Design System ist portabel – eine CSS-Datei reicht für Plain HTML.
          Für React-Projekte stehen fertige Komponenten bereit.
          Für Claude Code gibt es einen fertigen System-Prompt.
        </p>
      </div>

      {/* ── Download-Banner ── */}
      <div className="rounded-2xl bg-[#0A0A0A] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#E4FF97] font-mono text-sm font-bold">&gt;_</span>
            <span className="text-white/40 font-mono text-xs">volt-ui.css · v1.0</span>
          </div>
          <p className="font-display font-bold text-xl text-white leading-snug mb-1">
            volt-ui.css herunterladen
          </p>
          <p className="text-white/50 text-sm font-ui">
            Alle Tokens, Utility-Klassen und Komponenten-Styles in einer Datei.
            Kein Build-Tool nötig.
          </p>
          <div className="flex items-center gap-4 mt-3">
            {[
              "48+ CSS-Variablen",
              "Alle Farb-Tokens",
              "Typografie-System",
              "Pattern-Klassen",
              "Gradient-Utilities",
            ].map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-[#E4FF97]/60 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleDownloadCSS}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E4FF97] text-foreground font-display font-bold text-sm hover:bg-[#D8F080] transition-colors shrink-0"
        >
          {copiedDownload
            ? <><Check className="w-4 h-4" /> Heruntergeladen</>
            : <><Download className="w-4 h-4" /> volt-ui.css herunterladen</>
          }
        </button>
      </div>

      {/* ── Plattform-Tabs ── */}
      <div>
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-medium border transition-all duration-200",
                activePlatform === p.id
                  ? "bg-[#0A0A0A] text-[#E4FF97] border-[#0A0A0A]"
                  : "bg-white text-[#4A4A4A] border-border hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
              )}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {current.steps.map((step, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E4FF97] flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[10px] text-foreground">{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-base text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-9">{step.desc}</p>
              <div className="pl-0">
                <CodeBlock code={step.code} lang={step.lang} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Schnell-Referenz: Wichtigste Klassen ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Schnell-Referenz</p>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Farb-Tokens",
              items: [
                { cls: "--flux-lime",             val: "#E4FF97" },
                { cls: "--flux-black",            val: "#0A0A0A" },
                { cls: "--flux-signal-positive",  val: "#1A9E5A" },
                { cls: "--flux-signal-negative",  val: "#E8402A" },
                { cls: "--flux-signal-neutral",   val: "#6B7A9A" },
              ],
            },
            {
              title: "Typografie",
              items: [
                { cls: "font-display",  val: "Bricolage Grotesque" },
                { cls: "font-ui",       val: "DM Sans" },
                { cls: "font-body",     val: "Lora" },
                { cls: "font-mono",     val: "JetBrains Mono" },
              ],
            },
            {
              title: "Patterns & Texturen",
              items: [
                { cls: ".pattern-dots",     val: "Radiale Punkte" },
                { cls: ".pattern-grid",     val: "Quadratisches Raster" },
                { cls: ".pattern-diagonal", val: "45° Diagonallinien" },
                { cls: ".pattern-circuit",  val: "Schaltkreis-Muster" },
                { cls: ".volt-texture",            val: "SVG-Volt-Textur" },
              ],
            },
            {
              title: "Gradienten",
              items: [
                { cls: ".bg-flux-gradient",    val: "Lime → Schwarz" },
                { cls: ".bg-atmospheric",      val: "Radiale Orbs" },
                { cls: ".bg-hero",             val: "Lime-Basis" },
                { cls: ".glass",               val: "65% Weiß + Blur" },
                { cls: ".glass-dark",          val: "72% Dunkel + Blur" },
              ],
            },
          ].map((group) => (
            <div key={group.title} className="rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-3 bg-secondary border-b border-border">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{group.title}</p>
              </div>
              <div className="divide-y divide-[#F0F0F0]">
                {group.items.map((item) => (
                  <div key={item.cls} className="flex items-center justify-between px-5 py-2.5">
                    <code className="font-mono text-xs text-foreground">{item.cls}</code>
                    <span className="text-xs text-muted-foreground font-ui">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA: Weiter zu Foundations ── */}
      <div className="rounded-2xl bg-[#E4FF97] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-xl text-foreground leading-snug mb-2">
            Bereit? Starte mit den Foundations.
          </p>
          <p className="text-foreground/60 text-sm font-ui leading-relaxed">
            Alle Design-Tokens, Farben und Typografie-Grundlagen im Überblick.
          </p>
        </div>
        <a
          href="#foundations"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A0A0A] text-[#E4FF97] font-display font-bold text-sm hover:bg-[#1A1A1A] transition-colors shrink-0"
        >
          Foundations erkunden <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
