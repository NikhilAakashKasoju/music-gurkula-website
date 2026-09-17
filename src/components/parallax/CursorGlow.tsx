"use client";

import { useMotionTemplate, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useMouseParallax } from "./MouseParallax";
import { cn } from "@/lib/utils";

/**
 * A soft two-tone glow that follows the cursor within the nearest
 * <MouseParallaxGroup> — the "interactive" half of the hero background.
 * Purely a CSS gradient driven by motion values (no re-renders on move),
 * so it stays smooth even on a slower device.
 */
export default function CursorGlow({
  className,
  size = 560,
}: {
  className?: string;
  size?: number;
}) {
  const { x, y } = useMouseParallax();
  const xPct = useTransform(x, [-1, 1], [10, 90]);
  const yPct = useTransform(y, [-1, 1], [10, 90]);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${xPct}% ${yPct}%, var(--color-sunshine-400) 0%, var(--color-begonia-500) 38%, var(--color-lavender-500) 62%, transparent 78%)`;

  return (
    <motion.div
      aria-hidden="true"
      style={{ background }}
      className={cn(
        "pointer-events-none absolute inset-0 opacity-40 mix-blend-screen",
        className
      )}
    />
  );
}
