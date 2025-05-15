import { StaticImageData } from "next/image";

interface MuscleLink {
    video: string;
    web: string;
}

interface Muscle {
    id: number;
    image: string;
    name: string;
    src: StaticImageData;
    links: MuscleLink;
}
 
export default Muscle