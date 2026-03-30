/**
 * NavigationSection – Navbar, Breadcrumb, Pagination, Steps
 */

import React, { useState } from "react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle, GrainCardDescription } from "@/components/grain/GrainCard";
import { GrainNavbar } from "@/components/grain/GrainNavbar";
import { GrainButton } from "@/components/grain/GrainButton";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { ChevronRight, Home, ChevronLeft, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Breadcrumb ── */
const Breadcrumb: React.FC<{ items: string[] }> = ({ items }) => (
  <nav className="flex items-center gap-1.5">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
        <span className={cn(
          "text-sm font-body",
          i === items.length - 1
            ? "font-semibold text-foreground"
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
            "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold font-body transition-all duration-150",
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
              "text-xs font-semibold font-body whitespace-nowrap",
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
        <p className="section-label mb-2">07 — Navigation</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Navigation</h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
          Navbar, Breadcrumb, Pagination und Stepper – alle mit atmosphärischen
          Hover-Effekten und vollständiger Tastatur-Zugänglichkeit.
        </p>
      </div>

      {/* Navbar */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Navbar</GrainCardTitle>
          <GrainCardDescription>glass · solid · transparent – mit mobilem Hamburger-Menü</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent className="p-0 overflow-hidden rounded-b-2xl">
          <div className="border border-border rounded-xl overflow-hidden">
            <GrainNavbar
              sticky={false}
              variant="glass"
              logo={
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E4FF97] flex items-center justify-center">
                    <span className="text-foreground font-display font-bold text-xs">G</span>
                  </div>
                  <span className="font-display font-bold text-base text-foreground">Flux UI</span>
                </div>
              }
              items={navItems}
              rightSlot={
                <div className="flex items-center gap-2">
                  <GrainBadge variant="default" size="sm">v1.0</GrainBadge>
                  <GrainButton variant="primary" size="sm">Starten</GrainButton>
                </div>
              }
            />
            <div className="h-16 bg-secondary flex items-center justify-center">
              <p className="text-sm font-body text-muted-foreground">Seiteninhalt</p>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Breadcrumb */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Breadcrumb</GrainCardTitle>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="space-y-3">
            <Breadcrumb items={["", "Flux UI", "Komponenten"]} />
            <Breadcrumb items={["", "Flux UI", "Komponenten", "Buttons", "Primary"]} />
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* Pagination */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Pagination</GrainCardTitle>
          <GrainCardDescription>Aktuelle Seite: {page} von 7</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <Pagination total={7} current={page} onChange={setPage} />
        </GrainCardContent>
      </GrainCard>

      {/* Stepper */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Stepper</GrainCardTitle>
          <GrainCardDescription>Schritt {step + 1} von {steps.length}</GrainCardDescription>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="space-y-6">
            <Stepper current={step} />
            <div className="flex justify-between">
              <GrainButton
                variant="outline"
                size="sm"
                disabled={step === 0}
                onClick={() => setStep(s => Math.max(0, s - 1))}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Zurück
              </GrainButton>
              <GrainButton
                variant="primary"
                size="sm"
                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                rightIcon={step < steps.length - 1 ? <ChevronRight className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              >
                {step === steps.length - 1 ? "Abschließen" : "Weiter"}
              </GrainButton>
            </div>
          </div>
        </GrainCardContent>
      </GrainCard>
    </div>
  );
};
