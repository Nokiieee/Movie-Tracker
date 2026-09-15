# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (`eslint-config-next` core-web-vitals + typescript)
- No test suite exists in this repo.

## Architecture

**Stack:** Next.js App Router + Supabase (Postgres + Auth), styled with Tailwind CSS v4 using CSS custom properties. All data access goes through Supabase — there is no separate backend/API layer.

**Auth flow:** `proxy.ts` (this Next.js version's replacement for `middleware.ts` — see `AGENTS.md`) runs `updateSession()` from `lib/supabase/proxy.ts` on every request except static assets. It calls `supabase.auth.getUser()` once, redirects unauthenticated users away from `/dashboard` and authenticated users away from `/login`/`/signup`, then forwards the verified result downstream as trusted request headers (`x-user-id`, `x-user-email`, `x-user-name`) rather than letting each Server Component/Action re-verify. `app/dashboard/page.tsx` and the `requireUserId()` helper in `app/actions/*.ts` read these headers instead of calling Supabase Auth again. Server Actions can't be redirected via `NextResponse.redirect()` from the proxy (breaks the Server Action client runtime with "unexpected response"), so requests carrying a `next-action` header are deliberately let through instead of blocked there.

There are three separate Supabase client constructors, one per context (cookie handling differs in each):
- `lib/supabase/client.ts` — browser (Client Components)
- `lib/supabase/server.ts` — Server Components/Actions (reads/writes cookies via `next/headers`)
- `lib/supabase/proxy.ts` — the proxy/middleware itself (reads/writes cookies via `NextRequest`/`NextResponse`)

**Data:** all movie data lives in the `movie_tracker.movies` table (non-default Postgres schema — every query chains `.schema("movie_tracker")` before `.from("movies")`), scoped per-user by `user_id` and always filtered with `.eq("user_id", userId)`. Writes go exclusively through the Server Actions in `app/actions/movies.ts` (`addMovie`, `deleteMovie`, `updateMovie`) and `app/actions/auth.ts` (`signup`, `login`, `logout`) — there are no Route Handlers for mutations except `app/auth/confirm/route.ts`, which exchanges a Supabase email-confirmation code for a session.

**Forms:** client components (`components/movies/*-form.tsx`, `app/login/login-form.tsx`) call Server Actions via `useActionState`, with validation schemas and state types shared from `lib/definitions.ts` (Zod). `MOVIE_STATUSES`/`MOVIE_STATUS_LABELS` in that file are the single source of truth for the three movie statuses (`want_to_watch`, `watching`, `watched`).

**Routes:** `/` (landing, redirects to `/dashboard` if already signed in) → `/signup` → `/signup/check-email` → `/auth/confirm` (email link target) → `/dashboard` (protected, redirects to `/login` if not signed in).

**Design system:** DESIGN.md is authoritative for styling — a "movie-night diary" theme (washi-tape flags, Caveat wordmark, paper tones) applied via a `.diary` CSS-variable scope on `<body>` in `app/layout.tsx`. Notable hard rules from DESIGN.md: never use a colored left/right border (use a background tint instead), Caveat is reserved for the "Movie Tracker" wordmark only (never data or headings), and each movie status's color must appear on its section tab itself, not as a decorative accent. PRODUCT.md defines product scope/principles (minimal, no-frills tracker — no multi-user sharing or public profiles planned).

**Deployment:** deployed on Vercel; there is no `vercel.json`, so the Serverless Function region is set only in the Vercel dashboard (Project Settings → Functions). It must be kept close to the Supabase project's region (Singapore) — a mismatch (e.g. left on Vercel's US default) adds two long-haul round trips to every request, since `proxy.ts` runs on nearly every route and this Next.js version's Edge Runtime is deprecated (proxy/middleware now runs in the single Node.js home region, not globally distributed).
