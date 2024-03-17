import React from "react";

type Asset = Database["public"]["Tables"]["assets"]["Row"];
type Provider = Database["public"]["Tables"]["providers"]["Row"];

type Props = {
  assets?: Asset[]
  providers?: Provider[]
};


export default function ItemList({ assets, providers }: Props) {

  return (
    <section className="max-container padding-container">
      <p>Item list {assets && "asset"} {providers && "provider"}</p>
    </section>
  );
}
