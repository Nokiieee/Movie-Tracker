import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import { AddMovieForm } from "@/components/movies/add-movie-form";
import { MovieList } from "@/components/movies/movie-list";
import { Movie } from "@/lib/definitions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: movies, error } = await supabase
    .schema("movie_tracker")
    .from("movies")
    .select("id, title, status, rating, notes, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const name = user.user_metadata?.full_name ?? user.email;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-[var(--tape-border)]">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="font-[family-name:var(--font-hand)] text-3xl font-semibold leading-none text-[var(--ink)] -rotate-1">
              Movie Tracker
            </h1>
            <p className="mt-1 text-sm italic text-[var(--ink-soft)]">{name}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-[var(--tape-border)] bg-[var(--paper-panel)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--paper)]"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-6">
        <AddMovieForm />

        {error ? (
          <p className="text-sm text-red-700">
            Could not load your movies. Please try again later.
          </p>
        ) : (
          <MovieList movies={(movies as Movie[]) ?? []} />
        )}
      </main>
    </div>
  );
}
