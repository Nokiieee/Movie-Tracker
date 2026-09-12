---
name: Movie Tracker
description: A private movie list rendered as your own home-video rental shelf — status aisles of spine-labeled titles under practical shelf light.
colors:
  ground: "#f1f0ec"
  ground-raised: "#eae7df"
  ink: "#201e1b"
  ink-soft: "#6b6155"
  shelf-brown: "#6b4a31"
  shelf-brown-soft: "#d8cfc2"
  accent: "#5cc13b"
  accent-ink: "#16320f"
typography:
  display:
    fontFamily: "Oswald, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "8px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  aisle-tab:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.display}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 0"
---

# Design System: Movie Tracker

## Overview

**Creative North Star: "The Video Rental Shelf"**

Movie Tracker's dashboard reads as the user's own home-video rental shelf: three status "aisles" (Want to Watch / Watching / Watched) laid out as laminated genre-divider tabs over rows of spine-labeled titles, lit like practical shelf light rather than a glossy SaaS dashboard or a poster-wall app. The system explicitly refuses two genre defaults: the generic card-grid dashboard and the Letterboxd-style poster wall. Structure is carried by a warm particleboard-brown frame and hairline rules, not by card shadows or rounded panels; the single reserved accent green is spent only where the world's own vocabulary calls for it — status tabs, the add action, and star ratings.

Density is practical and unadorned: flat surfaces, dashed-rule tickets for the add-form ("label ticket"), and thin left/bottom case-edge rules on each spine row so shelved rows read as discrete objects rather than table rows. Titles are set in a bold condensed grotesque to read like spine-print lettering; dates and counts run in a monospace to read like price-gun and return-stamp lettering. There is no photographic imagery, no icon-font iconography, and no drop shadow anywhere in the build — depth is conveyed entirely by flat tonal layering and brown structural framing.

**Key Characteristics:**
- Flat, shadow-free surfaces; structure carried by brown framing and hairline rules, not elevation
- One reserved accent (green) spent only on status tabs, the primary action, and rating stars — never decorative
- Condensed-caps display type for titles/labels, monospace for dates/counts/meta, regular sans for notes prose
- Case-edge cues (thin left + bottom rule) on each spine row so rows read as separate shelved objects
- Dashed-rule "label ticket" framing on the add-movie form, with a live spine-row preview before submit

## Colors

A practical, unsaturated ground with one reserved accent; the palette avoids warm-cream default territory on purpose.

### Primary
- **Shelf Green** (`#5cc13b`): the system's one reserved accent. Used only for aisle-tab backgrounds, the "Add to Shelf" primary button, filled rating stars, and text selection — never as decorative chrome, border, or background elsewhere.

### Neutral
- **Practical Ground** (`#f1f0ec`): page background. Deliberately pale gray-off-white, not warm cream.
- **Raised Ground** (`#eae7df`): panel background for the add-form ticket and each aisle's row container — one step up from the page ground, no shadow needed to read as raised.
- **Charcoal Ink** (`#201e1b`): primary text color (titles, headings, body).
- **Soft Ink** (`#6b6155`): secondary text — meta labels, dates, empty-state copy, unfilled star outlines.
- **Shelf Brown** (`#6b4a31`): structural framing color — masthead background, aisle borders, focus outline, add-form dashed border, search-bar underline.
- **Shelf Brown Soft** (`#d8cfc2`): quieter structural tone — field underlines, row dividers, aisle-panel borders, masthead byline text.
- **Accent Ink** (`#16320f`): text-on-accent color, used on the green aisle tabs and the green primary button for AA contrast.

### Named Rules
**The One Accent Rule.** Green appears only on status tabs, the primary "Add to Shelf" action, filled rating stars, and text selection. It never becomes a background, a border, or a hover tint anywhere else in the system — its rarity is what makes it read as shelf signage rather than UI chrome.

**The No-Shadow Rule.** No `box-shadow` appears anywhere in the build. Depth and hierarchy are carried entirely by the ground/raised-ground tonal step and by brown structural borders.

## Typography

**Display Font:** Oswald (condensed grotesque; with ui-sans-serif, system-ui, sans-serif fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace fallback)

**Character:** A condensed, bold-caps display face reading as spine-print/shop-sign lettering, paired with a workhorse monospace for anything stamped or counted (dates, member byline, ticket labels, aisle counts), and a plain sans for the one piece of running prose (notes).

### Hierarchy
- **Display / Masthead** (700, 24px, uppercase, 0.02em tracking): the "Movie Tracker" site title in the header, set on the brown masthead band.
- **Title** (600, 15px, uppercase, 0.01em tracking): movie titles on spine rows and in the add-form preview — the spine-print label itself.
- **Headline / Section** (600, 13-14px, uppercase, 0.04-0.06em tracking): aisle-tab status labels ("Want to Watch"), "New Arrival" ticket heading.
- **Body** (400, 14px, 1.6 line-height): expanded note text on a spine row, max 70ch measure.
- **Label** (400, 11px, uppercase, 0.06-0.08em tracking, mono): field labels, dates, member byline, "Label Ticket" tag, aisle counts.

