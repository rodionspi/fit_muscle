import { getDataFromLS } from "@/server/localStorageFunctions";
import User from "@/types/User";
import React from "react";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface UserContextType {
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    if (!userData) {
      const localStorageUserData = getDataFromLS();
      if (localStorageUserData) {
        console.log("Loading from localStorage...");
        setUserData(localStorageUserData);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, userData, setUserData }}>
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