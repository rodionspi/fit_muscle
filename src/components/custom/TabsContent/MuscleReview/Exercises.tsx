import Muscle, { Exercise } from '@/types/Muscle';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Play, BarChart3, Flame, Info, Badge } from 'lucide-react';
import Image from "next/image";

interface ExercisesProps {
  muscleInfo: Muscle;
}

const Exercises: React.FC<ExercisesProps> = ({ muscleInfo }) => {
  const [activeExercise, setActiveExercise] = useState(0)

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
        <h2 className="text-2xl font-bold mb-4">Exercises</h2>
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            {muscleInfo.exercises.map((exercise: Exercise, index: number) => (
                <div
                    key={index}
                    className={`border-b border-slate-700 last:border-0 p-4 cursor-pointer hover:bg-slate-700/50 transition-colors ${activeExercise === index ? "bg-slate-700/70" : ""}`}
                    onClick={() => setActiveExercise(index)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden bg-slate-700 flex-shrink-0">
                            <Image
                            src={exercise.image || "/placeholder.svg"}
                            alt={exercise.name}
                            fill
                            unoptimized
                            className="object-cover w-full h-full"
                            />
                        </div>
                    <div className="flex-1">
                        <h3 className="font-medium">{exercise.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Badge className="text-xs border-slate-600">
                            {exercise.difficulty}
                        </Badge>
                        <span>{exercise.target}</span>
                        </div>
                    </div>
                    {activeExercise === index && <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>}
                    </div>
                </div>
            ))}
        </div>
        </div>

        <div className="md:col-span-2">
        {muscleInfo.exercises[activeExercise] && (
            <motion.div
            key={activeExercise}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{muscleInfo.exercises[activeExercise].name}</h2>
                <Button onClick={() => window.open(muscleInfo.exercises[activeExercise].videoLink, "_blank")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                </Button>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
                <div className="aspect-video relative" onClick={() => window.open(muscleInfo.exercises[activeExercise].videoLink, "_blank")}>
                    <Image
                        src={muscleInfo.exercises[activeExercise].image || "/placeholder.svg"}
                        alt={muscleInfo.exercises[activeExercise].name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                            <Play className="w-8 h-8 text-white" fill="white" />
                        </div>
                    </div>
                </div>
                <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                    <h4 className="text-sm text-slate-400 mb-1">Difficulty</h4>
                    <p className="font-medium">{muscleInfo.exercises[activeExercise].difficulty}</p>
                    </div>
                    <div>
                    <h4 className="text-sm text-slate-400 mb-1">Equipment</h4>
                    <p className="font-medium">{muscleInfo.exercises[activeExercise].equipment}</p>
                    </div>
                    <div>
                    <h4 className="text-sm text-slate-400 mb-1">Target</h4>
                    <p className="font-medium">{muscleInfo.exercises[activeExercise].target}</p>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">How to Perform</h3>
                <p className="text-slate-300 mb-4">{muscleInfo.exercises[activeExercise].description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-700/50 p-4 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-sm text-slate-400">Sets</h4>
                        <p className="font-medium">{muscleInfo.exercises[activeExercise].sets}</p>
                    </div>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <Flame className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <h4 className="text-sm text-slate-400 mb-1">Reps</h4>
                        <p className="font-medium">{muscleInfo.exercises[activeExercise].reps}</p>
                    </div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2 text-amber-400" />
                    Tips
                </h3>
                <p className="text-slate-300">{muscleInfo.exercises[activeExercise].tips}</p>
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-700 hover:text-slate-400"
                  onClick={() => setActiveExercise(Math.max(0, activeExercise - 1))}
                  disabled={activeExercise === 0}
                >
                  Previous Exercise
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-700 hover:text-slate-400"
                  onClick={() => setActiveExercise(Math.min(muscleInfo.exercises.length - 1, activeExercise + 1))}
                  disabled={activeExercise === muscleInfo.exercises.length - 1}
                >
                  Next Exercise
                </Button>
            </div>
            </motion.div>
        )}
        </div>
    </div>
  );
}

export default Exercises;