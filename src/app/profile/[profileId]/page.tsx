"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays, ClipboardList, Layers, LogOut, Pencil, ShieldCheck, Sparkles } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import PageWrapper from "@/components/custom/PageWrapper";
import Avatar from "@/components/custom/Avatar";
import AvatarPicker from "@/components/custom/AvatarPicker";
import { LoadingState } from "@/components/custom/Feedback";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { endSession } from "@/lib/session";

const ProfilePage = () => {
  const { userData, isLoading, setUserData, setUserId } = useUser();
  const router = useRouter();
  const [pickerOpen, setPickerOpen] = useState(false);

  // The provider has already looked in localStorage by the time isLoading drops
  useEffect(() => {
    if (!isLoading && !userData) router.replace("/profile/login");
  }, [isLoading, userData, router]);

  const handleSignOut = async () => {
    setUserData(null);
    setUserId(null);
    await endSession();
    router.push("/");
  };

  if (!userData) {
    return (
      <PageWrapper>
        <LoadingState label="Opening your profile..." />
      </PageWrapper>
    );
  }

  const plannedDays = Object.values(userData.calendar ?? {}).filter((day) => day.tasks?.length).length;

  const shortcuts = [
    {
      icon: ClipboardList,
      title: "Beginner guide",
      text: "Five answers become a weekly split built from the exercise library.",
      href: "/beginnerGuide",
      tone: "bg-emerald-400/10 text-emerald-300",
    },
    {
      icon: CalendarDays,
      title: "Workout calendar",
      text: plannedDays
        ? `${plannedDays} ${plannedDays === 1 ? "day" : "days"} planned so far. Keep it going.`
        : "Pin what you want to train to a day and tick it off afterwards.",
      href: `/calendar/${userData.id}`,
      tone: "bg-sky-400/10 text-sky-300",
    },
    {
      icon: Layers,
      title: "Muscle chart",
      text: "Back to the twelve groups, their anatomy, exercises and stretches.",
      href: "/",
      tone: "bg-amber-400/10 text-amber-300",
    },
  ];

  return (
    <PageWrapper>
      <section className="panel relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setPickerOpen((open) => !open)}
              aria-expanded={pickerOpen}
              aria-controls="avatar-picker"
              aria-label="Change avatar"
              className="group relative shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card"
            >
              <Avatar
                name={userData.name}
                email={userData.email}
                avatar={userData.avatar}
                className="h-20 w-20 text-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-glow-sm transition-transform duration-300 group-hover:scale-110">
                <Pencil className="h-3.5 w-3.5" />
              </span>
            </button>
            <div className="min-w-0">
              <p className="eyebrow">Your profile</p>
              <h1 className="mt-1 truncate text-3xl font-bold sm:text-4xl">{userData.name || "Athlete"}</h1>
              {userData.email && <p className="mt-1 truncate text-muted-foreground">{userData.email}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>
                  <ShieldCheck />
                  Signed in
                </Badge>
                {plannedDays > 0 && <Badge variant="info">{plannedDays} planned {plannedDays === 1 ? "day" : "days"}</Badge>}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:self-start">
            <Button
              variant="secondary"
              onClick={() => setPickerOpen((open) => !open)}
              aria-expanded={pickerOpen}
              aria-controls="avatar-picker"
              type="button"
            >
              <Sparkles />
              {userData.avatar ? "Change avatar" : "Pick an avatar"}
            </Button>
            <Button variant="secondary" onClick={handleSignOut} type="button">
              <LogOut />
              Sign out
            </Button>
          </div>
        </div>
      </section>

      {pickerOpen && (
        <div className="mt-6">
          <AvatarPicker id="avatar-picker" onClose={() => setPickerOpen(false)} />
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Where to next</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {shortcuts.map(({ icon: Icon, title, text, href, tone }) => (
            <Link
              key={title}
              href={href}
              className="panel group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-muted-foreground/30"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold">Account details</h2>
          <dl className="mt-4 divide-y divide-border text-sm">
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="truncate font-medium">{userData.name || "-"}</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-muted-foreground">E-mail</dt>
              <dd className="truncate font-medium">{userData.email || "-"}</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-muted-foreground">Profile id</dt>
              <dd className="truncate font-mono text-xs text-foreground/70">{userData.id}</dd>
            </div>
          </dl>
        </div>

        <div className="panel-muted p-6">
          <h2 className="text-xl font-semibold">Privacy</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your profile lives in Firebase under your own account and is mirrored to this browser so a
            refresh keeps you logged in. Signing out clears that copy. Nothing here is medical advice:
            when pain lingers, talk to a professional.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ProfilePage;
