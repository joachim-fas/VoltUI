/**
 * ButtonsSection – Alle Button-Varianten der Volt UI
 */

import React, { useState } from "react";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle, VoltCardDescription } from "@/components/volt/VoltCard";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import { ArrowRight, Download, Plus, Trash2, Send, Star, Heart, Zap } from "lucide-react";

export const ButtonsSection: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const simulateLoad = (key: string) => {
    setLoading(key);
    setTimeout(() => setLoading(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label mb-2">06 — Buttons</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">Button-Komponente</h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xl">
          Sieben Varianten mit Volt-Textur-Overlay, atmosphärischen Glow-Effekten und vollständiger Tastatur-Zugänglichkeit.
          Alle Effekte sind reiner CSS-Code.
        </p>
      </div>

      {/* Varianten */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Varianten</VoltCardTitle>
          <VoltCardDescription>primary · solid · outline · ghost · glass · secondary · destructive</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap items-center gap-3 p-6 rounded-xl bg-atmospheric volt-texture border border-border">
            <VoltButton variant="primary">Primary</VoltButton>
            <VoltButton variant="solid">Solid</VoltButton>
            <VoltButton variant="outline">Outline</VoltButton>
            <VoltButton variant="ghost">Ghost</VoltButton>
            <VoltButton variant="glass">Glass</VoltButton>
            <VoltButton variant="secondary">Secondary</VoltButton>
            <VoltButton variant="destructive">Destructive</VoltButton>
          </div>
          <VoltCodeBlock
            code={`<VoltButton variant="primary">Primary</VoltButton>
<VoltButton variant="solid">Solid</VoltButton>
<VoltButton variant="outline">Outline</VoltButton>
<VoltButton variant="ghost">Ghost</VoltButton>
<VoltButton variant="glass">Glass</VoltButton>
<VoltButton variant="secondary">Secondary</VoltButton>
<VoltButton variant="destructive">Destructive</VoltButton>`}
          />
        </VoltCardContent>
      </VoltCard>

      {/* Größen */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Größen</VoltCardTitle>
          <VoltCardDescription>sm · md · lg · xl · icon</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap items-center gap-3 p-6 rounded-xl border border-border">
            <VoltButton size="sm">Small</VoltButton>
            <VoltButton size="md">Medium</VoltButton>
            <VoltButton size="lg">Large</VoltButton>
            <VoltButton size="xl">Extra Large</VoltButton>
            <VoltButton size="icon"><Plus className="w-4 h-4" /></VoltButton>
          </div>
          <VoltCodeBlock
            code={`<VoltButton size="sm">Small</VoltButton>
<VoltButton size="md">Medium</VoltButton>
<VoltButton size="lg">Large</VoltButton>
<VoltButton size="xl">Extra Large</VoltButton>
<VoltButton size="icon"><Plus /></VoltButton>`}
          />
        </VoltCardContent>
      </VoltCard>

      {/* Mit Icons */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Mit Icons</VoltCardTitle>
          <VoltCardDescription>leftIcon · rightIcon · icon-only</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap items-center gap-3 p-6 rounded-xl border border-border">
            <VoltButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Hinzufügen</VoltButton>
            <VoltButton variant="solid" rightIcon={<ArrowRight className="w-4 h-4" />}>Weiter</VoltButton>
            <VoltButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Download</VoltButton>
            <VoltButton variant="destructive" leftIcon={<Trash2 className="w-4 h-4" />}>Löschen</VoltButton>
            <VoltButton variant="secondary" leftIcon={<Send className="w-4 h-4" />}>Senden</VoltButton>
            <VoltButton variant="ghost" size="icon"><Star className="w-4 h-4" /></VoltButton>
            <VoltButton variant="outline" size="icon"><Heart className="w-4 h-4" /></VoltButton>
            <VoltButton variant="primary" size="icon"><Zap className="w-4 h-4" /></VoltButton>
          </div>
          <VoltCodeBlock
            code={`<VoltButton variant="primary" leftIcon={<Plus />}>Hinzufügen</VoltButton>
<VoltButton variant="solid" rightIcon={<ArrowRight />}>Weiter</VoltButton>
<VoltButton variant="ghost" size="icon"><Star /></VoltButton>`}
          />
        </VoltCardContent>
      </VoltCard>

      {/* Loading-Zustände */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Zustände</VoltCardTitle>
          <VoltCardDescription>loading · disabled – klicke einen Button um den Loading-Zustand zu sehen</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap items-center gap-3 p-6 rounded-xl border border-border">
            <VoltButton
              variant="primary"
              loading={loading === "a"}
              onClick={() => simulateLoad("a")}
            >
              Speichern
            </VoltButton>
            <VoltButton
              variant="solid"
              loading={loading === "b"}
              onClick={() => simulateLoad("b")}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Absenden
            </VoltButton>
            <VoltButton variant="primary" disabled>Deaktiviert</VoltButton>
            <VoltButton variant="outline" disabled>Deaktiviert</VoltButton>
          </div>
          <VoltCodeBlock
            code={`<VoltButton variant="primary" loading={loading} onClick={...}>Speichern</VoltButton>
<VoltButton variant="primary" disabled>Deaktiviert</VoltButton>`}
          />
        </VoltCardContent>
      </VoltCard>
    </div>
  );
};
