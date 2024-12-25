import { StaticImageData } from "next/image";

interface MuscleLink {
    video: string;
    web: string;
}

interface Muscle {
    name: string;
    src: StaticImageData;
    links: MuscleLink;
}
 
export default Muscle