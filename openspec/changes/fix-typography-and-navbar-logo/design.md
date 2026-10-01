# Design

## Context

See `proposal.md` — Why, and the specs for requirements. Only the current state that constrains the approach belongs here.

**Current font loading** — `src/app/layout.tsx:14-16` uses `preconnect` hints plus a raw `<link>` to `fonts.googleapis.com/css2` for Lora, Raleway and Great Vibes. Fonts are not loaded through `next/font`, so there is no build-time self-hosting, no automatic `font-display` handling, and no automatic subsetting. Line 15 also uses React's invalid `crossorigin` casing, which is one of the pre-existing `typecheck` failures.

**Current token shape** — `tailwind.config.ts:20-24` defines `fontFamily.heading` (Lora), `.script` (Great Vibes) and `.body` (Raleway). Usage is asymmetric: `font-heading` appears **47 times across ~29 files**, `font-body` exactly once (the `<body>` in `layout.tsx`), `font-script` **zero** times. `src/app/globals.css:17,21` independently re-declares `body` and `h1..h6` families in raw CSS, so font-family is currently declared in three places: Tailwind, `globals.css`, and the HTML link.

The `font-heading` migration concentrates in `src/components/ui/Text.tsx:13-18`, a six-entry `h1`–`h6` variant map. That is also the file holding a pre-existing `typecheck` failure (a missing `span` key in the same variant map, line 21), so both touch one map — edit it once, carefully.

**Current logo state** — three competing definitions:

| Surface | Definition | Notes |
|---|---|---|
| `Header.tsx:12-18` | raster `public/logo.png` | 1063×195 (5.45:1) asset declared `width={40} height={40}` with `h-10 w-auto` |
| `Footer.tsx:10-19` | inline SVG mark + live-text wordmark | duplicates the mark by hand |
| `components/layout/Logo.tsx` | inline SVG mark + wordmark | **imported nowhere — dead code** |

`Header.tsx` is `'use client'` and imports `next/image`. The header is `fixed` with a `h-[57px]` bar while `Layout.tsx:7` applies `pt-16` (64px) — a pre-existing 7px discrepancy this change does not need to fix, but must not worsen.

**Constraints that shape the approach**

1. Neither Chosense nor Magnolia Script exists on Google Fonts. The current `<link>` approach cannot serve them at all — self-hosting is forced.
2. The font binary files are **not in the repository** and cannot be fetched from a CDN. They must be supplied.
3. `npm run typecheck` already fails with 9 pre-existing errors; `npm run lint` is unrunnable (no eslint). There is no test framework. Verification is `typecheck` plus visual inspection in `npm run dev`.

## Goals / Non-Goals

**Goals**

- Establish Chosense (primary) + Magnolia Script (secondary) as the only two families, with no third.
- Make the type system render correctly with no external font CDN dependency.
- Eliminate every font utility class that resolves to an undefined family.
- Give the logo one definition and make it render sharp, undistorted, and layout-stable.

**Non-Goals**

- Any change to the color system. The brand palette is out of scope, even though it is duplicated across `tailwind.config.ts` and `globals.css`.
- The `darkMode: 'class'` configuration. No dark theme exists; adding one is a separate change.
- Converting the rest of the site to `next/font`. The loading approach is decided by the need for two locally-supplied commercial/off-cdn faces, not by a broader migration.
- Fixing the pre-existing `pt-16` / `h-[57px]` mismatch, the `payload.config.ts` `outfile` key, or the `Text.tsx` `span` gap. These are unrelated pre-existing failures; the `crossorigin` casing on `layout.tsx:15` is fixed here only because this change rewrites those exact lines.
- Replacing the raster logo with an SVG. Recorded as an open improvement below rather than assumed.

## Decisions

### Self-host both families via `@font-face` instead of a CDN link

**Decision.** Commit the font binaries under `public/fonts/` and declare `@font-face` in `globals.css`. Drop the `fonts.googleapis.com` link and its `preconnect` hints.

**Rationale.** Neither family is on Google Fonts, so there is no CDN URL to link to. Self-hosting is the only path that satisfies `brand-typography`'s CDN-independence requirement.

