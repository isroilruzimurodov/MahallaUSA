import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Button, Container, H2, PageHeader } from "@/components/ui";
import { VolunteerForm } from "@/components/Forms";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/get-involved", t.involved.title, t.involved.lead);
}

export default async function GetInvolved({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const g = t.involved;

  return (
    <>
      <PageHeader title={g.title} lead={g.lead} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[2fr_3fr]">
        <section id="volunteer">
          <H2>{g.volunteerTitle}</H2>
          <p className="mt-4 text-[17px] leading-[28px] text-muted">{g.volunteerBody}</p>
        </section>
        <div className="rounded-lg border border-line bg-card p-6 sm:p-8">
          <VolunteerForm f={t.forms} interests={g.volunteerInterests} />
        </div>
      </Container>
      <section className="border-t border-line bg-card">
        <Container className="grid gap-6 py-16 md:grid-cols-2">
          <div id="membership" className="flex flex-col gap-4 rounded-lg bg-teal-soft p-8">
            <H2>{g.membershipTitle}</H2>
            <p className="text-[17px] leading-[28px]">{g.membershipBody}</p>
            <div className="mt-auto">
              <Button href={href(lang, "/contact")}>{t.nav.contact}</Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-night p-8 text-white">
            <h2 className="font-display text-[30px] font-semibold leading-[36px] sm:text-[36px] sm:leading-[42px]">{g.partnerTitle}</h2>
            <p className="text-[17px] leading-[28px] text-night-muted">{g.partnerBody}</p>
            <div className="mt-auto">
              <Button href={href(lang, "/sponsors")} variant="light">
                {g.partnerCta}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
