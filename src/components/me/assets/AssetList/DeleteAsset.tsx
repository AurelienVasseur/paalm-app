"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import { deleteAsset } from "./actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  asset: Database["public"]["Tables"]["assets"]["Row"];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAsset({
  show,
  setShow,
  asset,
  setIsOpen,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const handleCancel = () => setShow(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await deleteAsset(asset.id);
    setIsLoading(false);
    if (error) {
      toast("Deletion failed! Someting went wrong.", {
        description: "Please wait and try again",
      });
      return;
    }
    setIsOpen(false);
    toast(`Asset ${asset.ticker} ${asset.label} has been deleted`);
  };

  return show ? (
    <Card className="">
      <CardHeader>
        <CardDescription>
          This action cannot be undone. Please confirm.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Delete
        </Button>
      </CardFooter>
    </Card>
  ) : null;
}
