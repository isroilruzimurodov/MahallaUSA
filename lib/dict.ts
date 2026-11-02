import en from "@/content/en";
import uz from "@/content/uz";
import type { Locale } from "./i18n";

const dicts = { en, uz };
export function getDict(locale: Locale) {
  return dicts[locale];
}
