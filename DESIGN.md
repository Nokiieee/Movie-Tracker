---
name: Movie Tracker
description: The whole app as a kept movie-night diary — warm cream paper, washi-taped panels in rose/sage/butter/lilac, and hand-stamped ticket rows, from the landing gate through auth to the dashboard.
colors:
  paper: "#fbf3e7"
  paper-panel: "#fffcf6"
  ink: "#3a342c"
  ink-soft: "#6e6459"
  tape-border: "#e3d5be"
  rose: "#f4a6a0"
  rose-ink: "#7a2e2a"
  sage: "#9fc5a8"
  sage-ink: "#2f4a38"
  butter: "#f2cb6a"
  butter-ink: "#6b4a17"
  lilac: "#c9b6e4"
  lilac-ink: "#4a3268"
  star: "#facc15"
  star-empty: "#ddd0b8"
typography:
  display:
    fontFamily: "Caveat, cursive"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "2px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-panel}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  status-tab:
    rounded: "{rounded.sm}"
    padding: "4px 12px"
    rotate: "±1deg"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    border: "{colors.tape-border}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
---

# Design System: Movie Tracker

## Overview

The whole app — landing gate (`/`), auth (`/login`, `/signup`, `/signup/check-email`), and the dashboard — is styled as a kept movie-night diary: warm cream paper, washi-tape flags, and panels that read as hand-stamped tickets rather than generic cards. The `.diary` token scope lives on `<body>` in `app/layout.tsx`, so every route shares one palette; no page opts out.

This is the second visual direction change on this project (Video Rental Shelf → plain/neutral → Watch Diary), and the Watch Diary world initially shipped dashboard-only before this pass extended it to every route at the user's request. It was chosen through Impeccable's decision-page flow: the roll turned a photo-lab "darkroom" catalog challenger into a competing build candidate, but the user picked the model's own top-ranked grounded candidate, "The Watch Diary," instead.

**Key Characteristics:**
- Warm cream paper ground (`#FBF3E7`), white-ish paper panels (`#FFFCF6`) for content
- Three washi-tape accent colors carry real weight — they drive each status section's tab, never just a small icon: rose for Want to Watch, sage for Watching, butter for Watched
- A "tape flag" (small rotated rounded tab, soft shadow) marks both the add-movie panel ("New Entry") and each status section — the signature recurring motif
- Caveat (a real, self-hosted handwritten-style Google Font) carries the site title only; all data (titles, dates, notes, labels) stays in Inter for scanability
- Star ratings render as small hand-stamped marks: gold fill, each star given a slight per-star tilt
- Soft, blurred shadows (never hard-offset) simulate paper lifting off the page; no color is ever used as a colored left/right border

## Colors

### Status accents (the "life" of the system)
- **Rose** (`#F4A6A0` bg / `#7A2E2A` ink): Want to Watch section tab.
- **Sage** (`#9FC5A8` bg / `#2F4A38` ink): Watching section tab.
- **Butter** (`#F2CB6A` bg / `#6B4A17` ink): Watched section tab.
- **Lilac** (`#C9B6E4` bg / `#4A3268` ink): the "you're filling out a form" flag color — the add-movie panel's "New entry" tab, the login panel's "Welcome back" tab, and the signup panel's "New member" tab. Deliberately distinct from the three status colors so it's never mistaken for a fourth status.
- All four bg/ink pairs are verified ≥4.5:1 contrast for small text (4.8–5.8:1 measured).

### Neutral
- **Paper** (`#FBF3E7`): page background.
- **Paper Panel** (`#FFFCF6`): card/panel background, one step lighter than the page.
- **Ink** (`#3A342C`): primary text, and the primary button's fill.
- **Ink Soft** (`#6E6459`): secondary text — dates, byline, placeholders, empty states. (Darkened from an earlier `#8B8175` draft, which measured under the 4.5:1 floor.)
- **Tape Border** (`#E3D5BE`): all hairline borders (panels, inputs, dividers).

### Named Rules
**Tape Colors Drive Structure, Never Decorate.** Each status's color must appear on its section tab (background + ink), not merely as a small dot or icon — the color is doing real navigational work (which shelf is this?).

