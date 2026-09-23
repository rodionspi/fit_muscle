/**
 * Turns a Firebase error into a sentence the visitor can act on.
 *
 * Every catch block in the sign-in flow ends here. Before, they only called console.error, so a
 * failure looked like "nothing happened" - which is how auth/unauthorized-domain stayed hidden
 * in production until someone opened the browser console.
 *
 * Unknown codes are shown verbatim on purpose: a visible code is far easier to look up than a
 * generic "something went wrong".
 */
export const describeAuthError = (error: unknown): string => {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: unknown }).code)
      : "";

  switch (code) {
    case "auth/unauthorized-domain":
      return "Google sign-in is not enabled for this address yet. Add the domain under Authentication -> Settings -> Authorized domains in the Firebase console.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in window. Allow pop-ups for this site and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "The sign-in window was closed before it finished.";
    case "auth/email-already-in-use":
      return "An account with this e-mail already exists - log in instead.";
    case "auth/invalid-email":
      return "That e-mail address does not look right.";
    case "auth/weak-password":
      return "Please choose a longer password - at least 8 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail or password is wrong.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a moment before trying again.";
    case "auth/network-request-failed":
      return "No connection to the server. Check your internet and try again.";
    case "permission-denied":
      return "The database refused the request - this account is not allowed to read or write that profile.";
    case "unavailable":
      return "The database is unreachable right now. Please try again in a moment.";
    default:
      return code
        ? `Something went wrong (${code}). Please try again.`
        : "Something went wrong. Please try again.";
  }
};
