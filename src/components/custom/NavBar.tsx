'use client';

import { MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Navigation from '@/types/Navigaton';
import { Input } from "../ui/input";
import { useUser } from '@/contexts/UserContext';
import React from 'react';
import * as Menubar from '@radix-ui/react-menubar';
import { Search, User } from 'lucide-react';
import Link from 'next/link';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

interface NavBarComponentProps {
  navigation: Navigation[];
}

const NavBar = ({ navigation }: NavBarComponentProps) => {

  const {userData, setUserData} = useUser();

  const handleSignOut = () => {
    setUserData(null);
    localStorage.clear();
  } 

  return (
    <>
      <Menubar.Root >
        <MenubarMenu>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center sm:hidden">
                <MenubarTrigger className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </MenubarTrigger>
              </div>
              <div className=" hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  className="w-64 pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-slate-500"
                  placeholder="Search muscles or exercises..."
                />
              </div>
            </div>
          </div>

          <MenubarContent className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                  <MenubarItem
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </MenubarItem>
                </Link>
                ))}
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar.Root>
      <Menubar.Root>
        {/* Profile dropdown */}
        <MenubarMenu>
          <div>
            <MenubarTrigger className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <User/>
            </MenubarTrigger>
          </div>
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
      </Menubar.Root>
    </>
  )
}

export default NavBar;
