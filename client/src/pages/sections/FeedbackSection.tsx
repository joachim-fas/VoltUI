/**
 * FeedbackSection – Tabs, Modal, Toast, Tooltip
 */

import React, { useState } from "react";
import { FluxCard, FluxCardContent, FluxCardHeader, FluxCardTitle, FluxCardDescription } from "@/components/grain/FluxCard";
import { FluxTabs } from "@/components/grain/FluxTabs";
import { FluxModal } from "@/components/grain/FluxModal";
import { FluxToastContainer, useFluxToast } from "@/components/grain/FluxToast";
import { FluxTooltip } from "@/components/grain/FluxToast";
import { FluxButton } from "@/components/grain/FluxButton";
import { FluxBadge } from "@/components/grain/FluxBadge";
import { FluxInput } from "@/components/grain/FluxInput";
import {
  Code2, Layers, Palette, Zap,
  Info, CheckCircle2, AlertCircle, AlertTriangle,
  Trash2, ArrowRight,
} from "lucide-react";

const tabContent = {
  design: (
    <div className="space-y-3">
      <p className="text-sm font-body text-muted-foreground leading-relaxed">
        Das Flux UI Design System basiert auf dem Atmospheric Flux-Konzept –
        Tiefe durch Schichtung von Flux-Textur, Gradienten und Glasmorphismus.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {["Flux", "Gradient", "Glass"].map(t => (
          <div key={t} className="bg-muted rounded-lg p-3 text-center">
            <p className="text-xs font-semibold font-body text-foreground">{t}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  code: (
    <div className="code-block text-xs">
      <span className="token-comment">{"// Flux-Textur als CSS"}</span>{"\n"}
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
          <FluxBadge variant="muted" size="sm">CSS Token</FluxBadge>
        </div>
      ))}
    </div>
  ),
  preview: (
    <div className="bg-grain-hero rounded-xl p-6 grain">
      <p className="font-display font-bold text-2xl text-foreground">Atmospheric Flux</p>
      <p className="text-sm text-muted-foreground font-body mt-1">Live-Vorschau des Gradient-Hintergrunds</p>
    </div>
  ),
};

export const FeedbackSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { toasts, add, dismiss } = useFluxToast();

  return (
    <div className="space-y-10">
      <FluxToastContainer toasts={toasts} onDismiss={dismiss} position="bottom-right" />

      <div>
        <p className="section-label mb-2">05 — Feedback</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Tabs, Modal & Toast</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Interaktive Feedback-Komponenten mit Framer Motion Animationen.
          Alle Übergänge sind flüssig und reagieren auf Tastatureingaben.
        </p>
      </div>

      {/* Tabs */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Tab-Varianten</FluxCardTitle>
          <FluxCardDescription>pills · underline · boxed · glass</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="space-y-8">
            <div>
              <p className="section-label mb-3">Pills (Standard)</p>
              <FluxTabs
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
              <FluxTabs
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
              <FluxTabs
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
        </FluxCardContent>
      </FluxCard>

      {/* Modal */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Modal-Dialoge</FluxCardTitle>
          <FluxCardDescription>Glasmorphismus mit Flux-Textur, Escape-Taste und Backdrop-Klick zum Schließen</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="flex flex-wrap gap-3">
            <FluxButton variant="primary" onClick={() => setModalOpen(true)}>
              Modal öffnen
            </FluxButton>
            <FluxButton variant="destructive" onClick={() => setConfirmOpen(true)}>
              Bestätigungs-Dialog
            </FluxButton>
          </div>

          {/* Standard Modal */}
          <FluxModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Neues Projekt erstellen"
            description="Fülle die folgenden Felder aus, um ein neues Projekt anzulegen."
            size="md"
            footer={
              <>
                <FluxButton variant="ghost" onClick={() => setModalOpen(false)}>Abbrechen</FluxButton>
                <FluxButton variant="gradient" onClick={() => setModalOpen(false)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Erstellen
                </FluxButton>
              </>
            }
          >
            <div className="space-y-4">
              <FluxInput label="Projektname" placeholder="Mein neues Projekt" />
              <FluxInput label="Beschreibung" placeholder="Kurze Beschreibung…" />
            </div>
          </FluxModal>

          {/* Confirm Modal */}
          <FluxModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Projekt löschen?"
            description="Diese Aktion kann nicht rückgängig gemacht werden. Alle Daten werden dauerhaft gelöscht."
            size="sm"
            footer={
              <>
                <FluxButton variant="ghost" onClick={() => setConfirmOpen(false)}>Abbrechen</FluxButton>
                <FluxButton variant="destructive" onClick={() => setConfirmOpen(false)} leftIcon={<Trash2 className="w-4 h-4" />}>
                  Endgültig löschen
                </FluxButton>
              </>
            }
          />
        </FluxCardContent>
      </FluxCard>

      {/* Toast */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Toast-Benachrichtigungen</FluxCardTitle>
          <FluxCardDescription>Klicke einen Button um eine Toast-Benachrichtigung auszulösen</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="flex flex-wrap gap-3">
            <FluxButton
              variant="primary"
              leftIcon={<Info className="w-4 h-4" />}
              onClick={() => add({ variant: "info", title: "Information", description: "Flux UI wurde erfolgreich geladen." })}
            >
              Info
            </FluxButton>
            <FluxButton
              variant="secondary"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={() => add({ variant: "success", title: "Gespeichert!", description: "Alle Änderungen wurden erfolgreich gespeichert." })}
            >
              Erfolg
            </FluxButton>
            <FluxButton
              variant="outline"
              leftIcon={<AlertTriangle className="w-4 h-4" />}
              onClick={() => add({ variant: "warning", title: "Achtung", description: "Bitte überprüfe deine Eingaben vor dem Absenden." })}
            >
              Warnung
            </FluxButton>
            <FluxButton
              variant="destructive"
              leftIcon={<AlertCircle className="w-4 h-4" />}
              onClick={() => add({ variant: "error", title: "Fehler", description: "Verbindung zum Server unterbrochen." })}
            >
              Fehler
            </FluxButton>
          </div>
        </FluxCardContent>
      </FluxCard>

      {/* Tooltip */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Tooltips</FluxCardTitle>
          <FluxCardDescription>Hover über die Buttons für Tooltips in alle Richtungen</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="flex flex-wrap gap-4 py-4 justify-center">
            <FluxTooltip content="Oben angezeigt" side="top">
              <FluxButton variant="outline" size="sm">Oben</FluxButton>
            </FluxTooltip>
            <FluxTooltip content="Unten angezeigt" side="bottom">
              <FluxButton variant="outline" size="sm">Unten</FluxButton>
            </FluxTooltip>
            <FluxTooltip content="Links angezeigt" side="left">
              <FluxButton variant="outline" size="sm">Links</FluxButton>
            </FluxTooltip>
            <FluxTooltip content="Rechts angezeigt" side="right">
              <FluxButton variant="outline" size="sm">Rechts</FluxButton>
            </FluxTooltip>
            <FluxTooltip content={<span>Mit <strong>HTML</strong> Inhalt</span>} side="top">
              <FluxButton variant="gradient" size="sm">Rich Tooltip</FluxButton>
            </FluxTooltip>
          </div>
        </FluxCardContent>
      </FluxCard>
    </div>
  );
};
