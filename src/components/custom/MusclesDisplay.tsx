"use client";

import { useState, useEffect, useCallback } from 'react';
import musclesList from '../musclesList';
import Muscle from '@/types/Muscle';
import React from 'react';
import Image from "next/image"
import muscleRendering from '@/components/custom/MuscleRendering';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Info, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

const MusclesDisplay = () => {

    const [currentMuscleTD, setCurrentMuscleTD] = useState<string>('');
    const [mode, setMode] = useState<'Table' | 'Carousel'>('Table');
    const [selectedMuscle, setSelectedMuscle] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const mediaQuery = window.matchMedia('(max-width: 650px)');
            if (mediaQuery.matches) {
                setMode('Table');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onMouseEnter = useCallback((muscleName: string) => {
        if (muscleName && currentMuscleTD !== muscleName) {
            setCurrentMuscleTD(muscleName);
        }
    }, [currentMuscleTD]);

    const onMouseLeave = useCallback(() => {
        setCurrentMuscleTD('');
    }, []);
    
    return (
            <Tabs defaultValue="grid" className="mb-8">
              <div className="flex justify-between items-center">
                <TabsList className="bg-slate-800">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="3d">3D View</TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
                    <Info size={16} className="mr-2" />
                    Beginner Guide
                  </Button>
                  <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
                    <Calendar size={16} className="mr-2" />
                    Workout Planner
                  </Button>
                </div>
              </div>
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {musclesList.map((muscle) => (
                  <motion.div
                    key={muscle.id}
                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer group`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMuscle(muscle.id === selectedMuscle ? null : muscle.id)}
                  >
                    <div className="aspect-square p-4 flex flex-col items-center justify-center">
                      <div className="relative w-full h-3/4 mb-4">
                        <Image
                          src={muscle.src || "/placeholder.svg"}
                          alt={muscle.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-center">{muscle.name}</h3>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                      <Button variant="secondary" size="sm" className="w-full">
                        View Details
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4">Muscle Group</th>
                      <th className="text-left p-4 hidden md:table-cell">Primary Function</th>
                      <th className="text-left p-4 hidden lg:table-cell">Key Exercises</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {musclesList.map((muscle, index) => (
                      <tr
                        key={muscle.id}
                        className={`border-b border-slate-700 last:border-0 hover:bg-slate-700/50 transition-colors ${index % 2 === 0 ? "bg-slate-800/50" : ""}`}
                      >
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 relative rounded-md overflow-hidden bg-slate-700 flex-shrink-0">
                            <Image
                              src={muscle.image || "/placeholder.svg"}
                              alt={muscle.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{muscle.name}</span>
                        </td>
                        <td className="p-4 text-slate-300 hidden md:table-cell">Movement and stability</td>
                        <td className="p-4 text-slate-300 hidden lg:table-cell">Bench press, Flyes, Push-ups</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="3d" className="mt-6">
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">3D Muscle Viewer</h3>
                <p className="text-slate-300 mb-6">Interactive 3D model coming soon! Explore muscles from all angles.</p>
                <Button>Get Notified</Button>
              </div>
            </TabsContent>
            </Tabs>
    );
}

export default MusclesDisplay;