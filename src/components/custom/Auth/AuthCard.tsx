"use client";

import React from "react";
import Link from "next/link";
import { LogoMark } from "@/components/custom/Logo";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  /** Line under the card, e.g. the link to the other auth page. */
  footer?: React.ReactNode;
}

/** The shared frame of the login and registration pages. */
const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => (
  <div className="relative mx-auto my-4 w-full max-w-md sm:my-10">
    <div className="pointer-events-none absolute -inset-x-16 -top-24 -z-10 h-72 rounded-full bg-emerald-500/15 blur-3xl" />

    <div className="panel p-6 shadow-elevated sm:p-8">
      <Link href="/" className="group inline-flex" aria-label="FitMuscle home">
        <LogoMark className="h-11 w-11 rounded-xl" />
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>

    {footer && <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>}
  </div>
);

export default AuthCard;
