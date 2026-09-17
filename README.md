# Music Gurukula

A marketing site for an Indian classical music & dance school: a Next.js
frontend (lavender / begonia / coral / sunshine theme, illustrated program
art, and a framer-motion parallax hero) with enquiries handled by the same
app's own API route and stored in Postgres, feeding a small admin dashboard
that auto-sorts enquiries by program of interest.

```
music-gurukula/
  src/
    app/api/enquiries/    POST endpoint the enquiry forms submit to
    app/admin/            Admin dashboard (login + enquiries list)
    lib/server/           Database, auth, and enquiry-segregation logic
  backend/                 Legacy PHP + MySQL version — no longer used,
                            kept only for reference (see backend/README.md)
```

Everything under **Programs**, **teachers**, **testimonials**, phone
numbers, email addresses is a clearly marked placeholder — search the
codebase for `[PLACEHOLDER]` to find every spot that needs a real value
before launch.

## Running it locally

```bash
npm install
cp .env.local.example .env.local   # then fill in DATABASE_URL and ADMIN_SESSION_SECRET
npm run dev
```

Visit `http://localhost:3000`. Four program pages live at
`/programs/hindustani-vocals`, `/programs/hindustani-tabla`,
`/programs/hindustani-flute`, and `/programs/bharatanatyam` — each has its
own hero, curriculum breakdown, and an "ask about this program" form, plus
links to the other three paths underneath.

Key files:

- `src/lib/programs.ts` — the single source of truth for the four
  programs (names, descriptions, curriculum, which illustrated icon each
  uses). Add a fifth program here (and to `PROGRAM_PATHS` in
  `src/lib/server/enquiries.ts`) and both a new page and a new admin
  dashboard tab appear automatically.
- `src/lib/constants.ts` — WhatsApp number, site name, the enquiry API path.
- `src/components/illustrations/`, `src/components/parallax/` — the
  hand-drawn SVG illustrations and mouse/scroll-driven motion system
  (framer-motion), including the animated tabla/vocalist/flute hero scene.
- `src/app/globals.css` — the lavender/begonia/coral/sunshine color tokens
  (Tailwind v4's `@theme` block). Change these to retheme the whole site.
- `src/components/shared/EnquiryForm.tsx` — the one form component used
  both by the homepage's general enquiry and every program page's
  program-specific enquiry; it posts to `/api/enquiries`.

"WhatsApp us" links to `wa.me/918008018178` (see `WHATSAPP_NUMBER` in
`src/lib/constants.ts`). "Begin your journey" and the footer's "Enroll /
inquire" link scroll to the contact section (`#contact`) on the homepage.

## Enquiries & admin dashboard

There's no separate backend to host — `src/app/api/enquiries/route.ts`
receives enquiry-form submissions (same origin, no CORS to configure), and
`src/app/admin/` is a small password-protected dashboard at `/admin` that
lists them, filterable by program and status, with a per-row status
dropdown (New / Contacted / Enrolled / Closed). Both read and write the
same Postgres database via `src/lib/server/`.

### 1. Set up the database

In the Vercel dashboard: **Project → Storage → Create Database → Postgres**
(backed by Neon — free tier is plenty for a school site's enquiry volume).
Connecting it to the project injects `DATABASE_URL` automatically; tables
are created on first use, so there's no migration step to run by hand.

For local development, pull that same connection string down:

```bash
vercel env pull .env.local
```

### 2. Set the session secret

Generate one value and set it both locally and in Vercel's Environment
Variables:

```bash
openssl rand -base64 32
```

Put it in `.env.local` (and Vercel) as `ADMIN_SESSION_SECRET`.

### 3. Create an admin login

```bash
node --env-file=.env.local scripts/seed-admin.mjs admin "a-strong-password"
```

Run it again with the same username to reset a password. This talks
directly to the database, so it works whether you run it against your
local `.env.local` or one pulled from the production project.

### How auto-segregation works

Every enquiry form sends a `program_of_interest` value — the program's
slug (`hindustani-vocals`, `hindustani-tabla`, `hindustani-flute`,
`bharatanatyam`) on a program page, or whatever the visitor picked from the
dropdown on the homepage's general enquiry form (including `general` for
"not sure yet"). `src/lib/server/enquiries.ts`'s `resolvePathSlug()`
normalises that into a `path_slug` column, matching it case-insensitively
against the known slugs and labels and falling back to `general` for
anything unrecognised. The admin dashboard's tabs and counts are all built
from that same `path_slug`.

## Building for production

```bash
npm run build
npm run start
```

Or just push to GitHub and deploy on Vercel — `DATABASE_URL` and
`ADMIN_SESSION_SECRET` are the only environment variables it needs.

## Things to do before launch

- Replace every `[PLACEHOLDER]` value (phone, email, address, Instagram
  handle, fees, testimonial attribution).
- Change the seeded admin password
  (`node --env-file=.env.local scripts/seed-admin.mjs <user> <new-pass>`).
- Confirm the WhatsApp number in `src/lib/constants.ts` is correct.
- Delete the unused `backend/` folder once you've confirmed the new
  `/admin` dashboard has everything you need.
