# Patrick's Mindgarden — Technical Brief v3
_Portfolio rebuild · Patrick Caire · April 2026 · supersedes moodboard v2_

---

## What changed from v2

- **Home archetype** is now an **exploded scattered-card scene** (all nodes visible at once), not a hero + small scatter. The homepage is the mindgarden, flat.
- **Navigation pattern** is now **four corners + top-center pill**, not a single top pill row.
- **Palette source** shifts from dark editorial red/ochre to a **warm organic system** (sage, olive, coral, cream, near-black) derived from `image_49.png`.
- **Component vernacular** (card shape, shadow depth, pill treatment, input styling) is locked to the `creative_portfolio_redesign_v1.png` reference.
- **Motion budget** is explicit: floating idle, draggable cards, organic cluster transitions, cascading page reveals, hover micro-lifts. Not a scroll-driven WebGL showcase.

Everything else preserved from v2: three clusters (Creating / Playing / Thinking), MDX content, Next.js + Tailwind, link-out policy, Fraunces + Manrope.

---

## One-line spec

A mindgarden rendered as a floating, draggable scene — one glance shows the whole mind, one click drops you into a cluster, everything breathes.

---

## Page inventory

| Page | Role | Corners present |
|---|---|---|
| **Home** (`/`) | Scattered exploded view — all ~10 nodes visible and draggable | TR (download), BR (music), BL (chat/contact), *no TL* — chat input bar at bottom |
| **Playing** (`/playing`) | Masonry-style irregular grid of music/DJ/video artefacts | TL (home), TR (download), BR (music), BL (email) |
| **Creating** (`/creating`) | Structured-scatter grid of project cards (case studies) | TL (home), TR (download), BR (music), BL (email) |
| **Creating — detail** (`/creating/[slug]`) | Long-form case study: media grid + body copy | TL (back), TR (download), BR (music), BL (email) |
| **Thinking** (`/thinking`) | 3-column feed of embedded LinkedIn posts, essays, bookmarks | TL (home), TR (download), BR (music), BL (email) |

