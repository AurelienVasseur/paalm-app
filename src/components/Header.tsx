"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"

import React from "react";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
};

export default function Header({ user }: Props) {
  return (
    <nav className="flex w-full p-5 items-center justify-center">
      <NavigationMenuApp isAuthenticated={user ? true : false} />
    </nav>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Transactions",
    href: "/",
    description: "Tracks your transactions.",
  },
  {
    title: "Assets",
    href: "/",
    description: "Customize your assets.",
  },
  {
    title: "Providers",
    href: "/",
    description: "Register your providers and brokers.",
  },
];

export function NavigationMenuApp({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Start</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">Paalm</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Track and manage your investments with ease.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="My space">
                Manage your wallet and track performance.
              </ListItem>
              <ListItem href="/" title="Discover">
                Learn how to use the app.
              </ListItem>
              {isAuthenticated && (
                <ListItem href="/" title="Log out">
                  Disconnect your account.
                </ListItem>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {isAuthenticated && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
