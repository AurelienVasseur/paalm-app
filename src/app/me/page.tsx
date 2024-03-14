import { createClient } from "@/lib/supabase/server";
import BentoGrid from "@/components/me/BentoGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth");
  }

  // const { data } = await supabase
  //   .from("assets")
  //   .select("*")
  //   .order("created_at", { ascending: false });
  
  return (
    <>
      <BreadcrumbNav current="Home" />
      <BentoGrid />
    </>
  );
}
