"use client";

import { motion } from "framer-motion";
import { PROGRAM_ILLUSTRATION_VARS } from "@/lib/programColors";
import { cn } from "@/lib/utils";

const TABLA = PROGRAM_ILLUSTRATION_VARS["hindustani-tabla"];
const VOCALS = PROGRAM_ILLUSTRATION_VARS["hindustani-vocals"];
const FLUTE = PROGRAM_ILLUSTRATION_VARS["hindustani-flute"];

/**
 * The hero's centerpiece: a small illustrated trio playing together —
 * tabla hands tapping in an alternating dayan/bayan rhythm, a vocalist
 * singing with an open, pulsing mouth and rippling sound-wave rings, and
 * a flute player breathing floating notes into the air. Each figure is a
 * single-color faceless silhouette (same visual language as the rest of
 * the site's illustrations); only the small moving parts are animated,
 * which reads as "a session in progress" without needing video or real
 * photography.
 */
export default function HeroSessionScene({
  label = "Illustration — a tabla, vocal, and flute session in progress",
  className,
  rounded = "rounded-[3rem]",
}: {
  label?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden bg-cream-100",
        rounded,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-300 via-begonia-200 to-coral-300 opacity-25" />

      <svg
        viewBox="0 0 360 300"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Shared ground */}
        <path
          d="M0 300 L0 282 Q90 268 180 280 T360 276 L360 300 Z"
          fill={VOCALS.mid}
          opacity="0.16"
        />
        {[
          { x: 22, y: 285 },
          { x: 180, y: 292 },
          { x: 338, y: 279 },
        ].map((c, ci) => (
          <g key={ci} transform={`translate(${c.x} ${c.y})`}>
            {[-24, 0, 24].map((rot, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="0"
                rx="3.6"
                ry="7.5"
                fill={i % 2 === 0 ? VOCALS.mid : VOCALS.base}
                opacity="0.5"
                transform={`rotate(${rot})`}
              />
            ))}
          </g>
        ))}

        {/* ---------------- Tabla player (left) ---------------- */}
        <g>
          <ellipse cx="70" cy="255" rx="42" ry="16" fill={TABLA.base} />
          <path
            d="M50 255 C48 220 53 192 70 187 C87 192 92 220 90 255 Z"
            fill={TABLA.base}
          />
          <circle cx="70" cy="150" r="16" fill={TABLA.base} />
          <circle cx="70" cy="130" r="6" fill={TABLA.base} opacity="0.9" />

          {/* Drums */}
          <ellipse cx="46" cy="243" rx="16" ry="12" fill={TABLA.mid} />
          <circle cx="46" cy="243" r="5" fill={TABLA.base} opacity="0.75" />
          <ellipse cx="90" cy="233" rx="13" ry="10" fill={TABLA.mid} />
          <circle cx="90" cy="233" r="4" fill={TABLA.base} opacity="0.75" />

          {/* Static forearms */}
          <path
            d="M56 195 Q42 215 46 231"
            stroke={TABLA.base}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M84 195 Q92 212 90 223"
            stroke={TABLA.base}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />

          {/* Tapping hands — alternating strikes */}
          <motion.circle
            cx="46"
            cy="228"
            r="6"
            fill={TABLA.base}
            animate={{ cy: [222, 233, 222] }}
            transition={{ duration: 0.42, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="90"
            cy="219"
            r="5.4"
            fill={TABLA.base}
            animate={{ cy: [214, 224, 214] }}
            transition={{
              duration: 0.36,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.18,
            }}
          />
        </g>

        {/* ---------------- Vocalist (center) ---------------- */}
        <g>
          <ellipse cx="180" cy="258" rx="46" ry="17" fill={VOCALS.base} />
          <path
            d="M158 258 C156 218 162 186 180 180 C198 186 204 218 202 258 Z"
            fill={VOCALS.base}
          />
          <path
            d="M162 205 Q148 215 150 230"
            stroke={VOCALS.base}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="150"
            cy="234"
            rx="8"
            ry="6"
            fill={VOCALS.base}
            transform="rotate(-15 150 234)"
          />
          <path
            d="M200 202 Q206 190 198 178"
            stroke={VOCALS.base}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="198" cy="178" r="7" fill={VOCALS.base} />

          <circle cx="180" cy="148" r="17" fill={VOCALS.base} />
          <circle cx="180" cy="125" r="6.5" fill={VOCALS.base} opacity="0.9" />

          {/* Sound-wave rings from the singing mouth */}
          {[0, 0.5, 1].map((delay, i) => (
            <motion.circle
              key={i}
              cx="180"
              cy="157"
              r="6"
              fill="none"
              stroke={VOCALS.mid}
              strokeWidth="2"
              initial={{ opacity: 0.55 }}
              animate={{ scale: [0.6, 2.6], opacity: [0.55, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
                delay,
              }}
              style={{ transformOrigin: "180px 157px" }}
            />
          ))}

          {/* Singing mouth */}
          <motion.ellipse
            cx="180"
            cy="157"
            rx="4"
            ry="3"
            fill={VOCALS.mid}
            animate={{ scaleY: [1, 1.7, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "180px 157px" }}
          />
        </g>

        {/* ---------------- Flute player (right) ---------------- */}
        <g transform="rotate(-6 290 190)">
          <ellipse cx="290" cy="255" rx="42" ry="16" fill={FLUTE.base} />
          <path
            d="M270 255 C268 220 273 192 290 187 C307 192 312 220 310 255 Z"
            fill={FLUTE.base}
          />
          <path
            d="M270 197 Q258 180 274 175"
            stroke={FLUTE.base}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M310 197 Q326 188 318 178"
            stroke={FLUTE.base}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <g transform="translate(298 172) rotate(-15)">
            <rect x="-30" y="-4.5" width="62" height="9" rx="4.5" fill={FLUTE.mid} />
          </g>

          <circle cx="290" cy="150" r="16" fill={FLUTE.base} />
          <circle cx="290" cy="130" r="6" fill={FLUTE.base} opacity="0.9" />

          {/* Floating breath notes */}
          {[0, 0.6, 1.2].map((delay, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -34 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
                delay,
              }}
            >
              <g transform={`translate(${330 + i * 3} ${158 - i * 4}) rotate(-12)`}>
                <rect x="-1.2" y="-11" width="2.4" height="13" fill={FLUTE.mid} />
                <ellipse cx="-3" cy="2" rx="3.6" ry="2.6" fill={FLUTE.mid} />
              </g>
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
}
