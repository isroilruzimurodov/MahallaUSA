// Events written in code. Staff normally add events in /admin instead (see lib/cms.ts);
// both lists are merged. Past dates hide automatically.
import type { Locale } from "@/lib/i18n";

export type Event = {
  slug: string;
  date: string; // ISO date, e.g. "2027-03-21"
  time: string; // e.g. "12:00–18:00"
  venue: string;
  rsvpUrl?: string;
  featured?: boolean;
  image?: string;
  text: Record<Locale, { title: string; summary: string }>;
};

export const events: Event[] = [
  // Example — copy, fill in and remove the comment marks:
  // {
  //   slug: "navruz-2027",
  //   date: "2027-03-21",
  //   time: "12:00–18:00",
  //   venue: "[Venue], Brooklyn",
  //   rsvpUrl: "https://…",
  //   featured: true,
  //   text: {
  //     en: { title: "Navruz Festival 2027", summary: "Plov, music, games for children and performances." },
  //     uz: { title: "Navroʻz bayrami 2027", summary: "Palov, musiqa, bolalar uchun oʻyinlar va konsert." },
  //   },
  // },
];

export function upcomingEvents(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}
