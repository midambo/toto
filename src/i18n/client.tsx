"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useLocale, useTranslations as useNextTranslations } from 'next-intl';

interface I18nContextType {
  locale: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function IntlClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  return (
    <I18nContext.Provider value={{ locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an IntlClientProvider');
  }
  return context;
}

export function useTranslations(namespace: string) {
  return useNextTranslations(namespace);
}
