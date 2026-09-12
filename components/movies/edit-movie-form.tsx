"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateMovie } from "@/app/actions/movies";
import { Movie, MOVIE_STATUSES, MOVIE_STATUS_LABELS } from "@/lib/definitions";

const fieldClass =
  "w-full rounded-md border border-[var(--tape-border)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--ink)]";

const labelClass = "text-sm font-medium text-[var(--ink-soft)]";

export function EditMovieForm({
  movie,
  tint,
  onCancel,
}: {
  movie: Movie;
  tint: string;
  onCancel: () => void;
}) {
  const [state, action, pending] = useActionState(updateMovie, undefined);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.errors && !state?.message) {
      onCancel();
    }
    wasPending.current = pending;
  }, [pending, state, onCancel]);

  return (
    <form
      action={action}
      className="space-y-3 px-4 py-3"
      style={{ backgroundColor: tint }}
    >
      <input type="hidden" name="id" value={movie.id} />
      <p className="truncate text-sm font-medium text-[var(--ink)]">{movie.title}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor={`status-${movie.id}`} className={labelClass}>
            Status
          </label>
          <select
            id={`status-${movie.id}`}
            name="status"
            defaultValue={movie.status}
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
          <label htmlFor={`rating-${movie.id}`} className={labelClass}>
            Rating
          </label>
          <select
            id={`rating-${movie.id}`}
            name="rating"
            defaultValue={movie.rating ?? ""}
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
        <label htmlFor={`notes-${movie.id}`} className={labelClass}>
          Notes
        </label>
        <textarea
          id={`notes-${movie.id}`}
          name="notes"
          rows={2}
          defaultValue={movie.notes ?? ""}
          placeholder="Optional notes..."
          className={`${fieldClass} resize-none`}
        />
      </div>

      {state?.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[var(--tape-border)] px-3 py-1.5 text-sm font-medium text-[var(--ink-soft)] transition-colors hover:bg-white"
        >
          Cancel
        </button>
        <button
          disabled={pending}
          type="submit"
          className="rounded-md bg-[var(--ink)] px-3 py-1.5 text-sm font-medium text-[var(--paper-panel)] disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
