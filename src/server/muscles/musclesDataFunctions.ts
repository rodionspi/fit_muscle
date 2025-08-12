import { db } from "../../../firebaseConfig.js";
import {
  collection,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { Exercise, Muscle, CommonInjury, StretchingExercise } from "../../types/Muscle";

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

// Per-muscle exercises cache (client-side only, 24h TTL)
const getCachedExercises = (muscleId: string): Exercise[] | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const key = `muscle_exercises_${muscleId}`;
  const cached = window.localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 86400000) {
      return data as Exercise[];
    }
  } catch {
    // ignore parse errors
  }
  return null;
};

const setCachedExercises = (muscleId: string, exercises: Exercise[]) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const key = `muscle_exercises_${muscleId}`;
  try {
    window.localStorage.setItem(key, JSON.stringify({ data: exercises, timestamp: Date.now() }));
  } catch {
    // ignore quota errors
  }
};

// Per-muscle common injuries cache (client-side only, 24h TTL)
const getCachedInjuries = (muscleId: string): CommonInjury[] | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const key = `muscle_injuries_${muscleId}`;
  const cached = window.localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 86400000) {
      return data as CommonInjury[];
    }
  } catch {}
  return null;
};

const setCachedInjuries = (muscleId: string, injuries: CommonInjury[]) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const key = `muscle_injuries_${muscleId}`;
  try {
    window.localStorage.setItem(key, JSON.stringify({ data: injuries, timestamp: Date.now() }));
  } catch {}
};

// Per-muscle stretching cache (client-side only, 24h TTL)
const getCachedStretching = (muscleId: string): StretchingExercise[] | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const key = `muscle_stretching_${muscleId}`;
  const cached = window.localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 86400000) {
      return data as StretchingExercise[];
    }
  } catch {}
  return null;
};

const setCachedStretching = (muscleId: string, stretches: StretchingExercise[]) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const key = `muscle_stretching_${muscleId}`;
  try {
    window.localStorage.setItem(key, JSON.stringify({ data: stretches, timestamp: Date.now() }));
  } catch {}
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
  console.log("Fetched muscles from Firestore", data);
  return data;
};

export const getMuscleExercisesById = async (muscleId: string): Promise<Exercise[]> => {
  // 0) Per-muscle cached exercises
  const cachedExercises = getCachedExercises(muscleId);
  if (cachedExercises) return cachedExercises;

  // 1) Try to use cached full muscle data if available
  const cached = getCachedMuscles() as Muscle[] | null;
  if (cached) {
    const found = cached.find((m) => m.id.toString() === muscleId);
    if (found?.ex?.length) {
      setCachedExercises(muscleId, found.ex as Exercise[]);
      return found.ex as Exercise[];
    }
  }

  // 2) Fallback: read subcollection from Firestore
  const exCol = collection(db, "muscles", muscleId, "exercises");
  const exSnap = await getDocs(exCol);
  const exercises: Exercise[] = exSnap.docs.map((d) => d.data() as Exercise);
  setCachedExercises(muscleId, exercises);
  return exercises;
};

export const getCommonInjuriesOfMuscle = async (muscleId: string): Promise<CommonInjury[]> => {
  // 0) per-muscle cached
  const cachedInj = getCachedInjuries(muscleId);
  if (cachedInj) return cachedInj;

  // 1) from cached full muscle data
  const cached = getCachedMuscles() as Muscle[] | null;
  if (cached) {
    const found = cached.find((m) => m.id.toString() === muscleId);
    if (found?.inj?.length) {
      setCachedInjuries(muscleId, found.inj as CommonInjury[]);
      return found.inj as CommonInjury[];
    }
  }

  // 2) Firestore subcollection
  const injCol = collection(db, "muscles", muscleId, "commonInjuries");
  const injSnap = await getDocs(injCol);
  const injuries: CommonInjury[] = injSnap.docs.map((d) => d.data() as CommonInjury);
  setCachedInjuries(muscleId, injuries);
  return injuries;
};

export const getStretchingExOfMuscle = async (muscleId: string): Promise<StretchingExercise[]> => {
  // 0) per-muscle cached
  const cachedStr = getCachedStretching(muscleId);
  if (cachedStr) return cachedStr;

  // 1) from cached full muscle data
  const cached = getCachedMuscles() as Muscle[] | null;
  if (cached) {
    const found = cached.find((m) => m.id.toString() === muscleId);
    if (found?.str?.length) {
      setCachedStretching(muscleId, found.str as StretchingExercise[]);
      return found.str as StretchingExercise[];
    }
  }

  // 2) Firestore subcollection (named "stretching")
  const strCol = collection(db, "muscles", muscleId, "stretching");
  const strSnap = await getDocs(strCol);
  const stretches: StretchingExercise[] = strSnap.docs.map((d) => d.data() as StretchingExercise);
  setCachedStretching(muscleId, stretches);
  return stretches;
};

// alias for common misspelling
export const getStrechingExOfMuscle = getStretchingExOfMuscle;

/**
 * Fetch list of muscle names (id and name) from 'muscleNames' collection
 */
// export const getMuscleNames = async (): Promise<{ id: string; n: string }[]> => {
//   const namesCol = collection(db, "muscleNames");
//   const snapshot = await getDocs(namesCol);
//   return snapshot.docs.map(d => ({ id: d.id, n: d.data().n as string }));
// };

/**
 * Fetch full muscle data by id from 'muscles' collection
 */
export const getMuscleById = async (muscleId: string): Promise<Muscle | null> => {
  const ref = doc(db, "muscles", muscleId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data() as Muscle;
  }
  return null;
};

// export const getMuscleWithExercises = async (
//   muscleId: string
// ): Promise<unknown | null> => {
//   const exCol = collection(db, "muscles", muscleId, "exercises");
//   const exSnap = await getDocs(exCol);
//   const exercises = exSnap.docs.map(d => ({ id: d.id, ...d.data() }));

//   // 3) merge and return
//   return { exercises };
// };
