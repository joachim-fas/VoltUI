/**
 * VoltStat / VoltKPI – Atmospheric Volt UI Design System
 * Kennzahlen-Karten für Dashboards.
 * Farbsystem: Lime+Schwarz primär, Pastell sekundär, Signale für Trends
 */

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface VoltStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  variant?: "default" | "lime" | "solid" | "positive" | "negative";
  size?: "sm" | "md" | "lg";
}

export const VoltStat: React.FC<VoltStatProps> = ({
  label,
  value,
  unit,
  change,
  changeLabel,
  icon,
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const trendColor = isPositive
    ? "text-[#1A9E5A]"
    : isNegative
    ? "text-[#E8402A]"
    : "text-muted-foreground";

  /* ── Varianten-Stile ── */
  const variantStyles: Record<string, string> = {
    default:  "bg-card border border-border",
    lime:     "bg-[#E4FF97] border-transparent",   // Lime: schwarzer Text
    solid:    "bg-[#000000] border-transparent",    // Schwarz: weißer Text
    positive: "bg-[#E8F8EF] border border-[#7DD4A8]",
    negative: "bg-[#FDEEE9] border border-[#F4A090]",
    blue:     "bg-[#000000] border-transparent",
    red:      "bg-[#E8402A] border-transparent",
    gradient: "bg-[#E4FF97] border-transparent",
  };

  /* ── Textfarben je Variante ── */
  const labelColor: Record<string, string> = {
    default:  "text-muted-foreground",
    lime:     "text-[#3A3A3A]",
    solid:    "text-white/70",
    positive: "text-[#0F6038]",
    negative: "text-[#A01A08]",
    blue:     "text-white/70",
    red:      "text-white/70",
    gradient: "text-[#3A3A3A]",
  };

  const valueColor: Record<string, string> = {
    default:  "text-foreground",
    lime:     "text-[#000000]",
    solid:    "text-white",
    positive: "text-[#0F6038]",
    negative: "text-[#A01A08]",
    blue:     "text-white",
    red:      "text-white",
    gradient: "text-[#000000]",
  };

  const unitColor: Record<string, string> = {
    default:  "text-muted-foreground",
    lime:     "text-[#3A3A3A]",
    solid:    "text-white/70",
    positive: "text-[#1A9E5A]/70",
    negative: "text-[#E8402A]/70",
    blue:     "text-white/70",
    red:      "text-white/70",
    gradient: "text-[#3A3A3A]",
  };

  const trendColorVariant: Record<string, string> = {
    default:  trendColor,
    lime:     isPositive ? "text-[#1A5A00]" : isNegative ? "text-[#8B1A00]" : "text-[#3A3A3A]",
    solid:    "text-white/80",
    positive: "text-[#0F6038]",
    negative: "text-[#A01A08]",
    blue:     "text-white/80",
    red:      "text-white/80",
    gradient: isPositive ? "text-[#1A5A00]" : isNegative ? "text-[#8B1A00]" : "text-[#3A3A3A]",
  };

  const iconBg: Record<string, string> = {
    default:  "bg-[#E4FF97]/40 text-[#000000]",
    lime:     "bg-[#000000]/10 text-[#000000]",
    solid:    "bg-white/15 text-white",
    positive: "bg-[#1A9E5A]/15 text-[#0F6038]",
    negative: "bg-[#E8402A]/15 text-[#A01A08]",
    blue:     "bg-white/15 text-white",
    red:      "bg-white/15 text-white",
    gradient: "bg-[#000000]/10 text-[#000000]",
  };

  const valueSizes = { sm: "text-2xl", md: "text-3xl", lg: "text-4xl" };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 volt-texture overflow-hidden",
        "transition-all duration-300 hover:-translate-y-0.5",
        "ring-1 ring-border hover:ring-[#E4FF97]/40",
        variantStyles[variant] ?? variantStyles.default,
        className
      )}
      {...props}
    >
      {/* Subtle radial highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(228,255,151,0.06) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={cn("section-label mb-2", labelColor[variant] ?? labelColor.default)}>
            {label}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn(
              "font-display font-bold leading-none tracking-tight",
              valueSizes[size],
              valueColor[variant] ?? valueColor.default
            )}>
              {value}
            </span>
            {unit && (
              <span className={cn(
                "text-sm font-body font-semibold",
                unitColor[variant] ?? unitColor.default
              )}>
                {unit}
              </span>
            )}
          </div>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 mt-2",
              trendColorVariant[variant] ?? trendColor
            )}>
              <TrendIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold font-body">
                {isPositive ? "+" : ""}{change}%
                {changeLabel && <span className="font-normal opacity-70 ml-1">{changeLabel}</span>}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            iconBg[variant] ?? iconBg.default
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
