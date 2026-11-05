import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { formatDate } from "@/lib/format";
import { getPosts } from "@/lib/cms";
import { Container, H2, PageHeader } from "@/components/ui";
import { NewsletterForm } from "@/components/Forms";

export const revalidate = 60;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/news", t.news.title, t.news.lead);
}

export default async function News({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const posts = await getPosts();

  return (
    <>
      <PageHeader title={t.news.title} lead={t.news.lead} />
      {posts.length > 0 && (
        <Container className="grid gap-6 pt-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={href(lang, `/news/${p.slug}`)}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-card text-ink no-underline hover:border-teal hover:text-ink"
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
              )}
              <span className="flex flex-col gap-2 p-6">
                <span className="text-[14px] text-muted">{formatDate(p.date, lang)}</span>
                <span className="text-[20px] font-semibold leading-[26px]">{lang === "uz" ? p.titleUz : p.titleEn}</span>
              </span>
            </Link>
          ))}
        </Container>
      )}
      <Container className="grid gap-8 py-16 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-card p-6 sm:p-8">
          {posts.length === 0 && <p className="mb-6 text-[18px] leading-[28px] text-muted">{t.news.empty}</p>}
          <NewsletterForm f={t.forms} label={t.home.newsletterLabel} button={t.home.subscribe} note={t.home.newsletterNote} />
        </div>
        <section id="podcast" className="rounded-lg bg-teal-soft p-6 sm:p-8">
          <H2>{t.news.podcastTitle}</H2>
          <p className="mt-3 text-[17px] leading-[28px]">{t.news.podcastBody}</p>
        </section>
      </Container>
    </>
  );
}
