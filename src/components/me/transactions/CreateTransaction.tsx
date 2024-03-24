"use client";

import ActionSheet from "@/components/ActionSheet";
import TransactionForm from "@/components/forms/TransactionForm";
import { Tables } from "@/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateTransaction() {
  const [isOpen, setIsOpen] = useState(false);

  const onSave = (
    data: Tables<"assets"> | null,
    error: PostgrestError | null
  ) => {
    setIsOpen(false);
    if (!data || error) {
      toast("Creation failed! Someting went wrong.", {
        description: "Please wait and try again",
      });
      return;
    }
    toast(`🎉 Asset ${data.ticker} ${data.label} has been created`, {
      description: "You can now create transactions with it",
    });
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <ActionSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create a new transaction"
      description="A transaction is a swap between two assets."
      textBtn="New transaction"
      variant="create"
      type="button"
    >
      {/* <AssetForm onSave={onSave} onCancel={onCancel} /> */}
      <TransactionForm onCancel={onCancel} />
    </ActionSheet>
  );
}
