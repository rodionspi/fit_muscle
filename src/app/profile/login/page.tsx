"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Mail } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useUser } from "@/contexts/UserContext";
import PageWrapper from "@/components/custom/PageWrapper";
import AuthCard from "@/components/custom/Auth/AuthCard";
import { FormAlert, FormField, GoogleButton, OrDivider, PasswordField } from "@/components/custom/Auth/AuthFields";
import { Button } from "@/components/ui/button";
import { ensureUserDocument, type StoredUser } from "@/server/user/userDataFunctions";
import { describeAuthError } from "@/server/user/authErrors";
import { setDataToLS } from "@/server/user/localStorageFunctions";
import { continueWithGoogle, warmUpGoogleSignIn } from "@/server/user/googleSignIn";

/** Where "Login" sends someone who has no account yet; the registration page explains why. */
const REGISTRATION_FOR_UNKNOWN_ACCOUNT = "/profile/registration?notice=no-account";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter and one number"
    ),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { setUserId, setUserData } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"email" | "google" | null>(null);

  useEffect(() => {
    warmUpGoogleSignIn();
  }, []);

  /** Same last step for both ways in: remember the profile and open it. */
  const finishSignIn = (profile: StoredUser) => {
    setUserData(profile);
    setDataToLS(profile);
    setUserId(profile.id);
    router.push(`/profile/${profile.id}`);
  };

  const handleEmailLogin = async (values: typeof initialValues) => {
    setError(null);
    setBusy("email");
    try {
      const credential = await signInWithEmailAndPassword(auth, values.email, values.password);
      // ensure rather than read: an account from before profiles were keyed by uid gets
      // its document here instead of being told "User not found".
      finishSignIn(await ensureUserDocument(credential.user));
    } catch (error) {
      console.error("Login failed:", error);
      // Only reported when e-mail enumeration protection is off in the Firebase console;
      // with it on, Firebase answers invalid-credential and the message says it instead.
      if ((error as { code?: string })?.code === "auth/user-not-found") {
        router.push(REGISTRATION_FOR_UNKNOWN_ACCOUNT);
        return;
      }
      setError(describeAuthError(error));
    } finally {
      setBusy(null);
    }
  };

  const handleGoogleLogin = async () => {
    // No await may come before the popup opens - see warmUpGoogleSignIn.
    setError(null);
    setBusy("google");
    try {
      const outcome = await continueWithGoogle("login");
      if (outcome.status === "no-account") {
        router.push(REGISTRATION_FOR_UNKNOWN_ACCOUNT);
      } else if (outcome.status === "signed-in") {
        finishSignIn(outcome.profile);
      }
    } catch (error) {
      console.error("Google login failed:", error);
      setError(describeAuthError(error));
    } finally {
      setBusy(null);
    }
  };

  return (
    <PageWrapper>
      <AuthCard
        title="Welcome back"
        subtitle="Log in to open your profile, your plan and your workout calendar."
        footer={
          <>
            New here?{" "}
            <Link href="/profile/registration" className="font-medium text-emerald-300 transition-colors hover:text-emerald-200">
              Create an account
            </Link>
          </>
        }
      >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleEmailLogin}>
          {() => (
            <Form className="space-y-5" noValidate>
              {error && <FormAlert tone="error">{error}</FormAlert>}

              <FormField
                name="email"
                label="E-mail"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                icon={Mail}
              />
              <PasswordField autoComplete="current-password" />

              <Button type="submit" size="lg" className="w-full" disabled={busy !== null}>
                {busy === "email" ? "Signing in..." : "Log in"}
              </Button>

              <OrDivider />

              <GoogleButton onClick={handleGoogleLogin} disabled={busy !== null}>
                {busy === "google" ? "Waiting for Google..." : "Continue with Google"}
              </GoogleButton>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </PageWrapper>
  );
};

export default Login;
