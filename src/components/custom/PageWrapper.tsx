"use client";

import React from "react";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children?: React.ReactNode;
  /** Extra classes for <main>. */
  className?: string;
  /** Drop the default container and padding so the page can lay itself out. */
  bleed?: boolean;
}

function PageWrapper({ children, className, bleed = false }: PageWrapperProps) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Translucent so the page shows through, sticky so navigation is always one tap away */}
      <header className="glass sticky top-0 z-40 border-b">
        <Header />
      </header>

      <main
        id="main-content"
        className={cn("flex-1 animate-fade-in", !bleed && "container py-8 sm:py-10 lg:py-12", className)}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default PageWrapper;
