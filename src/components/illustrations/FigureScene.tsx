import type { ProgramIcon } from "@/lib/programs";

interface Vars {
  base: string;
  mid: string;
}

const VIEWBOX: Record<"full" | "bust" | "wide", string> = {
  full: "0 0 240 300",
  bust: "30 90 180 180",
  wide: "0 60 240 170",
};

/**
 * A single-color, faceless silhouette practicing an instrument (or dancing),
 * seated/standing on a small strip of stylized ground foliage — a hand-drawn
 * stand-in for a real photograph. Deliberately abstract (one flat silhouette
 * color, no facial features, no specific ethnicity/gender markers) so it
 * reads as "a student learning" rather than depicting anyone in particular.
 *
 * `crop` reuses the same coordinate space at three viewBoxes: "full" (the
 * whole seated/standing figure with ground), "bust" (head + shoulders, for
 * portrait-style spots), and "wide" (a shorter landscape slice, for gallery
 * cells).
 */
export default function FigureScene({
  icon,
  vars,
  crop = "full",
  className,
}: {
  icon: ProgramIcon;
  vars: Vars;
  crop?: "full" | "bust" | "wide";
  className?: string;
}) {
  const { base, mid } = vars;
  const isDance = icon === "dance";

  return (
    <svg
      viewBox={VIEWBOX[crop]}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {/* Ground wash + stylized foliage clusters */}
      <path
        d="M0 300 L0 285 Q60 270 120 282 T240 278 L240 300 Z"
        fill={mid}
        opacity="0.16"
      />
      {[
        { x: 26, y: 283 },
        { x: 205, y: 279 },
        { x: 118, y: 291 },
      ].map((c, ci) => (
        <g key={ci} transform={`translate(${c.x} ${c.y})`}>
          {[-24, 0, 24].map((rot, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="0"
              rx="4.2"
              ry="9"
              fill={i % 2 === 0 ? mid : base}
              opacity="0.55"
              transform={`rotate(${rot})`}
            />
          ))}
        </g>
      ))}

      {/* Base / legs / skirt */}
      {isDance ? (
        <path d="M100 198 L58 275 Q120 292 182 275 L140 198 Z" fill={base} />
      ) : (
        <ellipse cx="120" cy="258" rx="58" ry="20" fill={base} />
      )}

      {/* Torso */}
      <path
        d={
          isDance
            ? "M100 198 C98 172 104 158 120 158 C136 158 142 172 140 198 Z"
            : "M92 258 C90 205 96 165 120 158 C144 165 150 205 148 258 Z"
        }
        fill={base}
      />

      {/* Accessory + arms, per discipline */}
      {icon === "notes" && (
        <>
          <ellipse
            cx="88"
            cy="215"
            rx="11"
            ry="7"
            fill={base}
            transform="rotate(-20 88 215)"
          />
          <path
            d="M140 170 Q150 195 130 208"
            stroke={base}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="130" cy="208" r="8" fill={base} />
          <g transform="translate(168 104) rotate(-15)">
            <rect x="-1.5" y="-16" width="3" height="18" fill={mid} />
            <ellipse cx="-4" cy="3" rx="5" ry="3.6" fill={mid} />
          </g>
        </>
      )}

      {icon === "tabla" && (
        <>
          <path
            d="M100 170 Q85 205 88 232"
            stroke={base}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M140 170 Q150 200 142 226"
            stroke={base}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="85" cy="248" rx="22" ry="16" fill={mid} />
          <circle cx="85" cy="248" r="7" fill={base} opacity="0.8" />
          <ellipse cx="142" cy="238" rx="17" ry="13" fill={mid} />
          <circle cx="142" cy="238" r="5.5" fill={base} opacity="0.8" />
        </>
      )}

      {icon === "flute" && (
        <>
          <path
            d="M100 168 Q90 150 108 148"
            stroke={base}
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M140 168 Q158 158 150 150"
            stroke={base}
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />
          <g transform="translate(138 144) rotate(-15)">
            <rect x="-34" y="-5" width="68" height="10" rx="5" fill={mid} />
          </g>
        </>
      )}

      {isDance && (
        <>
          <path
            d="M136 165 Q158 150 150 122"
            stroke={base}
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="150" cy="122" r="7" fill={base} />
          <path
            d="M104 168 Q78 178 62 172"
            stroke={base}
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="62" cy="172" r="7" fill={base} />
          <path
            d="M110 110 Q150 100 170 130"
            stroke={mid}
            strokeWidth="3"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          {[
            [58, 275],
            [182, 275],
          ].map(([fx, fy], gi) => (
            <g key={gi}>
              {[-6, 0, 6].map((dx, i) => (
                <circle
                  key={i}
                  cx={fx + dx}
                  cy={fy + (i === 1 ? -3 : 0)}
                  r="2.4"
                  fill={mid}
                />
              ))}
            </g>
          ))}
        </>
      )}

      {/* Head + simple top-knot */}
      <circle cx="120" cy="140" r="22" fill={base} />
      <circle cx="120" cy="112" r="9" fill={base} opacity="0.9" />

      {/* Floating petal accents */}
      <ellipse
        cx="26"
        cy="40"
        rx="6"
        ry="9"
        fill={mid}
        opacity="0.35"
        transform="rotate(-25 26 40)"
      />
      <ellipse
        cx="212"
        cy="56"
        rx="5"
        ry="8"
        fill={mid}
        opacity="0.3"
        transform="rotate(20 212 56)"
      />
    </svg>
  );
}
