import { Muscle } from "@/types/Muscle";
import raw from "./muscles.json";

/**
 * Reference data for all twelve muscle groups.
 *
 * This is the source of truth that gets pushed to Firestore by
 * `npm run seed:muscles` (see scripts/seedMuscles.mjs). The app reads from
 * Firestore first and only falls back to this file when the collection is
 * empty or unreachable, so keep the two in sync by re-running the seed after
 * editing muscles.json.
 */
export const musclesData = raw as Muscle[];

export const getLocalMuscleById = (id: string | number): Muscle | undefined => {
  const key = id.toString();
  return musclesData.find((m) => m.id.toString() === key);
};

export default musclesData;
