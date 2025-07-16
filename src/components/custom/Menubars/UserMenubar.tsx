import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { User } from 'lucide-react';
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import Link from "next/dist/client/link";

const UserMenubar = () => {
    const {userData, setUserData} = useUser();

    const handleSignOut = () => {
        setUserData(null);
        localStorage.clear();
    } 

    return (
        <Menubar>
            {/* Profile dropdown */}
            <MenubarMenu>
                <MenubarTrigger className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                    <User/>
                </MenubarTrigger>
                <MenubarContent
                    className="sm:hidden"
                > 
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {userData? (
                            <>
                                <Link href={`/profile/${userData.id}`}>
                                    <MenubarItem className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>
                                        Profile
                                    </MenubarItem>
                                </Link>
                                <Link href="/">
                                    <MenubarItem className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>
                                        Sign out
                                    </MenubarItem>
                                </Link>
                            </>
                            ) : (
                            <>
                                <Link href="/profile/login">
                                    <MenubarItem className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>
                                        Login
                                    </MenubarItem>
                                </Link>
                                <Link href="/profile/registration">
                                    <MenubarItem className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>
                                        Registration
                                    </MenubarItem>
                                </Link>
                            </>
                        )}
                    </div>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default UserMenubar;