import React from "react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tables } from "@/database.types";

type Props = {
  asset: Tables<"assets">;
};

export default function AssetBadge({ asset }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Badge variant="outline">
            {asset.ticker} {asset.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="lowercase">{asset.type}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
