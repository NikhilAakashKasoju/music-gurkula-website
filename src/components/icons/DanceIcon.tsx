export default function DanceIcon({ className }: { className?: string }) {
  const beads = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return {
      cx: 32 + Math.cos(angle) * 19,
      cy: 32 + Math.sin(angle) * 19,
    };
  });

  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="19"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.55"
      />
      {beads.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r="4" fill="currentColor" />
      ))}
    </svg>
  );
}
