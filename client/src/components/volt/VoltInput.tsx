/**
 * VoltInput / VoltTextarea / VoltSelect – Volt UI
 * Hauptfarben: #E4FF97 Neon Yellow + #000000 Black
 * Design: Raffiniert, leicht, dünnere Linien, elegante Fokus-Übergänge
 */

import React from "react";
import { cn } from "@/lib/utils";

/* ── Basis-Input ── */
const baseInput = [
  "w-full font-body text-sm text-foreground",
  "bg-transparent",
  "border-0 border-b border-border",
  "rounded-none px-0 py-2.5",
  "placeholder:text-muted-foreground/50",
  "transition-all duration-200 ease-out",
  "outline-none",
].join(" ");

export interface VoltInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  variant?: "default" | "filled" | "glass" | "boxed";
  inputSize?: "sm" | "md" | "lg";
  state?: "default" | "error" | "success";
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const VoltInput = React.forwardRef<HTMLInputElement, VoltInputProps>(
  ({ className, variant = "default", inputSize = "md", state, label, hint, error, leftElement, rightElement, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const hasError = !!error;
    const computedState = hasError ? "error" : state;

    const sizeClass = inputSize === "sm" ? "py-1.5 text-xs" : inputSize === "lg" ? "py-3.5 text-base" : "py-2.5 text-sm";

    const variantClass = variant === "filled"
      ? "bg-muted border-0 rounded-lg px-4"
      : variant === "boxed"
      ? "border border-border rounded-lg px-4 bg-transparent"
      : variant === "glass"
      ? "glass border-0 border-b border-white/20 rounded-none px-0"
      : "bg-transparent border-0 border-b border-border rounded-none px-0";

    const stateClass = computedState === "error"
      ? "border-[var(--signal-negative)] focus:border-[var(--signal-negative)]"
      : computedState === "success"
      ? "border-[var(--signal-positive)] focus:border-[var(--signal-positive)]"
      : "focus:border-foreground";

    return (
      <div className="flex flex-col gap-1 w-full group">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-ui font-semibold tracking-widest uppercase text-muted-foreground transition-colors duration-150 group-focus-within:text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3 flex items-center text-muted-foreground/60 z-10 pointer-events-none">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full font-body text-foreground placeholder:text-muted-foreground/40",
              "bg-transparent outline-none transition-all duration-200",
              sizeClass,
              variantClass,
              stateClass,
              leftElement && (variant === "default" || variant === "glass" ? "pl-9" : "pl-10"),
              rightElement && (variant === "default" || variant === "glass" ? "pr-9" : "pr-10"),
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center text-muted-foreground/60 z-10">
              {rightElement}
            </div>
          )}
          {/* Fokus-Linie (nur für underline-Varianten) */}
          {(variant === "default" || variant === "glass") && (
            <div className={cn(
              "absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-300 ease-out",
              "group-focus-within:w-full",
              computedState === "error" ? "bg-[var(--signal-negative)]" : computedState === "success" ? "bg-[var(--signal-positive)]" : "bg-foreground"
            )} />
          )}
        </div>
        {(hint || error) && (
          <p className={cn(
            "text-[11px] font-body mt-0.5",
            hasError ? "text-[var(--signal-negative)]" : "text-muted-foreground/70"
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
VoltInput.displayName = "VoltInput";

/* ── VoltTextarea ── */
export interface VoltTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  variant?: "default" | "filled" | "boxed";
}

export const VoltTextarea = React.forwardRef<HTMLTextAreaElement, VoltTextareaProps>(
  ({ className, variant = "default", label, hint, error, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    const hasError = !!error;

    const variantClass = variant === "filled"
      ? "bg-muted border-0 rounded-lg px-4 py-3"
      : variant === "boxed"
      ? "border border-border rounded-lg px-4 py-3 bg-transparent"
      : "bg-transparent border-0 border-b border-border rounded-none px-0 py-2.5";

    return (
      <div className="flex flex-col gap-1 w-full group">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[11px] font-ui font-semibold tracking-widest uppercase text-muted-foreground transition-colors duration-150 group-focus-within:text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              "w-full font-body text-sm text-foreground",
              "placeholder:text-muted-foreground/40",
              "outline-none resize-y min-h-[90px]",
              "transition-all duration-200 ease-out",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              variantClass,
              hasError && "border-[var(--signal-negative)]",
            className
          )}
          {...props}
        />
        {(variant === "default") && (
            <div className={cn(
              "absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-300 ease-out",
              "group-focus-within:w-full",
              hasError ? "bg-[var(--signal-negative)]" : "bg-foreground"
            )} />
          )}
        </div>
        {(hint || error) && (
          <p className={cn(
            "text-[11px] font-body mt-0.5",
            hasError ? "text-[var(--signal-negative)]" : "text-muted-foreground/70"
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
VoltTextarea.displayName = "VoltTextarea";

/* ── VoltSelect ── */
export interface VoltSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  variant?: "default" | "filled" | "boxed";
}

export const VoltSelect = React.forwardRef<HTMLSelectElement, VoltSelectProps>(
  ({ className, variant = "default", label, hint, error, id, children, ...props }, ref) => {
    const selectId = id || React.useId();
    const hasError = !!error;

    const variantClass = variant === "filled"
      ? "bg-muted border-0 rounded-lg px-4"
      : variant === "boxed"
      ? "border border-border rounded-lg px-4 bg-transparent"
      : "bg-transparent border-0 border-b border-border rounded-none px-0";

    return (
      <div className="flex flex-col gap-1 w-full group">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[11px] font-ui font-semibold tracking-widest uppercase text-muted-foreground transition-colors duration-150 group-focus-within:text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full h-10 font-body text-sm text-foreground",
              "appearance-none outline-none cursor-pointer",
              "transition-all duration-200 ease-out",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              variantClass,
              hasError && "border-[var(--signal-negative)]",
            className
          )}
          {...props}
        >
          {children}
        </select>
          {/* Chevron */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {(hint || error) && (
          <p className={cn("text-[11px] font-body mt-0.5", hasError ? "text-[var(--signal-negative)]" : "text-muted-foreground/70")}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
VoltSelect.displayName = "VoltSelect";
