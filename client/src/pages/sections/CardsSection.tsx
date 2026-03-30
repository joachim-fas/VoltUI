/**
 * CardsSection – Cards, Badges, Alerts, Avatare
 */

import React, { useState } from "react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle, GrainCardDescription, GrainCardFooter } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainAlert } from "@/components/grain/GrainAlert";
import { GrainAvatar, GrainAvatarGroup } from "@/components/grain/GrainAvatar";
import { GrainButton } from "@/components/grain/GrainButton";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export const CardsSection: React.FC = () => {
  const [alerts, setAlerts] = useState({
    info: true, success: true, warning: true, error: true,
  });

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label mb-2">03 — Surfaces</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Cards, Badges & Alerts</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Oberflächen-Komponenten mit Glasmorphismus, Flux-Textur und atmosphärischen Schatten.
          Alle Varianten reagieren auf Hover und unterstützen Dark Mode.
        </p>
      </div>

      {/* Card-Varianten */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Card-Varianten</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Default */}
          <GrainCard variant="default">
            <GrainCardHeader>
              <div className="flex items-center justify-between">
                <GrainBadge variant="muted" size="sm">Default</GrainBadge>
                <GrainBadge variant="default" size="sm" dot>Aktiv</GrainBadge>
              </div>
              <GrainCardTitle>Standard Card</GrainCardTitle>
              <GrainCardDescription>
                Mit subtiler Flux-Textur und weichem Schatten. Hover-Effekt inklusive.
              </GrainCardDescription>
            </GrainCardHeader>
            <GrainCardFooter>
              <GrainButton variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Mehr erfahren
              </GrainButton>
            </GrainCardFooter>
          </GrainCard>

          {/* Glass */}
          <div className="bg-grain-hero rounded-2xl p-0.5">
            <GrainCard variant="glass" className="h-full">
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <GrainBadge variant="glass" size="sm">Glass</GrainBadge>
                  <Sparkles className="w-4 h-4 text-foreground" />
                </div>
                <GrainCardTitle>Glass Card</GrainCardTitle>
                <GrainCardDescription>
                  Backdrop-Blur mit Glasmorphismus-Effekt. Ideal für Hero-Bereiche.
                </GrainCardDescription>
              </GrainCardHeader>
              <GrainCardFooter>
                <GrainButton variant="glass" size="sm">Entdecken</GrainButton>
              </GrainCardFooter>
            </GrainCard>
          </div>

          {/* Gradient */}
          <GrainCard variant="gradient">
            <GrainCardHeader>
              <div className="flex items-center justify-between">
                <GrainBadge variant="glass" size="sm">Gradient</GrainBadge>
                <TrendingUp className="w-4 h-4 text-[#0A0A0A]" />
              </div>
              <GrainCardTitle className="text-[#000000]">Lime Card</GrainCardTitle>
              <GrainCardDescription className="text-[#000000]/70">
                Neon-Yellow mit Flux-Textur. Für hervorgehobene Inhalte.
              </GrainCardDescription>
            </GrainCardHeader>
            <GrainCardFooter>
              <GrainButton variant="solid" size="sm">
                Jetzt starten
              </GrainButton>
            </GrainCardFooter>
          </GrainCard>

          {/* Elevated */}
          <GrainCard variant="elevated">
            <GrainCardHeader>
              <GrainBadge variant="muted" size="sm">Elevated</GrainBadge>
              <GrainCardTitle>Elevated Card</GrainCardTitle>
              <GrainCardDescription>
                Stärkerer Schatten für visuelle Hierarchie und Tiefe.
              </GrainCardDescription>
            </GrainCardHeader>
            <GrainCardContent>
              <div className="flex items-center gap-3">
                <GrainAvatar name="Anna Müller" size="md" online />
                <div>
                  <p className="text-sm font-semibold font-body">Anna Müller</p>
                  <p className="text-xs text-muted-foreground font-body">Design Lead</p>
                </div>
              </div>
            </GrainCardContent>
          </GrainCard>

          {/* Outlined */}
          <GrainCard variant="outlined">
            <GrainCardHeader>
              <GrainBadge variant="outline" size="sm">Outlined</GrainBadge>
              <GrainCardTitle>Outlined Card</GrainCardTitle>
              <GrainCardDescription>
                Transparenter Hintergrund mit farbigem Rahmen. Für sekundäre Inhalte.
              </GrainCardDescription>
            </GrainCardHeader>
            <GrainCardFooter>
              <GrainButton variant="primary" size="sm">Auswählen</GrainButton>
            </GrainCardFooter>
          </GrainCard>

          {/* Subtle */}
          <GrainCard variant="subtle">
            <GrainCardHeader>
              <GrainBadge variant="muted" size="sm">Subtle</GrainBadge>
              <GrainCardTitle>Subtle Card</GrainCardTitle>
              <GrainCardDescription>
                Sehr zurückhaltend mit atmosphärischem Gradient-Hintergrund.
              </GrainCardDescription>
            </GrainCardHeader>
            <GrainCardContent>
              <GrainAvatarGroup
                avatars={[
                  { name: "Max S." },
                  { name: "Lisa K." },
                  { name: "Tom B." },
                  { name: "Sara W." },
                  { name: "Jan F." },
                ]}
                max={4}
                size="sm"
              />
            </GrainCardContent>
          </GrainCard>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Badge-Varianten</h3>
        <GrainCard>
          <GrainCardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="section-label mb-3">Farb-Varianten</p>
                <div className="flex flex-wrap gap-2">
                  <GrainBadge variant="default">Lime</GrainBadge>
                  <GrainBadge variant="solid">Solid</GrainBadge>
                  <GrainBadge variant="outline">Outline</GrainBadge>
                  <GrainBadge variant="muted">Muted</GrainBadge>
                  <GrainBadge variant="glass">Glass</GrainBadge>
                  <GrainBadge variant="positive">Positiv</GrainBadge>
                  <GrainBadge variant="negative">Negativ</GrainBadge>
                  <GrainBadge variant="neutral">Neutral</GrainBadge>
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Größen</p>
                <div className="flex flex-wrap items-center gap-2">
                  <GrainBadge variant="default" size="sm">Small</GrainBadge>
                  <GrainBadge variant="default" size="md">Medium</GrainBadge>
                  <GrainBadge variant="default" size="lg">Large</GrainBadge>
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Mit Status-Punkt</p>
                <div className="flex flex-wrap gap-2">
                  <GrainBadge variant="positive" dot dotColor="#1A9E5A">Online</GrainBadge>
                  <GrainBadge variant="neutral" dot dotColor="#E8B800">Beschäftigt</GrainBadge>
                  <GrainBadge variant="muted" dot dotColor="#6B6B6B">Abwesend</GrainBadge>
                  <GrainBadge variant="default" dot>Neu</GrainBadge>
                </div>
              </div>
            </div>
          </GrainCardContent>
        </GrainCard>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Alert-Varianten</h3>
        <div className="space-y-3">
          {alerts.info && (
            <GrainAlert
              variant="info"
              title="Information"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, info: false }))}
            >
              Das Flux UI Design System ist vollständig in CSS und React implementiert – keine externen Bild-Assets.
            </GrainAlert>
          )}
          {alerts.success && (
            <GrainAlert
              variant="success"
              title="Erfolgreich gespeichert"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, success: false }))}
            >
              Alle Änderungen wurden erfolgreich gespeichert und sind sofort aktiv.
            </GrainAlert>
          )}
          {alerts.warning && (
            <GrainAlert
              variant="warning"
              title="Achtung"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, warning: false }))}
            >
              Diese Aktion kann nicht rückgängig gemacht werden. Bitte überprüfe deine Eingaben.
            </GrainAlert>
          )}
          {alerts.error && (
            <GrainAlert
              variant="error"
              title="Fehler aufgetreten"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, error: false }))}
            >
              Die Verbindung zum Server konnte nicht hergestellt werden. Bitte versuche es erneut.
            </GrainAlert>
          )}
          {!Object.values(alerts).some(Boolean) && (
            <div className="text-center py-8 text-muted-foreground font-body text-sm">
              Alle Alerts wurden geschlossen.{" "}
              <button
                className="text-foreground font-semibold hover:underline underline-offset-2"
                onClick={() => setAlerts({ info: true, success: true, warning: true, error: true })}
              >
                Zurücksetzen
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Avatare */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Avatar-Komponente</h3>
        <GrainCard>
          <GrainCardContent className="pt-6 space-y-6">
            <div>
              <p className="section-label mb-3">Größen mit Gradient-Fallback</p>
              <div className="flex items-end gap-4">
                <GrainAvatar name="Anna Müller" size="xs" />
                <GrainAvatar name="Max Schmidt" size="sm" />
                <GrainAvatar name="Lisa Koch" size="md" />
                <GrainAvatar name="Tom Braun" size="lg" />
                <GrainAvatar name="Sara Weber" size="xl" />
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Online-Status</p>
              <div className="flex items-center gap-4">
                <GrainAvatar name="Anna M." size="md" online />
                <GrainAvatar name="Max S." size="md" ring />
                <GrainAvatar name="Lisa K." size="lg" online ring />
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Avatar-Gruppe</p>
              <GrainAvatarGroup
                avatars={[
                  { name: "Anna Müller" },
                  { name: "Max Schmidt" },
                  { name: "Lisa Koch" },
                  { name: "Tom Braun" },
                  { name: "Sara Weber" },
                  { name: "Jan Fischer" },
                ]}
                max={5}
                size="md"
              />
            </div>
          </GrainCardContent>
        </GrainCard>
      </div>
    </div>
  );
};
