export type ProgramSlug =
  | "hindustani-vocals"
  | "hindustani-tabla"
  | "hindustani-flute"
  | "bharatanatyam";

/** Which flat, parallax-animated icon represents this program (see src/components/icons). */
export type ProgramIcon = "notes" | "tabla" | "flute" | "dance";

export interface CurriculumLevel {
  level: "Beginner" | "Intermediate" | "Advanced";
  points: string[];
}

export interface Teacher {
  name: string;
  role: string;
  blurb: string;
}

/**
 * Each program gets its own mix from the lavender/begonia palette (with a
 * coral or sunshine hint where it suits) rather than one repeated color —
 * this is what gives the four-path grid its variety while staying inside
 * one coherent, symmetric family of hues.
 */
export interface ProgramColor {
  /** Tailwind color token for small text/badges, e.g. "lavender-600". */
  solid: string;
  /** Two gradient stops used behind the card's icon, light → light. */
  gradient: [string, string];
  /** Deeper gradient stops used on dark hero backgrounds. */
  gradientDark: [string, string];
}

export interface Program {
  slug: ProgramSlug;
  index: string; // "01" etc, matches the reference design
  eyebrow: string; // e.g. "SUR · SADHANA · EXPRESSION"
  name: string;
  shortDescription: string;
  longDescription: string;
  practiceDescription: string; // paragraph shown on the program page under "The practice"
  format: string;
  whoItsFor: string;
  fees: string; // placeholder text
  icon: ProgramIcon;
  color: ProgramColor;
  curriculum: CurriculumLevel[];
  teacher: Teacher;
}

