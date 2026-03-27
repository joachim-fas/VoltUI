/**
 * GrainBadge – Atmospheric Grain Design System
 * Kompakte Kennzeichnungs-Komponente mit Grain-Textur.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "font-body font-semibold",
    "rounded-full select-none",
    "transition-all duration-150",
    "relative overflow-hidden",
    // Grain overlay
    "after:content-[''] after:absolute after:inset-0 after:rounded-full after:pointer-events-none",
    "after:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23g)'/%3E%3C/svg%3E\")] after:bg-repeat after:bg-[length:80px_80px] after:opacity-[0.06]",
  ],
  {
    variants: {
      variant: {
        blue: [
          "bg-grain-blue text-white",
          "shadow-[0_1px_6px_oklch(0.42_0.22_268/0.3)]",
        ],
        red: [
          "bg-grain-red text-white",
          "shadow-[0_1px_6px_oklch(0.52_0.26_27/0.3)]",
        ],
        gradient: [
          "bg-[linear-gradient(135deg,oklch(0.42_0.22_268),oklch(0.52_0.26_27))] text-white",
          "shadow-[0_1px_8px_oklch(0.42_0.22_268/0.25)]",
        ],
        violet: [
          "bg-grain-violet text-white",
          "shadow-[0_1px_6px_oklch(0.36_0.20_285/0.3)]",
        ],
        coral: [
          "bg-grain-coral text-white",
          "shadow-[0_1px_6px_oklch(0.68_0.18_28/0.3)]",
        ],
        outline: [
          "border border-primary/40 text-primary bg-transparent",
          "hover:bg-primary/8",
        ],
        "outline-red": [
          "border border-destructive/40 text-destructive bg-transparent",
          "hover:bg-destructive/8",
        ],
        muted: [
          "bg-muted text-muted-foreground",
        ],
        glass: [
          "glass text-foreground",
        ],
      },
      size: {
        sm: "px-2 py-0.5 text-[0.65rem] tracking-wide",
        md: "px-2.5 py-1 text-xs tracking-wide",
        lg: "px-3.5 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
    },
  }
);

export interface GrainBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

export const GrainBadge = React.forwardRef<HTMLSpanElement, GrainBadgeProps>(
  ({ className, variant, size, dot, dotColor, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 relative z-10"
            style={{ backgroundColor: dotColor || "currentColor", opacity: 0.9 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </span>
    );
  }
);
GrainBadge.displayName = "GrainBadge";
