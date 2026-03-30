/**
 * GrainButton – Flux UI
 * Hover-Konzept: Jede Variante hat einen eigenen, charakteristischen Hover-State.
 * Primär:      Lime-Glow + leichter Aufhell-Shift
 * Solid:       Opacity-Shift + subtiler Lift
 * Outline:     Border wird sichtbarer + Hintergrund füllt sich
 * Ghost:       Hintergrund erscheint sanft
 * Glass:       Blur-Intensität steigt + heller
 * Secondary:   Abdunkeln + Border-Akzent
 * Destructive: Aufhellen + Glow-Effekt
 * Alle: scale(1.02) auf hover, scale(0.97) auf active, 200ms ease-out
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-ui font-semibold tracking-tight select-none overflow-hidden",
    "rounded-lg transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:opacity-45 disabled:pointer-events-none",
    "hover:scale-[1.02] active:scale-[0.97]",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        /* ── Primär: Lime-Fläche – Hover: heller Lime + Glow ── */
        primary: [
          "bg-[#E4FF97] text-[#0A0A0A]",
          "ring-1 ring-black/10",
          "hover:bg-[#EFFFB8] hover:shadow-[0_0_20px_rgba(228,255,151,0.55)]",
        ],
        /* ── Solid: Foreground-Fläche – Hover: leicht transparent + Lift-Shadow ── */
        solid: [
          "bg-foreground text-background",
          "hover:bg-foreground/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]",
        ],
        /* ── Outline: Border + transparent – Hover: Border kräftiger + Fläche füllt sich ── */
        outline: [
          "border-2 border-border text-foreground bg-transparent",
          "hover:border-foreground hover:bg-foreground/6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        ],
        /* ── Ghost: kein Hintergrund – Hover: subtile Fläche + Underline-Akzent ── */
        ghost: [
          "text-foreground bg-transparent",
          "hover:bg-foreground/8 hover:text-foreground",
        ],
        /* ── Glass: Blur-Effekt – Hover: heller + stärkerer Blur + Glow ── */
        glass: [
          "backdrop-blur-md bg-white/10 text-foreground border border-white/20",
          "hover:bg-white/20 hover:border-white/40 hover:shadow-[0_4px_24px_rgba(255,255,255,0.12)]",
        ],
        /* ── Secondary: gedämpfte Fläche – Hover: Border-Akzent + leichtes Abdunkeln ── */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "ring-1 ring-border",
          "hover:bg-secondary/70 hover:ring-foreground/30 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        ],
        /* ── Destructive: Koralle – Hover: aufhellen + Glow ── */
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/80 hover:shadow-[0_0_18px_rgba(232,64,42,0.40)]",
        ],
        /* ── Legacy-Alias ── */
        gradient: [
          "bg-foreground text-background",
          "hover:bg-foreground/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]",
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
