import Link from "next/link";
import { Music2 } from "lucide-react";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-begonia-500 text-lavender-950">
        <Music2 className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </span>
      <span
        className={`font-display text-lg font-medium ${
          dark ? "text-cream" : "text-lavender-950"
        }`}
      >
        Music <span className="text-begonia-500">Gurukula</span>
      </span>
    </Link>
  );
}
