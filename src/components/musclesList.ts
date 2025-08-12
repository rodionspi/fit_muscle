// import traps from "../../public/images/for_muscles_chart/traps.png";
// import triceps from "../../public/images/for_muscles_chart/triceps.png";
// import sholders from "../../public/images/for_muscles_chart/sholders.png";
// import grip from "../../public/images/for_muscles_chart/grip.png";
// import back from "../../public/images/for_muscles_chart/back_muscles.png";
// import chest from "../../public/images/for_muscles_chart/chest.png";
// import biceps from "../../public/images/for_muscles_chart/biceps.png";
// import abs from "../../public/images/for_muscles_chart/abs.png";
// import glutes from "../../public/images/for_muscles_chart/glutes.png";
// import hamstrings from "../../public/images/for_muscles_chart/hamstrings.png";
// import quads from "../../public/images/for_muscles_chart/quads.png";
// import calf_muscles from "../../public/images/for_muscles_chart/calf_muscles.png";
import { getMuscles } from "../server/muscles/musclesDataFunctions";
import { Muscle } from "@/types/Muscle";

// resolve the promise into a plain array
const musclesList: Muscle[] = await getMuscles();

export default musclesList;