import { StaticImageData } from "next/image";

interface MuscleLink {
    video: string;
    web: string;
}

// New Exercise type
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
}

interface Muscle {
    id: number;
    name: string;
    src: StaticImageData;
    links: MuscleLink;
    description: string;
    anatomy: string;
    function: string;
    shortName: string;
    relatedMuscles: string[];
    exercises: Exercise[]; // New property
}
 
export default Muscle