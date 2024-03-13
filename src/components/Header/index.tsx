"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { toast as toastSonner } from "sonner";
import { cn } from "@/lib/utils";
import React from "react";
import { User } from "@supabase/supabase-js";
import { signOut } from "./actions";
import { useRouter } from "next/navigation";

type Props = {
  user: User | null;
};

export default function Header({ user }: Props) {
  return (
    <header className="sticky top-0 z-30 flex w-full p-5 items-center justify-center">
      <div className="flex flex-row gap-2 backdrop-filter backdrop-blur-sm rounded-full bg-white/50 border border-slate-200 bg-opacity-30 px-5 py-1 items-center">
        <div className="bg-slate-900 h-[20px] w-[20px] rounded-full"></div>
        <NavigationMenuApp isAuthenticated={user ? true : false} />
      </div>
    </header>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Transactions",
    href: "#",
    description: "Tracks your transactions.",
  },
  {
    title: "Assets",
    href: "/me/assets",
    description: "Customize your assets.",
  },
  {
    title: "Providers",
    href: "#",
    description: "Register your providers and brokers.",
  },
];

export function NavigationMenuApp({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toastSonner("Bye! See you soon 👋", {
      description: "Account successfully logged out",
    });
    router.push("/");
  };

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
                    <div className="mb-2 mt-4 text-lg font-medium">Paalm</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Track and manage your investments with ease.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/me" title="My space">
                Manage your wallet and track performance.
              </ListItem>
              <ListItem href="#" title="Discover">
                Learn how to use the app.
              </ListItem>
              {isAuthenticated && (
                <ListItem onClick={handleSignOut} title="Log out">
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
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/me"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Wallet
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Measure your performance.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
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
