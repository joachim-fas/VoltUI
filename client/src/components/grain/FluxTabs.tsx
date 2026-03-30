/**
 * FluxTabs – Atmospheric Grain Design System
 * Tab-Navigation mit atmosphärischen Übergängen.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface FluxTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  content?: React.ReactNode;
}

export interface FluxTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: FluxTabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  variant?: "underline" | "pills" | "glass" | "boxed";
}

export const FluxTabs: React.FC<FluxTabsProps> = ({
  tabs,
  defaultTab,
  activeTab,
  onTabChange,
  variant = "pills",
  className,
  ...props
}) => {
  const [internal, setInternal] = React.useState(defaultTab ?? tabs[0]?.id ?? "");
  const active = activeTab !== undefined ? activeTab : internal;

  const handleChange = (id: string) => {
    setInternal(id);
    onTabChange?.(id);
  };

  const activeTab_ = tabs.find(t => t.id === active);

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Tab List */}
      <div
        role="tablist"
        className={cn(
          "flex items-center gap-1",
          variant === "underline" && "border-b border-border pb-0 gap-0",
          variant === "boxed" && "bg-muted rounded-xl p-1",
          variant === "glass" && "glass rounded-xl p-1",
          variant === "pills" && "gap-1",
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => handleChange(tab.id)}
              className={cn(
                "relative flex items-center gap-1.5 font-body font-semibold text-sm",
                "transition-all duration-200 ease-out select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                variant === "underline" && [
                  "px-4 py-2.5 rounded-none",
                  isActive
                    ? "text-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground",
                ],
                (variant === "pills" || variant === "boxed" || variant === "glass") && [
                  "px-4 py-2 rounded-lg",
                  isActive
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                ],
              )}
            >
              {/* Active indicator for underline */}
              {variant === "underline" && isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {/* Active background for pills/boxed/glass */}
              {(variant === "pills" || variant === "boxed" || variant === "glass") && isActive && (
                <motion.div
                  layoutId="tab-bg"
                  className={cn(
                    "absolute inset-0 rounded-lg",
                    variant === "pills"
                      ? "bg-foreground"
                      : "bg-background ring-1 ring-border"
                  )}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.icon && (
                <span className="relative z-10 w-4 h-4">{tab.icon}</span>
              )}
              <span className="relative z-10">{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={cn(
                  "relative z-10 inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-1",
                  "rounded-full text-[0.6rem] font-bold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab_ && activeTab_.content !== undefined && (
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`panel-${active}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mt-4"
          >
            {activeTab_.content}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
