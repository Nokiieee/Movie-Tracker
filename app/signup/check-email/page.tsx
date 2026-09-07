import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Check your email</h1>
        <p className="text-sm text-neutral-500">
          We sent you a confirmation link. Click it to activate your account,
          then log in.
        </p>
        <Link href="/login" className="text-sm font-medium text-neutral-900 underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
