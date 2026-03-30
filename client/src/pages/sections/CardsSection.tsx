/**
 * CardsSection – Cards, Badges, Alerts, Avatare
 */

import React, { useState } from "react";
import { FluxCard, FluxCardContent, FluxCardHeader, FluxCardTitle, FluxCardDescription, FluxCardFooter } from "@/components/grain/FluxCard";
import { FluxBadge } from "@/components/grain/FluxBadge";
import { FluxAlert } from "@/components/grain/FluxAlert";
import { FluxAvatar, FluxAvatarGroup } from "@/components/grain/FluxAvatar";
import { FluxButton } from "@/components/grain/FluxButton";
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
          <FluxCard variant="default">
            <FluxCardHeader>
              <div className="flex items-center justify-between">
                <FluxBadge variant="muted" size="sm">Default</FluxBadge>
                <FluxBadge variant="default" size="sm" dot>Aktiv</FluxBadge>
              </div>
              <FluxCardTitle>Standard Card</FluxCardTitle>
              <FluxCardDescription>
                Mit subtiler Flux-Textur und weichem Schatten. Hover-Effekt inklusive.
              </FluxCardDescription>
            </FluxCardHeader>
            <FluxCardFooter>
              <FluxButton variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Mehr erfahren
              </FluxButton>
            </FluxCardFooter>
          </FluxCard>

          {/* Glass */}
          <div className="bg-grain-hero rounded-2xl p-0.5">
            <FluxCard variant="glass" className="h-full">
              <FluxCardHeader>
                <div className="flex items-center justify-between">
                  <FluxBadge variant="glass" size="sm">Glass</FluxBadge>
                  <Sparkles className="w-4 h-4 text-foreground" />
                </div>
                <FluxCardTitle>Glass Card</FluxCardTitle>
                <FluxCardDescription>
                  Backdrop-Blur mit Glasmorphismus-Effekt. Ideal für Hero-Bereiche.
                </FluxCardDescription>
              </FluxCardHeader>
              <FluxCardFooter>
                <FluxButton variant="glass" size="sm">Entdecken</FluxButton>
              </FluxCardFooter>
            </FluxCard>
          </div>

          {/* Gradient */}
          <FluxCard variant="gradient">
            <FluxCardHeader>
              <div className="flex items-center justify-between">
                <FluxBadge variant="glass" size="sm">Gradient</FluxBadge>
                <TrendingUp className="w-4 h-4 text-foreground" />
              </div>
              <FluxCardTitle className="text-foreground">Lime Card</FluxCardTitle>
              <FluxCardDescription className="text-[#000000]/70">
                Neon-Yellow mit Flux-Textur. Für hervorgehobene Inhalte.
              </FluxCardDescription>
            </FluxCardHeader>
            <FluxCardFooter>
              <FluxButton variant="solid" size="sm">
                Jetzt starten
              </FluxButton>
            </FluxCardFooter>
          </FluxCard>

          {/* Elevated */}
          <FluxCard variant="elevated">
            <FluxCardHeader>
              <FluxBadge variant="muted" size="sm">Elevated</FluxBadge>
              <FluxCardTitle>Elevated Card</FluxCardTitle>
              <FluxCardDescription>
                Stärkerer Schatten für visuelle Hierarchie und Tiefe.
              </FluxCardDescription>
            </FluxCardHeader>
            <FluxCardContent>
              <div className="flex items-center gap-3">
                <FluxAvatar name="Anna Müller" size="md" online />
                <div>
                  <p className="text-sm font-semibold font-body">Anna Müller</p>
                  <p className="text-xs text-muted-foreground font-body">Design Lead</p>
                </div>
              </div>
            </FluxCardContent>
          </FluxCard>

          {/* Outlined */}
          <FluxCard variant="outlined">
            <FluxCardHeader>
              <FluxBadge variant="outline" size="sm">Outlined</FluxBadge>
              <FluxCardTitle>Outlined Card</FluxCardTitle>
              <FluxCardDescription>
                Transparenter Hintergrund mit farbigem Rahmen. Für sekundäre Inhalte.
              </FluxCardDescription>
            </FluxCardHeader>
            <FluxCardFooter>
              <FluxButton variant="primary" size="sm">Auswählen</FluxButton>
            </FluxCardFooter>
          </FluxCard>

          {/* Subtle */}
          <FluxCard variant="subtle">
            <FluxCardHeader>
              <FluxBadge variant="muted" size="sm">Subtle</FluxBadge>
              <FluxCardTitle>Subtle Card</FluxCardTitle>
              <FluxCardDescription>
                Sehr zurückhaltend mit atmosphärischem Gradient-Hintergrund.
              </FluxCardDescription>
            </FluxCardHeader>
            <FluxCardContent>
              <FluxAvatarGroup
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
            </FluxCardContent>
          </FluxCard>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Badge-Varianten</h3>
        <FluxCard>
          <FluxCardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="section-label mb-3">Farb-Varianten</p>
                <div className="flex flex-wrap gap-2">
                  <FluxBadge variant="default">Lime</FluxBadge>
                  <FluxBadge variant="solid">Solid</FluxBadge>
                  <FluxBadge variant="outline">Outline</FluxBadge>
                  <FluxBadge variant="muted">Muted</FluxBadge>
                  <FluxBadge variant="glass">Glass</FluxBadge>
                  <FluxBadge variant="positive">Positiv</FluxBadge>
                  <FluxBadge variant="negative">Negativ</FluxBadge>
                  <FluxBadge variant="neutral">Neutral</FluxBadge>
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Größen</p>
                <div className="flex flex-wrap items-center gap-2">
                  <FluxBadge variant="default" size="sm">Small</FluxBadge>
                  <FluxBadge variant="default" size="md">Medium</FluxBadge>
                  <FluxBadge variant="default" size="lg">Large</FluxBadge>
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Mit Status-Punkt</p>
                <div className="flex flex-wrap gap-2">
                  <FluxBadge variant="positive" dot dotColor="#1A9E5A">Online</FluxBadge>
                  <FluxBadge variant="neutral" dot dotColor="#E8B800">Beschäftigt</FluxBadge>
                  <FluxBadge variant="muted" dot dotColor="#6B6B6B">Abwesend</FluxBadge>
                  <FluxBadge variant="default" dot>Neu</FluxBadge>
                </div>
              </div>
            </div>
          </FluxCardContent>
        </FluxCard>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Alert-Varianten</h3>
        <div className="space-y-3">
          {alerts.info && (
            <FluxAlert
              variant="info"
              title="Information"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, info: false }))}
            >
              Das Flux UI Design System ist vollständig in CSS und React implementiert – keine externen Bild-Assets.
            </FluxAlert>
          )}
          {alerts.success && (
            <FluxAlert
              variant="success"
              title="Erfolgreich gespeichert"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, success: false }))}
            >
              Alle Änderungen wurden erfolgreich gespeichert und sind sofort aktiv.
            </FluxAlert>
          )}
          {alerts.warning && (
            <FluxAlert
              variant="warning"
              title="Achtung"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, warning: false }))}
            >
              Diese Aktion kann nicht rückgängig gemacht werden. Bitte überprüfe deine Eingaben.
            </FluxAlert>
          )}
          {alerts.error && (
            <FluxAlert
              variant="error"
              title="Fehler aufgetreten"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, error: false }))}
            >
              Die Verbindung zum Server konnte nicht hergestellt werden. Bitte versuche es erneut.
            </FluxAlert>
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
        <FluxCard>
          <FluxCardContent className="pt-6 space-y-6">
            <div>
              <p className="section-label mb-3">Größen mit Gradient-Fallback</p>
              <div className="flex items-end gap-4">
                <FluxAvatar name="Anna Müller" size="xs" />
                <FluxAvatar name="Max Schmidt" size="sm" />
                <FluxAvatar name="Lisa Koch" size="md" />
                <FluxAvatar name="Tom Braun" size="lg" />
                <FluxAvatar name="Sara Weber" size="xl" />
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Online-Status</p>
              <div className="flex items-center gap-4">
                <FluxAvatar name="Anna M." size="md" online />
                <FluxAvatar name="Max S." size="md" ring />
                <FluxAvatar name="Lisa K." size="lg" online ring />
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Avatar-Gruppe</p>
              <FluxAvatarGroup
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
          </FluxCardContent>
        </FluxCard>
      </div>
    </div>
  );
};
