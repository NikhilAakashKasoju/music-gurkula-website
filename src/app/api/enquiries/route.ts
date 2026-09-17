import { NextRequest, NextResponse } from "next/server";
import {
  cleanStr,
  insertEnquiry,
  isValidEmail,
} from "@/lib/server/enquiries";

/**
 * POST /api/enquiries
 *
 * Receives an enquiry from the homepage general enquiry form, or a program
 * page's "ask about this program" form, auto-segregates it into a program
 * path, and stores it for the admin dashboard.
 *
 * This runs as a Next.js route handler in the same deployment as the rest
 * of the site (no separate backend host, no CORS needed — it's same-origin).
 *
 * Expected JSON body:
 * {
 *   "name": "Priya S.",
 *   "phone": "+91 90000 00000",
 *   "email": "priya@example.com",             // optional
 *   "program_of_interest": "hindustani-tabla", // slug, or "general"
 *   "preferred_timing": "Weekday evenings",    // optional
 *   "message": "...",                          // optional
 *   "source": "home_contact_form"              // or "program_page:<slug>"
 * }
 */
export async function POST(request: NextRequest) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    data = {};
  }

  const name = cleanStr(data.name, 150);
  const phone = cleanStr(data.phone, 30);
  const email = cleanStr(data.email, 150);
  const programRaw = cleanStr(data.program_of_interest, 100);
  const preferredTiming = cleanStr(data.preferred_timing, 150);
  const message = cleanStr(data.message, 2000);
  const source = cleanStr(data.source, 100) ?? "unknown";

  const errors: string[] = [];
  if (name === null) errors.push("Please share your name.");
  if (phone === null) errors.push("Please share a phone or WhatsApp number.");
  if (!isValidEmail(email)) errors.push("That email address doesn't look right.");

  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, message: errors.join(" ") },
      { status: 422 }
    );
  }

  try {
    const { pathSlug } = await insertEnquiry({
      name: name!,
      phone: phone!,
      email,
      programRaw,
      preferredTiming,
      message,
      source,
    });

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! We'll be in touch within two working days.`,
      path: pathSlug,
    });
  } catch (err) {
    console.error("[music-gurukula] Failed to insert enquiry:", err);
    return NextResponse.json(
      {
        success: false,
        message: "We could not save your enquiry. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
