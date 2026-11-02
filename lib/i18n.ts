export const locales = ["en", "uz"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = { en: "English", uz: "Oʻzbekcha" };
export const htmlLang: Record<Locale, string> = { en: "en", uz: "uz-Latn" };

/** Build a locale-prefixed path: href("uz", "/donate") -> "/uz/donate" */
export function href(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
