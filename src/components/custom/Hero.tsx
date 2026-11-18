"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Box, ClipboardList, Dumbbell, HeartPulse, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMuscles } from "@/contexts/MusclesContext";
import { musclesData } from "@/data/musclesData";
import { cn } from "@/lib/utils";

/**
 * Three groups that photograph well side by side; the ids match muscles.json.
 * Positioned with left/right offsets only: motion writes an inline transform on
 * these tiles, which would override a Tailwind translate.
 */
const SPOTLIGHT = [
  { id: 3, name: "Back", src: "/images/for_muscles_chart/back_muscles.png", className: "left-0 top-8 w-[44%] -rotate-6", delay: "0s" },
  { id: 8, name: "Chest", src: "/images/for_muscles_chart/chest.png", className: "left-[25%] top-0 z-10 w-[50%]", delay: "1.2s" },
  { id: 12, name: "Quads", src: "/images/for_muscles_chart/quads.png", className: "right-0 top-10 w-[44%] rotate-6", delay: "2.4s" },
];

const countExercises = (list: { ex?: unknown[] }[]) => list.reduce((sum, muscle) => sum + (muscle.ex?.length ?? 0), 0);
const countStretches = (list: { str?: unknown[] }[]) => list.reduce((sum, muscle) => sum + (muscle.str?.length ?? 0), 0);

const Hero = () => {
  const { muscles } = useMuscles();
  const reduceMotion = useReducedMotion();

  // Live numbers once the library is in, the bundled dataset until then
  const source = muscles.length ? muscles : musclesData;
  const stats = [
    { icon: Layers, value: source.length, label: "muscle groups" },
    { icon: Dumbbell, value: countExercises(source) || countExercises(musclesData), label: "exercises" },
    { icon: HeartPulse, value: countStretches(source) || countStretches(musclesData), label: "stretches" },
    { icon: Box, value: 3, label: "ways to explore" },
  ];

  const exerciseCountFor = (id: number) => source.find((muscle) => String(muscle.id) === String(id))?.ex?.length;

  return (
    <section className="relative pb-16 pt-4 sm:pt-8 lg:pb-24 lg:pt-12">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="fade-up inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300 sm:tracking-[0.16em]">
            <Sparkles className="h-3.5 w-3.5" />
            Anatomy-first training companion
          </p>

          <h1 className="fade-up mt-6 text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
            Know what you&apos;re training.
            <br />
            <span className="text-gradient">And why it matters.</span>
          </h1>

          <p className="fade-up mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl" style={{ "--delay": "160ms" } as React.CSSProperties}>
            Twelve muscle groups, each with its anatomy, exercises, common injuries and stretches.
            Browse them as a grid, a list or a 3D model you can rotate, then turn five answers into
            your first weekly plan.
          </p>

          <div className="fade-up mt-8 flex flex-wrap items-center gap-3" style={{ "--delay": "240ms" } as React.CSSProperties}>
            <Button asChild size="lg">
              <a href="#chart">
                Explore the muscle chart
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/beginnerGuide">
                <ClipboardList />
                Build my starting plan
              </Link>
            </Button>
          </div>

        </div>

        {/* Spotlight collage */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-hidden="true">
          <div className="absolute inset-0 -z-10 bg-grid-faint bg-[size:28px_28px] mask-fade-radial opacity-80" />
          <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="relative aspect-[4/3.1]">
            {SPOTLIGHT.map((tile, index) => (
              <motion.div
                key={tile.id}
                className={cn("absolute", tile.className)}
                initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.25 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/muscles/${tile.id}`}
                  tabIndex={-1}
                  className={cn("group block rounded-[1.6rem] border border-white/10 bg-surface-2/90 p-1.5 shadow-elevated backdrop-blur transition-colors hover:border-emerald-400/40", !reduceMotion && "animate-float")}
                  style={{ animationDelay: tile.delay }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem]">
                    <Image
                      src={tile.src}
                      alt=""
                      fill
                      priority={index === 1}
                      sizes="(min-width: 1024px) 24vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3.5">
                      <span className="font-display text-base font-semibold text-white sm:text-lg">{tile.name}</span>
                      {exerciseCountFor(tile.id) && (
                        <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-xs font-medium text-white/85 backdrop-blur-md">
                          {exerciseCountFor(tile.id)} ex.
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Library at a glance */}
      <dl
        className="fade-up mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:mt-20 lg:grid-cols-4"
        style={{ "--delay": "360ms" } as React.CSSProperties}
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col-reverse gap-1 bg-card px-5 py-5 sm:px-6">
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-emerald-400" />
              {label}
            </dt>
            <dd className="font-display text-4xl font-bold tabular-nums tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
