import React from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';
import { payments } from './sampleData';

export default function TransactionArray() {
  return (
    <section className="max-container padding-container">
      <DataTable columns={columns} data={payments} />
    </section>
  );
}
