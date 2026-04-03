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
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";

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
    <VoltCodeBlock
      language="css"
      label="Volt-Textur"
      code={`.volt-texture::after {
  background-image: url("data:image/svg+xml,…");
  opacity: 0.06;
}`}
    />
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
        <p className="section-label mb-2">09 — Feedback</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">Tabs, Modal & Toast</h2>
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
        <VoltCodeBlock
          language="tsx"
          label="VoltTabs · Varianten"
          code={`// Installation: pnpm add framer-motion lucide-react
// Kopiere VoltTabs.tsx in dein Projekt (aus /components/volt/)

import React from "react";
import { VoltTabs } from "./VoltTabs";
import { Palette, Code2, Layers, Zap } from "lucide-react";

export function TabsDemo() {
  return (
    <div className="space-y-8">
      {/* Pills-Variante (Standard) */}
      <VoltTabs
        variant="pills"   // pills · underline · boxed · glass
        defaultTab="design"
        tabs={[
          {
            id: "design",
            label: "Design",
            icon: <Palette className="w-4 h-4" />,
            content: <p className="text-sm text-muted-foreground">Design-Inhalt hier</p>,
          },
          {
            id: "code",
            label: "Code",
            icon: <Code2 className="w-4 h-4" />,
            content: <pre className="text-xs font-mono">const x = 42;</pre>,
          },
          {
            id: "tokens",
            label: "Tokens",
            icon: <Layers className="w-4 h-4" />,
            content: <p className="text-sm">Design Tokens</p>,
            badge: 4,  // Numerisches Badge
          },
          {
            id: "preview",
            label: "Vorschau",
            icon: <Zap className="w-4 h-4" />,
            content: <div className="p-4 bg-muted rounded-lg">Live-Vorschau</div>,
          },
        ]}
      />

      {/* Underline-Variante */}
      <VoltTabs
        variant="underline"
        defaultTab="a"
        tabs={[
          { id: "a", label: "Übersicht" },
          { id: "b", label: "Komponenten", badge: 12 },
          { id: "c", label: "Dokumentation" },
        ]}
      />

      {/* Boxed-Variante (Toggle-Stil) */}
      <VoltTabs
        variant="boxed"
        defaultTab="monthly"
        tabs={[
          { id: "monthly", label: "Monatlich" },
          { id: "yearly",  label: "Jährlich" },
          { id: "once",    label: "Einmalig" },
        ]}
      />
    </div>
  );
}

// Kontrollierter Modus:
// <VoltTabs activeTab={tab} onTabChange={setTab} tabs={[...]} />`}
        />
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
        <VoltCodeBlock
          language="tsx"
          label="VoltModal · Verwendung"
          code={`// Installation: pnpm add framer-motion lucide-react
// Kopiere VoltModal.tsx, VoltButton.tsx, VoltInput.tsx in dein Projekt

import React, { useState } from "react";
import { VoltModal } from "./VoltModal";
import { VoltButton } from "./VoltButton";
import { VoltInput } from "./VoltInput";
import { ArrowRight, Trash2 } from "lucide-react";

export function ModalDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex gap-3">
      <VoltButton variant="primary" onClick={() => setModalOpen(true)}>
        Modal öffnen
      </VoltButton>
      <VoltButton variant="destructive" onClick={() => setConfirmOpen(true)}>
        Bestätigung
      </VoltButton>

      {/* Standard-Modal mit Formular */}
      <VoltModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Neues Projekt erstellen"
        description="Fülle die folgenden Felder aus, um ein neues Projekt anzulegen."
        size="md"   // sm · md · lg · xl · full
        footer={
          <>
            <VoltButton variant="ghost" onClick={() => setModalOpen(false)}>Abbrechen</VoltButton>
            <VoltButton
              variant="gradient"
              onClick={() => setModalOpen(false)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
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

      {/* Bestätigungs-Dialog (kein children) */}
      <VoltModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Projekt löschen?"
        description="Diese Aktion kann nicht rückgängig gemacht werden."
        size="sm"
        footer={
          <>
            <VoltButton variant="ghost" onClick={() => setConfirmOpen(false)}>Abbrechen</VoltButton>
            <VoltButton
              variant="destructive"
              onClick={() => setConfirmOpen(false)}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Endgültig löschen
            </VoltButton>
          </>
        }
      />
    </div>
  );
}

// Escape-Taste und Backdrop-Klick schließen das Modal automatisch.`}
        />
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
        <VoltCodeBlock
          language="tsx"
          label="VoltToast · Verwendung"
          code={`// Installation: pnpm add framer-motion lucide-react
// Kopiere VoltToast.tsx in dein Projekt (aus /components/volt/)

import React from "react";
import { VoltToastContainer, useVoltToast } from "./VoltToast";
import { VoltButton } from "./VoltButton";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export function ToastDemo() {
  const { toasts, add, dismiss } = useVoltToast();

  return (
    <div>
      {/* Container einmalig im Layout einbinden */}
      <VoltToastContainer
        toasts={toasts}
        onDismiss={dismiss}
        position="bottom-right"  // top-right · top-left · bottom-right · bottom-left
      />

      <div className="flex flex-wrap gap-3">
        <VoltButton
          variant="primary"
          leftIcon={<Info className="w-4 h-4" />}
          onClick={() => add({
            variant: "info",     // info · success · warning · error
            title: "Information",
            description: "Volt UI wurde erfolgreich geladen.",
          })}
        >
          Info
        </VoltButton>

        <VoltButton
          variant="secondary"
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
          onClick={() => add({
            variant: "success",
            title: "Gespeichert!",
            description: "Alle Änderungen wurden erfolgreich gespeichert.",
          })}
        >
          Erfolg
        </VoltButton>

        <VoltButton
          variant="outline"
          leftIcon={<AlertTriangle className="w-4 h-4" />}
          onClick={() => add({
            variant: "warning",
            title: "Achtung",
            description: "Bitte überprüfe deine Eingaben vor dem Absenden.",
          })}
        >
          Warnung
        </VoltButton>

        <VoltButton
          variant="destructive"
          leftIcon={<AlertCircle className="w-4 h-4" />}
          onClick={() => add({
            variant: "error",
            title: "Fehler",
            description: "Verbindung zum Server unterbrochen.",
          })}
        >
          Fehler
        </VoltButton>
      </div>
    </div>
  );
}`}
        />
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
        <VoltCodeBlock
          language="tsx"
          label="VoltTooltip · Verwendung"
          code={`// Installation: pnpm add framer-motion
// Kopiere VoltToast.tsx in dein Projekt – VoltTooltip ist darin enthalten

import React from "react";
import { VoltTooltip } from "./VoltToast";
import { VoltButton } from "./VoltButton";

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap gap-4 py-4 justify-center">
      {/* Alle vier Richtungen */}
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

      {/* Rich Content (JSX im Tooltip) */}
      <VoltTooltip
        content={<span>Mit <strong>HTML</strong> Inhalt</span>}
        side="top"
        delay={300}  // Verzögerung in ms (Standard: 400)
      >
        <VoltButton variant="gradient" size="sm">Rich Tooltip</VoltButton>
      </VoltTooltip>
    </div>
  );
}

// Props: content (string | ReactNode) · side (top · bottom · left · right) · delay (ms)`}
        />
      </VoltCard>
    </div>
  );
};
