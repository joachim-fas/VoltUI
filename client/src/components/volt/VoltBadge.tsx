/**
 * VoltBadge – Volt UI
 * KONTRAST-GARANTIE: Alle Varianten über CSS-Variablen oder explizite Kontrastpaare.
 * Light: solid = #000000 auf #FFFFFF → 21:1 | muted = #3A3A3A auf #F4F4F4 → 8.5:1
 * Dark:  solid = #F5F5F5 auf #111111 → 16:1 | muted = #CCCCCC auf #1A1A1A → 8:1
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "font-ui font-semibold",
    "rounded-full select-none",
    "transition-all duration-150",
  ],
  {
    variants: {
      variant: {
        /* ── Primär: Lime auf Schwarz – Lime ist immer hell, text immer schwarz → kein Dark-Mode-Problem ── */
        default: [
          "bg-primary text-primary-foreground",
          "ring-1 ring-black/10",
        ],
        /* ── Solid: Foreground-Fläche → Light: schwarz auf weiß / Dark: hellgrau auf fast-schwarz ── */
        solid: [
          "bg-foreground text-background",
          "ring-1 ring-foreground/20",
        ],
        /* ── Outline: semantische Border und Text ── */
        outline: [
          "border border-foreground/30 text-foreground bg-transparent",
          "hover:bg-foreground/5",
        ],
        /* ── Muted: Light #3A3A3A auf #F4F4F4 (8.5:1) / Dark #CCCCCC auf #1A1A1A (8:1) ── */
        muted: [
          "bg-muted text-muted-foreground",
        ],
        /* ── Glass ── */
        glass: [
          "glass text-foreground border border-white/20",
        ],
        /* ── Signal: Positiv (Smaragd) – CSS-Variablen passen sich Light/Dark an ── */
        positive: [
          "bg-[var(--signal-positive-light)] text-[var(--signal-positive-text)] border border-[var(--signal-positive-border)]",
        ],
        /* ── Signal: Negativ (Koralle) ── */
        negative: [
          "bg-[var(--signal-negative-light)] text-[var(--signal-negative-text)] border border-[var(--signal-negative-border)]",
        ],
        /* ── Signal: Neutral (Slate) ── */
        neutral: [
          "bg-[var(--signal-neutral-light)] text-[var(--signal-neutral-text)] border border-[var(--signal-neutral-border)]",
        ],
        /* ── Legacy-Aliase: auf semantische Tokens umgestellt ── */
        blue:     ["bg-foreground text-background ring-1 ring-foreground/20"],
        red:      ["bg-destructive text-destructive-foreground ring-1 ring-destructive/20"],
        gradient: ["bg-primary text-primary-foreground ring-1 ring-black/10"],
        violet:   ["bg-foreground text-background ring-1 ring-foreground/20"],
        coral:    ["bg-primary text-primary-foreground ring-1 ring-black/10"],
        "outline-red": ["border border-destructive/40 text-destructive bg-transparent"],
      },
      size: {
        sm: "px-2 py-0.5 text-[0.65rem] tracking-wide",
        md: "px-2.5 py-1 text-xs tracking-wide",
        lg: "px-3.5 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface VoltBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

export const VoltBadge = React.forwardRef<HTMLSpanElement, VoltBadgeProps>(
  ({ className, variant, size, dot, dotColor, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: dotColor || "currentColor", opacity: 0.9 }}
          />
        )}
        <span>{children}</span>
      </span>
    );
  }
);
VoltBadge.displayName = "VoltBadge";
export { badgeVariants };
