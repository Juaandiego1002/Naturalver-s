# Proposal

## Why

The storefront's typography and logo have no enforced system. Three fonts are declared (Lora, Raleway, Great Vibes) but the design direction calls for exactly two, and the two chosen families — **Chosense** as primary and **Magnolia Script** as secondary — are not on Google Fonts, so the current raw `<link>` to `fonts.googleapis.com` cannot serve them at all.

Separately, the navbar logo is raster `public/logo.png`, declared to `next/image` as `width={40} height={40}` while the asset is actually **1063×195 (5.45:1)**. That contradiction is why it renders without definition ("opaco sin resolución").

## What Changes

- **BREAKING** — Replace the three-font set with two: **Chosense** (primary: UI text, body copy, headings) and **Magnolia Script** (secondary: display/script accents only). Lora, Raleway and Great Vibes are removed from the type system.
- **BREAKING** — Replace the Google Fonts `<link>` with self-hosted `@font-face` declarations. Both new families are unavailable on the Google Fonts CDN, so self-hosting is forced, not optional.
- Retarget the existing Tailwind font tokens to the two roles and add an explicit usage boundary: Magnolia Script must not be used for body copy, form input text, or price figures.
- Migrate all **47** `font-heading` usages across ~29 files, including the six-entry `h1`–`h6` variant map in `src/components/ui/Text.tsx`.
- Fix the navbar logo to declare its true intrinsic dimensions so it renders sharp and reserves correct layout space, with no distortion at any viewport width.
- Establish a single logo source of truth. There are currently three competing implementations: the raster `logo.png` in `Header.tsx`, an inline SVG mark + wordmark in `Footer.tsx`, and `components/layout/Logo.tsx` — which is **imported nowhere and is dead code**.
- Remove the `font-inter` class from the nav: it is not defined in the Tailwind theme, so it silently falls back to the browser default instead of the intended body font.
- Remove the unused `font-script` token (Great Vibes), which has zero usages in `src/`.

## Capabilities

### New Capabilities

- `brand-typography`: The two-font type system — role assignment, self-hosted loading, Tailwind token mapping, CSS base rules, and the boundary that keeps the script font out of functional text.
- `brand-logo`: Logo rendering fidelity and single-source-of-truth — intrinsic dimension declaration, the header/footer logo contract, responsive sizing, and accessibility labelling.

### Modified Capabilities

None. No specs exist yet (`openspec list --specs` is empty), so there is nothing to delta.

## Impact

**Files touched**

- `src/app/layout.tsx` — font `<link>` (lines 14-16), `<body className="font-body">` (line 18), and the `crossorigin`/`crossOrigin` typecheck error on line 15.
- `src/app/globals.css` — base `body` and `h1..h6` `font-family` rules (lines 17, 21) plus new `@font-face` blocks.
- `tailwind.config.ts` — `theme.extend.fontFamily` (lines 20-24).
- `src/components/layout/Header.tsx` — `next/image` dimensions (lines 14-16), `font-inter` on nav links, brand wordmark.
- `src/components/layout/Footer.tsx` — inline SVG logo block (lines 10-19).
- `src/components/layout/Logo.tsx` — dead component, to be removed or adopted as the shared component.
- `public/logo.png` — the 1063×195 raster; may be replaced by an SVG.
- New: `public/fonts/` for the self-hosted font files, and a new shared logo component.

**Constraints and risks**

- **Font licensing is a real blocker to resolve before shipping.** Chosense is a commercial release by 7NTypes, not an open-source face. Magnolia Script is free under SIL OFL 1.1. Production use of Chosense requires a purchased licence; only a trial/desktop licence is available without one.
- Neither family is on Google Fonts, so both need font files committed to `public/fonts/`. The files are **not in this repository** and must be obtained from the vendor/author before implementation can compile.
- Neither family can be assumed to carry the weight range the old fonts had (Raleway served 300-700). Weight support must be verified against the actual files, and `font-weight` declarations adjusted to the weights that genuinely exist.
- Neither family is guaranteed to cover the Spanish accented characters the UI relies on (`á é í ó ú ñ ¿ ¡`). Latin-1 coverage must be verified per file.
- Magnolia Script is a single-weight (Regular) connected script with low contrast: it will be unreadable at small sizes and in dense UI. This is why it is scoped to display use only.
- Self-hosted fonts lose Google's automatic subsetting and unicode-range splitting, so it is on us to serve reasonable file sizes.
- Replacing Lora changes every `font-heading` (47 usages) and the footer wordmark. This is a visible brand change across most of the site, not a cosmetic one.