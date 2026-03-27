/**
 * GrainSidebar – Atmospheric Grain Design System v2
 * Fokus: Informationsvermittlung – Beschreibungen, Fortschritt, klare Hierarchie
 */

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export interface GrainSidebarSection {
  title: string;
  items: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    badge?: string;
    isNew?: boolean;
    count?: number;
  }>;
}

export interface GrainSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  sections: GrainSidebarSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  logo?: React.ReactNode;
}

export const GrainSidebar: React.FC<GrainSidebarProps> = ({
  sections,
  activeId,
  onSelect,
  logo,
  className,
  ...props
}) => {
  // Fortschritt: wie viele Sektionen wurden besucht?
  const allItems = sections.flatMap(s => s.items);
  const activeIndex = allItems.findIndex(i => i.id === activeId);
  const progress = allItems.length > 1 ? Math.round((activeIndex / (allItems.length - 1)) * 100) : 0;

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-64 flex-shrink-0",
        "bg-sidebar text-sidebar-foreground",
        "border-r border-sidebar-border",
        "overflow-y-auto",
        className
      )}
      {...props}
    >
      {/* ── Logo ── */}
      {logo && (
        <div className="px-5 pt-5 pb-4 border-b border-sidebar-border flex-shrink-0">
          {logo}
        </div>
      )}

      {/* ── Fortschrittsbalken ── */}
      <div className="px-5 py-3 border-b border-sidebar-border/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.6rem] font-mono text-sidebar-foreground/40 uppercase tracking-wider">Fortschritt</span>
          <span className="text-[0.6rem] font-mono text-sidebar-foreground/50">{activeIndex + 1} / {allItems.length}</span>
        </div>
        <div className="h-1 bg-sidebar-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, oklch(0.42 0.22 268), oklch(0.52 0.26 27))"
            }}
          />
        </div>
      </div>

      {/* ── Nav Sections ── */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {/* Abschnitts-Titel */}
            <div className="px-2 mb-1.5 flex items-center gap-2">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-sidebar-foreground/35 font-mono">
                {section.title}
              </span>
              <div className="flex-1 h-px bg-sidebar-border/60" />
            </div>

            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelect?.(item.id)}
                      className={cn(
                        "w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left",
                        "transition-all duration-150 group",
                        isActive
                          ? [
                              "bg-sidebar-primary text-sidebar-primary-foreground",
                              "shadow-[0_2px_12px_oklch(0.42_0.22_268/0.25)]",
                            ]
                          : "text-sidebar-foreground/65 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      {/* Icon */}
                      {item.icon && (
                        <span className={cn(
                          "w-4 h-4 flex-shrink-0 mt-0.5",
                          isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70"
                        )}>
                          {item.icon}
                        </span>
                      )}

                      {/* Label + Beschreibung */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "text-sm font-semibold font-ui leading-tight truncate",
                            isActive ? "text-sidebar-primary-foreground" : ""
                          )}>
                            {item.label}
                          </span>
                          {item.isNew && (
                            <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.5rem] font-bold uppercase tracking-wide bg-[oklch(0.52_0.26_27)] text-white">
                              Neu
                            </span>
                          )}
                          {item.count !== undefined && (
                            <span className={cn(
                              "flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.55rem] font-bold",
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-sidebar-accent text-sidebar-foreground/60"
                            )}>
                              {item.count}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className={cn(
                            "text-[0.65rem] font-body leading-tight mt-0.5 truncate",
                            isActive ? "text-sidebar-primary-foreground/70" : "text-sidebar-foreground/35"
                          )}>
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Pfeil bei aktivem Item */}
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-sidebar-primary-foreground/60 mt-0.5" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="px-5 py-4 border-t border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_145)] animate-pulse" />
          <span className="text-[0.6rem] font-mono text-sidebar-foreground/50">v2.0 — Atmospheric Design System</span>
        </div>
        <p className="text-[0.6rem] font-mono text-sidebar-foreground/25 leading-relaxed">
          React 19 · Tailwind 4 · TypeScript
        </p>
      </div>
    </aside>
  );
};
