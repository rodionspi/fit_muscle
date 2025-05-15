"use client"

import React from "react";
import Footer from "@/components/custom/Footer";
import NavBar from "@/components/custom/NavBar";
import { useUser } from "@/contexts/UserContext";
import Navigation from "@/types/Navigaton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search, User } from "lucide-react";
import { Button } from "../ui/button";

function PageWrapper({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const {userData, userId} = useUser();
  
  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: 'Muscle Chart', href: '/', current: true, show: true },
    { name: 'About', href: '/about/', current: false, show: true },
  ]);

  useEffect(() => {
    if (pathname) {
      setNavigation((prevNav) =>
        prevNav.map((item) => ({
          ...item,
          current: pathname === item.href,
        }))
      );
    }
  }, [pathname]);

  useEffect(() => {
    if (userData && userData.id && navigation.length === 2) {
      setNavigation((prevNav) => [
        ...prevNav,
        { name: 'Calendar', href: `/calendar/${userData?.id}`, current: false, show: !!userData }
      ]);
    }
  }, [userData, userId]);

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.5 17.5L14 14.5L7 9.5L17.5 6.5"
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">FitMuscle</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="font-medium border-b-2 border-white py-1">
              Muscle Chart
            </a>
            <a href="#" className="font-medium text-slate-300 hover:text-white transition-colors py-1">
              About
            </a>
            <a href="#" className="font-medium text-slate-300 hover:text-white transition-colors py-1">
              Calendar
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                className="w-64 pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-slate-500"
                placeholder="Search muscles or exercises..."
              />
            </div>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <User size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Muscle Chart</h2>
          <p className="text-slate-300">Explore different muscle groups and learn about targeted exercises</p>
        </div>
        {children || <div>Loading content...</div>}
      </main>

      {/* {selectedMuscle && (
          <motion.div
            className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              {muscleGroups.find((m) => m.id === selectedMuscle)?.name} Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Overview</h4>
                <p className="text-slate-300 mb-4">
                  The {muscleGroups.find((m) => m.id === selectedMuscle)?.name.toLowerCase()} are a major muscle group
                  that play an important role in various movements and exercises.
                </p>
                <h4 className="text-lg font-semibold mb-2">Function</h4>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Primary movement patterns</li>
                  <li>Stabilization during compound exercises</li>
                  <li>Support for adjacent muscle groups</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Recommended Exercises</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className="w-12 h-12 bg-slate-700 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">{i}</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Exercise {i}</h5>
                        <p className="text-sm text-slate-300">3 sets × 12 reps</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )} */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default PageWrapper;
