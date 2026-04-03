/**
 * CommandBarSection – Präsentation der VoltCommandBar-Komponente
 * Zeigt: Hero-Layout, Varianten, Größen, Konfiguration, Code-Snippets
 */

import React, { useState } from "react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle, VoltCardDescription } from "@/components/volt/VoltCard";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import { VoltCommandBar, VoltCommandBarCentered } from "@/components/volt/VoltCommandBar";
import { VoltBadge } from "@/components/volt/VoltBadge";
import {
  Plus, Mic, Paperclip, Globe, Sparkles,
  Zap, Code2, FileText, Image, Terminal,
} from "lucide-react";

/* ── Vorschläge / Quick-Actions ── */
const SUGGESTIONS_DEFAULT = [
  { label: "Zusammenfassen",  icon: <FileText className="w-3.5 h-3.5" /> },
  { label: "Code schreiben",  icon: <Code2 className="w-3.5 h-3.5" /> },
  { label: "Übersetzen",      icon: <Globe className="w-3.5 h-3.5" /> },
  { label: "Ideen generieren",icon: <Sparkles className="w-3.5 h-3.5" /> },
];

const SUGGESTIONS_DARK = [
  { label: "Analyse starten", icon: <Zap className="w-3.5 h-3.5" /> },
  { label: "Bild erstellen",  icon: <Image className="w-3.5 h-3.5" /> },
  { label: "Code erklären",   icon: <Code2 className="w-3.5 h-3.5" /> },
];

/* ── Haupt-Komponente ── */
export function TerminalSection() {
  const [valueDefault, setValueDefault] = useState("");
  const [valueDark,    setValueDark]    = useState("");
  const [submitted,    setSubmitted]    = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#E4FF97]" />
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground">Command Bar</h2>
          <VoltBadge variant="default" size="sm">Neu</VoltBadge>
        </div>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Eine moderne AI-Eingabekomponente für Volt UI – zentriertes Eingabefeld mit
          konfigurierbaren Aktions-Buttons, Quick-Action-Pills und Auto-Resize. Drei Varianten
          für helle, dunkle und eingebettete Kontexte.
        </p>
      </div>

      {/* ── Hero: Zentriertes Layout ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Hero-Layout</h3>
        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>VoltCommandBarCentered</VoltCardTitle>
            <VoltCardDescription>
              Zentriertes Layout mit Titel – für leere Zustände und AI-Startseiten
            </VoltCardDescription>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="py-8">
              <VoltCommandBarCentered
                title="Was möchtest du heute erstellen?"
                variant="default"
                size="md"
                placeholder="Frag mich etwas… (Enter zum Senden)"
                value={valueDefault}
                onChange={setValueDefault}
                onSubmit={(v) => { setSubmitted(v); setValueDefault(""); }}
                leftActions={[
                  { icon: <Plus className="w-4 h-4" />, label: "Anhang hinzufügen" },
                ]}
                rightActions={[
                  { icon: <Mic className="w-4 h-4" />, label: "Spracheingabe" },
                ]}
                suggestions={SUGGESTIONS_DEFAULT}
              />
              {submitted && (
                <p className="text-center text-sm text-muted-foreground mt-4 font-mono">
                  Gesendet: „{submitted}"
                </p>
              )}
            </div>
          </VoltCardContent>
        </VoltCard>
        <VoltCodeBlock
          code={`// Kopiere VoltCommandBar.tsx in dein Projekt (aus /components/volt/)
import { VoltCommandBarCentered } from "./VoltCommandBar";
import { Plus, Mic, Code2, FileText, Globe, Sparkles } from "lucide-react";
export function AIStartPage() {`}
        />
      </div>

      {/* ── Varianten ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Varianten</h3>
        <div className="space-y-4">
          {/* default */}
          <div>
            <p className="section-label mb-2">variant="default" – helle Oberflächen</p>
            <VoltCard>
              <VoltCardContent className="pt-6">
                <VoltCommandBar
                  variant="default"
                  size="md"
                  placeholder="Stelle eine Frage…"
                  leftActions={[{ icon: <Plus className="w-4 h-4" />, label: "Anhang" }]}
                  rightActions={[{ icon: <Mic className="w-4 h-4" />, label: "Sprache" }]}
                  suggestions={[
                    { label: "Zusammenfassen", icon: <FileText className="w-3.5 h-3.5" /> },
                    { label: "Code schreiben", icon: <Code2 className="w-3.5 h-3.5" /> },
                  ]}
                />
              </VoltCardContent>
            </VoltCard>
          </div>

          {/* dark */}
          <div>
            <p className="section-label mb-2">variant="dark" – dunkle Oberflächen</p>
            <div className="rounded-2xl bg-[#0A0A0A] p-6">
              <VoltCommandBar
                variant="dark"
                size="md"
                placeholder="Was soll ich für dich tun?"
                value={valueDark}
                onChange={setValueDark}
                leftActions={[
                  { icon: <Paperclip className="w-4 h-4" />, label: "Datei" },
                  { icon: <Globe className="w-4 h-4" />,     label: "Web" },
                ]}
                rightActions={[
                  { icon: <Mic className="w-4 h-4" />, label: "Sprache" },
                ]}
                suggestions={SUGGESTIONS_DARK}
              />
            </div>
          </div>

          {/* ghost */}
          <div>
            <p className="section-label mb-2">variant="ghost" – eingebettet, randlos</p>
            <VoltCard>
              <VoltCardContent className="pt-6">
                <VoltCommandBar
                  variant="ghost"
                  size="md"
                  placeholder="Suchen oder fragen…"
                  rightActions={[{ icon: <Mic className="w-4 h-4" />, label: "Sprache" }]}
                />
              </VoltCardContent>
            </VoltCard>
          </div>
        </div>
      </div>

      {/* ── Größen ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Größen</h3>
        <VoltCard>
          <VoltCardContent className="pt-6 space-y-4">
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s}>
                <p className="section-label mb-2">size="{s}"</p>
                <VoltCommandBar
                  variant="default"
                  size={s}
                  placeholder={`Eingabe – Größe ${s}…`}
                  rightActions={[{ icon: <Mic className="w-4 h-4" />, label: "Sprache" }]}
                />
              </div>
            ))}
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* ── Zustände ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Zustände</h3>
        <VoltCard>
          <VoltCardContent className="pt-6 space-y-4">
            <div>
              <p className="section-label mb-2">Deaktiviert</p>
              <VoltCommandBar
                variant="default"
                size="md"
                placeholder="Nicht verfügbar…"
                disabled
                rightActions={[{ icon: <Mic className="w-4 h-4" />, label: "Sprache" }]}
              />
            </div>
            <div>
              <p className="section-label mb-2">Laden (loading)</p>
              <VoltCommandBar
                variant="default"
                size="md"
                placeholder="Antwort wird generiert…"
                defaultValue="Erkläre mir Quantenmechanik in 3 Sätzen."
                loading
                rightActions={[{ icon: <Mic className="w-4 h-4" />, label: "Sprache" }]}
              />
            </div>
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* ── Vollständiges Snippet ── */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Vollständige Konfiguration</h3>
        <VoltCodeBlock
          code={`import { VoltCommandBar, type CommandBarAction, type CommandBarSuggestion } from "./VoltCommandBar";
import { Plus, Mic, Paperclip, Globe, Code2, FileText, Sparkles } from "lucide-react";
const leftActions: CommandBarAction[] = [`}
        />
      </div>
    </div>
  );
}
