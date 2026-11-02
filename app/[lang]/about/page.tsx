import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { site } from "@/content/site";
import { Button, Container, Fact, H2, PageHeader, Stat } from "@/components/ui";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/about", t.about.title, t.about.lead);
}

export default async function About({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const a = t.about;
  const people = { president: site.president, vicePresident: site.vicePresident } as Record<string, string>;

  return (
    <>
      <PageHeader title={a.title} lead={a.lead} />

      <Container className="grid gap-12 py-16 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-12">
          <section>
            <H2>{a.missionTitle}</H2>
            <p className="mt-4 max-w-read text-[18px] leading-[28px]">{a.mission}</p>
          </section>
          <section>
            <H2>{a.storyTitle}</H2>
            <div className="mt-4 flex max-w-read flex-col gap-4 text-[17px] leading-[28px]">
              {a.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        </div>
        <dl className="grid h-fit grid-cols-2 gap-8 rounded-lg bg-teal-soft p-8">
          <Stat value={site.stats.years} label={t.home.statYears} />
          <Stat value={site.stats.people} label={t.home.statPeople} />
          <Stat value={site.stats.festivalGuests} label={t.home.statFestival} />
          <Stat value={site.stats.students} label={t.home.statStudents} />
        </dl>
      </Container>

      <section className="border-y border-line bg-card">
        <Container className="py-16">
          <H2>{a.valuesTitle}</H2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v) => (
              <div key={v.title} className="flex flex-col gap-2">
                <h3 className="text-[20px] font-semibold leading-[26px]">{v.title}</h3>
                <p className="text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-2">
        <section id="team">
          <H2>{a.teamTitle}</H2>
          <p className="mt-3 text-muted">{a.teamLead}</p>
          <ul className="mt-6 flex flex-col gap-4">
            {a.team.map((m) => (
              <li key={m.key} className="rounded-lg border border-line bg-card p-5">
                <p className="text-[18px] font-semibold leading-6">
                  <Fact value={people[m.key]} />
                </p>
                <p className="text-muted">{m.role}</p>
              </li>
            ))}
          </ul>
        </section>
        <section id="financials">
          <H2>{a.transparencyTitle}</H2>
          <p className="mt-3 max-w-read">{a.transparency}</p>
          <ul className="mt-4 flex flex-col gap-2 text-muted">
            <li>
              EIN: <Fact value={site.ein} />
            </li>
            {a.transparencyItems.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href={href(lang, "/donate")} variant="accent">
              {t.nav.donate}
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
