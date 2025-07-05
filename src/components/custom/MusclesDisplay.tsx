"use client";

import musclesList from '../musclesList';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import GridRender from './TabsContent/MuscleDisplay/GridRender';
import ListRender from './TabsContent/MuscleDisplay/ListRender';
// import { Input } from "@/components/ui/input"

const MusclesDisplay = () => {
    return (
      <>
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Muscle Chart</h2>
            <p className="text-slate-300">Explore different muscle groups and learn about targeted exercises</p>
        </div>
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
            <GridRender musclesList={musclesList}/>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <ListRender musclesList={musclesList}/>
          </TabsContent>

          <TabsContent value="3d" className="mt-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">3D Muscle Viewer</h3>
              <p className="text-slate-300 mb-6">Interactive 3D model coming soon! Explore muscles from all angles.</p>
              <Button>Get Notified</Button>
            </div>
          </TabsContent>
        </Tabs>
      </>
    );
}

export default MusclesDisplay;