"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { addMovie } from "@/app/actions/movies";
import { MOVIE_STATUSES, MOVIE_STATUS_LABELS, MovieStatus } from "@/lib/definitions";
import { StarRating } from "@/components/movies/star-rating";

const fieldClass =
  "w-full rounded-none border-b-2 border-[var(--shelf-brown-soft)] bg-transparent px-0 py-1.5 font-[family-name:var(--font-data)] text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--shelf-brown)]";

const labelClass =
  "font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)]";

export function AddMovieForm() {
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
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="border border-dashed border-[var(--shelf-brown)] bg-[var(--ground-raised)] p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.06em] text-[var(--ink)]">
          New Arrival
        </h2>
        <span className={labelClass}>Label Ticket</span>
      </div>

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
            <p className="text-xs text-red-700">{state.errors.title[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className={labelClass}>
            Shelf
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
            <p className="text-xs text-red-700">{state.errors.status[0]}</p>
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

      <div className="mt-4 space-y-1">
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
        <p className="mt-3 text-sm text-red-700">{state.message}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[var(--shelf-brown-soft)] pt-4">
        <div className="min-w-0">
          <p className={`${labelClass} mb-1`}>Preview</p>
          {title.trim() ? (
            <div className="flex items-center gap-2 truncate">
              <span className="font-[family-name:var(--font-display)] text-[15px] font-semibold uppercase tracking-[0.01em] text-[var(--ink)] truncate">
                {title}
              </span>
              <StarRating rating={rating ? Number(rating) : null} />
              <span className="font-[family-name:var(--font-data)] text-[11px] text-[var(--ink-soft)]">
                · {MOVIE_STATUS_LABELS[status]}
              </span>
            </div>
          ) : (
            <p className="text-sm italic text-[var(--ink-soft)]">
              Start typing a title to preview its spine label.
            </p>
          )}
        </div>

        <button
          disabled={pending}
          type="submit"
          className="shrink-0 bg-[var(--accent)] px-5 py-2 font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.04em] text-[var(--accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Shelving..." : "Add to Shelf"}
        </button>
      </div>
    </form>
  );
}
