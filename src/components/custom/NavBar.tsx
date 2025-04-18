'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo_muscle from '../../../public/images/logos/Biceps_Muscle.png';
import logo_person from '../../../public/images/logos/logo_person.jpg';
import Image from 'next/image';
import Navigation from '@/types/Navigaton';
import { useUser } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

interface NavBarComponentProps {
  navigation: Navigation[];
}

const NavBar = ({ navigation }: NavBarComponentProps) => {

  const {userData, setUserData} = useUser();
  const [localNavigation, setLocalNavigation] = useState(navigation);

  useEffect(() => {
    setLocalNavigation(navigation);
  }, [navigation]);



  const handleSignOut = () => {
    setUserData(null);
    localStorage.clear();
  } 

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center rounded-lg bg-slate-200">
              <Image
                alt="Your Company"
                src={logo_muscle}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {localNavigation.filter(item => item.show).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      item.current ? 'bg-gray-900 text-white' : ''
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Image
                    alt="Acount_logo"
                    src={logo_person}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              > 
                {!!userData? (
                  <>
                    <MenuItem>
                      <a href={`/profile/${userData.id}`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="/" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sign out
                      </a>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <a href="/profile/login" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Login
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="/profile/registration" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Registration
                      </a>
                    </MenuItem>
                  </>
                )}
                
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
            ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default NavBar;
