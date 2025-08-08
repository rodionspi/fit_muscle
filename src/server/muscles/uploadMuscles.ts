// uploadMuscles.ts
// import { db } from "../../firebaseConfig.js" // Your Firebase config file
// import { doc, setDoc, collection, addDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { Muscle } from "../../types/Muscle.js";
// import musclesList from "../../components/musclesList.js";

// // Initialize Firebase Storage
// const storage = getStorage();

// // Function to upload images/videos and return their URLs
// async function uploadImage(filePath: string): Promise<string> {
//   try {
//     // Convert StaticImageData to Blob (example for Next.js)
//     const response = await fetch(filePath);
//     const blob = await response.blob();

//     // Upload to Firebase Storage
//     const storageRef = ref(storage, `images/${Date.now()}.jpg`);
//     await uploadBytes(storageRef, blob);

//     // Get the public URL
//     return await getDownloadURL(storageRef);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return ""; // Fallback
//   }
// }

// // Main function to upload a Muscle object
// async function uploadMuscle(muscle: Muscle) {
//   try {
    // 1. Upload muscle metadata (top-level fields)
    // await setDoc(doc(db, "muscles", muscle.id.toString()), {
    //   n: muscle.n,          // Shortened field names
    //   desc: muscle.desc,
    //   anat: muscle.anat,
    //   func: muscle.func,
    //   sn: muscle.sn,
    //   rel: muscle.rel,
    //   freq: muscle.freq,
    // });

    // 2. Upload exercises as a subcollection
//     const exRef = collection(db, "muscles", muscle.id.toString(), "strechingExercises");
//     for (const ex of muscle.str) {
//       await addDoc(exRef, {
//         n: ex.n,
//         desc: ex.desc,
//         dur: ex.dur,
//       });
//     }

//     console.log(`Successfully uploaded muscle ${muscle.id}: ${muscle.n}`);
//   } catch (error) {
//     console.error(`Error uploading muscle ${muscle.id}:`, error);
//   }
// }

// for (const muscle of musclesList) {
//     uploadMuscle(muscle);
// }

// Or upload an array of muscles
// const allMuscles: Muscle[] = [...];
// allMuscles.forEach(muscle => uploadMuscle(muscle));