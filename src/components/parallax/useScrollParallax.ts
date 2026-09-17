"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Returns a MotionValue that moves from 0 to `distance` px as the page
 * scrolls through its first ~1500px — enough for a gentle drift on
 * elements near the top of the page without needing a ref/target.
 */
export function useScrollParallax(distance: number): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 1500], [0, distance]);
}
