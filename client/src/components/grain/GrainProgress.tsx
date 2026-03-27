/**
 * GrainProgress & GrainSlider – Grain UI
 * Lime (#E4FF97) + Schwarz (#0A0A0A) + Signalfarben
 * Kein oklch, kein Violett, kein Blau
 */

import React, { useCallback } from "react";
import { cn } from "@/lib/utils";

/* ── Farbmap ── */
const FILL_COLORS: Record<string, string> = {
  default:  "#0A0A0A",
  lime:     "#E4FF97",
  positive: "#1A9E5A",
  negative: "#E8402A",
  neutral:  "#6B7A9A",
  /* Legacy-Aliase */
  blue:     "#0A0A0A",
  red:      "#E8402A",
  gradient: "#E4FF97",
  violet:   "#1A1A1A",
  coral:    "#E4FF97",
};

const SIZE_H: Record<string, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
  xl: "h-5",
};

/* ── GrainProgress ── */
export interface GrainProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "lime" | "positive" | "negative" | "neutral" | "blue" | "red" | "gradient" | "violet" | "coral";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

export const GrainProgress = React.forwardRef<HTMLDivElement, GrainProgressProps>(
  ({ value = 0, max = 100, variant = "default", size = "md", label, showValue, animated, className, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    const fillColor = FILL_COLORS[variant] ?? "#0A0A0A";
    const textColor = variant === "lime" ? "#0A0A0A" : "#FFFFFF";

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-1.5">
            {label && <span className="text-sm font-semibold font-ui text-[#0A0A0A]">{label}</span>}
            {showValue && <span className="text-xs font-mono text-[#6B6B6B]">{Math.round(pct)}%</span>}
          </div>
        )}
        <div
          className={cn("w-full rounded-full overflow-hidden bg-[#F4F4F4]", SIZE_H[size])}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn("h-full rounded-full transition-all duration-500 ease-out", animated && "animate-pulse")}
            style={{ width: `${pct}%`, background: fillColor }}
          />
        </div>
      </div>
    );
  }
);
GrainProgress.displayName = "GrainProgress";

/* ── GrainSlider ── */
export interface GrainSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "lime" | "positive" | "negative" | "neutral" | "blue" | "red" | "gradient";
  sliderSize?: "sm" | "md" | "lg";
  label?: string;
  showValue?: boolean;
}

export const GrainSlider: React.FC<GrainSliderProps> = ({
  variant = "default",
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
  const color = FILL_COLORS[variant] ?? "#0A0A0A";

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(Number(e.target.value));
    (onChange as any)?.(e);
  }, [onChange]);

  const thumbSize = sliderSize === "sm" ? "12px" : sliderSize === "lg" ? "20px" : "16px";

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-semibold font-ui text-[#0A0A0A]">{label}</span>}
          {showValue && <span className="text-xs font-mono text-[#6B6B6B]">{current}</span>}
        </div>
      )}
      <style>{`
        .grain-slider-${variant}::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: ${thumbSize}; height: ${thumbSize};
          border-radius: 50%;
          background: ${color};
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.15s;
        }
        .grain-slider-${variant}::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .grain-slider-${variant}::-moz-range-thumb {
          width: ${thumbSize}; height: ${thumbSize};
          border-radius: 50%;
          background: ${color};
          border: 2px solid white;
          cursor: pointer;
        }
      `}</style>
      <div className="relative flex items-center">
        <div className="absolute inset-0 h-2 rounded-full bg-[#F4F4F4] my-auto" />
        <div className="absolute left-0 h-2 rounded-full my-auto" style={{ width: `${pct}%`, background: color }} />
        <input
          type="range"
          value={current}
          min={min}
          max={max}
          onChange={handleChange}
          className={cn(
            `grain-slider-${variant}`,
            "relative w-full appearance-none bg-transparent cursor-pointer",
            sliderSize === "sm" ? "h-1" : sliderSize === "lg" ? "h-3" : "h-2",
          )}
          {...props}
        />
      </div>
    </div>
  );
};
