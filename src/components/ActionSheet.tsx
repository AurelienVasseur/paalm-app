import React from "react";
import { Badge } from "./ui/badge";
import { LucideIcon, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export interface ActionSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "create" | "info";
  type: "button" | "badge";
  textBtn: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  children: React.ReactNode;
}

export default function ActionSheet({
  isOpen,
  setIsOpen,
  variant,
  type,
  textBtn,
  title,
  description,
  Icon,
  children,
}: ActionSheetProps) {
  const handleOpen = () => {
    setIsOpen(true);
  };

  const TriggerComponent = type === "badge" ? Badge : Button;

  return (
    <>
      <TriggerComponent
        variant="outline"
        onClick={handleOpen}
        className={`${
          variant === "create" && "border-dashed"
        } cursor-pointer flex gap-1`}
      >
        {variant === "create" && <Plus className="h-3 w-3" />} {textBtn}
      </TriggerComponent>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="p-0">
          <ScrollArea className="h-full w-full">
            <div className="p-7 gap-9 flex flex-col">
              <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                {(description || Icon) && (
                  <SheetDescription>
                    <span className="flex gap-1 items-center">
                      {Icon && <Icon className="h-4 w-4" />} {description}
                    </span>
                  </SheetDescription>
                )}
              </SheetHeader>
              {children}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
