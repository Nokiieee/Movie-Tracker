import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Movie Tracker</h1>
        <p className="text-sm text-neutral-500">
          Keep a list of the movies you&apos;ve watched and want to watch.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/signup"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
