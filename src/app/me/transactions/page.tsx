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
    "id, quantity, price_unit, price_total, asset: asset_id(id, type, label, ticker)";
  const getFromProvider =
    "id, fees, method, receipt_url, network_transaction_id, provider_transaction_id, provider: provider_id(id, label, description)";
  const resTransactions = await supabase
    .from("transactions")
    .select(
      `id, description, date, from: from_asset_metadata(${getFromAsset}), to: to_asset_metadata(${getFromAsset}), provider: transaction_provider_metadata(${getFromProvider})`
    )
    .order("created_at", { ascending: false });
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
