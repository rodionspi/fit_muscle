"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Dumbbell, Play, Search, SearchX, X } from "lucide-react";
import PageWrapper from "@/components/custom/PageWrapper";
import { SectionHeading } from "@/components/custom/Feedback";
import { useMuscles } from "@/contexts/MusclesContext";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, inputClassName } from "@/components/ui/input";
import type { EquipmentTag, Exercise } from "@/types/Muscle";
import { cn } from "@/lib/utils";

type Row = Exercise & { muscleId: number; muscleName: string };

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

const EQUIPMENT: { value: EquipmentTag; label: string }[] = [
  { value: "barbell", label: "Barbell" },
  { value: "dumbbell", label: "Dumbbells" },
  { value: "cable", label: "Cable" },
  { value: "machine", label: "Machine" },
  { value: "bar", label: "Pull-up bar" },
  { value: "bodyweight", label: "Bodyweight" },
  { value: "band", label: "Bands" },
  { value: "wheel", label: "Ab wheel" },
];

const PAGE_SIZE = 24;

const ExercisesPage = () => {
  const { muscles, loading } = useMuscles();
  const [query, setQuery] = useState("");
  const [muscleId, setMuscleId] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [equipment, setEquipment] = useState<string>("all");
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    document.title = "Exercise library · FitMuscle";
  }, []);

  const rows = useMemo<Row[]>(
    () =>
      muscles.flatMap((muscle) =>
        (muscle.ex ?? []).map((exercise) => ({ ...exercise, muscleId: muscle.id, muscleName: muscle.n }))
      ),
    [muscles]
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (muscleId !== "all" && String(row.muscleId) !== muscleId) return false;
      if (difficulty !== "all" && row.diff !== difficulty) return false;
      if (equipment !== "all" && !(row.eqTag ?? []).includes(equipment as EquipmentTag)) return false;
      if (!needle) return true;
      return [row.n, row.tgt, row.eq, row.muscleName].some((text) => text?.toLowerCase().includes(needle));
    });
  }, [rows, query, muscleId, difficulty, equipment]);

  const visible = filtered.slice(0, limit);
  const hasFilters = query !== "" || muscleId !== "all" || difficulty !== "all" || equipment !== "all";

  const resetFilters = () => {
    setQuery("");
    setMuscleId("all");
    setDifficulty("all");
    setEquipment("all");
    setLimit(PAGE_SIZE);
  };

  return (
    <PageWrapper>
      <SectionHeading
        as="h1"
        eyebrow="Exercise library"
        title="Every movement in one place"
        description="Filter by muscle, difficulty or the equipment you have. Each card opens the exercise on its muscle page, with sets, reps, cues and video."
        actions={
          <p className="text-sm tabular-nums text-muted-foreground">
            {loading ? "Loading..." : `${filtered.length} of ${rows.length} exercises`}
          </p>
        }
      />

      {/* Toolbar */}
      <div className="panel mt-8 flex flex-col gap-4 p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_200px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setLimit(PAGE_SIZE);
              }}
              placeholder="Search by name, target or equipment"
              aria-label="Search exercises"
              className="pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={muscleId}
              onChange={(event) => {
                setMuscleId(event.target.value);
                setLimit(PAGE_SIZE);
              }}
              aria-label="Muscle group"
              className={cn(inputClassName, "appearance-none pr-10")}
            >
              <option value="all">All muscle groups</option>
              {muscles.map((muscle) => (
                <option key={muscle.id} value={String(muscle.id)}>
                  {muscle.n}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <div className="relative">
            <select
              value={equipment}
              onChange={(event) => {
                setEquipment(event.target.value);
                setLimit(PAGE_SIZE);
              }}
              aria-label="Equipment"
              className={cn(inputClassName, "appearance-none pr-10")}
            >
              <option value="all">Any equipment</option>
              {EQUIPMENT.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Difficulty</span>
          {["all", ...DIFFICULTIES].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setDifficulty(value);
                setLimit(PAGE_SIZE);
              }}
              aria-pressed={difficulty === value}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                difficulty === value
                  ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {value === "all" ? "All levels" : value}
            </button>
          ))}
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} type="button" className="ml-auto">
              <X />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="skeleton h-72 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="panel mt-6 flex flex-col items-center px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-2 text-muted-foreground">
            <SearchX className="h-6 w-6" />
          </div>
          <p className="mt-4 text-lg font-semibold">No exercise matches those filters</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try another equipment option or clear the search.
          </p>
          <Button variant="secondary" size="sm" className="mt-6" onClick={resetFilters} type="button">
            Reset filters
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((row, index) => {
              const href = `/muscles/${row.muscleId}?tab=exercises&exercise=${encodeURIComponent(row.n)}`;
              return (
                <li
                  key={`${row.muscleId}-${row.n}-${index}`}
                  className="panel group relative flex flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-emerald-400/40 hover:shadow-glow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
                    {row.img ? (
                      <Image
                        src={row.img}
                        alt={row.n}
                        fill
                        unoptimized
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Dumbbell className="h-10 w-10 text-muted-foreground/40" />
                      </div>
                    )}
                    <Badge variant="muted" className="absolute left-3 top-3 border-white/10 bg-black/50 text-white/90 backdrop-blur-md">
                      {row.muscleName}
                    </Badge>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="text-base font-semibold leading-snug">
                      {/* Stretched link: the whole card opens the exercise */}
                      <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                        {row.n}
                      </Link>
                    </h2>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{row.tgt}</p>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant={difficultyVariant(row.diff)}>{row.diff}</Badge>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {row.s} × {row.r > 1 ? row.r : "hold"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {row.vid && (
                          <a
                            href={row.vid}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Watch ${row.n} on video`}
                            className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {filtered.length > visible.length && (
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" onClick={() => setLimit((value) => value + PAGE_SIZE)} type="button">
                Show {Math.min(PAGE_SIZE, filtered.length - visible.length)} more
              </Button>
            </div>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default ExercisesPage;
