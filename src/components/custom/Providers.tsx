"use client";

import React from "react";
import { UserProvider } from "@/contexts/UserContext";
import { MusclesProvider } from "@/contexts/MusclesContext";

/**
 * Client-side context providers, kept apart from app/layout.tsx so the layout
 * itself can stay a server component and export metadata.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <MusclesProvider>{children}</MusclesProvider>
    </UserProvider>
  );
}
