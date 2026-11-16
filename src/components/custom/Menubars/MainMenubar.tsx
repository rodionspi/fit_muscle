"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { MAIN_NAV, isActivePath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MainMenubarProps {
  loggedIn: boolean;
}

/** Phone-only menu: below `md` the header has no room for the page links, so they live here. */
const MainMenubar = ({ loggedIn }: MainMenubarProps) => {
  const pathname = usePathname();

  return (
    <Menubar className="md:hidden">
      <MenubarMenu>
        <MenubarTrigger
          aria-label="Open main menu"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface-2 text-foreground/80 transition-colors hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </MenubarTrigger>

        <MenubarContent
          align="end"
          sideOffset={10}
          className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl p-2 shadow-elevated"
        >
          {MAIN_NAV.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <MenubarItem key={item.href} asChild>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex cursor-pointer flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 outline-none transition-colors focus:bg-accent data-[highlighted]:bg-accent",
                    active && "bg-white/[0.06]"
                  )}
                >
                  <span className={cn("text-sm font-medium", active ? "text-emerald-300" : "text-foreground")}>
                    {item.name}
                  </span>
                  {item.hint && <span className="text-xs text-muted-foreground">{item.hint}</span>}
                </Link>
              </MenubarItem>
            );
          })}

          {!loggedIn && (
            <>
              <MenubarSeparator className="bg-border" />
              <div className="grid grid-cols-2 gap-2 p-1">
                <Button asChild variant="secondary" size="sm">
                  <Link href="/profile/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/profile/registration">Get started</Link>
                </Button>
              </div>
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MainMenubar;
