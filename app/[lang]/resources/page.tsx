import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { formatDate } from "@/lib/format";
import { guides } from "@/content/guides";
import { Container, PageHeader } from "@/components/ui";
import AskUs from "@/components/AskUs";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/resources", t.resources.title, t.resources.lead);
}

export default async function Resources({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <>
      <PageHeader title={t.resources.title} lead={t.resources.lead} />
      <Container className="py-16">
        <p className="mb-8 max-w-read text-[15px] text-muted">{t.resources.note}</p>
        <ul className="grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={href(lang, `/resources/${g.slug}`)}
                className="flex h-full flex-col gap-2 rounded-lg border border-line bg-card p-7 text-ink no-underline hover:border-teal hover:text-ink"
              >
                <h2 className="font-display text-[26px] font-semibold leading-8">{g.text[lang].title}</h2>
                <p className="text-muted">{g.text[lang].summary}</p>
                <p className="mt-auto pt-2 text-[14px] text-muted">
                  {t.common.lastReviewed} {formatDate(g.reviewed, lang)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 max-w-read">
          <AskUs lang={lang} t={t} />
        </div>
      </Container>
    </>
  );
}
