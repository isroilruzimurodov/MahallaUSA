import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { upcomingEvents } from "@/content/events";
import { Container, H2, PageHeader, PhotoSlot } from "@/components/ui";
import EventCard from "@/components/EventCard";
import { NewsletterForm } from "@/components/Forms";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/events", t.events.title, t.events.lead);
}

export default async function Events({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const e = t.events;
  const list = upcomingEvents();

  return (
    <>
      <PageHeader title={e.title} lead={e.lead} />
      <Container className="py-16">
        <H2>{e.upcoming}</H2>
        {list.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((ev) => (
              <EventCard key={ev.slug} event={ev} lang={lang} rsvp={t.common.rsvp} />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-8 rounded-lg border border-line bg-card p-6 sm:p-8 lg:grid-cols-2">
            <p className="text-[18px] leading-[28px] text-muted">{e.empty}</p>
            <NewsletterForm f={t.forms} label={t.home.newsletterLabel} button={t.home.subscribe} note={t.home.newsletterNote} />
          </div>
        )}
      </Container>
      <section className="border-t border-line bg-card">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-2">
          <PhotoSlot label={t.common.photoNeeded} tone="red" className="aspect-[4/3]" />
          <div>
            <H2>{e.pastTitle}</H2>
            <ul className="mt-6 flex list-disc flex-col gap-2 pl-5 text-[17px] leading-[27px] text-muted">
              {e.past.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
