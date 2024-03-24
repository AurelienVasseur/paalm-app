import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { createClient } from "@/lib/supabase/server";

export default async function TransactionArray() {
  const supabase = createClient();

  const getFromAsset = "quantity, asset: asset_id(type, label, ticker)";
  const getFromProvider = "provider: provider_id(label)";
  const { data } = await supabase
    .from("transactions")
    .select(
      `date, from: from_asset_metadata(${getFromAsset}), to: to_asset_metadata(${getFromAsset}), provider: transaction_provider_metadata(${getFromProvider})`
    )
    .order("created_at", { ascending: false })
    .returns<TransactionWithMetadataLight[]>();
  const transactions: TransactionWithMetadataLight[] = data || [];

  return (
    <section className="max-container padding-container">
      <DataTable columns={columns} data={transactions} />
    </section>
  );
}
