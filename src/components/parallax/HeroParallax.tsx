"use client";

import { motion } from "framer-motion";
import AmbientBlob from "./AmbientBlob";
import { MouseParallaxLayer } from "./MouseParallax";
import NotesIcon from "@/components/icons/NotesIcon";
import LavenderSprigIcon from "@/components/icons/LavenderSprigIcon";
import BegoniaBloomIcon from "@/components/icons/BegoniaBloomIcon";

/**
 * Decorative parallax layer for the homepage hero: soft color pools plus
 * a lavender sprig and a begonia bloom placed as a mirrored pair (top
 * right / bottom left) for visual balance, a floating music-note chip,
 * and small coral + sunshine hints. Everything here responds to both
 * scroll position (via each layer's own drift speed) and mouse position
 * (via the shared <MouseParallaxGroup> this renders inside), which is
 * what gives it a "3D" feel without any WebGL.
 */
export default function HeroParallax() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <AmbientBlob
        color="lavender"
        size={280}
        speed={-40}
        className="-left-16 -top-10"
      />
      <AmbientBlob
        color="begonia"
        size={260}
        speed={50}
        className="-bottom-16 -right-10"
      />

      {/* Lavender sprig, top right — mirrors the begonia bloom below. */}
      <MouseParallaxLayer
        depth={26}
        tilt={10}
        className="absolute -right-3 top-6 text-lavender-300 sm:right-2"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <LavenderSprigIcon className="h-20 w-10 drop-shadow" />
        </motion.div>
      </MouseParallaxLayer>

      {/* Begonia bloom, bottom left — mirrors the lavender sprig above. */}
      <MouseParallaxLayer
        depth={22}
        tilt={8}
        className="absolute -left-4 bottom-10 text-begonia-400"
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <BegoniaBloomIcon className="h-14 w-14 drop-shadow" />
        </motion.div>
      </MouseParallaxLayer>

      {/* Floating music-note chip, closest layer (moves the most) — kept to
          one side so it doesn't sit on top of the hero's own musicians. */}
      <MouseParallaxLayer
        depth={34}
        tilt={12}
        className="absolute -right-3 bottom-6 sm:right-1"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-400 to-begonia-400 shadow-lg"
        >
          <NotesIcon className="h-7 w-7 text-white" />
        </motion.div>
      </MouseParallaxLayer>

      {/* Small coral + sunshine hints. */}
      <MouseParallaxLayer depth={18} className="absolute right-10 top-1/2">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="block h-3.5 w-3.5 rounded-full bg-coral-500 shadow"
        />
      </MouseParallaxLayer>
      <MouseParallaxLayer depth={14} className="absolute left-10 top-16">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="block h-2.5 w-2.5 rounded-full bg-sunshine-500 shadow"
        />
      </MouseParallaxLayer>
    </div>
  );
}
