/**
 * VoltCard – Volt UI Design System v4
 * Kein box-shadow – Tiefe durch Farbe, Borders und Hintergrundtöne
 * Theme-aware: nutzt CSS-Variablen statt hardcodierte Farben
 *
 * HOVER-POLICY: Nur variant="interactive" hat Hover-Effekte.
 * Alle anderen Varianten sind statische Dokumentations-Container.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  ["relative rounded-2xl overflow-hidden"],
  {
    variants: {
      variant: {
        // Statische Dokumentations-Container – kein Hover
        default: [
          "bg-card text-card-foreground",
          "border border-border",
        ],
        glass: [
          "glass text-card-foreground",
          "ring-1 ring-white/10",
        ],
        gradient: [
          "text-white",
          "bg-[image:var(--theme-gradient)]",
          "ring-1 ring-white/15",
        ],
        elevated: [
          "bg-card text-card-foreground",
          "border border-border",
          "ring-1 ring-primary/8",
        ],
        outlined: [
          "bg-transparent text-foreground",
          "border-2 border-primary/30",
        ],
        subtle: [
          "bg-muted/50 text-card-foreground",
          "border border-border/60",
        ],
        // Interaktive Karte – nur für klickbare Elemente verwenden
        interactive: [
          "bg-card text-card-foreground",
          "border border-border",
          "transition-all duration-200 ease-out",
          "hover:-translate-y-0.5",
          "hover:border-foreground/20",
          "cursor-pointer",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface VoltCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  withTexture?: boolean;
}

export const VoltCard = React.forwardRef<HTMLDivElement, VoltCardProps>(
  ({ className, variant, withTexture = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), withTexture && "volt-texture", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
VoltCard.displayName = "VoltCard";

export const VoltCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
));
VoltCardHeader.displayName = "VoltCardHeader";

export const VoltCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display font-bold text-xl leading-tight tracking-tight", className)}
    {...props}
  />
));
VoltCardTitle.displayName = "VoltCardTitle";

export const VoltCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
VoltCardDescription.displayName = "VoltCardDescription";

export const VoltCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
VoltCardContent.displayName = "VoltCardContent";

export const VoltCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 p-6 pt-0", className)}
    {...props}
  />
));
VoltCardFooter.displayName = "VoltCardFooter";
