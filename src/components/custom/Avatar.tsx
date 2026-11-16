import React from "react";
import { cn } from "@/lib/utils";

/** Two letters for an avatar: first letters of two words, or the first two of one. */
export const initialsOf = (name?: string | null, email?: string | null): string => {
  const source = (name?.trim() || email?.split("@")[0] || "").trim();
  if (!source) return "?";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  const letters = parts.length >= 2 ? parts[0][0] + parts[1][0] : source.slice(0, 2);
  return letters.toUpperCase();
};

interface AvatarProps {
  name?: string | null;
  email?: string | null;
  className?: string;
}

/** Gradient disc with the person's initials; used wherever a profile picture would go. */
const Avatar = ({ name, email, className }: AvatarProps) => (
  <span
    aria-hidden="true"
    className={cn(
      "inline-flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-200 via-emerald-400 to-teal-600 font-display text-xs font-bold tracking-wide text-[#052e22] shadow-glow-sm",
      className
    )}
  >
    {initialsOf(name, email)}
  </span>
);

export default Avatar;
