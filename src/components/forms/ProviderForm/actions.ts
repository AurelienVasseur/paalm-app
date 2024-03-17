"use server"

import { z } from "zod";
import { formSchema } from "./index";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProvider(values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user || userRes.error) throw new Error();
  let provider = { ...values, user_id: userRes.data.user.id };
  const { data, error } = await supabase.from("providers").insert(provider).select();
  revalidatePath("/me/providers");
  return { data, error };
}

export async function updateProvider(
  providerId: string,
  values: z.infer<typeof formSchema>
) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user || userRes.error) throw new Error();
  let provider = { ...values, user_id: userRes.data.user.id };
  const { data, error } = await supabase
    .from("providers")
    .update(provider)
    .eq("id", providerId)
    .select();
  revalidatePath("/me/providers");
  return { data, error };
}