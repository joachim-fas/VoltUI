/**
 * FormsSection – Inputs, Textareas, Selects, Toggles, Checkboxen, Radios, Slider
 */

import React, { useState } from "react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle, GrainCardDescription } from "@/components/grain/GrainCard";
import { GrainInput, GrainTextarea, GrainSelect } from "@/components/grain/GrainInput";
import { GrainToggle, GrainCheckbox, GrainRadioGroup } from "@/components/grain/GrainToggle";
import { GrainProgress, GrainSlider } from "@/components/grain/GrainProgress";
import { GrainButton } from "@/components/grain/GrainButton";
import { Mail, Lock, Search, User, Eye, EyeOff } from "lucide-react";

export const FormsSection: React.FC = () => {
  const [showPw, setShowPw] = useState(false);
  const [sliderA, setSliderA] = useState(42);
  const [sliderB, setSliderB] = useState(68);
  const [radioVal, setRadioVal] = useState("standard");

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label mb-2">04 — Forms</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Formular-Elemente</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Alle Formular-Komponenten mit atmosphärischen Fokus-Effekten, Validierungszuständen
          und vollständiger Zugänglichkeit. Kein externes Formular-Framework notwendig.
        </p>
      </div>

      {/* Inputs */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Text-Eingaben</GrainCardTitle>
          <GrainCardDescription>default · filled · glass · error · success</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GrainInput
              label="E-Mail-Adresse"
              placeholder="name@beispiel.de"
              type="email"
              leftElement={<Mail className="w-4 h-4" />}
              hint="Wir teilen deine E-Mail niemals."
            />
            <GrainInput
              label="Passwort"
              placeholder="Mindestens 8 Zeichen"
              type={showPw ? "text" : "password"}
              leftElement={<Lock className="w-4 h-4" />}
              rightElement={
                <button onClick={() => setShowPw(!showPw)} className="hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            <GrainInput
              label="Suche"
              placeholder="Komponenten durchsuchen…"
              leftElement={<Search className="w-4 h-4" />}
              variant="filled"
            />
            <GrainInput
              label="Benutzername"
              placeholder="@username"
              leftElement={<User className="w-4 h-4" />}
              error="Dieser Benutzername ist bereits vergeben."
              defaultValue="john_doe"
            />
            <GrainInput
              label="Verifizierter Name"
              placeholder="Vollständiger Name"
              state="success"
              defaultValue="Anna Müller"
              hint="Name erfolgreich verifiziert."
            />
            <GrainInput
              label="Deaktiviert"
              placeholder="Nicht bearbeitbar"
              disabled
              defaultValue="Gesperrter Wert"
            />
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Textarea & Select */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Textarea & Select</GrainCardTitle>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GrainTextarea
              label="Nachricht"
              placeholder="Schreibe hier deine Nachricht…"
              hint="Maximal 500 Zeichen."
              rows={4}
            />
            <div className="flex flex-col gap-5">
              <GrainSelect label="Kategorie" hint="Wähle eine Kategorie aus.">
                <option value="" disabled>Bitte auswählen…</option>
                <option value="design">Design System</option>
                <option value="components">Komponenten</option>
                <option value="tokens">Design Tokens</option>
                <option value="animation">Animation</option>
              </GrainSelect>
              <GrainSelect label="Priorität">
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
                <option value="critical">Kritisch</option>
              </GrainSelect>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Toggles & Checkboxen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GrainCard>
          <GrainCardHeader>
            <GrainCardTitle>Toggle-Schalter</GrainCardTitle>
            <GrainCardDescription>default · primary · positive · negative · neutral · sm · md · lg</GrainCardDescription>
          </GrainCardHeader>
          <GrainCardContent>
            <div className="space-y-4">
              <GrainToggle
                label="Benachrichtigungen"
                description="E-Mail-Benachrichtigungen aktivieren"
                variant="default"
                defaultChecked
              />
              <GrainToggle
                label="Lime / Primary"
                description="Hauptfarbe als aktiver Zustand"
                variant="primary"
                defaultChecked
              />
              <GrainToggle
                label="Positiv"
                description="Bestätigt, aktiv, erfolgreich"
                variant="positive"
                defaultChecked
              />
              <GrainToggle
                label="Negativ"
                description="Gesperrt, Fehler, Warnung"
                variant="negative"
              />
              <GrainToggle
                label="Neutral"
                description="Inaktiv, sekundär"
                variant="neutral"
                defaultChecked
              />
              <GrainToggle
                label="Deaktiviert"
                description="Diese Option ist nicht verfügbar"
                disabled
                defaultChecked
              />
              <div className="pt-2 border-t border-[#F0F0F0]">
                <p className="text-xs font-mono text-[#AAAAAA] uppercase tracking-widest mb-3">Größen: sm · md · lg</p>
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center gap-1.5">
                    <GrainToggle variant="default" toggleSize="sm" defaultChecked />
                    <span className="text-[10px] font-mono text-[#AAAAAA]">sm</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <GrainToggle variant="default" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-[#AAAAAA]">md</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <GrainToggle variant="default" toggleSize="lg" defaultChecked />
                    <span className="text-[10px] font-mono text-[#AAAAAA]">lg</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <GrainToggle variant="primary" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-[#AAAAAA]">lime</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <GrainToggle variant="positive" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-[#AAAAAA]">pos</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <GrainToggle variant="negative" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-[#AAAAAA]">neg</span>
                  </div>
                </div>
              </div>
            </div>
          </GrainCardContent>
        </GrainCard>

        <GrainCard>
          <GrainCardHeader>
            <GrainCardTitle>Checkboxen & Radio</GrainCardTitle>
          </GrainCardHeader>
          <GrainCardContent>
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="section-label">Checkboxen</p>
                <GrainCheckbox label="Design Tokens exportieren" variant="default" defaultChecked />
                <GrainCheckbox label="Dark Mode aktivieren" variant="primary" />
                <GrainCheckbox label="Teilweise ausgewählt" variant="default" indeterminate />
                <GrainCheckbox
                  label="Nutzungsbedingungen akzeptieren"
                  description="Ich stimme den AGB und der Datenschutzerklärung zu."
                  variant="primary"
                />
              </div>
              <div className="space-y-3 pt-2">
                <p className="section-label">Radio-Gruppe</p>
                <GrainRadioGroup
                  name="plan"
                  value={radioVal}
                  onValueChange={setRadioVal}
                  variant="default"
                  options={[
                    { value: "free",     label: "Free",     description: "Für Einzelpersonen" },
                    { value: "standard", label: "Standard", description: "Für kleine Teams" },
                    { value: "pro",      label: "Pro",      description: "Für Unternehmen" },
                  ]}
                />
              </div>
            </div>
          </GrainCardContent>
        </GrainCard>
      </div>

      {/* Progress & Slider */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Progress & Slider</GrainCardTitle>
          <GrainCardDescription>Fortschrittsbalken und interaktive Schieberegler</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="section-label">Fortschrittsbalken</p>
              <GrainProgress value={25}  variant="default"   size="sm" label="Upload"   showValue />
              <GrainProgress value={60}  variant="lime"      size="md" label="Speicher"  showValue />
              <GrainProgress value={85}  variant="negative"  size="md" label="CPU-Last"  showValue />
              <GrainProgress value={100} variant="positive" size="lg" label="Abgeschlossen" showValue />
            </div>
            <div className="space-y-4 pt-2">
              <p className="section-label">Schieberegler</p>
              <GrainSlider
                label="Lautstärke"
                showValue
                value={sliderA}
                onChange={(v) => setSliderA(v)}
                variant="default"
              />
              <GrainSlider
                label="Helligkeit"
                showValue
                value={sliderB}
                onChange={(v) => setSliderB(v)}
                variant="lime"
                sliderSize="lg"
              />
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Vollständiges Formular-Beispiel */}
      <GrainCard variant="elevated">
        <GrainCardHeader>
          <GrainCardTitle>Vollständiges Formular-Beispiel</GrainCardTitle>
          <GrainCardDescription>Registrierungsformular mit allen Elementen</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GrainInput label="Vorname" placeholder="Max" leftElement={<User className="w-4 h-4" />} />
              <GrainInput label="Nachname" placeholder="Mustermann" />
            </div>
            <GrainInput
              label="E-Mail"
              type="email"
              placeholder="max@beispiel.de"
              leftElement={<Mail className="w-4 h-4" />}
            />
            <GrainInput
              label="Passwort"
              type="password"
              placeholder="Sicheres Passwort wählen"
              leftElement={<Lock className="w-4 h-4" />}
            />
            <GrainSelect label="Rolle">
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="manager">Manager</option>
            </GrainSelect>
            <GrainTextarea label="Über mich" placeholder="Kurze Beschreibung…" rows={3} />
            <GrainToggle
              label="Newsletter abonnieren"
              description="Erhalte Updates zu neuen Komponenten."
              variant="default"
              defaultChecked
            />
            <GrainCheckbox
              label="Ich akzeptiere die Nutzungsbedingungen"
              variant="default"
            />
            <div className="flex gap-3 pt-2">
              <GrainButton variant="solid" type="submit" className="flex-1">
                Registrieren
              </GrainButton>
              <GrainButton variant="outline" type="reset">
                Zurücksetzen
              </GrainButton>
            </div>
          </form>
        </GrainCardContent>
      </GrainCard>
    </div>
  );
};
