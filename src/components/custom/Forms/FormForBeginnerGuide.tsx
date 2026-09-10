"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CheckCircle2, ClipboardList, Lock, LogIn, UserPlus } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useMuscles } from "@/contexts/MusclesContext";
import { buildWorkoutPlan, planOptions, type BeginnerAnswers } from "@/lib/workoutPlan";

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

const fieldClass =
  "block w-full px-4 py-3 text-base rounded-lg border border-slate-600 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

const FormForBeginnerGuide = () => {
  const { userData, isLoading } = useUser();
  const { muscles, loading: musclesLoading } = useMuscles();
  const [answers, setAnswers] = useState<BeginnerAnswers | null>(null);

  const isLoggedIn = Boolean(userData?.id || userData?.email);

  // Wait for the stored session - and, once answered, the exercise library - before choosing a branch
  if (isLoading || (answers && musclesLoading)) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-slate-600 border-t-slate-200 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-300">{answers ? "Building your plan..." : "Loading your profile..."}</p>
      </div>
    );
  }

  // Logged out - point the visitor at login or registration instead of the form
  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 sm:p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Beginner Guide</h1>
          <p className="text-slate-300 mb-8">
            This guide is built around your answers, so we need an account to save them to.
            Sign in or create one, then come back and fill in the form.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/profile/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Log in
            </Link>
            <Link
              href="/profile/registration"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-600 hover:bg-slate-700 text-slate-100 font-semibold transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Create an account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged in and already answered - show the plan built from those answers
  if (answers) {
    const plan = buildWorkoutPlan(answers, muscles);

    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <h2 className="text-3xl font-bold">Your starting plan, {userData?.name || "friend"}</h2>
          </div>
          <p className="text-slate-300 mb-8">{plan.summary}</p>

          {plan.skipped.length > 0 && (
            <p className="mb-8 text-sm text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3">
              Our exercise library has nothing for {plan.skipped.join(", ")} with your equipment and
              experience yet, so the plan leaves them out.
            </p>
          )}

          <div className="space-y-8 mb-8">
            {plan.days.map((day) => (
              <section key={day.day}>
                <h3 className="text-xl font-semibold mb-3">
                  Day {day.day}{" "}
                  <span className="ml-1 text-base font-normal text-slate-400">{day.focus}</span>
                </h3>
                {day.exercises.length === 0 ? (
                  <p className="text-slate-400">
                    No exercise in the library fits this day with your equipment - use it for a long walk instead.
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-slate-700">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900/60 text-sm text-slate-400">
                        <tr>
                          <th className="px-4 py-2 font-medium">Exercise</th>
                          <th className="px-4 py-2 font-medium">Muscle</th>
                          <th className="px-4 py-2 font-medium">Sets × reps</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {day.exercises.map((exercise) => (
                          <tr key={exercise.name}>
                            <td className="px-4 py-3 font-medium text-slate-100">{exercise.name}</td>
                            <td className="px-4 py-3">
                              <Link
                                href={`/muscles/${exercise.muscleId}`}
                                className="text-emerald-400 hover:text-emerald-300"
                              >
                                {exercise.muscle}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                              {exercise.sets} × {exercise.reps}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {answers.notes && (
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 mb-8">
              <p className="text-sm text-slate-400 mb-1">
                Your notes - the plan does not read these, so swap out anything that clashes with them
              </p>
              <p className="text-slate-100">{answers.notes}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setAnswers(null)}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-600 hover:bg-slate-700 text-slate-100 font-semibold transition-colors"
          >
            Change my answers
          </button>
        </div>
      </div>
    );
  }

  // Logged in - the form itself
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-wider">Beginner Guide</h1>
        <p className="text-xl text-emerald-400 mb-2">Welcome, {userData?.name || "friend"}!</p>
        <p className="text-slate-300 text-lg">
          Answer six quick questions and we will point you at the right muscle groups,
          exercises, and training frequency to start with.
        </p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6 text-slate-400">
          <ClipboardList className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Your training profile</span>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => setAnswers(values as BeginnerAnswers)}
        >
          {() => (
            <Form className="w-full">
              {questions.map((question) => (
                <div key={question.name} className="mb-6">
                  <label htmlFor={question.name} className="block text-xl font-semibold mb-1 tracking-wider">
                    {question.label}
                  </label>
                  <p className="text-sm text-slate-400 mb-2">{question.hint}</p>
                  <Field as="select" id={question.name} name={question.name} className={fieldClass}>
                    <option value="">Choose an option</option>
                    {question.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name={question.name}
                    component="p"
                    className="mt-2 text-sm text-red-400"
                  />
                </div>
              ))}

              <div className="mb-6">
                <label htmlFor="notes" className="block text-xl font-semibold mb-1 tracking-wider">
                  Anything we should know?
                </label>
                <p className="text-sm text-slate-400 mb-2">
                  Injuries, exercises that hurt, or anything you want to avoid. Optional.
                </p>
                <Field
                  as="textarea"
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Old shoulder injury, so no overhead pressing for now..."
                  className={`${fieldClass} resize-y`}
                />
                <ErrorMessage name="notes" component="p" className="mt-2 text-sm text-red-400" />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-base bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              >
                Build my starting plan
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormForBeginnerGuide;
