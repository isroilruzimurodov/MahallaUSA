import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { site, isMissing } from "@/content/site";
import { Button, Container, Eyebrow, Fact, H2, Lead, PhotoSlot, Stat, TwinRule } from "@/components/ui";
import { SponsorForm } from "@/components/Forms";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/sponsors", t.nav.sponsors, t.sponsors.lead);
}

export default async function Sponsors({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const s = t.sponsors;
  const prices = site.sponsorPrices as Record<string, string>;

  return (
    <>
      {/* Hero */}
      <section className="on-dark bg-night text-[#F4EFE6]">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-[3fr_2fr]">
          <div>
            <Eyebrow className="text-teal-light">{s.eyebrow}</Eyebrow>
            <h1 className="font-display text-[38px] font-semibold leading-[44px] text-white sm:text-[50px] sm:leading-[56px]">{s.title}</h1>
            <p className="mt-6 max-w-[600px] text-[18px] leading-[28px] text-night-muted sm:text-[19px] sm:leading-[30px]">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact" variant="light" size="lg">
                {s.talk}
              </Button>
              {isMissing(site.sponsorKitPdf) ? (
                <span id="kit" className="inline-flex min-h-[52px] items-center rounded-md border border-white/40 px-6 text-[15px]">
                  {s.kit}: <Fact value={site.sponsorKitPdf} />
                </span>
              ) : (
                <span id="kit">
                  <Button href={site.sponsorKitPdf} variant="outline-light" size="lg" external>
                    {s.kit}
                  </Button>
                </span>
              )}
            </div>
          </div>
          <PhotoSlot label={t.common.photoNeeded} className="aspect-[4/3]" />
        </Container>
      </section>

      {/* Reach */}
      <Container className="py-16">
        <H2>{s.reachTitle}</H2>
        <Lead className="mt-3 max-w-read">{s.reachLead}</Lead>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            [site.stats.people, s.statPeople],
            [site.stats.years, s.statYears],
            [site.stats.festivalGuests, s.statFestival],
          ].map(([v, l]) => (
            <Stat key={l} value={v} label={l} className="rounded-lg border border-line bg-card p-6" />
          ))}
        </dl>
      </Container>

      <Container>
        <TwinRule />
      </Container>

      {/* What sponsors get */}
      <Container className="py-16">
        <H2>{s.getTitle}</H2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.get.map((g) => (
            <div key={g.title} className="flex flex-col gap-2 rounded-lg border border-line bg-card p-6">
              <h3 className="text-[20px] font-semibold leading-[26px]">{g.title}</h3>
              <p className="text-muted">{g.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Levels */}
      <section className="bg-teal-soft">
        <Container className="py-16">
          <H2>{s.levelsTitle}</H2>
          <Lead className="mt-3 max-w-read">{s.levelsLead}</Lead>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.levels.map((lvl) => {
              const featured = lvl.priceKey === "season";
              const top = lvl.priceKey === "title";
              return (
                <article
                  key={lvl.name}
                  className={`flex flex-col gap-3 rounded-lg p-7 ${
                    top ? "on-dark bg-night text-[#F4EFE6]" : featured ? "border-2 border-teal bg-card p-[27px]" : "border border-line bg-card"
                  }`}
                >
                  {featured && <p className="self-start rounded-full bg-teal px-2.5 text-[13px] font-semibold leading-5 text-white">{s.mostChosen}</p>}
                  <h3 className={`text-[20px] font-semibold leading-[26px] ${top ? "text-white" : ""}`}>{lvl.name}</h3>
                  <p className={`font-display text-[32px] font-semibold leading-9 ${top ? "text-white" : ""}`}>
                    {top ? s.letsTalk : <Fact value={prices[lvl.priceKey]} />}
                  </p>
                  <ul className={`flex list-disc flex-col gap-1.5 pl-5 ${top ? "text-night-muted" : "text-muted"}`}>
                    {lvl.perks.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Trust */}
      <Container className="py-16">
        <H2>{s.trustTitle}</H2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {s.trust.map((item) => (
            <li key={item} className="flex gap-3">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-teal">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
          <li className="flex gap-3 text-muted">
            <span className="w-6 shrink-0" />
            <span>
              EIN <Fact value={site.ein} />
            </span>
          </li>
        </ul>
      </Container>

      {/* Contact */}
      <section id="contact" className="border-t border-line bg-card">
        <Container className="grid gap-12 py-16 lg:grid-cols-[2fr_3fr]">
          <div>
            <H2>{s.contactTitle}</H2>
            <Lead className="mt-4">{s.contactLead}</Lead>
            <ul className="mt-6 flex flex-col gap-1 text-[15px] leading-6">
              <li>
                <Fact value={site.president} /> — {t.about.team[0].role}
              </li>
              <li>
                <Fact value={site.vicePresident} /> — {t.about.team[1].role}
              </li>
              <li className="mt-2">
                {isMissing(site.sponsorEmail) ? <Fact value={site.sponsorEmail} /> : <a href={`mailto:${site.sponsorEmail}`}>{site.sponsorEmail}</a>} · <Fact value={site.phone} />
              </li>
            </ul>
          </div>
          <SponsorForm f={t.forms} options={s.interestOptions} />
        </Container>
      </section>
    </>
  );
}
