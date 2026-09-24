/**
 * Turns a Firebase error into a sentence the visitor can act on.
 *
 * Every catch block in the sign-in flow ends here, right after logging the full error with
 * console.error. The split is deliberate: the visitor only gets what they can do something about,
 * while codes and setup problems (unauthorized domain, database rules) stay in the console for
 * whoever maintains the app.
 */
export const describeAuthError = (error: unknown): string => {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: unknown }).code)
      : "";

  switch (code) {
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in window. Allow pop-ups for this site and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "The sign-in window was closed before it finished.";
    case "auth/email-already-in-use":
      return "You already have an account with this e-mail. Please log in instead of registering.";
    case "auth/invalid-email":
      return "That e-mail address does not look right.";
    case "auth/weak-password":
      return "Please choose a longer password - at least 8 characters.";
    // With e-mail enumeration protection on (the Firebase default), a missing account arrives as
    // invalid-credential too, so this has to cover "not registered yet" as well.
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "E-mail or password is wrong. No account yet? Register first. Signed up with Google? Use \"Login with Google\".";
    case "auth/user-not-found":
      return "There is no account with this e-mail yet. Please register first.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a moment before trying again.";
    case "auth/network-request-failed":
    case "unavailable":
    case "deadline-exceeded":
      return "No connection to the server. Check your internet and try again.";
    default:
      return "Something went wrong. Please try again later.";
  }
};
