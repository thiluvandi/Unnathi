# Unnathi Creatives — Project Brief

A custom-built, true-3D website for **Unnathi Creatives**, a workers' co-operative
that provides dignified, paid livelihood work to adults with autism and
intellectual disabilities, who hand-make eco-friendly block-printed products.

Built to replace the previous WordPress/Avada site with a distinctive,
minimalist, motion-forward experience grounded in the studio's own craft
(hand-carved wooden block-printing stamps, natural indigo dye).

## Links

| | |
|---|---|
| **Live site** | https://unnathi-mu.vercel.app |
| **Repository** | https://github.com/thiluvandi/Unnathi |
| **Contact** | creativesunnathi@gmail.com · +91 94488 03499 |

## Stack

- **Vite + React 19 + TypeScript**
- **React Three Fiber + drei** (Three.js) — the 3D block-print scene
- **Framer Motion** — scroll reveals, page transitions, shared-layout (`layoutId`) animations
- **Lenis** — smooth scroll
- **Tailwind CSS v4** (`@tailwindcss/vite`) — theme tokens in `src/index.css`

```bash
npm install       # install deps
npm run dev       # local dev server (localhost:5173)
npm run build     # production build (tsc -b && vite build)
npm run preview   # serve the production build locally
```

## Design system

**Typography:** Fraunces (serif, display) + Hanken Grotesk (body/utility).

**Palette — "Indigo & natural cotton"** (the actual block-print dye palette,
deliberately moved off the generic cream+terracotta "AI-generated" look):

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#ece7db` | unbleached cotton (background) |
| `--color-cream-deep` | `#dcd4c1` | secondary background |
| `--color-ink` | `#26282e` | soft indigo-ink (text, dark sections) |
| `--color-ink-soft` | `#575a63` | body text |
| `--color-clay` | `#3c4c67` | **natural indigo — primary accent** |
| `--color-clay-soft` | `#7c93be` | light indigo (for dark backgrounds) |
| `--color-sage` | `#4a5440` | khadi olive |
| `--color-gold` | `#b98a44` | muted turmeric (rare warm note) |
| `--color-walnut` | `#6e4a2a` | wood tone (3D stamps) |

**Structural rule:** numbered markers (01/02/03) are used only where content is
a genuine sequence (the Train → Create → Own co-op process). Parallel content
(e.g. the "What We Do" pillars) uses a small carved block-print floret mark
(`CraftMark.tsx`) instead.

## Page structure (`src/App.tsx`)

1. **Hero** — full-viewport 3D scene of floating carved wooden block-printing
   stamps (procedurally textured — paisley, mandala, floral, border, leaf
   motifs), mouse parallax, headline "Made by hand, and fairly paid."
2. **Marquee** — scroll-driven (not perpetual auto-scroll) list of product types
3. **What We Do** — "Ability, not disability." + three value pillars
4. **Makers** *(new)* — real photo of a maker being guided while block-printing,
   plus a team photo that **expands into a full-screen view on click** (smooth
   shared-layout animation, click backdrop or Esc to close)
5. **Approach** — the Train → Create → Own co-operative process, on an olive band
6. **Training** — cinematic, scroll-scrubbed video: a real training clip whose
   playback position is driven by scroll, with 7 timestamped captions and the
   video panel expanding into a full-height right-hand panel as you scroll in
7. **Products** — six real product photographs (indigo block-printed apparel,
   bags, stoles, paper goods, gifts, cards) in tilting 3D cards
8. **Impact** — animated counters ("The work so far.")
9. **Contact / Footer** — "Every order pays a maker."

## Key engineering details worth knowing

- **Mobile nav**: full-screen hamburger menu (`Nav.tsx`), separate from the
  desktop pill nav; nav bar has a permanent frosted-glass background so text
  stays legible over the 3D scene at any scroll position.
- **Accessibility / reduced motion**: `MotionConfig reducedMotion="user"`
  wraps the whole app; a global `prefers-reduced-motion` CSS block, visible
  `:focus-visible` rings, and the 3D canvas pauses its render loop (via
  `frameloop`) when reduced-motion is on or the hero is off-screen.
- **Training video encoding**: the source clip must be re-encoded **all-intra**
  (a keyframe on every frame) or scroll-scrubbing will stick/stutter — normal
  video encoding only keyframes every ~1–2s, which makes `currentTime` seeks
  slow. Command used:
  ```bash
  ffmpeg -i input.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset veryfast \
    -crf 21 -x264-params "keyint=1:min-keyint=1:scenecut=0" \
    -pix_fmt yuv420p -movflags +faststart public/training.mp4
  ```
- **CSS gotcha (fixed)**: a stray `*/` inside a code comment (`px-*/py-*`)
  silently truncated a CSS comment and broke the `@layer base` reset in
  **production builds only** (Vite dev tolerated it) — this corrupted layout
  spacing site-wide and broke the Training section's scroll-scrub math on
  Vercel. Always test with `npm run build && npm run preview` before trusting
  a deploy, not just `npm run dev`.
- **Real media**: photos/video live in `public/media/`; two authentic
  block-printing clips (`printing-wide.mp4`, `printing-maker.mp4`) are staged
  but not yet used — candidates to replace the current Training clip.

## Recent changes (most recent first)

- Team photo in the Makers section now **expands to full-screen on click**
  with a spring animation, and minimizes back on backdrop-click or Esc
  (shared `layoutId` animation, scroll-locked while open).
- Fixed a production-only CSS build bug that broke the Training video's
  scroll-scrub on Vercel (see above).
- Replaced all placeholder/gradient product cards with real product
  photography; added the "Makers" section with a real photo of a maker at work.
- Repainted the whole palette from generic cream/terracotta to "Indigo &
  natural cotton" (the real block-print dye colors); rewrote several AI-sounding
  headlines to be plainer and more specific (e.g. "Handmade with heart &
  purpose" → "Made by hand, and fairly paid.").
- Enlarged the logo; gave the nav a permanent frosted-glass background so it
  stays legible over the 3D hero at all scroll positions.
- Accessibility/motion pass: mobile hamburger menu, reduced-motion support,
  focus rings, calmer/less-scattered animation, mobile-specific (single-stamp)
  hero composition instead of the desktop scene shrunk down.
- Built the scroll-scrubbed Training section (video playback tied to scroll
  position, 7 timestamped captions, expanding video panel).
- Initial build: 3D hero, product cards, co-op process section, impact
  counters, contact section.

## Known gaps / open items

- Two real block-printing videos are staged in `public/media/` but unused —
  a candidate replacement for the current Training clip.
- Impact stat numbers (25+, 8, 5,000+, 100%) are placeholders — replace with
  real figures.
- No shop/checkout — the old WordPress site had WooCommerce; this site is
  informational + contact-to-order only.
