import { defineField, defineType } from "sanity";

// Every text staff type has an English and an Uzbek field side by side.
const twoLang = (name: string, title: string, rows?: number, required = true) => [
  defineField({ name: `${name}En`, title: `${title} (English)`, type: rows ? "text" : "string", rows, validation: (r) => (required ? r.required() : r) }),
  defineField({ name: `${name}Uz`, title: `${title} (Oʻzbekcha)`, type: rows ? "text" : "string", rows, validation: (r) => (required ? r.required() : r) }),
];

export const event = defineType({
  name: "event",
  title: "Event / Tadbir",
  type: "document",
  fields: [
    ...twoLang("title", "Title / Nomi"),
    defineField({ name: "date", title: "Date / Sana", type: "date", validation: (r) => r.required() }),
    defineField({ name: "time", title: "Time / Vaqt", type: "string", description: "e.g. 12:00–18:00" }),
    defineField({ name: "venue", title: "Place / Joy", type: "string", initialValue: "8778 Bay Parkway, 2nd Floor, Brooklyn" }),
    ...twoLang("summary", "Short description / Qisqa tavsif", 3),
    defineField({ name: "rsvpUrl", title: "Registration link / Roʻyxatdan oʻtish havolasi", type: "url" }),
    defineField({ name: "image", title: "Poster or photo / Afisha yoki surat", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Date", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "titleEn", subtitle: "date", media: "image" } },
});

export const announcement = defineType({
  name: "announcement",
  title: "Announcement / Eʼlon",
  type: "document",
  description: "A short banner shown at the top of every page.",
  fields: [
    ...twoLang("text", "Text / Matn"),
    defineField({ name: "link", title: "Link (optional) / Havola", type: "url" }),
    defineField({ name: "active", title: "Show on the site / Saytda koʻrsatish", type: "boolean", initialValue: true }),
    defineField({ name: "endDate", title: "Hide after / Shu sanadan keyin yashirish", type: "date" }),
  ],
  preview: { select: { title: "textEn", subtitle: "endDate" } },
});

export const post = defineType({
  name: "post",
  title: "News / Yangilik",
  type: "document",
  fields: [
    ...twoLang("title", "Title / Sarlavha"),
    defineField({ name: "slug", title: "Web address / Manzil", type: "slug", options: { source: "titleEn", maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date / Sana", type: "date", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Photo / Surat", type: "image", options: { hotspot: true } }),
    ...twoLang("body", "Text / Matn", 12),
  ],
  orderings: [{ title: "Date", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "titleEn", subtitle: "date", media: "image" } },
});

export const schemaTypes = [event, announcement, post];
