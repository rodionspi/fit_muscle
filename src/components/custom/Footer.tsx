"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Github, Heart, Share2 } from "lucide-react";
import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { AUTHOR_URL, GITHUB_REPO_URL } from "@/lib/navigation";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { name: "Muscle chart", href: "/" },
      { name: "3D model", href: "/?view=3d" },
      { name: "Exercise library", href: "/exercises" },
      { name: "Beginner guide", href: "/beginnerGuide" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Log in", href: "/profile/login" },
      { name: "Create account", href: "/profile/registration" },
      { name: "About the project", href: "/about" },
    ],
  },
  {
    title: "Project",
    links: [
      { name: "Source on GitHub", href: GITHUB_REPO_URL, external: true },
      { name: "Report an issue", href: `${GITHUB_REPO_URL}/issues`, external: true },
      { name: "Made by Rodion", href: AUTHOR_URL, external: true },
    ],
  },
];

/** Native share sheet where available, otherwise copies the link. */
const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.origin;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "FitMuscle",
          text: "Know what you train - an anatomy-first training companion.",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // The share sheet was dismissed - nothing to report.
    }
  };

  return (
    <Button variant="secondary" size="sm" onClick={share} type="button">
      {copied ? <Check className="text-emerald-300" /> : <Share2 />}
      {copied ? "Link copied" : "Share FitMuscle"}
    </Button>
  );
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-border">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo size="sm" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An anatomy-first training companion. Pick a muscle, see what it does, then train it with
            exercises, stretches and recovery cues that make sense.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="sm">
              <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github />
                Star on GitHub
              </a>
            </Button>
            <ShareButton />
          </div>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {column.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/70">
        <div className="container flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-1.5">
            &copy; {year} FitMuscle. Built with
            <Heart className="h-3.5 w-3.5 text-emerald-400" aria-label="love" />
            by{" "}
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Rodion
            </a>
            .
          </p>
          <p>Educational content, not medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
