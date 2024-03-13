import BentoCard from "@/components/BentoCard";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Plus } from "lucide-react";
import React from "react";

const assets = ["ETH Ethereum", "BTC Bitcoin", "EGLD MultiversX", "EUR Euro"];
export default function AssetList() {
  return (
    <section className="max-container padding-container">
      <BentoCard title="Assets">
        <div className="flex gap-2">
          <NewAsset />
          {assets.map((asset) => (
            <Badge key={asset} variant="outline">
              {asset}
            </Badge>
          ))}
        </div>
      </BentoCard>
    </section>
  );
}

function NewAsset() {
  return (
    <Badge variant="outline" className="border-dashed cursor-pointer">
      <Sheet>
        <SheetTrigger className="gap-2 flex flex-row">
          <Plus className="h-4 w-4" /> New asset
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Badge>
  );
}
