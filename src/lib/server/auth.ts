import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { ensureSchema, sql } from "./db";

export const ADMIN_SESSION_COOKIE = "mg_admin_session";
const SESSION_DURATION = "7d";

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Generate one with `openssl rand -base64 32` " +
        "and add it to your environment variables — see .env.local.example."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  adminId: number;
  username: string;
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.adminId !== "number" || typeof payload.username !== "string") {
      return null;
    }
    return { adminId: payload.adminId, username: payload.username };
  } catch {
    return null;
  }
}

/** Reads and verifies the admin session from cookies in a Server Component/Action. */
export async function getCurrentAdmin(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export interface AdminUserRow {
  id: number;
  username: string;
  password_hash: string;
}

export async function findAdminByUsername(
  username: string
): Promise<AdminUserRow | null> {
  await ensureSchema();
  const rows = (await sql.query(
    `SELECT id, username, password_hash FROM admin_users WHERE username = $1 LIMIT 1`,
    [username]
  )) as AdminUserRow[];
  return rows[0] ?? null;
}
