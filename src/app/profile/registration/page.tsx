"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Mail, User } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

/** Explanations for pages that send someone here, keyed by their ?notice= value. */
const NOTICES: Record<string, string> = {
  "no-account": "You don't have an account yet. Please register first - then you can log in.",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("User name is required")
    .min(3, "User name must be at least 3 characters")
    .max(30, "User name cannot exceed 30 characters"),
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
  name: "",
  email: "",
  password: "",
};

const Registration = () => {
  const { setUserId, setUserData } = useUser();
  const [error, setError] = useState<string>("");
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<"email" | "google" | null>(null);
  const router = useRouter();

  useEffect(() => {
    warmUpGoogleSignIn();
    // Read directly rather than through useSearchParams, which would need a Suspense
    // boundary around this statically rendered page.
    const key = new URLSearchParams(window.location.search).get("notice");
    setNotice(key ? NOTICES[key] ?? null : null);
  }, []);

  /** Same last step for both ways in: remember the profile and open it. */
  const finishSignIn = (profile: StoredUser) => {
    setUserData(profile);
    setDataToLS(profile);
    setUserId(profile.id);
    router.push(`/profile/${profile.id}`);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setError("");
    setBusy("email");
    try {
      const credential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(credential.user, { displayName: values.name });
      finishSignIn(await ensureUserDocument(credential.user, values.name));
    } catch (error) {
      console.error("Registration failed:", error);
      setError(describeAuthError(error));
    } finally {
      setBusy(null);
    }
  };

  const handleGoogleRegistration = async () => {
    // No await may come before the popup opens - see warmUpGoogleSignIn.
    setError("");
    setBusy("google");
    try {
      const outcome = await continueWithGoogle("register");
      if (outcome.status === "already-registered") {
        setNotice(null);
        setError('You already have an account with this Google account. Please use "Login" instead of registering.');
      } else if (outcome.status === "signed-in") {
        finishSignIn(outcome.profile);
      }
    } catch (error) {
      console.error("Google registration failed:", error);
      setError(describeAuthError(error));
    } finally {
      setBusy(null);
    }
  };

  return (
    <PageWrapper>
      <AuthCard
        title="Create your account"
        subtitle="Save your answers, build a plan and keep a workout calendar. It takes a minute."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/profile/login" className="font-medium text-emerald-300 transition-colors hover:text-emerald-200">
              Log in
            </Link>
          </>
        }
      >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {() => (
            <Form className="space-y-5" noValidate>
              {notice && !error && <FormAlert tone="info">{notice}</FormAlert>}
              {error && <FormAlert tone="error">{error}</FormAlert>}

              <FormField name="name" label="User name" placeholder="How should we call you?" autoComplete="nickname" icon={User} />
              <FormField
                name="email"
                label="E-mail"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                icon={Mail}
              />
              <PasswordField
                autoComplete="new-password"
                placeholder="Create a password"
                hint="At least 8 characters, with an uppercase letter, a lowercase letter and a number."
              />

              <Button type="submit" size="lg" className="w-full" disabled={busy !== null}>
                {busy === "email" ? "Creating account..." : "Create account"}
              </Button>

              <OrDivider />

              <GoogleButton onClick={handleGoogleRegistration} disabled={busy !== null}>
                {busy === "google" ? "Waiting for Google..." : "Continue with Google"}
              </GoogleButton>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </PageWrapper>
  );
};

export default Registration;
