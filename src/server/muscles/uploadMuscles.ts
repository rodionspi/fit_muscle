// uploadMuscles.ts
import { db } from "../../../firebaseConfig.js"; // Firebase config
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Muscle } from "../../types/Muscle";
import musclesList from "./muscleList.js"; // source with exercises arrays


// Upload only stretching subcollection for an existing muscle document.
export async function uploadCommonInjuriesForMuscle(muscleId: string, { overwrite = false } = {}) {
    try {
        const strColPath = collection(db, "muscles", muscleId, "commonInjuries");

        // Skip if already populated and not overwriting
        if (!overwrite) {
            const existing = await getDocs(strColPath);
            if (!existing.empty) {
                console.log(`commonInjuries already exists for muscle ${muscleId}, skipping (use overwrite=true to force).`);
                return;
            }
        }

        const muscle = musclesList.find(m => m.id.toString() === muscleId);
        if (!muscle?.inj?.length) {
            console.log(`No commonInjuries exercises to upload for muscle ${muscleId}`);
            return;
        }

        for (const st of muscle.inj) {
            await addDoc(strColPath, {
                n: st.n,
                desc: st.desc,
                prev: st.prev,
            });
        }
        console.log(`Uploaded ${muscle.inj.length} commonInjuries entries for muscle ${muscleId}`);
    } catch (e) {
        console.error(`Failed uploading commonInjuries for muscle ${muscleId}:`, e);
    }
}

// Bulk helper for commonInjuries
export async function uploadAllCommonInjuries(list: Muscle[] = musclesList, opts: { overwrite?: boolean } = {}) {
    for (const m of list) {
        await uploadCommonInjuriesForMuscle(m.id.toString(), opts);
    }
    console.log("Finished uploading commonInjuries for all muscles");
}

uploadAllCommonInjuries();