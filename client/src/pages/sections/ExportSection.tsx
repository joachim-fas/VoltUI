/**
 * ExportSection – Volt UI
 * Import-Anleitung, CSS-Download, Code-Snippets für alle Zielplattformen
 * Design: Weiß + Schwarz + Lime – terminal-inspiriert
 */

import React, { useState } from "react";
import { Check, Copy, Download, Terminal, Code2, FileCode, Globe, Cpu, ArrowRight, ShoppingBag, Braces, Palette, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import JSZip from "jszip";

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
  { id: "figma",    label: "Figma / Tokens",  icon: <FileCode className="w-4 h-4" /> },
  { id: "shopify",  label: "Shopify / Liquid", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "css",      label: "CSS Export",       icon: <Palette className="w-4 h-4" /> },
  { id: "cssjs",    label: "CSS-in-JS",         icon: <Braces className="w-4 h-4" /> },
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
        desc: "Verwende die Volt-Klassen direkt in deinem HTML. Keine JavaScript-Abhängigkeiten nötig.",
        code: `<!-- Button -->
<button class="volt-btn volt-btn-lime">
  Jetzt starten →
</button>

<!-- Card -->
<div class="volt-card">
  <h2 class="volt-heading">Titel</h2>
  <p class="volt-body">Inhalt der Karte</p>
</div>

<!-- Badge -->
<span class="volt-badge volt-badge-lime">Neu</span>`,
      },
      {
        title: "3. Design Tokens nutzen",
        lang: "css",
        desc: "Alle Farben, Abstände und Typografie-Werte sind als CSS-Variablen verfügbar.",
        code: `/* Eigene Styles mit Volt-Tokens */
.mein-element {
  background: var(--volt-lime);       /* #E4FF97 */
  color: var(--volt-black);           /* #0A0A0A */
  font-family: var(--font-display);   /* Space Grotesk */
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
        desc: "Falls du Tailwind CSS verwendest, füge die Volt-Tokens in deine index.css ein. Die @theme-Direktive registriert alle Tokens als Tailwind-Utilities.",
        code: `/* index.css – Volt UI Tokens für Tailwind 4 */
@import "tailwindcss";

@theme inline {
  --color-volt-lime:    #E4FF97;
  --color-volt-black:   #0A0A0A;
  --color-volt-signal-positive: #1A9E5A;
  --color-volt-signal-negative: #E8402A;
  --color-volt-signal-neutral:  #6B7A9A;

  --font-display: "Space Grotesk", sans-serif;
  --font-ui:      "DM Sans", sans-serif;
  --font-body:    "DM Sans", sans-serif;
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
        desc: "Füge diesen Kontext am Anfang deines Claude-Code-Projekts ein. Claude wird dann automatisch Volt-UI-konforme Komponenten generieren.",
        code: `# Volt UI Design System

Du arbeitest mit dem Volt UI Design System.

## Kern-Tokens
- Primärfarbe: #E4FF97 (Lime)
- Hintergrund: #FFFFFF
- Text: #0A0A0A
- Akzent-Positiv: #1A9E5A
- Akzent-Negativ: #E8402A

## Typografie
- Display: Space Grotesk (Bold/Black)
- UI: DM Sans (Regular/Medium)
- Body: DM Sans (Regular)
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
        desc: "Verwende diesen Prompt um neue Komponenten im Volt-UI-Stil zu generieren.",
        code: `Erstelle eine React-Komponente im Volt UI Stil:

Anforderungen:
- Farben: Lime #E4FF97, Schwarz #0A0A0A, Weiß #FFFFFF
- Typografie: font-display (Space Grotesk) für Headlines,
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
        desc: "Füge die Volt-UI-Schriften in dein Next.js-Layout ein. Alle vier Schriftschnitte werden via Google Fonts geladen.",
        code: `// app/layout.tsx
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./volt-ui.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const ui      = DM_Sans({ subsets: ["latin"], variable: "--font-ui" });
const body    = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
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
        desc: "Kopiere die Volt-Token-Definitionen in deine globals.css.",
        code: `/* globals.css */
:root {
  --volt-lime:    #E4FF97;
  --volt-black:   #0A0A0A;
  --volt-white:   #FFFFFF;
  --volt-signal-positive: #1A9E5A;
  --volt-signal-negative: #E8402A;
  --volt-signal-neutral:  #6B7A9A;

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
        code: `// Komponenten kopieren nach: components/volt/
// Dann importieren:
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltCard }   from "@/components/volt/VoltCard";
import { VoltBadge }  from "@/components/volt/VoltBadge";

export default function Page() {
  return (
    <main className="p-8">
      <VoltCard>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight">
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
  shopify: {
    steps: [
      {
        title: "1. settings_schema.json – Design Tokens",
        lang: "json",
        desc: "Füge diese Einträge in deine settings_schema.json ein. Shopify-Händler können die Volt-Farben und Schriften dann direkt im Theme-Editor anpassen.",
        code: `{
  "name": "Volt UI – Design Tokens",
  "settings": [
    { "type": "header", "content": "Farben" },
    {
      "type": "color",
      "id": "volt_lime",
      "label": "Volt Lime",
      "default": "#E4FF97"
    },
    {
      "type": "color",
      "id": "volt_black",
      "label": "Volt Schwarz",
      "default": "#0A0A0A"
    },
    {
      "type": "color",
      "id": "volt_positive",
      "label": "Signal Positiv",
      "default": "#1A9E5A"
    },
    {
      "type": "color",
      "id": "volt_negative",
      "label": "Signal Negativ",
      "default": "#E8402A"
    },
    { "type": "header", "content": "Typografie" },
    {
      "type": "font_picker",
      "id": "volt_font_display",
      "label": "Display-Schrift",
      "default": "space_grotesk_n7"
    },
    {
      "type": "font_picker",
      "id": "volt_font_body",
      "label": "Fließtext-Schrift",
      "default": "dm_sans_n4"
    },
    { "type": "header", "content": "Abstände & Radien" },
    {
      "type": "range",
      "id": "volt_radius",
      "label": "Eckenradius (px)",
      "min": 0, "max": 24, "step": 2,
      "default": 12
    }
  ]
}`,
      },
      {
        title: "2. Liquid-Snippet: volt-tokens.liquid",
        lang: "liquid",
        desc: "Erstelle snippets/volt-tokens.liquid und binde es im theme.liquid <head> ein. Es schreibt alle Tokens als CSS-Variablen ins Dokument.",
        code: `{%- comment -%}
  Volt UI – Design Tokens als CSS-Variablen
  Einbinden: {% render 'volt-tokens' %}
{%- endcomment -%}
<style>
  :root {
    --volt-lime:    {{ settings.volt_lime }};
    --volt-black:   {{ settings.volt_black }};
    --volt-positive: {{ settings.volt_positive }};
    --volt-negative: {{ settings.volt_negative }};

    --font-display: {{ settings.volt_font_display.family }},
                    {{ settings.volt_font_display.fallback_families }};
    --font-body:    {{ settings.volt_font_body.family }},
                    {{ settings.volt_font_body.fallback_families }};
    --font-mono:    'JetBrains Mono', monospace;

    --radius-md: {{ settings.volt_radius }}px;
    --radius-lg: {{ settings.volt_radius | times: 1.5 | round }}px;
    --radius-xl: {{ settings.volt_radius | times: 2 }}px;
  }
</style>
{{ settings.volt_font_display | font_face }}
{{ settings.volt_font_body | font_face }}`,
      },
      {
        title: "3. Liquid-Snippet: volt-button.liquid",
        lang: "liquid",
        desc: "Wiederverwendbarer Button. Einbinden mit {% render 'volt-button', label: 'Jetzt kaufen', variant: 'lime' %}.",
        code: `{%- comment -%}
  Volt UI Button
  label   – Beschriftung (required)
  variant – 'lime' | 'outline' | 'ghost'
  url     – Link-URL (optional)
  size    – 'sm' | 'md' | 'lg'
{%- endcomment -%}
{%- assign variant = variant | default: 'lime' -%}
{%- assign size    = size    | default: 'md'   -%}
{%- if url -%}
  <a href="{{ url }}"
     class="volt-btn volt-btn-{{ variant }} volt-btn-{{ size }}">
    {{ label }}
  </a>
{%- else -%}
  <button type="button"
     class="volt-btn volt-btn-{{ variant }} volt-btn-{{ size }}">
    {{ label }}
  </button>
{%- endif -%}`,
      },
      {
        title: "4. Liquid-Snippet: volt-product-card.liquid",
        lang: "liquid",
        desc: "Produkt-Karte im Volt-Stil. Einbinden mit {% render 'volt-product-card', product: product %}.",
        code: `{%- comment -%}
  Volt UI Produkt-Karte
  product – Shopify-Produkt-Objekt (required)
  badge   – Badge-Text (optional)
{%- endcomment -%}
<div class="volt-card">
  {%- if product.featured_image -%}
    <div class="volt-card__image">
      {{ product.featured_image
         | image_url: width: 600
         | image_tag: loading: 'lazy',
                      alt: product.featured_image.alt }}
      {%- if badge -%}
        <span class="volt-badge volt-badge-lime">
          {{ badge }}
        </span>
      {%- endif -%}
    </div>
  {%- endif -%}
  <div class="volt-card__body">
    <p class="volt-label">{{ product.type }}</p>
    <h3 class="volt-heading">{{ product.title }}</h3>
    <p class="volt-price">{{ product.price | money }}</p>
    {%- render 'volt-button',
      label: 'In den Warenkorb',
      variant: 'lime',
      url: product.url
    -%}
  </div>
</div>`,
      },
    ],
  },
  css: {
    steps: [
      {
        title: "1. Vollständige CSS Custom Properties",
        lang: "css",
        desc: "Alle Volt-Design-Tokens als native CSS Custom Properties – framework-unabhängig, funktioniert in jedem Browser ab 2017. Direkt in deine bestehende CSS-Datei kopieren.",
        code: `/* ═══════════════════════════════════════
   VOLT UI – CSS Custom Properties v1.0
   volt-ui.design
═══════════════════════════════════════ */

:root {
  /* ── Primärfarben ── */
  --volt-lime:    #E4FF97;
  --volt-black:   #0A0A0A;
  --volt-white:   #FFFFFF;

  /* ── Signal-Farben ── */
  --volt-positive: #1A9E5A;
  --volt-negative: #E8402A;
  --volt-neutral:  #6B7A9A;

  /* ── Pastell-Palette ── */
  --volt-rose:    #FFD6E0;
  --volt-peach:   #FFECD2;
  --volt-mint:    #C3F4D3;
  --volt-orchid:  #FDE2FF;
  --volt-sky:     #D4E8FF;
  --volt-butter:  #FFF5BA;

  /* ── Typografie ── */
  --font-display: 'Space Grotesk', sans-serif;
  --font-ui:      'DM Sans', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* ── Schriftgrößen ── */
  --text-xs:   0.75rem;   --text-sm:   0.875rem;
  --text-base: 1rem;      --text-lg:   1.125rem;
  --text-xl:   1.25rem;   --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;  --text-4xl:  2.25rem;
  --text-5xl:  3rem;

  /* ── Abstände ── */
  --space-1:  0.25rem;  --space-2:  0.5rem;
  --space-3:  0.75rem;  --space-4:  1rem;
  --space-6:  1.5rem;   --space-8:  2rem;
  --space-12: 3rem;     --space-16: 4rem;

  /* ── Eckenradien ── */
  --radius-sm:  0.375rem;  --radius-md:  0.5rem;
  --radius-lg:  0.75rem;   --radius-xl:  1rem;
  --radius-2xl: 1.25rem;   --radius-full: 9999px;

  /* ── Schatten ── */
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,.10);
  --shadow-lg: 0 10px 30px rgba(0,0,0,.12);

  /* ── Übergänge ── */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;

  /* ── Z-Index ── */
  --z-overlay: 100;
  --z-modal:   200;
  --z-toast:   300;
}`,
      },
      {
        title: "2. Basis-Komponenten in reinem CSS",
        lang: "css",
        desc: "Fertige Komponenten-Styles ohne JavaScript-Abhängigkeiten. Direkt in deine stylesheet.css kopieren.",
        code: `/* ── Volt Button ── */
.volt-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-xl);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-sm);
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--duration-normal) var(--ease-out);
  text-decoration: none;
}
.volt-btn-lime {
  background: var(--volt-lime);
  color: var(--volt-black);
  border-color: var(--volt-lime);
}
.volt-btn-lime:hover {
  background: #d4f070;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.volt-btn-outline {
  background: transparent;
  color: var(--volt-black);
  border-color: var(--volt-black);
}
.volt-btn-outline:hover {
  background: var(--volt-black);
  color: var(--volt-white);
}

