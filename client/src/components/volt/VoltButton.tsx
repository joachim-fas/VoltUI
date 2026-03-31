/**
 * VoltButton – Volt UI
 * Interaktionssystem:
 *  1. Ripple-Effekt: Klick erzeugt einen radialen Wellen-Ring am Klickpunkt
 *  2. Shimmer-Sweep: Auf Hover fährt ein Lichtstrahl über den Button (primary/solid/destructive)
 *  3. Magnetic-Lift: Hover hebt den Button mit variantenspezifischem Shadow an
 *  4. Cursor-Glow: Primary/Destructive reagieren mit einem Glow-Halo
 *  5. Active-Sink: Click drückt den Button sichtbar ein (scale + shadow-collapse)
 */

import React, { useRef, useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/* ── Basis-Klassen (alle Varianten) ── */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-ui font-semibold tracking-tight select-none overflow-hidden",
    "rounded-lg transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4FF97] focus-visible:ring-offset-2",
    "disabled:opacity-45 disabled:pointer-events-none",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary:     ["bg-[#E4FF97] text-[#0A0A0A]", "ring-1 ring-black/10"],
        solid:       ["bg-foreground text-background"],
        outline:     ["border-2 border-border text-foreground bg-transparent"],
        ghost:       ["text-foreground bg-transparent"],
        glass:       ["backdrop-blur-md bg-white/10 text-foreground border border-white/20"],
        secondary:   ["bg-secondary text-secondary-foreground", "ring-1 ring-border"],
        destructive: ["bg-destructive text-destructive-foreground"],
        gradient:    ["bg-foreground text-background"],
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

/* ── Hover/Active-Styles pro Variante ── */
const hoverStyles: Record<string, React.CSSProperties> = {
  primary:     { transform: "scale(1.03) translateY(-1px)", boxShadow: "0 0 24px rgba(228,255,151,0.65), 0 6px 16px rgba(0,0,0,0.12)" },
  solid:       { transform: "scale(1.02) translateY(-1px)", boxShadow: "0 8px 24px rgba(0,0,0,0.30)", opacity: 0.88 },
  outline:     { transform: "scale(1.02)", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", borderColor: "currentColor" },
  ghost:       { transform: "scale(1.02)", backgroundColor: "rgba(0,0,0,0.06)" },
  glass:       { transform: "scale(1.02) translateY(-1px)", boxShadow: "0 4px 28px rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.22)" },
  secondary:   { transform: "scale(1.02)", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", opacity: 0.82 },
  destructive: { transform: "scale(1.03) translateY(-1px)", boxShadow: "0 0 22px rgba(232,64,42,0.50), 0 6px 16px rgba(0,0,0,0.12)" },
  gradient:    { transform: "scale(1.02) translateY(-1px)", boxShadow: "0 8px 24px rgba(0,0,0,0.30)", opacity: 0.88 },
};

const activeStyles: React.CSSProperties = {
  transform: "scale(0.96) translateY(0px)",
  boxShadow: "none",
  transition: "all 80ms ease-out",
};

/* ── Shimmer-Farbe pro Variante ── */
const shimmerColor: Record<string, string> = {
  primary:     "rgba(255,255,255,0.55)",
  solid:       "rgba(255,255,255,0.18)",
  destructive: "rgba(255,200,180,0.35)",
  gradient:    "rgba(255,255,255,0.18)",
};

/* ── Ripple-Farbe pro Variante ── */
const rippleColor: Record<string, string> = {
  primary:     "rgba(10,10,10,0.18)",
  solid:       "rgba(255,255,255,0.30)",
  outline:     "rgba(0,0,0,0.10)",
  ghost:       "rgba(0,0,0,0.08)",
  glass:       "rgba(255,255,255,0.25)",
  secondary:   "rgba(0,0,0,0.08)",
  destructive: "rgba(255,255,255,0.30)",
  gradient:    "rgba(255,255,255,0.30)",
};

interface Ripple { id: number; x: number; y: number; size: number; }

export interface VoltButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const VoltButton = React.forwardRef<HTMLButtonElement, VoltButtonProps>(
  ({ className, variant = "primary", size, loading, leftIcon, rightIcon, children, disabled, onMouseDown, style, ...props }, ref) => {
    const [isHovered, setIsHovered]   = useState(false);
    const [isPressed, setIsPressed]   = useState(false);
    const [ripples, setRipples]       = useState<Ripple[]>([]);
    const [shimmerX, setShimmerX]     = useState(-100);
    const btnRef = useRef<HTMLButtonElement>(null);
    const rippleCounter = useRef(0);

    const variantKey = (variant ?? "primary") as string;
    const hasShimmer = variantKey in shimmerColor;

    /* ── Ripple beim Click ── */
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = (ref as React.RefObject<HTMLButtonElement>)?.current ?? btnRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;
        const id = ++rippleCounter.current;
        setRipples(prev => [...prev, { id, x, y, size }]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
      }
      setIsPressed(true);
      onMouseDown?.(e);
    }, [ref, onMouseDown]);

    /* ── Shimmer-Position auf Hover ── */
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!hasShimmer || !isHovered) return;
      const btn = (ref as React.RefObject<HTMLButtonElement>)?.current ?? btnRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setShimmerX(((e.clientX - rect.left) / rect.width) * 100);
      }
    }, [hasShimmer, isHovered, ref]);

    const computedStyle: React.CSSProperties = {
      ...style,
      ...(isPressed ? activeStyles : isHovered ? (hoverStyles[variantKey] ?? {}) : {}),
      transition: isPressed ? "all 80ms ease-out" : "all 200ms ease-out",
    };

    return (
      <button
        ref={(node) => {
          (btnRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        style={computedStyle}
        onMouseEnter={() => { setIsHovered(true); setShimmerX(-100); }}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={handleMouseDown}
        onMouseUp={() => setIsPressed(false)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {/* ── Shimmer-Sweep ── */}
        {hasShimmer && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: `linear-gradient(105deg, transparent ${shimmerX - 20}%, ${shimmerColor[variantKey]} ${shimmerX}%, transparent ${shimmerX + 20}%)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 200ms",
            }}
          />
        )}

        {/* ── Ripple-Ringe ── */}
        {ripples.map(r => (
          <span
            key={r.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full animate-ping"
            style={{
              left: r.x - r.size / 2,
              top:  r.y - r.size / 2,
              width: r.size,
              height: r.size,
              background: rippleColor[variantKey] ?? "rgba(255,255,255,0.20)",
              animationDuration: "500ms",
              animationIterationCount: 1,
              animationTimingFunction: "ease-out",
            }}
          />
        ))}

        {/* ── Inhalt ── */}
        <span className="relative z-10 inline-flex items-center gap-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : leftIcon ? (
            <span className="flex items-center">{leftIcon}</span>
          ) : null}
          {children}
          {!loading && rightIcon && (
            <span className="flex items-center">{rightIcon}</span>
          )}
        </span>
      </button>
    );
  }
);
VoltButton.displayName = "VoltButton";
export { buttonVariants };
