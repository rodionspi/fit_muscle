"use client"

import { metadata } from "@/types/metadata";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-700`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
