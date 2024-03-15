"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowDownUp } from "lucide-react";
import React, { useEffect, useState } from "react";

type Asset = Database["public"]["Tables"]["assets"]["Row"];

type Props = {
  assets: Asset[];
  setDisplayedAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
};

enum SortType {
  ASC,
  DESC,
}

type SortByType = {
  key: keyof Asset;
  label: string;
}[];
const sortBy: SortByType = [
  {
    key: "ticker",
    label: "Ticker",
  },
  {
    key: "created_at",
    label: "Creation date",
  },
];

const sortAlphabetically = (assets: Asset[], key: keyof Asset) => {
  return assets.sort((a, b) => {
    const valA = a[key] || "";
    const valB = b[key] || "";
    if (valA < valB) {
      return -1;
    }
    if (valA > valB) {
      return 1;
    }
    return 0;
  });
};

export default function Filters({ assets, setDisplayedAssets }: Props) {
  const [sortType, setSortType] = useState(SortType.DESC);
  const [sortKey, setSortKey] = useState<keyof Asset>("created_at");

  useEffect(() => {
    console.log('Change detected')
    sort(sortKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  const sort = (key: keyof Asset, inverseOrder?: boolean) => {
    if (inverseOrder) {
      setSortType(sortType === SortType.DESC ? SortType.ASC : SortType.DESC);
    }
    setSortKey(key);
    let sorted = sortAlphabetically(assets, key);

    setDisplayedAssets(sortType === SortType.ASC ? sorted : sorted.reverse());

    // if (sortKey !== key || sortType === SortType.DESC) {
    //   setSortType(SortType.ASC);
    //   setDisplayedAssets([...sorted]);
    // } else {
    //   setSortType(SortType.DESC);
    //   setDisplayedAssets([...sorted.reverse()]);
    // }
    // setSortKey(key);
  };

  return (
    <div className="flex gap-2 items-center">
      {/* <FilterByType assets={assets} setFilteredAssets={setFilteredAssets} /> */}
      {sortBy.map((sortEl) => (
        <Badge
          key={sortEl.key}
          variant={sortKey === sortEl.key ? "secondary" : "outline"}
          className="gap-2 flex flex-row cursor-pointer"
          onClick={() => sort(sortEl.key, true)}
        >
          <ArrowDownUp className="h-3 w-3" /> {sortEl.label}
        </Badge>
      ))}
    </div>
  );
}
