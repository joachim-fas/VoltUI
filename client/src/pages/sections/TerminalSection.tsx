/**
 * TerminalSection – Präsentation der VoltTerminal-Komponente
 * Zeigt: interaktives Terminal, statische Ausgabe, Varianten, Code-Snippets
 */

import React, { useState } from "react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle, VoltCardDescription } from "@/components/volt/VoltCard";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import { VoltTerminal, VoltTerminalStatic, type TerminalLine, type TerminalCommand } from "@/components/volt/VoltTerminal";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { Terminal, Zap, Code2, Layers } from "lucide-react";

/* ── Initiale Ausgabe für Demo ── */
const BOOT_SEQUENCE: TerminalLine[] = [
  { type: "comment", text: "# Volt UI Terminal v1.0.0", delay: 0 },
  { type: "blank",   text: "",                           delay: 80 },
  { type: "info",    text: "Initialisiere Design System…",delay: 120 },
  { type: "success", text: "✓ Tokens geladen (248 Variablen)", delay: 180 },
  { type: "success", text: "✓ Komponenten bereit (34 Komponenten)", delay: 240 },
  { type: "success", text: "✓ Icons indexiert (611+ Icons)", delay: 300 },
  { type: "blank",   text: "",                           delay: 380 },
  { type: "output",  text: "Tippe 'help' für alle Befehle.", delay: 420 },
  { type: "comment", text: "Tipp: ↑/↓ für Befehlshistorie · Tab für Autovervollständigung", delay: 480 },
  { type: "blank",   text: "",                           delay: 500 },
];

/* ── Custom Befehle für Demo ── */
const DEMO_COMMANDS: TerminalCommand[] = [
  {
    name: "components",
    description: "Alle Volt UI Komponenten auflisten",
    handler: () => [
      { type: "info",    text: "Volt UI Komponenten:" },
      { type: "blank",   text: "" },
      { type: "output",  text: "  Foundations    Farben, Typografie, Tokens, Patterns" },
      { type: "output",  text: "  Buttons        Primary, Secondary, Ghost, Gradient, Destructive" },
      { type: "output",  text: "  Cards          Default, Glass, Gradient, Elevated, Outlined" },
      { type: "output",  text: "  Forms          Input, Textarea, Select, Toggle, Checkbox, Slider" },
      { type: "output",  text: "  Feedback       Toast, Modal, Tooltip, Tabs, Alert" },
      { type: "output",  text: "  Navigation     Navbar, Breadcrumb, Pagination, Stepper" },
      { type: "output",  text: "  Data           Charts, Tables, Visualisierungen" },
      { type: "output",  text: "  Terminal       VoltTerminal, VoltTerminalStatic" },
      { type: "blank",   text: "" },
      { type: "comment", text: "34 Komponenten · TypeScript · Tailwind CSS · Framer Motion" },
    ],
  },
  {
    name: "tokens",
    description: "Design Tokens anzeigen",
    handler: () => [
      { type: "info",    text: "Design Tokens (Auszug):" },
      { type: "blank",   text: "" },
      { type: "comment", text: "# Farben" },
      { type: "output",  text: "  --color-accent:       #E4FF97  (Volt Lime)" },
      { type: "output",  text: "  --color-background:   #FFFFFF" },
      { type: "output",  text: "  --color-foreground:   #0A0A0A" },
      { type: "output",  text: "  --color-muted:        #F5F5F5" },
      { type: "blank",   text: "" },
      { type: "comment", text: "# Typografie" },
      { type: "output",  text: "  --font-display:  'Space Grotesk'" },
      { type: "output",  text: "  --font-body:     'Inter'" },
      { type: "output",  text: "  --font-mono:     'JetBrains Mono'" },
      { type: "blank",   text: "" },
      { type: "success", text: "248 Tokens definiert" },
    ],
  },
  {
    name: "install",
    description: "Installationsanleitung",
    handler: (args) => {
      const pkg = args[0] ?? "volt-ui";
      return [
        { type: "info",    text: `Installiere ${pkg}…` },
        { type: "blank",   text: "" },
        { type: "output",  text: "$ pnpm add framer-motion lucide-react" },
        { type: "success", text: "✓ framer-motion@11.x installiert" },
        { type: "success", text: "✓ lucide-react@0.x installiert" },
        { type: "blank",   text: "" },
        { type: "output",  text: "Kopiere Komponenten in dein Projekt:" },
        { type: "comment", text: "  /components/volt/VoltButton.tsx" },
        { type: "comment", text: "  /components/volt/VoltCard.tsx" },
        { type: "comment", text: "  /components/volt/VoltTerminal.tsx" },
        { type: "comment", text: "  … (alle weiteren Komponenten)" },
        { type: "blank",   text: "" },
        { type: "success", text: `✓ ${pkg} bereit` },
      ];
    },
  },
  {
    name: "colors",
    description: "Farbpalette anzeigen",
    handler: () => [
      { type: "info",    text: "Volt UI Farbpalette:" },
      { type: "blank",   text: "" },
      { type: "success", text: "  ■ #E4FF97  Volt Lime (Accent)" },
      { type: "output",  text: "  ■ #0A0A0A  Volt Black" },
      { type: "output",  text: "  ■ #FFFFFF  Volt White" },
      { type: "info",    text: "  ■ #74C0FC  Info Blue" },
      { type: "success", text: "  ■ #6BFF9E  Success Green" },
      { type: "warning", text: "  ■ #FFD166  Warning Yellow" },
      { type: "error",   text: "  ■ #FF6B6B  Error Red" },
      { type: "comment", text: "  ■ #666666  Muted Gray" },
    ],
  },
  {
    name: "ls",
    description: "Verzeichnis anzeigen",
    handler: () => [
      { type: "output",  text: "client/" },
      { type: "output",  text: "  src/" },
      { type: "output",  text: "    components/volt/   ← 34 Komponenten" },
      { type: "output",  text: "    pages/sections/    ← 24 Sections" },
      { type: "output",  text: "    lib/               ← Utilities" },
      { type: "output",  text: "drizzle/               ← DB Schema" },
      { type: "output",  text: "server/                ← tRPC Backend" },
    ],
  },
];

