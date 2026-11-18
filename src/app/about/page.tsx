import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Box,
  CalendarDays,
  ClipboardList,
  Dumbbell,
  Github,
  HeartPulse,
  Layers,
  Play,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import PageWrapper from "@/components/custom/PageWrapper";
import { SectionHeading } from "@/components/custom/Feedback";
import { Button } from "@/components/ui/button";
import { musclesData } from "@/data/musclesData";
import { GITHUB_REPO_URL } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "About",
  description: "What FitMuscle is, what is inside the library and how the app is meant to be used.",
};

const exercises = musclesData.flatMap((muscle) => muscle.ex ?? []);

const INVENTORY = [
  { icon: Layers, label: "Muscle groups, each with anatomy and function", value: musclesData.length },
  { icon: Dumbbell, label: "Exercises with sets, reps, equipment and cues", value: exercises.length },
  { icon: Play, label: "Video demonstrations", value: exercises.filter((exercise) => exercise.vid).length },
  { icon: ShieldAlert, label: "Common injuries with prevention notes", value: musclesData.reduce((sum, m) => sum + (m.inj?.length ?? 0), 0) },
  { icon: HeartPulse, label: "Stretches with durations", value: musclesData.reduce((sum, m) => sum + (m.str?.length ?? 0), 0) },
  { icon: Box, label: "Interactive 3D model", value: 1 },
];

const FEATURES = [
  {
    icon: Layers,
    title: "Three ways to see a muscle",
    text: "A photo grid, a comparison table and a 3D model you can orbit. Pick whichever makes the anatomy click for you.",
    tone: "bg-emerald-400/10 text-emerald-300",
  },
  {
    icon: Dumbbell,
    title: "Exercises that explain themselves",
    text: "Every movement comes with sets, reps, equipment, the exact target, a coach's cue and a video, main lift first.",
    tone: "bg-sky-400/10 text-sky-300",
  },
  {
    icon: ClipboardList,
    title: "A plan for your first weeks",
    text: "Five questions about goal, experience, time and gear become a weekly split built from the same library.",
    tone: "bg-amber-400/10 text-amber-300",
  },
];

const PILLARS = [
  { title: "Muscle maps", text: "What each group does, where it attaches and which muscles help it." },
  { title: "Exercise library", text: "Filter the whole collection by muscle, difficulty or equipment." },
  { title: "Beginner guide", text: "A realistic split sized to the days and minutes you actually have." },
  { title: "Workout calendar", text: "Pin what you plan to train to a day and tick it off. Early version." },
];

const LOOP = [
  { step: "1", title: "Plan", text: "Pick the groups for the week and the exercises you can do with your gear." },
  { step: "2", title: "Train", text: "Follow the cues, hit the sets and reps, and stop before form breaks down." },
  { step: "3", title: "Review", text: "Check the frequency guidance and the injury notes before you add more." },
];

const About = () => (
  <PageWrapper>
    <section className="grid items-center gap-12 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:py-10">
      <div>
        <p className="eyebrow">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          About the project
        </p>
        <h1 className="mt-5 text-4xl font-bold sm:text-5xl lg:text-6xl">
          Built for people who want to <span className="text-gradient">understand</span> their training.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Most apps count reps. FitMuscle explains which muscle a movement trains, why it matters and how
          often to come back to it, so every session has a reason behind it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">
              Browse the muscle chart
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/profile/registration">Create a free profile</Link>
          </Button>
        </div>
      </div>

      <div className="panel relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
        <p className="eyebrow">What&apos;s inside</p>
        <ul className="mt-4 divide-y divide-border">
          {INVENTORY.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex items-center gap-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-emerald-300">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm text-foreground/85">{label}</span>
              <span className="font-display text-2xl font-bold tabular-nums">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="mt-16 lg:mt-24">
      <SectionHeading
        eyebrow="Core features"
        title="Train with intent, not guesswork."
        description="Every screen keeps you on the same loop: learn the muscle, learn the movement, then schedule it."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text, tone }) => (
          <article key={title} className="panel p-6 transition-colors hover:border-muted-foreground/30">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="mt-16 grid items-start gap-10 lg:mt-24 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <SectionHeading
          eyebrow="How it fits together"
          title="A clear path from a goal to a training day."
          description="The library, the guide and the calendar share one dataset, so what you read is what you train."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PILLARS.map(({ title, text }) => (
            <div key={title} className="panel-muted p-4">
              <p className="font-semibold">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <CalendarDays className="h-5 w-5" />
          </span>
          <div>
            <p className="eyebrow">Training loop</p>
            <p className="mt-1 text-2xl font-semibold">Plan. Train. Review.</p>
          </div>
        </div>
        <ol className="mt-7 space-y-5">
          {LOOP.map(({ step, title, text }) => (
            <li key={step} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 font-display text-sm font-bold text-emerald-300">
                {step}
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="panel relative mt-16 flex flex-col gap-6 overflow-hidden p-8 sm:p-10 md:flex-row md:items-center md:justify-between lg:mt-24">
      <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative max-w-xl">
        <p className="eyebrow">Open source</p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
          Built in the open with Next.js, Tailwind, Three.js and Firebase.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Issues and pull requests are welcome, whether it is a missing exercise, a better cue or a new muscle group.
        </p>
      </div>
      <div className="relative flex flex-wrap gap-3">
        <Button asChild variant="white">
          <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
            <Github />
            View on GitHub
          </a>
        </Button>
        <Button asChild variant="secondary">
          <a href={`${GITHUB_REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
            Report an issue
          </a>
        </Button>
      </div>
    </section>

    <section className="relative mt-16 overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-card to-card p-10 text-center sm:p-14 lg:mt-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:28px_28px] mask-fade-radial opacity-60" />
      <div className="relative">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to start your next training block?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Open the chart, learn one muscle properly, and let the guide turn it into a week you can keep.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Open the muscle chart</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/beginnerGuide">Build my plan</Link>
          </Button>
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default About;
