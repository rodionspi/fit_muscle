import { MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, Menubar } from '@/components/ui/menubar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Input } from "@/components/ui/input";
import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/types/Navigaton';


interface MainMenubarComponentProps {
  navigation: Navigation[];
}

const MainMenubar = ({ navigation }: MainMenubarComponentProps) => {
    return (
        <Menubar className="sm:hidden">
            <MenubarMenu>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                <MenubarTrigger className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </MenubarTrigger>
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
                        className={
                        (item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
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