import { Tables } from "@/database.types";
import React from "react";

type Props = {
  assets?: Tables<"assets">[];
  providers?: Tables<"providers">[];
};

export default function ItemList({ assets, providers }: Props) {
  return (
    <section className="max-container padding-container">
      <p>
        Item list {assets && "asset"} {providers && "provider"}
      </p>
    </section>
  );
}
