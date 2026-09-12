# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Anyone who wants a simple way to track movies they want to watch, are watching, or have watched. The product is built for general public sign-up (each person gets their own account and list) and doubles as a portfolio piece, so it should read as a real, ship-quality product rather than a personal scratchpad — but with no niche audience or specialized workflow beyond that.

## Product Purpose

Movie Tracker lets a signed-in user maintain a personal list of movies with a status (Want to Watch, Watching, Watched), an optional 1-5 star rating, and optional notes. Success is a fast, low-friction way to log and revisit that list.

## Positioning

Intentionally a minimal, no-frills tracker — there is no differentiating mechanism versus Letterboxd/IMDb/a notes app, and none is being pursued. The value is straightforward execution: a clean, well-crafted, reliable version of the simple "add a movie, set its status, rate it, note it" workflow, not a novel feature or angle.

## Operating Context

- Email/password auth via Supabase (`@supabase/ssr` + `@supabase/supabase-js`), including a signup confirmation-email flow (`/signup/check-email`, `/auth/confirm`).
- Authenticated users land on `/dashboard`, which shows an add-movie form and their own movie list; unauthenticated visitors are redirected to `/login` from protected routes and from `/` to `/dashboard` when already signed in.
- Data is per-user: movies are scoped by `user_id` in a Supabase `movie_tracker.movies` table (fields: title, status, rating, notes, created_at).

## Capabilities and Constraints

- Movie status is one of `want_to_watch`, `watching`, `watched` (see `lib/definitions.ts`).
- Rating is optional, integer 1-5.
- Notes are optional free text.
- Auth, session handling, and data access go through Supabase; server actions in `app/actions/` (`auth.ts`, `movies.ts`) are the only write path shown so far.
- No multi-user sharing, collaboration, or public profiles exist or are planned.

## Brand Commitments

None yet. The project still carries `create-next-app` defaults (page `<title>`, description, default Geist fonts, no logo/name treatment) — all open for future visual work.

## Evidence on Hand

No real movie data, testimonials, or usage evidence exists yet. Future work must not fabricate sample reviews, ratings, or user testimonials as if real.

## Product Principles

- Keep the core loop (add a movie -> set status -> optionally rate/note it -> find it again) fast and friction-free; this is the entire value proposition.
- Favor clarity and reliability over novel features — the product's edge is craft, not mechanism.
- Treat every account as fully private and scoped to its owner; no shared or public state.
- Hold the portfolio-quality bar: even a minimal feature set should feel finished and deliberate, not scaffolded.
