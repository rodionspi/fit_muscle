import { Card, CardContent } from "@/components/ui/card";
import { Muscle } from "@/types/Muscle";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AnatomyProps {
  muscleInfo: Muscle;
}

const Anatomy: React.FC<AnatomyProps> = ({ muscleInfo }) => {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Muscle Anatomy</h2>
                <div className="w-full h-auto relative">
                    <Image
                        src={muscleInfo.img || "/placeholder.svg"}
                        alt={muscleInfo.n}
                        sizes="100vw"
                        className="object-contain h-100 rounded-xl overflow-hidden border-4 border-slate-600 shadow-xl"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold mb-2 text-slate-300">Origin</h3>
                            <p className="text-sm text-slate-300">
                                The point where the muscle attaches to the stationary bone.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold mb-2 text-slate-300">Insertion</h3>
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
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50 w-full">Muscle Structure</AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                            <p className="text-slate-300 mb-4">{muscleInfo.anat}</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="function" className="border-b border-slate-700">
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50 w-full">Function & Movement</AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                            <p className="text-slate-300 mb-4">{muscleInfo.func}</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="synergists" className="border-b border-slate-700">
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50 w-full">Synergist Muscles</AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                            <p className="text-slate-300 mb-4">
                            Synergist muscles that work with the {muscleInfo.n} include:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {muscleInfo.rel.map((muscle: string) => {
                                console.log(muscle);
                                return (
                                <li key={muscle} className="capitalize">
                                {muscle}
                                </li>
                            )})}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="training" className="border-b-0">
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50 w-full">
                            Training Considerations
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                            <p className="text-slate-300 mb-4">
                            When training the {muscleInfo.n}, consider the following:
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
    )
}

export default Anatomy;