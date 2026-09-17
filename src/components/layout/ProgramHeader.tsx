import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";

export default function ProgramHeader() {
  return (
    <header className="border-b border-cream/10 bg-bamboo-950 text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo dark />
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-cream/80 transition hover:text-gold-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </header>
  );
}
