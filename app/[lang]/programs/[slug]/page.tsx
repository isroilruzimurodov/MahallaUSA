import Link from "next/link";
import { notFound } from "next/navigation";
import en from "@/content/en";
import { getDict } from "@/lib/dict";
import { href, isLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { site, isMissing } from "@/content/site";
import { Button, Container, Fact, PageHeader, PhotoSlot } from "@/components/ui";
import AskUs from "@/components/AskUs";

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
      isMissing(site.ziyoartEnrollUrl) ? (
        <p className="text-[15px]">
          {t.common.enroll}: <Fact value={site.ziyoartEnrollUrl} />
        </p>
      ) : (
        <Button href={site.ziyoartEnrollUrl} variant="accent" size="lg">
          {p.cta}
        </Button>
      )
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
    </>
  );
}
