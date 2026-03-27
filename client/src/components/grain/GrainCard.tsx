/**
 * GrainCard – Atmospheric Grain Design System
 * Varianten: default, glass, gradient, elevated, outlined
 * Alle Effekte sind reiner CSS-Code.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "relative rounded-2xl overflow-hidden",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground",
          "border border-border",
          "shadow-[0_2px_12px_oklch(0_0_0/0.06)]",
          "hover:shadow-[0_8px_32px_oklch(0_0_0/0.10)]",
          "hover:-translate-y-0.5",
        ],
        glass: [
          "glass text-card-foreground",
          "hover:bg-white/20",
          "hover:shadow-[0_8px_32px_oklch(0.42_0.22_268/0.12)]",
          "hover:-translate-y-0.5",
        ],
        gradient: [
          "text-white",
          "bg-[linear-gradient(135deg,oklch(0.42_0.22_268),oklch(0.36_0.20_285)_50%,oklch(0.52_0.26_27))]",
          "shadow-[0_4px_24px_oklch(0.42_0.22_268/0.3)]",
          "hover:shadow-[0_8px_40px_oklch(0.42_0.22_268/0.45)]",
          "hover:-translate-y-1",
        ],
        elevated: [
          "bg-card text-card-foreground",
          "border border-border",
          "shadow-[0_8px_32px_oklch(0_0_0/0.10),0_2px_8px_oklch(0_0_0/0.06)]",
          "hover:shadow-[0_16px_48px_oklch(0_0_0/0.14)]",
          "hover:-translate-y-1",
        ],
        outlined: [
          "bg-transparent text-foreground",
          "border-2 border-primary/30",
          "hover:border-primary/60",
          "hover:bg-primary/4",
        ],
        subtle: [
          "bg-grain-subtle text-card-foreground",
          "border border-border/60",
          "shadow-[0_1px_6px_oklch(0_0_0/0.04)]",
          "hover:shadow-[0_4px_16px_oklch(0.42_0.22_268/0.08)]",
          "hover:-translate-y-0.5",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface GrainCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  withGrain?: boolean;
}

export const GrainCard = React.forwardRef<HTMLDivElement, GrainCardProps>(
  ({ className, variant, withGrain = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), withGrain && "grain", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GrainCard.displayName = "GrainCard";

export const GrainCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
));
GrainCardHeader.displayName = "GrainCardHeader";

export const GrainCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display font-bold text-xl leading-tight tracking-tight", className)}
    {...props}
  />
));
GrainCardTitle.displayName = "GrainCardTitle";

export const GrainCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
GrainCardDescription.displayName = "GrainCardDescription";

export const GrainCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
GrainCardContent.displayName = "GrainCardContent";

export const GrainCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 p-6 pt-0", className)}
    {...props}
  />
));
GrainCardFooter.displayName = "GrainCardFooter";
