import Navigation from "@/types/Navigaton";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserMenubar from "./Menubars/UserMenubar";
import MainMenubar from "./Menubars/MainMenubar";
import Link from "next/link";

const Header = () => {
    const pathname = usePathname();

    const [navigation, setNavigation] = useState<Navigation[]>([
        { name: 'Muscles', href: '/', current: true, show: true },
        // No trailing slash: usePathname() returns "/about", and `current` compares them exactly.
        { name: 'About', href: '/about', current: false, show: true },
    ]);

    useEffect(() => {
        if (pathname) {
        setNavigation((prevNav) =>
            prevNav.map((item) => ({
            ...item,
            current: pathname === item.href,
            }))
        );
        }
    }, [pathname]);

  return (
      // Two columns on phones - the hidden middle column would otherwise leave the profile icon
      // stranded in the centre - and the centred three-column layout from `sm` up.
      <div className="container mx-auto px-4 lg:px-20 py-3 sm:py-4 grid grid-cols-[1fr_auto] sm:grid-cols-3 items-center">
          <Link href="/" className="flex items-center gap-2 justify-self-start">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-white rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.5 17.5L14 14.5L7 9.5L17.5 6.5"
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">FitMuscle</h1>
          </Link>
          {/* скрыть на телефонах, показывать с sm и выше */}
          <div className="hidden sm:flex flex-1 items-center justify-around gap-4">
            <div className="w-full">
              <div className="flex space-x-4 justify-center">
                {navigation.filter(item => item.show).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium ${
                      item.current ? 'bg-gray-900 text-white' : ''
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1">
            <MainMenubar navigation={navigation} />
            <UserMenubar />
          </div>
      </div>
    );
};

export default Header;