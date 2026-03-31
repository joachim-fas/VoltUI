/**
 * VoltProgress & VoltSlider – Volt UI
 * Hauptfarben: #E4FF97 Neon Yellow + #000000 Black
 * Design: Raffiniert, dünn, präzise
 *
 * VoltSlider: Kein nackter Kreis auf dünner Linie.
 * Stattdessen: dicker Pill-Track (8px), abgerundeter Thumb mit Inset-Ring,
 * Filled-Track zeigt Fortschritt, Hover-State mit Glow.
 */

import React, { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const FILL_COLORS: Record<string, string> = {
  default:  "var(--foreground)",
  lime:     "var(--neon-yellow)",
  primary:  "var(--neon-yellow)",
  positive: "var(--signal-positive)",
  negative: "var(--signal-negative)",
  neutral:  "var(--signal-neutral)",
  blue:     "var(--foreground)",
  red:      "var(--signal-negative)",
  gradient: "var(--neon-yellow)",
  violet:   "var(--ink-soft)",
  coral:    "var(--neon-yellow)",
};

const TRACK_BG = "var(--border)";

const SIZE_H: Record<string, string> = {
  xs: "h-px",
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
  xl: "h-3",
};

/* ── VoltProgress ── */
export interface VoltProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: keyof typeof FILL_COLORS;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

export const VoltProgress = React.forwardRef<HTMLDivElement, VoltProgressProps>(
  ({ value = 0, max = 100, variant = "default", size = "md", label, showValue, animated, className, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    const fillColor = FILL_COLORS[variant] ?? "#0A0A0A";

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
VoltProgress.displayName = "VoltProgress";

/* ── VoltSlider ── */
export interface VoltSliderProps {
  variant?: keyof typeof FILL_COLORS;
  sliderSize?: "sm" | "md" | "lg";
  label?: string;
  showValue?: boolean;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export const VoltSlider: React.FC<VoltSliderProps> = ({
  variant = "default",
  sliderSize = "md",
  label,
  showValue,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState<number>(value ?? defaultValue ?? 50);
  const current = value !== undefined ? value : internalValue;
  const pct = ((current - min) / (max - min)) * 100;
  const color = FILL_COLORS[variant] ?? "#0A0A0A";
  const trackRef = useRef<HTMLDivElement>(null);

  // Größen-Definitionen
  const sizes = {
    sm: { track: 6,  thumb: 18, thumbBorder: 2, ring: 4 },
    md: { track: 8,  thumb: 24, thumbBorder: 2, ring: 5 },
    lg: { track: 10, thumb: 30, thumbBorder: 3, ring: 6 },
  };
  const sz = sizes[sliderSize];

  // Thumb-Farbe: bei Lime-Hintergrund schwarzer Kern, sonst CSS-Variable für Dark-Mode-Sicherheit
  const isLime = color === "var(--neon-yellow)" || variant === "lime" || variant === "primary" || variant === "gradient" || variant === "coral";
  const thumbInnerColor = isLime ? "#000000" : "var(--background)";
  const thumbBorderColor = isLime ? "rgba(0,0,0,0.15)" : "var(--border)";
  const glowColor = isLime ? "rgba(228,255,151,0.4)" : color + "40";

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || !(e.buttons & 1)) return;
    const rect = trackRef.current.getBoundingClientRect();
    const raw = (e.clientX - rect.left) / rect.width;
    const clamped = Math.min(1, Math.max(0, raw));
    const newVal = Math.round((min + clamped * (max - min)) / step) * step;
    setInternalValue(newVal);
    onChange?.(newVal);
  }, [min, max, step, onChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e);
  }, [handlePointerMove]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = current;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(max, current + step);
    if (e.key === "ArrowLeft"  || e.key === "ArrowDown") next = Math.max(min, current - step);
    if (e.key === "Home") next = min;
    if (e.key === "End")  next = max;
    if (next !== current) {
      e.preventDefault();
      setInternalValue(next);
      onChange?.(next);
    }
  }, [current, min, max, step, onChange]);

  const uid = React.useId().replace(/:/g, "");

  return (
    <div className={cn("w-full select-none", disabled && "opacity-40 pointer-events-none", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-baseline mb-3">
          {label && <span className="text-xs font-ui font-semibold tracking-wide text-foreground">{label}</span>}
          {showValue && (
            <span className="text-xs font-mono tabular-nums px-2 py-0.5 rounded-md"
              style={{ background: color, color: thumbInnerColor, fontWeight: 600 }}>
              {current}
            </span>
          )}
        </div>
      )}

      {/* Slider-Container */}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-label={label}
        className="relative flex items-center cursor-pointer focus:outline-none group"
        style={{ height: sz.thumb + 8 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
      >
        {/* Track Hintergrund */}
        <div
          className="absolute inset-x-0 rounded-full"
          style={{
            height: sz.track,
            background: TRACK_BG,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Track Filled */}
        <div
          className="absolute left-0 rounded-full transition-all duration-75"
          style={{
            height: sz.track,
            width: `${pct}%`,
            background: color,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Tick-Markierungen (bei sm weglassen) */}
        {sliderSize !== "sm" && [0, 25, 50, 75, 100].map(tick => (
          <div
            key={tick}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 2,
              height: sz.track * 0.6,
              /* Tick auf gefülltem Track: immer halbtransparent heller Kontrast
                 Tick auf leerem Track: immer halbtransparent dunkler Kontrast
                 → funktioniert in Light und Dark durch Mischung */
              background: tick <= pct ? "rgba(255,255,255,0.45)" : "var(--border)",
              left: `${tick}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: tick === 0 || tick === 100 ? 0 : 1,
            }}
          />
        ))}

        {/* Thumb */}
        <div
          className="absolute pointer-events-none transition-transform duration-100 group-hover:scale-110 group-focus:scale-110"
          style={{
            width: sz.thumb,
            height: sz.thumb,
            left: `${pct}%`,
            top: "50%",
            transform: `translate(-50%, -50%) scale(1)`,
            borderRadius: "50%",
            background: color,
            border: `${sz.thumbBorder}px solid ${thumbBorderColor}`,
            boxShadow: `0 2px 8px rgba(0,0,0,0.18), 0 0 0 0 ${glowColor}`,
            transition: "box-shadow 0.15s ease, transform 0.1s ease",
          }}
        >
          {/* Innerer Kern-Punkt */}
          <div
            style={{
              position: "absolute",
              width: sz.ring,
              height: sz.ring,
              borderRadius: "50%",
              background: thumbInnerColor,
              opacity: 0.7,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Hover-Glow Ring (CSS-only via style tag) */}
        <style>{`
          .gs-track-${uid}:focus .gs-thumb-${uid},
          .gs-track-${uid}:hover .gs-thumb-${uid} {
            box-shadow: 0 2px 8px rgba(0,0,0,0.18), 0 0 0 6px ${glowColor} !important;
          }
        `}</style>
      </div>
    </div>
  );
};
