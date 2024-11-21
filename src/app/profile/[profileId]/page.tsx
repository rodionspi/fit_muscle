"use client"

import { useUser } from "@/contexts/UserContext";
import Main from "@/app/page";
import { useEffect } from "react";
import logo_person from '@/../public/images/logos/logo_person.jpg';
import { useRouter } from "next/navigation";
import Image from 'next/image';


const ProfilePage = ({params} : any) => {
  const {userData} = useUser();
  const router = useRouter();

  
  useEffect(() => {
    if (!userData) {
      router.push(`/profile/login`)
    }
  }, [userData])

  return (
    <Main>
      {userData ? (
        <div className="grid grid-cols-2 gap-4">
          <Image
            alt="Acount_logo"
            src={logo_person}
            className="h-28 w-28 rounded-full"
          /> 
          <div>
            <p className="text-xl">E-mail: {userData.email}</p>
            <p className="text-xl">Name: {userData.name}</p>
          </div>
        </div>
      ) : null}
    </Main>
  )
};

export default ProfilePage;