"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const MuscleIntroSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const previewCardRef = useRef<HTMLDivElement | null>(null);
  const previewContentRef = useRef<HTMLDivElement | null>(null);
  const previewDotRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Tell GSAP: "Use ScrollTrigger, we need it."

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; 
    // We check whether the user has enabled the "minimum animations" setting in the system.
    // If yes, prefersReducedMotion = true.
    const cards = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    // We take arrays of React refs and turn them into pure arrays of DOM elements.
    // filter(Boolean) — removes null and undefined elements.

    if (prefersReducedMotion) {
      gsap.set([headerRef.current, previewCardRef.current, footerRef.current, cards], {
        clearProps: "all",
      });
      return;
    }
    // If the user does NOT want animations:
    // Remove ALL GSAP styles (clearProps: "all")
    // Exit the function (return)
    // In other words: no animations, everything is static.

    const ctx = gsap.context(() => {
      // It's like a sandbox for animations.
      gsap.set(panels, { autoAlpha: 0, y: 18 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(cards, { autoAlpha: 0, y: 34, scale: 0.98 });
      gsap.set(previewCardRef.current, { autoAlpha: 0, y: 36, scale: 0.98 });
      gsap.set(footerRef.current, { autoAlpha: 0, y: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        })
        .from(headerRef.current?.children ?? [], {
          autoAlpha: 0,
          y: 28,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
        })
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.25"
        )
        .to(
          previewCardRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .to(
          footerRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.35"
        );

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 35%",
          end: "top 35%",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          markers: true,
        });

        gsap.from(card.querySelectorAll("[data-gsap-step-child]"), {
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
          autoAlpha: 0,
          y: 16,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const progressPercent = ((activeStep + 1) / introSteps.length) * 100;
    const activeAccent = introSteps[activeStep]?.accent ?? "#94a3b8";
    const cards = stepRefs.current.filter(Boolean) as HTMLDivElement[];

    gsap.to(progressRef.current, {
      height: `${progressPercent}%`,
      backgroundColor: activeAccent,
      duration: 0.65,
      ease: "power3.out",
    });

    gsap.to(previewDotRef.current, {
      boxShadow: `0 0 0 1px ${activeAccent}55`,
      duration: 0.45,
      ease: "power2.out",
    });

    gsap.to(previewDotRef.current?.querySelector("span") ?? null, {
      backgroundColor: activeAccent,
      scale: 1.25,
      yoyo: true,
      repeat: 1,
      duration: 0.22,
      ease: "power2.out",
    });

    cards.forEach((card, index) => {
      const isActive = activeStep === index;
      gsap.to(card, {
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1.015 : 1,
        borderColor: isActive ? "rgba(100, 116, 139, 0.8)" : "rgba(30, 41, 59, 0.7)",
        backgroundColor: isActive ? "rgba(15, 23, 42, 0.8)" : "rgba(15, 23, 42, 0.4)",
        boxShadow: isActive ? `0 18px 35px rgba(0, 0, 0, 0.2), 0 0 0 1px ${introSteps[index].accent}33` : "0 0 0 rgba(0, 0, 0, 0)",
        duration: 0.45,
        ease: "power2.out",
      });
    });

    panelRefs.current.forEach((panel, index) => {
      if (!panel) {
        return;
      }

      const isActive = activeStep === index;
      gsap.to(panel, {
        autoAlpha: isActive ? 1 : 0,
        y: isActive ? 0 : 18,
        pointerEvents: isActive ? "auto" : "none",
        duration: 0.45,
        ease: "power2.out",
      });

      if (isActive) {
        gsap.fromTo(
          panel.querySelectorAll("[data-gsap-panel-child]"),
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.08,
          }
        );
      }
    });

    gsap.fromTo(
      previewContentRef.current,
      { y: 8 },
      { y: 0, duration: 0.35, ease: "power2.out" }
    );

    gsap.fromTo(
      footerRef.current,
      { autoAlpha: 0.45, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeStep]);

  const activeAccent = introSteps[activeStep]?.accent ?? "#94a3b8";

  return (
    <section ref={sectionRef} className="relative mb-12">
      <div className="top-0 flex items-center w-full">
        <div
          className={`relative py-10 ${spaceGrotesk.variable} ${fraunces.variable} w-full`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          <div ref={headerRef} className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Getting started</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
              Learn the flow before you train
            </h1>
            <p className="mt-4 text-base text-slate-300 md:text-lg">
              Scroll to see how the app moves from muscle discovery to planning and progress.
            </p>
          </div>

          <div className="mt-10 w-full gap-10">
            <div className="relative order-2 pl-8 lg:order-1">
              <div className="absolute left-3 top-4 bottom-4 w-px bg-slate-800">
                <span
                  ref={progressRef}
                  className="absolute left-0 top-0 w-px origin-top transition-all duration-700 ease-out motion-reduce:transition-none"
                  style={{ height: `${((activeStep + 1) / introSteps.length) * 100}%`, backgroundColor: activeAccent }}
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
                      className={`rounded-2xl border p-5 ${
                        isActive
                          ? "border-slate-600/80 bg-slate-900/80 opacity-100 shadow-lg"
                          : "border-slate-800/70 bg-slate-900/40 opacity-60"
                      }`}
                      style={isActive ? { boxShadow: `0 0 0 1px ${step.accent}33` } : undefined}
                    >
                      <div data-gsap-step-child className="flex items-center gap-3">
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
                        data-gsap-step-child
                        style={{ fontFamily: "var(--font-display)" }}
                        className="mt-4 text-2xl font-semibold text-white"
                      >
                        {step.title}
                      </h3>
                      <p data-gsap-step-child className="mt-3 text-sm text-slate-300 md:text-base">
                        {step.description}
                      </p>
                      <div data-gsap-step-child className="mt-4 flex flex-wrap gap-2">
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

              <div ref={footerRef} className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-slate-400">
                <span>Scroll to continue</span>
                <span className="h-px w-12 bg-slate-700" />
                <span>{`Step ${String(activeStep + 1).padStart(2, "0")} of ${String(introSteps.length).padStart(2, "0")}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MuscleIntroSection;
