# NATURALVER'S — Agent Instructions

Next.js 15 (App Router) + Tailwind v3 storefront for natural products. UI copy is **Spanish**; code identifiers are English. `npm` only. No CI, no tests, no formatter.

## Commands

```bash
npm run dev         # next dev (:3000)
npm run build
npm run typecheck   # tsc --noEmit
npm run lint        # BROKEN — see below
```

- **`npm run lint` does not work.** `eslint` is not in `devDependencies` and there is no eslint config. Don't try to fix lint errors you can't reproduce; use `typecheck`.
- **There is no test framework.** No `test` script, no runner, no fixtures. Verification = `npm run typecheck` + `npm run dev`.
- Import alias is `@/*` → `src/*` (`tsconfig.json`).

## `npm run typecheck` fails on a clean checkout — 9 pre-existing errors

Do not attribute these to your change; fix only the ones you touch:

| Location | Error |
|---|---|
| `payload.config.ts:28` | `outfile` is not a valid key — installed Payload 3 expects `outputFile` |
| `src/collections/*.ts` (6 files) | `Cannot find module '@payloadcms/payload'` — that package doesn't exist; the types live in `payload` |
| `src/app/layout.tsx:15` | `crossorigin` must be `crossOrigin` (React DOM casing) |
| `src/components/ui/Text.tsx:21` | variant map is missing the `span` key |

## Payload CMS is configured but NOT wired into Next.js

This is the single biggest trap. Assume nothing about the CMS working:

- `payload.config.ts` is **dead config**. There is no `(payload)` route group, no `route.ts` anywhere, and no `import ... from 'payload'` in `src/`. **`/admin` does not exist.**
- `src/lib/payload.ts` fetches `/api/products` etc. — no such endpoint exists, so every call throws and silently falls back to `src/lib/mock-data.ts`. Its `useMock` flag latches `true` for the process lifetime after the first failure.
- Pages that bypass the data layer entirely import mock data directly — e.g. `src/app/catalogo/page.tsx:14` imports `@/lib/mock-data`. Check the import before assuming a page reads through `src/lib/payload.ts`.
- **Mock data is the live catalog.** To change what the storefront shows today, edit `src/lib/mock-data.ts`.
- `src/types/payload.ts` (the configured codegen outfile) **does not exist and is not committed**. `src/types/index.ts` is hand-written despite its "Tipos generados por Payload CMS" header — treat it as normal source you must maintain by hand. There is no codegen command; `next dev` does not generate it in this setup.
- `Orders` has `access: { read, create, update, delete: () => true }` — fully open. It's inert today; it becomes a live hole the moment the admin is mounted. Don't copy that pattern.
- Collection fields use `localized: true` but `payload.config.ts` declares no `i18n` block, so localization is unverified at best.

## Payments / orders are not implemented

- **No Stripe, no payment gateway, no WhatsApp checkout flow.** `/pago` renders a "Forma de pago no disponible" placeholder (`src/app/pago/page.tsx`). `/confirmacion` is a static thank-you. Neither creates an order.
- **There is no `NEXT_PUBLIC_WHATSAPP_NUMBER`.** The old instruction file claimed it was required — it does not exist in code or in `.env.example`. The only WhatsApp link is hardcoded at `src/app/contacto/page.tsx:36`. If you wire checkout, add the env var deliberately rather than assuming it.
- **The cart is in-memory only** (`src/contexts/CartContext.tsx`): plain `useState`, no `localStorage`, no DB. It resets on reload and nothing ever POSTs to `orders`.
- Add-to-cart buttons are **not wired**: the hover button in `src/components/catalog/ProductCard.tsx:31` and the `Button` in `src/app/[slug]/page.tsx:83` have no `onClick`. `ProductCard` is a plain `div`, not a `next/link`, so products aren't reachable by URL from the grid either.

## Routing

`src/app/[slug]/page.tsx` resolves a slug as **product first, CMS page second** (`queryProductBySlug` → `queryPageBySlug` → `notFound()`), and it also runs `generateMetadata`. It is the product-detail route, not just a CMS-page catch-all. Static segments (`/catalogo`, `/nosotros`, `/blog`, …) take precedence over it.

`Layout` (`src/components/layout/Layout.tsx`) applies `pt-16` to offset the `fixed` header — but the header is `h-[57px]`, so there's a 7px gap. Add fixed-header content inside `Layout`'s `<main>`, not the root layout.

## Env

`payload.config.ts` has dev fallbacks (`PAYLOAD_SECRET=dev-secret-change-me`, `mongodb://localhost:27017/naturalvers`), so `npm run dev` and `npm run build` work with no env file. `.env.local` is gitignored and **not present** — create it from `.env.example` when you need real values. `NEXT_PUBLIC_PAYLOAD_API_URL` (read by `src/lib/payload.ts`) is undocumented in `.env.example`; it defaults to `/api`.

## Design tokens are defined twice — keep them in sync

Brand colors exist in **both** `tailwind.config.ts` (`brand.dark/light/navy/sky`) and `src/app/globals.css` (`--color-brand-*`). Adding or renaming a color means editing both. Use `text-brand-dark` / `bg-brand-light` etc. rather than raw hex.

Fonts: `font-heading` (Lora), `font-body` (Raleway), `font-script` (Great Vibes) — loaded via a raw Google Fonts `<link>` in `src/app/layout.tsx`, not `next/font`. `Header.tsx` also uses `font-inter`, which is **not defined** in the Tailwind theme and silently does nothing.

`darkMode: 'class'` is configured but no dark theme is implemented.

## Other traps

- `next.config.js` allows `next/image` remote sources only for `placehold.co` and `res.cloudinary.com`. Any other image host needs a new `remotePatterns` entry or it fails at runtime.
- Component naming is inconsistent by design: `components/ui/*` and `layout/*` are PascalCase; `components/cart/*` and `catalog/*` are kebab-case except `ProductCard.tsx` / `ProductGrid.tsx`. Match the directory you're editing.
- Most components are Server Components; add `'use client'` only for state/handlers (`Header.tsx`, `catalogo/page.tsx` are client).

## Spec-driven workflow

`openspec/` is set up (`schema: spec-driven`, `openspec/config.yaml`) with skills in `.opencode/skills/openspec-*`. `openspec/changes/` is empty (only `archive/.gitkeep`). There is no `opencode.json` in the repo. Current branch is `juandi`; history is a single commit.
