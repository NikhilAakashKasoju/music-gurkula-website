export default function LavenderSprigIcon({ className }: { className?: string }) {
  const buds = Array.from({ length: 8 }).map((_, i) => {
    const y = 66 - i * 7.2;
    const side = i % 2 === 0 ? -1 : 1;
    return { y, x: 20 + side * 5.5, rotate: side * 24 };
  });

  return (
    <svg viewBox="0 0 40 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 78 C20 55, 20 40, 20 14"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.55"
        fill="none"
      />
      {buds.map((b, i) => (
        <ellipse
          key={i}
          cx={b.x}
          cy={b.y}
          rx="4.2"
          ry="6.4"
          fill="currentColor"
          opacity={0.85}
          transform={`rotate(${b.rotate} ${b.x} ${b.y})`}
        />
      ))}
    </svg>
  );
}
