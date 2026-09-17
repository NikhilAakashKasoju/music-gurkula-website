"use client";

import { motion } from "framer-motion";
import { useScrollParallax } from "./useScrollParallax";
import { MouseParallaxLayer } from "./MouseParallax";
import LeafIcon from "@/components/icons/LeafIcon";
import NotesIcon from "@/components/icons/NotesIcon";
import LavenderSprigIcon from "@/components/icons/LavenderSprigIcon";
import BegoniaBloomIcon from "@/components/icons/BegoniaBloomIcon";
import { cn } from "@/lib/utils";

type FieldIcon = "leaf" | "note" | "sprig" | "bloom";

const ICONS: Record<FieldIcon, React.ComponentType<{ className?: string }>> = {
  leaf: LeafIcon,
  note: NotesIcon,
  sprig: LavenderSprigIcon,
  bloom: BegoniaBloomIcon,
};

interface FieldItem {
  icon: FieldIcon;
  left: number; // %
  top: number; // %
  size: number; // px
  color: string; // css var()
  duration: number; // float loop seconds
  delay: number;
  rotate: number; // +/- degrees of drift
  scrollSpeed: number; // px of scroll parallax drift
  depth: number; // mouse-parallax depth
  opacity: number;
}

/**
 * A hand-placed (not random — keeps output deterministic and lint-clean)
 * scatter of small music + nature glyphs across a hero-style section.
 * Each one drifts on its own float loop, its own scroll-parallax speed,
 * and shares the section's <MouseParallaxGroup> so the whole field leans
 * gently with the cursor — replacing the old flat, static tiled print
 * with something that actually feels alive.
 */
const ITEMS: FieldItem[] = [
  { icon: "note", left: 8, top: 14, size: 22, color: "var(--color-begonia-400)", duration: 7, delay: 0, rotate: 10, scrollSpeed: -20, depth: 10, opacity: 0.5 },
  { icon: "leaf", left: 18, top: 62, size: 26, color: "var(--color-lavender-300)", duration: 9, delay: 0.6, rotate: 14, scrollSpeed: 26, depth: 16, opacity: 0.45 },
  { icon: "sprig", left: 6, top: 84, size: 30, color: "var(--color-lavender-400)", duration: 10, delay: 1.1, rotate: 8, scrollSpeed: -14, depth: 8, opacity: 0.4 },
  { icon: "bloom", left: 27, top: 30, size: 16, color: "var(--color-sunshine-400)", duration: 6, delay: 1.6, rotate: 12, scrollSpeed: 18, depth: 20, opacity: 0.5 },
  { icon: "note", left: 34, top: 78, size: 18, color: "var(--color-coral-400)", duration: 8, delay: 0.3, rotate: 9, scrollSpeed: -24, depth: 14, opacity: 0.45 },
  { icon: "leaf", left: 44, top: 10, size: 20, color: "var(--color-begonia-300)", duration: 7.5, delay: 2, rotate: 11, scrollSpeed: 22, depth: 12, opacity: 0.4 },
  { icon: "bloom", left: 52, top: 88, size: 22, color: "var(--color-begonia-400)", duration: 9.5, delay: 0.8, rotate: 7, scrollSpeed: -18, depth: 18, opacity: 0.42 },
  { icon: "note", left: 63, top: 22, size: 24, color: "var(--color-lavender-300)", duration: 6.5, delay: 1.4, rotate: 13, scrollSpeed: 30, depth: 22, opacity: 0.5 },
  { icon: "leaf", left: 71, top: 68, size: 18, color: "var(--color-sunshine-400)", duration: 8.5, delay: 0.2, rotate: 10, scrollSpeed: -22, depth: 10, opacity: 0.4 },
  { icon: "sprig", left: 91, top: 40, size: 28, color: "var(--color-lavender-400)", duration: 11, delay: 1.8, rotate: 6, scrollSpeed: 16, depth: 8, opacity: 0.4 },
  { icon: "bloom", left: 82, top: 12, size: 18, color: "var(--color-coral-400)", duration: 7, delay: 0.5, rotate: 12, scrollSpeed: -26, depth: 20, opacity: 0.45 },
  { icon: "note", left: 88, top: 82, size: 20, color: "var(--color-begonia-400)", duration: 9, delay: 1.2, rotate: 9, scrollSpeed: 20, depth: 14, opacity: 0.42 },
  { icon: "leaf", left: 58, top: 46, size: 16, color: "var(--color-lavender-300)", duration: 6, delay: 2.2, rotate: 14, scrollSpeed: -16, depth: 24, opacity: 0.35 },
  { icon: "sprig", left: 39, top: 52, size: 20, color: "var(--color-begonia-300)", duration: 10.5, delay: 0.9, rotate: 8, scrollSpeed: 24, depth: 12, opacity: 0.35 },
];

function FieldGlyph({ item }: { item: FieldItem }) {
  const Icon = ICONS[item.icon];
  const scrollY = useScrollParallax(item.scrollSpeed);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${item.left}%`,
        top: `${item.top}%`,
        y: scrollY,
      }}
    >
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [-item.rotate, item.rotate, -item.rotate],
        }}
        transition={{
          duration: item.duration,
          delay: item.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: item.size, height: item.size, color: item.color, opacity: item.opacity }}
      >
        <Icon className="h-full w-full" />
      </motion.div>
    </motion.div>
  );
}

/**
 * Drop this inside a <MouseParallaxGroup> that spans the section you want
 * to decorate. `variant` only affects nothing yet (both themes share the
 * same glyph colors, which already read fine on both light and dark
 * backgrounds at this opacity) — kept for future tuning.
 */
export default function AmbientField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <MouseParallaxLayer depth={6} className="absolute inset-0">
        {ITEMS.map((item, i) => (
          <FieldGlyph key={i} item={item} />
        ))}
      </MouseParallaxLayer>
    </div>
  );
}
