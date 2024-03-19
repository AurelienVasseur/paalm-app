import BreadcrumbNav from "@/components/BreadcrumbNav";
import TestArray from "@/components/me/transactions/TestArray";
import TestTransactionArray from "@/components/me/transactions/TestTransactionArray";
import TransactionArray from "@/components/me/transactions/TransactionArray";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Transactions() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth?callback=/me/providers");
  }

  const getFromAsset =
    "quantity, asset: asset_id(type, label, ticker)";
  const getFromProvider =
    "provider: provider_id(label)";
  const resTransactions = await supabase
    .from("transactions")
    .select(
      `date, from: from_asset_metadata(${getFromAsset}), to: to_asset_metadata(${getFromAsset}), provider: transaction_provider_metadata(${getFromProvider})`
    )
    .order("created_at", { ascending: false });
  // const resTransactions = await supabase
  //   .from("transactions")
  //   .select(
  //     `*, from: from_asset_metadata(*, asset: asset_id(*)), to: to_asset_metadata(*, asset: asset_id(*)), provider: transaction_provider_metadata(*, provider: provider_id(*))`
  //   )
  //   .order("created_at", { ascending: false });
  const transactions = resTransactions.data || [];

  return (
    <>
      <BreadcrumbNav
        history={[{ path: "/me", label: "Home" }]}
        current="Transactions"
      />
      {/* <TransactionArray /> */}
      {/* <TestArray /> */}
      <TransactionArray />
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </>
  );
}
