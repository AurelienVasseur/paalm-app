"use client";





/**
 * 
 * THIS COMPONENT IS WORK IN PROGRESS
 * 
 */



import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bitcoin,
  Building,
  DollarSign,
  GalleryHorizontalEnd,
  LucideIcon,
} from "lucide-react";

type Asset = Database["public"]["Tables"]["assets"]["Row"];

type filterByType = {
  value: Asset["type"];
  label: string;
  icon: LucideIcon;
};

const filterByTypeValues: filterByType[] = [
  {
    value: "FIAT",
    label: "Fiat",
    icon: DollarSign,
  },
  {
    value: "STOCK",
    label: "Stock",
    icon: Building,
  },
  {
    value: "CRYPTO",
    label: "Crypto",
    icon: Bitcoin,
  },
  {
    value: "NFT",
    label: "NFT",
    icon: GalleryHorizontalEnd,
  },
];

type Props = {
  assets: Asset[];
  setFilteredAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
};

export default function FilterByType({ assets, setFilteredAssets }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = useState<filterByType | null>(
    null
  );

  const filter = (value: Asset["type"]) => {
    setSelectedType(
      filterByTypeValues.find((type) => type.value === value) || null
    );
    if (selectedType) {
      setFilteredAssets(assets.filter((asset) => asset.type === selectedType.value))
    }
    setOpen(false);
  };

  return (
    <>
      <p className="text-sm text-muted-foreground">Type</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedType ? (
              <>
                <selectedType.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedType.label}
              </>
            ) : (
              <>Type</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Change type..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filterByTypeValues.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      filter(value as Asset['type'])
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedType?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
