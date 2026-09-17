import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import IllustratedPanel from "@/components/illustrations/IllustratedPanel";
import FloatingIcon from "@/components/parallax/FloatingIcon";
import { PROGRAMS } from "@/lib/programs";
import { PROGRAM_COLORS } from "@/lib/programColors";

export default function FourPaths() {
  return (
    <section id="programs" className="bg-cream-100">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>Choose your practice</SectionLabel>
            <h2 className="mt-4 font-display text-4xl text-lavender-950 sm:text-5xl">
              Four paths,
              <br />
              <em className="italic text-lavender-600">one shared spirit.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-lavender-900/70">
            Thoughtful, in-person instruction for curious beginners, committed
            learners, and every stage in between.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PROGRAMS.map((program) => {
            const colors = PROGRAM_COLORS[program.slug];
            return (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className={`group block overflow-hidden rounded-2xl border-2 border-transparent bg-cream shadow-sm ring-1 ring-lavender-900/5 transition hover:-translate-y-1 hover:shadow-lg ${colors.hoverBorder}`}
              >
                <div className="relative h-56 sm:h-64">
                  <IllustratedPanel
                    icon={program.icon}
                    slug={program.slug}
                    label={`Illustration — ${program.name} practice`}
                    className="h-full w-full"
                    rounded="rounded-none"
                  />
                  <div className="absolute right-4 top-4">
                    <FloatingIcon slug={program.slug} icon={program.icon} size={60} />
                  </div>
                  <span
                    className={`absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-xs font-semibold ${colors.text}`}
                  >
                    {program.index}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-10 text-cream">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-begonia-300">
                      {program.eyebrow}
                    </p>
                    <p className="mt-1 font-display text-2xl">{program.name}</p>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <p className="text-sm text-lavender-900/70">
                    {program.shortDescription}
                  </p>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-lavender-900/15 text-lavender-800 transition group-hover:border-begonia-500 group-hover:bg-begonia-500 group-hover:text-lavender-950">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
