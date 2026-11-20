"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronDown, ClipboardList, LogOut, User as UserIcon } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { endSession } from "@/lib/session";
import Avatar from "@/components/custom/Avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const itemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/85 outline-none transition-colors focus:bg-accent focus:text-foreground data-[highlighted]:bg-accent data-[highlighted]:text-foreground [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-muted-foreground";

/** Account dropdown for a signed-in visitor. */
const UserMenubar = () => {
  const { userData, setUserData, setUserId } = useUser();
  const router = useRouter();

  if (!userData) return null;

  const handleSignOut = async () => {
    setUserData(null);
    setUserId(null);
    await endSession();
    router.push("/");
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          aria-label="Account menu"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-transparent py-0.5 pl-0.5 pr-2 transition-colors hover:border-border hover:bg-accent data-[state=open]:border-border data-[state=open]:bg-accent"
        >
          <Avatar name={userData.name} email={userData.email} avatar={userData.avatar} className="h-8 w-8" />
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
        </MenubarTrigger>

        <MenubarContent align="end" sideOffset={10} className="w-64 rounded-2xl p-1.5 shadow-elevated">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <Avatar name={userData.name} email={userData.email} avatar={userData.avatar} className="h-10 w-10 text-sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{userData.name || "Athlete"}</p>
              {userData.email && <p className="truncate text-xs text-muted-foreground">{userData.email}</p>}
            </div>
          </div>
          <MenubarSeparator className="bg-border" />

          <MenubarItem asChild className={itemClass}>
            <Link href={`/profile/${userData.id}`}>
              <UserIcon />
              Profile
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={itemClass}>
            <Link href={`/calendar/${userData.id}`}>
              <CalendarDays />
              Workout calendar
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={itemClass}>
            <Link href="/beginnerGuide">
              <ClipboardList />
              Beginner guide
            </Link>
          </MenubarItem>

          <MenubarSeparator className="bg-border" />
          <MenubarItem onSelect={handleSignOut} className={`${itemClass} text-red-300 focus:text-red-200 data-[highlighted]:text-red-200 [&_svg]:text-red-300/80`}>
            <LogOut />
            Sign out
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenubar;
