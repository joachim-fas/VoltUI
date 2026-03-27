/**
 * ButtonsSection – Alle Button-Varianten der Grain UI
 */

import React, { useState } from "react";
import { GrainButton } from "@/components/grain/GrainButton";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle, GrainCardDescription } from "@/components/grain/GrainCard";
import { ArrowRight, Download, Plus, Trash2, Send, Star, Heart, Zap } from "lucide-react";

const CodeSnippet: React.FC<{ code: string }> = ({ code }) => (
  <div className="code-block text-xs mt-4">{code}</div>
);

export const ButtonsSection: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const simulateLoad = (key: string) => {
    setLoading(key);
    setTimeout(() => setLoading(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label mb-2">02 — Buttons</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Button-Komponente</h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xl">
          Sieben Varianten mit Grain-Textur-Overlay, atmosphärischen Glow-Effekten und vollständiger Tastatur-Zugänglichkeit.
          Alle Effekte sind reiner CSS-Code.
        </p>
      </div>

      {/* Varianten */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Varianten</GrainCardTitle>
          <GrainCardDescription>primary · solid · outline · ghost · glass · secondary · destructive</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-xs font-mono text-muted-foreground ml-2">Vorschau</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6 bg-atmospheric grain">
              <GrainButton variant="primary">Primary</GrainButton>
              <GrainButton variant="solid">Solid</GrainButton>
              <GrainButton variant="outline">Outline</GrainButton>
              <GrainButton variant="ghost">Ghost</GrainButton>
              <GrainButton variant="glass">Glass</GrainButton>
              <GrainButton variant="secondary">Secondary</GrainButton>
              <GrainButton variant="destructive">Destructive</GrainButton>
            </div>
          </div>
          <CodeSnippet code={`<GrainButton variant="primary">Primary</GrainButton>
<GrainButton variant="solid">Solid</GrainButton>
<GrainButton variant="outline">Outline</GrainButton>
<GrainButton variant="ghost">Ghost</GrainButton>
<GrainButton variant="glass">Glass</GrainButton>
<GrainButton variant="destructive">Destructive</GrainButton>`} />
        </GrainCardContent>
      </GrainCard>

      {/* Größen */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Größen</GrainCardTitle>
          <GrainCardDescription>sm · md · lg · xl · icon</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6">
              <GrainButton size="sm">Small</GrainButton>
              <GrainButton size="md">Medium</GrainButton>
              <GrainButton size="lg">Large</GrainButton>
              <GrainButton size="xl">Extra Large</GrainButton>
              <GrainButton size="icon"><Plus className="w-4 h-4" /></GrainButton>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Mit Icons */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Mit Icons</GrainCardTitle>
          <GrainCardDescription>leftIcon · rightIcon · icon-only</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6">
              <GrainButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Hinzufügen</GrainButton>
              <GrainButton variant="solid" rightIcon={<ArrowRight className="w-4 h-4" />}>Weiter</GrainButton>
              <GrainButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Download</GrainButton>
              <GrainButton variant="destructive" leftIcon={<Trash2 className="w-4 h-4" />}>Löschen</GrainButton>
              <GrainButton variant="secondary" leftIcon={<Send className="w-4 h-4" />}>Senden</GrainButton>
              <GrainButton variant="ghost" size="icon"><Star className="w-4 h-4" /></GrainButton>
              <GrainButton variant="outline" size="icon"><Heart className="w-4 h-4" /></GrainButton>
              <GrainButton variant="primary" size="icon"><Zap className="w-4 h-4" /></GrainButton>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Loading-Zustände */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Zustände</GrainCardTitle>
          <GrainCardDescription>loading · disabled – klicke einen Button um den Loading-Zustand zu sehen</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6">
              <GrainButton
                variant="primary"
                loading={loading === "a"}
                onClick={() => simulateLoad("a")}
              >
                Speichern
              </GrainButton>
              <GrainButton
                variant="solid"
                loading={loading === "b"}
                onClick={() => simulateLoad("b")}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Absenden
              </GrainButton>
              <GrainButton variant="primary" disabled>Deaktiviert</GrainButton>
              <GrainButton variant="outline" disabled>Deaktiviert</GrainButton>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>
    </div>
  );
};
