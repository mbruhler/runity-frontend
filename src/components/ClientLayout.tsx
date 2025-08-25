'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();

  useEffect(() => {
    // Update html lang attribute when language changes
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}