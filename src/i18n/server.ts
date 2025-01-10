import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from './config';
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  const messages = (await import(`./messages/${defaultLocale}.json`)).default;
  
  return {
    locale: defaultLocale,
    messages,
    timeZone: 'Africa/Nairobi'
  };
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
