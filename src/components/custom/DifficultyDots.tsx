import React from "react";
import { cn } from "@/lib/utils";

const LEVEL_LABELS: Record<number, string> = {
  1: "Easy to learn",
  2: "Moderate",
  3: "Demanding",
  4: "Hard",
  5: "Elite",
};

export const levelLabel = (level: number | undefined): string => LEVEL_LABELS[clampLevel(level)];

const clampLevel = (level: number | undefined): number => Math.min(5, Math.max(1, Math.round(level ?? 3)));

interface DifficultyDotsProps {
  level: number | undefined;
  className?: string;
  /** Render the text label next to the dots. */
  showLabel?: boolean;
  size?: "sm" | "md";
}

/** Five dots, filled up to the muscle's training difficulty. */
const DifficultyDots = ({ level, className, showLabel = false, size = "md" }: DifficultyDotsProps) => {
  const value = clampLevel(level);
  const dot = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      role="img"
      aria-label={`Difficulty ${value} of 5: ${levelLabel(value)}`}
    >
      <span className="inline-flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "rounded-full transition-colors",
              dot,
              index < value
                ? value >= 4
                  ? "bg-red-400 shadow-[0_0_8px_rgb(248_113_113/0.6)]"
                  : value === 3
                    ? "bg-amber-400 shadow-[0_0_8px_rgb(251_191_36/0.5)]"
                    : "bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153/0.55)]"
                : "bg-white/15"
            )}
          />
        ))}
      </span>
      {showLabel && <span className="text-xs font-medium text-muted-foreground">{levelLabel(value)}</span>}
    </span>
  );
};

export default DifficultyDots;
