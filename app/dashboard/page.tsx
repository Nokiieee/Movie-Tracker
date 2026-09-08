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
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Welcome, {name}</h1>
          <p className="text-sm text-neutral-500">{user.email}</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium"
          >
            Log out
          </button>
        </form>
      </div>

      <AddMovieForm />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Your movies</h2>
        {error ? (
          <p className="text-sm text-red-600">
            Could not load your movies. Please try again later.
          </p>
        ) : (
          <MovieList movies={(movies as Movie[]) ?? []} />
        )}
      </div>
    </div>
  );
}
