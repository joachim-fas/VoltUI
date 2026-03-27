/**
 * GrainProgress & GrainSlider – Grain UI
 * Hauptfarben: #E4FF97 Neon Yellow + #000000 Black
 * Design: Raffiniert, dünn, präzise
 */

import React, { useCallback } from "react";
import { cn } from "@/lib/utils";

const FILL_COLORS: Record<string, string> = {
  default:  "#000000",
  lime:     "#E4FF97",
  primary:  "#E4FF97",
  positive: "#1A9E5A",
  negative: "#E8402A",
  neutral:  "#6B7A9A",
  /* Legacy */
  blue:     "#000000",
  red:      "#E8402A",
  gradient: "#E4FF97",
  violet:   "#1A1A1A",
  coral:    "#E4FF97",
};

const TRACK_BG = "#EBEBEB";

const SIZE_H: Record<string, string> = {
  xs: "h-px",
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
  xl: "h-3",
};

/* ── GrainProgress ── */
export interface GrainProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: keyof typeof FILL_COLORS;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

export const GrainProgress = React.forwardRef<HTMLDivElement, GrainProgressProps>(
  ({ value = 0, max = 100, variant = "default", size = "md", label, showValue, animated, className, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    const fillColor = FILL_COLORS[variant] ?? "#000000";

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-baseline mb-2">
            {label && <span className="text-xs font-ui font-semibold tracking-wide text-foreground">{label}</span>}
            {showValue && <span className="text-xs font-mono text-muted-foreground tabular-nums">{Math.round(pct)}%</span>}
          </div>
        )}
        <div
          className={cn("w-full rounded-full overflow-hidden", SIZE_H[size])}
          style={{ background: TRACK_BG }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn("h-full rounded-full transition-all duration-600 ease-out", animated && "animate-pulse")}
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
  variant?: keyof typeof FILL_COLORS;
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
  const [internalValue, setInternalValue] = React.useState<number>(Number(value ?? defaultValue ?? 50));
  const current = value !== undefined ? Number(value) : internalValue;
  const min = Number(props.min ?? 0);
  const max = Number(props.max ?? 100);
  const pct = ((current - min) / (max - min)) * 100;
  const color = FILL_COLORS[variant] ?? "#000000";
  const uid = React.useId().replace(/:/g, "");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(Number(e.target.value));
    (onChange as any)?.(e);
  }, [onChange]);

  const thumbD = sliderSize === "sm" ? "10px" : sliderSize === "lg" ? "18px" : "14px";
  const trackH = sliderSize === "sm" ? "2px" : sliderSize === "lg" ? "4px" : "3px";

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-baseline mb-2.5">
          {label && <span className="text-xs font-ui font-semibold tracking-wide text-foreground">{label}</span>}
          {showValue && <span className="text-xs font-mono text-muted-foreground tabular-nums">{current}</span>}
        </div>
      )}
      <style>{`
        .gs-${uid}::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: ${thumbD}; height: ${thumbD};
          border-radius: 50%;
          background: ${color};
          border: ${color === "#E4FF97" ? "1.5px solid #C8F060" : "1.5px solid rgba(255,255,255,0.8)"};
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .gs-${uid}::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .gs-${uid}::-moz-range-thumb {
          width: ${thumbD}; height: ${thumbD};
          border-radius: 50%;
          background: ${color};
          border: none;
          cursor: pointer;
        }
        .gs-${uid}::-webkit-slider-runnable-track {
          height: ${trackH};
          border-radius: 99px;
        }
      `}</style>
      <div className="relative flex items-center" style={{ height: `${thumbD}` }}>
        <div className="absolute inset-x-0 rounded-full" style={{ height: trackH, background: TRACK_BG, top: "50%", transform: "translateY(-50%)" }} />
        <div className="absolute left-0 rounded-full" style={{ height: trackH, width: `${pct}%`, background: color, top: "50%", transform: "translateY(-50%)" }} />
        <input
          type="range"
          value={current}
          min={min}
          max={max}
          onChange={handleChange}
          className={cn(`gs-${uid}`, "relative w-full appearance-none bg-transparent cursor-pointer z-10")}
          style={{ height: thumbD }}
          {...props}
        />
      </div>
    </div>
  );
};
