import React from "react";
import NavigationMenuApp from "./NavigationMenuApp";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-30 flex w-full p-5 items-center justify-center">
      <div className="flex flex-row gap-2 backdrop-filter backdrop-blur-sm rounded-full bg-white/50 border border-slate-200 bg-opacity-30 px-5 py-1 items-center">
        <div className="bg-slate-900 h-[20px] w-[20px] rounded-full"></div>
        <NavigationMenuApp isAuthenticated={user ? true : false} />
      </div>
    </header>
  );
}
