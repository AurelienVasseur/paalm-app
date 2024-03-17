import React from "react";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  isLoading: boolean;
  handleDelete: () => void;
  handleCancel: () => void;
};

export default function DeleteCard({
  isLoading,
  handleDelete,
  handleCancel,
}: Props) {
  return (
    <Card>
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
  );
}
