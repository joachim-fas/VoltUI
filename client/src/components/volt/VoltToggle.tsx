/**
 * VoltToggle / VoltCheckbox / VoltRadio – Volt UI
 * KONTRAST-GARANTIE: Alle Farben über CSS-Variablen.
 * Light: text-foreground = #000000 auf #FFFFFF → 21:1
 * Dark:  text-foreground = #F5F5F5 auf #000000 → 19:1
 * Inaktive Borders: --input (#E8E8E8 light / #2A2A2A dark) → sichtbar in beiden Modi
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

const cssVar = (name: string) => `var(${name})`;

/* ── Aktive Track/Fill-Farben ── */
const TRACK_ON_COLOR: Record<string, string> = {
  default:  cssVar("--foreground"),
  primary:  cssVar("--neon-yellow"),
  positive: cssVar("--signal-positive"),
  negative: cssVar("--signal-negative"),
  neutral:  cssVar("--signal-neutral"),
};

/* Thumb: immer kontrastreich zum Track-Hintergrund */
const THUMB_COLOR: Record<string, string> = {
  default:  cssVar("--background"),   /* weiß auf schwarz (light) / schwarz auf weiß (dark) */
  primary:  "#000000",                /* schwarz auf Lime – immer */
  positive: cssVar("--background"),
  negative: cssVar("--background"),
  neutral:  cssVar("--background"),
};

const FILL_BG: Record<string, string> = {
  default:  cssVar("--foreground"),
  primary:  cssVar("--neon-yellow"),
  positive: cssVar("--signal-positive"),
  negative: cssVar("--signal-negative"),
  neutral:  cssVar("--signal-neutral"),
};

/* Icon-Farbe auf gefülltem Hintergrund */
const FILL_ICON: Record<string, string> = {
  default:  cssVar("--background"),
  primary:  "#000000",
  positive: cssVar("--background"),
  negative: cssVar("--background"),
  neutral:  cssVar("--background"),
};

const TOGGLE_SIZES = {
  sm: { trackW: 28, trackH: 16, thumbSize: 10, thumbOnX: 14, thumbOffX: 3 },
  md: { trackW: 44, trackH: 24, thumbSize: 16, thumbOnX: 24, thumbOffX: 4 },
  lg: { trackW: 56, trackH: 30, thumbSize: 20, thumbOnX: 32, thumbOffX: 5 },
};

/* ════════════════════════════════════════════════
   VoltToggle
════════════════════════════════════════════════ */
export interface VoltToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: keyof typeof TRACK_ON_COLOR;
  toggleSize?: "sm" | "md" | "lg";
}

