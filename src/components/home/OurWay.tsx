import SectionLabel from "@/components/shared/SectionLabel";
import { NatureCorner } from "@/components/parallax/NatureScatter";

export default function OurWay() {
  return (
    <section id="our-way" className="relative overflow-hidden bg-cream">
      <NatureCorner variant="light" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1px_auto_1px_auto] lg:items-start lg:gap-8">
        <div>
          <SectionLabel>Our way</SectionLabel>
          <h2 className="mt-4 font-display text-4xl leading-tight text-lavender-950 sm:text-5xl">
            More than a
            <br />
            class.
            <br />
            <em className="italic text-lavender-600">A way of</em>
            <br />
            <em className="italic text-lavender-600">seeing.</em>
          </h2>
        </div>

        <div
          className="hidden h-full w-px bg-lavender-800/15 lg:block"
          aria-hidden
        />

        <p className="max-w-xs self-center text-sm leading-relaxed text-lavender-900/70 lg:pt-4">
          In the gurukula tradition, learning is a relationship — between
          student and teacher, sound and silence, discipline and joy. We
          bring that spirit into every in-person class.
        </p>

        <div
          className="hidden h-full w-px bg-lavender-800/15 lg:block"
          aria-hidden
        />

        <div className="max-w-xs self-center border-l-2 border-begonia-500 pl-5 lg:pt-4">
          <p className="font-display text-lg italic leading-snug text-lavender-950">
            &ldquo;The goal is not only to perform beautifully, but to listen
            more deeply.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-lavender-600">
            — Our teaching philosophy
          </p>
        </div>
      </div>
    </section>
  );
}
