/**
 * CardsSection – Cards, Badges, Alerts, Avatare
 */

import React, { useState } from "react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle, VoltCardDescription, VoltCardFooter } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltAlert } from "@/components/volt/VoltAlert";
import { VoltAvatar, VoltAvatarGroup } from "@/components/volt/VoltAvatar";
import { VoltButton } from "@/components/volt/VoltButton";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export const CardsSection: React.FC = () => {
  const [alerts, setAlerts] = useState({
    info: true, success: true, warning: true, error: true,
  });

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label mb-2">07 — Cards &amp; Surfaces</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">Cards, Badges & Alerts</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Oberflächen-Komponenten mit Glasmorphismus, Volt-Textur und atmosphärischen Schatten.
          Alle Varianten reagieren auf Hover und unterstützen Dark Mode.
        </p>
      </div>

      {/* Card-Varianten */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Card-Varianten</h3>

        {/* Bild-Cards – Unsplash */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fit=crop", label: "Architektur", desc: "Raster-Fassade, monochrom" },
            { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop", label: "Natur", desc: "Wald, Licht & Tiefe" },
            { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop", label: "Technik", desc: "Platine, Präzision" },
          ].map((img, i) => (
            <VoltCard key={i} className="overflow-hidden p-0">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <VoltBadge variant="glass" size="sm">{img.label}</VoltBadge>
                </div>
              </div>
              <VoltCardContent className="pt-3 pb-4">
                <p className="text-sm font-body text-muted-foreground">{img.desc}</p>
              </VoltCardContent>
            </VoltCard>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Default */}
          <VoltCard variant="default">
            <VoltCardHeader>
              <div className="flex items-center justify-between">
                <VoltBadge variant="muted" size="sm">Default</VoltBadge>
                <VoltBadge variant="default" size="sm" dot>Aktiv</VoltBadge>
              </div>
              <VoltCardTitle>Standard Card</VoltCardTitle>
              <VoltCardDescription>
                Mit subtiler Volt-Textur und weichem Schatten. Hover-Effekt inklusive.
              </VoltCardDescription>
            </VoltCardHeader>
            <VoltCardFooter>
              <VoltButton variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Mehr erfahren
              </VoltButton>
            </VoltCardFooter>
          </VoltCard>

          {/* Glass */}
          <div className="bg-volt-texture-hero rounded-2xl p-0.5">
            <VoltCard variant="glass" className="h-full">
              <VoltCardHeader>
                <div className="flex items-center justify-between">
                  <VoltBadge variant="glass" size="sm">Glass</VoltBadge>
                  <Sparkles className="w-4 h-4 text-foreground" />
                </div>
                <VoltCardTitle>Glass Card</VoltCardTitle>
                <VoltCardDescription>
                  Backdrop-Blur mit Glasmorphismus-Effekt. Ideal für Hero-Bereiche.
                </VoltCardDescription>
              </VoltCardHeader>
              <VoltCardFooter>
                <VoltButton variant="outline" size="sm">Entdecken</VoltButton>
              </VoltCardFooter>
            </VoltCard>
          </div>

          {/* Gradient */}
          <VoltCard variant="gradient">
            <VoltCardHeader>
              <div className="flex items-center justify-between">
                <VoltBadge variant="glass" size="sm">Gradient</VoltBadge>
                <TrendingUp className="w-4 h-4 text-foreground" />
              </div>
              <VoltCardTitle className="text-foreground">Lime Card</VoltCardTitle>
              <VoltCardDescription className="text-[#000000]/70">
                Neon-Yellow mit Volt-Textur. Für hervorgehobene Inhalte.
              </VoltCardDescription>
            </VoltCardHeader>
            <VoltCardFooter>
              <VoltButton variant="solid" size="sm">
                Jetzt starten
              </VoltButton>
            </VoltCardFooter>
          </VoltCard>

          {/* Elevated */}
          <VoltCard variant="elevated">
            <VoltCardHeader>
              <VoltBadge variant="muted" size="sm">Elevated</VoltBadge>
              <VoltCardTitle>Elevated Card</VoltCardTitle>
              <VoltCardDescription>
                Stärkerer Schatten für visuelle Hierarchie und Tiefe.
              </VoltCardDescription>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="flex items-center gap-3">
                <VoltAvatar name="Anna Müller" size="md" online />
                <div>
                  <p className="text-sm font-ui font-semibold font-body">Anna Müller</p>
                  <p className="text-xs text-muted-foreground font-body">Design Lead</p>
                </div>
              </div>
            </VoltCardContent>
          </VoltCard>

          {/* Outlined */}
          <VoltCard variant="outlined">
            <VoltCardHeader>
                <VoltBadge variant="muted" size="sm">Outlined</VoltBadge>
              <VoltCardTitle>Outlined Card</VoltCardTitle>
              <VoltCardDescription>
                Transparenter Hintergrund mit farbigem Rahmen. Für sekundäre Inhalte.
              </VoltCardDescription>
            </VoltCardHeader>
            <VoltCardFooter>
              <VoltButton variant="primary" size="sm">Auswählen</VoltButton>
            </VoltCardFooter>
          </VoltCard>

          {/* Subtle */}
          <VoltCard variant="subtle">
            <VoltCardHeader>
              <VoltBadge variant="muted" size="sm">Subtle</VoltBadge>
              <VoltCardTitle>Subtle Card</VoltCardTitle>
              <VoltCardDescription>
                Sehr zurückhaltend mit atmosphärischem Gradient-Hintergrund.
              </VoltCardDescription>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                Sehr zurückhaltend, für sekundäre Flächen
              </div>
            </VoltCardContent>
          </VoltCard>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Badge-Varianten</h3>
        <VoltCard>
          <VoltCardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="section-label mb-3">Farb-Varianten</p>
                <div className="flex flex-wrap gap-2">
                  <VoltBadge variant="default">Lime</VoltBadge>
                  <VoltBadge variant="solid">Solid</VoltBadge>
                  <VoltBadge variant="outline">Outline</VoltBadge>
                  <VoltBadge variant="muted">Muted</VoltBadge>
                  <VoltBadge variant="glass">Glass</VoltBadge>
                  <VoltBadge variant="positive">Positiv</VoltBadge>
                  <VoltBadge variant="negative">Negativ</VoltBadge>
                  <VoltBadge variant="neutral">Neutral</VoltBadge>
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Größen</p>
                <div className="flex flex-wrap items-center gap-2">
                  <VoltBadge variant="default" size="sm">Small</VoltBadge>
                  <VoltBadge variant="default" size="md">Medium</VoltBadge>
                  <VoltBadge variant="default" size="lg">Large</VoltBadge>
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Mit Status-Punkt</p>
                <div className="flex flex-wrap gap-2">
                  <VoltBadge variant="positive" dot dotColor="#1A9E5A">Online</VoltBadge>
                  <VoltBadge variant="neutral" dot dotColor="#E8B800">Beschäftigt</VoltBadge>
                  <VoltBadge variant="muted" dot dotColor="#6B6B6B">Abwesend</VoltBadge>
                  <VoltBadge variant="default" dot>Neu</VoltBadge>
                </div>
              </div>
            </div>
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="font-display font-bold text-xl text-foreground mb-4">Alert-Varianten</h3>
        <div className="space-y-3">
          {alerts.info && (
            <VoltAlert
              variant="info"
              title="Information"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, info: false }))}
            >
              Das Volt UI Design System ist vollständig in CSS und React implementiert – keine externen Bild-Assets.
            </VoltAlert>
          )}
          {alerts.success && (
            <VoltAlert
              variant="success"
              title="Erfolgreich gespeichert"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, success: false }))}
            >
              Alle Änderungen wurden erfolgreich gespeichert und sind sofort aktiv.
            </VoltAlert>
          )}
          {alerts.warning && (
            <VoltAlert
              variant="warning"
              title="Achtung"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, warning: false }))}
            >
              Diese Aktion kann nicht rückgängig gemacht werden. Bitte überprüfe deine Eingaben.
            </VoltAlert>
          )}
          {alerts.error && (
            <VoltAlert
              variant="error"
              title="Fehler aufgetreten"
              dismissible
              onDismiss={() => setAlerts(a => ({ ...a, error: false }))}
            >
              Die Verbindung zum Server konnte nicht hergestellt werden. Bitte versuche es erneut.
            </VoltAlert>
          )}
          {!Object.values(alerts).some(Boolean) && (
            <div className="text-center py-8 text-muted-foreground font-body text-sm">
              Alle Alerts wurden geschlossen.{" "}
              <button
                className="text-foreground font-ui font-semibold hover:underline underline-offset-2"
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
        <VoltCard>
          <VoltCardContent className="pt-6 space-y-6">
            <div>
              <p className="section-label mb-3">Mit Foto (Unsplash)</p>
              <div className="flex items-end gap-4">
                <VoltAvatar name="Anna Müller" size="xs" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face" />
                <VoltAvatar name="Max Schmidt" size="sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face" />
                <VoltAvatar name="Lisa Koch" size="md" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face" />
                <VoltAvatar name="Tom Braun" size="lg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face" />
                <VoltAvatar name="Sara Weber" size="xl" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80&fit=crop&crop=face" />
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Gradient-Fallback (kein Foto)</p>
              <div className="flex items-end gap-4">
                <VoltAvatar name="Anna Müller" size="xs" />
                <VoltAvatar name="Max Schmidt" size="sm" />
                <VoltAvatar name="Lisa Koch" size="md" />
                <VoltAvatar name="Tom Braun" size="lg" />
                <VoltAvatar name="Sara Weber" size="xl" />
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Online-Status</p>
              <div className="flex items-center gap-4">
                <VoltAvatar name="Anna M." size="md" online src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face" />
                <VoltAvatar name="Max S." size="md" ring src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face" />
                <VoltAvatar name="Lisa K." size="lg" online ring src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face" />
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Avatar-Gruppe</p>
              <VoltAvatarGroup
                avatars={[
                  { name: "Anna Müller", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face" },
                  { name: "Max Schmidt", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face" },
                  { name: "Lisa Koch",   src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face" },
                  { name: "Tom Braun",   src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face" },
                  { name: "Sara Weber",  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80&fit=crop&crop=face" },
                  { name: "Jan Fischer" },
                ]}
                max={5}
                size="md"
              />
            </div>
          </VoltCardContent>
        </VoltCard>
      </div>
    </div>
  );
};
