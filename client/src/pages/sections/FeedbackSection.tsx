/**
 * FeedbackSection – Tabs, Modal, Toast, Tooltip
 */

import React, { useState } from "react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle, VoltCardDescription } from "@/components/volt/VoltCard";
import { VoltTabs } from "@/components/volt/VoltTabs";
import { VoltModal } from "@/components/volt/VoltModal";
import { VoltToastContainer, useVoltToast } from "@/components/volt/VoltToast";
import { VoltTooltip } from "@/components/volt/VoltToast";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltInput } from "@/components/volt/VoltInput";
import {
  Code2, Layers, Palette, Zap,
  Info, CheckCircle2, AlertCircle, AlertTriangle,
  Trash2, ArrowRight,
} from "lucide-react";

const tabContent = {
  design: (
    <div className="space-y-3">
      <p className="text-sm font-body text-muted-foreground leading-relaxed">
        Das Volt UI Design System basiert auf dem Volt UI-Konzept –
        Tiefe durch Schichtung von Volt-Textur, Gradienten und Glasmorphismus.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {["Volt", "Gradient", "Glass"].map(t => (
          <div key={t} className="bg-muted rounded-lg p-3 text-center">
            <p className="text-xs font-semibold font-body text-foreground">{t}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  code: (
    <div className="code-block text-xs">
      <span className="token-comment">{"// Volt-Textur als CSS"}</span>{"\n"}
      <span className="token-blue">.volt-texture</span>::after {"{"}{"\n"}
      {"  "}background-image: <span className="token-yellow">url("data:image/svg+xml,…")</span>;{"\n"}
      {"  "}opacity: <span className="token-red">0.06</span>;{"\n"}
      {"}"}
    </div>
  ),
  tokens: (
    <div className="space-y-2">
      {["--neon-yellow", "--black", "--signal-positive", "--signal-negative", "--signal-neutral"].map(t => (
        <div key={t} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
          <span className="text-xs font-mono text-foreground">{t}</span>
          <VoltBadge variant="muted" size="sm">CSS Token</VoltBadge>
        </div>
      ))}
    </div>
  ),
  preview: (
    <div className="bg-volt-hero rounded-xl p-6 volt-texture">
      <p className="font-display font-bold text-2xl text-foreground">Volt UI</p>
      <p className="text-sm text-muted-foreground font-body mt-1">Live-Vorschau des Gradient-Hintergrunds</p>
    </div>
  ),
};

export const FeedbackSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { toasts, add, dismiss } = useVoltToast();

  return (
    <div className="space-y-10">
      <VoltToastContainer toasts={toasts} onDismiss={dismiss} position="bottom-right" />

      <div>
        <p className="section-label mb-2">05 — Feedback</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Tabs, Modal & Toast</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Interaktive Feedback-Komponenten mit Framer Motion Animationen.
          Alle Übergänge sind flüssig und reagieren auf Tastatureingaben.
        </p>
      </div>

      {/* Tabs */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Tab-Varianten</VoltCardTitle>
          <VoltCardDescription>pills · underline · boxed · glass</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="space-y-8">
            <div>
              <p className="section-label mb-3">Pills (Standard)</p>
              <VoltTabs
                variant="pills"
                tabs={[
                  { id: "design", label: "Design",  icon: <Palette className="w-4 h-4" />, content: tabContent.design },
                  { id: "code",   label: "Code",    icon: <Code2 className="w-4 h-4" />,   content: tabContent.code },
                  { id: "tokens", label: "Tokens",  icon: <Layers className="w-4 h-4" />,  content: tabContent.tokens, badge: 4 },
                  { id: "preview",label: "Vorschau",icon: <Zap className="w-4 h-4" />,     content: tabContent.preview },
                ]}
                defaultTab="design"
              />
            </div>
            <div>
              <p className="section-label mb-3">Underline</p>
              <VoltTabs
                variant="underline"
                tabs={[
                  { id: "a", label: "Übersicht" },
                  { id: "b", label: "Komponenten", badge: 12 },
                  { id: "c", label: "Dokumentation" },
                  { id: "d", label: "Changelog" },
                ]}
                defaultTab="a"
              />
            </div>
            <div>
              <p className="section-label mb-3">Boxed</p>
              <VoltTabs
                variant="boxed"
                tabs={[
                  { id: "x", label: "Monatlich" },
                  { id: "y", label: "Jährlich" },
                  { id: "z", label: "Einmalig" },
                ]}
                defaultTab="y"
              />
            </div>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Modal */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Modal-Dialoge</VoltCardTitle>
          <VoltCardDescription>Glasmorphismus mit Volt-Textur, Escape-Taste und Backdrop-Klick zum Schließen</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap gap-3">
            <VoltButton variant="primary" onClick={() => setModalOpen(true)}>
              Modal öffnen
            </VoltButton>
            <VoltButton variant="destructive" onClick={() => setConfirmOpen(true)}>
              Bestätigungs-Dialog
            </VoltButton>
          </div>

          {/* Standard Modal */}
          <VoltModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Neues Projekt erstellen"
            description="Fülle die folgenden Felder aus, um ein neues Projekt anzulegen."
            size="md"
            footer={
              <>
                <VoltButton variant="ghost" onClick={() => setModalOpen(false)}>Abbrechen</VoltButton>
                <VoltButton variant="gradient" onClick={() => setModalOpen(false)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Erstellen
                </VoltButton>
              </>
            }
          >
            <div className="space-y-4">
              <VoltInput label="Projektname" placeholder="Mein neues Projekt" />
              <VoltInput label="Beschreibung" placeholder="Kurze Beschreibung…" />
            </div>
          </VoltModal>

          {/* Confirm Modal */}
          <VoltModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Projekt löschen?"
            description="Diese Aktion kann nicht rückgängig gemacht werden. Alle Daten werden dauerhaft gelöscht."
            size="sm"
            footer={
              <>
                <VoltButton variant="ghost" onClick={() => setConfirmOpen(false)}>Abbrechen</VoltButton>
                <VoltButton variant="destructive" onClick={() => setConfirmOpen(false)} leftIcon={<Trash2 className="w-4 h-4" />}>
                  Endgültig löschen
                </VoltButton>
              </>
            }
          />
        </VoltCardContent>
      </VoltCard>

      {/* Toast */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Toast-Benachrichtigungen</VoltCardTitle>
          <VoltCardDescription>Klicke einen Button um eine Toast-Benachrichtigung auszulösen</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap gap-3">
            <VoltButton
              variant="primary"
              leftIcon={<Info className="w-4 h-4" />}
              onClick={() => add({ variant: "info", title: "Information", description: "Volt UI wurde erfolgreich geladen." })}
            >
              Info
            </VoltButton>
            <VoltButton
              variant="secondary"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={() => add({ variant: "success", title: "Gespeichert!", description: "Alle Änderungen wurden erfolgreich gespeichert." })}
            >
              Erfolg
            </VoltButton>
            <VoltButton
              variant="outline"
              leftIcon={<AlertTriangle className="w-4 h-4" />}
              onClick={() => add({ variant: "warning", title: "Achtung", description: "Bitte überprüfe deine Eingaben vor dem Absenden." })}
            >
              Warnung
            </VoltButton>
            <VoltButton
              variant="destructive"
              leftIcon={<AlertCircle className="w-4 h-4" />}
              onClick={() => add({ variant: "error", title: "Fehler", description: "Verbindung zum Server unterbrochen." })}
            >
              Fehler
            </VoltButton>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Tooltip */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Tooltips</VoltCardTitle>
          <VoltCardDescription>Hover über die Buttons für Tooltips in alle Richtungen</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="flex flex-wrap gap-4 py-4 justify-center">
            <VoltTooltip content="Oben angezeigt" side="top">
              <VoltButton variant="outline" size="sm">Oben</VoltButton>
            </VoltTooltip>
            <VoltTooltip content="Unten angezeigt" side="bottom">
              <VoltButton variant="outline" size="sm">Unten</VoltButton>
            </VoltTooltip>
            <VoltTooltip content="Links angezeigt" side="left">
              <VoltButton variant="outline" size="sm">Links</VoltButton>
            </VoltTooltip>
            <VoltTooltip content="Rechts angezeigt" side="right">
              <VoltButton variant="outline" size="sm">Rechts</VoltButton>
            </VoltTooltip>
            <VoltTooltip content={<span>Mit <strong>HTML</strong> Inhalt</span>} side="top">
              <VoltButton variant="gradient" size="sm">Rich Tooltip</VoltButton>
            </VoltTooltip>
          </div>
        </VoltCardContent>
      </VoltCard>
    </div>
  );
};
