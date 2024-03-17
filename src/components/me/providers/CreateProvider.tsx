"use client"

import ActionSheet from "@/components/ActionSheet";
import ProviderForm from "@/components/forms/ProviderForm";
import { PostgrestError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateProvider() {
  const [isOpen, setIsOpen] = useState(false);

  const onSave = (
    data: Database["public"]["Tables"]["providers"]["Row"] | null,
    error: PostgrestError | null
  ) => {
    setIsOpen(false);
    if (!data || error) {
      toast("Creation failed! Someting went wrong.", {
        description: "Please wait and try again",
      });
      return;
    }
    toast(`🎉 Provider ${data.label} has been created`, {
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
      title="Create a new provider"
      description="A provider allows you to register transactions."
      textBtn="New provider"
      variant="create"
    >
      <ProviderForm onSave={onSave} onCancel={onCancel} />
    </ActionSheet>
  );
}