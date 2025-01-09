import "./globals.css";
import { env, publicUrl } from "@/env.mjs";
import { getLocale } from "@/i18n/server";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Toaster } from "@/ui/shadcn/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

import { Providers } from "@/context/providers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Toto - Online Shopping",
    template: "%s | Toto",
  },
  description: "Shop online for the best products",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-full flex-1 flex-col bg-white" vaul-drawer-wrapper="">
            <Providers>
              {children}
            </Providers>
          </div>
          <Toaster position="top-center" offset={10} />
        </NextIntlClientProvider>
        {env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            async
            src="/stats/script.js"
            data-host-url={publicUrl + "/stats"}
            data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
