"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, getCurrentAdmin } from "@/lib/server/auth";
import {
  ENQUIRY_STATUSES,
  updateEnquiryStatus,
  type EnquiryStatus,
} from "@/lib/server/enquiries";

export async function updateStatusAction(id: number, status: string) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Not signed in.");
  }
  if (!ENQUIRY_STATUSES.includes(status as EnquiryStatus)) {
    throw new Error("Invalid status.");
  }

  await updateEnquiryStatus(id, status as EnquiryStatus);
  revalidatePath("/admin/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
