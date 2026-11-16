"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { MAIN_NAV, isActivePath } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import UserMenubar from "./Menubars/UserMenubar";
import MainMenubar from "./Menubars/MainMenubar";

const Header = () => {
  const pathname = usePathname();
  const { userData, isLoading } = useUser();

  return (
    <div className="container flex h-16 items-center justify-between gap-4">
      <Logo />

      {/* Desktop navigation: a pill track with a sliding highlight. */}
      <nav
        aria-label="Main"
        className="hidden items-center gap-1 rounded-full border border-border/70 bg-surface-2/60 p-1 md:flex"
      >
        {MAIN_NAV.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="header-active-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.07] shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.06)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-end gap-2">
        {isLoading ? (
          // Placeholder of the avatar's size, so the bar does not jump once the session is read
          <span className="skeleton h-9 w-9 rounded-full" aria-hidden="true" />
        ) : userData ? (
          <UserMenubar />
        ) : (
          <>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/profile/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/profile/registration">Get started</Link>
            </Button>
          </>
        )}
        <MainMenubar loggedIn={Boolean(userData)} />
      </div>
    </div>
  );
};

export default Header;
