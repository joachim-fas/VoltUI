/**
 * VoltAlert – Atmospheric Volt UI Design System
 * Benachrichtigungs-Komponente mit Volt-Textur.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

const alertConfig: Record<AlertVariant, {
  icon: React.ElementType;
  bg: string;
  border: string;
  iconColor: string;
  titleColor: string;
}> = {
  info: {
    icon: Info,
    bg: "bg-[var(--signal-neutral-light)]",
    border: "border-[var(--signal-neutral-border)]",
    iconColor: "text-[var(--signal-neutral-text)]",
    titleColor: "text-[var(--signal-neutral-text)]",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-[var(--signal-positive-light)]",
    border: "border-[var(--signal-positive-border)]",
    iconColor: "text-[var(--signal-positive)]",
    titleColor: "text-[var(--signal-positive-text)]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-700",
    titleColor: "text-amber-800",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-[var(--signal-negative-light)]",
    border: "border-[var(--signal-negative-border)]",
    iconColor: "text-[var(--signal-negative)]",
    titleColor: "text-[var(--signal-negative-text)]",
  },
};

export interface VoltAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const VoltAlert = React.forwardRef<HTMLDivElement, VoltAlertProps>(
  ({ className, variant = "info", title, dismissible, onDismiss, children, ...props }, ref) => {
    const config = alertConfig[variant];
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex gap-3 rounded-xl border p-4 volt-texture overflow-hidden",
          config.bg,
          config.border,
          className
        )}
        {...props}
      >
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5 relative z-10", config.iconColor)} />
        <div className="flex-1 min-w-0 relative z-10">
          {title && (
            <p className={cn("font-semibold text-sm font-body mb-0.5", config.titleColor)}>
              {title}
            </p>
          )}
          <div className="text-sm text-muted-foreground font-body leading-relaxed">
            {children}
          </div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className={cn(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-black/8 transition-colors relative z-10"
            )}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }
);
VoltAlert.displayName = "VoltAlert";
