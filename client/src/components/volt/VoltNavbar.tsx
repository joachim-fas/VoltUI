/**
 * VoltNavbar – Atmospheric Volt UI Design System
 * Top-Navigation mit Glasmorphismus und Volt-Textur.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface VoltNavItem {
  label: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export interface VoltNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: VoltNavItem[];
  rightSlot?: React.ReactNode;
  variant?: "glass" | "solid" | "transparent";
  sticky?: boolean;
}

export const VoltNavbar: React.FC<VoltNavbarProps> = ({
  logo,
  items = [],
  rightSlot,
  variant = "glass",
  sticky = true,
  className,
  ...props
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const baseClasses = cn(
    "w-full z-40 transition-all duration-300",
    sticky && "sticky top-0",
    variant === "glass" && [
      "backdrop-blur-xl",
      scrolled
        ? "bg-background/80 border-b border-border/60 shadow-[0_2px_16px_oklch(0_0_0/0.06)]"
        : "bg-background/60 border-b border-transparent",
    ],
    variant === "solid" && "bg-background border-b border-border",
    variant === "transparent" && "bg-transparent",
    className
  );

  return (
    <nav className={baseClasses} {...props}>
      <div className="container flex items-center justify-between h-16 gap-6">
        {/* Logo */}
        {logo && (
          <div className="flex-shrink-0 flex items-center">
            {logo}
          </div>
        )}

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href ?? "#"}
              onClick={item.onClick}
              className={cn(
                "relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg",
                "text-sm font-semibold font-body",
                "transition-all duration-150",
                item.active
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-[#E4FF97]/50 dark:hover:bg-[#E4FF97]/15"
              )}
            >
              {item.label}
              {item.active && (
                <span className="absolute bottom-0 inset-x-3 h-[2px] rounded-full bg-foreground/70" />
              )}
              {item.badge !== undefined && (
                <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-1 rounded-full text-[0.6rem] font-bold bg-[#000000] text-white">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Right slot */}
        {rightSlot && (
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {rightSlot}
          </div>
        )}

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <div className="container py-3 flex flex-col gap-1">
              {items.map((item, i) => (
                <a
                  key={i}
                  href={item.href ?? "#"}
                  onClick={() => { item.onClick?.(); setMobileOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg",
                    "text-sm font-semibold font-body",
                    "transition-colors duration-150",
                    item.active
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#E4FF97]/50 dark:hover:bg-[#E4FF97]/15"
                  )}
                >
                  {item.label}
                </a>
              ))}
              {rightSlot && (
                <div className="pt-2 mt-1 border-t border-border/60 flex flex-col gap-2">
                  {rightSlot}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
