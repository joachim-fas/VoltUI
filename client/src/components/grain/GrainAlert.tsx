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
    bg: "bg-[#F0F2F7]",
    border: "border-[#B0BACC]",
    iconColor: "text-[#3A4560]",
    titleColor: "text-[#1A2030]",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-[#E8F8EF]",
    border: "border-[#7DD4A8]",
    iconColor: "text-[#1A9E5A]",
    titleColor: "text-[#0F6038]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[#FFF8E8]",
    border: "border-[#F0D080]",
    iconColor: "text-[#C87A00]",
    titleColor: "text-[#7A4A00]",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-[#FDEEE9]",
    border: "border-[#F4A090]",
    iconColor: "text-[#E8402A]",
    titleColor: "text-[#A01A08]",
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
