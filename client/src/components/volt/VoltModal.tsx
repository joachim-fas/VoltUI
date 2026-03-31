/**
 * VoltModal – Atmospheric Volt UI Design System
 * Modal/Dialog mit Glasmorphismus und Volt-Textur.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface VoltModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export const VoltModal: React.FC<VoltModalProps> = ({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
  className,
}) => {
  // Close on Escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={cn(
              "relative w-full glass-strong rounded-2xl overflow-hidden volt-texture",
              "ring-1 ring-border/40",
              sizeClasses[size],
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {/* Accent top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E4FF97]" />

            {/* Header */}
            {(title || description) && (
              <div className="px-6 pt-6 pb-4 border-b border-border/50">
                {title && (
                  <h2 id="modal-title" className="font-display font-bold text-xl text-foreground">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-muted transition-colors z-10"
              )}
              aria-label="Schließen"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            {children && (
              <div className="px-6 py-5 text-foreground">
                {children}
              </div>
            )}

            {/* Footer */}
            {footer && (
              <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-3 border-t border-border/50">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
