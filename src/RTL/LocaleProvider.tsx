import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ar } from "./ar";
import { en, type SiteCopy } from "./en";

export type LocaleCode = "en" | "ar";

type LocaleContextValue = {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  content: SiteCopy;
  isArabic: boolean;
};

const STORAGE_KEY = "luxury-holding-locale";
const locales: Record<LocaleCode, SiteCopy> = { en, ar };

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<LocaleCode>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "ar" ? "ar" : "en";
  });

  useEffect(() => {
    const current = locales[locale];
    document.documentElement.lang = current.meta.code;
    document.documentElement.dir = current.meta.dir;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      content: locales[locale],
      isArabic: locale === "ar",
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
