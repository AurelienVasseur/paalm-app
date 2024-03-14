import BentoCard from "@/components/BentoCard";
import { createClient } from "@/lib/supabase/server";
import React from "react";
import Content from "./Content";

export default async function AssetList() {
  const supabase = createClient();
  const resAssets = await supabase
    .from("assets")
    .select("*")
    .order("created_at", { ascending: false });
  const assets = resAssets.data || [];

  return (
    <section className="max-container padding-container">
      <BentoCard>
        <Content assets={assets} />
      </BentoCard>
    </section>
  );
}
