/**
 * FormsSection – Inputs, Textareas, Selects, Toggles, Checkboxen, Radios, Slider
 */

import React, { useState } from "react";
import { FluxCard, FluxCardContent, FluxCardHeader, FluxCardTitle, FluxCardDescription } from "@/components/grain/FluxCard";
import { FluxInput, FluxTextarea, FluxSelect } from "@/components/grain/FluxInput";
import { FluxToggle, FluxCheckbox, FluxRadioGroup } from "@/components/grain/FluxToggle";
import { FluxProgress, FluxSlider } from "@/components/grain/FluxProgress";
import { FluxButton } from "@/components/grain/FluxButton";
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
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Text-Eingaben</FluxCardTitle>
          <FluxCardDescription>default · filled · glass · error · success</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FluxInput
              label="E-Mail-Adresse"
              placeholder="name@beispiel.de"
              type="email"
              leftElement={<Mail className="w-4 h-4" />}
              hint="Wir teilen deine E-Mail niemals."
            />
            <FluxInput
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
            <FluxInput
              label="Suche"
              placeholder="Komponenten durchsuchen…"
              leftElement={<Search className="w-4 h-4" />}
              variant="filled"
            />
            <FluxInput
              label="Benutzername"
              placeholder="@username"
              leftElement={<User className="w-4 h-4" />}
              error="Dieser Benutzername ist bereits vergeben."
              defaultValue="john_doe"
            />
            <FluxInput
              label="Verifizierter Name"
              placeholder="Vollständiger Name"
              state="success"
              defaultValue="Anna Müller"
              hint="Name erfolgreich verifiziert."
            />
            <FluxInput
              label="Deaktiviert"
              placeholder="Nicht bearbeitbar"
              disabled
              defaultValue="Gesperrter Wert"
            />
          </div>
        </FluxCardContent>
      </FluxCard>

      {/* Textarea & Select */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Textarea & Select</FluxCardTitle>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FluxTextarea
              label="Nachricht"
              placeholder="Schreibe hier deine Nachricht…"
              hint="Maximal 500 Zeichen."
              rows={4}
            />
            <div className="flex flex-col gap-5">
              <FluxSelect label="Kategorie" hint="Wähle eine Kategorie aus.">
                <option value="" disabled>Bitte auswählen…</option>
                <option value="design">Design System</option>
                <option value="components">Komponenten</option>
                <option value="tokens">Design Tokens</option>
                <option value="animation">Animation</option>
              </FluxSelect>
              <FluxSelect label="Priorität">
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
                <option value="critical">Kritisch</option>
              </FluxSelect>
            </div>
          </div>
        </FluxCardContent>
      </FluxCard>

      {/* Toggles & Checkboxen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FluxCard>
          <FluxCardHeader>
            <FluxCardTitle>Toggle-Schalter</FluxCardTitle>
            <FluxCardDescription>default · primary · positive · negative · neutral · sm · md · lg</FluxCardDescription>
          </FluxCardHeader>
          <FluxCardContent>
            <div className="space-y-4">
              <FluxToggle
                label="Benachrichtigungen"
                description="E-Mail-Benachrichtigungen aktivieren"
                variant="default"
                defaultChecked
              />
              <FluxToggle
                label="Lime / Primary"
                description="Hauptfarbe als aktiver Zustand"
                variant="primary"
                defaultChecked
              />
              <FluxToggle
                label="Positiv"
                description="Bestätigt, aktiv, erfolgreich"
                variant="positive"
                defaultChecked
              />
              <FluxToggle
                label="Negativ"
                description="Gesperrt, Fehler, Warnung"
                variant="negative"
              />
              <FluxToggle
                label="Neutral"
                description="Inaktiv, sekundär"
                variant="neutral"
                defaultChecked
              />
              <FluxToggle
                label="Deaktiviert"
                description="Diese Option ist nicht verfügbar"
                disabled
                defaultChecked
              />
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Größen: sm · md · lg</p>
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center gap-1.5">
                    <FluxToggle variant="default" toggleSize="sm" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">sm</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <FluxToggle variant="default" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">md</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <FluxToggle variant="default" toggleSize="lg" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">lg</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <FluxToggle variant="primary" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">lime</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <FluxToggle variant="positive" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">pos</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <FluxToggle variant="negative" toggleSize="md" defaultChecked />
                    <span className="text-[10px] font-mono text-muted-foreground">neg</span>
                  </div>
                </div>
              </div>
            </div>
          </FluxCardContent>
        </FluxCard>

        <FluxCard>
          <FluxCardHeader>
            <FluxCardTitle>Checkboxen & Radio</FluxCardTitle>
          </FluxCardHeader>
          <FluxCardContent>
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="section-label">Checkboxen</p>
                <FluxCheckbox label="Design Tokens exportieren" variant="default" defaultChecked />
                <FluxCheckbox label="Dark Mode aktivieren" variant="primary" />
                <FluxCheckbox label="Teilweise ausgewählt" variant="default" indeterminate />
                <FluxCheckbox
                  label="Nutzungsbedingungen akzeptieren"
                  description="Ich stimme den AGB und der Datenschutzerklärung zu."
                  variant="primary"
                />
              </div>
              <div className="space-y-3 pt-2">
                <p className="section-label">Radio-Gruppe</p>
                <FluxRadioGroup
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
          </FluxCardContent>
        </FluxCard>
      </div>

      {/* Progress & Slider */}
      <FluxCard>
        <FluxCardHeader>
          <FluxCardTitle>Progress & Slider</FluxCardTitle>
          <FluxCardDescription>Fortschrittsbalken und interaktive Schieberegler</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="section-label">Fortschrittsbalken</p>
              <FluxProgress value={25}  variant="default"   size="sm" label="Upload"   showValue />
              <FluxProgress value={60}  variant="lime"      size="md" label="Speicher"  showValue />
              <FluxProgress value={85}  variant="negative"  size="md" label="CPU-Last"  showValue />
              <FluxProgress value={100} variant="positive" size="lg" label="Abgeschlossen" showValue />
            </div>
            <div className="space-y-4 pt-2">
              <p className="section-label">Schieberegler</p>
              <FluxSlider
                label="Lautstärke"
                showValue
                value={sliderA}
                onChange={(v) => setSliderA(v)}
                variant="default"
              />
              <FluxSlider
                label="Helligkeit"
                showValue
                value={sliderB}
                onChange={(v) => setSliderB(v)}
                variant="lime"
                sliderSize="lg"
              />
            </div>
          </div>
        </FluxCardContent>
      </FluxCard>

      {/* Vollständiges Formular-Beispiel */}
      <FluxCard variant="elevated">
        <FluxCardHeader>
          <FluxCardTitle>Vollständiges Formular-Beispiel</FluxCardTitle>
          <FluxCardDescription>Registrierungsformular mit allen Elementen</FluxCardDescription>
        </FluxCardHeader>
        <FluxCardContent>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FluxInput label="Vorname" placeholder="Max" leftElement={<User className="w-4 h-4" />} />
              <FluxInput label="Nachname" placeholder="Mustermann" />
            </div>
            <FluxInput
              label="E-Mail"
              type="email"
              placeholder="max@beispiel.de"
              leftElement={<Mail className="w-4 h-4" />}
            />
            <FluxInput
              label="Passwort"
              type="password"
              placeholder="Sicheres Passwort wählen"
              leftElement={<Lock className="w-4 h-4" />}
            />
            <FluxSelect label="Rolle">
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="manager">Manager</option>
            </FluxSelect>
            <FluxTextarea label="Über mich" placeholder="Kurze Beschreibung…" rows={3} />
            <FluxToggle
              label="Newsletter abonnieren"
              description="Erhalte Updates zu neuen Komponenten."
              variant="default"
              defaultChecked
            />
            <FluxCheckbox
              label="Ich akzeptiere die Nutzungsbedingungen"
              variant="default"
            />
            <div className="flex gap-3 pt-2">
              <FluxButton variant="primary" type="submit" className="flex-1">
                Registrieren
              </FluxButton>
              <FluxButton variant="outline" type="reset">
                Zurücksetzen
              </FluxButton>
            </div>
          </form>
        </FluxCardContent>
      </FluxCard>
    </div>
  );
};
