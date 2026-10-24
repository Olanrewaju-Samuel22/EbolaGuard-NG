import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS, TranslationDictionary } from '../lib/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  translate: (path: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ebolaguard_language';

const VALID_LANGUAGES: SupportedLanguage[] = ['en', 'pcm', 'yo', 'ha', 'ig'];

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (saved && VALID_LANGUAGES.includes(saved)) {
      return saved;
    }
    // Also check browser language
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith('yo')) return 'yo';
    if (navLang.startsWith('ha')) return 'ha';
    if (navLang.startsWith('ig')) return 'ig';
  } catch {
    // LocalStorage might be restricted
  }
  return 'en';
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);

  const setLanguage = (newLang: SupportedLanguage) => {
    if (!VALID_LANGUAGES.includes(newLang)) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Keep html lang attribute in sync
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Deep merge current translation with english fallback to guarantee no missing string crashes
  const t = useMemo<TranslationDictionary>(() => {
    const base = TRANSLATIONS.en;
    const current = TRANSLATIONS[language];
    if (language === 'en') return base;

    // Deep merge helper
    function mergeWithFallback<T extends Record<string, any>>(target: T, fallback: T): T {
      const result: Record<string, any> = { ...fallback };
      for (const key of Object.keys(target || {})) {
        const targetVal = target[key];
        const fallbackVal = fallback[key];
        if (targetVal !== undefined && targetVal !== null && targetVal !== '') {
          if (
            typeof targetVal === 'object' &&
            !Array.isArray(targetVal) &&
            typeof fallbackVal === 'object' &&
            !Array.isArray(fallbackVal)
          ) {
            result[key] = mergeWithFallback(targetVal, fallbackVal);
          } else {
            result[key] = targetVal;
          }
        }
      }
      return result as T;
    }

    return mergeWithFallback(current, base);
  }, [language]);

  const translate = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let cur: any = t;
    for (const k of keys) {
      if (cur && typeof cur === 'object' && k in cur) {
        cur = cur[k];
      } else {
        cur = undefined;
        break;
      }
    }
    if (typeof cur === 'string') return cur;
    if (fallback !== undefined) return fallback;

    // Fallback to English
    let enCur: any = TRANSLATIONS.en;
    for (const k of keys) {
      if (enCur && typeof enCur === 'object' && k in enCur) {
        enCur = enCur[k];
      } else {
        return fallback || path;
      }
    }
    return typeof enCur === 'string' ? enCur : (fallback || path);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      translate
    }),
    [language, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Safe fallback if used outside provider
    const base = TRANSLATIONS.en;
    return {
      language: 'en',
      setLanguage: () => {},
      t: base,
      translate: (p, fb) => fb || p
    };
  }
  return context;
}

export function useTranslation(): LanguageContextType {
  return useLanguage();
}
