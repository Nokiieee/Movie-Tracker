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
        <h1 className="-rotate-1 font-[family-name:var(--font-hand)] text-5xl font-semibold leading-none text-[var(--ink)]">
          Movie Tracker
        </h1>
        <p className="text-sm text-[var(--ink-soft)]">
          Keep a list of the movies you&apos;ve watched and want to watch.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/signup"
          className="rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper-panel)] transition-transform duration-150 hover:-rotate-1"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-[var(--tape-border)] bg-[var(--paper-panel)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--paper)]"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
