import SectionLabel from "@/components/shared/SectionLabel";
import { NatureCorner } from "@/components/parallax/NatureScatter";

const TESTIMONIALS = [
  {
    quote:
      "My daughter looks forward to every class. She is learning music, but also focus, confidence, and respect.",
    name: "Priya S.",
    role: "Parent of a vocal student",
  },
  {
    quote:
      "The teaching is traditional without feeling intimidating. Every question is welcomed and every small step is celebrated.",
    name: "Arjun M.",
    role: "Tabla student",
  },
  {
    quote:
      "Bharatanatyam has become a beautiful part of our family week. The care around technique and expression is exceptional.",
    name: "Kavitha R.",
    role: "Parent of a dance student",
  },
];

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="relative overflow-hidden bg-gradient-to-br from-lavender-900 via-[#452a52] to-begonia-900 text-cream"
    >
      <NatureCorner variant="dark" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <SectionLabel dark>Words from our community</SectionLabel>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">
          Small steps.
          <br />
          <em className="italic text-begonia-400">Lasting change.</em>
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-cream/10 bg-cream/5 p-6"
            >
              <p className="font-display text-3xl text-begonia-400">&ldquo;</p>
              <p className="mt-1 text-sm leading-relaxed text-cream/85">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-cream/10 pt-4">
                <p className="text-sm font-semibold text-cream">{t.name}</p>
                <p className="text-xs text-cream/50">
                  {t.role} · [PLACEHOLDER]
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
