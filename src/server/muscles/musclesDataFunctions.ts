import { db } from "../../../firebaseConfig.js";
import {
  collection,
  getDocs
} from "firebase/firestore";

// Check if cached data exists and is fresh (e.g., <24 hours old)
// Check if cached data exists and is fresh (client-side only)
const getCachedMuscles = () => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const cached = window.localStorage.getItem("muscles");
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 86400000) { // 24h cache
      return data;
    }
  }
  return null;
};

// Fetch from Firestore if no valid cache exists
export const getMuscles = async () => {
  const cached = getCachedMuscles();
  if (cached) return cached;

  const musclesCol = collection(db, "muscles");
  const snapshot = await getDocs(musclesCol);
  const data = snapshot.docs.map(doc => doc.data());

  // Cache with timestamp (client-side only)
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(
      "muscles",
      JSON.stringify({ data, timestamp: Date.now() })
    );
  }

  return data;
};

export const getMuscleWithExercises = async (
  muscleId: string
): Promise<unknown | null> => {
  const exCol = collection(db, "muscles", muscleId, "exercises");
  const exSnap = await getDocs(exCol);
  const exercises = exSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  // 3) merge and return
  return { exercises };
};
