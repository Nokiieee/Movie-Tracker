"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { addMovie } from "@/app/actions/movies";
import { MOVIE_STATUSES, MOVIE_STATUS_LABELS, MovieStatus } from "@/lib/definitions";
import { StarRating } from "@/components/movies/star-rating";

const fieldClass =
  "w-full rounded-md border border-[var(--tape-border)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--ink)]";

const labelClass = "text-sm font-medium text-[var(--ink-soft)]";

export function AddMovieForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, action, pending] = useActionState(addMovie, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<MovieStatus>("want_to_watch");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (wasPending.current && !pending && !state?.errors && !state?.message) {
      formRef.current?.reset();
      setTitle("");
      setStatus("want_to_watch");
      setRating("");
      onSuccess?.();
    }
    wasPending.current = pending;
  }, [pending, state, onSuccess]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-1">
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="e.g. The Matrix"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
          />
          {state?.errors?.title && (
            <p className="text-sm text-red-600">{state.errors.title[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as MovieStatus)}
            className={fieldClass}
          >
            {MOVIE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {MOVIE_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          {state?.errors?.status && (
            <p className="text-sm text-red-600">{state.errors.status[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="rating" className={labelClass}>
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={fieldClass}
          >
            <option value="">No rating</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="notes" className={labelClass}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          placeholder="Optional notes..."
          className={`${fieldClass} resize-none`}
        />
      </div>

      {state?.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[var(--tape-border)] pt-4">
        <div className="min-w-0">
          {title.trim() ? (
            <div className="flex items-center gap-2 truncate">
              <span className="truncate text-sm font-medium text-[var(--ink)]">
                {title}
              </span>
              <StarRating rating={rating ? Number(rating) : null} />
              <span className="text-sm text-[var(--ink-soft)]">
                · {MOVIE_STATUS_LABELS[status]}
              </span>
            </div>
          ) : (
            <p className="text-sm text-[var(--ink-soft)]">
              Start typing a title to preview it.
            </p>
          )}
        </div>

        <button
          disabled={pending}
          type="submit"
          className="shrink-0 rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper-panel)] transition-transform duration-150 hover:-rotate-1 disabled:opacity-50"
        >
          {pending ? "Stamping..." : "Add movie"}
        </button>
      </div>
    </form>
  );
}
