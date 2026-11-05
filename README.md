# mahallausa.org

Website of MahallaUSA — Uzbek-American Association (Brooklyn, NY). English and Uzbek.

Built with Next.js (App Router), TypeScript and Tailwind CSS. Colors, type and spacing follow the MahallaUSA design system.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run todo       # lists every [placeholder] still waiting for real information
```

## Where things live

| What | File |
| --- | --- |
| Facts: address, EIN, emails, leadership, numbers, donation links, sponsor prices | `content/site.ts` |
| All English text | `content/en.ts` |
| All Uzbek text (same shape as English — the build fails if a line is missing) | `content/uz.ts` |
| Newcomer guides (both languages, with sources and review dates) | `content/guides.ts` |
| Events, announcements, news | the admin panel at /admin (events can also go in `content/events.ts`) |
| ZiyoArt classes | `content/ziyoart.ts` |
| Logo | `public/logo.png` |

Anything written in `[square brackets]` is a placeholder; the site highlights it so it is easy to spot. Fill it in `content/` and it updates every page.

## Admin panel (for staff)

Staff open **mahallausa.org/admin**, sign in, and add **events**, **announcements** (a banner at the top of every page) and **news** — each in English and Uzbek. Changes appear on the site about a minute after "Publish". No code needed.

It runs on [Sanity](https://www.sanity.io) (free plan: up to 20 staff accounts). One-time setup:

1. Create a free account at sanity.io and a new project named "MahallaUSA" with a dataset called `production`.
2. In the project's settings → API → CORS origins, add `https://mahallausa.org` and `http://localhost:3000` (tick "Allow credentials").
3. Put the project ID in Vercel as `NEXT_PUBLIC_SANITY_PROJECT_ID` (and `NEXT_PUBLIC_SANITY_DATASET=production`), then redeploy.
4. Invite staff from the project's Members page.

Until it is connected, /admin shows a "not connected" note and the site uses `content/events.ts`.

## Forms

Every form posts to `/api/forms`, which emails the team through [Resend](https://resend.com). Set these on Vercel (see `.env.example`):

- `RESEND_API_KEY`
- `FORMS_TO_EMAIL` — who receives submissions (comma-separated)
- `FORMS_FROM_EMAIL` — a sender on the verified mahallausa.org domain

Without a key, submissions are only logged, so nothing breaks before email is set up. Forms use a hidden honeypot field and a rate limit instead of a CAPTCHA.

## Donations

Donations and ZiyoArt tuition run on Zeffy (no fees for the nonprofit). Put the Zeffy embed URLs in `content/site.ts` (`donateFormUrl`, `ziyoartEnrollUrl`).

## Deploy

1. Push this repository to GitHub.
2. Import it on [vercel.com](https://vercel.com) (free Hobby plan; apply for Vercel's nonprofit program if needed).
3. Add the environment variables above.
4. Point mahallausa.org at Vercel in Namecheap (Vercel shows the exact DNS records).

## Keeping it healthy

- Re-check each newcomer guide against its official sources at least every 6 months and update `reviewed`.
- Uzbek text is a draft: have a staff member review `content/uz.ts` before launch.
- Legal pages are drafts: have leadership review them before launch.
