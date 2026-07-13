# Maison Noir

A premium restaurant website — black / flame-orange design language, built on React 19, Vite, Tailwind v4 and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Design system

Everything visual is defined once, in `src/styles/index.css` (Tailwind v4 `@theme`). Change a token there and it propagates site-wide.

| | |
|---|---|
| Surfaces | `obsidian #0B0B0C` · `charcoal #121214` · `elevated #1A1A1D` · `graphite #242429` · `hairline #2E2E34` |
| Accent | `gold #F0501E` (flame) · `gold-light #F2A93B` (amber) · `gold-deep #C03D14` |
| Text | `bone #FFFFFF` · `muted #B0B0B6` · `faint #78787F` |
| Display | Oswald — heavy, condensed, uppercased on `h1`–`h4` automatically |
| Body | Inter, weight 400 |
| Radius | `rounded-card` 8px · `rounded-modal` 10px · `rounded-input` 4px |
| Motion | 0.6–0.9s, ease `[0.22, 1, 0.36, 1]`, 60–90ms stagger — all presets in `src/animations/variants.js` |

The accent tokens are still *named* `gold` for historical reasons — the values are flame orange and amber. Renaming them is a find-and-replace away if it bothers you.

Utility classes worth knowing: `.shell` (page gutter), `.section` (vertical rhythm), `.eyebrow`, `.glass`, `.glass-strong`, `.text-gilded` (flame gradient), `.starburst` (the HOT / price tag), `.ghost-word`, `.rule-gold`, `.noise`.

## Structure

```
src/
  animations/   Framer Motion variants — the single source of timing
  components/
    ui/         Button, Image, Field, Modal, Accordion, Counter, Loader, Skeleton, Misc
    cards/      DishCard (3D tilt), ReviewCard, ChefCard, BlogCard, EventCard
    sections/   Hero, Story, FeaturedDishes, ChefSection, Reviews, GalleryPreview, Cta
    layout/     Navbar (mega menu), Footer, CartDrawer, PageHeader, Ambient (cursor, progress, FABs)
  constants/    Site details, navigation, awards, tax/tip/coupon config
  data/         Dishes, chefs, reviews, gallery, events, blog, FAQ, timeline
  hooks/        useLenis, useMagnetic, useTilt, useScrolled, useLockScroll, useDebounced …
  layouts/      RootLayout — smooth scroll, page transitions, ambient UI
  pages/        16 routes
  routes/       Router with per-page code splitting
  services/     api.js — stubbed backend (swap the bodies for real fetches)
  store/        useCart — Zustand, persisted, derives all totals
  utils/        cx, formatPrice, formatDate, …
```

## Notes

- **Images** always go through `<Image>` — lazy, skeleton underneath, fixed aspect box, so there is no layout shift.
- **Motion** respects `prefers-reduced-motion`; Lenis, parallax and particles all switch off.
- **Cart totals** are derived in `useCart.totals()` and nowhere else, so the drawer and checkout can never disagree.
- **SEO** — `<Seo>` handles the head per page and emits Restaurant / Article / FAQPage / BreadcrumbList JSON-LD.
- The backend is stubbed. Reservations, orders, contact and newsletter all resolve locally in `src/services/api.js`.