export const VoltToggle: React.FC<VoltToggleProps> = ({
  label,
  description,
  variant = "default",
  toggleSize = "md",
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  id,
  ...props
}) => {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isChecked = checked !== undefined ? checked : internal;
  const toggleId  = id || React.useId();
  const sz        = TOGGLE_SIZES[toggleSize];

  /*
   * Inaktiver Track: --input ist #E8E8E8 (light) und #2A2A2A (dark)
   * → sichtbar in beiden Modi, klar unterscheidbar vom Hintergrund
   */
  const trackColor = isChecked
    ? (TRACK_ON_COLOR[variant] ?? cssVar("--foreground"))
    : cssVar("--input");
  const thumbColor = isChecked
    ? (THUMB_COLOR[variant] ?? cssVar("--background"))
    : cssVar("--background");
  const thumbX = isChecked ? sz.thumbOnX : sz.thumbOffX;

  return (
    <div className={cn("flex items-center gap-3", disabled && "opacity-40 cursor-not-allowed", className)}>
      <input
        type="checkbox"
        id={toggleId}
        checked={isChecked}
        onChange={(e) => { if (!disabled) { setInternal(e.target.checked); onChange?.(e); } }}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <label
        htmlFor={toggleId}
        aria-disabled={disabled}
        className={cn("relative flex-shrink-0 rounded-full", !disabled && "cursor-pointer")}
        style={{
          width:           sz.trackW,
          height:          sz.trackH,
          backgroundColor: trackColor,
          transition:      "background-color 200ms ease",
          display:         "inline-block",
        }}
      >
        <span
          style={{
            position:        "absolute",
            top:             "50%",
            left:            0,
            width:           sz.thumbSize,
            height:          sz.thumbSize,
            borderRadius:    "50%",
            backgroundColor: thumbColor,
            boxShadow:       "0 1px 4px rgba(0,0,0,0.4)",
            transform:       `translate(${thumbX}px, -50%)`,
            transition:      "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 200ms ease",
          }}
        />
      </label>

      {(label || description) && (
        <div className="flex flex-col min-w-0">
          {label && (
            <label
              htmlFor={toggleId}
              /* text-foreground: #000000 (light) / #F5F5F5 (dark) → immer ≥19:1 */
              className={cn("text-sm font-semibold text-foreground leading-tight", !disabled && "cursor-pointer")}
            >
              {label}
            </label>
          )}
          {description && (
            /* text-muted-foreground: #6B6B6B (light) / #888888 (dark)
               Auf --muted (#F7F7F7 / #1A1A1A): ~4.5:1 / ~5.2:1 → WCAG AA */
            <span className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════
   VoltCheckbox
════════════════════════════════════════════════ */
export interface VoltCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: keyof typeof FILL_BG;
  indeterminate?: boolean;
}

export const VoltCheckbox: React.FC<VoltCheckboxProps> = ({
  label,
  description,
  variant = "default",
  indeterminate,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  id,
  ...props
}) => {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isChecked = checked !== undefined ? checked : internal;
  const checkId   = id || React.useId();
  const isActive  = isChecked || indeterminate;

  return (
    <div className={cn("flex items-start gap-2.5", disabled && "opacity-40 cursor-not-allowed", className)}>
      <input
        type="checkbox"
        id={checkId}
        checked={isChecked}
        onChange={(e) => { if (!disabled) { setInternal(e.target.checked); onChange?.(e); } }}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <label
        htmlFor={checkId}
        className={cn("flex-shrink-0 mt-0.5", !disabled && "cursor-pointer")}
        style={{
          width:           16,
          height:          16,
          borderRadius:    4,
          /* Inaktive Border: --input (#E8E8E8 light / #2A2A2A dark) → sichtbar in beiden Modi */
          border:          `1.5px solid ${isActive ? (FILL_BG[variant] ?? cssVar("--foreground")) : cssVar("--input")}`,
          backgroundColor: isActive ? (FILL_BG[variant] ?? cssVar("--foreground")) : "transparent",
          display:         "inline-flex",
          alignItems:      "center",
          justifyContent:  "center",
          transition:      "all 150ms ease",
        }}
      >
        {indeterminate ? (
          <Minus style={{ width: 10, height: 10, color: FILL_ICON[variant] ?? cssVar("--background"), strokeWidth: 2.5 }} />
        ) : isChecked ? (
          <Check style={{ width: 10, height: 10, color: FILL_ICON[variant] ?? cssVar("--background"), strokeWidth: 2.5 }} />
        ) : null}
      </label>

      {(label || description) && (
        <div className="flex flex-col min-w-0">
          {label && (
            <label htmlFor={checkId} className={cn("text-sm text-foreground leading-tight", !disabled && "cursor-pointer")}>
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════
   VoltRadioGroup
════════════════════════════════════════════════ */
export interface VoltRadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  defaultValue?: string;
  name: string;
  variant?: keyof typeof FILL_BG;
  onValueChange?: (value: string) => void;
}

export const VoltRadioGroup: React.FC<VoltRadioGroupProps> = ({
  options,
  value,
  defaultValue,
  name,
  variant = "default",
  onValueChange,
  className,
  ...props
}) => {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const selected = value !== undefined ? value : internal;
  const dotColor = FILL_BG[variant] ?? cssVar("--foreground");

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {options.map((opt) => {
        const radioId    = `${name}-${opt.value}`;
        const isSelected = selected === opt.value;
        return (
          <label key={opt.value} htmlFor={radioId} className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="radio"
              id={radioId}
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={() => { setInternal(opt.value); onValueChange?.(opt.value); }}
              className="sr-only"
            />
            <div
              className="flex-shrink-0 mt-0.5"
              style={{
                width:          16,
                height:         16,
                borderRadius:   "50%",
                /* Inaktive Border: --input sichtbar in beiden Modi */
                border:         `1.5px solid ${isSelected ? dotColor : cssVar("--input")}`,
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                transition:     "border-color 150ms ease",
              }}
            >
              {isSelected && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: dotColor }} />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-foreground leading-tight">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-muted-foreground mt-0.5 leading-snug">{opt.description}</span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};
