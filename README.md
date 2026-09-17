# Music Gurukula

A marketing site for an Indian classical music & dance school: a Next.js
frontend with a few light 3D flourishes (a floating bansuri, a tabla pair,
music notes) built in Tailwind's bamboo-green theme, plus a plain PHP +
MySQL backend that collects enquiries and auto-sorts them by program of
interest into a small admin dashboard.

```
music-gurukula/
  src/                 Next.js app (frontend)
  backend/             PHP + MySQL API and admin dashboard
```

Everything under **Programs**, **teachers**, **testimonials**, phone
numbers, email addresses, and every photo is a clearly marked placeholder —
search the codebase for `[PLACEHOLDER]` to find every spot that needs a
real value before launch. No stock or scraped images were used anywhere;
photo spots are dashed placeholder boxes ready to swap for real
`<Image>`s.

## Frontend (Next.js)

```bash
npm install
cp .env.local.example .env.local   # then point NEXT_PUBLIC_API_URL at your backend
npm run dev
```

Visit `http://localhost:3000`. Four program pages live at
`/programs/hindustani-vocals`, `/programs/hindustani-tabla`,
`/programs/hindustani-flute`, and `/programs/bharatanatyam` — each has its
own hero, curriculum breakdown, and an "ask about this program" form, plus
links to the other three paths underneath.

Key files:

- `src/lib/programs.ts` — the single source of truth for the four
  programs (names, descriptions, curriculum, which 3D model each uses).
  Add a fifth program here (and to `PROGRAM_PATHS` in
  `backend/config.php`) and both a new page and a new admin dashboard tab
  appear automatically.
- `src/lib/constants.ts` — WhatsApp number, backend API URL, site name.
- `src/components/three/` — the 3D bits (`@react-three/fiber` +
  `@react-three/drei`), built from primitive geometry rather than
  external model/image assets, so there's nothing to license or swap out.
- `src/app/globals.css` — the bamboo-green color tokens (Tailwind v4's
  `@theme` block). Change these to retheme the whole site.
- `src/components/shared/EnquiryForm.tsx` — the one form component used
  both by the homepage's general enquiry and every program page's
  program-specific enquiry; it posts to the PHP backend.

"WhatsApp us" links to `wa.me/918008018178` (see `WHATSAPP_NUMBER` in
`src/lib/constants.ts`). "Begin your journey" and the footer's "Enroll /
inquire" link scroll to the contact section (`#contact`) on the homepage.

### Building for production

```bash
npm run build
npm run start
```

Or deploy to any Next.js host (Vercel, a Node server, etc). Set
`NEXT_PUBLIC_API_URL` in that environment to your deployed backend's `/api`
URL before building — it's baked in at build time.

## Backend (PHP + MySQL)

See [`backend/README.md`](backend/README.md) for full setup — creating the
database, configuring `ALLOWED_ORIGINS` for CORS, seeding an admin login,
and running it locally or on shared hosting.

In short:

```bash
cd backend
mysql -u root -p -e "CREATE DATABASE music_gurukula CHARACTER SET utf8mb4;"
mysql -u root -p music_gurukula < schema.sql
php seed_admin.php admin "a-strong-password"
php -S localhost:8000
```

Then the admin dashboard is at `http://localhost:8000/admin/login.php` and
the enquiry API is at `http://localhost:8000/api/enquiries.php`.

### How enquiries flow

1. A visitor submits either the homepage's general enquiry form (picking a
   program from a dropdown) or a program page's "ask about this program"
   form (program is fixed to that page).
2. The frontend POSTs JSON to `backend/api/enquiries.php`.
3. The backend normalises whatever program value it received into one of
   the known path slugs (`hindustani-vocals`, `hindustani-tabla`,
   `hindustani-flute`, `bharatanatyam`, or `general`) and stores the
   enquiry with that as its category, plus which form it came from.
4. The admin dashboard (`backend/admin/dashboard.php`) shows every
   enquiry with tabs and counts per program, filterable by status, with a
   status dropdown (New / Contacted / Enrolled / Closed) per row.

## Things to do before launch

- Replace every `[PLACEHOLDER]` value (phone, email, address, Instagram
  handle, fees, testimonial attribution).
- Swap the dashed photo placeholders for real photography.
- Change the seeded admin password (`php seed_admin.php <user> <new-pass>`).
- Point `NEXT_PUBLIC_API_URL` and `ALLOWED_ORIGINS` at your real domains.
- Confirm the WhatsApp number in `src/lib/constants.ts` is correct.
