// Central place for site-wide constants. Update these when real details are available.

export const SITE_NAME = "Music Gurukula";

// WhatsApp number the "WhatsApp us" links should open a chat with (no + or spaces).
export const WHATSAPP_NUMBER = "918008018178";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// Enquiries are handled by this same Next.js app's own API route (see
// src/app/api/enquiries/route.ts) and stored in Postgres — there's no
// separate backend host or CORS setup to configure.
export const ENQUIRY_ENDPOINT = "/api/enquiries";

// Anchor id the header nav / "Begin your journey" / footer links scroll to.
export const CONTACT_SECTION_ID = "contact";