### Named Rules
**The Stamped-Meta Rule.** Anything that reads as a record of fact rather than editorial content — dates, counts, the member byline — is set in the monospace label face, uppercase, at 11px. Display type is reserved for names (titles, section labels); mono is reserved for data.

## Layout

Single-column, max-width content column (`max-w-3xl`, ~768px) centered on the page, with a full-bleed brown masthead band above it. The dashboard stacks vertically: masthead → add-movie ticket → search rule → three aisle sections in fixed status order (Want to Watch, Watching, Watched). Each aisle is full-width within the content column; there is no side-by-side card grid. The add-form uses a responsive 3-column grid (`2fr 1fr 1fr` for title/shelf/rating) that collapses to a single column below `sm`. Spacing runs on an 8px-family rhythm (gap-2/gap-4 between fields, space-y-5/space-y-6 between aisles, p-5/p-6 panel padding).

## Elevation & Depth

Flat by design — no shadows anywhere in the build. Depth is conveyed by two devices only: a tonal step between `--ground` (page) and `--ground-raised` (panels), and brown structural framing (solid or dashed borders) that stands in for a shelf's physical edges. The masthead is a solid brown band rather than a shadowed header bar.

### Named Rules
**The Flat-Shelf Rule.** No `box-shadow` is used at rest or on hover/focus anywhere in this system. Raised panels are signaled by the ground/raised-ground tonal shift plus a border, never by elevation.

## Shapes

Square corners throughout (`border-radius: 0`) with one narrow exception: aisle-tab and aisle-panel corners use a 2px radius (`rounded-t-sm` / `rounded-b-sm` / `rounded-tr-sm`) to read as a laminated divider tab overlapping its panel. Borders are the primary form device: a dashed brown border frames the add-movie "label ticket," solid hairline rules divide spine rows and the search bar, and a paired left+bottom rule (brown left edge, soft-brown bottom edge) gives each spine row a subtle case-edge cue so individual rows read as separate shelved objects rather than plain table rows.

## Components

### Buttons
- **Shape:** square corners (`border-radius: 0`)
- **Primary ("Add to Shelf"):** accent-green background (`#5cc13b`), accent-ink text (`#16320f`), display font, uppercase, `px-5 py-2`; the system's one saturated call-to-action
- **Hover / Focus:** primary uses opacity reduction on hover (`hover:opacity-90`); focus-visible uses a 2px shelf-brown outline with 2px offset system-wide
- **Ghost (Log out):** transparent background, shelf-brown-soft border, ground-colored text on the brown masthead; hover fills `bg-black/10`

### Cards / Containers
- **Corner Style:** square, except aisle tab/panel (2px radius)
- **Background:** `--ground-raised` for the add-form ticket and each aisle's row panel
- **Shadow Strategy:** none — see Elevation & Depth
- **Border:** dashed shelf-brown border on the add-form ticket; solid shelf-brown-soft border on aisle panels
- **Internal Padding:** `p-5` (form ticket), `px-4` (aisle panel)

### Inputs / Fields
- **Style:** no box — bottom-border-only fields (`border-b-2`, shelf-brown-soft), transparent background, mono label type above each field
- **Focus:** border color shifts to full shelf-brown on focus
- **Error / Disabled:** field errors render as red-700 text below the field; submit button dims to 50% opacity when disabled/pending

### Navigation
- **Style:** single masthead band (shelf-brown background) holding the site title (display, uppercase, ground-colored) and a bordered ghost logout button; a mono member byline sits below in shelf-brown-soft. No nav menu or tabs beyond the aisle structure itself.

### Aisle / Spine Row (signature component)
The dashboard's defining pattern. Each status group renders as an "aisle": a green laminated divider tab (status label + mono count) sitting atop a bordered, raised-ground panel of "spine rows." Each row is a single line — condensed-caps title, inline green star rating, mono date — with a left+bottom case-edge rule separating it from its neighbors. Rows with notes are interactive: clicking expands the row to reveal note text below, mimicking flipping a video case to its back cover; a small chevron rotates 180° to indicate state. Rows without notes are inert (no pointer affordance).

## Do's and Don'ts

### Do:
- **Do** reserve accent green (`#5cc13b`) exclusively for aisle tabs, the primary add action, and filled rating stars.
- **Do** keep all surfaces flat — use the ground/raised-ground tonal step and brown borders for hierarchy, never a shadow.
- **Do** set titles and status labels in the condensed display face (Oswald, uppercase); set dates, counts, and byline text in the mono label face.
- **Do** give each spine row a left+bottom case-edge rule so grouped rows read as discrete shelved objects, not table rows.

### Don't:
- **Don't** introduce a second saturated color alongside the accent green — the palette holds one accent only.
- **Don't** add box-shadow to any surface, at rest or on hover; this world conveys depth through tone and brown framing only.
- **Don't** use the structural shelf-brown as a status/active-state color — it is reserved for framing (masthead, borders, focus ring), and status tabs must stay on the reserved accent so the two roles stay visually distinct.
- **Don't** use photographic imagery, glyph icon sets, or icon fonts; the two icons in the system (search, chevron) are hand-authored inline SVG matching the line weight of the rest of the system.
