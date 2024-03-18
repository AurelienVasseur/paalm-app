import React from "react";
import { columns } from "./columns";
import { transactions } from "./data";
import { DataTable } from "@/components/DataTable";

export default function TransactionArray() {
  return (
    <section className="max-container padding-container">
      <DataTable columns={columns} data={transactions} />
    </section>
  );
}
