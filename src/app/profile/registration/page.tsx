"use client";

import Main from "@/app/page";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { addUser } from "@/server/сollectionFunctions";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

const Registration = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const { setUserId, setUserData } = useUser();
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

    const handleSubmit = (values: typeof initialValues) => {
        const userIdPromise = addUser(values);

        userIdPromise
            .then(data => {
                if (data) {
                    setUserData(values);
                    setUserId(data.id)
                    router.push(`/profile/${data.id}`);
                }
            })
            .catch(error => {
                console.error("Error adding data:", error);
            });
    };

    return (
        <Main>
            <div className="p-16 m-auto rounded-lg shadow-lg w-full max-w-sm bg-gray-600">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, e) => handleSubmit(values)}
                >
                    {() => (
                        <Form className="w-full">
                            {/* User Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium"
                                >
                                    User name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Enter user name"
                                    className="mt-2 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* E-Mail */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium"
                                >
                                    E-Mail
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter your e-mail"
                                    className="mt-2 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium"
                                >
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type={isHidden ? "password" : "text"}
                                    placeholder="Enter user password"
                                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsHidden(state => !state)
                                    }}>
                                    {isHidden ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>}
                                </button>

                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Main>
    );
};

export default Registration;
