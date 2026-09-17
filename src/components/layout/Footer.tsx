import Link from "next/link";
import { Music2 } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import LavenderSprigIcon from "@/components/icons/LavenderSprigIcon";
import VineIcon from "@/components/icons/VineIcon";
import { CONTACT_SECTION_ID, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-lavender-950 text-cream">
      <VineIcon
        className="pointer-events-none absolute -top-1 left-1/2 h-6 w-40 -translate-x-1/2 text-lavender-400 opacity-40 sm:w-64"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-begonia-500 text-lavender-950">
              <Music2 className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-medium">
              Music <span className="text-begonia-500">Gurukula</span>
            </span>
            <LavenderSprigIcon className="h-6 w-3 text-begonia-400 opacity-70" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-cream/65">
            A home for Indian classical music and dance, built on attention,
            patience, and joy.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-begonia-400">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/#programs" className="hover:text-begonia-400">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/#our-way" className="hover:text-begonia-400">
                Our way
              </Link>
            </li>
            <li>
              <Link
                href={`/#${CONTACT_SECTION_ID}`}
                className="hover:text-begonia-400"
              >
                Enroll / inquire
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-begonia-400">
                Admin inquiries
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-begonia-400">
            Connect
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>[PLACEHOLDER: Bengaluru, India]</li>
            <li>[PLACEHOLDER: Instagram handle]</li>
          </ul>
          <a
            href="#"
            aria-label="Instagram"
            className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-begonia-400 hover:text-begonia-400"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-5 text-center text-xs text-cream/45">
        © {new Date().getFullYear()} {SITE_NAME} · Content marked [PLACEHOLDER]
        is ready to replace
      </div>
    </footer>
  );
}
