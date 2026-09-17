import { neon } from "@neondatabase/serverless";

/**
 * Serverless Postgres connection, powered by Neon.
 *
 * This is the "no separate hosting" replacement for the old PHP+MySQL
 * backend: the database lives inside your Vercel project (Storage tab ->
 * Create Database -> Postgres, which is backed by Neon), so there's no
 * separate server, host, or account to manage on top of Vercel itself.
 *
 * Vercel injects the connection string automatically once that storage is
 * connected to this project — as POSTGRES_URL in the classic integration,
 * or DATABASE_URL in the newer native Neon integration. We accept either
 * name so this works whichever way it was connected.
 */
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  throw new Error(
    "No database connection string found. Connect a Postgres database to this " +
      "project in the Vercel dashboard (Storage -> Create Database -> Postgres), " +
      "or set DATABASE_URL / POSTGRES_URL locally — see .env.local.example."
  );
}

export const sql = neon(connectionString);

let schemaReady: Promise<void> | null = null;

/**
 * Creates the tables the app needs if they don't already exist. Cheap and
 * idempotent, so it's safe to call at the top of every request; the result
 * is cached per warm function instance so it only actually runs once.
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql.query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id            SERIAL PRIMARY KEY,
          username      VARCHAR(100) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `);

      await sql.query(`
        CREATE TABLE IF NOT EXISTS enquiries (
          id                   SERIAL PRIMARY KEY,
          name                 VARCHAR(150) NOT NULL,
          phone                VARCHAR(30)  NOT NULL,
          email                VARCHAR(150),
          program_of_interest  VARCHAR(100) NOT NULL,
          path_slug            VARCHAR(50)  NOT NULL DEFAULT 'general',
          preferred_timing     VARCHAR(150),
          message              TEXT,
          source               VARCHAR(100) NOT NULL DEFAULT 'unknown',
          status               VARCHAR(20)  NOT NULL DEFAULT 'new'
                                 CHECK (status IN ('new','contacted','enrolled','closed')),
          created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `);

      await sql.query(
        `CREATE INDEX IF NOT EXISTS idx_enquiries_path_slug ON enquiries (path_slug)`
      );
      await sql.query(
        `CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries (status)`
      );
      await sql.query(
        `CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries (created_at)`
      );
    })();
  }
  return schemaReady;
}
