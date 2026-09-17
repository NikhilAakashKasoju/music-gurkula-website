export default function NotesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="20.5" y="14" width="3.4" height="34" fill="currentColor" />
      <rect x="46.5" y="10" width="3.4" height="32" fill="currentColor" />
      <path d="M20.5 14 L49.9 10 V17.5 L20.5 21.5 Z" fill="currentColor" />
      <ellipse
        cx="14.5"
        cy="46"
        rx="8"
        ry="6"
        fill="currentColor"
        transform="rotate(-18 14.5 46)"
      />
      <ellipse
        cx="40.5"
        cy="40.5"
        rx="8"
        ry="6"
        fill="currentColor"
        transform="rotate(-18 40.5 40.5)"
      />
    </svg>
  );
}
