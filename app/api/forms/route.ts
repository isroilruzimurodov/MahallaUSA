import { NextResponse } from "next/server";

// Receives every form on the site (contact, volunteer, sponsor, newsletter)
// and emails it to the team through Resend. Without RESEND_API_KEY it only logs,
// so the site works before email is set up.

const KINDS = new Set(["contact", "volunteer", "sponsor", "newsletter"]);
const recent = new Map<string, number[]>(); // simple per-IP rate limit (per server instance)

function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 8;
}

const clean = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Bots fill the hidden "website" field; pretend success.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const kind = clean(body.kind, 20);
  const email = clean(body.email, 200);
  if (!KINDS.has(kind) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  const fields = {
    name: clean(body.name, 200),
    email,
    phone: clean(body.phone, 50),
    organization: clean(body.organization, 200),
    interest: clean(body.interest, 200),
    message: clean(body.message),
    page: clean(body.page, 200),
  };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL;
  if (!key || !to) {
    console.log(`[forms] ${kind}`, fields);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${k}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FORMS_FROM_EMAIL ?? "website@mahallausa.org",
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject: `[mahallausa.org] ${kind}${fields.name ? ` — ${fields.name}` : ""}`,
      html: rows,
    }),
  });
  if (!res.ok) {
    console.error("[forms] resend failed", res.status, await res.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
