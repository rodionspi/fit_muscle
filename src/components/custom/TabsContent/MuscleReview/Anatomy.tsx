import React from "react";
import { Check, CircleDot, Crosshair } from "lucide-react";
import { Muscle } from "@/types/Muscle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AnatomyProps {
  muscleInfo: Muscle;
}

const DEFAULT_TRAINING_TIPS = [
  "Train with a variety of exercises to target all parts of the muscle",
  "Include both compound and isolation exercises",
  "Allow 48-72 hours of recovery between intense training sessions",
];

const Anatomy: React.FC<AnatomyProps> = ({ muscleInfo }) => {
  const tips = muscleInfo.train?.length ? muscleInfo.train : DEFAULT_TRAINING_TIPS;

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <article className="lg:col-span-3">
        <h2 className="text-2xl font-semibold">Structure</h2>
        <p className="prose-muscle mt-4">{muscleInfo.anat}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="panel relative overflow-hidden p-5">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                <CircleDot className="h-4 w-4" />
              </span>
              <h3 className="font-sans text-base font-semibold tracking-normal">Origin</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Attachment on the stationary bone</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{muscleInfo.org ?? "-"}</p>
          </div>

          <div className="panel relative overflow-hidden p-5">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sky-400/10 blur-2xl" />
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300">
                <Crosshair className="h-4 w-4" />
              </span>
              <h3 className="font-sans text-base font-semibold tracking-normal">Insertion</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Attachment on the moving bone</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{muscleInfo.ins ?? "-"}</p>
          </div>
        </div>
      </article>

      <aside className="lg:col-span-2">
        <h2 className="text-2xl font-semibold">In detail</h2>
        <Accordion type="single" collapsible defaultValue="function" className="panel mt-4 overflow-hidden">
          <AccordionItem value="function">
            <AccordionTrigger>Function &amp; movement</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">{muscleInfo.func}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="synergists">
            <AccordionTrigger>Synergist muscles</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                Muscles that work together with the {muscleInfo.n.toLowerCase()}:
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {muscleInfo.rel.map((muscle) => (
                  <li
                    key={muscle}
                    className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-sm capitalize text-foreground/85"
                  >
                    {muscle}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="training">
            <AccordionTrigger>Training considerations</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/85">{tip}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
    </div>
  );
};

export default Anatomy;
