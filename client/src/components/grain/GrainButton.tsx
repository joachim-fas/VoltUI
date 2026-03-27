/**
 * GrainButton – Atmospheric Grain Design System v2
 * Font: Space Grotesk (UI-Schrift)
 * Varianten: primary · destructive · gradient · outline · ghost · glass · secondary
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23g)'/%3E%3C/svg%3E")`;

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-ui font-semibold tracking-tight select-none overflow-hidden",
    "rounded-lg transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:opacity-45 disabled:pointer-events-none",
    "active:scale-[0.96]",
    // Grain overlay
    `after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none`,
    `after:bg-[${GRAIN_SVG}] after:bg-repeat after:bg-[length:100px_100px] after:opacity-[0.045]`,
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-grain-blue text-white",
          "shadow-[0_2px_14px_oklch(0.42_0.22_268/0.38)]",
          "hover:shadow-[0_4px_22px_oklch(0.42_0.22_268/0.52)]",
          "hover:brightness-[1.08]",
          "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,oklch(1_0_0/0.16),transparent)]",
          "before:pointer-events-none",
        ],
        destructive: [
          "bg-grain-red text-white",
          "shadow-[0_2px_14px_oklch(0.52_0.26_27/0.38)]",
          "hover:shadow-[0_4px_22px_oklch(0.52_0.26_27/0.52)]",
          "hover:brightness-[1.08]",
          "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,oklch(1_0_0/0.16),transparent)]",
          "before:pointer-events-none",
        ],
        gradient: [
          "text-white",
          "bg-[linear-gradient(135deg,oklch(0.42_0.22_268),oklch(0.36_0.20_285)_45%,oklch(0.52_0.26_27))]",
          "shadow-[0_2px_18px_oklch(0.42_0.22_268/0.32),0_2px_18px_oklch(0.52_0.26_27/0.22)]",
          "hover:shadow-[0_4px_28px_oklch(0.42_0.22_268/0.48),0_4px_28px_oklch(0.52_0.26_27/0.32)]",
          "hover:brightness-[1.07]",
          "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,oklch(1_0_0/0.18),transparent)]",
          "before:pointer-events-none",
        ],
        outline: [
          "border border-grain-blue/35 text-grain-blue bg-transparent",
          "hover:bg-grain-blue/[0.07] hover:border-grain-blue/60",
        ],
        ghost: [
          "text-foreground bg-transparent",
          "hover:bg-primary/[0.07]",
        ],
        glass: [
          "glass text-foreground",
          "hover:bg-white/[0.18]",
          "shadow-[0_2px_12px_oklch(0_0_0/0.07)]",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/75",
          "shadow-[0_1px_4px_oklch(0_0_0/0.05)]",
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
        <Loader2 className="w-4 h-4 animate-spin relative z-10" />
      ) : leftIcon ? (
        <span className="relative z-10 flex items-center">{leftIcon}</span>
      ) : null}
      {children && <span className="relative z-10">{children}</span>}
      {!loading && rightIcon && (
        <span className="relative z-10 flex items-center">{rightIcon}</span>
      )}
    </button>
  )
);
GrainButton.displayName = "GrainButton";
export { buttonVariants };
