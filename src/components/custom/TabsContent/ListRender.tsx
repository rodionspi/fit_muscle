import Image from "next/image";
import { Button } from "@/components/ui/button";
import Muscle from "@/types/Muscle";
import React from "react";

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
                            <Image
                              src={muscle.src || "/placeholder.svg"}
                              alt={muscle.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{muscle.name}</span>
                        </td>
                        <td className="p-4 text-slate-300 hidden md:table-cell">Movement and stability</td>
                        <td className="p-4 text-slate-300 hidden lg:table-cell">Bench press, Flyes, Push-ups</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    )
}

export default ListRender;