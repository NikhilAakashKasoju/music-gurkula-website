import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-begonia-500 text-white shadow-lg shadow-begonia-900/30 transition hover:bg-begonia-600"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
