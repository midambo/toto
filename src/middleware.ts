import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // Used when no locale matches
  defaultLocale: defaultLocale,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en-KE|en-US)/:path*']
};
