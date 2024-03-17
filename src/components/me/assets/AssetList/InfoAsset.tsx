"use client";

import EditActionSheet from "@/components/EditActionSheet";
import AssetForm from "@/components/forms/AssetForm";
import { deleteAsset } from "@/components/me/assets/AssetList/actions";
import { getAssetTypeInfos } from "@/models/assetTypes";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  asset: Database["public"]["Tables"]["assets"]["Row"];
};

export default function InfoAsset({ asset }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const assetTypeInfos = getAssetTypeInfos(asset.type);
  const assetCreationDate = new Date(asset.created_at).toLocaleDateString();

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const { error } = await deleteAsset(asset.id);
    setIsDeleteLoading(false);
    if (error) {
      toast("Deletion failed! Someting went wrong.", {
        description: "Please wait and try again",
      });
      return;
    }
    setIsOpen(false);
    toast(`Asset ${asset.ticker} ${asset.label} has been deleted`);
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
      title={`${asset.ticker} ${asset.label}`}
      Icon={assetTypeInfos?.icon}
      description={assetTypeInfos?.label}
      textBtn={`${asset.ticker} ${asset.label}`}
      variant="info"
    >
      {isEditMode ? (
        <>
          <AssetForm
            onSave={handleEditDone}
            onCancel={handleEditCancel}
            asset={asset}
          />
        </>
      ) : (
        <>
          <div>
            <p>Description</p>
            <p className="text-sm text-muted-foreground">
              {asset.description || "No description"}
            </p>
          </div>
          <div>
            <p>Creation date</p>
            <p className="text-sm text-muted-foreground">{assetCreationDate}</p>
          </div>
        </>
      )}
    </EditActionSheet>
  );
}
