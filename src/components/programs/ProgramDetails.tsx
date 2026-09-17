import { Check, MapPin, Users, Wallet } from "lucide-react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { NatureCorner } from "@/components/parallax/NatureScatter";
import { PROGRAM_COLORS } from "@/lib/programColors";
import type { Program } from "@/lib/programs";

export default function ProgramDetails({ program }: { program: Program }) {
  const colors = PROGRAM_COLORS[program.slug];

  return (
    <section id="enquire" className="relative overflow-hidden bg-cream">
      <NatureCorner variant="light" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${colors.text}`}>
            The practice
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-lavender-950 sm:text-5xl">
            A foundation that
            <br />
            <em className="italic text-lavender-600">stays with you.</em>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-lavender-900/70">
            {program.practiceDescription}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 border-y border-lavender-900/10 py-6 sm:grid-cols-3">
            <div>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] ${colors.text}`}>
                <MapPin className="h-3.5 w-3.5" />
                Format
              </div>
              <p className="mt-2 text-sm text-lavender-900/75">{program.format}</p>
            </div>
            <div>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] ${colors.text}`}>
                <Users className="h-3.5 w-3.5" />
                Who it&rsquo;s for
              </div>
              <p className="mt-2 text-sm text-lavender-900/75">
                {program.whoItsFor}
              </p>
            </div>
            <div>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] ${colors.text}`}>
                <Wallet className="h-3.5 w-3.5" />
                Fees
              </div>
              <p className="mt-2 text-sm text-lavender-900/75">{program.fees}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-2xl text-lavender-950">
              What you&rsquo;ll learn
            </h3>
            <div className="mt-4 divide-y divide-lavender-900/10">
              {program.curriculum.map((level) => (
                <div key={level.level} className="flex items-start gap-3 py-3">
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${colors.soft}`}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm text-lavender-900/80">
                    <span className="font-semibold text-lavender-950">
                      {level.level}:
                    </span>{" "}
                    {level.points.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <EnquiryForm
            programSlug={program.slug}
            eyebrow="Take the first step"
            heading={`Ask about ${program.name.split(" ").slice(-1)[0].toLowerCase()}.`}
            subheading="[PLACEHOLDER] Tell us a little about the student and we'll suggest the best starting point."
            submitLabel="Ask about this program"
            source={`program_page:${program.slug}`}
            footnote={
              <>In-person classes · [PLACEHOLDER: Bengaluru location]</>
            }
          />
        </div>
      </div>
    </section>
  );
}
