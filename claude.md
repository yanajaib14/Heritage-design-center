# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:3000 (Next.js + Turbopack)
npm run build      # production build — run this to catch TypeScript/build errors
npm run start      # serve the production build
```

There is no test runner, linter, or type-check script configured. `npm run build` is the only automated gate — it type-checks the whole project (`strict: true` in tsconfig). Verify features manually in the browser.

## Environment

Sanity CMS is optional. Set in `.env.local` to enable CMS content:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (defaults to `production`)

Without these the site falls back to hardcoded content and still runs fully — every Sanity fetch is wrapped in try/catch that silently degrades to the built-in copy.

## Architecture

This is the **marketing website** for Heritage Design Center, a kitchen & bath showroom in Lacey, WA. Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3. Deployed on Vercel. **There is no backend, auth, database, or API routes** — it's a content/animation-driven brochure site. (Ignore the Supabase/interview-app description in the old `project_specs.md`; it does not reflect this code.)

### Path alias
`@/*` maps to the repo root (see `tsconfig.json`), so imports look like `@/components/NavBar` and `@/src/sanity/client`.

### Routes (`/app`)
Each route is a folder with a `layout.tsx` (exports `metadata` for per-page SEO) and a `page.tsx` (the actual page, usually a `"use client"` component that composes section components from `/components`):
- `/` — home (`app/page.tsx`) — the one Server Component that fetches Sanity landing data
- `/collections`, `/gallery`, `/process`, `/showroom`
- `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`

### Sanity CMS integration (`/src/sanity`)
- `client.js` — `sanityClient` + `fetchSanity(query, params)` helper (uses CDN, apiVersion pinned).
- `queries.js` — GROQ queries (e.g. `landingPageBySlugQuery`).
- `contentMapper.js` — maps raw Sanity documents into the prop shapes components expect, and defines `portableTextComponents` / `PortableBodyText` for rendering Portable Text.
- Data flow: `app/page.tsx` (Server Component) calls `fetchSanity` → `mapLandingPageToComponentProps` → passes overrides down to `HeroSection` / `SanityLandingContent`. If the fetch fails or returns nothing, components render their built-in defaults.

### Animation system (GSAP + Lenis) — most important architectural concept
Three cooperating pieces, all mounted once in `app/layout.tsx`:

1. **`SmoothScroll.tsx`** — initializes Lenis smooth scrolling, drives it from GSAP's ticker, and calls `ScrollTrigger.update()` on every scroll so position-based triggers stay in sync. Also resets scroll to top on route change (`usePathname`).
2. **`ScrollAnimations.tsx`** — a global scroll-reveal pass. After a 400ms mount delay (so all client components have rendered), it queries the DOM by **CSS class** (`.showcase`, `.why-item`, `.process-step`, `.section-rule`, `.page-cta-section`, etc.) and attaches `ScrollTrigger` reveal animations. Wrapped in `gsap.context()` so cleanup only reverts its own triggers. **Disabled on touch devices** (`ScrollTrigger.isTouch === 1`).
3. **Per-component animations** — richer components (e.g. `HeroSection.tsx`) register their own GSAP timelines/ScrollTriggers locally with `useRef`.

Consequence: adding a section that should animate on scroll usually just means giving its elements the marker classes that `ScrollAnimations.tsx` already looks for — no new JS needed. New animation types go in `ScrollAnimations.tsx` (global, class-based) or inside the component itself (local, ref-based). Remember most global reveals are **touch-disabled**, so content must be visible without them on mobile.

### Styling
- Tailwind is configured but most styling lives in **`app/globals.css`** as CSS custom properties (brand tokens) + hand-written classes. Brand palette, fonts, spacing (`--pad`, `--max`), and the `.testi-*` / `.showcase` / `.why-item` component classes are defined there.
- Colors use CSS variables like `var(--gold)`, `var(--text-dim)`, `var(--bg)`. Prefer these over hardcoded hex.
- Fonts: **Cormorant Garamond** (display/serif) and **Jost** (body) loaded via `next/font/google` in `app/layout.tsx`, exposed as `--font-display` / `--font-body`.
- `globals.css` has a `@media (max-width: 960px)` block that intentionally darkens some tokens and adjusts sections for mobile readability.

### SEO
Heavily SEO-tuned. `app/layout.tsx` sets `metadataBase`, default/template titles, keywords, OpenGraph/Twitter cards, and injects two JSON-LD `<script>` blocks (`HomeAndConstructionBusiness` + `WebSite`). Each route's `layout.tsx` overrides `title`/`description`/`canonical`. Keep canonical URLs (`https://heritagedesignctr.com/...`) and business details (address, phone `+13605573441`, hours) consistent when editing.

### Images
`next.config.ts` whitelists remote image hosts: `images.unsplash.com`, `images.squarespace-cdn.com`, `showplacecabinetry.com`. Add new external image domains there or they'll fail at runtime.

## Working style (from the project owner)

The owner is non-technical. When explaining what you did or what they need to do, use plain English (no jargon), keep it concise, and give one clear next step. For anything involving external dashboards (Vercel, Sanity), walk through exactly where to click. Build exactly what's asked — don't over-engineer or change unrelated code.

## Business context

Luxury kitchen & bath design showroom / material supply business in Lacey, WA, serving Western Washington. Sister company to 10 Day Kitchens. Brand colors: dark charcoal `#0f0e0d`, brass gold `#c9a84c`, off-white `#f5f0e8`. Fonts: Cormorant Garamond (headings), Jost Light (body). Site is Next.js 16 / Tailwind / GSAP, deployed on Vercel. Uses a HoneyBook embed (PID `698386a789407f0007b175e0`) for consultation booking.

### Site sections (as of last check)

- Hero
- Product categories: Cabinetry, Countertops, Tile, Bath fixtures, Hardware & lighting
- "Design services" (concept-to-installation guidance)
- Curated brand showcase
- Homeowner vs. contractor/builder messaging (two audiences on the site)
- Showroom location / consultation CTA

## Update & deploy workflow

Whenever the owner asks for an update/edit to the website:

1. Make the change **locally**.
2. Start the dev server and give the owner a **preview on localhost** (`http://localhost:3000`) to review.
3. **Wait for the owner's explicit approval** ("looks good" / "approved"). Do not commit before this.
4. Once approved, **commit and push straight to `main`** — which auto-deploys to production on Vercel.
