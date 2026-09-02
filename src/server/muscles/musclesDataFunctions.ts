import { db } from "@/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { Exercise, Muscle, CommonInjury, StretchingExercise } from "../../types/Muscle";
import { musclesData, getLocalMuscleById } from "@/data/musclesData";

// Bump this whenever the shape or content of the reference data changes, so
// browsers holding an older cached copy fetch again instead of serving it.
const CACHE_VERSION = "v2";

/**
 * A Firestore muscle document is considered outdated if it predates the
 * reference dataset in src/data/muscles.json - the giveaway is that it carries
 * no origin/insertion. Those documents are replaced by the bundled data until
 * Firestore is re-seeded (npm run seed:muscles -- --force), after which the
 * check passes and Firestore becomes the source of truth again.
 */
const isOutdated = (muscle: Muscle | undefined | null): boolean => !muscle?.org;

const mergeWithReferenceData = (remote: Muscle[]): Muscle[] => {
  const merged = musclesData.map((local) => {
    const match = remote.find((m) => m.id?.toString() === local.id.toString());
    return isOutdated(match) ? local : (match as Muscle);
  });

  // Keep any muscle that only exists in Firestore
  const extra = remote.filter(
    (m) => !musclesData.some((local) => local.id.toString() === m.id?.toString())
  );

  return [...merged, ...extra];
};

// Check if cached data exists and is fresh (e.g., <24 hours old)
// Check if cached data exists and is fresh (client-side only)
const getCachedMuscles = () => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const cached = window.localStorage.getItem(`muscles_${CACHE_VERSION}`);
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
  const key = `muscle_exercises_${CACHE_VERSION}_${muscleId}`;
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
  const key = `muscle_exercises_${CACHE_VERSION}_${muscleId}`;
  try {
    window.localStorage.setItem(key, JSON.stringify({ data: exercises, timestamp: Date.now() }));
  } catch {
    // ignore quota errors
  }
};

// Per-muscle common injuries cache (client-side only, 24h TTL)
const getCachedInjuries = (muscleId: string): CommonInjury[] | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const key = `muscle_injuries_${CACHE_VERSION}_${muscleId}`;
  const cached = window.localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 86400000) {
      return data as CommonInjury[];
    }
  } catch (error) {
    console.error("Failed to parse cached injuries:", error);
  }
  return null;
};

const setCachedInjuries = (muscleId: string, injuries: CommonInjury[]) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const key = `muscle_injuries_${CACHE_VERSION}_${muscleId}`;
  try {
    window.localStorage.setItem(key, JSON.stringify({ data: injuries, timestamp: Date.now() }));
  } catch (error) {
    console.error("Failed to set cached injuries:", error);
  }
};

// Per-muscle stretching cache (client-side only, 24h TTL)
const getCachedStretching = (muscleId: string): StretchingExercise[] | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const key = `muscle_stretching_${CACHE_VERSION}_${muscleId}`;
  const cached = window.localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 86400000) {
      return data as StretchingExercise[];
    }
  } catch (error) {
    console.error("Failed to parse cached stretching:", error);
  }
  return null;
};

const setCachedStretching = (muscleId: string, stretches: StretchingExercise[]) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const key = `muscle_stretching_${CACHE_VERSION}_${muscleId}`;
  try {
    window.localStorage.setItem(key, JSON.stringify({ data: stretches, timestamp: Date.now() }));
  } catch (error) {
    console.error("Failed to set cached stretching:", error);
  }
};

// Fetch from Firestore if no valid cache exists, then fill in any muscle whose
// Firestore document still predates the reference dataset.
export const getMuscles = async (): Promise<Muscle[]> => {
  const cached = getCachedMuscles();
  if (cached?.length) return cached;

  let remote: Muscle[] = [];
  try {
    const musclesCol = collection(db, "muscles");
    const snapshot = await getDocs(musclesCol);
    remote = snapshot.docs.map(doc => doc.data() as Muscle);
  } catch (error) {
    console.error("Failed to fetch muscles from Firestore:", error);
  }

  // Firestore is empty or unreachable - serve the bundled reference data
  if (!remote.length) return musclesData;

  const data = mergeWithReferenceData(remote);

  // Cache with timestamp (client-side only)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(
        `muscles_${CACHE_VERSION}`,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (error) {
      console.error("Failed to cache muscles:", error);
    }
  }
  return data;
};

