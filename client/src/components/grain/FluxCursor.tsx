/**
 * FluxCursor – Flux UI Brand Element
 * Das ikonische Pfeil+Cursor-Symbol: Terminal-Prompt-Ästhetik
 * Pfeil (links) + blinkender Balken (rechts unten)
 *
 * Varianten:
 *   - size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
 *   - color: "black" | "lime" | "white" | "current"
 *   - animated: boolean (Balken blinkt)
 *   - showBar: boolean (Balken sichtbar)
 */

import React from "react";
import { cn } from "@/lib/utils";

export interface FluxCursorProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  color?: "black" | "lime" | "white" | "current";
  animated?: boolean;
  showBar?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_MAP = {
  xs:  { width: 20,  height: 13  },
  sm:  { width: 32,  height: 21  },
  md:  { width: 48,  height: 31  },
  lg:  { width: 72,  height: 47  },
  xl:  { width: 96,  height: 62  },
  "2xl": { width: 144, height: 94 },
};

const COLOR_MAP = {
  black:   "#0A0A0A",
  lime:    "#E4FF97",
  white:   "#FFFFFF",
  current: "currentColor",
};

export const FluxCursor: React.FC<FluxCursorProps> = ({
  size = "md",
  color = "black",
  animated = true,
  showBar = true,
  className,
  style,
}) => {
  const { width, height } = SIZE_MAP[size];
  const fill = COLOR_MAP[color];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 414.24 269.82"
      width={width}
      height={height}
      className={cn("flex-shrink-0", className)}
      style={style}
      aria-hidden="true"
    >
      {animated && (
        <style>{`
          @keyframes grain-cursor-blink {
            0%, 49%   { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          .grain-cursor-bar {
            animation: grain-cursor-blink 1s steps(1, end) infinite;
          }
        `}</style>
      )}
      {/* Pfeil / Chevron */}
      <path
        d="M0,214.08v-54.39l144.89-52.65L0,53.95V0l207.12,78.76v56.57L0,214.08Z"
        fill={fill}
      />
      {/* Blinkender Balken */}
      {showBar && (
        <path
          className={animated ? "grain-cursor-bar" : undefined}
          d="M207.12,269.82v-55.74h207.12v55.74h-207.12Z"
          fill={fill}
        />
      )}
    </svg>
  );
};

FluxCursor.displayName = "FluxCursor";

/**
 * FluxCursorLogo – Logo-Kombination: Icon + Wortmarke
 * Für Sidebar-Header und Splash-Screens
 */
export interface FluxCursorLogoProps {
  size?: "sm" | "md" | "lg";
  inverted?: boolean;  // Weißes Logo auf dunklem Hintergrund
  showTagline?: boolean;
  className?: string;
}

export const FluxCursorLogo: React.FC<FluxCursorLogoProps> = ({
  size = "md",
  inverted = false,
  showTagline = false,
  className,
}) => {
  const iconSize = size === "sm" ? "sm" : size === "lg" ? "xl" : "lg";
  const iconColor = inverted ? "white" : "black";
  const textColor = inverted ? "text-white" : "text-foreground";
  const subColor  = inverted ? "text-white/50" : "text-muted-foreground";

  const titleSize = size === "sm"
    ? "text-base font-bold"
    : size === "lg"
    ? "text-2xl font-black"
    : "text-xl font-bold";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <FluxCursor size={iconSize} color={iconColor} animated />
      <div className="flex flex-col leading-none">
        <span className={cn("font-display tracking-tight", titleSize, textColor)}>
          grain
          <span style={{ color: inverted ? "#E4FF97" : "#0A0A0A", opacity: inverted ? 1 : 0.35 }}>ui</span>
        </span>
        {showTagline && (
          <span className={cn("text-[9px] font-mono uppercase tracking-[0.15em] mt-0.5", subColor)}>
            Design System
          </span>
        )}
      </div>
    </div>
  );
};

FluxCursorLogo.displayName = "FluxCursorLogo";