/* ── Volt Card ── */
.volt-card {
  background: var(--volt-white);
  border: 1px solid rgba(0,0,0,.10);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration-normal) var(--ease-out);
}
.volt-card:hover { box-shadow: var(--shadow-md); }

/* ── Volt Badge ── */
.volt-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--space-3);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.volt-badge-lime   { background: var(--volt-lime);  color: var(--volt-black); }
.volt-badge-muted  { background: rgba(0,0,0,.06);   color: rgba(0,0,0,.50); }

/* ── Volt Input ── */
.volt-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid rgba(0,0,0,.15);
  border-radius: var(--radius-lg);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.volt-input:focus {
  border-color: var(--volt-black);
  box-shadow: 0 0 0 3px rgba(228,255,151,.4);
}`,
      },
      {
        title: "3. Dark Mode via CSS Custom Properties",
        lang: "css",
        desc: "Automatischer Dark Mode über @media prefers-color-scheme oder manuell via .dark-Klasse am <html>-Element.",
        code: `/* ── Dark Mode (System) ── */
@media (prefers-color-scheme: dark) {
  :root {
    --volt-bg:      #0A0A0A;
    --volt-surface: #141414;
    --volt-border:  rgba(255,255,255,.10);
    --volt-text:    #F5F5F5;
    --volt-muted:   rgba(255,255,255,.45);
  }
}

