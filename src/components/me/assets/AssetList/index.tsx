import BentoCard from "@/components/BentoCard";
import { createClient } from "@/lib/supabase/server";
import React from "react";
import NewAsset from "./NewAsset";
import AssetInfo from "./AssetInfo";

export default async function AssetList() {
  const supabase = createClient();
  const resAssets = await supabase
    .from("assets")
    .select("*")
    .order("ticker", { ascending: true });
  const assets = resAssets.data || [];

  return (
    <section className="max-container padding-container">
      <BentoCard title="Assets">
        <div className="flex gap-2 flex-wrap">
          <NewAsset />
          {assets.map((asset) => (
            <AssetInfo key={asset.id} asset={asset} />
          ))}
        </div>
      </BentoCard>
    </section>
  );
}
