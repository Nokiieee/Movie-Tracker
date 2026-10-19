# Movie Tracker

A minimal, personal movie tracker. Sign up, add the movies you want to watch, are watching, or have watched, and keep a star rating and notes for each one. Every list is private to its owner.

Built with Next.js (App Router), Supabase (Postgres + Auth), and Tailwind CSS v4.

## Features

- Email/password sign-up with email confirmation, plus log in and log out
- Add a movie with a title, status, optional 1–5 star rating, and optional notes
- Movies grouped into three sections: **Want to Watch**, **Watching**, and **Watched**
- Edit a movie's status, rating, and notes, or delete it (with a confirmation step)
- Per-user data enforced by Postgres Row Level Security

## Tech stack

| Area       | Tool                                                   |
| ---------- | ------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, Server Actions), React 19      |
| Database   | Supabase Postgres (`movie_tracker` schema)             |
| Auth       | Supabase Auth via `@supabase/ssr`                      |
| Validation | Zod                                                    |
| Styling    | Tailwind CSS v4, Inter + Caveat via `next/font`        |
| Icons      | lucide-react                                           |
| Hosting    | Vercel                                                 |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql). It creates the `movie_tracker` schema, the `movies` table, an `updated_at` trigger, and the Row Level Security policies.
3. Go to **Project Settings → API → Exposed schemas** and add `movie_tracker`. Without this, the Supabase client can't reach the table.
4. Go to **Authentication → URL Configuration** and add `http://localhost:3000/auth/confirm` (and your production URL's `/auth/confirm`) to the allowed redirect URLs, so the email confirmation link works.

### 3. Add environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Both values are under **Project Settings → API** in Supabase.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Build for production             |
| `npm run start` | Run the production build         |
| `npm run lint`  | Run ESLint                       |

There is no test suite yet.

## Project structure

```
app/
  page.tsx                 Landing page (redirects to /dashboard if signed in)
  login/, signup/          Auth pages; signup/check-email after registering
  auth/confirm/route.ts    Exchanges the email confirmation code for a session
  dashboard/page.tsx       The protected movie list
  actions/auth.ts          Server Actions: signup, login, logout
  actions/movies.ts        Server Actions: addMovie, updateMovie, deleteMovie
components/
  movies/                  Add/edit forms, movie list, star rating
  profile-menu.tsx         Signed-in user menu
lib/
  definitions.ts           Zod schemas, form state types, movie statuses
  supabase/                Supabase clients for browser, server, and proxy
proxy.ts                   Session refresh and route protection
supabase/schema.sql        Database schema and RLS policies
```

## How it works

- **Auth and route protection.** `proxy.ts` (this Next.js version's replacement for `middleware.ts`) runs on every non-static request. It checks the Supabase session once, redirects signed-out users away from `/dashboard` and signed-in users away from `/login` and `/signup`, and passes the verified user down as request headers (`x-user-id`, `x-user-email`, `x-user-name`). The dashboard and Server Actions read those headers instead of checking the session again.
- **Data.** All movies live in `movie_tracker.movies`. Every query uses `.schema("movie_tracker")` and filters by `user_id`, and RLS policies enforce the same rule in the database.
- **Mutations.** All writes go through Server Actions, called from client forms with `useActionState` and validated with the Zod schemas in `lib/definitions.ts`.

## Deployment

The app is deployed on Vercel. Add the same two environment variables in the Vercel project settings, and add the production `/auth/confirm` URL to Supabase's allowed redirect URLs.

Set the Serverless Function region (**Project Settings → Functions**) close to your Supabase project's region. The proxy runs on nearly every request, so a far-away region (for example, Vercel's US default with a Singapore Supabase project) adds noticeable latency to every page load.
