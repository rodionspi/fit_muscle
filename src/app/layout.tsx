"use client"

import React from "react";
import "./globals.css";
import { UserProvider } from "../contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { MusclesProvider } from "@/contexts/MusclesContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caacupe+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {typeof window !== "undefined" ? (
          <BrowserRouter
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
