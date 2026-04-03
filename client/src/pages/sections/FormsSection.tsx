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
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";

export const FormsSection: React.FC = () => {
  const [showPw, setShowPw] = useState(false);
  const [sliderA, setSliderA] = useState(42);
  const [sliderB, setSliderB] = useState(68);
  const [radioVal, setRadioVal] = useState("standard");

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label mb-2">08 — Forms</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">Formular-Elemente</h2>
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
        <VoltCodeBlock
          language="tsx"
          label="VoltInput · Varianten"
          code={`// Installation: pnpm add lucide-react
// Kopiere VoltInput.tsx in dein Projekt (aus /components/volt/)

import React, { useState } from "react";
import { VoltInput } from "./VoltInput";
import { Mail, Lock, Search, User, Eye, EyeOff } from "lucide-react";

export function InputDemo() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Standard mit Icon und Hinweis */}
      <VoltInput
        label="E-Mail-Adresse"
        placeholder="name@beispiel.de"
        type="email"
        leftElement={<Mail className="w-4 h-4" />}
        hint="Wir teilen deine E-Mail niemals."
      />

      {/* Passwort mit Toggle-Button */}
      <VoltInput
        label="Passwort"
        placeholder="Mindestens 8 Zeichen"
        type={showPw ? "text" : "password"}
        leftElement={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            onClick={() => setShowPw(!showPw)}
            className="hover:text-foreground transition-colors"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />

      {/* Suche (filled-Variante) */}
      <VoltInput
        label="Suche"
        placeholder="Komponenten durchsuchen…"
        leftElement={<Search className="w-4 h-4" />}
        variant="filled"
      />

      {/* Fehlerzustand */}
      <VoltInput
        label="Benutzername"
        placeholder="@username"
        leftElement={<User className="w-4 h-4" />}
        error="Dieser Benutzername ist bereits vergeben."
        defaultValue="john_doe"
      />

      {/* Erfolgszustand */}
      <VoltInput
        label="Verifizierter Name"
        state="success"
        defaultValue="Anna Müller"
        hint="Name erfolgreich verifiziert."
      />

      {/* Deaktiviert */}
      <VoltInput
        label="Deaktiviert"
        placeholder="Nicht bearbeitbar"
        disabled
        defaultValue="Gesperrter Wert"
      />
    </div>
  );
}

// Varianten: default · filled · glass · boxed
// States:    error · success · disabled`}
        />
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
        <VoltCodeBlock
          language="tsx"
          label="VoltTextarea & VoltSelect"
          code={`// Kopiere VoltInput.tsx in dein Projekt (aus /components/volt/)
import { VoltTextarea, VoltSelect } from "./VoltInput";

{/* Mehrzeiliges Textfeld */}
<VoltTextarea
  label="Nachricht"
  placeholder="Schreibe hier deine Nachricht…"
  hint="Maximal 500 Zeichen."
  rows={4}
/>

{/* Fehler-State */}
<VoltTextarea
  label="Kommentar"
  error="Bitte mindestens 10 Zeichen eingeben."
  rows={3}
/>

{/* Select-Dropdown */}
<VoltSelect label="Kategorie" hint="Wähle eine Kategorie aus.">
  <option value="" disabled>Bitte auswählen…</option>
  <option value="design">Design System</option>
  <option value="components">Komponenten</option>
  <option value="tokens">Design Tokens</option>
  <option value="animation">Animation</option>
</VoltSelect>

{/* Select mit Fehler */}
<VoltSelect label="Priorität" error="Bitte eine Priorität wählen.">
  <option value="">Auswählen…</option>
  <option value="low">Niedrig</option>
  <option value="medium">Mittel</option>
  <option value="high">Hoch</option>
</VoltSelect>

// Varianten für beide: default · filled · boxed`}
        />
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

      <VoltCodeBlock
        language="tsx"
        label="VoltToggle & VoltCheckbox"
        code={`// Kopiere VoltToggle.tsx in dein Projekt (aus /components/volt/)
import React, { useState } from "react";
import { VoltToggle, VoltCheckbox, VoltRadioGroup } from "./VoltToggle";

export function ToggleDemo() {
  const [radioVal, setRadioVal] = useState("standard");

  return (
    <div className="space-y-6">
      {/* Toggle-Schalter */}
      <VoltToggle
        label="Benachrichtigungen"
        description="E-Mail-Benachrichtigungen aktivieren"
        variant="default"   // default · primary · positive · negative · neutral
        toggleSize="md"     // sm · md · lg
        defaultChecked
      />
      <VoltToggle label="Dark Mode" variant="primary" />
      <VoltToggle label="Offline-Modus" variant="neutral" disabled />

      {/* Checkboxen */}
      <VoltCheckbox
        label="Nutzungsbedingungen akzeptieren"
        variant="primary"
      />
      <VoltCheckbox
        label="Newsletter abonnieren"
        description="Erhalte Updates zu neuen Komponenten."
        variant="default"
        defaultChecked
      />

      {/* Radio-Gruppe */}
      <VoltRadioGroup
        name="plan"
        value={radioVal}
        onValueChange={setRadioVal}  // (value: string) => void
        variant="default"
        options={[
          { value: "free",     label: "Free",       description: "Für Einzelpersonen" },
          { value: "standard", label: "Standard",   description: "Für kleine Teams" },
          { value: "pro",      label: "Pro",        description: "Für Unternehmen" },
        ]}
      />
    </div>
  );
}`}
      />

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
        <VoltCodeBlock
          language="tsx"
          label="VoltProgress & VoltSlider"
          code={`// Kopiere VoltProgress.tsx in dein Projekt (aus /components/volt/)
import React, { useState } from "react";
import { VoltProgress, VoltSlider } from "./VoltProgress";

export function ProgressDemo() {
  const [volume, setVolume] = useState(42);
  const [brightness, setBrightness] = useState(68);

  return (
    <div className="space-y-6">
      {/* Fortschrittsbalken */}
      <VoltProgress
        value={25}
        variant="default"   // default · lime · negative · positive
        size="sm"           // xs · sm · md · lg · xl
        label="Upload"
        showValue
      />
      <VoltProgress value={60} variant="lime"     size="md" label="Speicher"      showValue />
      <VoltProgress value={85} variant="negative" size="md" label="CPU-Last"      showValue />
      <VoltProgress value={100} variant="positive" size="lg" label="Abgeschlossen" showValue />

      {/* Schieberegler (kontrolliert) */}
      <VoltSlider
        label="Lautstärke"
        showValue
        value={volume}
        onChange={(v) => setVolume(v)}  // (value: number) => void
        variant="default"
        sliderSize="md"                 // sm · md · lg
        min={0}
        max={100}
        step={1}
      />
      <VoltSlider
        label="Helligkeit"
        showValue
        value={brightness}
        onChange={(v) => setBrightness(v)}
        variant="lime"
        sliderSize="lg"
      />
    </div>
  );
}`}
        />
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
