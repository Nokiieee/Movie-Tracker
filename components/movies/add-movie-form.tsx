"use client";

import { useActionState, useEffect, useRef } from "react";
import { addMovie } from "@/app/actions/movies";
import { MOVIE_STATUSES, MOVIE_STATUS_LABELS } from "@/lib/definitions";

export function AddMovieForm() {
  const [state, action, pending] = useActionState(addMovie, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.errors && !state?.message) {
      formRef.current?.reset();
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="space-y-4 rounded-lg border border-neutral-200 p-4"
    >
      <h2 className="text-lg font-semibold">Add a movie</h2>

      <div className="space-y-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="e.g. The Matrix"
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
        {state?.errors?.title && (
          <p className="text-sm text-red-600">{state.errors.title[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue="want_to_watch"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          >
            {MOVIE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {MOVIE_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          {state?.errors?.status && (
            <p className="text-sm text-red-600">{state.errors.status[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="rating" className="text-sm font-medium">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            defaultValue=""
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          >
            <option value="">No rating</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="notes" className="text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Optional notes..."
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
      </div>

      {state?.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        disabled={pending}
        type="submit"
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Adding..." : "Add Movie"}
      </button>
    </form>
  );
}
