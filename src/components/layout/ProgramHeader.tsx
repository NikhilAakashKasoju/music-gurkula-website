import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Logo from "./Logo";

export default function ProgramHeader() {
  return (
    <header className="border-b border-cream/10 bg-lavender-950 text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo dark />
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-cream/80 transition hover:text-begonia-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/admin"
            title="Admin dashboard"
            aria-label="Admin dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/50 transition hover:border-cream/30 hover:text-cream"
          >
            <LayoutDashboard className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
