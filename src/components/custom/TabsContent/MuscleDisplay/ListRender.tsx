"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BicepsFlexed } from "lucide-react";
import { Muscle } from "@/types/Muscle";
import { getMuscleImageWithFallback } from "@/lib/muscleImageMapper";
import DifficultyDots from "@/components/custom/DifficultyDots";

const KEY_EXERCISES = 3;

const ListRender = ({ musclesList }: { musclesList: Muscle[] }) => {
  const router = useRouter();

  return (
    <div className="panel overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-surface-2/60 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <th scope="col" className="px-5 py-3.5 font-semibold">Muscle group</th>
            <th scope="col" className="hidden px-5 py-3.5 font-semibold md:table-cell">Primary function</th>
            <th scope="col" className="hidden px-5 py-3.5 font-semibold lg:table-cell">Key exercises</th>
            <th scope="col" className="hidden px-5 py-3.5 font-semibold sm:table-cell">Level</th>
            <th scope="col" className="px-5 py-3.5">
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {musclesList.map((muscle) => {
            const href = `/muscles/${muscle.id}`;
            const imagePath = getMuscleImageWithFallback(muscle.id, muscle.img);
            const exercises = muscle.ex ?? [];
            const keyExercises = exercises.slice(0, KEY_EXERCISES).map((exercise) => exercise.n);

            return (
              <tr
                key={muscle.id}
                onClick={() => router.push(href)}
                className="group cursor-pointer transition-colors hover:bg-white/[0.03]"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2">
                      {imagePath ? (
                        <Image src={imagePath} alt="" fill sizes="48px" className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <BicepsFlexed className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={href}
                        className="font-semibold text-foreground transition-colors group-hover:text-emerald-300"
                      >
                        {muscle.n}
                      </Link>
                      <p className="max-w-[14rem] truncate text-xs text-muted-foreground">{muscle.sn}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-5 py-3.5 align-middle text-sm text-muted-foreground md:table-cell">
                  <p className="line-clamp-2 max-w-md">{muscle.func}</p>
                </td>
                <td className="hidden px-5 py-3.5 align-middle lg:table-cell">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {keyExercises.map((name) => (
                      <span
                        key={name}
                        className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-foreground/80"
                      >
                        {name}
                      </span>
                    ))}
                    {exercises.length > KEY_EXERCISES && (
                      <span className="text-xs text-muted-foreground">+{exercises.length - KEY_EXERCISES}</span>
                    )}
                  </div>
                </td>
                <td className="hidden px-5 py-3.5 align-middle sm:table-cell">
                  <DifficultyDots level={muscle.lvl} size="sm" showLabel />
                </td>
                <td className="px-5 py-3.5 text-right align-middle">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListRender;
