'use client';

import { CartModalProvider } from './cart-modal';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartModalProvider>
        {children}
      </CartModalProvider>
    </ThemeProvider>
  );
}
