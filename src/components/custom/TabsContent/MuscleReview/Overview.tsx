"use client";

import React, { useEffect, useState } from "react";
import { Activity, Clock, HeartPulse, Info } from "lucide-react";
import { Muscle, StretchingExercise } from "@/types/Muscle";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getStretchingExOfMuscle } from "@/server/muscles/musclesDataFunctions";

interface OverviewProps {
  muscleInfo: Muscle;
}

const LEVELS = [
  { key: "b", label: "Beginner", bar: "bg-gradient-to-r from-emerald-500 to-emerald-300" },
  { key: "i", label: "Intermediate", bar: "bg-gradient-to-r from-sky-500 to-sky-300" },
  { key: "a", label: "Advanced", bar: "bg-gradient-to-r from-amber-500 to-amber-300" },
] as const;

/** "2-3" -> 3, "2" -> 2; the bar is scaled against four sessions a week. */
const sessionsPerWeek = (value: string | undefined): number => {
  const numbers = (value ?? "").match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
  return numbers.length ? Math.max(...numbers) : 0;
};

const Overview: React.FC<OverviewProps> = ({ muscleInfo }) => {
  const [stretches, setStretches] = useState<StretchingExercise[] | null>(null);

  useEffect(() => {
    if (!muscleInfo.id) return;
    let cancelled = false;
    getStretchingExOfMuscle(muscleInfo.id.toString())
      .then((data) => {
        if (!cancelled) setStretches(data ?? []);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setStretches([]);
      });
    return () => {
      cancelled = true;
    };
  }, [muscleInfo.id]);

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <article className="lg:col-span-3">
        <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
            <Info className="h-4 w-4" />
          </span>
          About the {muscleInfo.n.toLowerCase()}
        </h2>

        <div className="prose-muscle mt-5">
          <p>{muscleInfo.desc}</p>
        </div>

        <h3 className="mt-8 text-lg font-semibold">What it does</h3>
        <p className="prose-muscle mt-2">{muscleInfo.func}</p>

        <h3 className="mt-8 text-lg font-semibold">Where it sits</h3>
        <p className="prose-muscle mt-2">{muscleInfo.anat}</p>
      </article>

      <aside className="space-y-6 lg:col-span-2">
        <section className="panel p-6">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300">
              <Activity className="h-4 w-4" />
            </span>
            Training frequency
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sessions a week in which this group gets direct work, by experience level.
          </p>

          <div className="mt-6 space-y-5">
            {LEVELS.map(({ key, label, bar }) => {
              const raw = muscleInfo.freq?.[key];
              const sessions = sessionsPerWeek(raw);
              return (
                <div key={key}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {raw ? `${raw}× per week` : "-"}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(100, (sessions / 4) * 100)}
                    aria-label={`${label}: ${raw ?? "-"} sessions per week`}
                    indicatorClassName={bar}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
              <HeartPulse className="h-4 w-4" />
            </span>
            Stretches
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Hold each one after training or on rest days.
          </p>

          <div className="mt-5 space-y-3">
            {stretches === null ? (
              Array.from({ length: 3 }, (_, index) => <div key={index} className="skeleton h-20" />)
            ) : stretches.length === 0 ? (
              <p className="text-sm text-muted-foreground">No stretches recorded for this muscle yet.</p>
            ) : (
              stretches.map((stretch, index) => (
                <div key={`${stretch.n}-${index}`} className="panel-muted p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-sans text-base font-semibold tracking-normal">{stretch.n}</h3>
                    {stretch.dur && (
                      <Badge variant="outline" className="shrink-0">
                        <Clock />
                        {stretch.dur}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{stretch.desc}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Overview;
