/**
 * Volt UI – Onboarding Flow Template
 * Route: /showcase/onboarding
 * Zeigt: Mehrstufiger Setup-Wizard mit Fortschrittsanzeige
 * Komponenten: VoltProgress, VoltInput, VoltButton, VoltBadge, VoltCard, VoltToggle, VoltAlert
 */

import React, { useState } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltInput, VoltSelect } from "@/components/volt/VoltInput";
import { VoltProgress } from "@/components/volt/VoltProgress";
import { VoltToggle } from "@/components/volt/VoltToggle";
import {
  Check, ChevronRight, ChevronLeft, Terminal, User, Building2,
  Palette, Bell, Rocket, Sparkles, Globe, Github, Slack,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Schritt-Definitionen ── */
const STEPS = [
  { id: 1, label: "Willkommen",  icon: <Sparkles className="w-4 h-4" /> },
  { id: 2, label: "Profil",      icon: <User className="w-4 h-4" /> },
  { id: 3, label: "Workspace",   icon: <Building2 className="w-4 h-4" /> },
  { id: 4, label: "Integrationen", icon: <Globe className="w-4 h-4" /> },
  { id: 5, label: "Fertig",      icon: <Rocket className="w-4 h-4" /> },
];

/* ── Schritt 1: Willkommen ── */
function StepWelcome() {
  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6">
        <Terminal className="w-10 h-10 text-primary" />
      </div>
      <h2 className="font-display font-bold text-3xl tracking-tight mb-3">
        Willkommen bei Volt UI
      </h2>
      <p className="text-muted-foreground text-base max-w-sm mx-auto leading-relaxed mb-8">
        Wir richten deinen Workspace in wenigen Schritten ein. Das dauert nur 2 Minuten.
      </p>
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
        {[
          { icon: "⚡", label: "Schnell" },
          { icon: "🎨", label: "Anpassbar" },
          { icon: "🔒", label: "Sicher" },
        ].map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted">
            <span className="text-2xl">{f.icon}</span>
            <span className="text-xs font-semibold text-muted-foreground">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Schritt 2: Profil ── */
function StepProfile() {
  return (
    <div>
      <h2 className="font-display font-bold text-2xl tracking-tight mb-1">Dein Profil</h2>
      <p className="text-muted-foreground text-sm mb-6">Wie sollen andere dich sehen?</p>

      {/* Avatar-Auswahl */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-muted">
        <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl flex-shrink-0">
          JF
        </div>
        <div>
          <p className="text-sm font-semibold mb-1">Profilbild</p>
          <div className="flex gap-2">
            <VoltButton size="sm" variant="outline">Hochladen</VoltButton>
            <VoltButton size="sm" variant="ghost">Avatar generieren</VoltButton>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <VoltInput label="Vorname" placeholder="Max" variant="boxed" />
          <VoltInput label="Nachname" placeholder="Mustermann" variant="boxed" />
        </div>
        <VoltInput label="Anzeigename" placeholder="max.mustermann" variant="boxed"
          leftElement={<span className="text-xs text-muted-foreground">@</span>}
          hint="Dein öffentlicher Benutzername" />
        <VoltInput label="Berufsbezeichnung" placeholder="Product Designer" variant="boxed" />
        <VoltSelect label="Branche" variant="boxed">
          <option value="">Bitte wählen …</option>
          <option value="tech">Technologie</option>
          <option value="design">Design & Kreativ</option>
          <option value="finance">Finanzen</option>
          <option value="health">Gesundheit</option>
          <option value="other">Sonstiges</option>
        </VoltSelect>
      </div>
    </div>
  );
}

/* ── Schritt 3: Workspace ── */
function StepWorkspace() {
  const [teamSize, setTeamSize] = useState("solo");

  return (
    <div>
      <h2 className="font-display font-bold text-2xl tracking-tight mb-1">Workspace einrichten</h2>
      <p className="text-muted-foreground text-sm mb-6">Konfiguriere deinen Arbeitsbereich.</p>

      <div className="space-y-4">
        <VoltInput label="Workspace-Name" placeholder="Mein Unternehmen" variant="boxed" />
        <VoltInput label="Workspace-URL" placeholder="mein-unternehmen" variant="boxed"
          leftElement={<span className="text-xs text-muted-foreground">volt.io/</span>} />

        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">Teamgröße</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { value: "solo",   label: "Solo",     sub: "Nur ich" },
              { value: "small",  label: "Klein",    sub: "2–10" },
              { value: "medium", label: "Mittel",   sub: "11–50" },
              { value: "large",  label: "Groß",     sub: "50+" },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setTeamSize(t.value)}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-xl border transition-all",
                  teamSize === t.value
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/30"
                )}
              >
                <span className="text-sm font-bold">{t.label}</span>
                <span className="text-xs text-muted-foreground">{t.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <VoltSelect label="Primäre Nutzung" variant="boxed">
          <option value="">Bitte wählen …</option>
          <option value="design">Design-System</option>
          <option value="dev">Frontend-Entwicklung</option>
          <option value="product">Produktmanagement</option>
          <option value="marketing">Marketing</option>
        </VoltSelect>
      </div>
    </div>
  );
}

/* ── Schritt 4: Integrationen ── */
function StepIntegrations() {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    github: false, slack: false, figma: false,
  });

  const integrations = [
    { id: "github", icon: <Github className="w-5 h-5" />, name: "GitHub", desc: "Code-Repository verbinden" },
    { id: "slack",  icon: <Slack  className="w-5 h-5" />, name: "Slack",  desc: "Team-Benachrichtigungen" },
    { id: "figma",  icon: <Palette className="w-5 h-5" />, name: "Figma",  desc: "Design-Dateien importieren" },
  ];

  return (
    <div>
      <h2 className="font-display font-bold text-2xl tracking-tight mb-1">Integrationen</h2>
      <p className="text-muted-foreground text-sm mb-6">Verbinde deine bestehenden Tools. Du kannst das auch später tun.</p>

      <div className="space-y-3 mb-6">
        {integrations.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            {connected[item.id]
              ? <VoltBadge variant="positive" size="sm">Verbunden</VoltBadge>
              : <VoltButton size="sm" variant="outline" onClick={() => setConnected((p) => ({ ...p, [item.id]: true }))}>
                  Verbinden
                </VoltButton>
            }
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-muted">
        <p className="text-xs font-semibold text-muted-foreground mb-3 tracking-widest uppercase">Benachrichtigungen</p>
        {[
          { label: "E-Mail-Zusammenfassungen",  desc: "Wöchentlicher Report" },
          { label: "Deployment-Alerts",         desc: "Bei Fehlern sofort" },
        ].map((n) => {
          const [on, setOn] = useState(true);
          return (
            <div key={n.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <VoltToggle checked={on} onChange={(e) => setOn(e.target.checked)} toggleSize="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Schritt 5: Fertig ── */
function StepDone() {
  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-primary-foreground" />
      </div>
      <h2 className="font-display font-bold text-3xl tracking-tight mb-3">
        Alles bereit!
      </h2>
      <p className="text-muted-foreground text-base max-w-sm mx-auto leading-relaxed mb-8">
        Dein Workspace ist eingerichtet. Du kannst jetzt loslegen.
      </p>

      <div className="space-y-3 max-w-sm mx-auto text-left">
        {[
          { done: true,  label: "Profil erstellt" },
          { done: true,  label: "Workspace konfiguriert" },
          { done: false, label: "Erstes Projekt anlegen" },
          { done: false, label: "Team einladen" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
              item.done ? "bg-primary" : "border-2 border-border"
            )}>
              {item.done && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span className={cn("text-sm", item.done ? "text-foreground font-medium" : "text-muted-foreground")}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hauptkomponente ── */
export default function OnboardingTemplate() {
  const [step, setStep] = useState(1);
  const totalSteps = STEPS.length;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const stepComponents: Record<number, React.ReactNode> = {
    1: <StepWelcome />,
    2: <StepProfile />,
    3: <StepWorkspace />,
    4: <StepIntegrations />,
    5: <StepDone />,
  };

  return (
    <TemplateShell title="Onboarding Flow" category="App">
      <div className="min-h-[calc(100vh-56px)] bg-background flex">

        {/* ── Linke Sidebar (Desktop) ── */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-border bg-card p-8">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight">Volt UI</span>
          </div>

          <div className="space-y-1">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all",
                  step === s.id
                    ? "bg-foreground text-background font-semibold"
                    : step > s.id
                    ? "text-foreground hover:bg-muted"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
                  step === s.id ? "bg-primary text-primary-foreground" :
                  step > s.id  ? "bg-foreground/20 text-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                </div>
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <p className="text-xs text-muted-foreground mb-2">Gesamtfortschritt</p>
            <VoltProgress value={progress} size="sm" />
          </div>
        </aside>

        {/* ── Hauptinhalt ── */}
        <div className="flex-1 flex flex-col">

          {/* Mobile Fortschrittsleiste */}
          <div className="lg:hidden px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Schritt {step} von {totalSteps}</span>
              <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <VoltProgress value={progress} size="sm" />
          </div>

          {/* Schritt-Inhalt */}
          <div className="flex-1 flex items-start justify-center px-6 py-10">
            <div className="w-full max-w-lg">
              {stepComponents[step]}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-background">
            <VoltButton
              variant="ghost"
              size="sm"
              leftIcon={<ChevronLeft className="w-4 h-4" />}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Zurück
            </VoltButton>

            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    "rounded-full transition-all",
                    step === s.id ? "w-5 h-2 bg-foreground" :
                    step > s.id  ? "w-2 h-2 bg-foreground/40" :
                    "w-2 h-2 bg-border"
                  )}
                />
              ))}
            </div>

            {step < totalSteps ? (
              <VoltButton
                variant="primary"
                size="sm"
                rightIcon={<ChevronRight className="w-4 h-4" />}
                onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
              >
                {step === 1 ? "Loslegen" : "Weiter"}
              </VoltButton>
            ) : (
              <VoltButton variant="primary" size="sm" rightIcon={<Rocket className="w-4 h-4" />}>
                Dashboard öffnen
              </VoltButton>
            )}
          </div>
        </div>
      </div>
    </TemplateShell>
  );
}
