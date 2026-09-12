---
version: 1
slug: "app-dashboard-page-tsx"
primary_target: "app/dashboard/page.tsx"
related_targets: ["components/movies/add-movie-form.tsx","components/movies/movie-list.tsx","app/page.tsx","app/login/login-form.tsx","app/signup/page.tsx","app/signup/check-email/page.tsx"]
---

## Scope

Route: `/dashboard` (app/dashboard/page.tsx, components/movies/add-movie-form.tsx, components/movies/movie-list.tsx). Mode: Operate — the signed-in user completing the task of adding, checking, and updating their own movie list. Task frequency: casual, repeat visits (checking status, adding new titles) rather than one-time.

Audience / job: any signed-in user maintaining their own private want-to-watch/watching/watched list; the job is "see where things stand, add a new title fast, revisit notes/rating."

Content: real movies the user is tracking, plus any synthetic placeholders the user chooses for demo purposes.

Constraints: preserve the existing data model, fields, statuses, and server actions (`app/actions/movies.ts`, `lib/definitions.ts`) exactly; preserve auth-gated redirect behavior; grouped-by-status layout (user-confirmed, twice now). The Watch Diary world (tokens on `.diary`, applied at `<body>`) now covers the whole app — landing gate, auth, and dashboard — at the user's explicit request; it is no longer dashboard-only.

## Direction contract

THESIS: The dashboard as a kept movie-night diary — a warm paper page you actually flip through — refusing both the sterile SaaS card-dashboard default and the "video rental shelf" world this project already tried and retired.

OWN-WORLD: Warm cream paper ground (`#FBF3E7`), soft charcoal-brown ink (`#3A342C`), three washi-tape accent colors carrying real weight (section headers, tabs, and empty states, never just a small icon): dusty rose (`#F4A6A0`) for Want to Watch, sage green (`#9FC5A8`) for Watching, warm butter-yellow (`#F2CB6A`) for Watched, plus lilac (`#C9B6E4`) reserved for any standalone form's flag (add-movie, login, signup). Titles set in a warm, slightly characterful display face (Caveat, self-hosted); rows read as hand-stamped tickets. Rating stars render as a rubber-stamp star mark, gold/yellow as already committed. Notes appear as a margin annotation tinted to its section's washi color. No box-shadow; depth comes from paper-vs-washi-tape layering — a washi "tape flag" overlaps each section's top edge, panels carry a soft paper-grain feel via texture/noise, not gradients.

STORY: The visitor understands this is their own kept diary of movies, not a database table. They see three taped-off pages at a glance, flip open a stamped ticket to read its margin note, and add a new arrival by filling out a ticket that stamps into place. That same diary identity now greets them from the very first screen (the landing gate) and carries through signing up and logging in, so the dashboard never feels like a different product.

FIRST VIEWPORT: A plain paper-toned header (site title in the display face, the user's name as a small pencilled byline) with a logout link; below it, the add-movie panel styled as a fresh diary entry with a live ticket preview and a warm "Add movie" stamp-styled button; below that, three washi-taped sections stacked vertically in fixed order (Want to Watch / Watching / Watched), each fully in its own accent color, listing hand-stamped ticket rows — title, rubber-stamp star rating, and date — with notes tucked as an expandable margin note.

FORM: Movie-Night Watch Diary — the user's own top-ranked grounded candidate for this round (IMPECCABLE'S PICK), chosen over the catalog-derived "Proofing Bench" assignment; seed key 4c63be39; user-approved on the decision page (optionId "model-pick", code-led). Extended app-wide (landing, login, signup, check-email) in a follow-up pass as a direct application of the same tokens and motifs — no new direction round, since the visual system was already committed.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

Flipping open a stamped ticket to read its margin note, like turning to today's entry in a kept diary; adding a movie as filling out a fresh ticket that stamps into place on submit; the same handwritten "Movie Tracker" wordmark greeting you from the landing gate through login/signup to the dashboard.

## Unresolved decisions

- Exact interaction for moving a movie between statuses is left to implementation — no drag-and-drop required, an inline control is sufficient as long as it stays inside this world's vocabulary.
- Search/sort controls stay scoped for future work; this build only commits to leaving room.
