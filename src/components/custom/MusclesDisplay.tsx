"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import GridRender from './TabsContent/MuscleDisplay/GridRender';
import ListRender from './TabsContent/MuscleDisplay/ListRender';
import { getMuscles } from '@/server/muscles/musclesDataFunctions';
import { Fraunces, Space_Grotesk } from "next/font/google";
// import { Input } from "@/components/ui/input"

const ThreeDView = dynamic(() => import('./TabsContent/MuscleDisplay/ThreeDView'), {
  ssr: false,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const introSteps = [
  {
    kicker: "Discover",
    title: "Start with the muscle map",
    description: "Switch between grid, list, or 3D to find the group you need.",
    tags: ["Grid", "List", "3D"],
    panelTitle: "Find a muscle fast",
    panelDescription: "Use the view toggles to scan the map, then open any muscle to see what it does.",
    panelBullets: [
      "Tap a muscle to open the review tabs.",
      "Rotate the 3D model for anatomy depth.",
    ],
    panelTip: "Compare sides using the list view.",
    accent: "#34d399",
  },
  {
    kicker: "Learn",
    title: "Open the muscle review",
    description: "Each muscle page includes anatomy, exercises, and injury notes.",
    tags: ["Overview", "Exercises", "Injuries"],
    panelTitle: "Understand the role",
    panelDescription: "The review tabs keep anatomy, exercises, and cues in one place.",
    panelBullets: [
      "Use Overview for quick context.",
      "Switch to Exercises for targeted moves.",
    ],
    panelTip: "Build a routine right from the exercise list.",
    accent: "#22d3ee",
  },
  {
    kicker: "Plan",
    title: "Build a weekly rhythm",
    description: "Use the planner to map sessions and see what you trained.",
    tags: ["Calendar", "Planner", "History"],
    panelTitle: "Turn ideas into a plan",
    panelDescription: "Save sessions, track volume, and keep a steady cadence.",
    panelBullets: [
      "Create a session from any muscle list.",
      "See upcoming workouts at a glance.",
    ],
    panelTip: "Try a simple push/pull/legs rotation.",
    accent: "#fbbf24",
  },
  {
    kicker: "Progress",
    title: "Keep your goals visible",
    description: "Your profile keeps goals, notes, and progress in one place.",
    tags: ["Profile", "Goals", "Progress"],
    panelTitle: "Stay on course",
    panelDescription: "Update goals, check recovery notes, and keep focus.",
    panelBullets: [
      "Review what you trained last.",
      "Adjust goals as you improve.",
    ],
    panelTip: "Log a quick note right after training.",
    accent: "#f87171",
  },
] as const;

const MusclesDisplay = () => {
    const [musclesList, setMusclesList] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        const fetchMuscles = async () => {
            const muscles = await getMuscles();
            setMusclesList(muscles);
            console.log("Fetched muscles:", muscles);
        };
        fetchMuscles();
    }, []);

    useEffect(() => {
      const elements = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!elements.length) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (!visibleEntry) {
            return;
          }

          const index = Number(visibleEntry.target.getAttribute("data-step"));
          if (!Number.isNaN(index)) {
            setActiveStep(index);
          }
        },
        {
          // Triggers at 20%, 45%, 70%, and 90% element visibility for smooth transitions
          threshold: [0.1, 0.45, 0.7, 0.9],
          // Shifts trigger zone 15% upward for earlier activation when scrolling
          rootMargin: "-30% 0px 0px 0px",
        }
      );

      elements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }, []);

    // Calculates progress bar fill percentage (from 25% for step 0 to 100% for the last step)
    const progressPercent = ((activeStep + 1) / introSteps.length) * 100;
    // Gets current step color, or gray as fallback if something goes wrong
    const activeAccent = introSteps[activeStep]?.accent ?? "#94a3b8";

    return (
      <>
        <section className="relative mb-12 overflow-hidden">
          <div className="top-0 flex items-center w-full">
            <div
              className={`relative py-10 ${spaceGrotesk.variable} ${fraunces.variable} w-full`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <div className="max-w-2xl animate-fade-up">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Getting started</p>
                <h1
                  className="mt-3 text-3xl font-semibold text-white md:text-5xl"
                >
                  Learn the flow before you train
                </h1>
                <p className="mt-4 text-base text-slate-300 md:text-lg">
                  Scroll to see how the app moves from muscle discovery to planning and progress.
                </p>
              </div>

              <div className="mt-10 grid w-full gap-10 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="relative order-2 pl-8 lg:order-1">
                  <div className="absolute left-3 top-4 bottom-4 w-px bg-slate-800">
                    <span
                      className="absolute left-0 top-0 w-px origin-top transition-all duration-700 ease-out motion-reduce:transition-none"
                      style={{ height: `${progressPercent}%`, backgroundColor: activeAccent }}
                    />
                  </div>
                  <div className="space-y-6">
                    {introSteps.map((step, index) => {
                      const isActive = activeStep === index;
                      return (
                        <div
                          key={step.title}
                          ref={(element) => {
                            stepRefs.current[index] = element;
                          }}
                          data-step={index}
                          className={`rounded-2xl border p-5 transition duration-700 ease-out motion-reduce:transition-none ${
                            isActive
                              ? "border-slate-600/80 bg-slate-900/80 opacity-100 shadow-lg"
                              : "border-slate-800/70 bg-slate-900/40 opacity-60"
                          }`}
                          style={isActive ? { boxShadow: `0 0 0 1px ${step.accent}33` } : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-slate-900"
                              style={{ backgroundColor: step.accent }}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                              {step.kicker}
                            </p>
                          </div>
                          <h3
                            style={{ fontFamily: "var(--font-display)" }}
                            className="mt-4 text-2xl font-semibold text-white"
                          >
                            {step.title}
                          </h3>
                          <p className="mt-3 text-sm text-slate-300 md:text-base">
                            {step.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative order-1 sticky top-24 lg:order-2">
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Live preview</p>
                        <h4
                          style={{ fontFamily: "var(--font-display)" }}
                          className="mt-3 text-2xl font-semibold text-white md:text-3xl"
                        >
                          {introSteps[activeStep]?.panelTitle}
                        </h4>
                      </div>
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/90 shadow-inner"
                        style={{ boxShadow: `0 0 0 1px ${activeAccent}55` }}
                      >
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activeAccent }} />
                      </div>
                    </div>

                    <div className="relative mt-6 min-h-[260px]">
                      {introSteps.map((step, index) => (
                        <div
                          key={step.panelTitle}
                          className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                            activeStep === index ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <p className="text-base text-slate-300 md:text-lg">
                            {step.panelDescription}
                          </p>
                          <div className="mt-6 grid gap-3">
                            {step.panelBullets.map((bullet) => (
                              <div
                                key={bullet}
                                className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-sm text-slate-200"
                              >
                                <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: step.accent }} />
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
                            <span className="text-slate-200">Tip:</span> {step.panelTip}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-slate-400">
                    <span>Scroll to continue</span>
                    <span className="h-px w-12 bg-slate-700" />
                    <span>{`Step ${String(activeStep + 1).padStart(2, "0")} of ${String(introSteps.length).padStart(2, "0")}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Muscle Chart</h2>
            <p className="text-slate-300">Explore different muscle groups and learn about targeted exercises</p>
        </div>
        <Tabs defaultValue="grid" className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <TabsList className="bg-slate-800 w-auto mb-4 sm:mb-0">
                <TabsTrigger value="grid" className='rounded-s-md'>Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="3d" className='rounded-e-md'>3D View</TabsTrigger>
              </TabsList>

              <div className="flex gap-2 w-auto justify-center sm:justify-start">
                <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
                  <Info size={16} className="mr-2" />
                  Beginner Guide
                </Button>
                <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
                  <Calendar size={16} className="mr-2" />
                  Workout Planner
                </Button>
              </div>
            </div>
          <TabsContent value="grid" className="mt-6">
            <GridRender musclesList={musclesList}/>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <ListRender musclesList={musclesList}/>
          </TabsContent>

          <TabsContent value="3d" className="mt-6">
            <ThreeDView />
          </TabsContent>
        </Tabs>
      </>
    );
}

export default MusclesDisplay;