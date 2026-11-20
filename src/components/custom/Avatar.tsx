"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { avatarUrl, parseAvatar } from "@/lib/avatars";

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
  /** The profile's chosen avatar ("style:seed"); without one the initials are shown. */
  avatar?: string | null;
  className?: string;
}

/**
 * The person's chosen avatar, or a gradient disc with their initials. The initials are also the
 * fallback when the avatar image cannot load (offline, API down).
 */
const Avatar = ({ name, email, avatar, className }: AvatarProps) => {
  const choice = parseAvatar(avatar);
  const src = choice ? avatarUrl(choice) : null;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (src && src !== failedSrc) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-9 w-9 shrink-0 select-none overflow-hidden rounded-full bg-surface-3 ring-1 ring-white/10",
          className
        )}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
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
};

export default Avatar;
