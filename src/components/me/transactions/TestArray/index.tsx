import React from "react";
import { columns } from "./columns";
import { payments } from "./sampleData";
import { DataTable } from "@/components/DataTable";

export default function TestArray() {
  return (
    <section className="max-container padding-container">
      <DataTable columns={columns} data={payments} />
    </section>
  );
}
