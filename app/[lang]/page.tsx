import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { site } from "@/content/site";
import { guides } from "@/content/guides";
import { upcomingEvents } from "@/content/events";
import { Button, Container, Eyebrow, Fact, H2, Lead, PhotoSlot, Stat, TwinRule } from "@/components/ui";
import ProgramIcon from "@/components/ProgramIcon";
import { NewsletterForm } from "@/components/Forms";
import EventCard from "@/components/EventCard";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { ...pageMeta(lang, "/", t.meta.title, t.meta.description), title: { absolute: t.meta.title } };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const h = t.home;
  const events = upcomingEvents().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="font-display text-[40px] font-semibold leading-[46px] tracking-[-0.01em] sm:text-[52px] sm:leading-[58px]">{h.title}</h1>
          <p className="mt-6 max-w-[560px] text-[18px] leading-[28px] text-muted sm:text-[19px] sm:leading-[30px]">{h.lead}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={href(lang, "/programs")}>{h.ctaPrograms}</Button>
            <Button href={href(lang, "/resources")} variant="outline">
              {h.ctaNewcomer}
            </Button>
          </div>
        </div>
        <PhotoSlot label={`${h.heroAlt} — ${t.common.photoNeeded}`} className="aspect-[4/3]" />
      </Container>

      <Container>
        <TwinRule />
      </Container>

      {/* Programs */}
      <Container className="py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <H2>{h.programsTitle}</H2>
            <Lead className="mt-3">{h.programsLead}</Lead>
          </div>
          <Link href={href(lang, "/programs")} className="font-semibold">
            {t.common.allPrograms} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.programs.items.map((p) => (
            <article key={p.slug} className="flex flex-col gap-3 rounded-lg border border-line bg-card p-6">
              <ProgramIcon slug={p.slug} />
              <h3 className="text-[20px] font-semibold leading-[26px]">{p.title}</h3>
              <p className="flex-1 text-muted">{p.short}</p>
              {p.slug === "ziyoart" ? (
                <div className="self-start">
                  <Button href={href(lang, `/programs/${p.slug}`)} variant="accent">
                    {t.common.enroll}
                  </Button>
                </div>
              ) : (
                <Link href={href(lang, `/programs/${p.slug}`)} className="font-semibold">
                  {p.cta} →
                </Link>
              )}
            </article>
          ))}
        </div>
      </Container>

      {/* Numbers */}
      <section className="bg-teal-soft">
        <Container className="py-14">
          <h2 className="mb-8 text-[26px] font-semibold leading-8">{h.statsTitle}</h2>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <Stat value={site.stats.years} label={h.statYears} />
            <Stat value={site.stats.people} label={h.statPeople} />
            <Stat value={site.stats.students} label={h.statStudents} />
            <Stat value={site.stats.eventsPerYear} label={h.statEvents} />
          </dl>
        </Container>
      </section>

      {/* Festivals & events */}
      <Container className="py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <H2>{h.eventsTitle}</H2>
            <Lead className="mt-3">{h.eventsLead}</Lead>
          </div>
          <Link href={href(lang, "/events")} className="font-semibold">
            {h.calendar} →
          </Link>
        </div>
        <article className="flex flex-wrap overflow-hidden rounded-lg border border-line bg-card">
          <PhotoSlot label={t.common.photoNeeded} tone="red" className="min-h-[260px] flex-[1_1_420px] rounded-none" />
          <div className="flex flex-[1_1_420px] flex-col justify-center gap-4 p-8 sm:p-10">
            <Eyebrow className="mb-0 text-red">{h.festivalLabel}</Eyebrow>
            <h3 className="font-display text-[30px] font-semibold leading-9">{h.festivalTitle}</h3>
            <ul className="flex list-disc flex-col gap-1.5 pl-5 text-muted">
              {h.festivalItems.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="text-[14px] leading-5 text-muted">{h.festivalMeta}</p>
            <div>
              <Button href={href(lang, "/events")}>{t.common.seeEvents}</Button>
            </div>
          </div>
        </article>
        {events.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.slug} event={e} lang={lang} rsvp={t.common.rsvp} />
            ))}
          </div>
        )}
      </Container>

      {/* Newcomer help */}
      <section className="border-y border-line bg-card">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_2fr]">
          <div>
            <H2>{h.newcomersTitle}</H2>
            <Lead className="mt-4">{h.newcomersLead}</Lead>
            <p className="mt-4 text-[14px] leading-5 text-muted">{t.common.referralNote}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={href(lang, `/resources/${g.slug}`)}
                  className="flex h-full flex-col gap-1 rounded-lg border border-line bg-paper p-5 text-ink no-underline hover:border-teal hover:text-ink"
                >
                  <span className="text-[18px] font-semibold leading-6">{g.text[lang].title}</span>
                  <span className="text-[14px] leading-5 text-muted">
                    {t.common.lastReviewed} {formatDate(g.reviewed, lang)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Donate */}
      <Container className="py-16">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-lg bg-red-soft p-8 sm:p-12">
          <div className="max-w-[600px] flex-[1_1_420px]">
            <H2>{h.donateTitle}</H2>
            <Lead className="mt-3">{h.donateLead}</Lead>
            <p className="mt-3 text-[14px] leading-5 text-muted">
              {h.taxNote} EIN <Fact value={site.ein} />
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={href(lang, "/donate")} variant="accent" size="lg">
              {h.giveMonthly}
            </Button>
            <Button href={href(lang, "/donate")} variant="outline" size="lg">
              {h.giveOnce}
            </Button>
          </div>
        </div>
      </Container>

      {/* Sponsors */}
      <Container className="pb-4">
        <div className="on-dark flex flex-wrap items-center gap-10 rounded-lg bg-night p-8 text-[#F4EFE6] sm:p-12">
          <div className="flex-[1_1_420px]">
            <Eyebrow className="text-teal-light">{h.sponsorEyebrow}</Eyebrow>
            <h2 className="font-display text-[30px] font-semibold leading-[36px] text-white sm:text-[36px] sm:leading-[42px]">{h.sponsorTitle}</h2>
            <p className="mt-4 text-[18px] leading-[28px] text-night-muted">{h.sponsorLead}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={href(lang, "/sponsors")} variant="light">
                {h.sponsorCta}
              </Button>
              <Button href={href(lang, "/sponsors#kit")} variant="outline-light">
                {h.sponsorKit}
              </Button>
            </div>
          </div>
          <dl className="grid flex-[1_1_300px] grid-cols-2 gap-6">
            <Stat dark value={site.stats.people} label={h.statPeople} />
            <Stat dark value={site.stats.years} label={h.statYearsEvents} />
            <Stat dark value={site.stats.festivalGuests} label={h.statFestival} />
          </dl>
        </div>
      </Container>

      {/* Get involved + newsletter */}
      <section className="mt-12 bg-teal text-white">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[30px] font-semibold leading-[36px] sm:text-[36px] sm:leading-[42px]">{h.involvedTitle}</h2>
            <p className="mt-3 text-[18px] leading-[28px]">{h.involvedLead}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={href(lang, "/get-involved#volunteer")} variant="light">
                {h.volunteer}
              </Button>
              <Button href={href(lang, "/get-involved#membership")} variant="outline-light">
                {h.member}
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 text-ink">
            <NewsletterForm f={t.forms} label={h.newsletterLabel} button={h.subscribe} note={h.newsletterNote} />
          </div>
        </Container>
      </section>
    </>
  );
}

