"use server";

import { z } from "zod";
import { formSchema } from "./AssetForm";
import { createClient } from "@/lib/supabase/server";

export async function saveAsset(values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user || userRes.error) throw new Error();
  let asset = { ...values, user_id: userRes.data.user.id };
  const { data, error } = await supabase.from("assets").insert(asset).select();
  return { data, error };
}
