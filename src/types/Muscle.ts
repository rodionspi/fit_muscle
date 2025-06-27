import { StaticImageData } from "next/image";

interface MuscleLink {
    video: string;
    web: string;
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
}
 
export default Muscle