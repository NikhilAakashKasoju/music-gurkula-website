import { ensureSchema, sql } from "./db";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/lib/enquiryStatus";

// Re-exported so existing server-side imports of these two names from this
// file keep working unchanged. Client components should import them from
// "@/lib/enquiryStatus" directly instead (see that file for why).
export { ENQUIRY_STATUSES };
export type { EnquiryStatus };

/**
 * Keep this in sync with src/lib/programs.ts on the frontend. The "slug"
 * values here are what the enquiry forms send as program_of_interest, and
 * what enquiries get auto-segregated into.
 */
export const PROGRAM_PATHS: Record<string, string> = {
  "hindustani-vocals": "Hindustani Vocals",
  "hindustani-tabla": "Hindustani Tabla",
  "hindustani-flute": "Hindustani Flute",
  bharatanatyam: "Bharatanatyam",
  general: "General / Not sure yet",
};

export type PathSlug = keyof typeof PROGRAM_PATHS;

export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  program_of_interest: string;
  path_slug: string;
  preferred_timing: string | null;
  message: string | null;
  source: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

/**
 * Turn whatever the frontend sent as "program of interest" into one of the
 * known path slugs, so every enquiry can be auto-segregated even if the
 * value doesn't match exactly (extra whitespace, different casing, a
 * display name instead of a slug, etc). Anything unrecognised files under
 * "general" rather than being rejected.
 */
export function resolvePathSlug(raw: string | null): PathSlug {
  const known = Object.keys(PROGRAM_PATHS);

  if (raw === null) return "general";

  const slug = raw.toLowerCase().trim().replace(/\s+/g, "-");
  if (known.includes(slug)) return slug as PathSlug;

  const trimmedLower = raw.trim().toLowerCase();
  for (const [pathSlug, label] of Object.entries(PROGRAM_PATHS)) {
    if (label.toLowerCase() === trimmedLower) return pathSlug as PathSlug;
  }

  return "general";
}

export function pathLabel(slug: string): string {
  return (
    PROGRAM_PATHS[slug] ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export function isValidEmail(email: string | null): boolean {
  if (email === null || email === "") return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Trim a string and cap its length, returning null for empty results. */
export function cleanStr(
  value: unknown,
  maxLength = 255
): string | null {
  if (typeof value !== "string") return null;
  const stripped = value.replace(/<[^>]*>/g, "").trim();
  if (stripped === "") return null;
  return stripped.slice(0, maxLength);
}

export interface NewEnquiryInput {
  name: string;
  phone: string;
  email: string | null;
  programRaw: string | null;
  preferredTiming: string | null;
  message: string | null;
  source: string;
}

export async function insertEnquiry(input: NewEnquiryInput) {
  await ensureSchema();
  const pathSlug = resolvePathSlug(input.programRaw);

  await sql.query(
    `INSERT INTO enquiries
       (name, phone, email, program_of_interest, path_slug, preferred_timing, message, source)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      input.name,
      input.phone,
      input.email,
      input.programRaw ?? "general",
      pathSlug,
      input.preferredTiming,
      input.message,
      input.source,
    ]
  );

  return { pathSlug };
}

export interface EnquiryFilters {
  path: string; // "all" or a known path slug
  status: string; // "all" or a known status
  q: string;
  page: number;
}

const PER_PAGE = 25;

export async function listEnquiries(filters: EnquiryFilters) {
  await ensureSchema();

  const where: string[] = [];
  const params: unknown[] = [];

  if (filters.path !== "all") {
    params.push(filters.path);
    where.push(`path_slug = $${params.length}`);
  }
  if (filters.status !== "all") {
    params.push(filters.status);
    where.push(`status = $${params.length}`);
  }
  if (filters.q !== "") {
    params.push(`%${filters.q}%`);
    const p = params.length;
    where.push(`(name ILIKE $${p} OR phone ILIKE $${p} OR email ILIKE $${p})`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const totalRes = await sql.query(
    `SELECT COUNT(*)::int AS c FROM enquiries ${whereSql}`,
    params
  );
  const totalFiltered = (totalRes as { c: number }[])[0]?.c ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PER_PAGE));
  const page = Math.min(Math.max(1, filters.page), totalPages);
  const offset = (page - 1) * PER_PAGE;

  const listParams = [...params, PER_PAGE, offset];
  const rows = await sql.query(
    `SELECT * FROM enquiries ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${listParams.length - 1} OFFSET $${listParams.length}`,
    listParams
  );

  return {
    enquiries: rows as unknown as Enquiry[],
    page,
    totalPages,
    totalFiltered,
  };
}

export async function getEnquiryStats() {
  await ensureSchema();

  const countsRes = (await sql.query(
    `SELECT path_slug, COUNT(*)::int AS c FROM enquiries GROUP BY path_slug`
  )) as { path_slug: string; c: number }[];

  const countsByPath: Record<string, number> = Object.fromEntries(
    Object.keys(PROGRAM_PATHS).map((slug) => [slug, 0])
  );
  let totalCount = 0;
  for (const row of countsRes) {
    if (row.path_slug in countsByPath) countsByPath[row.path_slug] = row.c;
    totalCount += row.c;
  }

  const newRes = (await sql.query(
    `SELECT COUNT(*)::int AS c FROM enquiries WHERE status = 'new'`
  )) as { c: number }[];

  return {
    countsByPath,
    totalCount,
    newCount: newRes[0]?.c ?? 0,
  };
}

export async function updateEnquiryStatus(id: number, status: EnquiryStatus) {
  await ensureSchema();
  await sql.query(
    `UPDATE enquiries SET status = $1, updated_at = now() WHERE id = $2`,
    [status, id]
  );
}
