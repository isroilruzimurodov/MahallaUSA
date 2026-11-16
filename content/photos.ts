// Photos in public/photos, with descriptions for screen readers and search engines.
import type { Locale } from "@/lib/i18n";

export const photos = {
  "community-kitchen": { en: "Women in Uzbek dress cooking together around a large kazan at a MahallaUSA gathering", uz: "MahallaUSA yigʻinida milliy liboslardagi ayollar katta qozon atrofida ovqat tayyorlamoqda" },
  "festival-dance": { en: "Girls in traditional costume performing an Uzbek dance at a MahallaUSA festival", uz: "MahallaUSA festivalida milliy liboslardagi qizlar oʻzbek raqsini ijro etmoqda" },
  "festival-picnic": { en: "Families picnicking in a Brooklyn park at a MahallaUSA holiday celebration", uz: "MahallaUSA bayramida Bruklin bogʻida dam olayotgan oilalar" },
  "ufa-award": { en: "MahallaUSA receiving an honorary plate from the Uzbekistan Football Association", uz: "MahallaUSA Oʻzbekiston Futbol Assotsiatsiyasidan esdalik sovgʻasini qabul qilmoqda" },
  "plov-serving": { en: "Volunteers serving plov from a giant kazan to guests at a MahallaUSA festival", uz: "MahallaUSA festivalida koʻngillilar katta qozondan mehmonlarga palov tarqatmoqda" },
  "plov-master": { en: "A cook stirring plov in a giant kazan at a MahallaUSA festival", uz: "MahallaUSA festivalida oshpaz katta qozonda palov damlamoqda" },
  "kids-drawing": { en: "Children drawing and colouring at a MahallaUSA event", uz: "MahallaUSA tadbirida rasm chizayotgan bolalar" },
  "youth-football": { en: "A young men's football team at a MahallaUSA tournament", uz: "MahallaUSA turniridagi yoshlar futbol jamoasi" },
  "community-gathering": { en: "Community members gathered indoors in front of a suzani", uz: "Soʻzana oldida yigʻilgan jamoa aʼzolari" },
  "trophy": { en: "A football team celebrating with the trophy at a MahallaUSA tournament", uz: "MahallaUSA turnirida kubok bilan gʻalabani nishonlayotgan futbol jamoasi" },
  "festival-singer": { en: "A singer performing on stage at a MahallaUSA festival", uz: "MahallaUSA festivalida sahnada qoʻshiq aytayotgan xonanda" },
  "award": { en: "A community member receiving an award at a MahallaUSA celebration", uz: "MahallaUSA bayramida jamoa aʼzosi mukofot olmoqda" },
  "goalkeeper": { en: "A goalkeeper leaping for the ball at a MahallaUSA football tournament", uz: "MahallaUSA futbol turnirida darvozabon toʻp uchun sakramoqda" },
  "trophy2": { en: "Players and fans lifting the trophy at a MahallaUSA tournament", uz: "MahallaUSA turnirida oʻyinchilar va muxlislar kubokni koʻtarmoqda" },
  "guests": { en: "Guests and community leaders gathered at a MahallaUSA celebration", uz: "MahallaUSA bayramida yigʻilgan mehmonlar va jamoa yetakchilari" },
  "anniversary": { en: "A gift presented at a MahallaUSA anniversary celebration", uz: "MahallaUSA yubiley tantanasida sovgʻa topshirilmoqda" },
  "face-painting": { en: "Children having their faces painted at a MahallaUSA festival", uz: "MahallaUSA festivalida bolalar yuziga rasm chizdirmoqda" },
  "arm-wrestling": { en: "A crowd cheering an arm-wrestling match at a MahallaUSA festival", uz: "MahallaUSA festivalida bilak kurashini olqishlayotgan olomon" },
  "champions-team": { en: "A football team lifting the trophy at a MahallaUSA tournament", uz: "MahallaUSA turnirida kubokni koʻtarayotgan futbol jamoasi" },
  "ziyoart-students": { en: "ZiyoArt Academy students in uniform on a Brooklyn street", uz: "Bruklin koʻchasida forma kiygan ZiyoArt Academy oʻquvchilari" },
} as const;

export type PhotoName = keyof typeof photos;
export const photoAlt = (name: PhotoName, lang: Locale) => photos[name][lang];
