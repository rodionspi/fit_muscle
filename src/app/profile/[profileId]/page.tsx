"use client"

import { useUser } from "@/contexts/UserContext";
import Main from "@/app/page";
import { useEffect } from "react";
import logo_person from '@/../public/images/logos/logo_person.jpg';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { getDataFromLS } from "@/server/localStorageFunctions";


const ProfilePage = () => {
  const {userData} = useUser();
  const router = useRouter();

  
  useEffect(() => {
    if (!userData) {
      const localStorageUserData = getDataFromLS();
      if(!localStorageUserData) {
        router.push(`/profile/login`)
      }
    }
  }, [userData])

  return (
    <Main>
      {!!userData ? (
        <div className="grid grid-cols-2 gap-4">
          <Image
            alt="Acount_logo"
            src={logo_person}
            className="h-28 w-28 rounded-full"
            priority
          /> 
          <div>
            <p className="text-xl">E-mail: {userData.email}</p>
            <p className="text-xl">Name: {userData.name}</p>
          </div>
        </div>
      ) : <div className="w-12 h-12 border-4 m-auto border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>}
    </Main>
  )
};

export default ProfilePage;