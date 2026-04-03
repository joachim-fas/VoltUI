/**
 * NavigationSection – Navbar, Breadcrumb, Pagination, Steps
 */

import React, { useState } from "react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle, VoltCardDescription } from "@/components/volt/VoltCard";
import { VoltNavbar } from "@/components/volt/VoltNavbar";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { ChevronRight, Home, ChevronLeft, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";

/* ── Breadcrumb ── */
const Breadcrumb: React.FC<{ items: string[] }> = ({ items }) => (
  <nav className="flex items-center gap-1.5">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
        <span className={cn(
          "text-sm font-body",
          i === items.length - 1
            ? "font-ui font-semibold text-foreground"
            : "text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        )}>
          {i === 0 ? <Home className="w-3.5 h-3.5 inline" /> : item}
        </span>
      </React.Fragment>
    ))}
  </nav>
);

/* ── Pagination ── */
const Pagination: React.FC<{ total: number; current: number; onChange: (p: number) => void }> = ({
  total, current, onChange
}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-ui font-semibold font-body transition-all duration-150",
            p === current
              ? "bg-[#0A0A0A] text-white"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

/* ── Stepper ── */
const steps = ["Konto", "Profil", "Einstellungen", "Fertig"];
const Stepper: React.FC<{ current: number }> = ({ current }) => (
  <div className="flex items-center w-full">
    {steps.map((step, i) => {
      const done    = i < current;
      const active  = i === current;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-body transition-all duration-300",
              done   && "bg-[#0A0A0A] text-white",
              active && "bg-[#E4FF97] text-foreground scale-110",
              !done && !active && "bg-muted text-muted-foreground border border-border"
            )}>
              {done ? <Check className="w-4 h-4" /> : active ? <Circle className="w-2.5 h-2.5 fill-white" /> : i + 1}
            </div>
            <span className={cn(
              "text-xs font-ui font-semibold font-body whitespace-nowrap",
              active ? "text-foreground font-bold" : done ? "text-foreground" : "text-muted-foreground"
            )}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500",
              i < current ? "bg-[#0A0A0A]" : "bg-border"
            )} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export const NavigationSection: React.FC = () => {
  const [page, setPage] = useState(3);
  const [step, setStep] = useState(1);
  const [navActive, setNavActive] = useState("Komponenten");

  const navItems = ["Übersicht", "Komponenten", "Tokens", "Dokumentation"].map(label => ({
    label,
    active: label === navActive,
    onClick: () => setNavActive(label),
  }));

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label mb-2">11 — Navigation</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">Navigation</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Navbar, Breadcrumb, Pagination und Stepper – alle mit atmosphärischen
          Hover-Effekten und vollständiger Tastatur-Zugänglichkeit.
        </p>
      </div>

      {/* Navbar */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Navbar</VoltCardTitle>
          <VoltCardDescription>glass · solid · transparent – mit mobilem Hamburger-Menü</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent className="p-0 overflow-hidden rounded-b-2xl">
          <div className="border border-border rounded-xl overflow-hidden">
            <VoltNavbar
              sticky={false}
              variant="glass"
              logo={
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E4FF97] flex items-center justify-center">
                    <span className="text-foreground font-display font-bold text-xs">V</span>
                  </div>
                  <span className="font-display font-bold text-base text-foreground">Volt UI</span>
                </div>
              }
              items={navItems}
              rightSlot={
                <div className="flex items-center gap-2">
                  <VoltBadge variant="default" size="sm">v1.0</VoltBadge>
                  <VoltButton variant="primary" size="sm">Starten</VoltButton>
                </div>
              }
            />
            <div className="h-16 bg-secondary flex items-center justify-center">
              <p className="text-sm font-body text-muted-foreground">Seiteninhalt</p>
            </div>
          </div>
        </VoltCardContent>
        <VoltCodeBlock
          language="tsx"
          label="VoltNavbar · Verwendung"
          code={`// Installation: pnpm add framer-motion lucide-react
// Kopiere VoltNavbar.tsx, VoltButton.tsx, VoltBadge.tsx in dein Projekt

import React, { useState } from "react";
import { VoltNavbar } from "./VoltNavbar";
import { VoltButton } from "./VoltButton";
import { VoltBadge } from "./VoltBadge";

export function NavbarDemo() {
  const [activeItem, setActiveItem] = useState("Komponenten");

  const navItems = ["\u00dcbersicht", "Komponenten", "Tokens", "Dokumentation"].map(
    (label) => ({
      label,
      active: label === activeItem,
      onClick: () => setActiveItem(label),
    })
  );

  return (
    <VoltNavbar
      variant="glass"   // glass · solid · transparent
      sticky={true}    // Klebt am oberen Rand beim Scrollen
      logo={
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E4FF97] flex items-center justify-center">
            <span className="text-foreground font-bold text-xs">V</span>
          </div>
          <span className="font-bold text-base">Volt UI</span>
        </div>
      }
      items={navItems}
      rightSlot={
        <div className="flex items-center gap-2">
          <VoltBadge variant="default" size="sm">v1.0</VoltBadge>
          <VoltButton variant="primary" size="sm">Starten</VoltButton>
        </div>
      }
    />
  );
}

// items-Shape: { label: string; active?: boolean; href?: string; badge?: number; onClick?: () => void }
// Varianten: glass · solid · transparent`}
        />
      </VoltCard>

      {/* Breadcrumb */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Breadcrumb</VoltCardTitle>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="space-y-3">
            <Breadcrumb items={["", "Volt UI", "Komponenten"]} />
            <Breadcrumb items={["", "Volt UI", "Komponenten", "Buttons", "Primary"]} />
          </div>
        </VoltCardContent>
        <VoltCodeBlock
          language="tsx"
          label="Breadcrumb · Beispiel"
          code={`// Breadcrumb – eigenständige Komponente ohne externe Abhängigkeiten
// Installation: pnpm add lucide-react

import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: string[];  // Erstes Element = Home-Icon, übrige = Labels
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        )}
        <span
          className={
            i === items.length - 1
              ? "text-sm font-semibold text-foreground"
              : "text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          }
        >
          {i === 0 ? <Home className="w-3.5 h-3.5 inline" /> : item}
        </span>
      </React.Fragment>
    ))}
  </nav>
);

// Verwendung:
<Breadcrumb items={["", "Volt UI", "Komponenten", "Buttons"]} />
<Breadcrumb items={["", "Volt UI", "Komponenten", "Buttons", "Primary"]} />`}
        />
      </VoltCard>

      {/* Pagination */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Pagination</VoltCardTitle>
          <VoltCardDescription>Aktuelle Seite: {page} von 7</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <Pagination total={7} current={page} onChange={setPage} />
        </VoltCardContent>
        <VoltCodeBlock
          language="tsx"
          label="Pagination · Beispiel"
          code={`// Pagination – eigenständige Komponente ohne externe Abhängigkeiten
// Installation: pnpm add lucide-react

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg
          text-muted-foreground hover:text-foreground hover:bg-muted
          disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={[
            "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all",
            p === current
              ? "bg-[#0A0A0A] text-white"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          ].join(" ")}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-8 h-8 flex items-center justify-center rounded-lg
          text-muted-foreground hover:text-foreground hover:bg-muted
          disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Verwendung:
const [page, setPage] = useState(1);
<Pagination total={7} current={page} onChange={setPage} />`}
        />
      </VoltCard>

      {/* Stepper */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Stepper</VoltCardTitle>
          <VoltCardDescription>Schritt {step + 1} von {steps.length}</VoltCardDescription>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="space-y-6">
            <Stepper current={step} />
            <div className="flex justify-between">
              <VoltButton
                variant="outline"
                size="sm"
                disabled={step === 0}
                onClick={() => setStep(s => Math.max(0, s - 1))}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Zurück
              </VoltButton>
              <VoltButton
                variant="primary"
                size="sm"
                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                rightIcon={step < steps.length - 1 ? <ChevronRight className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              >
                {step === steps.length - 1 ? "Abschließen" : "Weiter"}
              </VoltButton>
            </div>
          </div>
        </VoltCardContent>
        <VoltCodeBlock
          language="tsx"
          label="Stepper · Beispiel"
          code={`// Stepper – eigenständige Komponente ohne externe Abhängigkeiten
// Installation: pnpm add lucide-react
// Kopiere VoltButton.tsx für die Navigation

import React, { useState } from "react";
import { Check, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { VoltButton } from "./VoltButton";

const STEPS = ["Konto", "Profil", "Einstellungen", "Fertig"];

export function StepperDemo() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-6">
      {/* Schritt-Anzeige */}
      <div className="flex items-center w-full">
        {STEPS.map((label, i) => {
          const done   = i < step;
          const active = i === step;
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  done   ? "bg-[#0A0A0A] text-white"                       : "",
                  active ? "bg-[#E4FF97] text-foreground scale-110"         : "",
                  !done && !active ? "bg-muted text-muted-foreground border border-border" : "",
                ].join(" ")}>
                  {done   ? <Check className="w-4 h-4" /> :
                   active ? <Circle className="w-2.5 h-2.5 fill-current" /> :
                   i + 1}
                </div>
                <span className={[
                  "text-xs font-semibold whitespace-nowrap",
                  active ? "text-foreground font-bold" :
                  done   ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={[
                  "flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500",
                  i < step ? "bg-[#0A0A0A]" : "bg-border",
                ].join(" ")} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <VoltButton
          variant="outline" size="sm"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Zurück
        </VoltButton>
        <VoltButton
          variant="primary" size="sm"
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          rightIcon={step < STEPS.length - 1
            ? <ChevronRight className="w-4 h-4" />
            : <Check className="w-4 h-4" />}
        >
          {step === STEPS.length - 1 ? "Abschließen" : "Weiter"}
        </VoltButton>
      </div>
    </div>
  );
}`}
        />
      </VoltCard>
    </div>
  );
};
