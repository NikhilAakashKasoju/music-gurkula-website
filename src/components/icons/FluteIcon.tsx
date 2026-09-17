export default function FluteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <g transform="rotate(-32 32 32)">
        <rect x="4" y="27" width="56" height="10" rx="5" fill="currentColor" />
        <rect x="3" y="26" width="5" height="12" rx="2.5" fill="currentColor" opacity="0.65" />
        <rect x="56" y="26" width="5" height="12" rx="2.5" fill="currentColor" opacity="0.65" />
        {[15, 25, 35, 45].map((cx) => (
          <circle key={cx} cx={cx} cy={32} r="1.8" fill="rgba(0,0,0,0.32)" />
        ))}
      </g>
    </svg>
  );
}