/* ── Statische Ausgabe-Beispiele ── */
const BUILD_OUTPUT: TerminalLine[] = [
  { type: "command", text: ">_ pnpm build" },
  { type: "blank",   text: "" },
  { type: "info",    text: "vite v5.4.x building for production…" },
  { type: "output",  text: "" },
  { type: "output",  text: "  transforming…" },
  { type: "success", text: "✓ 1847 modules transformed." },
  { type: "output",  text: "" },
  { type: "output",  text: "  dist/index.html                    0.46 kB │ gzip:  0.30 kB" },
  { type: "output",  text: "  dist/assets/index-BkHvJmLp.css   42.18 kB │ gzip:  8.21 kB" },
  { type: "output",  text: "  dist/assets/index-DxYmKpQr.js   312.44 kB │ gzip: 98.67 kB" },
  { type: "blank",   text: "" },
  { type: "success", text: "✓ built in 4.23s" },
];

const ERROR_OUTPUT: TerminalLine[] = [
  { type: "command", text: ">_ pnpm db:push" },
  { type: "blank",   text: "" },
  { type: "info",    text: "drizzle-kit generate & migrate" },
  { type: "output",  text: "Reading config file '/drizzle.config.ts'" },
  { type: "output",  text: "2 tables detected" },
  { type: "warning", text: "⚠ Column 'email' changed: nullable → not null" },
  { type: "error",   text: "✗ Migration failed: Cannot change column constraint" },
  { type: "blank",   text: "" },
  { type: "comment", text: "Lösung: Datenmigration vor Constraint-Änderung durchführen" },
];

