import { ENQUIRY_ENDPOINT } from "./constants";

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  /** Program slug ("hindustani-vocals", …) or "general". Drives auto-segregation. */
  program_of_interest: string;
  preferred_timing?: string;
  message?: string;
  /** Where the enquiry was submitted from, e.g. "home_contact_form" or "program_page:hindustani-tabla" */
  source: string;
}

export interface EnquiryResult {
  ok: boolean;
  message: string;
}

export async function submitEnquiry(
  payload: EnquiryPayload
): Promise<EnquiryResult> {
  try {
    const res = await fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      return {
        ok: false,
        message:
          data?.message ||
          "Something went wrong. Please try again, or message us on WhatsApp.",
      };
    }

    return {
      ok: true,
      message:
        data.message || "Thank you! We'll be in touch within two working days.",
    };
  } catch {
    return {
      ok: false,
      message:
        "We couldn't reach the server. Please check your connection, or message us on WhatsApp.",
    };
  }
}