/* ── Dark Mode (manuell via .dark) ── */
.dark {
  --volt-bg:      #0A0A0A;
  --volt-surface: #141414;
  --volt-border:  rgba(255,255,255,.10);
  --volt-text:    #F5F5F5;
  --volt-muted:   rgba(255,255,255,.45);
}

/* ── Anwendung ── */
body {
  background: var(--volt-bg, var(--volt-white));
  color: var(--volt-text, var(--volt-black));
  font-family: var(--font-ui);
}
.volt-card {
  background: var(--volt-surface, var(--volt-white));
  border-color: var(--volt-border, rgba(0,0,0,.10));
}

/* ── Toggle (JS: document.documentElement.classList.toggle('dark')) ── */
.volt-theme-toggle {
  background: none;
  border: 1.5px solid var(--volt-border, rgba(0,0,0,.15));
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  transition: all var(--duration-fast) var(--ease-out);
}
.volt-theme-toggle:hover {
  background: var(--volt-lime);
  color: var(--volt-black);
  border-color: var(--volt-lime);
}`,
      },
    ],
  },
  cssjs: {
    steps: [
      {
        title: "1. Tokens als TypeScript-Objekt",
        lang: "ts",
        desc: "Alle Volt-Tokens als typisiertes TypeScript-Objekt – ideal für Styled Components, Emotion, Stitches oder jede andere CSS-in-JS-Lösung.",
        code: `// volt-tokens.ts
