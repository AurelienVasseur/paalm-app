import {
  Bitcoin,
  Building,
  DollarSign,
  GalleryHorizontalEnd,
  LucideIcon,
} from "lucide-react";

type AssetType = {
  value: Database["public"]["Enums"]["asset_type"];
  label: string;
  icon: LucideIcon;
};

export const assetTypes: AssetType[] = [
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
