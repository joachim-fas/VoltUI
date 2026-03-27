/**
 * GrainToggle / GrainCheckbox / GrainRadio – Grain UI
 * Hauptfarben: #E4FF97 Neon Yellow + #000000 Black
 * Komplett neu gebaut mit Inline-Styles für pixelgenaue Proportionen.
 * Kein Tailwind-Größen-Bug mehr.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

/* ── Farbmap für alle Varianten ── */
const TRACK_ON_COLOR: Record<string, string> = {
  default:  "#0A0A0A",
  primary:  "#E4FF97",
  positive: "#1A9E5A",
  negative: "#E8402A",
  neutral:  "#6B7A9A",
};

const THUMB_COLOR: Record<string, string> = {
  default:  "#FFFFFF",
  primary:  "#0A0A0A",
  positive: "#FFFFFF",
  negative: "#FFFFFF",
  neutral:  "#FFFFFF",
};

const FILL_BG: Record<string, string> = {
  default:  "#0A0A0A",
  primary:  "#E4FF97",
  positive: "#1A9E5A",
  negative: "#E8402A",
  neutral:  "#6B7A9A",
};

const FILL_ICON: Record<string, string> = {
  default:  "#FFFFFF",
  primary:  "#0A0A0A",
  positive: "#FFFFFF",
  negative: "#FFFFFF",
  neutral:  "#FFFFFF",
};

/* ── Größen-Konfiguration (px, exakt) ── */
const TOGGLE_SIZES = {
  sm: { trackW: 28, trackH: 16, thumbSize: 10, thumbOnX: 14, thumbOffX: 3 },
  md: { trackW: 44, trackH: 24, thumbSize: 16, thumbOnX: 24, thumbOffX: 4 },
  lg: { trackW: 56, trackH: 30, thumbSize: 20, thumbOnX: 32, thumbOffX: 5 },
};

/* ════════════════════════════════════════════════
   GrainToggle
════════════════════════════════════════════════ */
export interface GrainToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: keyof typeof TRACK_ON_COLOR;
  toggleSize?: "sm" | "md" | "lg";
}

export const GrainToggle: React.FC<GrainToggleProps> = ({
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

  const trackColor  = isChecked ? (TRACK_ON_COLOR[variant] ?? "#0A0A0A") : "#D4D4D4";
  const thumbColor  = isChecked ? (THUMB_COLOR[variant]    ?? "#FFFFFF")  : "#FFFFFF";
  const thumbX      = isChecked ? sz.thumbOnX : sz.thumbOffX;

  return (
    <div className={cn("flex items-center gap-3", disabled && "opacity-40 cursor-not-allowed", className)}>
      {/* Hidden native input for a11y */}
      <input
        type="checkbox"
        id={toggleId}
        checked={isChecked}
        onChange={(e) => { if (!disabled) { setInternal(e.target.checked); onChange?.(e); } }}
        disabled={disabled}
        className="sr-only"
        {...props}
      />

      {/* Visual track */}
      <label
        htmlFor={toggleId}
        aria-disabled={disabled}
        className={cn("relative flex-shrink-0 rounded-full", !disabled && "cursor-pointer")}
        style={{
          width:  sz.trackW,
          height: sz.trackH,
          backgroundColor: trackColor,
          transition: "background-color 200ms ease",
          display: "inline-block",
        }}
      >
        {/* Thumb */}
        <span
          style={{
            position:        "absolute",
            top:             "50%",
            left:            0,
            width:           sz.thumbSize,
            height:          sz.thumbSize,
            borderRadius:    "50%",
            backgroundColor: thumbColor,
            boxShadow:       "0 1px 3px rgba(0,0,0,0.25)",
            transform:       `translate(${thumbX}px, -50%)`,
            transition:      "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 200ms ease",
          }}
        />
      </label>

      {/* Label + Description */}
      {(label || description) && (
        <div className="flex flex-col min-w-0">
          {label && (
            <label
              htmlFor={toggleId}
              className={cn("text-sm font-semibold text-[#0A0A0A] leading-tight", !disabled && "cursor-pointer")}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-[#6B6B6B] mt-0.5 leading-snug">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════
   GrainCheckbox
════════════════════════════════════════════════ */
export interface GrainCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: keyof typeof FILL_BG;
  indeterminate?: boolean;
}

export const GrainCheckbox: React.FC<GrainCheckboxProps> = ({
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
          border:          `1.5px solid ${isActive ? (FILL_BG[variant] ?? "#0A0A0A") : "#C8C8C8"}`,
          backgroundColor: isActive ? (FILL_BG[variant] ?? "#0A0A0A") : "transparent",
          display:         "inline-flex",
          alignItems:      "center",
          justifyContent:  "center",
          transition:      "all 150ms ease",
        }}
      >
        {indeterminate ? (
          <Minus style={{ width: 10, height: 10, color: FILL_ICON[variant] ?? "#FFFFFF", strokeWidth: 2.5 }} />
        ) : isChecked ? (
          <Check style={{ width: 10, height: 10, color: FILL_ICON[variant] ?? "#FFFFFF", strokeWidth: 2.5 }} />
        ) : null}
      </label>

      {(label || description) && (
        <div className="flex flex-col min-w-0">
          {label && (
            <label htmlFor={checkId} className={cn("text-sm text-[#0A0A0A] leading-tight", !disabled && "cursor-pointer")}>
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-[#6B6B6B] mt-0.5 leading-snug">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════
   GrainRadioGroup
════════════════════════════════════════════════ */
export interface GrainRadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  defaultValue?: string;
  name: string;
  variant?: keyof typeof FILL_BG;
  onValueChange?: (value: string) => void;
}

export const GrainRadioGroup: React.FC<GrainRadioGroupProps> = ({
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

  const dotColor = FILL_BG[variant] ?? "#0A0A0A";

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {options.map((opt) => {
        const radioId  = `${name}-${opt.value}`;
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
            {/* Radio circle */}
            <div
              className="flex-shrink-0 mt-0.5"
              style={{
                width:        16,
                height:       16,
                borderRadius: "50%",
                border:       `1.5px solid ${isSelected ? dotColor : "#C8C8C8"}`,
                display:      "inline-flex",
                alignItems:   "center",
                justifyContent: "center",
                transition:   "border-color 150ms ease",
              }}
            >
              {isSelected && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: dotColor }} />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-[#0A0A0A] leading-tight">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-[#6B6B6B] mt-0.5 leading-snug">{opt.description}</span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};
