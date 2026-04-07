/**
 * VoltSidebar – Volt UI
 * Hell: Weißer Hintergrund + schwarzer Text + Schwarz für aktive Items
 * Dark: Dunkler Hintergrund + Weiß für aktive Items
 * Auto-Scroll: aktives Item scrollt immer in den sichtbaren Bereich
 * V2-Kategorie: dezenter Trennstrich, Link-Verhalten (eigene Route)
 */

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export interface VoltSidebarSection {
  title: string;
  items: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    badge?: string;
    isNew?: boolean;
    count?: number;
    href?: string;
  }>;
}

export interface VoltSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  sections: VoltSidebarSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  logo?: React.ReactNode;
}

export const VoltSidebar: React.FC<VoltSidebarProps> = ({
  sections, activeId, onSelect, logo, className, ...props
}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const isDark = darkMode === "dark";

  const navRef    = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const asideRef  = useRef<HTMLElement>(null);

  // Nur scrollbare Items (keine V2-Sections, keine href-Links) für den Fortschrittsbalken zählen
  const standardItems = sections
    .filter(s => !s.title.toLowerCase().startsWith("v2"))
    .flatMap(s => s.items)
    .filter(item => !item.href);
  const activeIndex = standardItems.findIndex(i => i.id === activeId);
  const progress    = standardItems.length > 1
    ? Math.round((Math.max(0, activeIndex) / (standardItems.length - 1)) * 100)
    : 0;

  /* ── Auto-Scroll: aktives Item in den sichtbaren Bereich scrollen ── */
  useEffect(() => {
    const nav    = navRef.current;
    const active = activeRef.current;
    if (!nav || !active) return;

    const navTop     = nav.scrollTop;
    const navBottom  = navTop + nav.clientHeight;
    const itemTop    = active.offsetTop;
    const itemBottom = itemTop + active.offsetHeight;

    if (itemTop < navTop + 40) {
      nav.scrollTo({ top: itemTop - 40, behavior: "smooth" });
    } else if (itemBottom > navBottom - 40) {
      nav.scrollTo({ top: itemBottom - nav.clientHeight + 40, behavior: "smooth" });
    }
  }, [activeId]);

  /* ── Farbwerte je nach Modus ── */
  const bg          = isDark ? "#0F0F0F" : "#FFFFFF";
  const borderColor = isDark ? "#2A2A2A" : "#E8E8E8";
  const labelColor  = isDark ? "rgba(255,255,255,0.25)" : "#AAAAAA";
  const trackBg     = isDark ? "#2A2A2A" : "#F0F0F0";
  const trackFill   = isDark ? "rgba(255,255,255,0.35)" : "rgba(10,10,10,0.25)";
  const textMuted   = isDark ? "rgba(255,255,255,0.50)" : "#6B6B6B";
  const textHover   = isDark ? "#FFFFFF" : "#0A0A0A";
  const hoverBg     = isDark ? "rgba(255,255,255,0.06)" : "#F5F5F5";
  const descColor   = isDark ? "rgba(255,255,255,0.25)" : "#AAAAAA";
  const footerText  = isDark ? "rgba(255,255,255,0.25)" : "#AAAAAA";
  const btnBorder   = isDark ? "#2A2A2A" : "#E8E8E8";
  const btnText     = isDark ? "rgba(255,255,255,0.50)" : "#6B6B6B";
  const btnHoverBg  = isDark ? "#1A1A1A" : "#F0F0F0";
  const dotColor    = isDark ? "rgba(255,255,255,0.25)" : "rgba(10,10,10,0.20)";
  const footerMono  = isDark ? "rgba(255,255,255,0.20)" : "#CCCCCC";

  // Aktives Item: Lime-Gelb (#E4FF97) auf Schwarz – original Volt UI Stil
  const activeBg    = "#E4FF97";
  const activeText  = "#0A0A0A";
  const activeDesc  = "rgba(10,10,10,0.55)";

  /* ── Standard-Kategorie ── */
  function renderStandardSection(section: VoltSidebarSection, si: number) {
    return (
      <div key={si}>
        <div className="px-2 mb-1.5 flex items-center gap-2">
          <span
            className="text-[0.6rem] font-bold uppercase tracking-[0.14em] font-mono"
            style={{ color: labelColor }}
          >
            {section.title}
          </span>
          <div className="flex-1 h-px" style={{ background: borderColor }} />
        </div>
        <ul className="space-y-0.5">
          {section.items.map((item) => {
            // href-Items (z.B. Showcase) sind nie "aktiv" – sie verlinken auf andere Routen
            const isActive = !item.href && item.id === activeId;
            const handleItemClick = () => {
              if (item.href) {
                window.location.href = item.href;
              } else {
                onSelect?.(item.id);
              }
            };
            return (
              <li key={item.id}>
                <button
                  ref={isActive ? activeRef : undefined}
                  onClick={handleItemClick}
                  className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group"
                  style={
                    isActive
                      ? { background: activeBg, color: activeText }
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
                    <span
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: isActive ? activeText : "inherit", opacity: isActive ? 1 : 0.6 }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold leading-tight truncate block">
                      {item.label}
                    </span>
                    {item.description && (
                      <p
                        className="text-[0.65rem] leading-tight mt-0.5 truncate"
                        style={{ color: isActive ? activeDesc : descColor }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.href && (
                    <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-30 group-hover:opacity-60 transition-opacity" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  /* ── V2-Kategorie: dezenter Trennstrich, Link-Verhalten ── */
  function renderV2Section(section: VoltSidebarSection, si: number) {
    return (
      <div key={si} className="pt-2">
        <div className="px-2 mb-2 flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: borderColor }} />
          <span
            className="text-[0.55rem] font-bold uppercase tracking-[0.18em] font-mono px-1.5"
            style={{ color: labelColor }}
          >
            {section.title}
          </span>
          <div className="flex-1 h-px" style={{ background: borderColor }} />
        </div>
        <ul className="space-y-0.5">
          {section.items.map((item) => {
            const hasHref = Boolean(item.href);
            const handleClick = () => {
              if (item.href) {
                window.location.href = item.href;
              } else {
                onSelect?.(item.id);
              }
            };
            return (
              <li key={item.id}>
                <button
                  onClick={handleClick}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group"
                  style={{ color: textMuted }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
                    (e.currentTarget as HTMLButtonElement).style.color = textHover;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = textMuted;
                  }}
                >
                  {item.icon && (
                    <span className="w-4 h-4 flex-shrink-0" style={{ opacity: 0.5 }}>
                      {item.icon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold leading-tight truncate block">
                      {item.label}
                    </span>
                    {item.description && (
                      <p className="text-[0.65rem] leading-tight mt-0.5 truncate" style={{ color: descColor }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  {hasHref && (
                    <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-30 group-hover:opacity-60 transition-opacity" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <aside
      ref={asideRef}
      className={cn(
        "flex flex-col h-full w-64 flex-shrink-0 overflow-hidden",
        className
      )}
      style={{ background: bg, borderRight: `1px solid ${borderColor}` }}
      {...props}
    >
      {/* ── Sticky Header: Logo + Fortschrittsbalken ── */}
      <div className="flex-shrink-0 sticky top-0 z-10" style={{ background: bg }}>
        {logo && (
          <div className="px-5 pt-5 pb-4" style={{ background: bg, borderBottom: `1px solid ${borderColor}` }}>
            {logo}
          </div>
        )}
        <div className="px-5 py-3" style={{ borderBottom: `1px solid ${borderColor}50` }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[0.6rem] font-mono uppercase tracking-wider" style={{ color: labelColor }}>
              Fortschritt
            </span>
            <span className="text-[0.6rem] font-mono" style={{ color: labelColor }}>
              {Math.max(0, activeIndex) + 1} / {standardItems.length}
            </span>
          </div>
          <div className="h-px rounded-full overflow-hidden" style={{ background: trackBg }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: trackFill }}
            />
          </div>
        </div>
      </div>

      {/* ── Scrollbarer Nav-Bereich ── */}
      <nav ref={navRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {sections.map((section, si) => {
          const isV2 = section.title.toLowerCase().startsWith("v2");
          return isV2
            ? renderV2Section(section, si)
            : renderStandardSection(section, si);
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: `1px solid ${borderColor}` }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.6rem] font-mono uppercase tracking-wider" style={{ color: footerText }}>
            Erscheinungsbild
          </span>
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
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: dotColor }} />
            <span className="text-[0.55rem] font-mono" style={{ color: footerMono }}>
              Volt UI · React 19 · Tailwind 4
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
