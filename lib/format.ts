export function formatDate(iso: string, lang: string, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(lang === "uz" ? "uz-Latn-UZ" : "en-US", opts);
}
