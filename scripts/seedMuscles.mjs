/**
 * Seeds Firestore with the reference muscle data in src/data/muscles.json.
 *
 *   npm run seed:muscles              # write muscles that are missing
 *   npm run seed:muscles -- --force   # overwrite every muscle, replacing subcollections
 *
 * Each muscle is written as a document in `muscles` (doc id = muscle id) holding
 * the full record, plus the three subcollections the app reads from:
 * `exercises`, `commonInjuries` and `stretching`.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const force = process.argv.includes("--force");

/** Reuse the app's public web config instead of keeping a second copy of it. */
function loadFirebaseConfig() {
  if (process.env.FIREBASE_CONFIG) {
    return JSON.parse(process.env.FIREBASE_CONFIG);
  }

  const source = readFileSync(resolve(projectRoot, "src/firebaseConfig.ts"), "utf8");
  const match = source.match(/const firebaseConfig = (\{[\s\S]*?\});/);
  if (!match) {
    throw new Error(
      "Could not read firebaseConfig from src/firebaseConfig.ts. Pass the config as the FIREBASE_CONFIG env var instead."
    );
  }

  const objectText = match[1]
    .replace(/^(\s*)([A-Za-z0-9_]+):/gm, '$1"$2":')
    .replace(/,(\s*})/g, "$1");
  return JSON.parse(objectText);
}

async function replaceSubcollection(muscleRef, name, entries) {
  const subCol = collection(muscleRef, name);

  const existing = await getDocs(subCol);
  await Promise.all(existing.docs.map((d) => deleteDoc(d.ref)));

  await Promise.all(
    entries.map((entry, index) =>
      setDoc(doc(subCol, `${index + 1}`), entry)
    )
  );

  return entries.length;
}

async function seed() {
  const muscles = JSON.parse(
    readFileSync(resolve(projectRoot, "src/data/muscles.json"), "utf8")
  );

  const app = initializeApp(loadFirebaseConfig());
  const db = getFirestore(app);

  console.log(
    `Seeding ${muscles.length} muscles${force ? " (overwriting existing documents)" : ""}...`
  );

  let written = 0;
  let skipped = 0;

  for (const muscle of muscles) {
    const muscleRef = doc(db, "muscles", muscle.id.toString());

    if (!force) {
      const snap = await getDoc(muscleRef);
      if (snap.exists()) {
        console.log(`  - ${muscle.n} (${muscle.id}): already exists, skipping. Use --force to overwrite.`);
        skipped += 1;
        continue;
      }
    }

    await setDoc(muscleRef, muscle);
    const ex = await replaceSubcollection(muscleRef, "exercises", muscle.ex);
    const inj = await replaceSubcollection(muscleRef, "commonInjuries", muscle.inj);
    const str = await replaceSubcollection(muscleRef, "stretching", muscle.str);

    console.log(`  - ${muscle.n} (${muscle.id}): ${ex} exercises, ${inj} injuries, ${str} stretches`);
    written += 1;
  }

  console.log(`\nDone. ${written} muscle(s) written, ${skipped} skipped.`);
  if (written > 0) {
    console.log("Clear the browser's localStorage 'muscles' key (or wait 24h) to see the new data.");
  }
  process.exit(0);
}

seed().catch((error) => {
  console.error("\nSeeding failed:", error?.message ?? error);
  if (error?.code === "permission-denied") {
    console.error(
      "Firestore rejected the write. Allow writes to the `muscles` collection in your Firestore security rules, or run this from an authenticated context."
    );
  }
  process.exit(1);
});
