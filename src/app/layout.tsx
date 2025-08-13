"use client"

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { MusclesProvider } from "@/contexts/MusclesContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-700`}>
        {typeof window !== "undefined" ? (
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <UserProvider>
              <MusclesProvider>{children}</MusclesProvider>
            </UserProvider>
          </BrowserRouter>
        ) : (
          <UserProvider>
            <MusclesProvider>{children}</MusclesProvider>
          </UserProvider>
        )}
      </body>
    </html>
  );
}
