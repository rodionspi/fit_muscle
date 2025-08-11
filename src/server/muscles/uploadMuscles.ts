// // uploadMuscles.ts
// import { db } from "../../../firebaseConfig.js"; // Firebase config
// import { doc, collection, addDoc, getDocs } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { Muscle } from "../../types/Muscle";
// import musclesList from "./muscleList"; // source with exercises arrays

// // // Initialize Firebase Storage (optional for images/videos)
// // const storage = getStorage();

// // // Helper to maybe upload a local/static asset to storage and return a URL (placeholder implementation)
// // async function maybeUploadAsset(localPath?: string): Promise<string | undefined> {
// //     if (!localPath) return undefined;
// //     try {
// //         const res = await fetch(localPath);
// //         const blob = await res.blob();
// //         const storageRef = ref(storage, `muscles/${Date.now()}-${Math.random().toString(36).slice(2)}.bin`);
// //         await uploadBytes(storageRef, blob);
// //         return await getDownloadURL(storageRef);
// //     } catch (e) {
// //         console.warn("Asset upload failed, fallback to original path", e);
// //         return localPath; // fallback
// //     }
// // }

// // Upload only exercises subcollection for an existing muscle document.
// export async function uploadExercisesForMuscle(muscleId: string, { overwrite = false } = {}) {
//     try {
//         const exColPath = collection(db, "muscles", muscleId, "exercises");

//         // Skip if already populated and not overwriting
//         if (!overwrite) {
//             const existing = await getDocs(exColPath);
//             if (!existing.empty) {
//                 console.log(`Exercises already exist for muscle ${muscleId}, skipping (use overwrite=true to force).`);
//                 return;
//             }
//         }

//         for (const ex of musclesList.find(m => m.id.toString() === muscleId)?.ex || []) {
//             await addDoc(exColPath, {
//                 n: ex.n,
//                 diff: ex.diff,
//                 eq: ex.eq,
//                 tgt: ex.tgt,
//                 desc: ex.desc,
//                 s: ex.s,
//                 r: ex.r,
//                 tips: ex.tips,
//                 vid: ex.vid,
//                 img: ex.img || null
//             });
//         }
//         console.log(`Uploaded ${musclesList.find(m => m.id.toString() === muscleId)?.ex.length || 0} exercises for muscle ${muscleId}`);
//     } catch (e) {
//         console.error(`Failed uploading exercises for muscle ${muscleId}:`, e);
//     }
// }

// // Bulk helper
// export async function uploadAllExercises(list: Muscle[] = musclesList, opts: { overwrite?: boolean } = {}) {
//     for (const m of list) {
//         await uploadExercisesForMuscle(m.id.toString(), opts);
//     }
//     console.log("Finished uploading exercises for all muscles");
// }

// uploadAllExercises();

// // If you want to trigger immediately when this script runs (Node context):
// // (async () => { await uploadAllMuscles(); })();

// // Or upload an array of muscles
// // const allMuscles: Muscle[] = [...];
// // allMuscles.forEach(muscle => uploadMuscle(muscle));