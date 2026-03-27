/**
 * GrainBadge – Grain UI
 * Primär: Lime (#E4FF97) + Schwarz (#0A0A0A)
 * Signale: Smaragd (positiv) · Koralle (negativ) · Slate (neutral)
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
        /* ── Primär: Lime auf Schwarz ── */
        default: [
          "bg-[#E4FF97] text-[#0A0A0A]",
          "ring-1 ring-black/10",
        ],
        /* ── Schwarz ── */
        solid: [
          "bg-[#0A0A0A] text-white",
          "ring-1 ring-black/20",
        ],
        /* ── Outline: Schwarz ── */
        outline: [
          "border border-[#0A0A0A]/30 text-[#0A0A0A] bg-transparent",
          "hover:bg-[#0A0A0A]/5",
        ],
        /* ── Muted: Grau ── */
        muted: [
          "bg-[#F4F4F4] text-[#6B6B6B]",
        ],
        /* ── Glass ── */
        glass: [
          "glass text-foreground border border-white/20",
        ],
        /* ── Signal: Positiv (Smaragd) ── */
        positive: [
          "bg-[#E8F8EF] text-[#0F6038] border border-[#7DD4A8]",
        ],
        /* ── Signal: Negativ (Koralle) ── */
        negative: [
          "bg-[#FDEEE9] text-[#A01A08] border border-[#F4A090]",
        ],
        /* ── Signal: Neutral (Slate) ── */
        neutral: [
          "bg-[#F0F2F7] text-[#3A4560] border border-[#B0BACC]",
        ],
        /* ── Legacy-Aliase ── */
        blue:     ["bg-[#0A0A0A] text-white ring-1 ring-black/20"],
        red:      ["bg-[#E8402A] text-white ring-1 ring-red-900/20"],
        gradient: ["bg-[#E4FF97] text-[#0A0A0A] ring-1 ring-black/10"],
        violet:   ["bg-[#1A1A1A] text-white ring-1 ring-black/20"],
        coral:    ["bg-[#E4FF97] text-[#0A0A0A] ring-1 ring-black/10"],
        "outline-red": ["border border-[#E8402A]/40 text-[#E8402A] bg-transparent"],
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
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: dotColor || "currentColor", opacity: 0.9 }}
          />
        )}
        <span>{children}</span>
      </span>
    );
  }
);
GrainBadge.displayName = "GrainBadge";
export { badgeVariants };
