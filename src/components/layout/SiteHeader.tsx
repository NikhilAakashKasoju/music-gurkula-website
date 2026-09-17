"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { WHATSAPP_LINK, CONTACT_SECTION_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Our way", href: "#our-way" },
  { label: "Programs", href: "#programs" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: `#${CONTACT_SECTION_ID}` },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-lavender-900/10 bg-lavender-950 text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo dark />

        <nav className="hidden items-center gap-8 text-sm font-medium text-cream/85 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-begonia-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-cream/85 transition hover:text-begonia-400"
          >
            <Phone className="h-4 w-4" />
            WhatsApp us
          </a>
          <a
            href={`#${CONTACT_SECTION_ID}`}
            className="rounded-full bg-begonia-500 px-5 py-2.5 text-sm font-semibold text-lavender-950 transition hover:bg-begonia-400"
          >
            Begin your journey
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-cream/10 bg-lavender-950 transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-cream/85 hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-2 py-2.5 text-sm font-medium text-cream/85 hover:bg-white/5"
          >
            WhatsApp us
          </a>
          <a
            href={`#${CONTACT_SECTION_ID}`}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-begonia-500 px-5 py-2.5 text-center text-sm font-semibold text-lavender-950"
          >
            Begin your journey
          </a>
        </div>
      </div>
    </header>
  );
}
