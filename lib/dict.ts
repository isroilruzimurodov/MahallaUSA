import en from "@/content/en";
import uz from "@/content/uz";
import type { Locale } from "./i18n";
import { showPlaceholders } from "./placeholders";

/**
 * On the live site, any sentence that still contains a [placeholder] is dropped,
 * and list items that end up empty are removed — so missing information is simply
 * not shown. In development (`npm run dev`) placeholders stay visible.
 */
function clean<T>(value: T): T {
  if (typeof value === "string") {
    if (!value.includes("[")) return value;
    const kept = value.split(/(?<=[.!?])\s+/).filter((s) => !s.includes("["));
    return kept.join(" ").trim() as T;
  }
  if (Array.isArray(value)) {
    return value.map(clean).filter((v) => v !== "") as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clean(v)])) as T;
  }
  return value;
}

const dicts = showPlaceholders ? { en, uz } : { en: clean(en), uz: clean(uz) };

export function getDict(locale: Locale) {
  return dicts[locale];
}
