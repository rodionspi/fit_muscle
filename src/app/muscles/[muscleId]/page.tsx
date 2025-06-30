"use client";

import React, {useState, useEffect} from "react";
import musclesList from "@/components/musclesList";
import { useParams } from "next/navigation";
import { Button } from "@headlessui/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, Link, ArrowLeft, BicepsFlexed, Play, Dumbbell } from "lucide-react";
import Image from "next/image";
import Muscle from "@/types/Muscle";
import { PageWrapper } from "@/components/custom";
import Overview from "@/components/custom/TabsContent/MuscleReview/Overview";
import Exercises from "@/components/custom/TabsContent/MuscleReview/Exercises";
import Anatomy from "@/components/custom/TabsContent/MuscleReview/Anatomy";
import Injuries from "@/components/custom/TabsContent/MuscleReview/Injuries";

const MusclePage = () => {
  const { muscleId } = useParams(); // takes a parameter from the useParams hook
  const [muscleInfo, setMuscleInfo] = useState<Muscle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <PageWrapper>
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 relative">
              <div className="w-full h-auto relative">
                <Image
                  src={muscleInfo.src || "/placeholder.svg"}
                  alt={muscleInfo.name}
                  sizes="100vw"
                  className="object-contain h-100 rounded-xl overflow-hidden border-4 border-slate-600 shadow-xl"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-2">
                <BicepsFlexed className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{muscleInfo.name}</h1>
              <p className="text-xl text-slate-300 mb-6">{muscleInfo.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-sm text-slate-400 mb-1">Also Known As</h3>
                  <p className="font-medium">{muscleInfo.shortName}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-sm text-slate-400 mb-1">Related Muscles</h3>
                  <p className="font-medium capitalize">{muscleInfo.relatedMuscles.join(", ")}</p>
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
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-md p-2">
                  <Play className="w-4 h-4 mr-2" />
                  Start Workout
                </Button>
                <Button className="border-slate-600 p-2">
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
        <Tabs defaultValue="grid" className="mb-8">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="anatomy">Anatomy</TabsTrigger>
            <TabsTrigger value="injuries">Common Injuries</TabsTrigger>
          </TabsList>



          <TabsContent value="overview">
            <Overview muscleInfo={muscleInfo} />
          </TabsContent>

          <TabsContent value="exercises">
            <Exercises muscleInfo={muscleInfo} />
          </TabsContent>

          <TabsContent value="anatomy">
            <Anatomy muscleInfo={muscleInfo} />
          </TabsContent>

          <TabsContent value="injuries">
            <Injuries muscleInfo={muscleInfo} />
          </TabsContent>
        </Tabs>
      </main>
      </PageWrapper>
    </div>
  )
}

export default MusclePage;