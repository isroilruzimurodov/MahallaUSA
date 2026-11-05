import type { Locale } from "@/lib/i18n";
import { getAnnouncement } from "@/lib/cms";

/** Banner staff turn on in /admin → Announcements. Shows nothing when there is none. */
export default async function AnnouncementBar({ lang }: { lang: Locale }) {
  const a = await getAnnouncement();
  if (!a) return null;
  const text = lang === "uz" ? a.textUz : a.textEn;
  return (
    <div className="bg-teal text-white">
      <p className="mx-auto max-w-page px-4 py-2.5 text-center text-[15px] leading-6 sm:px-8">
        {a.link ? (
          <a href={a.link} className="font-semibold text-white underline hover:text-white" target={a.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
            {text} →
          </a>
        ) : (
          text
        )}
      </p>
    </div>
  );
}
