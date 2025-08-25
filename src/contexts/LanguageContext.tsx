'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLanguage, Language } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (path: string) => string | string[];
  tArray: (path: string) => string[];
  isLoading: boolean;
  languages: Language[];
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const languageState = useLanguage();
  
  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}