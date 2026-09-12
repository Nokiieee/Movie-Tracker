import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="-rotate-1 font-[family-name:var(--font-hand)] text-4xl font-semibold leading-none text-[var(--ink)]">
          Movie Tracker
        </h1>

        <div className="rounded-lg border border-[var(--tape-border)] bg-[var(--paper-panel)] p-6 shadow-[0_2px_10px_rgba(58,52,44,0.06)]">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--sage)] text-[var(--sage-ink)]">
            <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
              <path
                d="M3 5.5h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M3 6l7 5 7-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[var(--ink)]">Check your email</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            We sent you a confirmation link. Click it to activate your account,
            then log in.
          </p>
        </div>

        <Link href="/login" className="text-sm font-medium text-[var(--ink)] underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
