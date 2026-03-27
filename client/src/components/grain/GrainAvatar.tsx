/**
 * GrainAvatar – Atmospheric Grain Design System
 * Avatar-Komponente mit Gradient-Fallback und Grain-Textur.
 */

import React from "react";
import { cn } from "@/lib/utils";

const gradients = [
  "bg-[linear-gradient(135deg,oklch(0.42_0.22_268),oklch(0.36_0.20_285))]",
  "bg-[linear-gradient(135deg,oklch(0.52_0.26_27),oklch(0.45_0.22_20))]",
  "bg-[linear-gradient(135deg,oklch(0.42_0.22_268),oklch(0.52_0.26_27))]",
  "bg-[linear-gradient(135deg,oklch(0.36_0.20_285),oklch(0.52_0.26_27))]",
  "bg-[linear-gradient(135deg,oklch(0.55_0.18_145),oklch(0.42_0.22_268))]",
];

function getGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export interface GrainAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  online?: boolean;
}

const sizeClasses = {
  xs: "w-6  h-6  text-[0.6rem]",
  sm: "w-8  h-8  text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const onlineSizes = {
  xs: "w-1.5 h-1.5 bottom-0 right-0",
  sm: "w-2   h-2   bottom-0 right-0",
  md: "w-2.5 h-2.5 bottom-0 right-0",
  lg: "w-3   h-3   bottom-0.5 right-0.5",
  xl: "w-3.5 h-3.5 bottom-0.5 right-0.5",
};

export const GrainAvatar = React.forwardRef<HTMLDivElement, GrainAvatarProps>(
  ({ className, src, alt, name, size = "md", ring, online, ...props }, ref) => {
    const initials = name
      ? name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
      : "?";
    const gradient = getGradient(name || alt || "default");

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full flex-shrink-0 grain overflow-hidden",
          sizeClasses[size],
          ring && "ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center", gradient)}>
            <span className="font-display font-bold text-white relative z-10">
              {initials}
            </span>
          </div>
        )}
        {online && (
          <span
            className={cn(
              "absolute rounded-full bg-green-500 ring-2 ring-background z-20",
              onlineSizes[size]
            )}
          />
        )}
      </div>
    );
  }
);
GrainAvatar.displayName = "GrainAvatar";

/* ── Avatar Group ── */
export interface GrainAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{ src?: string; name?: string; alt?: string }>;
  max?: number;
  size?: GrainAvatarProps["size"];
}

export const GrainAvatarGroup: React.FC<GrainAvatarGroupProps> = ({
  avatars,
  max = 4,
  size = "md",
  className,
  ...props
}) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {visible.map((avatar, i) => (
        <GrainAvatar
          key={i}
          {...avatar}
          size={size}
          className="-ml-2 first:ml-0 ring-2 ring-background"
          style={{ zIndex: visible.length - i }}
        />
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "-ml-2 ring-2 ring-background rounded-full flex items-center justify-center",
            "bg-muted text-muted-foreground font-semibold font-body",
            sizeClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          <span className="text-[0.65rem]">+{overflow}</span>
        </div>
      )}
    </div>
  );
};
