type JetMarkProps = {
  className?: string;
};

/** Minimal delta-wing mark used by the HUD, loader and footer. */
export function JetMark({ className = "h-6 w-6" }: JetMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 3 37 35H3L20 3Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M20 12 29 33H11l9-21Z" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="20" cy="25" r="1.4" fill="currentColor" />
      <path d="M0 20h6M34 20h6M20 0v4M20 36v4" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
    </svg>
  );
}
