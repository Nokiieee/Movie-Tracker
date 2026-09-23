-- Movie Tracker database schema
--
-- Run this once in the Supabase SQL Editor (or with `psql`) on a new project.
--
-- After running it, go to Project Settings -> API -> "Exposed schemas" and
-- add `movie_tracker`. Otherwise the Supabase client can't reach the table.

-- Schema ---------------------------------------------------------------------

create schema if not exists movie_tracker;

grant usage on schema movie_tracker to anon, authenticated, service_role;

-- Table ----------------------------------------------------------------------

create table if not exists movie_tracker.movies (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  title       text        not null check (char_length(title) between 1 and 200),
  status      text        not null default 'want_to_watch'
                          check (status in ('want_to_watch', 'watching', 'watched')),
  rating      smallint    check (rating between 1 and 5),
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists movies_user_id_updated_at_idx
  on movie_tracker.movies (user_id, updated_at desc);

grant select, insert, update, delete on movie_tracker.movies to authenticated;
grant all on movie_tracker.movies to service_role;

-- Keep updated_at current on every edit, even ones made outside the app.

create or replace function movie_tracker.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists movies_set_updated_at on movie_tracker.movies;

create trigger movies_set_updated_at
  before update on movie_tracker.movies
  for each row execute function movie_tracker.set_updated_at();

-- Row Level Security: each user can only see and change their own movies. ----

alter table movie_tracker.movies enable row level security;

drop policy if exists "Users can view their own movies" on movie_tracker.movies;
create policy "Users can view their own movies"
  on movie_tracker.movies for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can add their own movies" on movie_tracker.movies;
create policy "Users can add their own movies"
  on movie_tracker.movies for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own movies" on movie_tracker.movies;
create policy "Users can update their own movies"
  on movie_tracker.movies for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own movies" on movie_tracker.movies;
create policy "Users can delete their own movies"
  on movie_tracker.movies for delete
  to authenticated
  using ((select auth.uid()) = user_id);
