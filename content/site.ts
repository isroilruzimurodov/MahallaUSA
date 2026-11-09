/**
 * Facts about MahallaUSA used across the site.
 * Anything in [square brackets] is still missing — run `npm run todo` to list it.
 * Fill a value here once and it updates every page in both languages.
 */
export const site = {
  name: "MahallaUSA",
  legalName: "MahallaUSA — Uzbek-American Association",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahallausa.org",

  // Legal & trust
  ein: "[EIN 00-0000000]",
  foundedYear: "[Year founded]",

  // Contact
  address: {
    street: "8778 Bay Parkway, 2nd Floor",
    city: "Brooklyn",
    region: "NY",
    zip: "11214",
  },
  email: "chesscup@mahallausa.org",
  sponsorEmail: "chesscup@mahallausa.org",
  phone: "(929) 559-2999",
  officeHours: "[Office hours]",

  // Leadership (who sponsors talk to)
  president: "Abdumalik Ahmedov",
  vicePresident: "Dilshod Bakhriddinov",

  // Social links — leave a value empty ("") to hide that icon
  social: {
    instagram: "https://www.instagram.com/mahallausa",
    facebook: "https://www.facebook.com/share/1ErMzG7AwE/",
    telegram: "https://t.me/mahallanewyork",
    youtube: "",
  },

  // Numbers shown on the site (confirmed by MahallaUSA)
  stats: {
    years: "10+",
    people: "15,000+",
    festivalGuests: "~1,000",
    students: "[ZiyoArt students]",
    eventsPerYear: "[Events per year]",
  },

  // ZiyoArt Academy (MahallaUSA's school)
  ziyoart: {
    phone: "(929) 559-2999",
    email: "ziyoartusa@gmail.com",
    website: "https://www.ziyoartacademy.com/",
    instagram: "https://www.instagram.com/ziyoart_academy/",
    chessInstagram: "https://www.instagram.com/ziyoartacademy_chess/",
  },

  // Donations & tuition (Zeffy recommended: no fees for the nonprofit)
  donateFormUrl: "[Zeffy donation form URL]",
  ziyoartEnrollUrl: "https://www.ziyoartacademy.com/enrollment",
  sponsorKitPdf: "[Sponsor kit PDF]",

} as const;

export function isMissing(value: string) {
  return value.startsWith("[") && value.endsWith("]");
}
