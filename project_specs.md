# Heritage Design Center — Project Specs

## What the App Does & Who Uses It
A premium marketing website for Heritage Design Center, a high-end kitchen and bath design studio. The site showcases their portfolio, services, and brand story, allowing prospective clients to explore their work and request a consultation.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (with ScrollTrigger, SplitText, Observer)
- **Hosting:** Vercel
- **Fonts:** Google Fonts (Cormorant Garamond + DM Sans)

## Pages & User Flows

### Public Pages
1. **`/`** — Home: Hero, Featured Projects, Services overview, Brand statement, Testimonials, CTA
2. **`/kitchens`** — Kitchen portfolio grid with project reveals
3. **`/baths`** — Bath portfolio grid with project reveals
4. **`/about`** — Studio story, team, philosophy, awards
5. **`/contact`** — Consultation request form + studio info

## Design System
- **Colors:**
  - Cream: `#F5F0E8`
  - Charcoal: `#1A1A1A`
  - Warm White: `#FAFAF8`
  - Gold Accent: `#C5A76B`
  - Stone: `#9B8E7E`
  - Deep Brown: `#2C1810`
- **Typography:**
  - Display: Cormorant Garamond (serif, elegant)
  - Body: DM Sans (clean, modern)
- **Spacing:** Generous whitespace, editorial layout
- **Images:** Unsplash high-res kitchen/bath photography

## Animations (GSAP)
- Hero text split + stagger reveal
- Scroll-triggered image reveals (clip-path)
- Parallax image layers
- Magnetic button hover effects
- Counter animations for stats
- Horizontal scroll gallery
- Smooth page transitions
- Custom cursor follower
- Staggered card reveals on scroll

## "Done" Criteria
- All 5 pages render without errors
- GSAP animations fire correctly on scroll and load
- Responsive on mobile and desktop
- `npm run build` passes with no TypeScript errors
- Dev server runs at `localhost:3000`
