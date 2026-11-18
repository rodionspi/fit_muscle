"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BicepsFlexed,
  Bone,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Info,
  Play,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageWrapper, DifficultyDots, LoadingState, EmptyState } from "@/components/custom";
import { getMuscleImageWithFallback } from "@/lib/muscleImageMapper";
import { useMuscles } from "@/contexts/MusclesContext";
import Overview from "@/components/custom/TabsContent/MuscleReview/Overview";
import Exercises from "@/components/custom/TabsContent/MuscleReview/Exercises";
import Anatomy from "@/components/custom/TabsContent/MuscleReview/Anatomy";
import Injuries from "@/components/custom/TabsContent/MuscleReview/Injuries";

type TabKey = "overview" | "exercises" | "anatomy" | "injuries";

const TABS: { value: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "overview", label: "Overview", icon: Info },
  { value: "exercises", label: "Exercises", icon: Dumbbell },
  { value: "anatomy", label: "Anatomy", icon: Bone },
  { value: "injuries", label: "Injuries", icon: ShieldAlert },
];

/** First sentence of a paragraph, for the summary tiles. */
const firstSentence = (text: string | undefined): string => {
  if (!text) return "-";
  const match = text.match(/^[^.!?]+[.!?]/);
  return (match ? match[0] : text).trim();
};

const Tile = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="panel-muted px-4 py-3.5">
    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
    <dd className="mt-1.5 text-sm font-medium leading-snug text-foreground/90">{value}</dd>
  </div>
);

const MusclePage = () => {
  const params = useParams();
  const muscleId = Array.isArray(params.muscleId) ? params.muscleId[0] : params.muscleId;
  const { muscles, loading, error, getById } = useMuscles();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [initialExercise, setInitialExercise] = useState<string | null>(null);

  const muscleInfo = useMemo(() => (muscleId ? getById(muscleId) ?? null : null), [muscleId, getById]);

  // Deep links from the exercise library: /muscles/8?tab=exercises&exercise=Barbell%20Bench%20Press
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (TABS.some((item) => item.value === tab)) setActiveTab(tab as TabKey);
    setInitialExercise(params.get("exercise"));
  }, []);

  // Neighbours in chart order, for the previous / next links
  const position = muscles.findIndex((muscle) => String(muscle.id) === String(muscleId));
  const previous = position > 0 ? muscles[position - 1] : null;
  const next = position >= 0 && position < muscles.length - 1 ? muscles[position + 1] : null;

  useEffect(() => {
    if (muscleInfo) document.title = `${muscleInfo.n} · FitMuscle`;
  }, [muscleInfo]);

  const openTab = (tab: TabKey) => {
    setActiveTab(tab);
    document.getElementById("muscle-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingState label="Loading muscle information..." />
      </PageWrapper>
    );
  }

  if (!muscleInfo) {
    return (
      <PageWrapper>
        <EmptyState
          icon={<AlertTriangle />}
          title={error ? "Something went wrong" : "Muscle not found"}
          description={error ?? "We couldn't find information about the requested muscle group."}
          action={{ label: "Back to the muscle chart", href: "/" }}
          className="my-16"
        />
      </PageWrapper>
    );
  }

  const imagePath = getMuscleImageWithFallback(muscleId, muscleInfo.img);
  const exerciseCount = muscleInfo.ex?.length ?? 0;
  const level = Math.min(5, Math.max(1, muscleInfo.lvl ?? 3));

  return (
    <PageWrapper>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All muscles
        </Link>
        <div className="flex items-center gap-1">
          {previous && (
            <Button asChild variant="ghost" size="sm">
              <Link href={`/muscles/${previous.id}`} aria-label={`Previous: ${previous.n}`}>
                <ChevronLeft />
                <span className="hidden sm:inline">{previous.n}</span>
              </Link>
            </Button>
          )}
          {next && (
            <Button asChild variant="ghost" size="sm">
              <Link href={`/muscles/${next.id}`} aria-label={`Next: ${next.n}`}>
                <span className="hidden sm:inline">{next.n}</span>
                <ChevronRight />
              </Link>
            </Button>
          )}
        </div>
      </nav>

      <section className="panel relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12 lg:p-10">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-elevated lg:mx-0 lg:max-w-none">
            {imagePath ? (
              <Image
                src={imagePath}
                alt={muscleInfo.n}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <BicepsFlexed className="h-24 w-24 text-muted-foreground/40" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
              <DifficultyDots level={muscleInfo.lvl} showLabel className="[&>span:last-child]:text-white/80" />
              {exerciseCount > 0 && (
                <Badge variant="muted" className="border-white/15 bg-black/45 text-white/90 backdrop-blur-md">
                  {exerciseCount} exercises
                </Badge>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <p className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Muscle group · Level {level} of 5
            </p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">{muscleInfo.n}</h1>
            <p className="mt-2 text-lg italic text-muted-foreground">{muscleInfo.sn}</p>
            <p className="prose-muscle mt-6 max-w-2xl">{muscleInfo.desc}</p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <Tile label="Primary function" value={firstSentence(muscleInfo.func)} />
              <Tile
                label="Works with"
                value={muscleInfo.rel?.length ? muscleInfo.rel.slice(0, 4).join(", ") : "-"}
              />
              <Tile
                label="To start with"
                value={muscleInfo.freq?.b ? `${muscleInfo.freq.b} sessions a week` : "-"}
              />
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => openTab("exercises")} type="button">
                <Play />
                Start training
              </Button>
              <Button size="lg" variant="secondary" onClick={() => openTab("anatomy")} type="button">
                <Bone />
                Study the anatomy
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Tabs
        id="muscle-tabs"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabKey)}
        className="mt-10 scroll-mt-24"
      >
        <TabsList variant="line" aria-label="Muscle sections" className="no-scrollbar overflow-x-auto">
          {TABS.map(({ value, label, icon: Icon }) => (
            // Icons only from `sm` up, so all four tabs fit a phone screen without scrolling
            <TabsTrigger key={value} value={value} className="shrink-0 px-3 sm:px-4">
              <Icon className="hidden h-4 w-4 sm:block" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <Overview muscleInfo={muscleInfo} />
        </TabsContent>
        <TabsContent value="exercises" className="mt-8">
          <Exercises muscleId={muscleId} initialExercise={initialExercise} />
        </TabsContent>
        <TabsContent value="anatomy" className="mt-8">
          <Anatomy muscleInfo={muscleInfo} />
        </TabsContent>
        <TabsContent value="injuries" className="mt-8">
          <Injuries muscleId={muscleId} />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export default MusclePage;
