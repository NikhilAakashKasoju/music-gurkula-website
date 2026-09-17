import { Play, Sparkles } from "lucide-react";
import HeroSessionScene from "@/components/illustrations/HeroSessionScene";
import HeroParallax from "@/components/parallax/HeroParallax";
import AmbientField from "@/components/parallax/AmbientField";
import CursorGlow from "@/components/parallax/CursorGlow";
import { MouseParallaxGroup, MouseParallaxLayer } from "@/components/parallax/MouseParallax";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-lavender-950 text-cream">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, var(--color-begonia-900), transparent 55%), radial-gradient(circle at 10% 90%, var(--color-lavender-800), transparent 50%)",
        }}
      />

      {/* The whole section content lives inside one <MouseParallaxGroup> so
          the pointer position it tracks covers the entire hero, not just
          the gaps around the text and buttons — a sibling overlay would
          only ever see mousemove events the foreground content didn't
          already capture. The background field and glow render first (so
          they sit behind everything) but share the exact same tracking. */}
      <MouseParallaxGroup className="relative">
        <CursorGlow />
        <AmbientField />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-begonia-400">
              <span className="h-px w-8 bg-begonia-400" />
              The art of becoming
            </div>

            <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              Rooted in
              <br />
              <em className="text-begonia-400 not-italic font-medium italic">
                tradition.
              </em>
              <br />
              Growing with
              <br />
              you.
            </h1>

            <p className="mt-6 max-w-md text-base text-cream/75 sm:text-lg">
              A thoughtful home for Indian classical music and dance, where
              every student finds their own rhythm.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full bg-begonia-500 px-7 py-3.5 text-sm font-semibold text-lavender-950 transition hover:bg-begonia-400"
              >
                Find your program
                <span aria-hidden>→</span>
              </a>
              <a
                href="#our-way"
                className="inline-flex items-center gap-3 text-sm font-semibold text-cream transition hover:text-begonia-400"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30">
                  <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />
                </span>
                Explore the school
              </a>
            </div>

            <div className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-cream/10 pt-6">
              <div>
                <p className="font-display text-2xl text-begonia-400">04</p>
                <p className="mt-1 text-xs text-cream/60">disciplines</p>
              </div>
              <div>
                <p className="font-display text-2xl text-lavender-300">01</p>
                <p className="mt-1 text-xs text-cream/60">shared practice</p>
              </div>
              <div>
                <p className="font-display text-2xl text-sunshine-500">∞</p>
                <p className="mt-1 text-xs text-cream/60">possibilities</p>
              </div>
            </div>
          </div>

          <MouseParallaxGroup className="relative mx-auto aspect-[6/5] w-full max-w-lg">
            <HeroParallax />

            <MouseParallaxLayer depth={8} tilt={4} className="absolute inset-0">
              <HeroSessionScene className="h-full w-full" />
            </MouseParallaxLayer>

            <MouseParallaxLayer
              depth={20}
              tilt={6}
              className="absolute -top-6 left-2 max-w-[190px] sm:left-0"
            >
              <div className="flex items-start gap-2 rounded-2xl bg-cream px-4 py-3 text-ink shadow-xl">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-begonia-600" />
                <p className="font-display text-sm italic leading-snug">
                  Learn deeply.
                  <br />
                  Live fully.
                </p>
              </div>
            </MouseParallaxLayer>

            <MouseParallaxLayer
              depth={16}
              tilt={5}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2"
            >
              <div className="rounded-full bg-begonia-500 px-5 py-2.5 text-xs font-semibold text-lavender-950 shadow-lg">
                A lifelong practice
              </div>
            </MouseParallaxLayer>
          </MouseParallaxGroup>
        </div>
      </MouseParallaxGroup>
    </section>
  );
}
