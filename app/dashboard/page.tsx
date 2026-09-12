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
    <div className="flex min-h-full flex-1 flex-col bg-[var(--ground)]">
      <header className="bg-[var(--shelf-brown)]">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-5">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-[0.02em] text-[var(--ground)]">
            Movie Tracker
          </h1>
          <form action={logout}>
            <button
              type="submit"
              className="border border-[var(--shelf-brown-soft)] px-3 py-1.5 font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.06em] text-[var(--ground)] transition-colors hover:bg-black/10"
            >
              Log out
            </button>
          </form>
        </div>
        <div className="mx-auto w-full max-w-3xl px-6 pb-4">
          <p className="font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.08em] text-[var(--shelf-brown-soft)]">
            Member · {name}
          </p>
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
