"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Lock,
  LogIn,
  RotateCcw,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useMuscles } from "@/contexts/MusclesContext";
import { buildWorkoutPlan, planOptions, type BeginnerAnswers } from "@/lib/workoutPlan";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { inputClassName } from "@/components/ui/input";
import { LoadingState } from "@/components/custom/Feedback";
import { cn } from "@/lib/utils";

// Every select starts empty, so the form holds plain strings - Yup's required checks
// guarantee they are real options by the time onSubmit runs
const initialValues: Record<keyof BeginnerAnswers, string> = {
  goal: "",
  experience: "",
  daysPerWeek: "",
  sessionLength: "",
  equipment: "",
  notes: "",
};

const validationSchema = Yup.object({
  goal: Yup.string().required("Pick a goal so we know what to build around"),
  experience: Yup.string().required("Tell us how long you have been training"),
  daysPerWeek: Yup.string().required("Choose how many days you can train"),
  sessionLength: Yup.string().required("Choose how long a session can be"),
  equipment: Yup.string().required("Tell us what equipment you can use"),
  notes: Yup.string().max(500, "Keep it under 500 characters"),
});

/**
 * Each entry becomes one <select> in the form. The options come from the plan rules in
 * lib/workoutPlan, so every choice offered here has a rule behind it.
 */
const questions: { name: keyof BeginnerAnswers; label: string; hint: string; options: string[] }[] = [
  {
    name: "goal",
    label: "What is your main goal?",
    hint: "Everything else in the plan follows from this.",
    options: planOptions.goal,
  },
  {
    name: "experience",
    label: "How long have you been training?",
    hint: "Be honest - starting lighter is what makes progress stick.",
    options: planOptions.experience,
  },
  {
    name: "daysPerWeek",
    label: "How many days a week can you train?",
    hint: "Pick the number you can hold to on a bad week, not a good one.",
    options: planOptions.daysPerWeek,
  },
  {
    name: "sessionLength",
    label: "How long can one session be?",
    hint: "Warm-up and rest between sets included.",
    options: planOptions.sessionLength,
  },
  {
    name: "equipment",
    label: "What equipment do you have?",
    hint: "This decides which exercises the guide can suggest.",
    options: planOptions.equipment,
  },
];

const selectClass = cn(inputClassName, "appearance-none pr-11");

