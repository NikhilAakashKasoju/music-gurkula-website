> **This folder is no longer used.** The site now handles enquiries and the
> admin dashboard directly inside the Next.js app — see `src/app/api/enquiries/`,
> `src/app/admin/`, and `src/lib/server/`, and the root `README.md`'s
> "Enquiries & admin dashboard" section. This PHP version is kept only for
> reference and can be deleted once you're comfortable with the new one.

# Music Gurukula — PHP + MySQL backend (superseded)

Plain PHP (no framework) that receives enquiries from the Next.js frontend
and powers a small admin dashboard. Built to be easy to drop onto shared
hosting: PDO/MySQL, session-based auth, no Composer dependencies.

## What's here

```
backend/
  config.php          Site-wide settings (DB creds, allowed CORS origins, program list)
  db.php               PDO connection helper
  schema.sql           Database schema (2 tables: enquiries, admin_users)
  seed_admin.php        CLI script to create/reset an admin login
  includes/
    functions.php       Program-slug auto-segregation + small helpers
    cors.php             CORS header handling for the public API
  api/
    enquiries.php        POST endpoint the frontend forms submit to
  admin/
    login.php / logout.php
    dashboard.php         Enquiries list, filterable by program + status
    update_status.php     AJAX endpoint the dashboard uses to change status
    includes/auth.php     Session guard
    assets/admin.css
```

## 1. Create the database

```sql
CREATE DATABASE music_gurukula CHARACTER SET utf8mb4;
CREATE USER 'music_gurukula'@'localhost' IDENTIFIED BY 'choose-a-strong-password';
GRANT ALL PRIVILEGES ON music_gurukula.* TO 'music_gurukula'@'localhost';
FLUSH PRIVILEGES;
```

```bash
mysql -u music_gurukula -p music_gurukula < schema.sql
```

## 2. Configure

Either edit the fallback values at the top of `config.php`, or (recommended)
set these as real environment variables on your host:

| Variable          | Example                                 |
|-------------------|------------------------------------------|
| `DB_HOST`         | `127.0.0.1`                              |
| `DB_PORT`         | `3306`                                   |
| `DB_NAME`         | `music_gurukula`                         |
| `DB_USER`         | `music_gurukula`                         |
| `DB_PASS`         | your password                            |
| `ALLOWED_ORIGINS` | `https://musicgurukula.com,https://www.musicgurukula.com` |

`ALLOWED_ORIGINS` is comma-separated and must include every origin the
Next.js site is served from (add your local dev URL too while testing).

## 3. Create an admin login

```bash
php seed_admin.php admin "a-strong-password"
```

Run this again with the same username to reset a password. **Delete or
move `seed_admin.php` out of the web root once you've created your
account(s)** — it refuses to run over HTTP, but there's no reason to leave
it deployed.

## 4. Run it

Local development, using PHP's built-in server from this folder:

```bash
php -S localhost:8000
```

The API is then at `http://localhost:8000/api/enquiries.php` and the
dashboard at `http://localhost:8000/admin/login.php`. Point the frontend's
`NEXT_PUBLIC_API_URL` at `http://localhost:8000/api`.

In production, point your web server's document root at this `backend/`
folder (Apache/Nginx + PHP-FPM, or most shared-hosting cPanel setups —
upload the folder as a subdomain like `api.musicgurukula.com`, or as a
`/backend` path alongside the exported Next.js site). The included
`.htaccess` blocks direct access to `config.php`, `db.php`, `schema.sql`,
and everything under `includes/`.

## How auto-segregation works

Every enquiry form on the frontend sends a `program_of_interest` value —
the program's slug (`hindustani-vocals`, `hindustani-tabla`,
`hindustani-flute`, `bharatanatyam`) on a program page, or whatever the
visitor picked from the dropdown on the homepage's general enquiry form
(including `general` for "not sure yet"). `includes/functions.php`'s
`resolve_path_slug()` normalises that into a `path_slug` column, matching
it case-insensitively against the known slugs and labels and falling back
to `general` for anything unrecognised — so a submission is never rejected
just because the frontend's wording drifts from the backend's. The admin
dashboard's tabs and counts are all built from that same `path_slug`.

If you add a fifth program later, add it to `PROGRAM_PATHS` in
`config.php` (and to `PROGRAMS` in the frontend's `src/lib/programs.ts`) —
the dashboard tabs and stat cards pick it up automatically.

## Security notes

- Passwords are hashed with `password_hash()` / verified with
  `password_verify()` — never stored in plain text.
- The dashboard's status-update endpoint checks a CSRF token and the
  session, and only accepts the four known status values.
- The public `enquiries.php` endpoint only accepts POST, only allows the
  origins you list, validates required fields, and uses parameterised
  queries throughout (no string-built SQL).
- There's no rate limiting or CAPTCHA on the public endpoint. For a
  low-traffic school site that's usually fine; add one (e.g. a simple
  honeypot field, or your host's WAF) if spam becomes a problem.
