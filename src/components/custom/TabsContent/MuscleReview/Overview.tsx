import React from 'react';
import { Clock, Info, Target } from "lucide-react";
import Muscle, { StretchingExercise } from '@/types/Muscle';
import { Progress } from "@/components/ui/progress"

interface OverviewProps {
  muscleInfo: Muscle;
}

const Overview: React.FC<OverviewProps> = ({ muscleInfo }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-emerald-400" />
                  About {muscleInfo.name}
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 mb-4">{muscleInfo.description}</p>
                  <h3 className="text-xl font-semibold mb-2">Function</h3>
                  <p className="text-slate-300 mb-4">{muscleInfo.function}</p>
                  <h3 className="text-xl font-semibold mb-2">Anatomy</h3>
                  <p className="text-slate-300">{muscleInfo.anatomy}</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-amber-400" />
                  Training Tips
                </h2>
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Recommended Training Frequency</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-400">Beginner</span>
                        <span className="text-sm text-slate-400">1-2 times per week</span>
                      </div>
                      <Progress value={40} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-400">Intermediate</span>
                        <span className="text-sm text-slate-400">2-3 times per week</span>
                      </div>
                      <Progress value={60} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-400">Advanced</span>
                        <span className="text-sm text-slate-400">3-4 times per week</span>
                      </div>
                      <Progress value={80} className="h-2 bg-slate-700" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">Stretching Exercises</h3>
                <div className="space-y-3 mb-6">
                  {muscleInfo.stretchingExercises.map((stretch: StretchingExercise, index: number) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <h4 className="font-medium mb-1">{stretch.name}</h4>
                      <p className="text-sm text-slate-300 mb-2">{stretch.description}</p>
                      <div className="flex items-center text-sm text-slate-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{stretch.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  );
}

export default Overview;