const FormForBeginnerGuide = () => {
  const { userData, isLoading } = useUser();
  const { muscles, loading: musclesLoading } = useMuscles();
  const [answers, setAnswers] = useState<BeginnerAnswers | null>(null);

  const isLoggedIn = Boolean(userData?.id || userData?.email);
  const firstName = userData?.name?.split(" ")[0] || "friend";

  // Wait for the stored session - and, once answered, the exercise library - before choosing a branch
  if (isLoading || (answers && musclesLoading)) {
    return <LoadingState label={answers ? "Building your plan..." : "Loading your profile..."} />;
  }

  // Logged out - point the visitor at login or registration instead of the form
  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <div className="panel relative overflow-hidden p-8 text-center sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-2 text-emerald-300">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-6 text-3xl font-bold">Beginner guide</h1>
            <p className="mt-3 text-muted-foreground">
              The guide is built around your answers, so it needs an account to save them to. Sign in or
              create one, then come back and fill in the form.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/profile/login">
                  <LogIn />
                  Log in
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/profile/registration">
                  <UserPlus />
                  Create an account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in and already answered - show the plan built from those answers
  if (answers) {
    const plan = buildWorkoutPlan(answers, muscles);

    return (
      <div className="mx-auto max-w-4xl py-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Your starting plan
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Here you go, {firstName}.</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setAnswers(null)} type="button">
              <RotateCcw />
              Change my answers
            </Button>
            {userData?.id && (
              <Button asChild variant="ghost">
                <Link href={`/calendar/${userData.id}`}>
                  <CalendarDays />
                  Open the calendar
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="panel mt-8 flex gap-4 border-emerald-400/25 bg-gradient-to-br from-emerald-500/10 to-card p-5 sm:p-6">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
          <p className="text-base leading-relaxed text-foreground/90">{plan.summary}</p>
        </div>

        {plan.skipped.length > 0 && (
          <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Our exercise library has nothing for {plan.skipped.join(", ")} with your equipment and experience
            yet, so the plan leaves them out.
          </p>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {plan.days.map((day) => (
            <section key={day.day} className="panel overflow-hidden">
              <header className="flex items-center justify-between border-b border-border bg-surface-2/60 px-5 py-3.5">
                <h2 className="text-lg font-semibold">
                  Day {day.day} <span className="ml-1 font-sans text-sm font-normal text-muted-foreground">{day.focus}</span>
                </h2>
                <Badge variant="outline">{day.exercises.length} exercises</Badge>
              </header>

              {day.exercises.length === 0 ? (
                <p className="px-5 py-6 text-sm text-muted-foreground">
                  No exercise in the library fits this day with your equipment - use it for a long walk instead.
                </p>
              ) : (
                <ol className="divide-y divide-border">
                  {day.exercises.map((exercise, index) => (
                    <li key={exercise.name} className="flex items-center gap-4 px-5 py-3">
                      <span className="w-5 shrink-0 text-xs tabular-nums text-muted-foreground">{index + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{exercise.name}</p>
                        <Link
                          href={`/muscles/${exercise.muscleId}`}
                          className="text-xs text-emerald-300 transition-colors hover:text-emerald-200"
                        >
                          {exercise.muscle}
                        </Link>
                      </div>
                      <span className="shrink-0 rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-xs font-semibold tabular-nums">
                        {exercise.sets} × {exercise.reps}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>

        {answers.notes && (
          <div className="panel-muted mt-6 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Your notes</p>
            <p className="mt-2 whitespace-pre-line text-sm text-foreground/90">{answers.notes}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              The plan does not read these, so swap out anything that clashes with them.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Logged in - the form itself
  return (
    <div className="mx-auto max-w-2xl py-4">
      <div>
        <p className="eyebrow">
          <ClipboardList className="h-3.5 w-3.5 text-emerald-400" />
          Beginner guide
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Welcome, {firstName}.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Answer five quick questions and we will point you at the right muscle groups, exercises and
          training frequency to start with.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => setAnswers(values as BeginnerAnswers)}
      >
        {({ values }) => {
          const answered = questions.filter((question) => values[question.name]).length;
          return (
            <Form className="panel mt-8 overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
                <p className="text-sm font-medium text-muted-foreground">Your training profile</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {answered}/{questions.length}
                  </span>
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
                      style={{ width: `${(answered / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {questions.map((question, index) => (
                  <div key={question.name} className="grid gap-4 px-5 py-6 sm:grid-cols-[2.5rem_1fr] sm:px-7">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border font-display text-sm font-bold transition-colors",
                        values[question.name]
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                          : "border-border bg-surface-2 text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <label htmlFor={question.name} className="block text-lg font-semibold">
                        {question.label}
                      </label>
                      <p className="mt-1 text-sm text-muted-foreground">{question.hint}</p>
                      <div className="relative mt-3">
                        <Field as="select" id={question.name} name={question.name} className={selectClass}>
                          <option value="">Choose an option</option>
                          {question.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <ErrorMessage name={question.name} component="p" className="mt-2 text-sm text-red-300" />
                    </div>
                  </div>
                ))}

                <div className="grid gap-4 px-5 py-6 sm:grid-cols-[2.5rem_1fr] sm:px-7">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 font-display text-sm font-bold text-muted-foreground">
                    +
                  </span>
                  <div>
                    <label htmlFor="notes" className="block text-lg font-semibold">
                      Anything we should know?{" "}
                      <span className="font-sans text-sm font-normal text-muted-foreground">Optional</span>
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Old injuries, movements you dislike, a sport you play alongside.
                    </p>
                    <Field
                      as="textarea"
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="e.g. My left shoulder complains during overhead pressing."
                      className={cn(inputClassName, "mt-3 h-auto min-h-[88px] resize-y py-2.5")}
                    />
                    <ErrorMessage name="notes" component="p" className="mt-2 text-sm text-red-300" />
                  </div>
                </div>
              </div>

              <div className="border-t border-border bg-surface-2/40 px-5 py-5 sm:px-7">
                <Button type="submit" size="lg" className="w-full">
                  Build my starting plan
                  <ArrowRight />
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormForBeginnerGuide;
