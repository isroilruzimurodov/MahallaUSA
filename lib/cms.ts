import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, cmsEnabled, dataset, projectId } from "@/sanity/env";
import { events as fileEvents, type Event } from "@/content/events";

// Content staff publish in /admin. Pages re-check every 60 seconds,
// so a new event or announcement appears about a minute after "Publish".
const REVALIDATE = 60;

const client = cmsEnabled ? createClient({ projectId, dataset, apiVersion, useCdn: true }) : null;
const builder = cmsEnabled ? imageUrlBuilder({ projectId, dataset }) : null;

async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(groq, params, { next: { revalidate: REVALIDATE } });
  } catch (err) {
    console.error("[cms] query failed", err);
    return null;
  }
}

export function imageUrl(source: unknown, width = 1200) {
  return builder && source ? builder.image(source as never).width(width).auto("format").url() : undefined;
}

type CmsEvent = {
  _id: string; titleEn: string; titleUz: string; date: string; time?: string; venue?: string;
  summaryEn?: string; summaryUz?: string; rsvpUrl?: string; image?: unknown;
};

export async function getUpcomingEvents(): Promise<Event[]> {
  const today = new Date().toISOString().slice(0, 10);
  const cms =
    (await query<CmsEvent[]>(`*[_type == "event" && date >= $today] | order(date asc)`, { today })) ?? [];
  const fromCms: Event[] = cms.map((e) => ({
    slug: e._id,
    date: e.date,
    time: e.time ?? "",
    venue: e.venue ?? "",
    rsvpUrl: e.rsvpUrl,
    image: imageUrl(e.image, 800),
    text: {
      en: { title: e.titleEn, summary: e.summaryEn ?? "" },
      uz: { title: e.titleUz, summary: e.summaryUz ?? "" },
    },
  }));
  return [...fromCms, ...fileEvents.filter((e) => e.date >= today)].sort((a, b) => a.date.localeCompare(b.date));
}

export type Announcement = { textEn: string; textUz: string; link?: string };

export async function getAnnouncement(): Promise<Announcement | null> {
  const today = new Date().toISOString().slice(0, 10);
  return query<Announcement>(
    `*[_type == "announcement" && active == true && (!defined(endDate) || endDate >= $today)] | order(_updatedAt desc)[0]{textEn, textUz, link}`,
    { today },
  );
}

export type Post = {
  slug: string; date: string; titleEn: string; titleUz: string; bodyEn?: string; bodyUz?: string; image?: string;
};

const postFields = `"slug": slug.current, date, titleEn, titleUz, bodyEn, bodyUz, image`;

export async function getPosts(): Promise<Post[]> {
  const rows = (await query<(Post & { image?: unknown })[]>(`*[_type == "post" && defined(slug.current)] | order(date desc)[0...30]{${postFields}}`)) ?? [];
  return rows.map((p) => ({ ...p, image: imageUrl(p.image, 900) }));
}

export async function getPost(slug: string): Promise<Post | null> {
  const p = await query<Post & { image?: unknown }>(`*[_type == "post" && slug.current == $slug][0]{${postFields}}`, { slug });
  return p ? { ...p, image: imageUrl(p.image, 1400) } : null;
}
