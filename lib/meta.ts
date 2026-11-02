import type { Metadata } from "next";
import { site } from "@/content/site";
import { locales, type Locale } from "./i18n";

/** Title, description, canonical URL and hreflang alternates for one page. */
export function pageMeta(lang: Locale, path: string, title: string, description?: string): Metadata {
  const p = path === "/" ? "" : path;
  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}/${lang}${p}`,
      languages: Object.fromEntries([...locales.map((l) => [l === "uz" ? "uz-Latn" : l, `${site.url}/${l}${p}`]), ["x-default", `${site.url}/en${p}`]]),
    },
    openGraph: { title, description, url: `${site.url}/${lang}${p}` },
  };
}