**Alternatives considered.** A third-party font CDN (e.g. Fontshare) — rejected: adds a runtime dependency that a blocked network defeats, and Chosense in particular is a licensed vendor release that should be served from our own origin. `next/font/local` — attractive because it would give self-hosting with build-time hashing and `font-display` defaults, but it scopes `@font-face` to the module graph and does not fit a stylesheet-level brand base rule; deferred rather than rejected.

**Consequence.** We lose Google's automatic subsetting and `unicode-range` splitting. File size and subsetting become our responsibility.

### Collapse three font tokens into two role tokens

**Decision.** `font-primary` → Chosense, `font-display` → Magnolia Script. Remove `font-heading`, `font-body` and `font-script`.

**Rationale.** The existing three-token shape encodes the *old* families (`heading`/`body`/`script` are Lora/Raleway/Great Vibes). With Lora and Raleway both retiring, the heading/body split no longer distinguishes anything. Two tokens match the two-font direction and make the misuse case unrepresentable: there is no longer a heading-specific token to apply to body copy.

**Consequence.** 47 `font-heading` usages across ~29 files and 1 `font-body` usage must be migrated. `font-script` needs no migration — it has zero usages, so it is simply deleted.

**Note on `font-display`.** This name collides with the CSS `font-display` descriptor. That is a readability hazard, not a functional bug, but it is why the `font-primary` / `font-display` naming is worth a second look at review time.

### Remove `font-inter` from navigation instead of adding it

**Decision.** Delete the `font-inter` classes from `Header.tsx` nav links and let them inherit the primary family. Do not define Inter.

**Rationale.** `font-inter` is not in the Tailwind theme, so those links currently render in the browser's default font — an invisible inconsistency. The direction is two fonts, so defining a third to fix nav rendering would violate the constraint. Inheriting the primary family both fixes the inconsistency and removes the class.

**Consequence.** Nav links change appearance, because they stop falling back to a generic default and start matching the rest of the interface. All 4 occurrences are in `Header.tsx:23,26,29,32`.

### Pin the script family to a single weight

**Decision.** Declare only the weight that actually exists for Magnolia Script, and never request bold.

**Rationale.** It is a single-weight (Regular) connected script. Requesting bold would trigger synthetic bolding — smeared strokes and broken joins — which is precisely the "opaco sin resolución" failure mode this change exists to fix, just relocated to the text layer.

**Consequence.** Display text using the script font cannot be emboldened. Weight hierarchy there must come from size and colour instead.

### Specify the exact weights present instead of assuming parity

**Decision.** Derive the `font-weight` list from the supplied files, not from the retired fonts' range. Raleway served 300-700; that range must not be blindly carried over.

**Rationale.** Requesting an absent weight produces a synthetic or nearest-weight substitution that looks like a rendering fault. Unknown until the binaries are in hand, which is why this is a task with an explicit verification gate rather than a value chosen now.

### Single logo component, adopted rather than deleted

**Decision.** Repurpose `components/layout/Logo.tsx` as the one shared logo component and have both `Header.tsx` and `Footer.tsx` render it. Delete the inline SVG copy in `Footer.tsx`.

**Rationale.** A shared component satisfies the single-source-of-truth requirement without a new file, and it removes dead code rather than merely bypassing it. `Logo.tsx` already holds the gradient mark and wordmark that `Footer.tsx` duplicates by hand.

**Consequence.** The logo becomes a component both surfaces can configure (e.g. `variant`, `className`, `priority`) rather than two independent copies.

### Derive logo width from height, never declare a square

**Decision.** Set the header logo's intrinsic dimensions to the asset's real 1063×195 ratio, constrain by height, and let width follow.

**Rationale.** This is the actual bug. `width={40} height={40}` asserts a 1:1 ratio for a 5.45:1 asset; `h-10 w-auto` then contradicts that assertion, so the reserved box and the rendered box disagree. The contradiction is the source of the muddy rendering. Correct intrinsic values plus height-only constraint make the two agree by construction.

