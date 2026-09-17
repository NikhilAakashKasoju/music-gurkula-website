"use client";

import { motion } from "framer-motion";
import { useScrollParallax } from "./useScrollParallax";
import { cn } from "@/lib/utils";

const GRADIENTS: Record<string, string> = {
  lavender:
    "radial-gradient(circle at 32% 32%, var(--color-lavender-400), transparent 70%)",
  begonia:
    "radial-gradient(circle at 32% 32%, var(--color-begonia-400), transparent 70%)",
  coral:
    "radial-gradient(circle at 32% 32%, var(--color-coral-400), transparent 70%)",
  sunshine:
    "radial-gradient(circle at 32% 32%, var(--color-sunshine-400), transparent 70%)",
};

/**
 * A soft, blurred pool of color that drifts at its own scroll speed —
 * a lightweight stand-in for a 3D background layer. Used in mirrored
 * pairs so decorative color stays visually balanced across a section.
 */
export default function AmbientBlob({
  color,
  size = 380,
  speed = 60,
  className,
}: {
  color: "lavender" | "begonia" | "coral" | "sunshine";
  size?: number;
  speed?: number;
  className?: string;
}) {
  const y = useScrollParallax(speed);

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full opacity-50 blur-3xl",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundImage: GRADIENTS[color],
        y,
      }}
    />
  );
}
