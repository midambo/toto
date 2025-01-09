export const locales = ['en-US', 'en-KE'] as const;
export const defaultLocale = 'en-KE' as const;

export type Locale = typeof locales[number];