**No Colored Side-Borders.** A note's expanded background gets a very light wash of its section's color instead of a colored left border, per this project's craft floor (colored `border-left`/`border-right` on list items is a banned pattern here).

**Soft Shadows Only.** Every shadow used (`0 2px 4px`, `0 2px 10px`, both with real blur and low opacity) simulates paper sitting above the page — never a flat, zero-blur block shadow.

## Typography

**Display Font:** Caveat (600/700, self-hosted via `next/font/google`) — used only for the "Movie Tracker" wordmark, repeated at the top of every page (landing, login, signup, check-email, dashboard header).
**Body Font:** Inter — everything else: page headings ("Log in", "Create an account", "Check your email"), movie titles, form labels/inputs, dates, notes, status-tab labels, buttons.

### Hierarchy
- **Wordmark** (Caveat, 600, `text-3xl`–`text-5xl` depending on the page, slight `-rotate-1`): "Movie Tracker" — the one handwritten moment, repeated on every screen.
- **Page heading** (Inter, 600, `text-xl`–`text-2xl`): "Log in", "Create an account", "Check your email" — functional, not personality.
- **Movie title** (Inter, 500, `text-sm`): kept plain and scannable — this is data, not personality.
- **Status tab label** (Inter, 600, `text-xs`, uppercase, tracked): e.g. "WATCHING · 2".
- **Meta / dates / byline** (Inter, 400, `text-sm`, `--ink-soft`).

## Layout

Unchanged from the prior system: single-column `max-w-3xl` content column. Dashboard stacks: paper header → add-movie diary-entry panel → search field → three washi-taped status sections in fixed order (Want to Watch, Watching, Watched).

## Elevation & Depth

Soft, blurred shadows only (see Named Rules above) — this replaces the previous system's "no shadow at all" rule, since a paper/diary world reads as flat without a little lift.

## Shapes

`rounded-md` on inputs and buttons, `rounded-lg` on panels, `rounded-sm` on the small rotated tape-flag tabs. Every tape flag carries a slight rotation (`-1deg`/`1deg`) — never perfectly square to the grid — to read as a hand-applied piece of tape.

## Components

### Buttons
- **Primary ("Add movie"):** `bg-[--ink]` (dark brown), `text-[--paper-panel]` (near-white), `rounded-md`; on hover rotates `-1deg` — a small "stamping down" gesture.
- **Ghost (Log out):** `--paper-panel` background, `--tape-border` border, `--ink` text.

### Tape Flag (signature motif)
A small `rounded-sm` tab, rotated ±1–2°, with a soft shadow, positioned to overlap the top-left of the panel it labels. Used on every standalone form panel (add-movie's "New entry", login's "Welcome back", signup's "New member" — all lilac) and on every status section (status label + count, in that status's color).

### Status Section
Tape flag (see above) + a `rounded-lg` paper-panel list of ticket rows. Rows with notes expand inline; the expanded note area gets a light tint of the section's color as its background (never a colored border).

### Star Rating
Gold-filled stamp-style stars (`#FACC15` fill, `#E8A93D` stroke), each at a slight independent tilt; unfilled stars use a warm tan outline (`#DDD0B8`, not cool gray). The rating slot always reserves a fixed width so dates align in a column regardless of rating.

### Inputs / Fields
`border-[--tape-border]`, white background, `rounded-md`, `px-3 py-2`; focus border shifts to `--ink`.

## Do's and Don'ts

### Do:
- **Do** keep Caveat scoped to the "Movie Tracker" wordmark only — never a page heading, status label, button, or piece of data.
- **Do** repeat the wordmark at the top of every page — it's the thread that ties the landing gate, auth, and dashboard together.
- **Do** give every status its color on the tab itself, not a subtle accent.
- **Do** keep all shadows soft (offset + blur), never a flat block shadow.
- **Do** use lilac for any new standalone form's flag — it means "you're filling something out," not tied to one specific page.

### Don't:
- **Don't** add a colored left/right border to a row, card, or callout — use a background tint instead.
- **Don't** use rose/sage/butter outside the movie-list status sections; they mean a specific status and nothing else.
- **Don't** set movie titles, dates, page headings, or notes in Caveat — data and headings stay in Inter for scanability.
