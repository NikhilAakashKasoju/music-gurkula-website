"use client";

import { motion } from "framer-motion";
import { useScrollParallax } from "./useScrollParallax";
import { PROGRAM_COLORS } from "@/lib/programColors";
import NotesIcon from "@/components/icons/NotesIcon";
import TablaIcon from "@/components/icons/TablaIcon";
import FluteIcon from "@/components/icons/FluteIcon";
import DanceIcon from "@/components/icons/DanceIcon";
import type { ProgramIcon, ProgramSlug } from "@/lib/programs";
import { cn } from "@/lib/utils";

const ICONS: Record<ProgramIcon, React.ComponentType<{ className?: string }>> = {
  notes: NotesIcon,
  tabla: TablaIcon,
  flute: FluteIcon,
  dance: DanceIcon,
};

/**
 * The animated badge that stands in for each program's old 3D model:
 * a flat icon on a color-mixed gradient, drifting gently on scroll and
 * bobbing/rotating in a slow, continuous loop.
 */
export default function FloatingIcon({
  slug,
  icon,
  size = 96,
  dark = false,
  parallaxDistance = 34,
  className,
}: {
  slug: ProgramSlug;
  icon: ProgramIcon;
  size?: number;
  dark?: boolean;
  parallaxDistance?: number;
  className?: string;
}) {
  const Icon = ICONS[icon];
  const colors = PROGRAM_COLORS[slug];
  const scrollY = useScrollParallax(parallaxDistance);

  return (
    <motion.div
      aria-hidden="true"
      style={{ y: scrollY }}
      className={cn("pointer-events-none", className)}
    >
      <motion.div
        style={{ width: size, height: size }}
        animate={{ y: [0, -12, 0], rotate: [0, 3.5, 0, -3.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "flex items-center justify-center rounded-[1.75rem] shadow-lg",
          dark ? colors.badgeGradientDark : colors.badgeGradient
        )}
      >
        <Icon className="h-[46%] w-[46%] text-white drop-shadow-sm" />
      </motion.div>
    </motion.div>
  );
}
