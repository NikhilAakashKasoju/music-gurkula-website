/** A single stylized leaf — used as a small "nature" accent around the site. */
export default function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 36 C4 18 16 4 36 4 C36 24 22 36 4 36 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M7 33 C15 24 23 16 34 6"
        stroke="var(--color-cream)"
        strokeWidth="1.4"
        opacity="0.45"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
