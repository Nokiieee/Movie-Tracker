"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const searchParams = useSearchParams();
  const redirectError = searchParams.get("error");

  return (
    <div className="w-full max-w-sm space-y-6">
      <h1 className="-rotate-1 text-center font-[family-name:var(--font-hand)] text-4xl font-semibold leading-none text-[var(--ink)]">
        Movie Tracker
      </h1>

      <div className="relative pt-3">
        <span className="absolute left-4 top-0 -rotate-2 rounded-sm bg-[var(--lilac)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--lilac-ink)] shadow-[0_2px_4px_rgba(58,52,44,0.15)]">
          Welcome back
        </span>
        <div className="rounded-lg border border-[var(--tape-border)] bg-[var(--paper-panel)] p-6 pt-8 shadow-[0_2px_10px_rgba(58,52,44,0.06)]">
          <div className="mb-5 space-y-1 text-center">
            <h2 className="text-xl font-semibold text-[var(--ink)]">Log in</h2>
            <p className="text-sm text-[var(--ink-soft)]">
              Welcome back to Movie Tracker.
            </p>
          </div>

          <form action={action} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-[var(--ink-soft)]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-[var(--tape-border)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-600">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-[var(--ink-soft)]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-[var(--tape-border)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--ink)]"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-600">{state.errors.password[0]}</p>
              )}
            </div>

            {(state?.message || redirectError) && (
              <p className="text-sm text-red-600">
                {state?.message ?? redirectError}
              </p>
            )}

            <button
              disabled={pending}
              type="submit"
              className="w-full rounded-md bg-[var(--ink)] px-3 py-2 text-sm font-medium text-[var(--paper-panel)] transition-transform duration-150 hover:-rotate-1 disabled:opacity-50"
            >
              {pending ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>

      <p className="text-center text-sm text-[var(--ink-soft)]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-[var(--ink)] underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
