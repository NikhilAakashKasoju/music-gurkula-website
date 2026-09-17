import IllustratedPanel from "@/components/illustrations/IllustratedPanel";
import FloatingIcon from "@/components/parallax/FloatingIcon";
import AmbientBlob from "@/components/parallax/AmbientBlob";
import AmbientField from "@/components/parallax/AmbientField";
import CursorGlow from "@/components/parallax/CursorGlow";
import { MouseParallaxGroup, MouseParallaxLayer } from "@/components/parallax/MouseParallax";
import { PROGRAM_COLORS } from "@/lib/programColors";
import type { Program } from "@/lib/programs";

export default function ProgramHero({ program }: { program: Program }) {
  const colors = PROGRAM_COLORS[program.slug];

  return (
    <section className="relative overflow-hidden bg-lavender-950 text-cream">
      {/* One shared <MouseParallaxGroup> wraps the whole section so the
          background glow/field track the pointer anywhere in the hero,
          not just the gaps the foreground content leaves uncovered. */}
      <MouseParallaxGroup className="relative">
        <CursorGlow />
        <AmbientField />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${colors.text}`}>
              {program.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">
              {program.name}
            </h1>
            <p className="mt-5 max-w-md text-base text-cream/75 sm:text-lg">
              {program.shortDescription}
            </p>
            <a
              href="#enquire"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-begonia-500 px-7 py-3.5 text-sm font-semibold text-lavender-950 transition hover:bg-begonia-400"
            >
              Start learning
              <span aria-hidden>→</span>
            </a>
          </div>

          <MouseParallaxGroup className="relative mx-auto aspect-square w-full max-w-sm">
            <AmbientBlob color="lavender" size={220} speed={-30} className="-left-10 -top-10" />
            <AmbientBlob color="begonia" size={200} speed={40} className="-bottom-10 -right-6" />

            <MouseParallaxLayer depth={8} tilt={4} className="absolute inset-0">
              <IllustratedPanel
                icon={program.icon}
                slug={program.slug}
                label={`Illustration — ${program.name} practice`}
                className="h-full w-full"
                rounded="rounded-[2.5rem]"
              />
            </MouseParallaxLayer>

            <MouseParallaxLayer depth={26} tilt={10} className="absolute -bottom-5 -right-5">
              <FloatingIcon slug={program.slug} icon={program.icon} size={92} dark />
            </MouseParallaxLayer>
          </MouseParallaxGroup>
        </div>
      </MouseParallaxGroup>
    </section>
  );
}
