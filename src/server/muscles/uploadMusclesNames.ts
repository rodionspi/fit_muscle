import { db } from "../../../firebaseConfig.js" // Your Firebase config file
import { doc, setDoc } from "firebase/firestore";
import { Muscle } from "@/types/Muscle";
import musclesList from "../../components/musclesList.js";

async function uploadMusclesNames(muscle: Muscle) {
  try {
    await setDoc(doc(db, "musclesNames", muscle.id.toString()), {n: muscle.n});
    console.log(`Successfully uploaded muscle ${muscle.id}: ${muscle.n}`);
  } catch (error) {
    console.error(`Error uploading muscle ${muscle.id}:`, error);
  }
}

for (const muscle of musclesList) {
    uploadMusclesNames(muscle)
}