import type { Event } from "@/content/events";
import type { Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/format";

export default function EventCard({ event, lang, rsvp }: { event: Event; lang: Locale; rsvp: string }) {
  const text = event.text[lang];
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-card">
      {event.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
      )}
      <div className="flex gap-5 p-6">
      <div className="w-16 shrink-0 rounded-md bg-teal-soft py-2.5 text-center">
        <div className="text-[13px] font-semibold uppercase leading-4 text-teal-strong">{formatDate(event.date, lang, { month: "short" })}</div>
        <div className="font-display text-[28px] font-semibold leading-8">{formatDate(event.date, lang, { day: "numeric" })}</div>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="text-[18px] font-semibold leading-6">{text.title}</h3>
        <p className="text-[14px] leading-5 text-muted">
          {event.time} · {event.venue}
        </p>
        <p className="text-[15px] leading-6 text-muted">{text.summary}</p>
        {event.rsvpUrl && (
          <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
            {rsvp} →
          </a>
        )}
      </div>
      </div>
    </article>
  );
}
