"use client";

import { Sheet, SheetContent } from "@/ui/shadcn/sheet";
import { CartModalPage } from "./cart-modal";

export function CartAsideDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-lg sm:max-w-xl">
        <CartModalPage />
      </SheetContent>
    </Sheet>
  );
}
