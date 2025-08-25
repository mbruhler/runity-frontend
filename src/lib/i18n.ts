import { useState, useEffect } from 'react';
import enTranslations from '../../translations/en.json';
import plTranslations from '../../translations/pl.json';

export type Language = 'en' | 'pl';

export const languages: Language[] = ['en', 'pl'];

export const languageNames = {
  en: 'English',
  pl: 'Polski'
};

export const translations = {
  en: enTranslations,
  pl: plTranslations
};

// Type for nested translation keys
export type TranslationPath = string;

// Helper function to get nested translation value
export function getTranslation(
  translations: typeof enTranslations, 
  path: string
): string | string[] {
  const keys = path.split('.');
  let current: any = translations;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Return the path if translation not found
    }
  }
  
  return current;
}

// Detect user's preferred language from browser
export function detectUserLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en'; // Default for SSR
  }
  
  const browserLang = navigator.language.toLowerCase();
  
  // Check for exact match first (e.g., 'pl')
  if (languages.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  // Check for language code match (e.g., 'pl-PL' -> 'pl')
  const langCode = browserLang.split('-')[0] as Language;
  if (languages.includes(langCode)) {
    return langCode;
  }
  
  // Default to English
  return 'en';
}

// Hook for managing language state
export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get stored language or detect from browser
    const storedLang = localStorage.getItem('language') as Language;
    const detectedLang = storedLang || detectUserLanguage();
    
    setLanguage(detectedLang);
    setIsLoading(false);
  }, []);
  
  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };
  
  const t = (path: string): string | string[] => {
    return getTranslation(translations[language], path);
  };
  
  const tArray = (path: string): string[] => {
    const result = getTranslation(translations[language], path);
    return Array.isArray(result) ? result : [result as string];
  };
  
  return {
    language,
    changeLanguage,
    t,
    tArray,
    isLoading,
    languages,
    languageNames
  };
}