import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { isLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Container, PageHeader } from "@/components/ui";

const slugs = ["privacy", "donor-privacy", "accessibility", "terms"] as const;
type Slug = (typeof slugs)[number];
const isSlug = (s: string): s is Slug => (slugs as readonly string[]).includes(s);

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) return {};
  return pageMeta(lang, `/legal/${slug}`, getDict(lang).legal.pages[slug].title);
}

export default async function Legal({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) notFound();
  const t = getDict(lang);
  const page = t.legal.pages[slug];
  return (
    <>
      <PageHeader title={page.title} />
      <Container className="py-12">
        <div className="flex max-w-read flex-col gap-4 text-[17px] leading-[28px]">
          <p className="text-[14px]">
            <span className="todo">{t.legal.draftNote}</span>
          </p>
          {page.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </>
  );
}
