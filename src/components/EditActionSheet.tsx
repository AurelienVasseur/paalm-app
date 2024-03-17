"use client";

import React, { useState } from "react";
import ActionSheet, { ActionSheetProps } from "./ActionSheet";
import { SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import DeleteCard from "./DeleteCard";

interface Props extends ActionSheetProps {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  isDeleteLoading: boolean;
}

export default function EditActionSheet(props: Props) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleEdit = () => {
    props.setIsEditMode(true);
  };

  const handleDelete = () => {
    setIsDeleteMode(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteMode(false);
  };

  return (
    <ActionSheet {...props}>
      {props.children}
      {!props.isEditMode && (
        <>
          <SheetFooter>
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleteMode}
            >
              Delete
            </Button>
            <Button onClick={handleEdit} disabled={isDeleteMode}>
              Edit
            </Button>
          </SheetFooter>
          {isDeleteMode && (
            <DeleteCard
              isLoading={props.isDeleteLoading}
              handleDelete={props.onDelete}
              handleCancel={handleDeleteCancel}
            />
          )}
        </>
      )}
    </ActionSheet>
  );
}
