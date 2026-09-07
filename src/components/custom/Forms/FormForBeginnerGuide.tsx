"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CheckCircle2, ClipboardList, Lock, LogIn, UserPlus } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

type BeginnerAnswers = {
  goal: string;
  experience: string;
  daysPerWeek: string;
  sessionLength: string;
  equipment: string;
  notes: string;
};

const initialValues: BeginnerAnswers = {
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

/** Each entry becomes one <select> in the form - add a field by adding a row here. */
const questions: { name: keyof BeginnerAnswers; label: string; hint: string; options: string[] }[] = [
  {
    name: "goal",
    label: "What is your main goal?",
    hint: "Everything else in the plan follows from this.",
    options: ["Build muscle", "Lose fat", "Get stronger", "General fitness"],
  },
  {
    name: "experience",
    label: "How long have you been training?",
    hint: "Be honest - starting lighter is what makes progress stick.",
    options: ["I have never trained", "Less than 6 months", "6 to 12 months", "More than a year"],
  },
  {
    name: "daysPerWeek",
    label: "How many days a week can you train?",
    hint: "Pick the number you can hold to on a bad week, not a good one.",
    options: ["2 days", "3 days", "4 days", "5 or more days"],
  },
  {
    name: "sessionLength",
    label: "How long can one session be?",
    hint: "Warm-up and rest between sets included.",
    options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"],
  },
  {
    name: "equipment",
    label: "What equipment do you have?",
    hint: "This decides which exercises the guide can suggest.",
    options: ["Full gym", "Home gym with dumbbells", "Resistance bands only", "Bodyweight only"],
  },
];

const fieldClass =
  "block w-full px-4 py-3 text-base rounded-lg border border-slate-600 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

const FormForBeginnerGuide = () => {
  const { userData, isLoading } = useUser();
  const [answers, setAnswers] = useState<BeginnerAnswers | null>(null);

  const isLoggedIn = Boolean(userData?.id || userData?.email);

  // Wait for the stored session to be read before choosing a branch
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-slate-600 border-t-slate-200 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-300">Loading your profile...</p>
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

  // Logged in and already answered - show what was submitted
  if (answers) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <h2 className="text-3xl font-bold">Thanks, {userData?.name || "friend"}!</h2>
          </div>
          <p className="text-slate-300 mb-8">
            Here is what we have for you. These answers shape which muscle groups and
            exercises the guide puts in front of you.
          </p>
          <dl className="space-y-3 mb-8">
            {questions.map((question) => (
              <div
                key={question.name}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3"
              >
                <dt className="text-sm text-slate-400">{question.label}</dt>
                <dd className="font-semibold text-slate-100">{answers[question.name]}</dd>
              </div>
            ))}
            {answers.notes && (
              <div className="bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3">
                <dt className="text-sm text-slate-400 mb-1">Anything we should know</dt>
                <dd className="text-slate-100">{answers.notes}</dd>
              </div>
            )}
          </dl>
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
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Beginner Guide</h1>
        <p className="text-xl text-emerald-400 mb-2">Welcome, {userData?.name || "friend"}!</p>
        <p className="text-slate-300">
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
          onSubmit={(values) => setAnswers(values)}
        >
          {() => (
            <Form className="w-full">
              {questions.map((question) => (
                <div key={question.name} className="mb-6">
                  <label htmlFor={question.name} className="block text-base font-semibold mb-1">
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
                <label htmlFor="notes" className="block text-base font-semibold mb-1">
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
