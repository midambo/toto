'use client';

import { CartModalProvider } from './cart-modal';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartModalProvider>
        <div className="flex min-h-full flex-1 flex-col bg-white" vaul-drawer-wrapper="">
          {children}
        </div>
      </CartModalProvider>
    </ThemeProvider>
  );
}
