/**
 * ButtonsSection – Alle Button-Varianten der Flux UI
 */

import React, { useState } from "react";
import { FluxButton } from "@/components/grain/FluxButton";
import { FluxCard, FluxCardContent, FluxCardHeader, FluxCardTitle, FluxCardDescription } from "@/components/grain/FluxCard";
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
          Sieben Varianten mit Flux-Textur-Overlay, atmosphärischen Glow-Effekten und vollständiger Tastatur-Zugänglichkeit.
          Alle Effekte sind reiner CSS-Code.
        </p>
      </div>

      {/* Varianten */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Varianten</FluxCardTitle>
          <FluxCardDescription>primary · solid · outline · ghost · glass · secondary · destructive</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-xs font-mono text-muted-foreground ml-2">Vorschau</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6 bg-atmospheric grain">
              <FluxButton variant="primary">Primary</FluxButton>
              <FluxButton variant="solid">Solid</FluxButton>
              <FluxButton variant="outline">Outline</FluxButton>
              <FluxButton variant="ghost">Ghost</FluxButton>
              <FluxButton variant="glass">Glass</FluxButton>
              <FluxButton variant="secondary">Secondary</FluxButton>
              <FluxButton variant="destructive">Destructive</FluxButton>
            </div>
          </div>
          <CodeSnippet code={`<FluxButton variant="primary">Primary</FluxButton>
<FluxButton variant="solid">Solid</FluxButton>
<FluxButton variant="outline">Outline</FluxButton>
<FluxButton variant="ghost">Ghost</FluxButton>
<FluxButton variant="glass">Glass</FluxButton>
<FluxButton variant="destructive">Destructive</FluxButton>`} />
        </FluxCardContent>
      </FluxCard>

      {/* Größen */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Größen</FluxCardTitle>
          <FluxCardDescription>sm · md · lg · xl · icon</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6">
              <FluxButton size="sm">Small</FluxButton>
              <FluxButton size="md">Medium</FluxButton>
              <FluxButton size="lg">Large</FluxButton>
              <FluxButton size="xl">Extra Large</FluxButton>
              <FluxButton size="icon"><Plus className="w-4 h-4" /></FluxButton>
            </div>
          </div>
        </FluxCardContent>
      </FluxCard>

      {/* Mit Icons */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Mit Icons</FluxCardTitle>
          <FluxCardDescription>leftIcon · rightIcon · icon-only</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6">
              <FluxButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Hinzufügen</FluxButton>
              <FluxButton variant="solid" rightIcon={<ArrowRight className="w-4 h-4" />}>Weiter</FluxButton>
              <FluxButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Download</FluxButton>
              <FluxButton variant="destructive" leftIcon={<Trash2 className="w-4 h-4" />}>Löschen</FluxButton>
              <FluxButton variant="secondary" leftIcon={<Send className="w-4 h-4" />}>Senden</FluxButton>
              <FluxButton variant="ghost" size="icon"><Star className="w-4 h-4" /></FluxButton>
              <FluxButton variant="outline" size="icon"><Heart className="w-4 h-4" /></FluxButton>
              <FluxButton variant="primary" size="icon"><Zap className="w-4 h-4" /></FluxButton>
            </div>
          </div>
        </FluxCardContent>
      </FluxCard>

      {/* Loading-Zustände */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Zustände</FluxCardTitle>
          <FluxCardDescription>loading · disabled – klicke einen Button um den Loading-Zustand zu sehen</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex flex-wrap items-center gap-3 p-6">
              <FluxButton
                variant="primary"
                loading={loading === "a"}
                onClick={() => simulateLoad("a")}
              >
                Speichern
              </FluxButton>
              <FluxButton
                variant="solid"
                loading={loading === "b"}
                onClick={() => simulateLoad("b")}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Absenden
              </FluxButton>
              <FluxButton variant="primary" disabled>Deaktiviert</FluxButton>
              <FluxButton variant="outline" disabled>Deaktiviert</FluxButton>
            </div>
          </div>
        </FluxCardContent>
      </FluxCard>
    </div>
  );
};
