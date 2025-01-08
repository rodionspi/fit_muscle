import Navigation from '@/types/Navigaton';
import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  navigation: Navigation[];
  setNavigation: (navigation: Navigation[]) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: 'Muscle Chart', href: '/', current: true },
    { name: 'About', href: '/about/', current: false },
  ]);

//   return (
//     <NavigationContext.Provider value={{ navigation, setNavigation }}>
//       {children}
//     </NavigationContext.Provider>
//   );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};