**Consequence.** At `h-10` the logo becomes roughly 218px wide instead of 40px. This is a deliberate visual change — the current 40px wide rendering of a wide wordmark is part of the distortion. The 57px header bar has room for it, but the nav must be checked at mobile width for collision, which is why the spec requires it.

### Set `priority` on the header logo only

**Decision.** Mark the header logo as a high-priority image; leave the footer logo at default priority.

**Rationale.** The header is `fixed` and above the fold on every page, so its logo is in the critical rendering path. The footer is not.

## Risks / Trade-offs

- **Chosense is a commercial font (7NTypes).** Only trial/desktop licences are available without a purchase, and the repo holds no licence file → Production deployment is legally blocked until a web licence is bought. Resolve before launch; treat the licence as a release gate, not a follow-up.
- **The font binaries are absent from the repo.** `@font-face` will point at files that do not exist until they are added, so the page falls back to the declared stack. That degrades gracefully but does not meet the spec → Gate the change on the files being committed; do not merge a `@font-face` pointing at a missing file.
- **Chosense may be display-oriented.** Its vendor description positions it for headlines and titles. If it turns out to be poor at long body copy, the two-font constraint is in tension with readability. Verify at the smallest body size actually used before accepting; if it fails, this becomes a spec-level conversation, not a silent substitution.
- **Spanish glyph coverage is unverified for both faces.** Missing `ñ` or inverted punctuation would fall back mid-word and look broken → Verify coverage per file; if coverage is partial, subset must include Latin-1 and the affected characters.
- **No test framework exists**, so the visual requirements (sharpness, no distortion, no overlap) cannot be automated → Verification is manual via `npm run dev` at mobile and desktop widths, plus `typecheck`. The specs' scenarios are written to be checkable by hand and are the acceptance criteria.
- **Self-hosting without `unicode-range` subsetting** risks shipping large font files to every visitor → Convert to WOFF2 and subset to Latin + Latin-1; document the resulting sizes.
- **The `font-display` token name collides with the CSS descriptor** → Slight readability hazard only; flagged rather than renamed, since both names were candidates and this was the clearer role name.
- **Changing the logo width from ~40px to ~218px may crowd the nav on mobile.** The spec requires no overlap, and the nav is `hidden md:flex`, so the collision window is the `md` breakpoint → Check at the `md` breakpoint specifically, not only at the smallest width.
- **Replacing Lora changes 47 headings plus the footer wordmark** — a visible brand change across most of the site → Expected and intended; call it out at review so it is not mistaken for a regression.

## Migration Plan

Forward-only change with no data migration and no persisted state. Rollback is a revert of the commit; there is nothing to unwind in the database or on disk, since the retired fonts and the raster logo remain in git history.

Deploy in this order so the site is never in a half-typed state:

1. Add font binaries under `public/fonts/`.
2. Add `@font-face` declarations and update `globals.css` base rules — the site still renders in the fallback stack at this point.
3. Update the Tailwind tokens and migrate the 7 usages.
4. Fix the logo component and switch both surfaces over.
5. Verify: `npm run typecheck` shows no new errors beyond the 8 pre-existing ones, and `npm run dev` is checked at mobile and desktop widths.

Interim states are acceptable because of the fallback stack: the site stays readable throughout, which is the reason for requiring an explicit fallback rather than relying on the browser's last-resort default.

## Open Questions

- **Should the raster `logo.png` be replaced by an SVG?** An SVG mark would fix sharpness at every density structurally rather than by raising raster resolution, and would make the header/footer duplication cheaper. It needs the source vector artwork, which is not in the repo. Deferrable: correct intrinsic dimensions on the existing raster satisfies `brand-logo` as written. If the vector source turns up, this becomes a small follow-up rather than a redesign.
- **What is the agreed minimum legible size for the display family?** The spec requires a documented floor rather than a hardcoded guess, because it depends on the rendered size once the font is in place. Resolve when the first display usage is designed.
- **Which weights of Chosense will be licensed and supplied?** Determines the entire `font-weight` set. Resolve when the files are obtained.