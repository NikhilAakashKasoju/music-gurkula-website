import SectionLabel from "@/components/shared/SectionLabel";
import IllustratedPanel from "@/components/illustrations/IllustratedPanel";

export default function Gallery() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>A school in motion</SectionLabel>
        <h2 className="mt-4 font-display text-4xl leading-tight text-lavender-950 sm:text-5xl">
          Moments of
          <br />
          <em className="italic text-lavender-600">practice &amp; presence.</em>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          <IllustratedPanel
            icon="notes"
            slug="hindustani-vocals"
            label="Illustration — vocal practice"
            crop="full"
            className="sm:col-span-1 sm:row-span-2 h-64 sm:h-full"
          />
          <IllustratedPanel
            icon="tabla"
            slug="hindustani-tabla"
            label="Illustration — tabla practice"
            crop="wide"
            className="h-64"
          />
          <IllustratedPanel
            icon="dance"
            slug="bharatanatyam"
            label="Illustration — bharatanatyam practice"
            crop="full"
            className="h-64 sm:row-span-2 sm:h-full"
          />
          <IllustratedPanel
            icon="flute"
            slug="hindustani-flute"
            label="Illustration — flute practice"
            crop="wide"
            className="h-64"
          />
        </div>
      </div>
    </section>
  );
}
