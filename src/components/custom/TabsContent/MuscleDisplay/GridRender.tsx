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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {musclesList.map((muscle) => {
        const imagePath = getMuscleImageWithFallback(muscle.id, muscle.img);
        return (
          <motion.div
            key={muscle.id}
            className="relative rounded-2xl bg-zinc-900 border border-white/[0.06] overflow-hidden cursor-pointer group shadow-xl"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() =>
              setSelectedMuscle(muscle.id === selectedMuscle ? null : muscle.id)
            }
          >
            {/* Image area */}
            <div className="relative w-full aspect-square bg-zinc-800/60">
              {imagePath ? (
                <Image
                  src={imagePath}
                  alt={muscle.n}
                  fill
                  className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <BicepsFlexed className="w-16 h-16 text-zinc-600" />
                </div>
              )}

              {/* Subtle top highlight*/}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-zinc-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center">
                <Link href={`/muscles/${muscle.id}`} onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    className="bg-white text-zinc-900 hover:bg-zinc-100 font-semibold shadow-lg px-5 rounded-xl"
                  >
                    View Details
                    <ChevronRight size={15} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Title bar */}
            <div className="px-4 py-3 border-t border-white/[0.05]">
              <p className="text-sm font-semibold text-zinc-100 text-center tracking-wide truncate">
                {muscle.n}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GridRender;
