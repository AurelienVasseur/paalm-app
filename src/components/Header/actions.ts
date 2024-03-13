"use server";

import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
