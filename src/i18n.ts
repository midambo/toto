import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales } from './i18n/config';
 
// Can be imported from a shared config
const defaultLocale = 'en-KE';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./i18n/messages/${locale}.json`)).default
  };
});
