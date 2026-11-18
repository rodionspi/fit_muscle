import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, Dumbbell } from "lucide-react";
import { SectionHeading } from "./Feedback";

const STEPS = [
  {
    icon: Compass,
    kicker: "01 · Discover",
    title: "Find the muscle",
    text: "Scan the chart as a grid, a table or a 3D model. Every group opens into its own page.",
    href: "#chart",
    cta: "Open the chart",
    accent: "from-emerald-400/20 to-emerald-400/0 text-emerald-300",
  },
  {
    icon: Dumbbell,
    kicker: "02 · Learn",
    title: "Understand what it does",
    text: "Anatomy, function, origin and insertion, plus exercises with sets, reps, cues and video.",
    href: "/muscles/8",
    cta: "See the chest, for example",
    accent: "from-sky-400/20 to-sky-400/0 text-sky-300",
  },
  {
    icon: CalendarDays,
    kicker: "03 · Plan",
    title: "Turn it into a week",
    text: "Answer five questions and the beginner guide builds a split that matches your time and gear.",
    href: "/beginnerGuide",
    cta: "Build a plan",
    accent: "from-amber-400/20 to-amber-400/0 text-amber-300",
  },
];

/** Three-step strip under the chart: how the app is meant to be used. */
const HowItWorks = () => (
  <section className="mt-20 lg:mt-28">
    <SectionHeading
      eyebrow="How it works"
      title="From curiosity to a training week"
      description="The app follows the order a good coach would: learn the muscle, learn the movement, then schedule it."
    />

    <ol className="mt-10 grid gap-5 md:grid-cols-3">
      {STEPS.map(({ icon: Icon, kicker, title, text, href, cta, accent }) => (
        <li key={title} className="panel group relative overflow-hidden p-6 transition-colors hover:border-muted-foreground/30">
          <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
          <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 ${accent.split(" ").pop()}`}>
            <Icon className="h-5 w-5" />
          </div>
          <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{kicker}</p>
          <h3 className="relative mt-2 text-xl font-semibold">{title}</h3>
          <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          <Link
            href={href}
            className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
          >
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
