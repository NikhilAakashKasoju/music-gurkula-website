import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import IllustratedPanel from "@/components/illustrations/IllustratedPanel";
import { NatureCorner } from "@/components/parallax/NatureScatter";
import type { ProgramIcon, ProgramSlug } from "@/lib/programs";

const FEATURED_TEACHERS: {
  label: string;
  name: string;
  blurb: string;
  slug: ProgramSlug;
  icon: ProgramIcon;
}[] = [
  {
    label: "Hindustani Vocals",
    name: "Smt. Ananya Kulkarni",
    blurb: "A patient guide for young voices and returning learners.",
    slug: "hindustani-vocals",
    icon: "notes",
  },
  {
    label: "Hindustani Tabla",
    name: "Pandit Raghav Deshpande",
    blurb: "Bringing clarity, warmth, and a deep love of taal.",
    slug: "hindustani-tabla",
    icon: "tabla",
  },
  {
    label: "Bharatanatyam",
    name: "Smt. Meera Iyer",
    blurb: "Helping every student find story inside movement.",
    slug: "bharatanatyam",
    icon: "dance",
  },
];

export default function Teachers() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <NatureCorner variant="light" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <div>
          <SectionLabel>The people behind the practice</SectionLabel>
          <h2 className="mt-4 font-display text-4xl leading-tight text-lavender-950 sm:text-5xl">
            Guided by
            <br />
            <em className="italic text-lavender-600">generosity.</em>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-lavender-900/70">
            Our instructors carry years of study and performance into a
            teaching style that is rigorous, warm, and personal.
          </p>
          <Link
            href="#contact"
            className="mt-5 inline-flex items-center gap-2 border-b border-begonia-600 pb-0.5 text-sm font-semibold text-lavender-950"
          >
            Meet your teacher
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURED_TEACHERS.map((t) => (
            <div key={t.name}>
              <IllustratedPanel
                icon={t.icon}
                slug={t.slug}
                crop="bust"
                label={`Illustration — ${t.name}, ${t.label} instructor`}
                className="aspect-square w-full"
                rounded="rounded-t-full rounded-b-2xl"
              />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-begonia-600">
                {t.label}
              </p>
              <p className="mt-1 font-display text-lg text-lavender-950">
                {t.name}
              </p>
              <p className="mt-1 text-sm text-lavender-900/65">{t.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
