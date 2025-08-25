'use client';

import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, changeLanguage, languageNames, languages, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300">
          <Globe className="w-4 h-4 animate-pulse" />
          <span className="w-8 h-4 bg-gray-600 rounded animate-pulse"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-mono text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase font-medium">{language}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 z-50 min-w-[140px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-mono transition-colors hover:bg-white/5 ${
                  language === lang 
                    ? 'text-amber-400 bg-amber-400/10' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>{languageNames[lang]}</span>
                {language === lang && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}