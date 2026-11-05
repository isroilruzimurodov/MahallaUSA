import Link from "next/link";
import { notFound } from "next/navigation";
import en from "@/content/en";
import { getDict } from "@/lib/dict";
import { href, isLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { site, isMissing } from "@/content/site";
import { Button, Container, Fact, PageHeader, PhotoSlot } from "@/components/ui";
import AskUs from "@/components/AskUs";
import { ziyoClasses, funSunday } from "@/content/ziyoart";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => en.programs.items.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const p = getDict(lang).programs.items.find((i) => i.slug === slug);
  return p ? pageMeta(lang, `/programs/${slug}`, p.title, p.short) : {};
}

export default async function Program({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const p = t.programs.items.find((i) => i.slug === slug);
  if (!p) notFound();

  const cta =
    slug === "ziyoart" ? (
      <div className="flex flex-wrap items-center gap-3">
        <Button href={site.ziyoartEnrollUrl} variant="accent" size="lg">
          {p.cta}
        </Button>
        <Button href={`tel:${site.ziyoart.phone.replace(/[^\d+]/g, "")}`} variant="outline" size="lg">
          {t.common.call} {site.ziyoart.phone}
        </Button>
        <a href={site.ziyoart.website} target="_blank" rel="noopener noreferrer" className="font-semibold">
          ziyoartacademy.com →
        </a>
      </div>
    ) : slug === "festivals" ? (
      <Button href={href(lang, "/events")}>{p.cta}</Button>
    ) : slug === "youth-club" ? (
      <Button href={href(lang, "/get-involved#volunteer")}>{p.cta}</Button>
    ) : (
      <Button href={href(lang, "/contact")}>{p.cta}</Button>
    );

  return (
    <>
      <PageHeader eyebrow={t.programs.title} title={p.title} lead={p.short} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-8">
          <div className="flex max-w-read flex-col gap-4 text-[17px] leading-[28px]">
            {p.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          {slug === "newcomer-support" && (
            <p>
              <Link href={href(lang, "/resources")} className="font-semibold">
                {t.common.readGuide}: {t.nav.resources} →
              </Link>
            </p>
          )}
          <div>{cta}</div>
          <AskUs lang={lang} t={t} />
        </div>
        <aside className="flex flex-col gap-6">
          <PhotoSlot label={`${p.title} — ${t.common.photoNeeded}`} tone={slug === "festivals" ? "red" : "teal"} className="aspect-[4/3]" />
          <ul className="flex flex-col divide-y divide-line rounded-lg border border-line bg-card">
            {p.details.map((d) => (
              <li key={d} className="px-5 py-3.5">
                <Fact value={d} />
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      {slug === "ziyoart" && (
        <>
          <section className="border-t border-line bg-card">
            <Container className="py-16">
              <h2 className="font-display text-[30px] font-semibold leading-[36px] sm:text-[36px] sm:leading-[42px]">{t.common.classesTitle}</h2>
              <p className="mt-3 max-w-read text-[18px] leading-[28px] text-muted">{t.common.classesLead}</p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ziyoClasses.map((c) => {
                  const ct = c.text[lang];
                  return (
                    <article key={c.id} className="flex flex-col gap-3 rounded-lg border border-line bg-paper p-6">
                      <h3 className="text-[20px] font-semibold leading-[26px]">{ct.name}</h3>
                      {(c.ages || ct.schedule) && (
                        <p className="text-[15px] leading-6 text-muted">
                          {c.ages && `${t.common.ages} ${c.ages}`}
                          {c.ages && ct.schedule && " · "}
                          {ct.schedule}
                        </p>
                      )}
                      <ul className="flex flex-1 list-disc flex-col gap-1 pl-5">
                        {ct.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </Container>
          </section>
          <Container className="py-16">
            <div className="grid gap-8 rounded-lg bg-teal-soft p-8 sm:p-10 lg:grid-cols-2">
              <div>
                <p className="mb-3 self-start text-[13px] font-semibold uppercase tracking-[0.06em] text-teal-strong">{t.common.weekly} · {t.common.free}</p>
                <h2 className="font-display text-[28px] font-semibold leading-[34px]">{funSunday[lang].title}</h2>
                <p className="mt-2 text-[17px] font-semibold">{funSunday[lang].schedule}</p>
                <p className="mt-2 text-muted">{funSunday[lang].note}</p>
                <p className="mt-4 text-[15px]">
                  <a href={`tel:${site.ziyoart.phone.replace(/[^\d+]/g, "")}`}>{site.ziyoart.phone}</a> · <a href={`mailto:${site.ziyoart.email}`}>{site.ziyoart.email}</a>
                </p>
              </div>
              <ul className="grid list-disc gap-x-6 gap-y-2 pl-5 sm:grid-cols-2">
                {funSunday[lang].points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
