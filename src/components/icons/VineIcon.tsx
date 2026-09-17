/** A curling vine with small leaves — used for corner/border "nature" flourishes. */
export default function VineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 4 C 30 4, 24 34, 50 34 C 76 34, 70 8, 100 8 C 112 8, 116 16, 118 24"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
        fill="none"
        strokeLinecap="round"
      />
      {[
        { x: 16, y: 8, r: -30 },
        { x: 38, y: 24, r: 20 },
        { x: 62, y: 30, r: -15 },
        { x: 86, y: 14, r: 25 },
        { x: 106, y: 12, r: -20 },
      ].map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x}
          cy={leaf.y}
          rx="6"
          ry="3.6"
          fill="currentColor"
          opacity="0.8"
          transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
        />
      ))}
    </svg>
  );
}
