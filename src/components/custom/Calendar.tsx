"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Lock, Plus, Save, Trash2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import CalendarType from "@/types/CalendarType";
import { setDataToLS } from "@/server/user/localStorageFunctions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { inputClassName } from "@/components/ui/input";
import { EmptyState, LoadingState, SectionHeading } from "@/components/custom/Feedback";
import { cn } from "@/lib/utils";

type Task = CalendarType[string]["tasks"][number];
type Priority = Task["priority"];

interface DayRef {
  year: number;
  /** 0-based, like Date#getMonth */
  month: number;
  day: number;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = Array.from({ length: 12 }, (_, index) =>
  new Date(2000, index, 1).toLocaleString("en-US", { month: "long" })
);

const PRIORITIES: { value: Priority; label: string; dot: string; active: string }[] = [
  { value: "low", label: "Low", dot: "bg-sky-400", active: "border-sky-400/50 bg-sky-400/10 text-sky-200" },
  { value: "medium", label: "Medium", dot: "bg-amber-400", active: "border-amber-400/50 bg-amber-400/10 text-amber-200" },
  { value: "high", label: "High", dot: "bg-red-400", active: "border-red-400/50 bg-red-400/10 text-red-200" },
];

const dotFor = (priority: Priority) => PRIORITIES.find((item) => item.value === priority)?.dot ?? "bg-sky-400";

// Keys keep the format the app has always stored: YYYY-M-D without zero padding
const keyOf = ({ year, month, day }: DayRef) => `${year}-${month + 1}-${day}`;
const sameDay = (a: DayRef | null, b: DayRef) =>
  Boolean(a && a.year === b.year && a.month === b.month && a.day === b.day);

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const Calendar = () => {
  const { userData, setUserData, isLoading } = useUser();
  const [today, setToday] = useState<DayRef | null>(null);
  const [view, setView] = useState<{ year: number; month: number } | null>(null);
  const [selected, setSelected] = useState<DayRef | null>(null);
  const [calendar, setCalendar] = useState<CalendarType>({});
  const [draft, setDraft] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Dates are read on the client only, so the server render never disagrees with the browser's day
  useEffect(() => {
    const now = new Date();
    const ref = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
    setToday(ref);
    setView({ year: ref.year, month: ref.month });
    setSelected(ref);
  }, []);

  useEffect(() => {
    if (userData?.calendar) setCalendar(userData.calendar);
  }, [userData?.calendar]);

  const dirty = useMemo(
    () => JSON.stringify(calendar) !== JSON.stringify(userData?.calendar ?? {}),
    [calendar, userData?.calendar]
  );

  if (isLoading || !today || !view || !selected) {
    return <LoadingState label="Opening your calendar..." />;
  }

  if (!userData) {
    return (
      <EmptyState
        icon={<Lock />}
        title="Log in to plan your week"
        description="The calendar is saved to your profile, so it needs an account to live in."
        action={{ label: "Log in", href: "/profile/login" }}
        className="my-16"
      />
    );
  }

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const selectedKey = keyOf(selected);
  const tasks = calendar[selectedKey]?.tasks ?? [];
  const done = tasks.filter((task) => task.completed).length;
  const selectedLabel = new Date(selected.year, selected.month, selected.day).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const shiftMonth = (delta: number) =>
    setView((current) => {
      if (!current) return current;
      const date = new Date(current.year, current.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });

  const goToToday = () => {
    setView({ year: today.year, month: today.month });
    setSelected(today);
  };

  const updateTasks = (key: string, updater: (list: Task[]) => Task[]) =>
    setCalendar((previous) => {
      const next = updater(previous[key]?.tasks ?? []);
      const copy = { ...previous };
      if (next.length) copy[key] = { tasks: next };
      else delete copy[key];
      return copy;
    });

  const addTask = () => {
    const text = draft.trim();
    if (!text) return;
    updateTasks(selectedKey, (list) => [
      ...list,
      { id: newId(), title: text.split("\n")[0].slice(0, 60), description: text, completed: false, priority },
    ]);
    setDraft("");
  };

  const toggleTask = (id: string) =>
    updateTasks(selectedKey, (list) =>
      list.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );

  const removeTask = (id: string) => updateTasks(selectedKey, (list) => list.filter((task) => task.id !== id));

  const save = () => {
    const profile = { ...userData, calendar };
    setUserData(profile);
    setDataToLS(profile);
    setSavedAt(Date.now());
  };

  return (
    <div>
      <SectionHeading
        eyebrow="Workout calendar"
        title="Plan your week"
        description="Pick a day, note what you want to train, tick it off afterwards and save."
        as="h1"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="panel p-5 sm:p-6" aria-label="Month">
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" size="icon-sm" onClick={() => shiftMonth(-1)} aria-label="Previous month" type="button">
              <ChevronLeft />
            </Button>
            <div className="text-center">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {MONTHS[view.month]} <span className="text-muted-foreground">{view.year}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {(view.year !== today.year || view.month !== today.month || !sameDay(selected, today)) && (
                <Button variant="ghost" size="sm" onClick={goToToday} type="button" className="hidden sm:inline-flex">
                  Today
                </Button>
              )}
              <Button variant="outline" size="icon-sm" onClick={() => shiftMonth(1)} aria-label="Next month" type="button">
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1.5 text-center sm:gap-2">
            {WEEKDAYS.map((weekday) => (
              <div key={weekday} className="pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {weekday}
              </div>
            ))}

            {cells.map((day, index) => {
              if (day === null) return <div key={`empty-${index}`} aria-hidden="true" />;

              const ref = { year: view.year, month: view.month, day };
              const dayTasks = calendar[keyOf(ref)]?.tasks ?? [];
              const isSelected = sameDay(selected, ref);
              const isToday = sameDay(today, ref);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelected(ref)}
                  aria-pressed={isSelected}
                  aria-label={`${day} ${MONTHS[view.month]}${dayTasks.length ? `, ${dayTasks.length} planned` : ""}`}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-center rounded-xl border text-sm font-medium transition-colors",
                    isSelected
                      ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-100"
                      : "border-transparent text-foreground/85 hover:border-border hover:bg-white/[0.04]",
                    isToday && !isSelected && "border-border text-emerald-300"
                  )}
                >
                  <span className={cn(isToday && "font-bold")}>{day}</span>
                  {dayTasks.length > 0 && (
                    <span className="absolute bottom-1.5 flex gap-0.5 sm:bottom-2">
                      {dayTasks.slice(0, 3).map((task) => (
                        <span key={task.id} className={cn("h-1.5 w-1.5 rounded-full", dotFor(task.priority))} />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="panel flex flex-col p-5 sm:p-6" aria-label="Selected day">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">
                <CalendarDays className="h-3.5 w-3.5" />
                {sameDay(selected, today) ? "Today" : "Selected day"}
              </p>
              <h2 className="mt-1 text-xl font-semibold">{selectedLabel}</h2>
            </div>
            {tasks.length > 0 && (
              <Badge variant={done === tasks.length ? "default" : "secondary"}>
                {done}/{tasks.length} done
              </Badge>
            )}
          </div>

          <ul className="mt-5 space-y-2">
            {tasks.length === 0 && (
              <li className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Nothing planned yet. Add a session below.
              </li>
            )}
            {tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface-2 p-3">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.completed ? "Mark as not done" : "Mark as done"}
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    task.completed
                      ? "border-emerald-400 bg-emerald-400 text-[#052e22]"
                      : "border-muted-foreground/40 hover:border-emerald-400"
                  )}
                >
                  {task.completed && <Check className="h-3.5 w-3.5" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={cn("whitespace-pre-line text-sm", task.completed && "text-muted-foreground line-through")}>
                    {task.description}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs capitalize text-muted-foreground">
                    <span className={cn("h-1.5 w-1.5 rounded-full", dotFor(task.priority))} />
                    {task.priority} priority
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeTask(task.id)}
                  aria-label="Delete task"
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border pt-5">
            <label htmlFor="new-task" className="text-sm font-medium">
              Add a session
            </label>
            <textarea
              id="new-task"
              rows={3}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") addTask();
              }}
              placeholder="e.g. Upper body: bench press 4×8, rows 3×10, face pulls"
              className={cn(inputClassName, "mt-2 h-auto min-h-[88px] resize-none py-2.5")}
            />
            <div className="mt-3 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Priority">
              {PRIORITIES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={priority === item.value}
                  onClick={() => setPriority(item.value)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    priority === item.value
                      ? item.active
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", item.dot)} />
                  {item.label}
                </button>
              ))}
              <Button variant="secondary" size="sm" onClick={addTask} type="button" disabled={!draft.trim()} className="ml-auto">
                <Plus />
                Add
              </Button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
            <p className="text-xs text-muted-foreground">
              {dirty ? "Unsaved changes" : savedAt ? "Saved to your profile" : "Everything is saved"}
            </p>
            <Button onClick={save} type="button" disabled={!dirty}>
              <Save />
              Save calendar
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Calendar;
