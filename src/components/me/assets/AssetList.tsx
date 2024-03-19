import React from "react";
import CreateAsset from "./CreateAsset";
import InfoAsset from "./InfoAsset";
import BentoCard from "@/components/BentoCard";
import { Tables } from "@/database.types";

type Props = {
  assets: Tables<"assets">[];
};

export default function AssetList({ assets }: Props) {
  return (
    <section className="max-container padding-container">
      <BentoCard title="Assets">
        <div className="flex gap-2 flex-wrap">
          <CreateAsset />
          {assets.map((asset) => (
            <InfoAsset key={asset.id} asset={asset} />
          ))}
        </div>
      </BentoCard>
    </section>
  );
}
