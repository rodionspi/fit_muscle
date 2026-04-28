"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import GridRender from './TabsContent/MuscleDisplay/GridRender';
import ListRender from './TabsContent/MuscleDisplay/ListRender';
import { getMuscles } from '@/server/muscles/musclesDataFunctions';
// import { Input } from "@/components/ui/input"

const ThreeDView = dynamic(() => import('./TabsContent/MuscleDisplay/ThreeDView'), {
  ssr: false,
});

const MusclesDisplay = () => {
    const [musclesList, setMusclesList] = useState([]);

    useEffect(() => {
        const fetchMuscles = async () => {
            const muscles = await getMuscles();
            setMusclesList(muscles);
            console.log("Fetched muscles:", muscles);
        };
        fetchMuscles();
    }, []);

    return (
      <>
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Muscle Chart</h2>
            <p className="text-slate-300">Explore different muscle groups and learn about targeted exercises</p>
        </div>
        <Tabs defaultValue="grid" className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <TabsList className="bg-slate-800 w-auto mb-4 sm:mb-0">
                <TabsTrigger value="grid" className='rounded-s-md'>Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="3d" className='rounded-e-md'>3D View</TabsTrigger>
              </TabsList>

              <div className="flex gap-2 w-auto justify-center sm:justify-start">
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
            <GridRender musclesList={musclesList}/>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <ListRender musclesList={musclesList}/>
          </TabsContent>

          <TabsContent value="3d" className="mt-6">
            <ThreeDView />
          </TabsContent>
        </Tabs>
      </>
    );
}

export default MusclesDisplay;