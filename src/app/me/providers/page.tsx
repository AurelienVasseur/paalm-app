import BreadcrumbNav from "@/components/BreadcrumbNav";
import ProviderList from "@/components/me/providers/ProviderList";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Assets() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth?callback=/me/providers");
  }
  const resProviders = await supabase
    .from("providers")
    .select("*")
    .order("label", { ascending: true });
  const providers = resProviders.data || [];

  return (
    <>
      <BreadcrumbNav
        history={[{ path: "/me", label: "Home" }]}
        current="Providers"
      />
      <ProviderList providers={providers} />
    </>
  );
}
