export default function BegoniaBloomIcon({ className }: { className?: string }) {
  const petalAngles = [0, 60, 120, 180, 240, 300];

  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      {petalAngles.map((deg) => (
        <ellipse
          key={deg}
          cx="30"
          cy="16"
          rx="9.5"
          ry="14.5"
          fill="currentColor"
          transform={`rotate(${deg} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="6.5" fill="var(--color-sunshine-400)" />
    </svg>
  );
}
