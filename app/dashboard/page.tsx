import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileMenu } from "@/components/profile-menu";
import { AddMovieLauncher } from "@/components/movies/add-movie-launcher";
import { MovieList } from "@/components/movies/movie-list";
import { Movie } from "@/lib/definitions";

export default async function DashboardPage() {
  // The middleware already verified the session for this request and
  // handed the result down via headers, so there's no need to call
  // supabase.auth.getUser() a second time here.
  const requestHeaders = await headers();
  const userId = requestHeaders.get("x-user-id");

  if (!userId) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: movies, error } = await supabase
    .schema("movie_tracker")
    .from("movies")
    .select("id, title, status, rating, notes, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const email = requestHeaders.get("x-user-email") ?? "";
  const decodedName = decodeURIComponent(requestHeaders.get("x-user-name") ?? "");
  const name = decodedName || email;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-[var(--tape-border)]">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-5">
          <h1 className="shrink-0 -rotate-1 font-[family-name:var(--font-hand)] text-2xl font-semibold leading-none text-[var(--ink)] sm:text-3xl">
            Movie Tracker
          </h1>
          <ProfileMenu name={name} email={email} />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-6">
        <AddMovieLauncher />

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
