import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Container, H2, PageHeader } from "@/components/ui";
import { NewsletterForm } from "@/components/Forms";

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
  return (
    <>
      <PageHeader title={t.news.title} lead={t.news.lead} />
      <Container className="grid gap-8 py-16 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-card p-6 sm:p-8">
          <p className="text-[18px] leading-[28px] text-muted">{t.news.empty}</p>
          <div className="mt-6">
            <NewsletterForm f={t.forms} label={t.home.newsletterLabel} button={t.home.subscribe} note={t.home.newsletterNote} />
          </div>
        </div>
        <section id="podcast" className="rounded-lg bg-teal-soft p-6 sm:p-8">
          <H2>{t.news.podcastTitle}</H2>
          <p className="mt-3 text-[17px] leading-[28px]">{t.news.podcastBody}</p>
        </section>
      </Container>
    </>
  );
}
