/**
 * GrainToggle / GrainCheckbox / GrainRadio – Atmospheric Grain Design System
 * Auswahl-Komponenten mit atmosphärischen Effekten.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

/* ── GrainToggle (Switch) ── */
export interface GrainToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: "blue" | "red" | "gradient";
  toggleSize?: "sm" | "md" | "lg";
}

export const GrainToggle: React.FC<GrainToggleProps> = ({
  label,
  description,
  variant = "blue",
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

  const trackOn: Record<string, string> = {
    blue:     "bg-[#0A0A0A]",
    red:      "bg-[#E8402A]",
    gradient: "bg-[#E4FF97]",
    default:  "bg-[#0A0A0A]",
    lime:     "bg-[#E4FF97]",
    positive: "bg-[#1A9E5A]",
    negative: "bg-[#E8402A]",
    neutral:  "bg-[#6B7A9A]",
  };
  const sizes = {
    sm: { track: "w-8 h-4",  thumb: "w-3 h-3",  translateOn: "translate-x-4" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5",  translateOn: "translate-x-5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6",  translateOn: "translate-x-7" },
  };
  const s = sizes[toggleSize];

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={toggleId}
          checked={isChecked}
          onChange={(e) => {
            setInternal(e.target.checked);
            onChange?.(e);
          }}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <label
          htmlFor={toggleId}
          className={cn(
            "relative inline-flex items-center rounded-full cursor-pointer transition-all duration-200",
            s.track,
            isChecked ? trackOn[variant] : "bg-muted border border-border",
            disabled && "opacity-50 cursor-not-allowed",
            "shadow-inner"
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 rounded-full bg-white ring-1 ring-black/10",
              "transition-transform duration-200 ease-out",
              s.thumb,
              isChecked ? s.translateOn : "translate-x-0.5"
            )}
          />
        </label>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={toggleId}
              className={cn(
                "text-sm font-semibold font-body cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-muted-foreground font-body mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/* ── GrainCheckbox ── */
export interface GrainCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  variant?: "blue" | "red" | "gradient";
  indeterminate?: boolean;
}

export const GrainCheckbox: React.FC<GrainCheckboxProps> = ({
  label,
  description,
  variant = "blue",
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

  const fillVariants: Record<string, string> = {
    blue:     "bg-[#0A0A0A] border-[#0A0A0A]",
    red:      "bg-[#E8402A] border-[#E8402A]",
    gradient: "bg-[#E4FF97] border-[#E4FF97]",
    default:  "bg-[#0A0A0A] border-[#0A0A0A]",
    lime:     "bg-[#E4FF97] border-[#E4FF97]",
    positive: "bg-[#1A9E5A] border-[#1A9E5A]",
    negative: "bg-[#E8402A] border-[#E8402A]",
    neutral:  "bg-[#6B7A9A] border-[#6B7A9A]",
  };

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={checkId}
          checked={isChecked}
          onChange={(e) => {
            setInternal(e.target.checked);
            onChange?.(e);
          }}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <label
          htmlFor={checkId}
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer",
            "transition-all duration-150 ease-out",
            isChecked || indeterminate
              ? fillVariants[variant]
              : "bg-background border-border hover:border-primary/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {indeterminate ? (
            <Minus className="w-3 h-3 text-white" strokeWidth={3} />
          ) : isChecked ? (
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          ) : null}
        </label>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={checkId}
              className={cn(
                "text-sm font-semibold font-body cursor-pointer leading-tight",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-muted-foreground font-body mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/* ── GrainRadio ── */
export interface GrainRadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  defaultValue?: string;
  name: string;
  variant?: "blue" | "red" | "gradient";
  onValueChange?: (value: string) => void;
}

export const GrainRadioGroup: React.FC<GrainRadioGroupProps> = ({
  options,
  value,
  defaultValue,
  name,
  variant = "blue",
  onValueChange,
  className,
  ...props
}) => {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const selected = value !== undefined ? value : internal;

  const dotColors: Record<string, string> = {
    blue:     "bg-[#0A0A0A]",
    red:      "bg-[#E8402A]",
    gradient: "bg-[#E4FF97]",
    default:  "bg-[#0A0A0A]",
    lime:     "bg-[#E4FF97]",
    positive: "bg-[#1A9E5A]",
    negative: "bg-[#E8402A]",
    neutral:  "bg-[#6B7A9A]",
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {options.map((opt) => {
        const radioId = `${name}-${opt.value}`;
        const isSelected = selected === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={radioId}
            className={cn(
              "flex items-start gap-2.5 cursor-pointer group"
            )}
          >
            <input
              type="radio"
              id={radioId}
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={() => {
                setInternal(opt.value);
                onValueChange?.(opt.value);
              }}
              className="sr-only"
            />
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                "transition-all duration-150",
                isSelected
                  ? "border-primary"
                  : "border-border group-hover:border-primary/50"
              )}
            >
              {isSelected && (
                <div className={cn("w-2.5 h-2.5 rounded-full", dotColors[variant])} />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold font-body leading-tight">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-muted-foreground font-body mt-0.5">{opt.description}</span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};
