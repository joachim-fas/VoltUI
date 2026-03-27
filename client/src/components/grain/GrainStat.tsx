/**
 * GrainStat / GrainKPI – Atmospheric Grain Design System
 * Kennzahlen-Karten für Dashboards.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface GrainStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  variant?: "default" | "lime" | "solid" | "positive" | "negative";
  size?: "sm" | "md" | "lg";
}

export const GrainStat: React.FC<GrainStatProps> = ({
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
  const isNeutral  = change !== undefined && change === 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const trendColor = isPositive
    ? "text-[#1A9E5A]"
    : isNegative
    ? "text-[#E8402A]"
    : "text-muted-foreground";

  const variantStyles: Record<string, string> = {
    default:  "bg-card border border-border",
    lime:     "bg-[#E4FF97] text-[#000000] border-transparent",
    solid:    "bg-[#000000] text-white border-transparent",
    positive: "bg-[#E8F8EF] text-[#0F6038] border border-[#7DD4A8]",
    negative: "bg-[#FDEEE9] text-[#A01A08] border border-[#F4A090]",
    // Legacy-Aliase
    blue:     "bg-[#000000] text-white border-transparent",
    red:      "bg-[#E8402A] text-white border-transparent",
    gradient: "bg-[#E4FF97] text-[#000000] border-transparent",
  };

  const isColored = variant !== "default";
  const valueSizes = { sm: "text-2xl", md: "text-3xl", lg: "text-4xl" };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 grain overflow-hidden",
        "transition-all duration-300 hover:-translate-y-0.5",
        "ring-1 ring-border hover:ring-primary/20",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Subtle radial highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: isColored
            ? "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(228,255,151,0.06) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={cn(
            "section-label mb-2",
            isColored ? "text-white/70" : "text-muted-foreground"
          )}>
            {label}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn(
              "font-display font-bold leading-none tracking-tight",
              valueSizes[size],
              isColored ? "text-white" : "text-foreground"
            )}>
              {value}
            </span>
            {unit && (
              <span className={cn(
                "text-sm font-body font-semibold",
                isColored ? "text-white/70" : "text-muted-foreground"
              )}>
                {unit}
              </span>
            )}
          </div>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 mt-2",
              isColored ? "text-white/80" : trendColor
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
            isColored
              ? "bg-white/15"
              : "bg-primary/10 text-primary"
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
