"use client";

import BentoCardTitle from "@/components/BentoCardTitle";
import React, { useState } from "react";
import Filters from "./Filters";
import NewAsset from "./NewAsset";
import AssetBadge from "@/components/AssetBadge";

type Asset = Database["public"]["Tables"]["assets"]["Row"];

type Props = {
  assets: Asset[];
};

export default function Content({ assets }: Props) {
  const [filteredAssets, setFilteredAssets] = useState(assets);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <BentoCardTitle title="Assets idx" />
        <Filters
          assets={filteredAssets}
          setFilteredAssets={setFilteredAssets}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <NewAsset />
        {filteredAssets.map((asset) => (
          <AssetBadge key={asset.id} asset={asset} />
        ))}
      </div>
    </>
  );
}
