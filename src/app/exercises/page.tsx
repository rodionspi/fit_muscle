import Link from "next/link";
// import { Github, Mail, Heart, Phone, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
import React from "react";
import musclesList from "@/components/musclesList"; // Assuming you have a exercisesList data file
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Muscle, Exercise } from "@/types/Muscle";
import { PageWrapper } from "@/components/custom";
import { Target } from "lucide-react";


const ExercisesPage = () => {
  return (
        <PageWrapper>
            <div className="relative overflow-hidden via-slate-800 to-slate-900 text-white">
                      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center"></div>
                      <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                          <Target className="w-10 h-10" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                          Exercises Library
                        </h1>
                      </div>
                    </div>
            {/* Grid of exercise cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {musclesList.flatMap((muscle: Muscle) =>
                    muscle.exercises.map((exercise: Exercise, idx: number) => (
                        <Card key={`${muscle.id}-${idx}`}>
                            <CardHeader className="flex items-center space-x-3">
                                <Image
                                src={exercise.image || "/placeholder.svg"}
                                alt={exercise.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                                />
                                <CardTitle>{exercise.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {exercise.description}
                                </CardDescription>
                                <CardDescription className="mt-2 hidden lg:block">
                                    Equipment: {exercise.equipment}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="pb-0 mb-0">
                                <Link href="/" className="m-auto">
                                    <Button variant="secondary" size="sm">
                                        View Details
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </PageWrapper>
    )
}

export default ExercisesPage;