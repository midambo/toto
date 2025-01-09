"use client";

import { useCartModal } from "@/context/cart-modal";
import { CartAsideDrawer } from "./cart-aside-drawer";

export function CartAsideContainer({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useCartModal();

  return (
    <CartAsideDrawer 
      isOpen={open} 
      onClose={() => setOpen(false)} 
    />
  );
}
