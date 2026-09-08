import { Movie, MOVIE_STATUS_LABELS } from "@/lib/definitions";

export function MovieList({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) {
    return (
      <p className="text-sm text-neutral-500">
        You haven&apos;t added any movies yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="rounded-lg border border-neutral-200 p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-medium">{movie.title}</h3>
            {movie.rating && (
              <span className="shrink-0 text-sm text-amber-500">
                {"★".repeat(movie.rating)}
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500">
            {MOVIE_STATUS_LABELS[movie.status]}
          </p>
          {movie.notes && (
            <p className="mt-2 text-sm text-neutral-600">{movie.notes}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
