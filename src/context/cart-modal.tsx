"use client";

import { createContext, useContext, useState } from 'react';

interface CartModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartModalContext = createContext<CartModalContextType | undefined>(undefined);

export function CartModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <CartModalContext.Provider value={{ open, setOpen }}>
      {children}
    </CartModalContext.Provider>
  );
}

export function useCartModal() {
  const context = useContext(CartModalContext);
  if (context === undefined) {
    throw new Error('useCartModal must be used within a CartModalProvider');
  }
  return context;
}
