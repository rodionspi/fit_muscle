"use client"

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { useUser } from "@/contexts/UserContext";
import Navigation from "@/types/Navigaton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function PageWrapper({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const {userData, userId} = useUser();
  
  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: 'Muscle Chart', href: '/', current: true, show: true },
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

  useEffect(() => {
    if (userData && userData.id && navigation.length === 2) {
      setNavigation((prevNav) => [
        ...prevNav,
        { name: 'Calendar', href: `/calendar/${userData?.id}`, current: false, show: !!userData }
      ]);
    }
  }, [userData, userId]);

  
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar navigation={navigation} />
      </header>
      <main className="flex-grow m-auto mt-8 mb-8 w-full sm:w-full md:w-5/6 lg:w-3/4 p-4 h-full">
        {children || <div>Loading content...</div>}
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default PageWrapper;
