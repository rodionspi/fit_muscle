"use client";

import React, { useRef, useState } from "react";
import { Check, Dices, X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { setDataToLS } from "@/server/user/localStorageFunctions";
import { saveUserAvatar } from "@/server/user/userDataFunctions";
import { describeAuthError } from "@/server/user/authErrors";
import {
  AVATAR_STYLES,
  STARTER_SEEDS,
  avatarUrl,
  formatAvatar,
  parseAvatar,
  randomSeeds,
  type AvatarStyle,
} from "@/lib/avatars";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/custom/Feedback";
import Avatar from "@/components/custom/Avatar";
import { cn } from "@/lib/utils";

type SaveState =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved" }
  | { kind: "error"; message: string };

interface AvatarPickerProps {
  id?: string;
  onClose?: () => void;
}

/**
 * A grid of ready-made avatars for the signed-in profile. A tap applies the avatar right away -
 * in this browser first, then on the Firebase profile - so there is no separate save step.
 */
const AvatarPicker = ({ id = "avatar-picker", onClose }: AvatarPickerProps) => {
  const { userData, setUserData } = useUser();
  const current = parseAvatar(userData?.avatar);
  const [style, setStyle] = useState<AvatarStyle>(current?.style ?? AVATAR_STYLES[0].id);
  // One batch per style, so switching styles and back keeps what was shuffled. The current
  // avatar leads its style's batch, so the picker always opens with the selection in view.
  const [batches, setBatches] = useState<Partial<Record<AvatarStyle, string[]>>>(() =>
    current && !STARTER_SEEDS.includes(current.seed)
      ? { [current.style]: [current.seed, ...STARTER_SEEDS.slice(0, -1)] }
      : {}
  );
  const [save, setSave] = useState<SaveState>({ kind: "idle" });
  // Only the newest of several quick taps may report its result
  const latestSave = useRef(0);

  if (!userData?.id) return null;
  const uid = userData.id;
  const seeds = batches[style] ?? STARTER_SEEDS;
  const styleLabel = AVATAR_STYLES.find((item) => item.id === style)?.label ?? "";

  const choose = async (avatar: string | null) => {
    if (avatar === (userData.avatar ?? null)) return;

    // null rather than undefined: localStorage keeps it as "null", which reads back as "no avatar"
    const profile = { ...userData, avatar };
    setUserData(profile);
    setDataToLS(profile);

    const attempt = ++latestSave.current;
    setSave({ kind: "saving" });
    try {
      await saveUserAvatar(uid, avatar);
      if (attempt === latestSave.current) setSave({ kind: "saved" });
    } catch (error) {
      console.error("Could not save the avatar to the profile:", error);
      if (attempt === latestSave.current) setSave({ kind: "error", message: describeAuthError(error) });
    }
  };

  const shuffle = () => setBatches((previous) => ({ ...previous, [style]: randomSeeds() }));

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="panel p-5 duration-300 animate-in fade-in slide-in-from-top-2 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={`${id}-title`} className="text-xl font-semibold">
            Pick your avatar
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap one to wear it. Not feeling these? Shuffle - there is always another batch.
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close avatar picker" type="button">
            <X />
          </Button>
        )}
      </div>

      <div role="group" aria-label="Avatar style" className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1">
        {AVATAR_STYLES.map((item) => {
          const active = item.id === style;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setStyle(item.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary/50 bg-primary/10 text-emerald-200"
                  : "border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
              )}
            >
              <img
                src={avatarUrl({ style: item.id, seed: STARTER_SEEDS[0] })}
                alt=""
                draggable={false}
                referrerPolicy="no-referrer"
                className="h-7 w-7 rounded-full bg-surface-3"
              />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {seeds.map((seed, index) => {
          const value = formatAvatar({ style, seed });
          const selected = value === userData.avatar;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              aria-label={`${styleLabel} avatar ${index + 1}`}
              onClick={() => choose(value)}
              style={{ animationDelay: `${index * 25}ms`, animationFillMode: "backwards" }}
              className={cn(
                "relative aspect-square rounded-2xl bg-surface-2 outline-none transition-all duration-300 animate-in fade-in zoom-in-90 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                selected
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                  : "ring-1 ring-white/5 hover:ring-white/25"
              )}
            >
              <img
                src={avatarUrl({ style, seed })}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                referrerPolicy="no-referrer"
                className="h-full w-full rounded-2xl object-cover"
              />
              {selected && (
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={shuffle}>
            <Dices />
            Shuffle
          </Button>
          {userData.avatar && (
            <Button type="button" variant="ghost" onClick={() => choose(null)}>
              <Avatar name={userData.name} email={userData.email} className="h-5 w-5 text-[9px] shadow-none" />
              Use initials
            </Button>
          )}
        </div>

        <p aria-live="polite" className="min-h-5 text-sm">
          {save.kind === "saving" && (
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Spinner className="h-3.5 w-3.5 border-2" />
              Saving...
            </span>
          )}
          {save.kind === "saved" && (
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <Check className="h-4 w-4" />
              Saved to your profile
            </span>
          )}
          {save.kind === "error" && (
            <span className="text-red-300">Changed on this device only. {save.message}</span>
          )}
        </p>
      </div>

      <p className="mt-5 text-xs text-muted-foreground">
        Avatars by{" "}
        <a
          href="https://www.dicebear.com"
          target="_blank"
          rel="noreferrer"
          className="text-foreground/80 underline-offset-4 hover:underline"
        >
          DiceBear
        </a>
        , free to use under CC0.
      </p>
    </section>
  );
};

export default AvatarPicker;
