import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { signOut } from "./actions";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth");
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <form>
        <Button formAction={signOut}>Sign out</Button>
      </form>
    </div>
  );
}