export const voltTokens = {
  colors: {
    lime:     '#E4FF97',
    black:    '#0A0A0A',
    white:    '#FFFFFF',
    positive: '#1A9E5A',
    negative: '#E8402A',
    neutral:  '#6B7A9A',
    pastel: {
      rose:   '#FFD6E0', peach:  '#FFECD2',
      mint:   '#C3F4D3', orchid: '#FDE2FF',
      sky:    '#D4E8FF', butter: '#FFF5BA',
    },
  },
  fonts: {
    display: "'Space Grotesk', sans-serif",
    ui:      "'DM Sans', sans-serif",
    body:    "'DM Sans', sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
  fontSizes: {
    xs: '0.75rem',  sm: '0.875rem', base: '1rem',
    lg: '1.125rem', xl: '1.25rem',  '2xl': '1.5rem',
    '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem',
  },
  spacing: {
    1: '0.25rem', 2: '0.5rem',  3: '0.75rem',
    4: '1rem',    6: '1.5rem',  8: '2rem',
    12: '3rem',  16: '4rem',   24: '6rem',
  },
  radii: {
    sm: '0.375rem', md: '0.5rem',  lg: '0.75rem',
    xl: '1rem',    '2xl': '1.25rem', full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,.08)',
    md: '0 4px 12px rgba(0,0,0,.10)',
    lg: '0 10px 30px rgba(0,0,0,.12)',
  },
  transitions: {
    fast:   '150ms cubic-bezier(0.16, 1, 0.3, 1)',
    normal: '250ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow:   '400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type VoltColors  = typeof voltTokens.colors;
export type VoltSpacing = typeof voltTokens.spacing;`,
      },
      {
        title: "2. Styled Components Integration",
        lang: "tsx",
        desc: "Direkte Verwendung der Tokens in Styled Components. Der ThemeProvider macht alle Tokens per props.theme zugänglich.",
        code: [
          "// theme.ts",
          "import { voltTokens } from './volt-tokens';",
          "export const voltTheme = voltTokens;",
          "export type VoltTheme = typeof voltTheme;",
          "",
          "// App.tsx",
          "import { ThemeProvider } from 'styled-components';",
          "import { voltTheme } from './theme';",
          "",
          "export function App() {",
          "  return (",
          "    <ThemeProvider theme={voltTheme}>",
          "      <YourApp />",
          "    </ThemeProvider>",
          "  );",
          "}",
          "",
          "// VoltButton.styled.ts",
          "import styled from 'styled-components';",
          "",
          "export const VoltButton = styled.button<{",
          "  variant?: 'lime' | 'outline'",
          "}>`",
          "  display: inline-flex;",
          "  align-items: center;",
          "  padding: ${p => p.theme.spacing[3]} ${p => p.theme.spacing[6]};",
          "  border-radius: ${p => p.theme.radii.xl};",
          "  font-family: ${p => p.theme.fonts.display};",
          "  font-weight: 700;",
          "  cursor: pointer;",
          "  border: 2px solid transparent;",
          "  transition: all ${p => p.theme.transitions.normal};",
          "  background: ${p =>",
          "    p.variant === 'outline' ? 'transparent' : p.theme.colors.lime};",
          "  color: ${p => p.theme.colors.black};",
          "  border-color: ${p =>",
          "    p.variant === 'outline' ? p.theme.colors.black : p.theme.colors.lime};",
          "  &:hover { transform: translateY(-1px); }",
          "`;",
        ].join("\n"),
      },
      {
        title: "3. Emotion & Vanilla Extract",
        lang: "ts",
        desc: "Tokens für Emotion (CSS-in-JS) oder Vanilla Extract (zero-runtime CSS-in-TS). Beide Ansätze nutzen dasselbe voltTokens-Objekt.",
        code: [
          "// ── Emotion ──",
          "import { css } from '@emotion/react';",
          "import { voltTokens as t } from './volt-tokens';",
          "",
          "export const voltCardStyle = css`",
          "  background: ${t.colors.white};",
          "  border: 1px solid rgba(0,0,0,.10);",
          "  border-radius: ${t.radii['2xl']};",
          "  padding: ${t.spacing[6]};",
          "  box-shadow: ${t.shadows.sm};",
          "  transition: box-shadow ${t.transitions.normal};",
          "  &:hover { box-shadow: ${t.shadows.md}; }",
          "`;",
          "",
          "// ── Vanilla Extract ──",
          "import { style } from '@vanilla-extract/css';",
          "import { voltTokens as t } from './volt-tokens';",
          "",
          "export const voltCard = style({",
          "  background: t.colors.white,",
          "  border: '1px solid rgba(0,0,0,.10)',",
          "  borderRadius: t.radii['2xl'],",
          "  padding: t.spacing[6],",
          "  boxShadow: t.shadows.sm,",
          "  transition: `box-shadow ${t.transitions.normal}`,",
          "  ':hover': { boxShadow: t.shadows.md },",
          "});",
          "",
          "// ── Stitches ──",
          "import { createStitches } from '@stitches/react';",
          "import { voltTokens as t } from './volt-tokens';",
          "",
          "export const { styled } = createStitches({",
          "  theme: {",
          "    colors:    t.colors,",
          "    fonts:     t.fonts,",
          "    fontSizes: t.fontSizes,",
          "    space:     t.spacing,",
          "    radii:     t.radii,",
          "  },",
          "});",
        ].join("\n"),
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
    "volt-lime":   { "value": "#E4FF97", "type": "color" },
    "volt-black":  { "value": "#0A0A0A", "type": "color" },
    "volt-white":  { "value": "#FFFFFF", "type": "color" },
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
    "display":  { "value": "Space Grotesk", "type": "fontFamily" },
    "ui":       { "value": "DM Sans",             "type": "fontFamily" },
    "body":     { "value": "DM Sans",             "type": "fontFamily" },
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
1. Space Grotesk
   → Stärken: Bold (700), ExtraBold (800), Black (900)
   → Verwendung: Headlines, Display-Text, Logos
2. DM Sans
   → Stärken: Regular (400), Medium (500), SemiBold (600)
   → Verwendung: UI-Text, Body, Buttons, Labels
3. JetBrains Mono
   → Stärken: Regular (400), Medium (500)
   → Verwendung: Code, Labels, Badges, Monospace-Akzente`,
      },
      {
        title: "3. Volt-Signet als SVG",
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

/* ── Volt-Komponenten-Dateien für ZIP ── */
const VOLT_COMPONENT_FILES = [
  "VoltAlert", "VoltAvatar", "VoltBadge", "VoltButton", "VoltCard",
  "VoltChart", "VoltCodeBlock", "VoltCommandBar", "VoltInput", "VoltModal",
  "VoltNavbar", "VoltProgress", "VoltRankedList", "VoltSidebar", "VoltStat",
  "VoltTable", "VoltTabs", "VoltTerminal", "VoltToggle", "VoltTrendCard",
];

/* ── Hauptkomponente ── */
export const ExportSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState("html");
  const [copiedDownload, setCopiedDownload] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
  const [zipDone, setZipDone] = useState(false);

  const current = SNIPPETS[activePlatform];

  const handleDownloadCSS = () => {
    const link = document.createElement("a");
    link.href = "/volt-ui.css";
    link.download = "volt-ui.css";
    link.click();
    setCopiedDownload(true);
    setTimeout(() => setCopiedDownload(false), 2000);
  };

  const handleDownloadZip = async () => {
    setZipLoading(true);
    try {
      const zip = new JSZip();
      const voltFolder = zip.folder("volt")!;

      // CSS-Datei hinzufügen
      const cssRes = await fetch("/volt-ui.css");
      const cssText = await cssRes.text();
      zip.file("volt-ui.css", cssText);

      // Alle Komponenten-Dateien laden
      await Promise.allSettled(
        VOLT_COMPONENT_FILES.map(async (name) => {
          const res = await fetch(`/volt-components/${name}.tsx`);
          if (!res.ok) throw new Error(`${name} nicht gefunden`);
          const text = await res.text();
          voltFolder.file(`${name}.tsx`, text);
        })
      );

      // README hinzufügen
      const componentList = VOLT_COMPONENT_FILES.map(n => `- ${n}`).join("\n");
      const readme = [
        "# Volt UI - Komponenten-Bundle",
        "",
        "Dieses Bundle enthaelt alle Volt UI Komponenten.",
        "",
        "## Verwendung",
        "",
        "1. Kopiere den volt/ Ordner nach src/components/volt/",
        "2. Importiere volt-ui.css in deiner index.css",
        "3. Importiere Komponenten: import { VoltButton } from '@/components/volt/VoltButton'",
        "",
        "## Enthaltene Komponenten",
        "",
        componentList,
        "",
        "## Dokumentation",
        "",
        "Siehe COMPONENTS.md im GitHub-Repository: https://github.com/joachim-fas/VoltUI",
      ].join("\n");
      zip.file("README.md", readme);

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "volt-ui-bundle.zip";
      link.click();
      URL.revokeObjectURL(url);

      setZipDone(true);
      setTimeout(() => setZipDone(false), 3000);
    } catch (err) {
      console.error("ZIP-Fehler:", err);
    } finally {
      setZipLoading(false);
    }
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
        <div className="flex flex-col gap-3 shrink-0">
          <button
            onClick={handleDownloadCSS}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E4FF97] text-foreground font-display font-bold text-sm hover:bg-[#D8F080] transition-colors"
          >
            {copiedDownload
              ? <><Check className="w-4 h-4" /> Heruntergeladen</>
              : <><Download className="w-4 h-4" /> volt-ui.css herunterladen</>
            }
          </button>
          <button
            onClick={handleDownloadZip}
            disabled={zipLoading}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 text-white font-display font-bold text-sm hover:bg-white/20 transition-colors border border-white/20 disabled:opacity-50"
          >
            {zipDone
              ? <><Check className="w-4 h-4 text-[#E4FF97]" /> Bundle heruntergeladen</>
              : zipLoading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Wird erstellt…</>
              : <><Package className="w-4 h-4" /> Komponenten-Bundle (.zip)</>
            }
          </button>
        </div>
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
                { cls: "--volt-lime",             val: "#E4FF97" },
                { cls: "--volt-black",            val: "#0A0A0A" },
                { cls: "--volt-signal-positive",  val: "#1A9E5A" },
                { cls: "--volt-signal-negative",  val: "#E8402A" },
                { cls: "--volt-signal-neutral",   val: "#6B7A9A" },
              ],
            },
            {
              title: "Typografie",
              items: [
                { cls: "font-display",  val: "Space Grotesk" },
                { cls: "font-ui",       val: "DM Sans" },
                { cls: "font-body",     val: "DM Sans" },
                { cls: "font-mono",     val: "JetBrains Mono" },
              ],
            },
            {
              title: "Patterns & Texturen",
              items: [
                { cls: ".pattern-dots",     val: "Radiale Punkte" },
                { cls: ".pattern-grid",     val: "Quadratisches Raster" },
                { cls: ".pattern-diagonal", val: "45° Diagonallinien" },
                { cls: ".pattern-cross",    val: "Kreuz-Raster" },
                { cls: ".volt-texture",            val: "SVG-Volt-Textur" },
              ],
            },
            {
              title: "Gradienten",
              items: [
                { cls: ".bg-volt-gradient",    val: "Lime → Schwarz" },
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
