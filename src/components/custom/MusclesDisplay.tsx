"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Box, CalendarDays, ClipboardList, LayoutGrid, List, Search, SearchX, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMuscles } from "@/contexts/MusclesContext";
import { useUser } from "@/contexts/UserContext";
import GridRender from "./TabsContent/MuscleDisplay/GridRender";
import ListRender from "./TabsContent/MuscleDisplay/ListRender";
import { SectionHeading } from "./Feedback";

const ThreeDView = dynamic(() => import("./TabsContent/MuscleDisplay/ThreeDView"), {
  ssr: false,
  loading: () => <div className="skeleton h-[min(72vh,720px)] min-h-[420px] w-full rounded-2xl" />,
});

type View = "grid" | "list" | "3d";

const VIEWS: { value: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "grid", label: "Grid", icon: LayoutGrid },
  { value: "list", label: "List", icon: List },
  { value: "3d", label: "3D", icon: Box },
];

const isView = (value: string | null): value is View => value === "grid" || value === "list" || value === "3d";

const GridSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="Loading muscles">
    {Array.from({ length: 8 }, (_, index) => (
      <div key={index} className="skeleton aspect-[4/5] rounded-2xl" />
    ))}
  </div>
);

const MusclesDisplay = () => {
  const { muscles, loading, error } = useMuscles();
  const { userData } = useUser();
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");

  // Deep links such as /?view=3d open the matching tab. Read directly rather than through
  // useSearchParams, which would need a Suspense boundary around this statically rendered page.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("view");
    if (isView(requested)) setView(requested);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return muscles;
    return muscles.filter((muscle) =>
      [muscle.n, muscle.sn, ...(muscle.rel ?? [])].some((text) => text?.toLowerCase().includes(needle))
    );
  }, [muscles, query]);

  const plannerHref = userData?.id ? `/calendar/${userData.id}` : "/profile/login";

  const noResults = (
    <div className="panel flex flex-col items-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-2 text-muted-foreground">
        <SearchX className="h-6 w-6" />
      </div>
      <p className="mt-4 text-lg font-semibold">Nothing matches &ldquo;{query}&rdquo;</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Try a common name like &ldquo;chest&rdquo; or a Latin one like &ldquo;deltoid&rdquo;.
      </p>
      <Button variant="secondary" size="sm" className="mt-6" onClick={() => setQuery("")}>
        Clear search
      </Button>
    </div>
  );

  return (
    <section id="chart" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Muscle chart"
        title="Pick a muscle group"
        description="Twelve groups, three ways to browse. Open one for its anatomy, exercises, common injuries and stretches."
        actions={
          <>
            <Button asChild variant="secondary" size="sm">
              <Link href="/beginnerGuide">
                <ClipboardList />
                Beginner guide
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href={plannerHref}>
                <CalendarDays />
                Workout planner
              </Link>
            </Button>
          </>
        }
      />

      <Tabs value={view} onValueChange={(value) => setView(value as View)} className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TabsList aria-label="Choose a view">
            {VIEWS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger key={value} value={value} className="px-3.5 sm:px-4">
                <Icon className="h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {view !== "3d" && (
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search muscles, e.g. deltoid"
                aria-label="Search muscles"
                className="h-10 pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden"
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
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Live data could not be loaded ({error}); showing the bundled reference library instead.
          </p>
        )}

        <TabsContent value="grid" className="mt-6">
          {loading ? <GridSkeleton /> : filtered.length ? <GridRender musclesList={filtered} /> : noResults}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {loading ? (
            <div className="skeleton h-96 w-full rounded-2xl" />
          ) : filtered.length ? (
            <ListRender musclesList={filtered} />
          ) : (
            noResults
          )}
        </TabsContent>

        <TabsContent value="3d" className="mt-6">
          <ThreeDView />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MusclesDisplay;
