"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { CommonInjury } from "@/types/Muscle";
import { getCommonInjuriesOfMuscle } from "@/server/muscles/musclesDataFunctions";

interface InjuriesProps {
  muscleId: string | undefined;
}

const Injuries: React.FC<InjuriesProps> = ({ muscleId }) => {
  const [injuries, setInjuries] = useState<CommonInjury[] | null>(null);

  useEffect(() => {
    if (!muscleId) return;
    let cancelled = false;
    getCommonInjuriesOfMuscle(muscleId)
      .then((data) => {
        if (!cancelled) setInjuries(data ?? []);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setInjuries([]);
      });
    return () => {
      cancelled = true;
    };
  }, [muscleId]);

  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold">Common injuries &amp; prevention</h2>
        <p className="mt-2 text-muted-foreground">
          What tends to go wrong with this group, and the habits that keep it from happening. Pain
          that lingers for more than a few days is a reason to see a professional, not to push through.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {injuries === null
          ? Array.from({ length: 4 }, (_, index) => <div key={index} className="skeleton h-56 rounded-2xl" />)
          : injuries.map((injury, index) => (
              <article key={`${injury.n}-${index}`} className="panel flex flex-col p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-300">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold">{injury.n}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{injury.desc}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-emerald-400/20 border-l-[3px] border-l-emerald-400 bg-emerald-400/[0.06] px-4 py-3.5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    <ShieldCheck className="h-4 w-4" />
                    Prevention
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{injury.prev}</p>
                </div>
              </article>
            ))}
      </div>

      {injuries?.length === 0 && (
        <p className="panel mt-8 px-6 py-12 text-center text-muted-foreground">
          No injuries recorded for this muscle yet.
        </p>
      )}
    </div>
  );
};

export default Injuries;
