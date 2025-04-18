"use client"

import { useUser } from "@/contexts/UserContext";
import PageWrapper from "@/components/custom/PageWrapper";
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
    <PageWrapper>
      {!!userData ? (
        <div className="flex flex-col items-center space-y-6">
          <Image
          alt="Account logo"
          src={logo_person}
          className="h-32 w-32 rounded-full shadow-lg"
          priority
          />
          <div className="text-center">
          <p className="text-2xl font-semibold text-gray-300">{userData.name}</p>
          <p className="text-xl text-gray-300">{userData.email}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </PageWrapper>
  )
};

export default ProfilePage;