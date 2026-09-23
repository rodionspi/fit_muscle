import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";
import User from "@/types/User";

/** A profile that is already stored, so its id - the Firebase Auth uid - is guaranteed. */
export type StoredUser = User & { id: string };

/**
 * Profiles live under their Firebase Auth uid at users/{uid}. That is what lets the Firestore
 * rules compare request.auth.uid against the document, and it makes creating one idempotent:
 * signing in twice can no longer produce a second profile for the same person.
 *
 * Nothing in here swallows errors. A failed read must never look like "no such user" - that is
 * exactly what made the old code create duplicates instead of reporting the real problem.
 */
export const getUserById = async (uid: string): Promise<StoredUser | null> => {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? { ...(snapshot.data() as User), id: uid } : null;
};

/** Returns the stored profile, creating it the first time someone signs in. */
export const ensureUserDocument = async (
  authUser: FirebaseUser,
  preferredName?: string,
): Promise<StoredUser> => {
  const existing = await getUserById(authUser.uid);
  if (existing) return existing;

  const profile: StoredUser = {
    id: authUser.uid,
    name:
      preferredName?.trim() ||
      authUser.displayName ||
      authUser.email?.split("@")[0] ||
      "Athlete",
    // Firestore rejects undefined, so the field is only written when there is a value
    ...(authUser.email ? { email: authUser.email } : {}),
  };

  await setDoc(doc(db, "users", authUser.uid), profile);
  return profile;
};
