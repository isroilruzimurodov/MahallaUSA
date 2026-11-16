import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { site } from "@/content/site";
import { guides } from "@/content/guides";
import { getUpcomingEvents } from "@/lib/cms";
import { Button, Container, Eyebrow, Fact, H2, Lead } from "@/components/ui";
import { NewsletterForm } from "@/components/Forms";
import EventCard from "@/components/EventCard";
import Diamonds from "@/components/Diamonds";
import Reveal from "@/components/Reveal";
import HeroSlides from "@/components/HeroSlides";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/meta";
import { photoAlt, type PhotoName } from "@/content/photos";
import { has } from "@/lib/placeholders";
import { funSunday } from "@/content/ziyoart";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { ...pageMeta(lang, "/", t.meta.title, t.meta.description), title: { absolute: t.meta.title } };
}

const programPhoto: Record<string, PhotoName> = {
  ziyoart: "kids-drawing",
  "youth-club": "youth-football",
  "newcomer-support": "community-gathering",
  festivals: "plov-master",
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const h = t.home;
  const events = (await getUpcomingEvents()).slice(0, 3);

  const stats = [
    { value: site.stats.years, label: h.statYears },
    { value: site.stats.people, label: h.statPeople },
    { value: site.stats.festivalGuests, label: h.statFestival },
  ];

  const gallery: { name: PhotoName; caption: string; cls: string }[] = [
    { name: "plov-master", caption: h.captions.plov, cls: "col-span-2 row-span-2 aspect-square sm:aspect-auto" },
    { name: "festival-singer", caption: h.captions.stage, cls: "aspect-[4/3] sm:aspect-auto" },
    { name: "goalkeeper", caption: h.captions.sport, cls: "aspect-[4/3] sm:aspect-auto" },
    { name: "award", caption: h.captions.honour, cls: "aspect-[4/3] sm:aspect-auto" },
    { name: "trophy2", caption: h.captions.champions, cls: "aspect-[4/3] sm:aspect-auto" },
  ];

  return (
    <>
      {/* Hero: the festival, full width */}
      <section className="relative isolate overflow-hidden bg-night-deep text-sand">
        <HeroSlides
          labels={{ pause: t.common.pauseSlides, play: t.common.playSlides, show: t.common.showSlide }}
          slides={(
            [
              ["festival-dance", "72% 25%"],
              ["festival-singer", "60% 35%"],
              ["plov-master", "65% 40%"],
              ["trophy", "60% 30%"],
              ["community-kitchen", "62% 40%"],
            ] as [PhotoName, string][]
          ).map(([name, pos]) => ({ src: `/photos/${name}.jpg`, alt: photoAlt(name, lang), pos }))}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(23,19,15,.97)_0%,rgba(23,19,15,.88)_55%,rgba(23,19,15,.55)_100%)] lg:bg-[linear-gradient(90deg,rgba(23,19,15,.97)_0%,rgba(23,19,15,.88)_38%,rgba(23,19,15,.1)_72%)]" />
        <Container className="flex min-h-[640px] flex-col justify-end gap-8 pb-12 pt-40 sm:min-h-[720px] lg:justify-center lg:pt-16">
          <div className="max-w-[640px]">
            <Diamonds className="mb-6" />
            <Eyebrow className="text-gold">{h.eyebrow}</Eyebrow>
            <h1 className="font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.015em] text-white sm:text-[64px] lg:text-[76px]">{h.title}</h1>
            <p className="mt-4 font-script text-[34px] leading-tight text-gold sm:text-[42px]">{h.script}</p>
            <p className="mt-6 max-w-[560px] text-[18px] leading-[28px] text-night-muted sm:text-[19px] sm:leading-[30px]">{h.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={href(lang, "/programs")} variant="light" size="lg">
                {h.ctaPrograms}
              </Button>
              <Button href={href(lang, "/resources")} variant="outline-light" size="lg">
                {h.ctaNewcomer}
              </Button>
            </div>
          </div>
          <dl className="grid max-w-[720px] grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1 rounded-lg border border-white/25 bg-white/10 p-4 backdrop-blur-sm sm:p-5">
                <dt className="text-[13px] leading-4 text-night-muted sm:text-[15px] sm:leading-5">{s.label}</dt>
                <dd className="font-display text-[28px] font-bold leading-none text-white sm:text-[40px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <div aria-hidden="true">
        <div className="h-[4px] bg-red" />
        <div className="mt-[3px] h-[4px] bg-flag" />
      </div>

      {/* Statement */}
      <Container className="py-20 sm:py-28">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="font-display text-[34px] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[48px]">
              <span className="text-teal">“</span>
              {h.statement}
              <span className="text-teal">”</span>
            </p>
            <p className="mt-6 max-w-read text-[18px] leading-[28px] text-muted">{h.statementBody}</p>
            <Diamonds className="mt-8" />
          </div>
          <div className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[460px]">
            <figure className="absolute left-0 top-6 w-[62%] -rotate-3 rounded-sm bg-white p-3 pb-4 shadow-[0_24px_60px_rgba(23,19,15,.22)]">
              <div className="relative aspect-[4/3]">
                <Image src="/photos/community-kitchen.jpg" alt={photoAlt("community-kitchen", lang)} fill sizes="320px" className="object-cover" />
              </div>
            </figure>
            <figure className="absolute right-0 top-0 w-[52%] rotate-[4deg] rounded-sm bg-white p-3 pb-4 shadow-[0_24px_60px_rgba(23,19,15,.22)]">
              <div className="relative aspect-[4/3]">
                <Image src="/photos/anniversary.jpg" alt={photoAlt("anniversary", lang)} fill sizes="280px" className="object-cover" />
              </div>
            </figure>
            <figure className="absolute bottom-0 left-[22%] w-[58%] rotate-[-1deg] rounded-sm bg-white p-3 pb-4 shadow-[0_24px_60px_rgba(23,19,15,.22)]">
              <div className="relative aspect-[4/3]">
                <Image src="/photos/guests.jpg" alt={photoAlt("guests", lang)} fill sizes="300px" className="object-cover" />
              </div>
            </figure>
          </div>
        </Reveal>
      </Container>

      {/* Programs, with photos */}
      <section className="bg-sand">
        <Container className="py-20">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[640px]">
              <H2>{h.programsTitle}</H2>
              <Lead className="mt-3">{h.programsLead}</Lead>
            </div>
            <Link href={href(lang, "/programs")} className="font-semibold">
              {t.common.allPrograms} →
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.programs.items.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link
                  href={href(lang, `/programs/${p.slug}`)}
                  className="zoom group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card text-ink no-underline hover:border-teal hover:text-ink"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={`/photos/${programPhoto[p.slug]}.jpg`} alt={photoAlt(programPhoto[p.slug], lang)} fill sizes="(min-width:1024px) 280px, (min-width:640px) 50vw, 100vw" className="object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 font-display text-[15px] font-bold text-red">0{i + 1}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="text-[20px] font-semibold leading-[26px]">{p.title}</h3>
                    <p className="flex-1 text-muted">{p.short}</p>
                    <span className={`mt-2 font-semibold ${p.slug === "ziyoart" ? "text-red" : "text-teal"}`}>
                      {p.slug === "ziyoart" ? t.common.enroll : h.programsCta} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <Container className="py-20">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <Eyebrow className="text-red">{h.festivalLabel}</Eyebrow>
            <H2>{h.galleryTitle}</H2>
            <Lead className="mt-3">{h.galleryLead}</Lead>
          </div>
          <Link href={href(lang, "/events")} className="font-semibold">
            {h.calendar} →
          </Link>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2 sm:gap-4 sm:[height:560px]">
            {gallery.map((g) => (
              <figure key={g.name} className={`zoom group relative overflow-hidden rounded-lg ${g.cls}`}>
                <Image src={`/photos/${g.name}.jpg`} alt={photoAlt(g.name, lang)} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[14px] font-semibold text-ink">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <Link
            href={href(lang, "/programs/ziyoart")}
            className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-teal-soft p-6 text-ink no-underline hover:border-teal hover:text-ink"
          >
            <span className="flex flex-col gap-1">
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-teal-strong">
                {t.common.weekly} · {t.common.free}
              </span>
              <span className="text-[20px] font-semibold leading-[26px]">{funSunday[lang].title}</span>
              <span className="text-muted">{funSunday[lang].schedule}</span>
            </span>
            <span className="font-semibold text-teal">{t.common.learnMore} →</span>
          </Link>
        </Reveal>
        {events.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.slug} event={e} lang={lang} rsvp={t.common.rsvp} />
            ))}
          </div>
        )}
      </Container>

      {/* Numbers, big */}
      <section className="relative isolate overflow-hidden bg-night-deep text-sand">
        <Image src="/photos/festival-picnic.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(23,19,15,.6),rgba(23,19,15,.9))]" />
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow className="text-gold">{h.statsTitle}</Eyebrow>
          </Reveal>
          <dl className="mt-8 grid gap-10 md:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 150}>
                <div className="flex flex-col-reverse gap-2 border-t border-white/20 pt-6">
                  <dt className="text-[18px] leading-7 text-night-muted">{s.label}</dt>
                  <dd className="font-display text-[72px] font-bold leading-none tracking-[-0.03em] text-gold md:text-[64px] lg:text-[88px]">{s.value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Newcomer help */}
      <section className="border-b border-line bg-card">
        <Container className="grid gap-10 py-20 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <H2>{h.newcomersTitle}</H2>
            <Lead className="mt-4">{h.newcomersLead}</Lead>
            <p className="mt-4 text-[14px] leading-5 text-muted">{t.common.referralNote}</p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {guides.map((g, i) => (
              <li key={g.slug}>
                <Reveal delay={i * 80} className="h-full">
                  <Link
                    href={href(lang, `/resources/${g.slug}`)}
                    className="group flex h-full flex-col gap-2 rounded-lg border border-line bg-paper p-6 text-ink no-underline hover:border-teal hover:text-ink"
                  >
                    <span className="font-display text-[28px] font-bold leading-none text-teal">0{i + 1}</span>
                    <span className="text-[18px] font-semibold leading-6">{g.text[lang].title}</span>
                    <span className="text-[14px] leading-5 text-muted">
                      {t.common.lastReviewed} {formatDate(g.reviewed, lang)}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Donate */}
      <Container className="py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-red p-8 text-white sm:p-12">
            <Diamonds className="absolute right-8 top-8 hidden sm:block" />
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-display text-[34px] font-semibold leading-[1.1] sm:text-[48px]">{h.donateTitle}</h2>
                <p className="mt-4 text-[18px] leading-[28px] text-white">{h.donateLead}</p>
                <p className="mt-4 text-[14px] leading-5 text-white/90">
                  {h.taxNote}
                  {has(site.ein) && (
                    <>
                      {" "}EIN <Fact value={site.ein} />
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button href={href(lang, "/donate")} variant="light" size="lg">
                  {h.giveMonthly}
                </Button>
                <Button href={href(lang, "/donate")} variant="outline-light" size="lg">
                  {h.giveOnce}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Sponsors over a photo */}
      <section className="on-dark relative isolate overflow-hidden bg-night-deep text-sand">
        <Image src="/photos/trophy.jpg" alt={photoAlt("trophy", lang)} fill sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,19,15,.96)_0%,rgba(23,19,15,.85)_45%,rgba(23,19,15,.35)_100%)]" />
        <Container className="py-20 sm:py-28">
          <Reveal className="max-w-[640px]">
            <Eyebrow className="text-gold">{h.sponsorEyebrow}</Eyebrow>
            <h2 className="font-display text-[34px] font-semibold leading-[1.1] text-white sm:text-[52px]">{h.sponsorTitle}</h2>
            <p className="mt-5 text-[18px] leading-[28px] text-night-muted">{h.sponsorLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={href(lang, "/sponsors")} variant="light" size="lg">
                {h.sponsorCta}
              </Button>
              {has(site.sponsorKitPdf) && (
                <Button href={href(lang, "/sponsors#kit")} variant="outline-light" size="lg">
                  {h.sponsorKit}
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Get involved + newsletter */}
      <section className="bg-teal text-white">
        <Container className="grid items-center gap-10 py-20 lg:grid-cols-2">
          <Reveal>
            <p className="font-script text-[40px] leading-tight text-white sm:text-[52px]">{h.script}</p>
            <p className="mt-3 text-[18px] leading-[28px]">{h.involvedLead}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={href(lang, "/get-involved#volunteer")} variant="light">
                {h.volunteer}
              </Button>
              <Button href={href(lang, "/get-involved#membership")} variant="outline-light">
                {h.member}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-lg bg-white p-6 text-ink">
              <NewsletterForm f={t.forms} label={h.newsletterLabel} button={h.subscribe} note={h.newsletterNote} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
