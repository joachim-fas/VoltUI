/**
 * GrainSidebar – Atmospheric Grain Design System
 * Sidebar-Navigation für die Komponentenbibliothek.
 */

import React from "react";
import { cn } from "@/lib/utils";

export interface GrainSidebarSection {
  title: string;
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    badge?: string;
    isNew?: boolean;
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
      {/* Logo */}
      {logo && (
        <div className="px-5 py-5 border-b border-sidebar-border flex-shrink-0">
          {logo}
        </div>
      )}

      {/* Nav sections */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {sections.map((section, si) => (
          <div key={si}>
            <p className="px-2 mb-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-sidebar-foreground/40 font-mono">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelect?.(item.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left",
                        "text-sm font-semibold font-body",
                        "transition-all duration-150",
                        isActive
                          ? [
                              "bg-sidebar-primary text-sidebar-primary-foreground",
                              "shadow-[0_2px_8px_oklch(0.42_0.22_268/0.3)]",
                            ]
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      {item.icon && (
                        <span className={cn(
                          "w-4 h-4 flex-shrink-0",
                          isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50"
                        )}>
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.isNew && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.55rem] font-bold uppercase tracking-wide bg-grain-blue text-white">
                          Neu
                        </span>
                      )}
                      {item.badge && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[0.6rem] font-bold bg-sidebar-accent text-sidebar-accent-foreground">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border flex-shrink-0">
        <p className="text-[0.65rem] font-mono text-sidebar-foreground/30 leading-relaxed">
          Grain UI v1.0<br />
          Atmospheric Design System
        </p>
      </div>
    </aside>
  );
};
