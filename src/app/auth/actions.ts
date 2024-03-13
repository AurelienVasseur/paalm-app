"use server";

import { createClient } from "@/lib/supabase/server";

export async function login(email: string) {
  const supabase = createClient();
  const data = { email };
  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
  });
  return error;
}

export async function verifyOtp(email: string, token: string) {
  const supabase = createClient();
  const data = {
    email,
    token,
  };
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.token,
    type: "email",
  });
  return error;
}
