"use client";

import EditActionSheet from "@/components/EditActionSheet";
import ProviderForm from "@/components/forms/ProviderForm";
import { deleteProvider } from "@/components/me/providers/actions";
import { Tables } from "@/database.types";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  provider: Tables<"providers">;
};

export default function InfoProvider({ provider }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const providerCreationDate = new Date(
    provider.created_at
  ).toLocaleDateString();

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const { error } = await deleteProvider(provider.id);
    setIsDeleteLoading(false);
    if (error) {
      toast("Deletion failed! Someting went wrong.", {
        description: "Please wait and try again",
      });
      return;
    }
    setIsOpen(false);
    toast(`Provider ${provider.label} has been deleted`);
  };

  const handleEditDone = () => {
    setIsEditMode(false);
  };

  const handleEditCancel = () => {
    setIsEditMode(false);
  };

  return (
    <EditActionSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      isDeleteLoading={isDeleteLoading}
      onDelete={handleDelete}
      title={provider.label}
      textBtn={provider.label}
      variant="info"
      type="badge"
    >
      {isEditMode ? (
        <>
          <ProviderForm
            onSave={handleEditDone}
            onCancel={handleEditCancel}
            provider={provider}
          />
        </>
      ) : (
        <>
          <div>
            <p>Description</p>
            <p className="text-sm text-muted-foreground">
              {provider.description || "No description"}
            </p>
          </div>
          <div>
            <p>Creation date</p>
            <p className="text-sm text-muted-foreground">
              {providerCreationDate}
            </p>
          </div>
        </>
      )}
    </EditActionSheet>
  );
}
