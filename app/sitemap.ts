import type { MetadataRoute } from "next";
import en from "@/content/en";
import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/programs",
    ...en.programs.items.map((p) => `/programs/${p.slug}`),
    "/events",
    "/get-involved",
    "/sponsors",
    "/donate",
    "/resources",
    ...guides.map((g) => `/resources/${g.slug}`),
    "/news",
    "/contact",
  ];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      changeFrequency: p.startsWith("/resources") || p === "/events" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x === "uz" ? "uz-Latn" : x, `${site.url}/${x}${p}`])) },
    })),
  );
}
