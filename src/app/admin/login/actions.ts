"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  findAdminByUsername,
} from "@/lib/server/auth";

export interface LoginState {
  error: string | null;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Please enter your username and password." };
  }

  const admin = await findAdminByUsername(username);
  const matches =
    admin !== null && (await bcrypt.compare(password, admin.password_hash));

  if (!admin || !matches) {
    return { error: "Incorrect username or password." };
  }

  const token = await createSessionToken({
    adminId: admin.id,
    username: admin.username,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin/dashboard");
}
