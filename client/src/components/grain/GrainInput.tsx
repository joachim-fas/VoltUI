/**
 * GrainInput / GrainTextarea – Atmospheric Grain Design System
 * Formular-Elemente mit atmosphärischen Fokus-Effekten.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "w-full font-body text-sm text-foreground",
    "bg-input border border-border",
    "rounded-xl px-4",
    "placeholder:text-muted-foreground",
    "transition-all duration-200 ease-out",
    "outline-none",
    "focus:border-primary/60 focus:ring-2 focus:ring-primary/20",
    "focus:ring-2 focus:ring-primary/20",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        default: "bg-input",
        glass: "glass bg-white/8 border-white/20 focus:border-white/40",
        filled: "bg-muted border-transparent focus:bg-background focus:border-primary/60",
      },
      inputSize: {
        sm: "h-8  text-xs px-3",
        md: "h-10 text-sm px-4",
        lg: "h-12 text-base px-5",
      },
      state: {
        default: "",
        error:   "border-destructive/60 focus:border-destructive focus:ring-destructive/20 focus:ring-2 focus:ring-destructive/20",
        success: "border-green-500/60 focus:border-green-500 focus:ring-green-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      state: "default",
    },
  }
);

export interface GrainInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const GrainInput = React.forwardRef<HTMLInputElement, GrainInputProps>(
  ({ className, variant, inputSize, state, label, hint, error, leftElement, rightElement, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const hasError = !!error;
    const computedState = hasError ? "error" : state;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-foreground font-body"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3 flex items-center text-muted-foreground z-10">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant, inputSize, state: computedState }),
              leftElement && "pl-10",
              rightElement && "pr-10",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center text-muted-foreground z-10">
              {rightElement}
            </div>
          )}
        </div>
        {(hint || error) && (
          <p className={cn(
            "text-xs font-body",
            hasError ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
GrainInput.displayName = "GrainInput";

/* ── GrainTextarea ── */
export interface GrainTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Pick<GrainInputProps, "label" | "hint" | "error" | "variant"> {}

export const GrainTextarea = React.forwardRef<HTMLTextAreaElement, GrainTextareaProps>(
  ({ className, variant, label, hint, error, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-semibold text-foreground font-body"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full font-body text-sm text-foreground",
            "bg-input border border-border",
            "rounded-xl px-4 py-3",
            "placeholder:text-muted-foreground",
            "transition-all duration-200 ease-out",
            "outline-none resize-y min-h-[100px]",
            "focus:border-primary/60 focus:ring-2 focus:ring-primary/20",
            "focus:ring-2 focus:ring-primary/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasError && "border-destructive/60 focus:border-destructive focus:ring-destructive/20",
            variant === "glass" && "glass bg-white/8 border-white/20",
            variant === "filled" && "bg-muted border-transparent focus:bg-background focus:border-primary/60",
            className
          )}
          {...props}
        />
        {(hint || error) && (
          <p className={cn(
            "text-xs font-body",
            hasError ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
GrainTextarea.displayName = "GrainTextarea";

/* ── GrainSelect ── */
export interface GrainSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    Pick<GrainInputProps, "label" | "hint" | "error"> {}

export const GrainSelect = React.forwardRef<HTMLSelectElement, GrainSelectProps>(
  ({ className, label, hint, error, id, children, ...props }, ref) => {
    const selectId = id || React.useId();
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-semibold text-foreground font-body"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full h-10 font-body text-sm text-foreground",
            "bg-input border border-border",
            "rounded-xl px-4",
            "transition-all duration-200 ease-out",
            "outline-none appearance-none",
            "focus:border-primary/60 focus:ring-2 focus:ring-primary/20",
            "focus:ring-2 focus:ring-primary/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasError && "border-destructive/60",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {(hint || error) && (
          <p className={cn("text-xs font-body", hasError ? "text-destructive" : "text-muted-foreground")}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
GrainSelect.displayName = "GrainSelect";
