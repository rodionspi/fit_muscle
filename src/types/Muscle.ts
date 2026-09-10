// import { StaticImageData } from "next/image";

export interface Muscle {
    id: number;          // Keep as-is
    n: string;           // name -> n
    img: string;         // Store image URL (not StaticImageData)
    desc: string;        // description -> desc
    anat: string;        // anatomy -> anat
    func: string;        // function -> func
    sn: string;          // shortName -> sn
    org?: string;        // origin (attachment on the stationary bone)
    ins?: string;        // insertion (attachment on the moving bone)
    lvl?: number;        // training difficulty, 1-5
    train?: string[];    // trainingConsiderations -> train
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

/**
 * Normalised equipment setups. `eq` stays free text for display; `eqTag` is what
 * you filter on. A muscle's exercises are ordered main-lift-first, so taking the
 * first matches is a sensible default - keep that order when editing muscles.json.
 */
export type EquipmentTag =
    | "barbell"
    | "dumbbell"     // includes kettlebells
    | "cable"
    | "machine"
    | "bar"          // pull-up bar, parallel bars
    | "bodyweight"
    | "band"
    | "wheel";       // ab wheel

export interface Exercise {
    img: string;          // image URL
    n: string;            // name
    diff: string;         // difficulty
    eq: string;           // equipment, human readable
    eqTag?: EquipmentTag[]; // any one of these setups is enough to perform it
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