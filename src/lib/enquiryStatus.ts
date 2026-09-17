/**
 * Just the status enum — kept in its own tiny, dependency-free file so
 * client components (like the dashboard's status dropdown) can import it
 * without pulling in src/lib/server/enquiries.ts, which talks to Postgres.
 * Importing server-only code from a client component bundles it into the
 * browser JS, where env vars like DATABASE_URL don't exist — that was the
 * cause of the "No database connection string found" crash on the client.
 */
export type EnquiryStatus = "new" | "contacted" | "enrolled" | "closed";

export const ENQUIRY_STATUSES: EnquiryStatus[] = [
  "new",
  "contacted",
  "enrolled",
  "closed",
];
