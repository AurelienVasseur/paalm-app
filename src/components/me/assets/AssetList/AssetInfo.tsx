"use client";

import AssetBadge from "@/components/AssetBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getAssetTypeInfos } from "@/models/assetTypes";
import React, { useState } from "react";
import DeleteAsset from "./DeleteAsset";
import AssetForm from "@/components/forms/AssetForm";
import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "sonner";

type Props = {
  asset: Database["public"]["Tables"]["assets"]["Row"];
};

export default function AssetInfo({ asset }: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const assetTypeInfos = getAssetTypeInfos(asset.type);
  const assetCreationDate = new Date(asset.created_at).toLocaleDateString();

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleOnSaveEdit = (
    data: Database["public"]["Tables"]["assets"]["Row"] | null,
    error: PostgrestError | null
  ) => {
    setShowEdit(false);
    if (!data || error) {
      setIsOpen(false);
      toast("Update failed! Someting went wrong.", {
        description: "Please wait and try again",
      });
      return;
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)}>
        <AssetBadge asset={asset} />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="p-0">
          <ScrollArea className="h-full w-full">
            <div className="p-7 gap-9 flex flex-col">
              <SheetHeader>
                <SheetTitle>
                  {asset.ticker} {asset.label}
                </SheetTitle>
                <SheetDescription>
                  {assetTypeInfos && (
                    <span className="flex gap-1 items-center">
                      <assetTypeInfos.icon className="h-4 w-4" />{" "}
                      {assetTypeInfos.label}
                    </span>
                  )}
                </SheetDescription>
              </SheetHeader>
              {showEdit ? (
                <>
                  <AssetForm
                    onSave={handleOnSaveEdit}
                    onCancel={() => {
                      setShowEdit(false);
                    }}
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
                    <p className="text-sm text-muted-foreground">
                      {assetCreationDate}
                    </p>
                  </div>
                  <SheetFooter>
                    <Button
                      variant="outline"
                      onClick={handleDelete}
                      disabled={showDelete}
                    >
                      Delete
                    </Button>
                    <Button onClick={handleEdit} disabled={showDelete}>
                      Edit
                    </Button>
                  </SheetFooter>
                </>
              )}
              <DeleteAsset
                show={showDelete}
                setShow={setShowDelete}
                asset={asset}
                setIsOpen={setIsOpen}
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
