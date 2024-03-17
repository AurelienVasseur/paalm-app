import React from "react";
import CreateProvider from "./CreateProvider";
import InfoProvider from "./InfoProvider";
import BentoCard from "@/components/BentoCard";

type Props = {
  providers: Database["public"]["Tables"]["providers"]["Row"][];
};

export default function AssetList({ providers }: Props) {
  return (
    <section className="max-container padding-container">
      <BentoCard title="Assets">
        <div className="flex gap-2 flex-wrap">
          <CreateProvider />
          {providers.map((provider) => (
            <InfoProvider key={provider.id} provider={provider} />
          ))}
        </div>
      </BentoCard>
    </section>
  );
}
