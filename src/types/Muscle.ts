import { StaticImageData } from "next/image";


export interface Exercise {
    image: string;
    name: string;
    difficulty: string;
    equipment: string;
    target: string;
    description: string;
    sets: number;
    reps: number;
    tips: string;
    videoLink: string;
}

// New CommonInjury type
export interface CommonInjury {
    name: string;
    description: string;
    prevention: string;
}

// New StretchingExercise type
export interface StretchingExercise {
    name: string;
    description: string;
    duration: string;
}

export interface Muscle {
    id: number;
    name: string;
    src: StaticImageData;
    description: string;
    anatomy: string;
    function: string;
    shortName: string;
    relatedMuscles: string[];
    exercises: Exercise[];
    commonInjuries: CommonInjury[]; // New property
    stretchingExercises: StretchingExercise[]; // New property for stretch routines
    frequency: {
        beginner: string;
        intermediate: string;
        advanced: string;
    };
}