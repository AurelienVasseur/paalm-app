"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
  };
  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
  });
  if (error) {
    redirect("/error");
  }
  // revalidatePath("/", "layout");
  redirect("/auth/confirm");
}

export async function verifyOtp(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    token: formData.get("token") as string,
  };
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.token,
    type: "email",
  });

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/private");
}
