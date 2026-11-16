// Photos in public/photos, with descriptions for screen readers and search engines.
import type { Locale } from "@/lib/i18n";

export const photos = {
  "community-kitchen": { en: "Women in Uzbek dress cooking together around a large kazan at a MahallaUSA gathering", uz: "MahallaUSA yigʻinida milliy liboslardagi ayollar katta qozon atrofida ovqat tayyorlamoqda" },
  "festival-dance": { en: "Girls in traditional costume performing an Uzbek dance at a MahallaUSA festival", uz: "MahallaUSA festivalida milliy liboslardagi qizlar oʻzbek raqsini ijro etmoqda" },
  "festival-picnic": { en: "Families picnicking in a Brooklyn park at a MahallaUSA holiday celebration", uz: "MahallaUSA bayramida Bruklin bogʻida dam olayotgan oilalar" },
  "plov-master": { en: "A cook stirring plov in a giant kazan at a MahallaUSA festival", uz: "MahallaUSA festivalida oshpaz katta qozonda palov damlamoqda" },
  "kids-drawing": { en: "Children drawing and colouring at a MahallaUSA event", uz: "MahallaUSA tadbirida rasm chizayotgan bolalar" },
  "youth-football": { en: "A young men's football team at a MahallaUSA tournament", uz: "MahallaUSA turniridagi yoshlar futbol jamoasi" },
  "community-gathering": { en: "Community members gathered indoors in front of a suzani", uz: "Soʻzana oldida yigʻilgan jamoa aʼzolari" },
  "trophy": { en: "A football team celebrating with the trophy at a MahallaUSA tournament", uz: "MahallaUSA turnirida kubok bilan gʻalabani nishonlayotgan futbol jamoasi" },
  "festival-singer": { en: "A singer performing on stage at a MahallaUSA festival", uz: "MahallaUSA festivalida sahnada qoʻshiq aytayotgan xonanda" },
} as const;

export type PhotoName = keyof typeof photos;
export const photoAlt = (name: PhotoName, lang: Locale) => photos[name][lang];
