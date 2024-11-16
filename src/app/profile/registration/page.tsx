"use client"

import Main from "@/app/page";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";

const Registration = () => {
    const { setUserId } = useUser();
    const [userName, setUserNameInput] = useState<string>("");
    const [userPassword, setUserPasswordInput] = useState<string>("")
    const [error, setError] = useState<string>("");

    return (
        <Main>
            <div className="bg-white p-16 m-auto rounded-lg shadow-lg w-full max-w-sm bg-gray-600">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <form
                className="w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    // handleLogin();
                }}
                >
                <div className="mb-4">
                    <label
                    htmlFor="userName"
                    className="block text-sm font-medium"
                    >
                    User name
                    </label>
                    <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    placeholder="Enter user name"
                    className="mt-2 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                    htmlFor="userE-Mail"
                    className="block text-sm font-medium"
                    >
                    E-Mail
                    </label>
                    <input
                    type="text"
                    id="userE-Mail"
                    value={userName}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    placeholder="Enter your e-mail"
                    className="mt-2 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
    
    
                    <label
                    htmlFor="userPassword"
                    className="block text-sm font-medium"
                    >
                    User Password
                    </label>
                    <input
                    type="text"
                    id="userPassword"
                    value={userPassword}
                    onChange={(e) => setUserPasswordInput(e.target.value)}
                    placeholder="Enter user password"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
    
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </button>
                </form>
            </div>
        </Main>
    );
}

export default Registration;