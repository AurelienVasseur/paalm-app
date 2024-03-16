"use server";

import { z } from "zod";
import { formSchema } from "./AssetForm";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createAsset(values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user || userRes.error) throw new Error();
  let asset = { ...values, user_id: userRes.data.user.id };
  const { data, error } = await supabase.from("assets").insert(asset).select();
  revalidatePath("/me/assets");
  return { data, error };
}

export async function updateAsset(
  assetId: string,
  values: z.infer<typeof formSchema>
) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user || userRes.error) throw new Error();
  let asset = { ...values, user_id: userRes.data.user.id };
  const { data, error } = await supabase
    .from("assets")
    .update(asset)
    .eq("id", assetId)
    .select();
  revalidatePath("/me/assets");
  return { data, error };
}
