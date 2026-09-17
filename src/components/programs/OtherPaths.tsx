import Link from "next/link";
import { NatureCorner } from "@/components/parallax/NatureScatter";
import type { Program } from "@/lib/programs";

const SHORT_NAME: Record<string, string> = {
  "hindustani-vocals": "Vocals",
  "hindustani-tabla": "Tabla",
  "hindustani-flute": "Flute",
  bharatanatyam: "Dance",
};

export default function OtherPaths({ programs }: { programs: Program[] }) {
  return (
    <section className="relative overflow-hidden bg-cream-100">
      <NatureCorner variant="light" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-begonia-600">
            Keep exploring
          </p>
          <h2 className="mt-3 font-display text-3xl text-lavender-950">
            Find another path.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="rounded-full border border-lavender-900/15 bg-cream px-5 py-2.5 text-sm font-medium text-lavender-900 transition hover:border-begonia-500 hover:text-begonia-600"
            >
              {SHORT_NAME[p.slug] ?? p.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
