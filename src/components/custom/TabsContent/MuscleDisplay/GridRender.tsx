import React, { useState } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link'
import { Muscle } from '@/types/Muscle';
import { Button } from "@/components/ui/button";
import { ChevronRight, BicepsFlexed } from "lucide-react";
import { getMuscleImageWithFallback } from '@/lib/muscleImageMapper';

const GridRender = ({ musclesList }: { musclesList: Muscle[] }) => {
  const [selectedMuscle, setSelectedMuscle] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {musclesList.map((muscle) => {
        return (
          <motion.div
          key={muscle.id}
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer group`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            setSelectedMuscle(muscle.id === selectedMuscle ? null : muscle.id)
          }
        >
          <div className="aspect-square p-4 flex flex-col items-center justify-center">
            <div className="relative w-full h-3/4 mb-4">
              {(() => {
                const imagePath = getMuscleImageWithFallback(muscle.id, muscle.img);
                return imagePath ? (
                  <Image
                    src={imagePath}
                    alt={muscle.n}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BicepsFlexed className="w-16 h-16 text-slate-500" />
                  </div>
                );
              })()}
            </div>
            <h3 className="text-lg font-semibold text-center">{muscle.n}</h3>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <Link href={`/muscles/${muscle.id}`}>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                // Prevent propagation so the parent click doesn't fire
              >
                View Details
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )})}
    </div>
  );
};

export default GridRender;
