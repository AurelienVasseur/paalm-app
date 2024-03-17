import React from "react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  asset: Database["public"]["Tables"]["assets"]["Row"];
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
