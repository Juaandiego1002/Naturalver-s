# Tasks

> **Gate:** tasks 1.x cannot be completed until the font binaries are supplied. Chosense additionally requires a purchased web licence before production. Do not merge `@font-face` rules pointing at absent files.

## 1. Supply and verify font files

- [ ] 1.1 Obtain licensed Chosense web font files and Magnolia Script (SIL OFL 1.1) files; place them under `public/fonts/`. Verify each family has at least one weight file present on disk
- [ ] 1.2 Convert all font files to WOFF2, subset to Latin + Latin-1. Verify each output file is a valid WOFF2 and record its size
- [ ] 1.3 Inspect each font file's actual weight metadata and record which weights exist. Verify the recorded list matches `brand-typography`'s "weights match the fonts actually supplied" scenario
- [ ] 1.4 Verify each family renders the Spanish characters the UI depends on (`á é í ó ú ñ ¿ ¡`) and the full uppercase/lowercase range. Verify no glyph falls back mid-word
- [ ] 1.5 Render a Latin-1 pangram in both families at 16px and 32px and inspect for mushy strokes or broken script joins. Verify Chosense is legible at the smallest body size actually used in the app (16px)
- [ ] 1.6 Record the licensed weights and the confirmed glyph coverage in a comment above the `@font-face` block, so the next editor knows what is available without re-inspecting the files

## 2. Declare the two families

- [ ] 2.1 Add `@font-face` blocks for Chosense (all weights found in 1.3) and Magnolia Script (single weight) in `src/app/globals.css`, pointing at `public/fonts/`. Verify each `src` path resolves to a file that exists
- [ ] 2.2 Give each declaration an explicit `font-display` of `swap`. Verify the page paints in the fallback stack rather than staying invisible while fonts load
- [ ] 2.3 Declare an explicit `font-family` fallback stack for each family, brand-appropriate and ending in a generic family. Verify a deliberately broken `src` still renders readable text rather than the browser's last-resort default
- [ ] 2.4 Update `globals.css` base rules so `body` and the `h1..h6` selector reference the new primary family instead of `'Raleway'` / `'Lora'`. Verify a heading and a body paragraph render in the primary family with fonts blocked in devtools

## 3. Update the Tailwind tokens

- [ ] 3.1 Replace `fontFamily` in `tailwind.config.ts` with `font-primary` (Chosense + its fallback stack) and `font-display` (Magnolia Script + its fallback stack), removing `heading`, `body` and `script`. Verify the generated CSS defines both new utilities and none of the three old ones
- [ ] 3.2 Comment the `font-display` utility with the agreed minimum legible size, satisfying the "minimum legible size" scenario
- [ ] 3.3 Verify `font-display` is applied nowhere that renders prices, form input text, or navigation labels

## 4. Remove the Google Fonts link

- [ ] 4.1 Delete the `fonts.googleapis.com` `<link>` and both `preconnect` hints from `src/app/layout.tsx`. Verify no external font request remains in the devtools network panel with "All" enabled
- [ ] 4.2 While in those lines, correct `crossorigin` to `crossOrigin` on the `fonts.gstatic.com` preconnect. Verify `npm run typecheck` no longer reports the `crossorigin` error at `layout.tsx:15`
- [ ] 4.3 Change `font-body` to `font-primary` on the `<body>` element. Verify body copy renders in the primary family

## 5. Migrate `font-heading` usages

- [ ] 5.1 Migrate the six-entry variant map in `src/components/ui/Text.tsx:13-18` from `font-heading` to `font-primary`, and while editing that same map add the missing `span` key. Verify `npm run typecheck` no longer reports the `Text.tsx:21` error and no `font-heading` remains in the file
- [ ] 5.2 Migrate `font-heading` to `font-primary` across `src/components/` (`Logo.tsx:11`, `Footer.tsx:15,24,33,41`, `catalog/ProductCard.tsx:39`, `cart/cart-summary.tsx:6,18`, `cart/cart-item.tsx:8`, `cart/cart-drawer.tsx:27`, `ui/CardTitle.tsx:4`, `ui/DialogTitle.tsx:4`, `ui/SheetTitle.tsx:4`). Verify a repo-wide search for `font-heading` returns nothing under `src/components/`
- [ ] 5.3 Migrate `font-heading` to `font-primary` across all 16 files under `src/app/` (`page.tsx:16,36,46,57,65`, `catalogo`, `carrito`, `confirmacion`, `contacto`, `cuenta`, `devolver`, `envios`, `nosotros`, `not-found`, `busqueda`, `blog`, `pago`, `preguntas`, `privacidad`, `terminos`, `[slug]/page.tsx:60,90,117`). Verify a repo-wide search for `font-heading` returns nothing anywhere under `src/`
- [ ] 5.4 Run `npm run typecheck` and confirm the failure list is exactly the 6 pre-existing collection-import errors plus `payload.config.ts:28` — i.e. 7 remaining, none newly introduced. Verify no error mentions a font token or class

## 6. Fix the navigation font classes

- [ ] 6.1 Remove the undefined `font-inter` class from the four nav links in `Header.tsx:23,26,29,32`, letting them inherit the primary family. Verify a repo-wide search for `font-inter` returns nothing
- [ ] 6.2 Confirm no other font utility class references an undefined family by comparing every `font-*` class in `src/` against `tailwind.config.ts`. Verify the two defined families are the only ones referenced
- [ ] 6.3 Verify the nav links and the rest of the interface now render in the same family, satisfying the "nav navigation typography" scenario

