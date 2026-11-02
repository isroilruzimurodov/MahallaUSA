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
    street: "[Street address]",
    city: "Brooklyn",
    region: "NY",
    zip: "[ZIP]",
  },
  email: "[info@mahallausa.org]",
  sponsorEmail: "[sponsors@mahallausa.org]",
  phone: "[Phone number]",
  officeHours: "[Office hours]",

  // Leadership (who sponsors talk to)
  president: "[President's full name]",
  vicePresident: "[Vice President's full name]",

  // Social links — leave a value empty ("") to hide that icon
  social: {
    instagram: "[Instagram URL]",
    facebook: "[Facebook URL]",
    telegram: "[Telegram URL]",
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

  // Donations & tuition (Zeffy recommended: no fees for the nonprofit)
  donateFormUrl: "[Zeffy donation form URL]",
  ziyoartEnrollUrl: "[ZiyoArt enrollment / tuition form URL]",
  sponsorKitPdf: "[Sponsor kit PDF]",

  // Sponsorship levels (draft prices — to be confirmed by leadership)
  sponsorPrices: {
    friend: "[$000]",
    event: "[$0,000]",
    season: "[$00,000]",
  },
} as const;

export function isMissing(value: string) {
  return value.startsWith("[") && value.endsWith("]");
}
