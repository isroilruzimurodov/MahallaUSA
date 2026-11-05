import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { formatDate } from "@/lib/format";
import { getPost } from "@/lib/cms";
import { Container, PageHeader } from "@/components/ui";

export const revalidate = 60;

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const p = await getPost(slug);
  return p ? pageMeta(lang, `/news/${slug}`, lang === "uz" ? p.titleUz : p.titleEn) : {};
}

export default async function NewsPost({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const p = await getPost(slug);
  if (!p) notFound();
  const t = getDict(lang);
  const body = (lang === "uz" ? p.bodyUz : p.bodyEn) ?? "";

  return (
    <>
      <PageHeader eyebrow={formatDate(p.date, lang)} title={lang === "uz" ? p.titleUz : p.titleEn} />
      <Container className="py-12">
        <article className="max-w-read">
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt="" className="mb-8 w-full rounded-lg" />
          )}
          <div className="flex flex-col gap-4 text-[17px] leading-[28px]">
            {body.split(/\n\s*\n/).map((para, i) => (
              <p key={i} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
          <p className="mt-10">
            <Link href={href(lang, "/news")} className="font-semibold">
              ← {t.common.backTo} {t.nav.news}
            </Link>
          </p>
        </article>
      </Container>
    </>
  );
}
