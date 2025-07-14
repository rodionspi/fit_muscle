import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";
import { User } from 'lucide-react';
import React from 'react';
import { useUser } from '@/contexts/UserContext';

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
                    className="z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                > 
                    {userData? (
                    <>
                        <MenubarItem>
                        <a href={`/profile/${userData.id}`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Profile
                        </a>
                        </MenubarItem>
                        <MenubarItem>
                        <a href="/" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Sign out
                        </a>
                        </MenubarItem>
                    </>
                    ) : (
                    <>
                        <MenubarItem>
                        <a href="/profile/login" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Login
                        </a>
                        </MenubarItem>
                        <MenubarItem>
                        <a href="/profile/registration" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Registration
                        </a>
                        </MenubarItem>
                    </>
                    )}
                    
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default UserMenubar;