**Corner semantics (locked):**
- **Top-left**: home (absent on `/`, becomes back-arrow on detail pages)
- **Top-right**: download TLDR (CV + portfolio one-pager — *see open question #6*)
- **Bottom-left**: contact — opens email client *or* reveals contact panel (*see open question #8*)
- **Bottom-right**: persistent mini music player — collapsed pill, tap to expand

**Homepage-only**: anchored chat input bar ("What would you like to know?") across bottom center.

---

## Content inventory — Home cards

From the wireframe, ten node cards, each a polaroid-style tile rotated ±4–8°, label running along a curved edge:

1. Web Design → `/creating` (filters for web)
2. Side-quests → TBD (code experiments cluster?)
3. things I've coded → `/creating` (filter: software)
4. my old art blog → external link
5. things I wrote → `/thinking`
6. music I make → `/playing` (filter: originals)
7. DJ sets → `/playing` (filter: mixes)
8. Music Video → `/playing` (filter: video)
9. visuals I made → `/creating` (filter: art direction)
10. UX Design → `/creating` (filter: UX)

**Open:** are any cards external-only (linkouts) vs routing internally? *See open question #3.*

---

## Aesthetic tokens

### Palette — derived from `image_49.png`

A warm wellness-editorial system. Not minimalist beige, not SaaS neutral. Think: linen + moss + sun-warmed clay + a touch of coral heat.

| Role | Token | Hex (approx — confirm against source in design) | Notes |
|---|---|---|---|
| Base | `--base` | `#F5EFE1` | warm parchment/linen |
| Surface | `--surface` | `#FAF4E8` | card background — slightly lighter than base |
| Surface-raised | `--surface-raised` | `#FFFFFF` / `rgba(255,255,255,0.6)` | for elevated states, hover |
| Ink | `--ink` | `#141814` | warm near-black, olive-tinted |
| Ink-muted | `--ink-muted` | `rgba(20,24,20,0.55)` | secondary text |
| Accent — moss | `--moss` | `#4F6B28` | primary brand green, active states |
| Accent — sage | `--sage` | `#C5D4A8` | soft green for gradients/tints |
| Accent — coral | `--coral` | `#F0A488` | warm alert/heat moments |
| Accent — butter | `--butter` | `#F7DFA0` | occasional warm highlight |
| Background gradient | — | radial from `#F5EFE1` center → `#D8E0C4` edges | inherited from v1 ref; subtle |

**Usage rules:**
- Moss is the one saturated brand color. Used sparingly: active pill state, link hover underline, focus ring, music-player accent.
- Coral and butter are reserved for micro-moments — a single dot, a highlight-tag on "new", a heat on the music player when playing.
- Sage carries the ambient atmosphere (backgrounds, dividers, hover tints).
- Never more than one saturated color on screen at a time in the user's foveal focus.

**Dark mode** — *deferred to v2.* v1 ships light-mode only; it's the aesthetic's natural home. Flag in `<meta>` that dark mode is coming but don't stub a broken toggle.

### Typography — LOCKED

- **Display**: **Fraunces** (variable — use `opsz` and `SOFT` axes). Weights used: 400 regular, 400 italic, 600 for smaller display.
  - Wordmark "Patrick": Fraunces 96–120px, regular, `opsz: 144`, `SOFT: 100`
  - Page titles, card labels on detail pages: Fraunces 32–48px
  - In-line emphasis: Fraunces italic for single words inside Manrope paragraphs
- **Body / UI**: **Manrope** (variable). Weights: 400, 500, 600.
  - Body: Manrope 400 / 16px / 1.55 line-height / `max-w-[58ch]`
  - UI labels: Manrope 500 / 13–14px
  - Tiny meta: Manrope 500 / 11px / `tracking-[0.12em]` / uppercase
- **No monospace** in v1. Can be layered later if engineer-voice gets stronger.

### Shadows & elevation

From the v1 reference: shadows are **warm and diffuse, never crisp**.

```css
--shadow-xs: 0 1px 2px rgba(76, 60, 30, 0.04);
--shadow-sm: 0 2px 8px rgba(76, 60, 30, 0.06);
--shadow-md: 0 8px 24px -4px rgba(76, 60, 30, 0.10);
--shadow-lg: 0 20px 48px -12px rgba(76, 60, 30, 0.14);
--shadow-drag: 0 32px 64px -16px rgba(76, 60, 30, 0.22); /* only during active drag */
```

### Radius system

- Small (pills, inputs): `rounded-full` or `rounded-[999px]`
- Card: `rounded-[20px]` (home polaroid), `rounded-[24px]` (cluster-page tiles), `rounded-[32px]` (detail page container)
- Corner icons: `rounded-full` (circle, 48px diameter)

---

## Motion system

Three motion layers, in order of prominence:

### Layer 1 — Idle ambient (always on, subtle)
Every home card has a **gentle float loop**: ±4px Y translate, ±1° rotation wobble, over 6–10s, staggered so no two cards sync. CSS `animation` is fine; no JS needed. Paused when user hovers a card or drags anything.

### Layer 2 — Interaction (on input)
- **Hover card** (desktop): scale 1.03, rotate → 0° (settles upright), shadow deepens, 400ms `cubic-bezier(0.16, 1, 0.3, 1)` out.
- **Drag card**: scale 1.05, shadow → `--shadow-drag`, cursor → `grabbing`. Card follows cursor with spring physics (`stiffness: 180, damping: 22`). On release, card **stays** where dropped (doesn't snap back) — this gives the "arrange my mind" feeling. *Open question #2.*
- **Click vs drag distinction**: tap (pointerdown → pointerup with <8px movement and <200ms duration) = navigate. Anything else = drag. Framer Motion `onTap` + `drag` handles this natively.
- **Corner icon hover**: magnetic pull ±6px toward cursor, 250ms spring. Tooltip slides in from the icon's screen-edge side.
- **Nav pill switch**: active pill slides between Playing/Creating/Thinking with `layoutId`, 450ms spring. Inactive pills unfilled with just text; active pill is filled with soft surface-raised + shadow.

### Layer 3 — Page transitions (organic, ease-in-out)
- **Home → cluster page**: home cards **fly to their cluster's future positions** (via shared `layoutId` on cards that exist in both scenes), non-matching cards fade and float out, new cards stagger in. 700ms total. This is the magic moment.
- **Cluster → detail**: selected card `layoutId` morphs from grid position to the detail header block. 600ms.
- **Cluster → cluster** (e.g., Playing → Thinking): masonry items cascade out with 30ms stagger, new cluster's items cascade in with 40ms stagger. Feels like a card shuffle. 800ms.
- **Back to home**: reverse of the enter transition.

### Layer 4 — Optional delight (if budget allows)
- **Cursor parallax**: all home cards drift ±3px based on cursor position (relative to screen center). Creates depth without heavy lift. CSS custom properties updated on `pointermove`, throttled. Off on mobile.
- **Music player**: when playing, subtle radial pulse in coral emanates from the play icon every ~4s.
- **Focus ring**: moss-colored, offset 3px, slightly blurred.

**Anti-patterns for this project:**
- No parallax scroll backgrounds
- No cursor trails
- No sound effects on interactions
- No autoplay video or audio anywhere
- No modal backdrops with heavy blur — use surface-raised elevation instead

---

## Component system

### `CornerIcon`
48px circle, 1px border `rgba(20,24,20,0.12)`, surface-raised background. Icon inside: 20px, Phosphor or custom SVG, strokeWidth 1.5. Hover: magnetic pull + shadow-sm. Active tap: scale 0.94.

### `NavPill`
Container: `rounded-full`, `bg-surface-raised/80` + backdrop-blur, 1px border, shadow-sm. Three inner items: Fraunces 20px (mobile) / 22px (desktop), 20px horizontal padding. Active item wrapped in absolutely-positioned `<motion.div>` with `layoutId="nav-pill-indicator"`.

### `PolaroidCard` (home)
Background: `--surface`, `rounded-[20px]`, 12px padding. Image area: square aspect, `rounded-[14px]`, inner 1px border. Label: curved path using SVG `<textPath>` along the bottom edge, Fraunces italic 14–16px. Rotated via `transform: rotate()` at mount, different for each card (seeded, not random per render).

### `ClusterTile` (Playing / Creating / Thinking)
Variant A — masonry (Playing, Thinking): `rounded-[24px]`, varied heights (h-[240px] to h-[540px]), `break-inside-avoid` in CSS columns layout.
Variant B — labeled tile (Creating): `rounded-[20px]`, fixed aspect ratios (4:3, 16:9, 1:1 mixed), label below card in Fraunces 20px.

### `ChatInputBar` (home only)
Pill-shaped, centered, ~640px wide on desktop. Left: "What would you like to know?" placeholder, Manrope 16px. Right: 36px send button, coral-accented circular. Bar background: `surface-raised/90` + backdrop-blur, 1px border, shadow-md.

### `MusicPlayer` (bottom-right)
Collapsed: 48px circle, play/pause icon. Expanding on tap: reveals track title, waveform scrubber, skip controls. Expanded width: 320px. Transition: `layoutId="music-player"`, 500ms spring. Source: one embedded Bandcamp/SoundCloud/Mixcloud ID — hardcoded v1, dynamic later.

---

## Tech stack — unchanged from v2

- **Framework**: Next.js 15 (App Router, RSC default)
- **Styling**: Tailwind v4 (with `@theme` block for tokens)
- **Motion**: Framer Motion v11 (primary)
- **Content**: MDX files in `/content/{cluster}/{slug}.mdx`
- **Icons**: `@phosphor-icons/react`, strokeWidth 1.5 globally
- **Fonts**: Google Fonts (Fraunces + Manrope via `next/font`)
- **Deploy**: Vercel
- **Build env**: Cursor + Claude Code + the merged SKILL file

**Isolation rule (critical):** any component using Framer Motion, drag, or perpetual animation MUST be a Client Component (`"use client"`). The home page server component passes card data as props to a `<MindgardenScene />` client leaf. Same pattern on cluster pages.

---

## Accessibility

- All card drags have a keyboard equivalent: `Tab` to focus, `Enter` to navigate (the click path).
- Idle float animation respects `prefers-reduced-motion: reduce` — falls back to static positioning.
- Focus rings visible on all interactive elements (moss, offset 3px).
- Screen-reader order: skip-link → nav pill → cards in DOM order (not rotation order) → chat bar → corner icons.
- Color contrast: ink-on-base is ~16:1. Muted-on-base is ~4.8:1 (passes AA large text, fails AA body — use for meta only, not paragraphs).
- `aria-label` on corner icons. Music player announces track changes via `aria-live="polite"`.

---

## Responsive strategy

The scattered scene breaks on mobile. Fallback:

- **Desktop (≥1024px)**: full scatter as designed.
- **Tablet (768–1023px)**: scatter with tighter bounding box, cards smaller, drag still enabled.
- **Mobile (<768px)**: scatter converts to a **loose vertical stack with slight rotation retained** — cards still feel handmade but become tappable sequentially. No drag on mobile (saves battery + avoids scroll conflict). The top nav pill collapses to a sticky compact bar. Chat bar moves to just below the fold.
- Corner icons on mobile: TL and TR remain in top bar; BL and BR become a small row above the chat input.

---

