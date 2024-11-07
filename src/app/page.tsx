"use client"

import Footer from "@/components/Footer/Footer";
import MusclesChart from "@/components/MusclesChart/MusclesChart";
import NavBar from "@/components/NavBar/NavBar";
import Navigation from "@/types/Navigaton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: 'Muscle Chart', href: '/', current: true },
    { name: 'About', href: '/about', current: false },
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
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar navigation={navigation} />
      </header>
      <main className="flex-grow m-auto mt-8 w-1/2">
        {children || <MusclesChart />}
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

