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

type Props = {
  asset: Database["public"]["Tables"]["assets"]["Row"];
};

export default function AssetInfo({ asset }: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const assetTypeInfos = getAssetTypeInfos(asset.type);
  const assetCreationDate = new Date(asset.created_at).toLocaleDateString();

  const handleDelete = async () => {
    setShowDelete(true);
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
                <Button disabled={showDelete}>Edit</Button>
              </SheetFooter>
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
