import { MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, Menubar } from '@/components/ui/menubar';
import { Menu } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Navigation from '@/types/Navigaton';


interface MainMenubarComponentProps {
  navigation: Navigation[];
}

/** Phone-only menu: below `sm` the header has no room for the page links, so they live here. */
const MainMenubar = ({ navigation }: MainMenubarComponentProps) => {
    return (
        <Menubar className="sm:hidden">
            <MenubarMenu>
                <MenubarTrigger
                    aria-label="Open main menu"
                    className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white data-[state=open]:bg-gray-700 data-[state=open]:text-white"
                >
                    <Menu />
                </MenubarTrigger>
                <MenubarContent align="end" className="border-slate-700 bg-slate-900 text-gray-100">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.filter(item => item.show).map((item) => (
                            <Link href={item.href} key={item.name}>
                                <MenubarItem
                                    aria-current={item.current ? 'page' : undefined}
                                    className={
                                    (item.current ? 'bg-gray-700 text-white focus:bg-gray-700 focus:text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white') +
                                    ' block rounded-md px-3 py-2 text-base font-medium'
                                    }
                                >
                                    {item.name}
                                </MenubarItem>
                            </Link>
                        ))}
                    </div>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}

export default MainMenubar;
