/**
 * GrainSidebar – Grain UI
 * Schwarz (#0A0A0A) + Lime (#E4FF97) für aktive Items
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

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

export interface GrainSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  sections: GrainSidebarSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  logo?: React.ReactNode;
}

export const GrainSidebar: React.FC<GrainSidebarProps> = ({
  sections, activeId, onSelect, logo, className, ...props
}) => {
  const { darkMode, toggleDarkMode } = useTheme();

  const allItems = sections.flatMap(s => s.items);
  const activeIndex = allItems.findIndex(i => i.id === activeId);
  const progress = allItems.length > 1 ? Math.round((activeIndex / (allItems.length - 1)) * 100) : 0;

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-64 flex-shrink-0",
        "bg-[#0A0A0A] text-white",
        "border-r border-[#2A2A2A]",
        "overflow-y-auto",
        className
      )}
      {...props}
    >
      {/* ── Logo ── */}
      {logo && (
        <div className="px-5 pt-5 pb-4 border-b border-[#2A2A2A] flex-shrink-0">
          {logo}
        </div>
      )}

      {/* ── Fortschrittsbalken ── */}
      <div className="px-5 py-3 border-b border-[#2A2A2A]/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.6rem] font-mono text-white/30 uppercase tracking-wider">Fortschritt</span>
          <span className="text-[0.6rem] font-mono text-white/40">{activeIndex + 1} / {allItems.length}</span>
        </div>
        <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: "#E4FF97" }}
          />
        </div>
      </div>

      {/* ── Nav Sections ── */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            <div className="px-2 mb-1.5 flex items-center gap-2">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/25 font-mono">
                {section.title}
              </span>
              <div className="flex-1 h-px bg-[#2A2A2A]" />
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
                          ? "bg-[#E4FF97] text-[#0A0A0A]"
                          : "text-white/55 hover:text-white hover:bg-white/8"
                      )}
                    >
                      {item.icon && (
                        <span className={cn(
                          "w-4 h-4 flex-shrink-0 mt-0.5",
                          isActive ? "text-[#0A0A0A]" : "text-white/30 group-hover:text-white/60"
                        )}>
                          {item.icon}
                        </span>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "text-sm font-semibold leading-tight truncate",
                            isActive ? "text-[#0A0A0A]" : ""
                          )}>
                            {item.label}
                          </span>
                          {item.isNew && (
                            <span className={cn(
                              "flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.5rem] font-bold uppercase tracking-wide",
                              isActive
                                ? "bg-[#0A0A0A]/15 text-[#0A0A0A]"
                                : "bg-[#E4FF97] text-[#0A0A0A]"
                            )}>
                              NEU
                            </span>
                          )}
                          {item.count !== undefined && (
                            <span className={cn(
                              "flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.55rem] font-bold",
                              isActive
                                ? "bg-[#0A0A0A]/15 text-[#0A0A0A]"
                                : "bg-[#2A2A2A] text-white/50"
                            )}>
                              {item.count}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className={cn(
                            "text-[0.65rem] leading-tight mt-0.5 truncate",
                            isActive ? "text-[#0A0A0A]/60" : "text-white/25"
                          )}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 py-4 border-t border-[#2A2A2A] flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.6rem] font-mono text-white/30 uppercase tracking-wider">Erscheinungsbild</span>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-[#2A2A2A] text-white/50 hover:text-white hover:bg-[#1A1A1A] transition-all duration-200"
          >
            {darkMode === "dark" ? (
              <><Sun className="w-3 h-3" /><span>Hell</span></>
            ) : (
              <><Moon className="w-3 h-3" /><span>Dunkel</span></>
            )}
          </button>
        </div>

        <div className="pt-2 border-t border-[#2A2A2A]/50">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E4FF97] animate-pulse" />
            <span className="text-[0.55rem] font-mono text-white/25">Grain UI · React 19 · Tailwind 4</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
