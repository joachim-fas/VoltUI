/**
 * GrainAlert – Atmospheric Grain Design System
 * Benachrichtigungs-Komponente mit Grain-Textur.
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
    bg: "bg-[oklch(0.42_0.22_268/0.08)]",
    border: "border-[oklch(0.42_0.22_268/0.25)]",
    iconColor: "text-[oklch(0.42_0.22_268)]",
    titleColor: "text-[oklch(0.30_0.18_268)]",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-[oklch(0.55_0.18_145/0.08)]",
    border: "border-[oklch(0.55_0.18_145/0.25)]",
    iconColor: "text-[oklch(0.50_0.18_145)]",
    titleColor: "text-[oklch(0.35_0.15_145)]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[oklch(0.75_0.18_75/0.10)]",
    border: "border-[oklch(0.75_0.18_75/0.30)]",
    iconColor: "text-[oklch(0.65_0.18_75)]",
    titleColor: "text-[oklch(0.45_0.15_75)]",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-[oklch(0.52_0.26_27/0.08)]",
    border: "border-[oklch(0.52_0.26_27/0.25)]",
    iconColor: "text-[oklch(0.52_0.26_27)]",
    titleColor: "text-[oklch(0.40_0.22_27)]",
  },
};

export interface GrainAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const GrainAlert = React.forwardRef<HTMLDivElement, GrainAlertProps>(
  ({ className, variant = "info", title, dismissible, onDismiss, children, ...props }, ref) => {
    const config = alertConfig[variant];
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex gap-3 rounded-xl border p-4 grain overflow-hidden",
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
GrainAlert.displayName = "GrainAlert";
