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
  const resAssets = await supabase
    .from("assets")
    .select("*")
    .order("ticker", { ascending: true });
  const assets = resAssets.data || [];

  return (
    <>
      <BreadcrumbNav
        history={[{ path: "/me", label: "Home" }]}
        current="Assets"
      />
      <AssetList assets={assets} />
    </>
  );
}
