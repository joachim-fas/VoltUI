/**
 * FluxCard – Flux UI Design System v4
 * Kein box-shadow – Tiefe durch Farbe, Borders und Hintergrundtöne
 * Theme-aware: nutzt CSS-Variablen statt hardcodierte Farben
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
          "hover:-translate-y-0.5",
          "hover:border-primary/30",
          "hover:bg-accent/30",
        ],
        glass: [
          "glass text-card-foreground",
          "ring-1 ring-white/10",
          "hover:bg-white/20",
          "hover:-translate-y-0.5",
        ],
        gradient: [
          "text-white",
          "bg-[image:var(--theme-gradient)]",
          "ring-1 ring-white/15",
          "hover:-translate-y-1",
          "hover:brightness-[1.06]",
        ],
        elevated: [
          "bg-card text-card-foreground",
          "border border-border",
          "ring-1 ring-primary/8",
          "hover:ring-primary/20",
          "hover:-translate-y-1",
          "hover:bg-accent/20",
        ],
        outlined: [
          "bg-transparent text-foreground",
          "border-2 border-primary/30",
          "hover:border-primary/60",
          "hover:bg-primary/4",
        ],
        subtle: [
          "bg-muted/50 text-card-foreground",
          "border border-border/60",
          "hover:bg-muted/80",
          "hover:-translate-y-0.5",
          "hover:border-primary/20",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FluxCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  withTexture?: boolean;
}

export const FluxCard = React.forwardRef<HTMLDivElement, FluxCardProps>(
  ({ className, variant, withTexture = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), withTexture && "grain", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FluxCard.displayName = "FluxCard";

export const FluxCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
));
FluxCardHeader.displayName = "FluxCardHeader";

export const FluxCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display font-bold text-xl leading-tight tracking-tight", className)}
    {...props}
  />
));
FluxCardTitle.displayName = "FluxCardTitle";

export const FluxCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
FluxCardDescription.displayName = "FluxCardDescription";

export const FluxCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
FluxCardContent.displayName = "FluxCardContent";

export const FluxCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 p-6 pt-0", className)}
    {...props}
  />
));
FluxCardFooter.displayName = "FluxCardFooter";
