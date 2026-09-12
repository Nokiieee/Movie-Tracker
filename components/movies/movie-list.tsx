"use client";

import { useMemo, useState } from "react";
import { Movie, MOVIE_STATUSES, MOVIE_STATUS_LABELS, MovieStatus } from "@/lib/definitions";
import { StarRating } from "@/components/movies/star-rating";

const STATUS_STYLE: Record<MovieStatus, { bg: string; ink: string; tint: string; rotate: string }> = {
  want_to_watch: { bg: "var(--rose)", ink: "var(--rose-ink)", tint: "var(--rose-tint)", rotate: "-rotate-1" },
  watching: { bg: "var(--sage)", ink: "var(--sage-ink)", tint: "var(--sage-tint)", rotate: "rotate-1" },
  watched: { bg: "var(--butter)", ink: "var(--butter-ink)", tint: "var(--butter-tint)", rotate: "-rotate-1" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function MovieRow({ movie, tint }: { movie: Movie; tint: string }) {
  const [open, setOpen] = useState(false);
  const hasNotes = Boolean(movie.notes);

  return (
    <li className="border-b border-[var(--tape-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => hasNotes && setOpen((v) => !v)}
        aria-expanded={hasNotes ? open : undefined}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left ${
          hasNotes ? "cursor-pointer hover:bg-[var(--paper)]" : "cursor-default"
        }`}
      >
        <span className="flex-1 truncate text-sm font-medium text-[var(--ink)]">
          {movie.title}
        </span>
        <StarRating rating={movie.rating} />
        <span className="shrink-0 text-sm tabular-nums text-[var(--ink-soft)]">
          {formatDate(movie.created_at)}
        </span>
        <span className="flex w-3 shrink-0 items-center justify-center">
          {hasNotes && (
            <svg
              viewBox="0 0 20 20"
              width="12"
              height="12"
              className={`text-[var(--ink-soft)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path
                d="M5 7.5l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </button>
      {hasNotes && open && (
        <p
          className="max-w-[70ch] px-4 py-3 text-sm leading-relaxed text-[var(--ink-soft)]"
          style={{ backgroundColor: tint }}
        >
          {movie.notes}
        </p>
      )}
    </li>
  );
}

function StatusSection({ status, movies }: { status: MovieStatus; movies: Movie[] }) {
  const style = STATUS_STYLE[status];
  return (
    <section className="relative pt-3">
      <span
        className={`absolute left-3 top-0 ${style.rotate} rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-[0_2px_4px_rgba(58,52,44,0.15)]`}
        style={{ backgroundColor: style.bg, color: style.ink }}
      >
        {MOVIE_STATUS_LABELS[status]} · {movies.length}
      </span>
      <div className="rounded-lg border border-[var(--tape-border)] bg-[var(--paper-panel)] pt-4 shadow-[0_2px_10px_rgba(58,52,44,0.06)]">
        {movies.length === 0 ? (
          <p className="px-4 py-4 text-sm text-[var(--ink-soft)]">
            No movies here yet.
          </p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <MovieRow key={movie.id} movie={movie} tint={style.tint} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function MovieList({ movies }: { movies: Movie[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(q));
  }, [movies, query]);

  const byStatus = useMemo(() => {
    const groups: Record<MovieStatus, Movie[]> = {
      want_to_watch: [],
      watching: [],
      watched: [],
    };
    for (const movie of filtered) groups[movie.status].push(movie);
    return groups;
  }, [filtered]);

  if (movies.length === 0) {
    return (
      <p className="text-sm text-[var(--ink-soft)]">
        Your list is empty — add your first movie above.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 rounded-md border border-[var(--tape-border)] bg-[var(--paper-panel)] px-3 py-2">
        <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" className="shrink-0 text-[var(--ink-soft)]">
          <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your movies..."
          className="w-full bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] outline-none"
        />
      </div>

      <div className="space-y-6">
        {MOVIE_STATUSES.map((status) => (
          <StatusSection key={status} status={status} movies={byStatus[status]} />
        ))}
      </div>
    </div>
  );
}
