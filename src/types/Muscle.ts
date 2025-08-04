// import { StaticImageData } from "next/image";

export interface Muscle {
    id: number;          // Keep as-is
    n: string;           // name -> n
    img: string;         // Store image URL (not StaticImageData)
    desc: string;        // description -> desc
    anat: string;        // anatomy -> anat
    func: string;        // function -> func
    sn: string;          // shortName -> sn
    rel: string[];       // relatedMuscles -> rel
    ex: Exercise[];   // exercises -> ex (see below)
    inj: CommonInjury[]; // commonInjuries -> inj
    str: StretchingExercise[]; // stretchingExercises -> str
    freq: {              // frequency remains
        b: string;         // beginner -> b
        i: string;         // intermediate -> i
        a: string;         // advanced -> a
    };
}

export interface Exercise {
    img: string;          // image URL
    n: string;            // name
    diff: string;         // difficulty
    eq: string;           // equipment
    tgt: string;          // target
    desc: string;         // description
    s: number;            // sets
    r: number;            // reps
    tips: string;
    vid: string;          // videoLink
}

// New CommonInjury type
export interface CommonInjury {
    n: string;             // name
    desc: string;          // description
    prev: string;          // prevention
}

// New StretchingExercise type
export interface StretchingExercise {
    n: string;             // name
    desc: string;          // description
    dur: string;           // duration
}