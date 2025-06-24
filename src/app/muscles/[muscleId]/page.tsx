"use client";

import React, {useState, useEffect} from "react";
import musclesList from "@/components/musclesList";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Button } from "@headlessui/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { AlertTriangle, Link, ArrowLeft, BookOpen, Badge, Play, Dumbbell, Info, Target, ChevronRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image";
import Muscle from "@/types/Muscle";

const MusclePage = () => {
  //   const [activeExercise, setActiveExercise] = useState(0)
  const { muscleId } = useParams(); // takes a parameter from the useParams hook
  const [muscleInfo, setMuscleInfo] = useState<Muscle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from an API
    setLoading(true);
    setMuscleInfo(
      musclesList.find((m: Muscle) => m.id === Number(muscleId)) || null
    );
    setLoading(false);
  }, [muscleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-600 border-t-slate-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading muscle information...</p>
        </div>
      </div>
    )
  }

  if (!muscleInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-slate-800 rounded-xl border border-slate-700">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Muscle Not Found</h2>
          <p className="text-slate-300 mb-6">We couldn&apos;t find information about the requested muscle group.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Muscle Chart
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button className="text-slate-300 hover:text-white">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Muscle Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button className="text-slate-300 border-slate-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 relative">
              <div className="aspect-square relative rounded-xl overflow-hidden border-4 border-slate-600 shadow-xl">
                <Image
                  src={muscleInfo.src || "/placeholder.svg"}
                  alt={muscleInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="text-emerald-400 border-emerald-400">
                  Anatomy
                </Badge>
                {/* <Badge className="text-amber-400 border-amber-400">
                  {muscleInfo.exercises.length} Exercises
                </Badge> */}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{muscleInfo.name}</h1>
              {/* <p className="text-xl text-slate-300 mb-6">{muscleInfo.description}</p> */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-sm text-slate-400 mb-1">Also Known As</h3>
                  {/* <p className="font-medium">{muscleInfo.shortName}</p> */}
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-sm text-slate-400 mb-1">Related Muscles</h3>
                  {/* <p className="font-medium capitalize">{muscleInfo.relatedMuscles.join(", ")}</p> */}
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-sm text-slate-400 mb-1">Difficulty Level</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                    <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600">
                  <Play className="w-4 h-4 mr-2" />
                  Start Workout
                </Button>
                <Button className="border-slate-600">
                  <Dumbbell className="w-4 h-4 mr-2" />
                  View Exercises
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-slate-800 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="anatomy">Anatomy</TabsTrigger>
            <TabsTrigger value="injuries">Common Injuries</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-emerald-400" />
                  About {muscleInfo.name}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {/* <p className="text-slate-300 mb-4">{muscleInfo.description}</p> */}
                  <h3 className="text-xl font-semibold mb-2">Function</h3>
                  {/* <p className="text-slate-300 mb-4">{muscleInfo.function}</p> */}
                  <h3 className="text-xl font-semibold mb-2">Anatomy</h3>
                  {/* <p className="text-slate-300">{muscleInfo.anatomy}</p> */}
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
                      {/* <Progress value={40} className="h-2 bg-slate-700" indicatorClassName="bg-emerald-500" /> */}
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-400">Intermediate</span>
                        <span className="text-sm text-slate-400">2-3 times per week</span>
                      </div>
                      {/* <Progress value={60} className="h-2 bg-slate-700" indicatorClassName="bg-amber-500" /> */}
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-400">Advanced</span>
                        <span className="text-sm text-slate-400">3-4 times per week</span>
                      </div>
                      {/* <Progress value={80} className="h-2 bg-slate-700" indicatorClassName="bg-red-500" /> */}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">Stretching Exercises</h3>
                <div className="space-y-3 mb-6">
                  {/* {muscleInfo.stretchingExercises.map((stretch: any, index: number) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <h4 className="font-medium mb-1">{stretch.name}</h4>
                      <p className="text-sm text-slate-300 mb-2">{stretch.description}</p>
                      <div className="flex items-center text-sm text-slate-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{stretch.duration}</span>
                      </div>
                    </div>
                  ))} */}
                </div>

                <h3 className="text-xl font-semibold mb-3">Related Muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {/* {muscleInfo.relatedMuscles.map((muscle: string) => (
                    <Link key={muscle} href={`/muscles/${muscle}`} passHref>
                      <Button size="sm" className="border-slate-700 hover:border-slate-500">
                        {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  ))} */}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4">Exercises</h2>
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                  {/* {muscleInfo.exercises.map((exercise: any, index: number) => (
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
                            className="object-cover"
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
                  ))} */}
                </div>
              </div>

              <div className="md:col-span-2">
                {/* {muscleInfo.exercises[activeExercise] && (
                  <motion.div
                    key={activeExercise}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">{muscleInfo.exercises[activeExercise].name}</h2>
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video
                      </Button>
                    </div>

                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
                      <div className="aspect-video relative">
                        <Image
                          src={muscleInfo.exercises[activeExercise].image || "/placeholder.svg"}
                          alt={muscleInfo.exercises[activeExercise].name}
                          fill
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
                        className="border-slate-700"
                        onClick={() => setActiveExercise(Math.max(0, activeExercise - 1))}
                        disabled={activeExercise === 0}
                      >
                        Previous Exercise
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-700"
                        onClick={() => setActiveExercise(Math.min(muscleInfo.exercises.length - 1, activeExercise + 1))}
                        disabled={activeExercise === muscleInfo.exercises.length - 1}
                      >
                        Next Exercise
                      </Button>
                    </div>
                  </motion.div>
                )} */}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="anatomy">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Muscle Anatomy</h2>
                <div className="aspect-square relative rounded-xl overflow-hidden border border-slate-700 mb-6">
                  <Image
                    src={muscleInfo.image || "/placeholder.svg"}
                    alt={muscleInfo.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Origin</h3>
                      <p className="text-sm text-slate-300">
                        The point where the muscle attaches to the stationary bone.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Insertion</h3>
                      <p className="text-sm text-slate-300">The point where the muscle attaches to the moving bone.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Detailed Information</h2>
                <Accordion
                  type="single"
                  collapsible
                  className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
                >
                  <AccordionItem value="structure" className="border-b border-slate-700">
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50">Muscle Structure</AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {/* <p className="text-slate-300 mb-4">{muscleInfo.anatomy}</p> */}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="function" className="border-b border-slate-700">
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50">Function & Movement</AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {/* <p className="text-slate-300 mb-4">{muscleInfo.function}</p> */}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="synergists" className="border-b border-slate-700">
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50">Synergist Muscles</AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-slate-300 mb-4">
                        Synergist muscles that work with the {muscleInfo.name} include:
                      </p>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {/* {muscleInfo.relatedMuscles.map((muscle: string) => (
                          <li key={muscle} className="capitalize">
                            {muscle}
                          </li>
                        ))} */}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="training" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50">
                      Training Considerations
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-slate-300 mb-4">
                        When training the {muscleInfo.name}, consider the following:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300">
                            Train with a variety of exercises to target all parts of the muscle
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300">Include both compound and isolation exercises</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300">
                            Allow 48-72 hours of recovery between intense training sessions
                          </span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="injuries">
            <h2 className="text-2xl font-bold mb-6">Common Injuries & Prevention</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* {muscleInfo.commonInjuries.map((injury: any, index: number) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{injury.name}</h3>
                        <p className="text-slate-300 mb-4">{injury.description}</p>
                        <h4 className="font-medium text-emerald-400 mb-2">Prevention</h4>
                        <p className="text-slate-300">{injury.prevention}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Muscles Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Muscle Groups</h2>
            <Button className="border-slate-700">
              View All
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* {muscleInfo.relatedMuscles.map((muscle: string) => (
              <Link key={muscle} href={`/muscles/${muscle}`} passHref>
                <Card className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                      <Image src="/placeholder.svg?height=200&width=200" alt={muscle} fill className="object-cover" />
                    </div>
                    <h3 className="font-medium text-center capitalize">{muscle}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))} */}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MusclePage;