/* ── Haupt-Komponente ── */
export function TerminalSection() {
  const [activeVariant, setActiveVariant] = useState<"dark" | "glass" | "minimal">("dark");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#E4FF97]" />
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground">Terminal</h2>
          <VoltBadge variant="default" size="sm">Neu</VoltBadge>
        </div>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Eine vollständige Command-Line-Interface-Komponente im Volt-UI-Stil. Interaktiv mit
          Befehlshistorie, Tab-Completion und konfigurierbarem Befehlsregister – oder als
          statische Ausgabe für Code-Dokumentation und Build-Logs.
        </p>
      </div>

      {/* ── Interaktives Terminal ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Interaktives Terminal</h3>
        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>VoltTerminal</VoltCardTitle>
            <VoltCardDescription>
              Vollständig interaktiv · Befehlshistorie (↑/↓) · Tab-Completion · Ctrl+L zum Leeren
            </VoltCardDescription>
          </VoltCardHeader>
          <VoltCardContent>
            <VoltTerminal
              title="volt-ui — terminal"
              prompt=">_"
              variant="dark"
              size="md"
              maxHeight="380px"
              initialOutput={BOOT_SEQUENCE}
              commands={DEMO_COMMANDS}
              typewriterEffect={true}
              allowFullscreen={true}
              showWindowControls={true}
            />
          </VoltCardContent>
        </VoltCard>
        <VoltCodeBlock
          language="tsx"
          label="VoltTerminal · Interaktiv"
          code={`// Installation: pnpm add lucide-react
// Kopiere VoltTerminal.tsx in dein Projekt (aus /components/volt/)

import React from "react";
import { VoltTerminal, type TerminalLine, type TerminalCommand } from "./VoltTerminal";

// Initiale Ausgabe (Typewriter-Effekt)
const BOOT_SEQUENCE: TerminalLine[] = [
  { type: "comment", text: "# Mein Projekt v1.0.0",        delay: 0 },
  { type: "blank",   text: "",                              delay: 80 },
  { type: "info",    text: "Initialisiere…",                delay: 120 },
  { type: "success", text: "✓ Bereit",                      delay: 200 },
  { type: "blank",   text: "",                              delay: 260 },
  { type: "output",  text: "Tippe 'help' für alle Befehle.", delay: 300 },
];

// Eigene Befehle registrieren
const MY_COMMANDS: TerminalCommand[] = [
  {
    name: "greet",
    description: "Begrüßung ausgeben",
    handler: (args) => [
      { type: "success", text: \`Hallo, \${args[0] ?? "Welt"}!\` },
    ],
  },
  {
    name: "status",
    description: "Systemstatus prüfen",
    handler: () => [
      { type: "info",    text: "System-Status:" },
      { type: "success", text: "  ✓ Datenbank: online" },
      { type: "success", text: "  ✓ API: erreichbar" },
      { type: "warning", text: "  ⚠ Cache: 87% belegt" },
    ],
  },
];

export function MyTerminal() {
  return (
    <VoltTerminal
      title="mein-projekt — terminal"
      prompt=">_"               // Prompt-Symbol
      variant="dark"            // dark · glass · minimal
      size="md"                 // sm · md · lg
      maxHeight="400px"
      initialOutput={BOOT_SEQUENCE}
      commands={MY_COMMANDS}
      typewriterEffect={true}   // Schreibmaschinen-Effekt
      allowFullscreen={true}    // Vollbild-Toggle
      showWindowControls={true} // macOS-Fensterknöpfe
      onCommand={(cmd, output) => console.log("Ausgeführt:", cmd)}
    />
  );
}

// Eingebaute Befehle (immer verfügbar):
// help · clear · echo · date · whoami · version`}
        />
      </div>

      {/* ── Varianten ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Varianten</h3>
        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>dark · glass · minimal</VoltCardTitle>
            <VoltCardDescription>Drei visuelle Stile für unterschiedliche Kontexte</VoltCardDescription>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="flex gap-2 mb-4">
              {(["dark", "glass", "minimal"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVariant(v)}
                  className={[
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all",
                    activeVariant === v
                      ? "bg-[#0A0A0A] text-[#E4FF97]"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {v}
                </button>
              ))}
            </div>
            <VoltTerminal
              key={activeVariant}
              title={`volt-ui — ${activeVariant}`}
              variant={activeVariant}
              size="sm"
              maxHeight="220px"
              initialOutput={[
                { type: "comment", text: `# Variante: ${activeVariant}` },
                { type: "blank",   text: "" },
                { type: "info",    text: "Initialisiere Volt UI…" },
                { type: "success", text: "✓ Bereit" },
                { type: "blank",   text: "" },
                { type: "output",  text: "Tippe 'help' für Befehle." },
              ]}
              typewriterEffect={false}
              allowFullscreen={false}
            />
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* ── Statische Ausgabe ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Statische Ausgabe</h3>
        <p className="text-sm text-muted-foreground mb-4 font-body">
          <code className="font-mono text-foreground">VoltTerminalStatic</code> – für Build-Logs, Fehlermeldungen und Code-Dokumentation ohne Eingabefeld.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="section-label mb-2">Build-Output</p>
            <VoltTerminalStatic
              title="pnpm build"
              lines={BUILD_OUTPUT}
              variant="dark"
              size="sm"
              maxHeight="260px"
            />
          </div>
          <div>
            <p className="section-label mb-2">Fehler-Output</p>
            <VoltTerminalStatic
              title="pnpm db:push"
              lines={ERROR_OUTPUT}
              variant="dark"
              size="sm"
              maxHeight="260px"
            />
          </div>
        </div>
        <VoltCodeBlock
          language="tsx"
          label="VoltTerminalStatic · Verwendung"
          code={`// Nur Ausgabe, keine Eingabe – ideal für Logs und Dokumentation
import { VoltTerminalStatic, type TerminalLine } from "./VoltTerminal";

const BUILD_LOG: TerminalLine[] = [
  { type: "command", text: ">_ pnpm build" },
  { type: "blank",   text: "" },
  { type: "info",    text: "vite v5.x building for production…" },
  { type: "success", text: "✓ 1847 modules transformed." },
  { type: "output",  text: "  dist/index.html    0.46 kB │ gzip: 0.30 kB" },
  { type: "output",  text: "  dist/assets/...  312.44 kB │ gzip: 98.67 kB" },
  { type: "blank",   text: "" },
  { type: "success", text: "✓ built in 4.23s" },
];

<VoltTerminalStatic
  title="build output"
  lines={BUILD_LOG}
  variant="dark"   // dark · glass · minimal
  size="sm"        // sm · md · lg
  maxHeight="300px"
  showWindowControls={true}
/>

// Zeilen-Typen und ihre Farben:
// command  → #E4FF97 (Volt Lime)  – ausgeführter Befehl
// output   → #C8C8C8 (Hellgrau)   – normale Ausgabe
// success  → #6BFF9E (Grün)       – Erfolg
// error    → #FF6B6B (Rot)        – Fehler
// warning  → #FFD166 (Gelb)       – Warnung
// info     → #74C0FC (Blau)       – Information
// comment  → #666666 (Dunkelgrau) – Kommentar
// blank    → (leer)               – Leerzeile`}
        />
      </div>

      {/* ── Größen ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Größen</h3>
        <VoltCard>
          <VoltCardContent className="pt-6 space-y-4">
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s}>
                <p className="section-label mb-2">size="{s}"</p>
                <VoltTerminalStatic
                  title={`terminal — ${s}`}
                  lines={[
                    { type: "comment", text: `# Größe: ${s}` },
                    { type: "success", text: "✓ Volt UI bereit" },
                    { type: "output",  text: "Tippe 'help' für Befehle." },
                  ]}
                  variant="dark"
                  size={s}
                  maxHeight="120px"
                  showWindowControls={false}
                />
              </div>
            ))}
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* ── Eigene Befehle ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Eigene Befehle registrieren</h3>
        <VoltCodeBlock
          language="tsx"
          label="TerminalCommand · Interface"
          code={`import { type TerminalCommand, type TerminalLine } from "./VoltTerminal";

// Interface:
interface TerminalCommand {
  name: string;                              // Befehlsname (z.B. "deploy")
  description?: string;                     // Für 'help'-Ausgabe
  handler: (args: string[]) => TerminalLine[]; // Rückgabe: Ausgabe-Zeilen
}

// Beispiel: Deployment-Befehl
const deployCommand: TerminalCommand = {
  name: "deploy",
  description: "Projekt deployen",
  handler: (args) => {
    const env = args[0] ?? "production";
    return [
      { type: "info",    text: \`Deploye zu \${env}…\` },
      { type: "output",  text: "  Kompiliere TypeScript…" },
      { type: "success", text: "  ✓ Build erfolgreich" },
      { type: "output",  text: "  Lade Artefakte hoch…" },
      { type: "success", text: \`  ✓ Deployed zu \${env}\` },
      { type: "blank",   text: "" },
      { type: "comment", text: \`URL: https://\${env}.example.com\` },
    ];
  },
};

// Verwendung: deploy production
// Verwendung: deploy staging`}
        />
      </div>
    </div>
  );
}
