import { Card, CardContent } from '@/components/ui/card';
import { getCommonInjuriesOfMuscle } from '@/server/muscles/musclesDataFunctions';
import { CommonInjury } from '@/types/Muscle';
import { AlertTriangle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface InjuriesProps {
  muscleId: string | undefined;
}

const Injuries: React.FC<InjuriesProps> = ({ muscleId }) => {
  const [commonInjuries, setCommonInjuries] = useState<CommonInjury[]>([]);

  useEffect(() => {
       const fetchCommonInjuries = async () => {
         if (!muscleId) return;

         getCommonInjuriesOfMuscle(muscleId)
           .then((data) => {
             return setCommonInjuries(data ?? []);
           })
           .catch((err) => {
             console.error(err);
             setCommonInjuries([]);
           });
       };
       fetchCommonInjuries();
     }, []);

  return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Common Injuries & Prevention</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {commonInjuries.map((injury: CommonInjury, index: number) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-200">{injury.n}</h3>
                        <p className="text-slate-300 mb-4">{injury.desc}</p>
                        <h4 className="font-medium text-emerald-400 mb-2">Prevention</h4>
                        <p className="text-slate-300">{injury.prev}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
    )
}

export default Injuries;