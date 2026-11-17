"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BarChart3, ChevronLeft, ChevronRight, Dumbbell, Flame, Lightbulb, Play, Target } from "lucide-react";
import { Exercise } from "@/types/Muscle";
import { Button } from "@/components/ui/button";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { getMuscleExercisesById } from "@/server/muscles/musclesDataFunctions";
import { cn } from "@/lib/utils";

interface ExercisesProps {
  muscleId: string | undefined;
  /** Name of the exercise to open first, e.g. when arriving from the exercise library. */
  initialExercise?: string | null;
}

const Stat = ({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  tone: string;
}) => (
  <div className="panel-muted flex items-center gap-3 px-4 py-3">
    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", tone)}>
      <Icon className="h-4 w-4" />
    </span>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-semibold">{value}</p>
    </div>
  </div>
);

const Exercises: React.FC<ExercisesProps> = ({ muscleId, initialExercise }) => {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!muscleId) return;
    let cancelled = false;
    getMuscleExercisesById(muscleId)
      .then((data) => {
        if (cancelled) return;
        const list = data ?? [];
        setExercises(list);
        if (initialExercise) {
          const index = list.findIndex((exercise) => exercise.n === initialExercise);
          if (index >= 0) setActive(index);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setExercises([]);
      });
    return () => {
      cancelled = true;
    };
  }, [muscleId, initialExercise]);

  if (exercises === null) {
    return (
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="skeleton h-96" />
        <div className="skeleton h-[32rem]" />
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="panel px-6 py-16 text-center">
        <Dumbbell className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-4 font-semibold">No exercises recorded for this muscle yet.</p>
      </div>
    );
  }

  const current = exercises[Math.min(active, exercises.length - 1)];
  const isHold = current.r <= 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      {/* Phone: a horizontal strip of chips */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
        {exercises.map((exercise, index) => (
          <button
            key={`${exercise.n}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              index === active
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                : "border-border bg-surface-2 text-muted-foreground hover:text-foreground"
            )}
          >
            {exercise.n}
          </button>
        ))}
      </div>

      {/* Desktop: the full list */}
      <aside className="hidden lg:block">
        <div className="panel sticky top-24 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Exercises
            </h2>
            <span className="text-xs tabular-nums text-muted-foreground">{exercises.length}</span>
          </div>
          <ul className="max-h-[36rem] overflow-y-auto">
            {exercises.map((exercise, index) => {
              const selected = index === active;
              return (
                <li key={`${exercise.n}-${index}`}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={selected ? "true" : undefined}
                    className={cn(
                      "relative flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-emerald-400 bg-white/[0.05]"
                        : "border-transparent hover:bg-white/[0.03]"
                    )}
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-2">
                      {exercise.img && (
                        <Image src={exercise.img} alt="" fill unoptimized sizes="48px" className="object-cover" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block truncate text-sm font-medium", selected && "text-emerald-200")}>
                        {exercise.n}
                      </span>
                      <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            exercise.diff === "Beginner"
                              ? "bg-emerald-400"
                              : exercise.diff === "Intermediate"
                                ? "bg-amber-400"
                                : "bg-red-400"
                          )}
                        />
                        <span className="truncate">{exercise.diff}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Details */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={`${current.n}-${active}`}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="min-w-0"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Exercise {active + 1} of {exercises.length}
              </p>
              <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{current.n}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant={difficultyVariant(current.diff)}>{current.diff}</Badge>
                {current.eq && <Badge variant="secondary">{current.eq}</Badge>}
                {current.tgt && (
                  <Badge variant="outline">
                    <Target />
                    {current.tgt}
                  </Badge>
                )}
              </div>
            </div>
            {current.vid && (
              <Button asChild>
                <a href={current.vid} target="_blank" rel="noopener noreferrer">
                  <Play />
                  Watch video
                </a>
              </Button>
            )}
          </div>

          <div className="panel mt-6 overflow-hidden">
            <a
              href={current.vid || undefined}
              target={current.vid ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative block aspect-video bg-surface-2"
              aria-label={current.vid ? `Watch ${current.n} on video` : undefined}
            >
              {current.img && (
                <Image
                  src={current.img}
                  alt={`${current.n} demonstration`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-contain"
                />
              )}
              {current.vid && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-elevated backdrop-blur-md transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
                  </span>
                </span>
              )}
            </a>

            <div className="p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Stat icon={BarChart3} label="Sets" value={current.s} tone="bg-emerald-400/10 text-emerald-300" />
                <Stat
                  icon={Flame}
                  label={isHold ? "Hold" : "Reps"}
                  value={isHold ? "30-45 s" : current.r}
                  tone="bg-amber-400/10 text-amber-300"
                />
                <Stat icon={Dumbbell} label="Equipment" value={current.eq || "-"} tone="bg-sky-400/10 text-sky-300" />
                <Stat icon={Target} label="Target" value={current.tgt || "-"} tone="bg-violet-400/10 text-violet-300" />
              </div>

              <h3 className="mt-8 text-lg font-semibold">How to perform</h3>
              <p className="prose-muscle mt-2">{current.desc}</p>

              {current.tips && (
                <div className="mt-6 flex gap-3 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] p-4">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  <div>
                    <p className="text-sm font-semibold text-amber-200">Coach&apos;s cue</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/85">{current.tips}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setActive((index) => Math.max(0, index - 1))}
              disabled={active === 0}
              type="button"
            >
              <ChevronLeft />
              Previous
            </Button>
            <span className="text-xs tabular-nums text-muted-foreground">
              {active + 1} / {exercises.length}
            </span>
            <Button
              variant="outline"
              onClick={() => setActive((index) => Math.min(exercises.length - 1, index + 1))}
              disabled={active === exercises.length - 1}
              type="button"
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
};

export default Exercises;
