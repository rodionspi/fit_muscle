"use client";

import React from 'react';
import PageWrapper from "@/components/custom/PageWrapper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { addUser, getUser } from "@/server/user/userDataFunctions";
import Image from "next/image";
// import google_logo from "@/../public/images/logos/google_logo.png";
import "firebase/compat/auth";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { auth, provider, signInWithPopup } from "@/firebaseConfig";

const Registration = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const { setUserId, setUserData } = useUser();
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("User name is required")
            .min(3, "User name must be at least 3 characters")
            .max(30, "User name cannot exceed 30 characters"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format"),
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

    const handleSubmit = async (values: typeof initialValues) => {
        try {
          const existingUser = await getUser(values);
          
          if (existingUser) {
            setError('User already exists');
          } else {
            const newUser = await addUser(values);
            
            if (newUser) {
              setUserData(values);
              setUserId(newUser.id);
              router.push(`/profile/${newUser.id}`);
            }
          }
        } catch (error) {
          console.error("Error during submission:", error);
          setError('An error occurred during registration. Please try again.');
        }
    };

    const handleGoogleRegistration = async () => {
        try {
            // Implement Google registration logic here
            // For example, using Firebase Authentication
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                const userData = {
                    name: user.displayName || "",
                    email: user.email || "", // Ensure email is a string
                    password: "", // You might want to handle this differently
                };

                const existingUser = await getUser(userData);

                if (existingUser) {
                    setError('User already exists');
                } else {
                    const newUser = await addUser(userData);
                    if (newUser) {
                        setUserData(userData);
                        setUserId(newUser.id);
                        router.push(`/profile/${newUser.id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error during Google registration:", error);
        }
    };
      

    return (
        <PageWrapper>
            <div className="w-full max-w-md mx-auto my-8 p-8 sm:p-10 rounded-2xl shadow-2xl bg-gray-600">
                <h2 className="text-3xl font-semibold mb-8 text-center">Register</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {() => (
                        <Form className="w-full">
                            {error && (
                            <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                            {/* User Name */}
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                >
                                    User name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Enter user name"
                                    className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="mt-2 text-red-400 text-sm"
                                />
                            </div>

                            {/* E-Mail */}
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                >
                                    E-Mail
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter your e-mail"
                                    className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="mt-2 text-red-400 text-sm"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Field
                                        name="password"
                                        type={isHidden ? "password" : "text"}
                                        placeholder="Enter user password"
                                        className="block w-full px-4 py-3 pr-12 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                                    />
                                    <button
                                        type="button"
                                        aria-label={isHidden ? "Show password" : "Hide password"}
                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-800"
                                        onClick={() => {
                                            setIsHidden(state => !state)
                                        }}>
                                        {isHidden ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="mt-2 text-red-400 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 text-base bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
                            >
                                Register
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleRegistration}
                                className="w-full py-3 px-4 text-base bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-3 flex items-center justify-center"
                            >
                                <Image
                                    src="/images/logos/google_logo.png"
                                    alt="Google logo"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 mr-2"
                                />
                                Register with Google
                            </button>

                            <p className="text-center text-sm mt-6 mb-3 text-gray-300">or if you already have an account</p>

                            <button
                                type="button"
                                onClick={() => router.push('/profile/login')}
                                className="w-full py-3 px-4 text-base bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </PageWrapper>
    );
};

export default Registration;
