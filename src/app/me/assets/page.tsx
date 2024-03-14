import BreadcrumbNav from "@/components/BreadcrumbNav";
import AssetList from "@/components/me/assets/AssetList/index";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Assets() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth?callback=/me/assets");
  }
  
  return (
    <>
      <BreadcrumbNav
        history={[{ path: "/me", label: "Home" }]}
        current="Assets"
      />
      <AssetList />
    </>
  );
}
