import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { formatDate } from "@/lib/format";
import { getGuide, guides } from "@/content/guides";
import { site } from "@/content/site";
import { Container, PageHeader } from "@/components/ui";
import AskUs from "@/components/AskUs";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => guides.map((g) => ({ lang, slug: g.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const g = getGuide(slug);
  if (!isLocale(lang) || !g) return {};
  return pageMeta(lang, `/resources/${slug}`, g.text[lang].title, g.text[lang].summary);
}

export default async function Guide({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const g = getGuide(slug);
  if (!g) notFound();
  const t = getDict(lang);
  const text = g.text[lang];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: text.title,
    description: text.summary,
    inLanguage: lang === "uz" ? "uz-Latn" : "en",
    dateModified: g.reviewed,
    publisher: { "@type": "NGO", name: site.name, url: site.url },
  };

  return (
    <>
      <PageHeader eyebrow={t.nav.resources} title={text.title} lead={text.summary} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <article className="max-w-read">
          <p className="text-[14px] text-muted">
            {t.common.lastReviewed} {formatDate(g.reviewed, lang)} · {t.common.referralNote}
          </p>
          {text.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-[24px] font-semibold leading-[30px]">{s.heading}</h2>
              <div className="prose-guide mt-3 text-[17px] leading-[28px]">
                {s.paras?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {s.list && (
                <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-[17px] leading-[28px]">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <section className="mt-12 rounded-lg border border-line bg-card p-6">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">{t.common.official}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {g.sources.map((src) => (
                <li key={src.url}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer">
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <p className="mt-8">
            <Link href={href(lang, "/resources")} className="font-semibold">
              ← {t.common.backTo} {t.nav.resources}
            </Link>
          </p>
        </article>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <AskUs lang={lang} t={t} />
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </>
  );
}
