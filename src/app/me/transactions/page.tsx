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

  return (
    <>
      <BreadcrumbNav
        history={[{ path: "/me", label: "Home" }]}
        current="Transactions"
      />
      {/* <TransactionArray /> */}
      {/* <TestArray /> */}
      <TransactionArray />
    </>
  );
}
