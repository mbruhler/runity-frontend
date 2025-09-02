'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { UmamiProvider } from '@/contexts/UmamiContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();

  useEffect(() => {
    // Update html lang attribute when language changes
    document.documentElement.lang = language;
  }, [language]);

  return (
    <UmamiProvider>
      {children}
    </UmamiProvider>
  );
}