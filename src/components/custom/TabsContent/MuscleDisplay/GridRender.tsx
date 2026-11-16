"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BicepsFlexed } from "lucide-react";
import { Muscle } from "@/types/Muscle";
import { getMuscleImageWithFallback } from "@/lib/muscleImageMapper";
import DifficultyDots from "@/components/custom/DifficultyDots";

const EASE = [0.22, 1, 0.36, 1] as const;

const GridRender = ({ musclesList }: { musclesList: Muscle[] }) => {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {musclesList.map((muscle, index) => {
        const imagePath = getMuscleImageWithFallback(muscle.id, muscle.img);
        const exerciseCount = muscle.ex?.length ?? 0;

        return (
          <motion.li
            key={muscle.id}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: Math.min(index, 11) * 0.045, ease: EASE }}
          >
            <Link
              href={`/muscles/${muscle.id}`}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                {imagePath ? (
                  <Image
                    src={imagePath}
                    alt={muscle.n}
                    fill
                    priority={index < 4}
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BicepsFlexed className="h-16 w-16 text-muted-foreground/40" />
                  </div>
                )}

                {/* Scrim so the caption reads on the light studio photos */}
                <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[hsl(226_20%_6%)] via-[hsl(226_20%_6%/0.6)] to-transparent" />

                <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl">{muscle.n}</h3>
                  <p className="mt-0.5 truncate text-xs text-white/60">{muscle.sn}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <DifficultyDots level={muscle.lvl} size="sm" />
                    {exerciseCount > 0 && (
                      <span className="text-xs tabular-nums text-white/65">{exerciseCount} exercises</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default GridRender;
