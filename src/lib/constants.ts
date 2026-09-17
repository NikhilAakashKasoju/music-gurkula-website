// Central place for site-wide constants. Update these when real details are available.

export const SITE_NAME = "Music Gurukula";

// WhatsApp number the "WhatsApp us" links should open a chat with (no + or spaces).
export const WHATSAPP_NUMBER = "918008018178";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// The PHP backend that receives enquiries and powers the admin dashboard.
// Set NEXT_PUBLIC_API_URL in .env.local to point at your deployed backend,
// e.g. https://api.musicgurukula.com or https://musicgurukula.com/backend
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "/backend/api";

export const ENQUIRY_ENDPOINT = `${API_BASE_URL}/enquiries.php`;

// Anchor id the header nav / "Begin your journey" / footer links scroll to.
export const CONTACT_SECTION_ID = "contact";
