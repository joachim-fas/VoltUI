/**
 * GrainToggle / GrainCheckbox / GrainRadio – Grain UI
 * Hauptfarben: #E4FF97 Neon Yellow + #000000 Black
 * Design: Raffiniert, minimal, klare Signale
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

/* ── Farbmap für alle Varianten ── */
const TRACK_ON: Record<string, string> = {
  default:  "bg-[#000000]",
  primary:  "bg-[#E4FF97]",
  lime:     "bg-[#E4FF97]",
  solid:    "bg-[#000000]",
  positive: "bg-[#1A9E5A]",
  negative: "bg-[#E8402A]",
  neutral:  "bg-[#6B7A9A]",
  /* Legacy */
  blue:     "bg-[#000000]",
  red:      "bg-[#E8402A]",
  gradient: "bg-[#E4FF97]",
};

const THUMB_COLOR: Record<string, string> = {
  default:  "#FFFFFF",
  primary:  "#000000",
  lime:     "#000000",
  solid:    "#FFFFFF",
  positive: "#FFFFFF",
  negative: "#FFFFFF",
  neutral:  "#FFFFFF",
  blue:     "#FFFFFF",
  red:      "#FFFFFF",
  gradient: "#000000",
};

const FILL: Record<string, string> = {
  default:  "bg-[#000000] border-[#000000]",
  primary:  "bg-[#E4FF97] border-[#E4FF97]",
  lime:     "bg-[#E4FF97] border-[#E4FF97]",
  solid:    "bg-[#000000] border-[#000000]",
  positive: "bg-[#1A9E5A] border-[#1A9E5A]",
  negative: "bg-[#E8402A] border-[#E8402A]",
  neutral:  "bg-[#6B7A9A] border-[#6B7A9A]",
  blue:     "bg-[#000000] border-[#000000]",
  red:      "bg-[#E8402A] border-[#E8402A]",
  gradient: "bg-[#E4FF97] border-[#E4FF97]",
};

const ICON_COLOR: Record<string, string> = {
  default:  "text-white",
  primary:  "text-[#000000]",
  lime:     "text-[#000000]",
  solid:    "text-white",
  positive: "text-white",
  negative: "text-white",
  neutral:  "text-white",
  blue:     "text-white",
  red:      "text-white",
  gradient: "text-[#000000]",
};

/* ── GrainToggle (Switch) ── */
export interface GrainToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: keyof typeof TRACK_ON;
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
  const toggleId = id || React.useId();

  const sizes = {
    sm: { track: "w-7 h-3.5",  thumb: "w-2.5 h-2.5", on: "translate-x-3.5", off: "translate-x-0.5" },
    md: { track: "w-10 h-5.5", thumb: "w-4 h-4",      on: "translate-x-5",   off: "translate-x-0.5" },
    lg: { track: "w-12 h-6.5", thumb: "w-5 h-5",      on: "translate-x-6",   off: "translate-x-0.5" },
  };
  const s = sizes[toggleSize];
  const thumbBg = THUMB_COLOR[variant] ?? "#FFFFFF";

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={toggleId}
          checked={isChecked}
          onChange={(e) => { setInternal(e.target.checked); onChange?.(e); }}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <label
          htmlFor={toggleId}
          className={cn(
            "relative inline-flex items-center rounded-full cursor-pointer",
            "transition-all duration-250 ease-out",
            s.track,
            isChecked ? TRACK_ON[variant] : "bg-[#E0E0E0]",
            disabled && "opacity-40 cursor-not-allowed",
          )}
        >
          <span
            className="absolute rounded-full shadow-sm transition-transform duration-250 ease-out"
            style={{
              width: s.thumb.split(" ")[0].replace("w-", "").replace(".", "").replace(/(\d+)(\d)/, "$1.$2") + "rem",
              height: s.thumb.split(" ")[1].replace("h-", "").replace(".", "").replace(/(\d+)(\d)/, "$1.$2") + "rem",
              background: thumbBg,
              transform: isChecked
                ? `translateX(${toggleSize === "sm" ? "0.875rem" : toggleSize === "lg" ? "1.5rem" : "1.25rem"})`
                : "translateX(0.125rem)",
            }}
          />
        </label>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label htmlFor={toggleId} className={cn("text-sm font-semibold font-body cursor-pointer leading-tight", disabled && "opacity-40 cursor-not-allowed")}>
              {label}
            </label>
          )}
          {description && <span className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">{description}</span>}
        </div>
      )}
    </div>
  );
};

/* ── GrainCheckbox ── */
export interface GrainCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: keyof typeof FILL;
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
  const checkId = id || React.useId();

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={checkId}
          checked={isChecked}
          onChange={(e) => { setInternal(e.target.checked); onChange?.(e); }}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <label
          htmlFor={checkId}
          className={cn(
            "w-4 h-4 rounded border flex items-center justify-center cursor-pointer",
            "transition-all duration-150 ease-out",
            isChecked || indeterminate
              ? FILL[variant]
              : "bg-transparent border-border hover:border-foreground/40",
            disabled && "opacity-40 cursor-not-allowed"
          )}
        >
          {indeterminate ? (
            <Minus className={cn("w-2.5 h-2.5", ICON_COLOR[variant])} strokeWidth={2.5} />
          ) : isChecked ? (
            <Check className={cn("w-2.5 h-2.5", ICON_COLOR[variant])} strokeWidth={2.5} />
          ) : null}
        </label>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label htmlFor={checkId} className={cn("text-sm font-body cursor-pointer leading-tight", disabled && "opacity-40 cursor-not-allowed")}>
              {label}
            </label>
          )}
          {description && <span className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">{description}</span>}
        </div>
      )}
    </div>
  );
};

/* ── GrainRadioGroup ── */
export interface GrainRadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  defaultValue?: string;
  name: string;
  variant?: keyof typeof FILL;
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

  const dotBg = variant === "lime" || variant === "primary" || variant === "gradient"
    ? "bg-[#000000]"
    : variant === "positive" ? "bg-[#1A9E5A]"
    : variant === "negative" ? "bg-[#E8402A]"
    : variant === "neutral" ? "bg-[#6B7A9A]"
    : "bg-[#000000]";

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {options.map((opt) => {
        const radioId = `${name}-${opt.value}`;
        const isSelected = selected === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={radioId}
            className="flex items-start gap-2.5 cursor-pointer group"
          >
            <input
              type="radio"
              id={radioId}
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={() => { setInternal(opt.value); onValueChange?.(opt.value); }}
              className="sr-only"
            />
            <div className={cn(
              "w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5",
              "transition-all duration-150",
              isSelected ? "border-foreground" : "border-border group-hover:border-foreground/40"
            )}>
              {isSelected && <div className={cn("w-2 h-2 rounded-full", dotBg)} />}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-body leading-tight">{opt.label}</span>
              {opt.description && <span className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">{opt.description}</span>}
            </div>
          </label>
        );
      })}
    </div>
  );
};