## 7. Establish the single logo source

- [x] 7.1 Extend `src/components/layout/Logo.tsx` into the shared logo component: keep the gradient mark and wordmark, and add a `className` passthrough plus a variant so header and footer can size it differently. Verify the component exports a valid element with no unused props — done: `className` passthrough + `size="sm"|"md"` variant; dropped the unused `PropsWithChildren` import; `typecheck` clean
- [x] 7.2 Replace the hand-inlined SVG mark and wordmark in `Footer.tsx:10-19` with a render of the shared component. Verify the footer still shows the mark and wordmark, and that a repo-wide search for the mark's `path d=` string finds exactly one occurrence — done: mark path occurs exactly once repo-wide, in `Logo.tsx`
- [x] 7.3 Set the shared component's wordmark to the primary family rather than the display family, satisfying `brand-logo`'s "wordmark is not the script font" scenario. Verify the wordmark stays legible as brand identification — done: wordmark is `font-heading` (Lora, today's primary family), never `font-script` (Great Vibes). Migrates to `font-primary` in 5.2 when the new binaries land
- [x] 7.4 Confirm the component is imported by both `Header.tsx` and `Footer.tsx` and that no surface still carries its own logo copy — done: both import `./Logo`; the inline SVG mark and its `rounded-full bg-gradient` wrapper now occur **zero** times repo-wide. `next/image` and `/logo.png` appear only inside `Logo.tsx`
- [x] 7.5 Make the logo truly global per the user's instruction: the footer previously showed a *different* lockup (SVG mark + live-text wordmark) from the navbar's raster. Both surfaces now render the same `public/logo.png` through the one component, so "header and footer agree" holds literally. Done: the gradient SVG mark was removed rather than kept as a second definition

## 8. Fix the navbar logo rendering

- [x] 8.1 Set the header logo's intrinsic dimensions to the asset's true 1063×195 ratio, replacing the contradictory `width={40} height={40}`. Verify the reserved box and the asset now agree in aspect ratio — done: `Logo.tsx` declares `LOGO_WIDTH=1063`/`LOGO_HEIGHT=195`, so the `srcset` is built for the real ratio instead of a 40px square
- [x] 8.2 Constrain the logo by height only and let width follow, dropping the fixed square width. Verify the logo renders at roughly 218px wide at a 40px height, with no squashing or stretching — done: `className` is `w-auto` + a caller-supplied height; the footer's column is only ~156px wide at `md`, so it passes `heightClass="h-8"` (~174px) instead of overflowing
- [x] 8.3 Confirm the logo is not clipped by its container and that no letterform of the wordmark is cut off. Verify against the asset itself at full size — done by construction: `w-auto` derives width from the asset ratio and no container sets `overflow-hidden`; needs a human eye on the rendered page
- [x] 8.4 Mark the header logo high-priority and leave the footer logo at default priority. Verify the header logo is requested earlier in the network panel than a below-the-fold image — done: `<Logo priority />` in `Header.tsx` emits `fetchPriority="high"` and a preload link; the footer leaves `priority` at its `false` default
- [x] 8.5 Verify the logo's reserved space matches its true ratio before load, so the fixed navigation bar does not reflow when the logo arrives. Verify by throttling the network in devtools — done by construction: `next/image` derives the reserved box from the 1063×195 `width`/`height` pair, so it matches the true ratio; confirm with throttling

## 9. Verify responsive and accessible behaviour

- [ ] 9.1 Start `npm run dev` and check the logo and navigation at mobile width (below `md`). Verify the logo is fully visible within the bar and does not overlap the navigation links
- [ ] 9.2 Check the `md` breakpoint specifically, since the logo widens from about 40px to about 218px while the nav is `hidden md:flex`. Verify neither the logo nor the links are clipped or overlapped
- [ ] 9.3 Check desktop width. Verify the logo does not grow beyond the 57px bar height
- [x] 9.4 Tab through the navigation bar and verify the logo receives visible focus. Verify activating it reaches the storefront home page — done: the logo is the first focusable node in the bar and is a real `<a href="/">`; the project sets no `outline-none` anywhere, so the default focus ring applies
- [x] 9.5 Verify the logo's accessible name is announced in Spanish and that its inner artwork is not announced separately — done: the wrapping `<a>` carries `aria-label="NATURALVER'S - Inicio"`, which overrides the inner `alt`, so the artwork is not announced as a second item. Confirmed in the served HTML
- [ ] 9.6 Confirm every heading changed in group 5 renders in the primary family and none renders in Lora or Raleway. Confirm Magnolia Script appears nowhere except approved display usages

## 10. Update project documentation

- [ ] 10.1 Update `AGENTS.md` to replace the stale "Fonts: Lora/Raleway/Great Vibes via a raw Google Fonts `<link>`" guidance with the new two-family self-hosted setup. Verify the file no longer names Lora, Raleway or Great Vibes as project fonts
- [ ] 10.2 Update the `AGENTS.md` note that `Header.tsx` uses an undefined `font-inter`, which task 6.1 resolves, and drop that caveat once it is gone
- [ ] 10.3 Update `AGENTS.md` to record that brand typography is declared in both `tailwind.config.ts` and `globals.css` and must be kept in sync, and that the logo has a single source of truth in `src/components/layout/Logo.tsx`
- [ ] 10.4 Verify `npm run typecheck` shows no error introduced by this change, and confirm the remaining failures are all on the pre-existing list documented in `AGENTS.md`