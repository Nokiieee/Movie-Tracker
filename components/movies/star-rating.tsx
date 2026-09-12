function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M10 1.6l2.47 5.24 5.78.66-4.3 3.94 1.16 5.7L10 14.2l-5.11 2.94 1.16-5.7-4.3-3.94 5.78-.66L10 1.6z"
        fill={filled ? "var(--accent)" : "none"}
        stroke={filled ? "var(--accent)" : "var(--ink-soft)"}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarRating({
  rating,
  max = 5,
}: {
  rating: number | null;
  max?: number;
}) {
  if (!rating) return null;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </span>
  );
}
