"use client";

import { motion } from "framer-motion";
import { useScrollParallax } from "./useScrollParallax";
import LavenderSprigIcon from "@/components/icons/LavenderSprigIcon";
import BegoniaBloomIcon from "@/components/icons/BegoniaBloomIcon";
import LeafIcon from "@/components/icons/LeafIcon";
import { cn } from "@/lib/utils";

type NatureKind = "sprig" | "bloom" | "leaf";

const KIND: Record<NatureKind, React.ComponentType<{ className?: string }>> = {
  sprig: LavenderSprigIcon,
  bloom: BegoniaBloomIcon,
  leaf: LeafIcon,
};

function Sprinkle({
  kind,
  className,
  size = 40,
  color,
  speed = 24,
  duration = 8,
  delay = 0,
  rotateRange = 6,
}: {
  kind: NatureKind;
  className?: string;
  size?: number;
  color: string;
  speed?: number;
  duration?: number;
  delay?: number;
  rotateRange?: number;
}) {
  const Icon = KIND[kind];
  const y = useScrollParallax(speed);

  return (
    <motion.div
      aria-hidden="true"
      style={{ y }}
      className={cn("pointer-events-none absolute", className)}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-rotateRange, rotateRange, -rotateRange] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ width: size, height: size, color }}
      >
        <Icon className="h-full w-full drop-shadow-sm" />
      </motion.div>
    </motion.div>
  );
}

/**
 * A mirrored pair of botanical accents (a sprig + a bloom, plus one small
 * leaf) drifting gently on scroll — dropped into a `relative` section to
 * give it a touch of "nature" without competing with its content. `variant`
 * picks a lighter tone for dark backgrounds.
 */
export function NatureCorner({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const c1 =
    variant === "dark" ? "var(--color-lavender-300)" : "var(--color-lavender-400)";
  const c2 =
    variant === "dark" ? "var(--color-begonia-300)" : "var(--color-begonia-500)";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <Sprinkle
        kind="sprig"
        className="-left-2 top-6 sm:left-2"
        size={38}
        color={c1}
        speed={-22}
        duration={7}
      />
      <Sprinkle
        kind="bloom"
        className="-right-1 bottom-8"
        size={32}
        color={c2}
        speed={24}
        duration={9}
        delay={0.4}
        rotateRange={8}
      />
      <Sprinkle
        kind="leaf"
        className="left-[38%] top-3"
        size={20}
        color={c2}
        speed={16}
        duration={6}
        delay={0.8}
      />
    </div>
  );
}

export { Sprinkle };
