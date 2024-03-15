"use client";

import BentoCardTitle from "@/components/BentoCardTitle";
import React, { useOptimistic, useState } from "react";
import Filters from "./Filters";
import NewAsset from "./NewAsset";
import AssetBadge from "@/components/AssetBadge";

type Asset = Database["public"]["Tables"]["assets"]["Row"];

type Props = {
  assets: Asset[];
};

export default function Content({ assets }: Props) {
  const [displayedAssets, setDisplayedAssets] = useState(assets);
  const [optimisticAssets, addOptimisticAsset] = useOptimistic<Asset[], Asset>(
    assets,
    (state, newAsset) => {
      return [...state, newAsset];
    }
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <BentoCardTitle title="Assets" />
        {/* <Filters
          assets={optimisticAssets}
          setDisplayedAssets={setDisplayedAssets}
        /> */}
      </div>
      <div className="flex gap-2 flex-wrap">
        <NewAsset />
        {optimisticAssets.map((asset) => (
          <AssetBadge key={asset.id} asset={asset} />
        ))}
      </div>
    </>
  );
}
