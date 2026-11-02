import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Container, PageHeader } from "@/components/ui";
import ProgramIcon from "@/components/ProgramIcon";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/programs", t.programs.title, t.programs.lead);
}

export default async function Programs({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <PageHeader title={t.programs.title} lead={t.programs.lead} />
      <Container className="grid gap-6 py-16 md:grid-cols-2">
        {t.programs.items.map((p) => (
          <Link
            key={p.slug}
            href={href(lang, `/programs/${p.slug}`)}
            className="flex flex-col gap-3 rounded-lg border border-line bg-card p-8 text-ink no-underline hover:border-teal hover:text-ink"
          >
            <ProgramIcon slug={p.slug} size={36} />
            <h2 className="font-display text-[28px] font-semibold leading-[34px]">{p.title}</h2>
            <p className="text-[17px] leading-[27px] text-muted">{p.short}</p>
            <span className="mt-auto font-semibold text-teal">{p.cta} →</span>
          </Link>
        ))}
      </Container>
    </>
  );
}
