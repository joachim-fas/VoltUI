/**
 * GrainButton – Flux UI
 * Primär: Lime (#E4FF97) + Schwarz (#0A0A0A)
 * Semantische Tokens für vollständigen Dark-Mode-Support
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-ui font-semibold tracking-tight select-none overflow-hidden",
    "rounded-lg transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:opacity-45 disabled:pointer-events-none",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        /* ── Primär: Lime-Fläche, schwarzer Text – bleibt immer Lime ── */
        primary: [
          "bg-[#E4FF97] text-[#0A0A0A]",
          "hover:bg-[#D4F080]",
          "ring-1 ring-black/10",
        ],
        /* ── Solid: Foreground-Fläche (Schwarz/Hell je nach Modus) ── */
        solid: [
          "bg-foreground text-background",
          "hover:bg-foreground/85",
        ],
        /* ── Outline: semantische Border und Text ── */
        outline: [
          "border border-border text-foreground bg-transparent",
          "hover:bg-secondary hover:border-foreground/40",
        ],
        /* ── Ghost ── */
        ghost: [
          "text-foreground bg-transparent",
          "hover:bg-secondary",
        ],
        /* ── Glass ── */
        glass: [
          "glass text-foreground border border-white/20",
          "hover:bg-white/25",
        ],
        /* ── Secondary: sekundäre Fläche ── */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
          "ring-1 ring-border",
        ],
        /* ── Destructive: Koralle ── */
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
        ],
        /* ── Legacy-Alias ── */
        gradient: [
          "bg-foreground text-background",
          "hover:bg-foreground/85",
        ],
      },
      size: {
        sm:   "h-8  px-3.5 text-xs  rounded-md",
        md:   "h-9  px-5   text-sm  rounded-lg",
        lg:   "h-11 px-7   text-sm  rounded-lg",
        xl:   "h-13 px-9   text-base rounded-xl",
        icon: "h-9  w-9    rounded-lg p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface GrainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const GrainButton = React.forwardRef<HTMLButtonElement, GrainButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon ? (
        <span className="flex items-center">{leftIcon}</span>
      ) : null}
      {children && <span>{children}</span>}
      {!loading && rightIcon && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  )
);
GrainButton.displayName = "GrainButton";
export { buttonVariants };
