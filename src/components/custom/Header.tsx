import Navigation from "@/types/Navigaton";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Header = () => {
    const pathname = usePathname();
    
    const [navigation, setNavigation] = useState<Navigation[]>([
        { name: 'Muscles', href: '/', current: true, show: true },
        { name: 'About', href: '/about/', current: false, show: true },
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
    <div className="container mx-auto px-4 py-4 flex items-center justify-between bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
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
            <h1 className="text-xl font-bold">FitMuscle</h1>
          </div>
          {/* скрыть на телефонах, показывать с sm и выше */}
          <div className="hidden sm:flex flex-1 items-center justify-around gap-4">
            <div className="w-full">
              <div className="flex space-x-4 justify-center">
                {navigation.filter(item => item.show).map((item) => (
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
          <div className="flex items-center">
            <NavBar navigation={navigation}/>
          </div>
        </div>
    );
};

export default Header;