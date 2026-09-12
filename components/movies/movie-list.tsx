"use client";

import { useMemo, useState } from "react";
import { Movie, MOVIE_STATUSES, MOVIE_STATUS_LABELS, MovieStatus } from "@/lib/definitions";
import { StarRating } from "@/components/movies/star-rating";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function SpineRow({ movie }: { movie: Movie }) {
  const [open, setOpen] = useState(false);
  const hasNotes = Boolean(movie.notes);

  return (
    <li className="border-b border-l border-b-[var(--shelf-brown-soft)] border-l-[var(--shelf-brown)] last:border-b-0">
      <button
        type="button"
        onClick={() => hasNotes && setOpen((v) => !v)}
        aria-expanded={hasNotes ? open : undefined}
        className={`flex w-full items-center gap-3 py-3 pl-3 text-left ${
          hasNotes ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <span
          className="font-[family-name:var(--font-display)] text-[15px] font-semibold uppercase tracking-[0.01em] text-[var(--ink)] truncate flex-1"
        >
          {movie.title}
        </span>
        <StarRating rating={movie.rating} />
        <span className="font-[family-name:var(--font-data)] text-[11px] text-[var(--ink-soft)] shrink-0 tabular-nums">
          {formatDate(movie.created_at)}
        </span>
        {hasNotes && (
          <svg
            viewBox="0 0 20 20"
            width="12"
            height="12"
            className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path
              d="M5 7.5l5 5 5-5"
              fill="none"
              stroke="var(--ink-soft)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {hasNotes && open && (
        <p className="max-w-[70ch] pb-4 pl-3 text-sm leading-relaxed text-[var(--ink-soft)]">
          {movie.notes}
        </p>
      )}
    </li>
  );
}

function Aisle({ status, movies }: { status: MovieStatus; movies: Movie[] }) {
  return (
    <section>
      <div className="inline-flex items-center gap-2 rounded-t-sm bg-[var(--accent)] px-3 py-1.5">
        <h3 className="font-[family-name:var(--font-display)] text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--accent-ink)]">
          {MOVIE_STATUS_LABELS[status]}
        </h3>
        <span className="font-[family-name:var(--font-data)] text-[11px] font-normal text-[var(--accent-ink)]">
          {movies.length}
        </span>
      </div>
      <div className="rounded-b-sm rounded-tr-sm border border-[var(--shelf-brown-soft)] bg-[var(--ground-raised)] px-4">
        {movies.length === 0 ? (
          <p className="py-4 text-sm italic text-[var(--ink-soft)]">
            This shelf is empty.
          </p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <SpineRow key={movie.id} movie={movie} />
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
      <p className="text-sm italic text-[var(--ink-soft)]">
        Your shelf is empty — add your first movie above.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-[var(--shelf-brown)] pb-2">
        <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" className="shrink-0 text-[var(--ink-soft)]">
          <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the shelf..."
          className="w-full bg-transparent font-[family-name:var(--font-data)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] outline-none"
        />
      </div>

      <div className="space-y-5">
        {MOVIE_STATUSES.map((status) => (
          <Aisle key={status} status={status} movies={byStatus[status]} />
        ))}
      </div>
    </div>
  );
}
