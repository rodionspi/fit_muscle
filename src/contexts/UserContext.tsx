import { getDataFromLS } from "@/server/user/localStorageFunctions";
import User from "@/types/User";
import React from "react";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
  /**
   * True until the stored session has been read from localStorage. Guard on
   * this before rendering a "logged out" branch, otherwise a logged-in user
   * sees it flash on the first render.
   */
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userData) {
      const localStorageUserData = getDataFromLS();
      if (localStorageUserData) {
        console.log("Loading from localStorage...");
        setUserData(localStorageUserData);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, userData, setUserData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}