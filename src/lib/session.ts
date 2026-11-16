import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

/**
 * Forgets the stored profile and ends the Firebase session.
 *
 * The app keys "logged in" on localStorage, so clearing it is what logs out;
 * signing out of Firebase as well keeps the two in step for the next sign-in.
 */
export const endSession = async (): Promise<void> => {
  try {
    localStorage.clear();
  } catch {
    // Storage unavailable (private mode, blocked) - nothing to forget.
  }
  await signOut(auth).catch(() => undefined);
};