export const getMuscleExercisesById = async (muscleId: string): Promise<Exercise[]> => {
  // 0) Per-muscle cached exercises
  const cachedExercises = getCachedExercises(muscleId);
  if (cachedExercises) return cachedExercises;

  // 1) The merged muscle list already carries the reference exercises
  const muscles = await getMuscles();
  const found = muscles.find((m) => m.id?.toString() === muscleId);
  if (found?.ex?.length) {
    setCachedExercises(muscleId, found.ex);
    return found.ex;
  }

  // 2) Fallback: read subcollection from Firestore
  let exercises: Exercise[] = [];
  try {
    const exCol = collection(db, "muscles", muscleId, "exercises");
    const exSnap = await getDocs(exCol);
    exercises = exSnap.docs.map((d) => d.data() as Exercise);
  } catch (error) {
    console.error("Failed to fetch exercises from Firestore:", error);
  }

  // 3) Last resort: bundled reference data
  if (!exercises.length) return getLocalMuscleById(muscleId)?.ex ?? [];

  setCachedExercises(muscleId, exercises);
  return exercises;
};

export const getCommonInjuriesOfMuscle = async (muscleId: string): Promise<CommonInjury[]> => {
  // 0) per-Muscle cached
  const cachedInj = getCachedInjuries(muscleId);
  if (cachedInj) return cachedInj;

  // 1) The merged muscle list already carries the reference injuries
  const muscles = await getMuscles();
  const found = muscles.find((m) => m.id?.toString() === muscleId);
  if (found?.inj?.length) {
    setCachedInjuries(muscleId, found.inj);
    return found.inj;
  }

  // 2) Firestore subcollection
  let injuries: CommonInjury[] = [];
  try {
    const injCol = collection(db, "muscles", muscleId, "commonInjuries");
    const injSnap = await getDocs(injCol);
    injuries = injSnap.docs.map((d) => d.data() as CommonInjury);
  } catch (error) {
    console.error("Failed to fetch common injuries from Firestore:", error);
  }

  // 3) Last resort: bundled reference data
  if (!injuries.length) return getLocalMuscleById(muscleId)?.inj ?? [];

  setCachedInjuries(muscleId, injuries);
  return injuries;
};

export const getStretchingExOfMuscle = async (muscleId: string): Promise<StretchingExercise[]> => {
  // 0) per-muscle cached
  const cachedStr = getCachedStretching(muscleId);
  if (cachedStr) return cachedStr;

  // 1) The merged muscle list already carries the reference stretches
  const muscles = await getMuscles();
  const found = muscles.find((m) => m.id?.toString() === muscleId);
  if (found?.str?.length) {
    setCachedStretching(muscleId, found.str);
    return found.str;
  }

  // 2) Firestore subcollection (named "stretching")
  let stretches: StretchingExercise[] = [];
  try {
    const strCol = collection(db, "muscles", muscleId, "stretching");
    const strSnap = await getDocs(strCol);
    stretches = strSnap.docs.map((d) => d.data() as StretchingExercise);
  } catch (error) {
    console.error("Failed to fetch stretching exercises from Firestore:", error);
  }

  // 3) Last resort: bundled reference data
  if (!stretches.length) return getLocalMuscleById(muscleId)?.str ?? [];

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
  try {
    const ref = doc(db, "muscles", muscleId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const remote = snap.data() as Muscle;
      if (!isOutdated(remote)) return remote;
    }
  } catch (error) {
    console.error("Failed to fetch muscle from Firestore:", error);
  }
  return getLocalMuscleById(muscleId) ?? null;
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
