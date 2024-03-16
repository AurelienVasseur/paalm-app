"use client";

import AssetForm from "@/components/forms/AssetForm";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Asset = Database["public"]["Tables"]["assets"]["Row"];

export default function NewAsset() {
  const [isOpen, setIsOpen] = useState(false);

  const onSave = (data: Asset | null, error: PostgrestError | null) => {
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
    <Badge variant="outline" className="border-dashed cursor-pointer">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="gap-2 flex flex-row items-center">
          <Plus className="h-3 w-3" /> New asset
        </SheetTrigger>
        <SheetContent className="p-0">
          <ScrollArea className="h-full w-full">
            <div className="p-7 gap-9 flex flex-col">
              <SheetHeader>
                <SheetTitle>Create a new asset</SheetTitle>
                <SheetDescription>
                  An asset is a primitive object in Paalm.
                </SheetDescription>
              </SheetHeader>
              <AssetForm onSave={onSave} onCancel={onCancel} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </Badge>
  );
}
