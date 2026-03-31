/**
 * FormsSection – Inputs, Textareas, Selects, Toggles, Checkboxen, Radios, Slider
 */

import React, { useState } from "react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle, VoltCardDescription } from "@/components/volt/VoltCard";
import { VoltInput, VoltTextarea, VoltSelect } from "@/components/volt/VoltInput";
import { VoltToggle, VoltCheckbox, VoltRadioGroup } from "@/components/volt/VoltToggle";
import { VoltProgress, VoltSlider } from "@/components/volt/VoltProgress";
import { VoltButton } from "@/components/volt/VoltButton";
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
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Text-Eingaben</VoltCardTitle>
          <VoltCardDescription>default · filled · glass · error · success</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <VoltInput
              label="E-Mail-Adresse"
              placeholder="name@beispiel.de"
              type="email"
              leftElement={<Mail className="w-4 h-4" />}
              hint="Wir teilen deine E-Mail niemals."
            />
            <VoltInput
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
            <VoltInput
              label="Suche"
              placeholder="Komponenten durchsuchen…"
              leftElement={<Search className="w-4 h-4" />}
              variant="filled"
            />
            <VoltInput
              label="Benutzername"
              placeholder="@username"
              leftElement={<User className="w-4 h-4" />}
              error="Dieser Benutzername ist bereits vergeben."
              defaultValue="john_doe"
            />
            <VoltInput
              label="Verifizierter Name"
              placeholder="Vollständiger Name"
              state="success"
              defaultValue="Anna Müller"
              hint="Name erfolgreich verifiziert."
            />
            <VoltInput
              label="Deaktiviert"
              placeholder="Nicht bearbeitbar"
              disabled
              defaultValue="Gesperrter Wert"
            />
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Textarea & Select */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Textarea & Select</VoltCardTitle>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <VoltTextarea
              label="Nachricht"
              placeholder="Schreibe hier deine Nachricht…"
              hint="Maximal 500 Zeichen."
              rows={4}
            />
            <div className="flex flex-col gap-5">
              <VoltSelect label="Kategorie" hint="Wähle eine Kategorie aus.">
                <option value="" disabled>Bitte auswählen…</option>
                <option value="design">Design System</option>
                <option value="components">Komponenten</option>
                <option value="tokens">Design Tokens</option>
                <option value="animation">Animation</option>
              </VoltSelect>
              <VoltSelect label="Priorität">
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
                <option value="critical">Kritisch</option>
              </VoltSelect>
            </div>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Toggles & Checkboxen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>Toggle-Schalter</VoltCardTitle>
            <VoltCardDescription>default · primary · positive · negative · neutral · sm · md · lg</VoltCardDescription>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="space-y-4">
              <VoltToggle
                label="Benachrichtigungen"
                description="E-Mail-Benachrichtigungen aktivieren"
                variant="default"
                defaultChecked
              />
              <VoltToggle
                label="Lime / Primary"
                description="Hauptfarbe als aktiver Zustand"
                variant="primary"
                defaultChecked
              />
              <VoltToggle
                label="Positiv"
                description="Bestätigt, aktiv, erfolgreich"
                variant="positive"
                defaultChecked
              />
              <VoltToggle
                label="Negativ"
                description="Gesperrt, Fehler, Warnung"
                variant="negative"
              />
              <VoltToggle
                label="Neutral"
                description="Inaktiv, sekundär"
                variant="neutral"
                defaultChecked
              />
              <VoltToggle
                label="Deaktiviert"
                description="Diese Option ist nicht verfügbar"
                disabled
                defaultChecked
              />
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Größen: sm · md · lg</p>
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center gap-1.5">
                    <VoltToggle variant="default" toggleSize="sm" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">sm</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <VoltToggle variant="default" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">md</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <VoltToggle variant="default" toggleSize="lg" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">lg</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <VoltToggle variant="primary" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">lime</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <VoltToggle variant="positive" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">pos</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <VoltToggle variant="negative" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">neg</span>
                  </div>
                </div>
              </div>
            </div>
          </VoltCardContent>
        </VoltCard>

        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>Checkboxen & Radio</VoltCardTitle>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="section-label">Checkboxen</p>
                <VoltCheckbox label="Design Tokens exportieren" variant="default" defaultChecked />
                <VoltCheckbox label="Dark Mode aktivieren" variant="primary" />
                <VoltCheckbox label="Teilweise ausgewählt" variant="default" indeterminate />
                <VoltCheckbox
                  label="Nutzungsbedingungen akzeptieren"
                  description="Ich stimme den AGB und der Datenschutzerklärung zu."
                  variant="primary"
                />
              </div>
              <div className="space-y-3 pt-2">
                <p className="section-label">Radio-Gruppe</p>
                <VoltRadioGroup
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
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* Progress & Slider */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Progress & Slider</VoltCardTitle>
          <VoltCardDescription>Fortschrittsbalken und interaktive Schieberegler</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="section-label">Fortschrittsbalken</p>
              <VoltProgress value={25}  variant="default"   size="sm" label="Upload"   showValue />
              <VoltProgress value={60}  variant="lime"      size="md" label="Speicher"  showValue />
              <VoltProgress value={85}  variant="negative"  size="md" label="CPU-Last"  showValue />
              <VoltProgress value={100} variant="positive" size="lg" label="Abgeschlossen" showValue />
            </div>
            <div className="space-y-4 pt-2">
              <p className="section-label">Schieberegler</p>
              <VoltSlider
                label="Lautstärke"
                showValue
                value={sliderA}
                onChange={(v) => setSliderA(v)}
                variant="default"
              />
              <VoltSlider
                label="Helligkeit"
                showValue
                value={sliderB}
                onChange={(v) => setSliderB(v)}
                variant="lime"
                sliderSize="lg"
              />
            </div>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Vollständiges Formular-Beispiel */}
      <VoltCard variant="elevated">
        <VoltCardHeader>
          <VoltCardTitle>Vollständiges Formular-Beispiel</VoltCardTitle>
          <VoltCardDescription>Registrierungsformular mit allen Elementen</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <VoltInput label="Vorname" placeholder="Max" leftElement={<User className="w-4 h-4" />} />
              <VoltInput label="Nachname" placeholder="Mustermann" />
            </div>
            <VoltInput
              label="E-Mail"
              type="email"
              placeholder="max@beispiel.de"
              leftElement={<Mail className="w-4 h-4" />}
            />
            <VoltInput
              label="Passwort"
              type="password"
              placeholder="Sicheres Passwort wählen"
              leftElement={<Lock className="w-4 h-4" />}
            />
            <VoltSelect label="Rolle">
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="manager">Manager</option>
            </VoltSelect>
            <VoltTextarea label="Über mich" placeholder="Kurze Beschreibung…" rows={3} />
            <VoltToggle
              label="Newsletter abonnieren"
              description="Erhalte Updates zu neuen Komponenten."
              variant="default"
              defaultChecked
            />
            <VoltCheckbox
              label="Ich akzeptiere die Nutzungsbedingungen"
              variant="default"
            />
            <div className="flex gap-3 pt-2">
              <VoltButton variant="primary" type="submit" className="flex-1">
                Registrieren
              </VoltButton>
              <VoltButton variant="outline" type="reset">
                Zurücksetzen
              </VoltButton>
            </div>
          </form>
        </VoltCardContent>
      </VoltCard>
    </div>
  );
};
