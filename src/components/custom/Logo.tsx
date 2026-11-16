import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  className?: string;
  size?: LogoSize;
  withText?: boolean;
  /** Pass null to render a non-interactive logo (e.g. inside another link). */
  href?: string | null;
}

const MARK_SIZE: Record<LogoSize, string> = {
  sm: "h-8 w-8 rounded-lg",
  md: "h-9 w-9 rounded-xl sm:h-10 sm:w-10",
  lg: "h-12 w-12 rounded-2xl",
};

const TEXT_SIZE: Record<LogoSize, string> = {
  sm: "text-lg",
  md: "text-xl sm:text-2xl",
  lg: "text-3xl",
};

/** The brand mark alone: a gradient tile with the FitMuscle bolt. */
export const LogoMark = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cn(
      "relative inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-emerald-200 via-emerald-400 to-teal-600 text-[#052e22] shadow-glow-sm transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105",
      className
    )}
  >
    <svg viewBox="0 0 24 24" fill="none" className="h-[60%] w-[60%]">
      <path
        d="M6.5 17.5L14 14.5L7 9.5L17.5 6.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const Logo = ({ className, size = "md", withText = true, href = "/" }: LogoProps) => {
  const content = (
    <>
      <LogoMark className={MARK_SIZE[size]} />
      {withText && (
        <span className={cn("font-display font-bold tracking-tight text-foreground", TEXT_SIZE[size])}>
          Fit<span className="text-gradient">Muscle</span>
        </span>
      )}
    </>
  );

  const classes = cn("group inline-flex items-center gap-2.5", className);

  if (!href) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} className={classes} aria-label="FitMuscle home">
      {content}
    </Link>
  );
};

export default Logo;
