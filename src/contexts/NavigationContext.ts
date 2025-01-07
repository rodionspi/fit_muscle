import Navigation from "@/types/Navigaton";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

const NavigationContext = createContext<any | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: 'Muscle Chart', href: '/', current: true },
    { name: 'About', href: '/about/', current: false },
    { name: 'Calendar', href: '/calendar/', current: false },
  ]);

//   return (
//     <NavigationContext.Provider value={{ navigation, setNavigation }}>
//     {children}
//     </NavigationContext.Provider>
//   );
}