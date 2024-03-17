"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteAsset(id: string) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user || userRes.error) throw new Error();
  const { error } = await supabase.from("assets").delete().eq("id", id);
  revalidatePath("/me/assets");
  return { error };
}
