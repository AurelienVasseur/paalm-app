"use client";

import ActionSheet from "@/components/ActionSheet";
import AssetForm from "@/components/forms/AssetForm";
import { Tables } from "@/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateAsset() {
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
      title="Create a new asset"
      description="An asset is a primitive object in Paalm."
      textBtn="New asset"
      variant="create"
    >
      <AssetForm onSave={onSave} onCancel={onCancel} />
    </ActionSheet>
  );
}
