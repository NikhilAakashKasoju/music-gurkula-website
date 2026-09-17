#!/usr/bin/env node
/**
 * One-time helper to create (or reset) an admin dashboard user.
 *
 * Usage:
 *   1. Pull the project's environment variables (needs the Vercel CLI:
 *      `npm i -g vercel`, then `vercel link` once):
 *        vercel env pull .env.local
 *   2. Run this script with those variables loaded:
 *        node --env-file=.env.local scripts/seed-admin.mjs <username> <password>
 *
 * Run this from your own machine, not as a deployed endpoint — it's a
 * command-line tool only, mirroring the old backend/seed_admin.php.
 */

import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const [, , username, password] = process.argv;

if (!username || !password) {
  console.error("Usage: node --env-file=.env.local scripts/seed-admin.mjs <username> <password>");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Please choose a password with at least 8 characters.");
  process.exit(1);
}

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error(
    "No database connection string found in the environment.\n" +
      "Run `vercel env pull .env.local` first, then re-run this with " +
      "`node --env-file=.env.local scripts/seed-admin.mjs ...`."
  );
  process.exit(1);
}

const sql = neon(connectionString);

await sql.query(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id            SERIAL PRIMARY KEY,
    username      VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`);

const hash = await bcrypt.hash(password, 10);

await sql.query(
  `INSERT INTO admin_users (username, password_hash)
   VALUES ($1, $2)
   ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
  [username, hash]
);

console.log(`Admin user '${username}' is ready.`);
