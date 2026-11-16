"use client";

import React from "react";
import PageWrapper from "@/components/custom/PageWrapper";
import Hero from "@/components/custom/Hero";
import HowItWorks from "@/components/custom/HowItWorks";
import { MusclesDisplay } from "@/components/custom";

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <MusclesDisplay />
      <HowItWorks />
    </PageWrapper>
  );
}
