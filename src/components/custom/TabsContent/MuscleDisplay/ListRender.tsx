import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Muscle } from "@/types/Muscle";
import React from "react";
import Link from "next/link";
import { getMuscleImageWithFallback } from '@/lib/muscleImageMapper';
import { BicepsFlexed } from "lucide-react";

const ListRender = ({ musclesList }: { musclesList: Muscle[] }) => {
    return (
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
                            {(() => {
                              const imagePath = getMuscleImageWithFallback(muscle.id, muscle.img);
                              return imagePath ? (
                                <Image
                                  src={imagePath}
                                  alt={muscle.n}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <BicepsFlexed className="w-5 h-5 text-slate-500" />
                                </div>
                              );
                            })()}
                          </div>
                          <span className="font-medium">{muscle.n}</span>
                        </td>
                        <td className="p-4 text-slate-300 hidden md:table-cell">Movement and stability</td>
                        <td className="p-4 text-slate-300 hidden lg:table-cell">Bench press, Flyes, Push-ups</td>
                        <td className="p-4">
                          <Link href={`/muscles/${muscle.id}`} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    )
}

export default ListRender;