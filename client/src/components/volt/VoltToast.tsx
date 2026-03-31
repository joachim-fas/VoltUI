/**
 * VoltToast / VoltTooltip – Atmospheric Volt UI Design System
 * Benachrichtigungs- und Tooltip-Komponenten.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── VoltToast ── */
export type ToastVariant = "success" | "error" | "info" | "warning";

export interface VoltToastItem {
  id: string;
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

const toastConfig: Record<ToastVariant, {
  icon: React.ElementType;
  accent: string;
  iconColor: string;
}> = {
  success: {
    icon: CheckCircle2,
    accent: "bg-[var(--signal-positive)]",
    iconColor: "text-[var(--signal-positive)]",
  },
  error: {
    icon: AlertCircle,
    accent: "bg-[var(--signal-negative)]",
    iconColor: "text-[var(--signal-negative)]",
  },
  info: {
    icon: Info,
    accent: "bg-[var(--signal-neutral)]",
    iconColor: "text-[var(--signal-neutral)]",
  },
  warning: {
    icon: AlertTriangle,
    accent: "bg-amber-500",
    iconColor: "text-amber-600",
  },
};

interface VoltToastItemProps {
  toast: VoltToastItem;
  onDismiss: (id: string) => void;
}

const VoltToastItem: React.FC<VoltToastItemProps> = ({ toast, onDismiss }) => {
  const config = toastConfig[toast.variant ?? "info"];
  const Icon = config.icon;

  React.useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={cn(
        "relative flex items-start gap-3 w-80 rounded-xl overflow-hidden volt-texture",
        "glass-strong ring-1 ring-border/40",
        "p-4"
      )}
    >
      {/* Left accent bar */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", config.accent)} />

      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5 relative z-10", config.iconColor)} />
      <div className="flex-1 min-w-0 relative z-10">
        <p className="font-semibold text-sm font-body text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors relative z-10"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};

/* ── Toast Container ── */
export interface VoltToastContainerProps {
  toasts: VoltToastItem[];
  onDismiss: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const positionClasses: Record<string, string> = {
  "top-right":    "top-4 right-4 items-end",
  "top-left":     "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left":  "bottom-4 left-4 items-start",
  "top-center":   "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center":"bottom-4 left-1/2 -translate-x-1/2 items-center",
};

export const VoltToastContainer: React.FC<VoltToastContainerProps> = ({
  toasts,
  onDismiss,
  position = "bottom-right",
}) => {
  return (
    <div
      className={cn(
        "fixed z-[100] flex flex-col gap-2 pointer-events-none",
        positionClasses[position]
      )}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <VoltToastItem toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ── useVoltToast Hook ── */
export function useVoltToast() {
  const [toasts, setToasts] = React.useState<VoltToastItem[]>([]);

  const add = React.useCallback((toast: Omit<VoltToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, add, dismiss };
}

/* ── VoltTooltip ── */
export interface VoltTooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export const VoltTooltip: React.FC<VoltTooltipProps> = ({
  content,
  children,
  side = "top",
  delay = 400,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const offsetClasses: Record<string, string> = {
    top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left:   "right-full top-1/2 -translate-y-1/2 mr-2",
    right:  "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.12 }}
            className={cn(
              "absolute z-50 pointer-events-none",
              "px-2.5 py-1.5 rounded-lg",
              "glass-strong ring-1 ring-border/30",
              "text-xs font-semibold font-body text-foreground whitespace-nowrap",
              offsetClasses[side]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
