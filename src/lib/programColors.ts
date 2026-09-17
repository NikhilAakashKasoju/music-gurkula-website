import type { ProgramSlug } from "./programs";

/**
 * Full, literal Tailwind class strings per program — kept as complete
 * tokens (rather than assembled at runtime from color name fragments) so
 * Tailwind's build-time scanner can always find them.
 *
 * Each program mixes two colors from the lavender/begonia family (with a
 * coral or sunshine hint on two of the four) rather than repeating one
 * accent everywhere, so the four-path grid reads as a coherent but varied
 * set — deliberately arranged as two "cool" and two "warm" paths for
 * balance.
 */
export interface ProgramColorClasses {
  /** Icon badge gradient, for light backgrounds (card thumbnails). */
  badgeGradient: string;
  /** Icon badge gradient, for dark backgrounds (program page hero). */
  badgeGradientDark: string;
  /** Eyebrow / index-number / small accent text color. */
  text: string;
  /** Soft tint background + matching text, used for pills and bullets. */
  soft: string;
  /** Border color used on hover states. */
  hoverBorder: string;
}

/**
 * Raw CSS custom-property references (NOT Tailwind classes) for each
 * program's two-color mix. These feed hand-drawn SVG illustrations, where
 * fill/stroke attributes need real color values rather than utility
 * classes — Tailwind's scanner is irrelevant here since nothing is a
 * class string, so unlike PROGRAM_COLORS above there's no static-string
 * requirement to work around.
 */
export const PROGRAM_ILLUSTRATION_VARS: Record<
  ProgramSlug,
  { base: string; mid: string }
> = {
  "hindustani-vocals": {
    base: "var(--color-lavender-600)",
    mid: "var(--color-begonia-400)",
  },
  "hindustani-tabla": {
    base: "var(--color-begonia-600)",
    mid: "var(--color-coral-400)",
  },
  "hindustani-flute": {
    base: "var(--color-coral-500)",
    mid: "var(--color-sunshine-400)",
  },
  bharatanatyam: {
    base: "var(--color-begonia-700)",
    mid: "var(--color-lavender-500)",
  },
};

export const PROGRAM_COLORS: Record<ProgramSlug, ProgramColorClasses> = {
  "hindustani-vocals": {
    badgeGradient: "bg-gradient-to-br from-lavender-400 to-begonia-300",
    badgeGradientDark: "bg-gradient-to-br from-lavender-500 to-begonia-500",
    text: "text-lavender-600",
    soft: "bg-lavender-100 text-lavender-700",
    hoverBorder: "group-hover:border-lavender-400",
  },
  "hindustani-tabla": {
    badgeGradient: "bg-gradient-to-br from-begonia-400 to-coral-400",
    badgeGradientDark: "bg-gradient-to-br from-begonia-500 to-coral-500",
    text: "text-begonia-600",
    soft: "bg-begonia-100 text-begonia-700",
    hoverBorder: "group-hover:border-begonia-400",
  },
  "hindustani-flute": {
    badgeGradient: "bg-gradient-to-br from-coral-400 to-sunshine-400",
    badgeGradientDark: "bg-gradient-to-br from-coral-500 to-sunshine-500",
    text: "text-coral-600",
    soft: "bg-coral-400/15 text-coral-600",
    hoverBorder: "group-hover:border-coral-400",
  },
  bharatanatyam: {
    badgeGradient: "bg-gradient-to-br from-lavender-400 to-begonia-400",
    badgeGradientDark: "bg-gradient-to-br from-lavender-600 to-begonia-700",
    text: "text-begonia-700",
    soft: "bg-begonia-100 text-begonia-800",
    hoverBorder: "group-hover:border-begonia-500",
  },
};
