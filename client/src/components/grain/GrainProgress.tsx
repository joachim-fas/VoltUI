/**
 * GrainProgress / GrainSlider – Atmospheric Grain Design System
 * Fortschritts- und Schieberegler-Komponenten.
 */

import React from "react";
import { cn } from "@/lib/utils";

/* ── GrainProgress ── */
export interface GrainProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "blue" | "red" | "gradient" | "violet" | "coral";
  size?: "sm" | "md" | "lg";
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

const trackBg = "bg-muted";
const fillVariants: Record<string, string> = {
  blue:     "bg-grain-blue",
  red:      "bg-grain-red",
  gradient: "bg-[linear-gradient(90deg,oklch(0.42_0.22_268),oklch(0.52_0.26_27))]",
  violet:   "bg-grain-violet",
  coral:    "bg-grain-coral",
};
const sizeH: Record<string, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export const GrainProgress: React.FC<GrainProgressProps> = ({
  value = 0,
  max = 100,
  variant = "gradient",
  size = "md",
  label,
  showValue,
  animated,
  className,
  ...props
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-semibold font-body text-foreground">{label}</span>}
          {showValue && <span className="text-xs font-mono text-muted-foreground">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full overflow-hidden grain",
          trackBg,
          sizeH[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            fillVariants[variant],
            animated && "animate-pulse"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* ── GrainSlider ── */
export interface GrainSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "blue" | "red" | "gradient";
  sliderSize?: "sm" | "md" | "lg";
  label?: string;
  showValue?: boolean;
}

export const GrainSlider: React.FC<GrainSliderProps> = ({
  variant = "gradient",
  sliderSize = "md",
  label,
  showValue,
  value,
  defaultValue,
  onChange,
  className,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState<number>(
    Number(value ?? defaultValue ?? 50)
  );
  const current = value !== undefined ? Number(value) : internalValue;
  const min = Number(props.min ?? 0);
  const max = Number(props.max ?? 100);
  const pct = ((current - min) / (max - min)) * 100;

  const trackColors: Record<string, string> = {
    blue:     "oklch(0.42 0.22 268)",
    red:      "oklch(0.52 0.26 27)",
    gradient: "oklch(0.42 0.22 268)",
  };
  const thumbColor = trackColors[variant];

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-semibold font-body text-foreground">{label}</span>}
          {showValue && <span className="text-xs font-mono text-muted-foreground">{current}</span>}
        </div>
      )}
      <div className="relative flex items-center">
        <input
          type="range"
          value={current}
          min={min}
          max={max}
          onChange={(e) => {
            setInternalValue(Number(e.target.value));
            onChange?.(e);
          }}
          className={cn(
            "w-full appearance-none cursor-pointer",
            sliderSize === "sm" ? "h-1" : sliderSize === "lg" ? "h-3" : "h-2",
            "[&::-webkit-slider-runnable-track]:rounded-full",
            "[&::-webkit-slider-runnable-track]:h-full",
            "[&::-webkit-slider-thumb]:appearance-none",
            sliderSize === "sm"
              ? "[&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3"
              : sliderSize === "lg"
              ? "[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5"
              : "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:-mt-1",
            "[&::-webkit-slider-thumb]:shadow-[0_1px_6px_oklch(0_0_0/0.25)]",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-webkit-slider-thumb]:active:scale-95",
          )}
          style={{
            background: variant === "gradient"
              ? `linear-gradient(to right, oklch(0.42 0.22 268) 0%, oklch(0.52 0.26 27) ${pct}%, oklch(0.88 0.015 268) ${pct}%, oklch(0.88 0.015 268) 100%)`
              : `linear-gradient(to right, ${thumbColor} ${pct}%, oklch(0.88 0.015 268) ${pct}%)`,
            ["--thumb-color" as string]: thumbColor,
          } as React.CSSProperties}
          {...props}
        />
      </div>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          background: var(--thumb-color, oklch(0.42 0.22 268));
          border: 2px solid white;
          box-shadow: 0 1px 6px oklch(0 0 0 / 0.25);
        }
        input[type="range"]::-moz-range-thumb {
          background: var(--thumb-color, oklch(0.42 0.22 268));
          border: 2px solid white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
