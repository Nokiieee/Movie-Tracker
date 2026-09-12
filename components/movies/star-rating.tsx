const STAMP_TILTS = [-6, 4, -3, 5, -5];

function Star({ filled, tilt }: { filled: boolean; tilt: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      aria-hidden="true"
      className="shrink-0"
      style={{ transform: filled ? `rotate(${tilt}deg)` : undefined }}
    >
      <path
        d="M10 1.6l2.47 5.24 5.78.66-4.3 3.94 1.16 5.7L10 14.2l-5.11 2.94 1.16-5.7-4.3-3.94 5.78-.66L10 1.6z"
        fill={filled ? "#facc15" : "none"}
        stroke={filled ? "#e8a93d" : "#ddd0b8"}
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
  return (
    <span
      className="inline-flex w-[78px] shrink-0 items-center gap-0.5"
      aria-label={rating ? `${rating} out of ${max} stars` : "No rating"}
    >
      {rating
        ? Array.from({ length: max }, (_, i) => (
            <Star key={i} filled={i < rating} tilt={STAMP_TILTS[i % STAMP_TILTS.length]} />
          ))
        : null}
    </span>
  );
}
