"use client";

import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MouseParallaxContextValue {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const MouseParallaxContext = createContext<MouseParallaxContextValue | null>(
  null
);

/**
 * Reads the nearest <MouseParallaxGroup>'s smoothed pointer position
 * (-1..1 on each axis). Safe to call outside a group — falls back to a
 * motion value pinned at 0, so consumers never need a null check.
 */
export function useMouseParallax(): MouseParallaxContextValue {
  const ctx = useContext(MouseParallaxContext);
  const fallback = useMotionValue(0);
  return ctx ?? { x: fallback, y: fallback };
}

/**
 * Tracks pointer position within its own bounds and shares it (as a
 * spring-smoothed -1..1 range on each axis) with any <MouseParallaxLayer>
 * placed inside it. This is what gives the hero its tilt-parallax feel —
 * real CSS 3D transforms driven by the mouse, not a static image.
 */
export function MouseParallaxGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.6 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("parallax-scene", className)}
    >
      <MouseParallaxContext.Provider value={{ x, y }}>
        {children}
      </MouseParallaxContext.Provider>
    </div>
  );
}

/**
 * A single depth layer inside a <MouseParallaxGroup>. Higher `depth` /
 * `tilt` values move and rotate more, so layers meant to feel "closer"
 * should get bigger numbers.
 */
export function MouseParallaxLayer({
  depth = 16,
  tilt = 0,
  className,
  style,
  children,
}: {
  depth?: number;
  tilt?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const { x: mx, y: my } = useMouseParallax();

  const translateX = useTransform(mx, [-1, 1], [-depth, depth]);
  const translateY = useTransform(my, [-1, 1], [-depth, depth]);
  const rotateX = useTransform(my, [-1, 1], [tilt, -tilt]);
  const rotateY = useTransform(mx, [-1, 1], [-tilt, tilt]);

  return (
    <motion.div
      className={cn("parallax-layer", className)}
      style={{ x: translateX, y: translateY, rotateX, rotateY, ...style }}
    >
      {children}
    </motion.div>
  );
}
