"use server";

import { createClient } from "@/lib/supabase/server";

export async function login(email: string) {
  const supabase = createClient();
  const data = { email };
  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
  });
  const res = { error };
  return JSON.stringify(res);
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
  const res = { error };
  return JSON.stringify(res);
}
