"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProvider(id: string) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user || userRes.error) throw new Error();
  const { error } = await supabase.from("providers").delete().eq("id", id);
  revalidatePath("/me/providers");
  return { error };
}
