---
version: 1
slug: "app-dashboard-page-tsx"
primary_target: "app/dashboard/page.tsx"
related_targets: ["components/movies/add-movie-form.tsx","components/movies/movie-list.tsx"]
---

## Scope

Route: `/dashboard` (app/dashboard/page.tsx, components/movies/add-movie-form.tsx, components/movies/movie-list.tsx). Mode: Operate — the signed-in user completing the task of adding, checking, and updating their own movie list. Task frequency: casual, repeat visits (checking status, adding new titles) rather than one-time.

Audience / job: any signed-in user maintaining their own private want-to-watch/watching/watched list; the job is "see where things stand, add a new title fast, revisit notes/rating."

Content: one real entry (Inception — watching, 4 stars, "mind-bending but worth it") plus a small set of clearly-synthetic placeholder movies filling Want to Watch and Watched, per the user's own choice.

Constraints: preserve the existing data model, fields, statuses, and server actions (`app/actions/movies.ts`, `lib/definitions.ts`) exactly; preserve auth-gated redirect behavior; grouped-by-status layout (user-confirmed); design with room to scale (search/sort-ready) rather than assuming a tiny fixed list.

## Direction contract

THESIS: The dashboard as your own rental-store shelf — three aisles (Want to Watch / Watching / Watched) of spine-labeled entries under practical shelf light, refusing both the generic SaaS card-dashboard default and the Letterboxd poster-wall default.

OWN-WORLD: Practical off-white/pale-gray ground (#F1F0EC, not warm cream), charcoal ink (#201E1B), warm particleboard-shelf brown (#6B4A31) as structural aisle framing, one reserved genre-card green (#5CC13B) for status tabs, active states, and rating stars only. Titles set in a bold condensed grotesque (spine-print lettering); dates/meta set in a workhorse monospace (price-gun/return-stamp lettering). Hairline shelf-edge rules, no card shadows. Raises: STAGED PREVIEW (donor: darkroom safelight challenger) — the add-movie form shows a live label preview of the exact spine row before it commits. EXPAND-IN-PLACE (donor: sneaker archive wall challenger) — notes stay collapsed on the spine row, revealed on interaction like flipping a video case. RESTRAINT (donor: iridescent cloud-edge challenger) — the single accent appears only on status tabs/active states/stars, never as decorative chrome.

STORY: The visitor understands this is their own curated shelf; sees three aisles at a glance, pulls a title open to read its notes, adds a new arrival via a label-gun-style form that previews before it "prints."

FIRST VIEWPORT: A shop-sign masthead (site name hand-lettered, user's identity as a small member-card byline) with logout; below it, the add-movie form styled as a label-gun ticket with a live spine-row preview and a prominent green "Add to Shelf" action; below that, three full-width aisle sections stacked vertically, each headed by a laminated genre-divider tab (the status label) with its spine rows beneath — title in condensed caps, rating as green stars inline, notes collapsed, added-date in mono.

FORM: Video Rental Shelf / VHS-Blu-ray spine wall — candidate 5 of this surface's resonance-ordered direction list; seed key aa3b392c; user-approved on the decision page (optionId "assigned", code-led).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

Pulling a movie's row open to read its notes like flipping a video case to the back cover; adding a title as loading a label-gun ticket that previews before it commits to the shelf.

## Unresolved decisions

- Exact interaction for moving a movie between aisles (status change) is left to implementation — no drag-and-drop required for v1, an inline control is sufficient as long as it stays inside this world's vocabulary.
- Search/sort controls are scoped for future work (this brief only commits to leaving room; no search UI is required in this build unless it fits cleanly).
