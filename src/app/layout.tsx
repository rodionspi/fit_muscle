import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import React from "react";
import "./globals.css";
import Providers from "@/components/custom/Providers";

// Body / UI face: neutral and highly legible at small sizes.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display face for headings and the wordmark.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FitMuscle — know what you train",
    template: "%s · FitMuscle",
  },
  description:
    "An anatomy-first training companion. Explore twelve muscle groups in a grid, a list or on a 3D model, then learn the exercises, anatomy, common injuries and stretches for each one.",
  applicationName: "FitMuscle",
  keywords: ["muscle anatomy", "workout", "exercises", "training plan", "3D muscle model", "fitness"],
};

export const viewport: Viewport = {
  themeColor: "#0a0c12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
