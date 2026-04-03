/**
 * VoltTrendCard – Kompakte Trend-Karte
 * Zeigt: Titel (truncated), Richtungspfeil, Status-Badge, Kategorie-Label, Signale + Konfidenz
 */

import React from "react";
import { ArrowUp, ArrowDown, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoltBadge } from "./VoltBadge";

export type TrendDirection = "up" | "down" | "stable";
export type TrendStatus = "trial" | "assess" | "hold" | "adopt" | "mega";

interface VoltTrendCardProps {
  title: string;
  category?: "MAKRO" | "MEGA";
  status: TrendStatus;
  direction?: TrendDirection;
  signals?: number;
  confidence?: number;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const STATUS_COLORS: Record<TrendStatus, string> = {
  trial:  "bg-[#3B82F6] text-white",
  assess: "bg-[#F59E0B] text-white",
  hold:   "bg-[#EF4444] text-white",
  adopt:  "bg-[#10B981] text-white",
  mega:   "bg-[#8B5CF6] text-white",
};

const DIRECTION_COLORS: Record<TrendDirection, string> = {
  up:     "text-[#10B981]",
  down:   "text-[#EF4444]",
  stable: "text-[#9CA3AF]",
};

export const VoltTrendDirection: React.FC<{ direction: TrendDirection; className?: string }> = ({
  direction,
  className,
}) => {
  const color = DIRECTION_COLORS[direction];
  return (
    <span className={cn("flex-shrink-0", color, className)}>
      {direction === "up"     && <ArrowUp className="w-3.5 h-3.5" />}
      {direction === "down"   && <ArrowDown className="w-3.5 h-3.5" />}
      {direction === "stable" && <ArrowRight className="w-3.5 h-3.5" />}
    </span>
  );
};

export const VoltStatusDot: React.FC<{
  label: string;
  count?: number;
  color?: string;
  className?: string;
}> = ({ label, count, color = "#9CA3AF", className }) => (
  <div className={cn("flex items-center gap-2 py-2", className)}>
    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
    <span className="text-xs font-mono font-semibold text-muted-foreground tracking-widest uppercase">
      {label}{count !== undefined ? ` (${count})` : ""}
    </span>
  </div>
);

export const VoltSignalBar: React.FC<{
  direction?: TrendDirection;
  className?: string;
}> = ({ direction = "stable", className }) => {
  const color =
    direction === "up"     ? "bg-[#EF4444]" :
    direction === "down"   ? "bg-[#6B7280]" :
    "bg-[#D97706]";
  return (
    <div className={cn("w-8 h-1.5 rounded-full flex-shrink-0", color, className)} />
  );
};

export const VoltTrendCard: React.FC<VoltTrendCardProps> = ({
  title,
  category = "MAKRO",
  status,
  direction = "stable",
  signals,
  confidence,
  onClick,
  active = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl border px-4 py-3 transition-all group",
        "hover:border-foreground/30 hover:shadow-sm",
        active
          ? "border-foreground bg-foreground/5"
          : "border-border bg-background",
        className
      )}
    >
      {/* Header: Titel + Pfeil */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-body font-medium text-sm text-foreground leading-snug line-clamp-2 flex-1">
          {title}
        </span>
        <VoltTrendDirection direction={direction} className="mt-0.5" />
      </div>

      {/* Footer: Kategorie + Status + Signale */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-mono font-semibold text-muted-foreground tracking-widest">
          {category}
        </span>
        <span
          className={cn(
            "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-semibold",
            STATUS_COLORS[status]
          )}
        >
          {status}
        </span>
        {signals !== undefined && (
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">
            {signals} sig.
          </span>
        )}
        {confidence !== undefined && (
          <span className="text-[10px] font-mono text-muted-foreground">
            {confidence}%
          </span>
        )}
      </div>
    </button>
  );
};

export default VoltTrendCard;
