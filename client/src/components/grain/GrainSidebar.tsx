/**
 * GrainSidebar – Flux UI
 * Hell: Weißer Hintergrund + schwarzer Text + Lime (#E4FF97) für aktive Items
 * Dark Mode: Sidebar wird dunkel via CSS-Klasse
 * Auto-Scroll: aktives Item scrollt immer in den sichtbaren Bereich
 */

import React, { useRef, useEffect } from "react";
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
  const isDark = darkMode === "dark";

  const navRef      = useRef<HTMLElement>(null);
  const activeRef   = useRef<HTMLButtonElement>(null);
  const asideRef    = useRef<HTMLElement>(null);

  const allItems = sections.flatMap(s => s.items);
  const activeIndex = allItems.findIndex(i => i.id === activeId);
  const progress = allItems.length > 1 ? Math.round((activeIndex / (allItems.length - 1)) * 100) : 0;

  /* ── Auto-Scroll: aktives Item in den sichtbaren Bereich scrollen ── */
  useEffect(() => {
    const aside  = asideRef.current;
    const active = activeRef.current;
    if (!aside || !active) return;

    const asideTop    = aside.scrollTop;
    const asideBottom = asideTop + aside.clientHeight;
    const itemTop     = active.offsetTop;
    const itemBottom  = itemTop + active.offsetHeight;

    // Nur scrollen wenn das Item außerhalb des sichtbaren Bereichs liegt
    if (itemTop < asideTop + 80) {
      aside.scrollTo({ top: itemTop - 80, behavior: "smooth" });
    } else if (itemBottom > asideBottom - 80) {
      aside.scrollTo({ top: itemBottom - aside.clientHeight + 80, behavior: "smooth" });
    }
  }, [activeId]);

  /* ── Farbwerte je nach Modus ── */
  const bg          = isDark ? "#0F0F0F" : "#FFFFFF";
  const borderColor = isDark ? "#2A2A2A" : "#E8E8E8";
  const labelColor  = isDark ? "rgba(255,255,255,0.25)" : "#AAAAAA";
  const trackBg     = isDark ? "#2A2A2A" : "#F0F0F0";
  const textMuted   = isDark ? "rgba(255,255,255,0.50)" : "#6B6B6B";
  const textHover   = isDark ? "#FFFFFF" : "#0A0A0A";
  const hoverBg     = isDark ? "rgba(255,255,255,0.06)" : "#F5F5F5";
  const descColor   = isDark ? "rgba(255,255,255,0.25)" : "#AAAAAA";
  const countBg     = isDark ? "#2A2A2A" : "#F0F0F0";
  const countText   = isDark ? "rgba(255,255,255,0.50)" : "#6B6B6B";
  const footerText  = isDark ? "rgba(255,255,255,0.25)" : "#AAAAAA";
  const btnBorder   = isDark ? "#2A2A2A" : "#E8E8E8";
  const btnText     = isDark ? "rgba(255,255,255,0.50)" : "#6B6B6B";
  const btnHoverBg  = isDark ? "#1A1A1A" : "#F0F0F0";
  const dotText     = isDark ? "rgba(255,255,255,0.25)" : "#AAAAAA";

  return (
    <aside
      ref={asideRef}
      className={cn(
        "flex flex-col h-full w-64 flex-shrink-0 overflow-y-auto transition-colors duration-300",
        className
      )}
      style={{ background: bg, borderRight: `1px solid ${borderColor}` }}
      {...props}
    >
      {/* ── Logo ── */}
      {logo && (
        <div className="px-5 pt-5 pb-4 flex-shrink-0" style={{ borderBottom: `1px solid ${borderColor}` }}>
          {logo}
        </div>
      )}

      {/* ── Fortschrittsbalken ── */}
      <div className="px-5 py-3 flex-shrink-0" style={{ borderBottom: `1px solid ${borderColor}50` }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.6rem] font-mono uppercase tracking-wider" style={{ color: labelColor }}>Fortschritt</span>
          <span className="text-[0.6rem] font-mono" style={{ color: labelColor }}>{activeIndex + 1} / {allItems.length}</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: trackBg }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: "#E4FF97" }}
          />
        </div>
      </div>

      {/* ── Nav Sections ── */}
      <nav ref={navRef} className="flex-1 px-3 py-4 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            <div className="px-2 mb-1.5 flex items-center gap-2">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] font-mono" style={{ color: labelColor }}>
                {section.title}
              </span>
              <div className="flex-1 h-px" style={{ background: borderColor }} />
            </div>

            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      ref={isActive ? activeRef : undefined}
                      onClick={() => onSelect?.(item.id)}
                      className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group"
                      style={isActive
                        ? { background: "#E4FF97", color: "#0A0A0A" }
                        : { color: textMuted }
                      }
                      onMouseEnter={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
                          (e.currentTarget as HTMLButtonElement).style.color = textHover;
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color = textMuted;
                        }
                      }}
                    >
                      {item.icon && (
                        <span className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: isActive ? "#0A0A0A" : "inherit", opacity: isActive ? 1 : 0.6 }}>
                          {item.icon}
                        </span>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold leading-tight truncate">
                            {item.label}
                          </span>
                          {item.isNew && (
                            <span
                              className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.5rem] font-bold uppercase tracking-wide"
                              style={isActive
                                ? { background: "rgba(10,10,10,0.12)", color: "#0A0A0A" }
                                : { background: "#E4FF97", color: "#0A0A0A" }
                              }
                            >
                              NEU
                            </span>
                          )}
                          {item.count !== undefined && (
                            <span
                              className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.55rem] font-bold"
                              style={isActive
                                ? { background: "rgba(10,10,10,0.12)", color: "#0A0A0A" }
                                : { background: countBg, color: countText }
                              }
                            >
                              {item.count}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[0.65rem] leading-tight mt-0.5 truncate"
                            style={{ color: isActive ? "rgba(10,10,10,0.55)" : descColor }}>
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
      <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: `1px solid ${borderColor}` }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.6rem] font-mono uppercase tracking-wider" style={{ color: footerText }}>Erscheinungsbild</span>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{ border: `1px solid ${btnBorder}`, color: btnText, background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = btnHoverBg; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            {isDark ? (
              <><Sun className="w-3 h-3" /><span>Hell</span></>
            ) : (
              <><Moon className="w-3 h-3" /><span>Dunkel</span></>
            )}
          </button>
        </div>

        <div className="pt-2" style={{ borderTop: `1px solid ${borderColor}50` }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E4FF97] animate-pulse" />
            <span className="text-[0.55rem] font-mono" style={{ color: dotText }}>Flux UI · React 19 · Tailwind 4</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