export const PROGRAMS: Program[] = [
  {
    slug: "hindustani-vocals",
    index: "01",
    eyebrow: "SUR · SADHANA · EXPRESSION",
    name: "Hindustani Vocals",
    shortDescription:
      "Find your natural voice through raga, rhythm, and the patient beauty of daily riyaaz.",
    longDescription:
      "Hindustani vocal training at Music Gurukula begins with the breath and the note, long before it reaches the raga. Students build a steady, resonant voice through swara sadhana, then grow into the emotional and technical depth of khayal, bhajan, and light classical singing — guided one riyaaz at a time.",
    practiceDescription:
      "Our vocal path grounds students in swara and breath before opening into the rich world of Hindustani khayal, bhajan, and light classical repertoire.",
    format: "In-person · Small group and individual guidance · 60 minutes weekly",
    whoItsFor: "Ages 7+ · Beginner to advanced",
    fees: "[PLACEHOLDER: Contact for fees]",
    icon: "notes",
    color: {
      solid: "lavender-600",
      gradient: ["lavender-400", "begonia-300"],
      gradientDark: ["lavender-600", "begonia-600"],
    },
    curriculum: [
      {
        level: "Beginner",
        points: ["Swara, alankaar, breath, taal awareness"],
      },
      {
        level: "Intermediate",
        points: ["Raga grammar, bandish, improvisation"],
      },
      {
        level: "Advanced",
        points: ["Vilambit khayal, taan craft, performance polish"],
      },
    ],
    teacher: {
      name: "Smt. Ananya Kulkarni",
      role: "Hindustani Vocals",
      blurb: "A patient guide for young voices and returning learners.",
    },
  },
  {
    slug: "hindustani-tabla",
    index: "02",
    eyebrow: "TAAL · TECHNIQUE · JOY",
    name: "Hindustani Tabla",
    shortDescription:
      "Build a steady hand and an attentive ear, one beautiful theka at a time.",
    longDescription:
      "Tabla at Music Gurukula is taught the way it has always been passed down — hand to hand, bol by bol. Students develop clean technique on dayan and bayan, internalise taal through recitation, and grow towards the confidence to accompany and to solo.",
    practiceDescription:
      "Our tabla path builds hand independence and taal awareness from the very first class, moving from foundational theka to the vocabulary of solo and accompaniment playing.",
    format: "In-person · Small group and individual guidance · 60 minutes weekly",
    whoItsFor: "Ages 7+ · Beginner to advanced",
    fees: "[PLACEHOLDER: Contact for fees]",
    icon: "tabla",
    color: {
      solid: "begonia-600",
      gradient: ["begonia-400", "coral-400"],
      gradientDark: ["begonia-600", "coral-500"],
    },
    curriculum: [
      {
        level: "Beginner",
        points: ["Hand position, dayan/bayan basics, theka, bol recitation"],
      },
      {
        level: "Intermediate",
        points: ["Kaida, rela, layakari, accompaniment listening"],
      },
      {
        level: "Advanced",
        points: ["Tukda, chakradar, solo structure, stage-ready repertoire"],
      },
    ],
    teacher: {
      name: "Pandit Raghav Deshpande",
      role: "Hindustani Tabla",
      blurb: "Bringing clarity, warmth, and a deep love of taal.",
    },
  },
  {
    slug: "hindustani-flute",
    index: "03",
    eyebrow: "SAANS · SUR · STILLNESS",
    name: "Hindustani Flute",
    shortDescription:
      "Discover the meditative voice of bansuri and learn to let each note breathe.",
    longDescription:
      "The bansuri rewards patience. Students begin with breath control and embouchure, then move through the same swara and raga foundations shared across our Hindustani disciplines — building a sound that is calm, clear, and unmistakably their own.",
    practiceDescription:
      "Our flute path starts with breath and embouchure before opening into raga phrasing, ornamentation, and the quiet expressive range the bansuri is known for.",
    format: "In-person · Small group and individual guidance · 60 minutes weekly",
    whoItsFor: "Ages 8+ · Beginner to advanced",
    fees: "[PLACEHOLDER: Contact for fees]",
    icon: "flute",
    color: {
      solid: "coral-600",
      gradient: ["coral-400", "sunshine-400"],
      gradientDark: ["coral-500", "sunshine-500"],
    },
    curriculum: [
      {
        level: "Beginner",
        points: ["Breath control, embouchure, first swaras"],
      },
      {
        level: "Intermediate",
        points: ["Raga phrasing, meend, tonguing technique"],
      },
      {
        level: "Advanced",
        points: ["Gat repertoire, ornamentation, performance polish"],
      },
    ],
    teacher: {
      name: "Smt. Ananya Kulkarni",
      role: "Hindustani Flute",
      blurb: "Helping students find breath, stillness, and sur together.",
    },
  },
  {
    slug: "bharatanatyam",
    index: "04",
    eyebrow: "NRITTA · NRITYA · BHAVA",
    name: "Bharatanatyam",
    shortDescription:
      "Learn the geometry, storytelling, and expressive grace of a timeless dance tradition.",
    longDescription:
      "Bharatanatyam at Music Gurukula balances the precision of adavus with the storytelling of abhinaya. Students build strength and rhythm through nritta, then grow into the expressive vocabulary of nritya — learning to tell a story with the whole body.",
    practiceDescription:
      "Our dance path builds adavu vocabulary and rhythmic precision first, then layers in expression and storytelling as students grow into full margam repertoire.",
    format: "In-person · Small group and individual guidance · 60 minutes weekly",
    whoItsFor: "Ages 6+ · Beginner to advanced",
    fees: "[PLACEHOLDER: Contact for fees]",
    icon: "dance",
    color: {
      solid: "begonia-700",
      gradient: ["lavender-400", "begonia-400"],
      gradientDark: ["lavender-600", "begonia-700"],
    },
    curriculum: [
      {
        level: "Beginner",
        points: ["Adavus, tala counting, posture, basic jatis"],
      },
      {
        level: "Intermediate",
        points: ["Jatiswaram, shabdam, abhinaya fundamentals"],
      },
      {
        level: "Advanced",
        points: ["Varnam, padam, full margam repertoire"],
      },
    ],
    teacher: {
      name: "Smt. Meera Iyer",
      role: "Bharatanatyam",
      blurb: "Helping every student find story inside movement.",
    },
  },
];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function getOtherPrograms(slug: string): Program[] {
  return PROGRAMS.filter((p) => p.slug !== slug);
}
