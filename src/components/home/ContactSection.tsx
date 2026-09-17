import { Mail, Phone } from "lucide-react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { NatureCorner } from "@/components/parallax/NatureScatter";
import { CONTACT_SECTION_ID } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section
      id={CONTACT_SECTION_ID}
      className="relative overflow-hidden bg-gradient-to-br from-lavender-800 to-begonia-800 text-cream"
    >
      <NatureCorner variant="dark" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-begonia-400">
            Your first step
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Let&rsquo;s find the
            <br />
            <em className="italic text-begonia-400">right rhythm.</em>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
            Tell us about the student and we&rsquo;ll help you choose a
            program, level, and timing. No prior experience needed.
          </p>

          <div className="mt-8 space-y-3 text-sm text-cream/85">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-begonia-400" />
              [PLACEHOLDER: +91 00000 00000]
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-begonia-400" />
              [PLACEHOLDER: hello@musicgurukula.com]
            </div>
          </div>
        </div>

        <EnquiryForm
          eyebrow="Free inquiry"
          heading="Begin with a conversation"
          subheading="[PLACEHOLDER] We'll reply within two working days."
          submitLabel="Send inquiry"
          source="home_contact_form"
        />
      </div>
    </section>
  );
}
