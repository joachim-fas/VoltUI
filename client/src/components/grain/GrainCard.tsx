/**
 * GrainCard – Grain UI Design System v4
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
