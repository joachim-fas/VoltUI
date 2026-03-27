/**
 * FeedbackSection – Tabs, Modal, Toast, Tooltip
 */

import React, { useState } from "react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle, GrainCardDescription } from "@/components/grain/GrainCard";
import { GrainTabs } from "@/components/grain/GrainTabs";
import { GrainModal } from "@/components/grain/GrainModal";
import { GrainToastContainer, useGrainToast } from "@/components/grain/GrainToast";
import { GrainTooltip } from "@/components/grain/GrainToast";
import { GrainButton } from "@/components/grain/GrainButton";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainInput } from "@/components/grain/GrainInput";
import {
  Code2, Layers, Palette, Zap,
  Info, CheckCircle2, AlertCircle, AlertTriangle,
  Trash2, ArrowRight,
} from "lucide-react";

const tabContent = {
  design: (
    <div className="space-y-3">
      <p className="text-sm font-body text-muted-foreground leading-relaxed">
        Das Grain UI Design System basiert auf dem Atmospheric Grain Konzept –
        Tiefe durch Schichtung von Grain-Textur, Gradienten und Glasmorphismus.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {["Grain", "Gradient", "Glass"].map(t => (
          <div key={t} className="bg-muted rounded-lg p-3 text-center">
            <p className="text-xs font-semibold font-body text-foreground">{t}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  code: (
    <div className="code-block text-xs">
      <span className="token-comment">{"// Grain-Textur als CSS"}</span>{"\n"}
      <span className="token-blue">.grain</span>::after {"{"}{"\n"}
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
          <GrainBadge variant="muted" size="sm">CSS Token</GrainBadge>
        </div>
      ))}
    </div>
  ),
  preview: (
    <div className="bg-grain-hero rounded-xl p-6 grain">
      <p className="font-display font-bold text-2xl text-foreground">Atmospheric Grain</p>
      <p className="text-sm text-muted-foreground font-body mt-1">Live-Vorschau des Gradient-Hintergrunds</p>
    </div>
  ),
};

export const FeedbackSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { toasts, add, dismiss } = useGrainToast();

  return (
    <div className="space-y-10">
      <GrainToastContainer toasts={toasts} onDismiss={dismiss} position="bottom-right" />

      <div>
        <p className="section-label mb-2">05 — Feedback</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Tabs, Modal & Toast</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Interaktive Feedback-Komponenten mit Framer Motion Animationen.
          Alle Übergänge sind flüssig und reagieren auf Tastatureingaben.
        </p>
      </div>

      {/* Tabs */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Tab-Varianten</GrainCardTitle>
          <GrainCardDescription>pills · underline · boxed · glass</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="space-y-8">
            <div>
              <p className="section-label mb-3">Pills (Standard)</p>
              <GrainTabs
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
              <GrainTabs
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
              <GrainTabs
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
        </GrainCardContent>
      </GrainCard>

      {/* Modal */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Modal-Dialoge</GrainCardTitle>
          <GrainCardDescription>Glasmorphismus mit Grain-Textur, Escape-Taste und Backdrop-Klick zum Schließen</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex flex-wrap gap-3">
            <GrainButton variant="primary" onClick={() => setModalOpen(true)}>
              Modal öffnen
            </GrainButton>
            <GrainButton variant="destructive" onClick={() => setConfirmOpen(true)}>
              Bestätigungs-Dialog
            </GrainButton>
          </div>

          {/* Standard Modal */}
          <GrainModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Neues Projekt erstellen"
            description="Fülle die folgenden Felder aus, um ein neues Projekt anzulegen."
            size="md"
            footer={
              <>
                <GrainButton variant="ghost" onClick={() => setModalOpen(false)}>Abbrechen</GrainButton>
                <GrainButton variant="gradient" onClick={() => setModalOpen(false)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Erstellen
                </GrainButton>
              </>
            }
          >
            <div className="space-y-4">
              <GrainInput label="Projektname" placeholder="Mein neues Projekt" />
              <GrainInput label="Beschreibung" placeholder="Kurze Beschreibung…" />
            </div>
          </GrainModal>

          {/* Confirm Modal */}
          <GrainModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Projekt löschen?"
            description="Diese Aktion kann nicht rückgängig gemacht werden. Alle Daten werden dauerhaft gelöscht."
            size="sm"
            footer={
              <>
                <GrainButton variant="ghost" onClick={() => setConfirmOpen(false)}>Abbrechen</GrainButton>
                <GrainButton variant="destructive" onClick={() => setConfirmOpen(false)} leftIcon={<Trash2 className="w-4 h-4" />}>
                  Endgültig löschen
                </GrainButton>
              </>
            }
          />
        </GrainCardContent>
      </GrainCard>

      {/* Toast */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Toast-Benachrichtigungen</GrainCardTitle>
          <GrainCardDescription>Klicke einen Button um eine Toast-Benachrichtigung auszulösen</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex flex-wrap gap-3">
            <GrainButton
              variant="primary"
              leftIcon={<Info className="w-4 h-4" />}
              onClick={() => add({ variant: "info", title: "Information", description: "Grain UI wurde erfolgreich geladen." })}
            >
              Info
            </GrainButton>
            <GrainButton
              variant="secondary"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={() => add({ variant: "success", title: "Gespeichert!", description: "Alle Änderungen wurden erfolgreich gespeichert." })}
            >
              Erfolg
            </GrainButton>
            <GrainButton
              variant="outline"
              leftIcon={<AlertTriangle className="w-4 h-4" />}
              onClick={() => add({ variant: "warning", title: "Achtung", description: "Bitte überprüfe deine Eingaben vor dem Absenden." })}
            >
              Warnung
            </GrainButton>
            <GrainButton
              variant="destructive"
              leftIcon={<AlertCircle className="w-4 h-4" />}
              onClick={() => add({ variant: "error", title: "Fehler", description: "Verbindung zum Server unterbrochen." })}
            >
              Fehler
            </GrainButton>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Tooltip */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Tooltips</GrainCardTitle>
          <GrainCardDescription>Hover über die Buttons für Tooltips in alle Richtungen</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex flex-wrap gap-4 py-4 justify-center">
            <GrainTooltip content="Oben angezeigt" side="top">
              <GrainButton variant="outline" size="sm">Oben</GrainButton>
            </GrainTooltip>
            <GrainTooltip content="Unten angezeigt" side="bottom">
              <GrainButton variant="outline" size="sm">Unten</GrainButton>
            </GrainTooltip>
            <GrainTooltip content="Links angezeigt" side="left">
              <GrainButton variant="outline" size="sm">Links</GrainButton>
            </GrainTooltip>
            <GrainTooltip content="Rechts angezeigt" side="right">
              <GrainButton variant="outline" size="sm">Rechts</GrainButton>
            </GrainTooltip>
            <GrainTooltip content={<span>Mit <strong>HTML</strong> Inhalt</span>} side="top">
              <GrainButton variant="gradient" size="sm">Rich Tooltip</GrainButton>
            </GrainTooltip>
          </div>
        </GrainCardContent>
      </GrainCard>
    </div>
  );
};
