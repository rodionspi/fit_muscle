import { auth, provider } from "@/firebaseConfig";
import { getAdditionalUserInfo, signInWithPopup, signOut, type Auth } from "firebase/auth";
import { ensureUserDocument, type StoredUser } from "@/server/user/userDataFunctions";

/**
 * Loads Firebase's hidden sign-in iframe before anyone clicks.
 *
 * signInWithPopup loads that iframe on its first call and only opens the window afterwards. On a
 * slow connection that takes long enough for the browser to stop treating the window as a reply
 * to the click, so it blocks it - the "allow pop-ups" error that only ever appeared on the first
 * attempt and never on the second. With the iframe already there, the click opens the window
 * straight away.
 *
 * Firebase only does this by itself on Safari and mobile browsers, and exposes no public switch
 * for it, so this reaches the same internal call. If that ever disappears, nothing breaks - the
 * first click is just slow again.
 */
export const warmUpGoogleSignIn = async (): Promise<void> => {
  try {
    await auth.authStateReady();
    const resolver = (auth as Auth & {
      _popupRedirectResolver?: { _initialize(auth: Auth): Promise<unknown> };
    })._popupRedirectResolver;
    await resolver?._initialize(auth);
  } catch (error) {
    // A failed warm-up is retried by signInWithPopup itself on click.
    console.warn("Could not preload Google sign-in:", error);
  }
};

export type GoogleSignInOutcome =
  | { status: "signed-in"; profile: StoredUser }
  /** "Login" with a Google account that was never registered here. */
  | { status: "no-account" }
  /** "Register" with a Google account that already has a profile here. */
  | { status: "already-registered" };

/**
 * One popup for both buttons; `intent` decides what an unexpected account means.
 *
 * Google has no separate sign-up step - signing in creates the Firebase account the first time.
 * So "Login" with an unknown account would silently register it, and "Register" with a known one
 * would silently log in. Both are turned into an answer the page can explain instead.
 */
export const continueWithGoogle = async (
  intent: "login" | "register",
): Promise<GoogleSignInOutcome> => {
  const result = await signInWithPopup(auth, provider);
  const isNewUser = getAdditionalUserInfo(result)?.isNewUser ?? false;

  if (intent === "login" && isNewUser) {
    // Undo the account Google just created, so the person really is unregistered when they
    // arrive at the registration page. Signing out is the fallback if deleting fails.
    await result.user.delete().catch(() => signOut(auth));
    return { status: "no-account" };
  }

  if (intent === "register" && !isNewUser) {
    await signOut(auth);
    return { status: "already-registered" };
  }

  try {
    return { status: "signed-in", profile: await ensureUserDocument(result.user) };
  } catch (error) {
    // A brand-new account without a profile would make the next "Register" answer "already
    // registered". Remove it so trying again starts from scratch.
    if (isNewUser) await result.user.delete().catch(() => signOut(auth));
    throw error;
  }
};
