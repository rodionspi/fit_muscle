"use client"

import React from "react";
import Footer from "@/components/custom/Footer";
// import { useUser } from "@/contexts/UserContext";
import Header from "@/components/custom/Header";

function PageWrapper({ children }: { children?: React.ReactNode }) {
  // const {userData, userId} = useUser();

  // useEffect(() => {
  //   if (userData && userData.id && navigation.length === 2) {
  //     setNavigation((prevNav) => [
  //       ...prevNav,
  //       { name: 'Calendar', href: `/calendar/${userData?.id}`, current: false, show: !!userData }
  //     ]);
  //   }
  // }, [userData, userId]);

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <Header />
      </header>

      <main className="container mx-auto px-4 py-8">
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
