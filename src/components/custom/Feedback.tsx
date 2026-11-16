import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/** A ring spinner in the brand colour. */
export const Spinner = ({ className }: { className?: string }) => (
  <span
    role="status"
    aria-label="Loading"
    className={cn(
      "inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-white/10 border-t-emerald-400",
      className
    )}
  />
);

interface LoadingStateProps {
  label?: string;
  className?: string;
}

/** Centered spinner with a line of text, for whole sections that are still loading. */
export const LoadingState = ({ label = "Loading...", className }: LoadingStateProps) => (
  <div className={cn("flex flex-col items-center justify-center gap-4 py-24 text-center", className)}>
    <Spinner />
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}

/** Friendly placeholder for errors, missing records and empty lists. */
export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div className={cn("panel mx-auto max-w-md px-8 py-12 text-center", className)}>
    {icon && (
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-2 text-amber-300 [&_svg]:h-7 [&_svg]:w-7">
        {icon}
      </div>
    )}
    <h2 className="text-2xl font-semibold">{title}</h2>
    {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    {action && (
      <Button asChild className="mt-7">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    )}
  </div>
);

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Controls rendered on the right (desktop) / below (phones). */
  actions?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/** Eyebrow + heading + description, with an optional action slot. */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
  actions,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) => (
  <div className={cn("flex flex-col gap-5 md:flex-row md:items-end md:justify-between", className)}>
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Heading className="text-3xl font-semibold md:text-4xl">{title}</Heading>
      {description && <p className="mt-3 text-base text-muted-foreground md:text-lg">{description}</p>}
    </div>
    {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
  </div>
);
