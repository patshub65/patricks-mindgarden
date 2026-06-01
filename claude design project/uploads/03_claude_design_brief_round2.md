# Patrick's Mindgarden — Design Brief 02
_For Claude Design · homepage updates + Playing, Creating, Creating detail, Thinking_

## Context

Homepage mock v1 lands. The scene, typography, palette, corner chrome, and polaroid vernacular are locked — reuse them exactly. This round: two small homepage additions, then four new page mocks.

All tokens (colors, fonts, shadows, radii) from Design Brief 01 unchanged. Viewports: 1440×900 + 375×812.

---

## Part 1 — Homepage updates (two small additions)

### 1a. Download flyout (post-load hint)

~1.2s after page load, the top-right download button emits a small floating label that says **"CV + portfolio"**, which fades in, holds for ~3s, then fades out. Acts as a wayfinding nudge.

- Position: extending to the *left* of the download button, aligned to its vertical center, ~12px gap from the button
- Container: small pill, `surface-raised` with 1px border `rgba(20,24,20,0.12)`, shadow-sm, `rounded-full`, 6×12px padding
- Typography: Manrope 12px, `tracking-[0.02em]`, ink-muted
- Optional: small 1px curved line drawn from pill to button, like a handwritten "→" pointer. Skip if it complicates the mock — the pill alone reads fine
- Motion: translates in from +8px right with fade (400ms), holds ~3s, fades + slides out (300ms). Idle-dismissible if user hovers the pill: click it, it goes to the TLDR page
- Respects `prefers-reduced-motion`: renders statically for 3s then removes

Annotate the motion in the mock margin; render it in the on-state for the desktop view.

### 1b. Peek cards (new interaction on scene cards)

Three of the ten scene cards are **peek cards** — clicking them doesn't navigate, it opens a centered floating expanded card on the same homepage. The other cards navigate as before.

Split:
- **Peek**: Side-quests, Music Video, visuals I made
- **Navigate**: Web Design, things I've coded, UX Design, things I wrote, music I make, DJ sets
- **External**: my old art blog (opens in new tab)

**Visual states to mock** (provide all three for one peek card — recommend "visuals I made"):

1. **Resting** — unchanged from homepage v1 (small polaroid in scene)
2. **Opening** *(annotated transition)* — the clicked card lifts and scales toward the center; other cards dim to 40% opacity and pause their float; background darkens ~8%
3. **Open** — the card is now a **larger polaroid** centered in the viewport:
   - Width: 640px on desktop, ~85vw on mobile. Height: determined by content (~500–640px typical)
   - Same polaroid visual: `rounded-[24px]` (slightly larger radius than scene cards), surface fill, 16px padding around content, label at bottom in Fraunces italic 20px
   - Small close button top-right inside the peek: 32px circle, surface-raised, `×` icon, moss on hover
   - Slight residual rotation: ~1° (subtle — tells the user this is still a scene object, not a modal)
   - Shadow: `--shadow-lg` + slightly warmer
   - Content inside varies per card (see below)

**Peek content specs:**

- **visuals I made**: 3-row masonry of ~9 visual thumbnails (coral/butter/moss/sage color-blocked posters, abstract forms, photography). Hover scales +3%. No click-through on thumbnails in v1.
- **Music Video**: single large video thumbnail with a large play button overlay (dark scrim, play triangle centered, title top-left in small Manrope caps, duration bottom-right). Clicking play would embed the player; in the mock just render the thumbnail state.
- **Side-quests**: a 2×2 grid of tiny experiment tiles, each a little snippet — a color field, a tiny looping SVG animation placeholder, a small piece of ASCII art in the code-terminal style, a rotating shape. Below each: one-line Fraunces italic caption ("3am color study", "pixel weather", etc.).

**Close mechanics** (annotate):
- Close button, or click-outside, or `Escape` key
- Reverses the open animation — card returns to its scene position with a soft settle (spring)
- Other cards restore opacity + resume float
- If the user dragged the card before opening it (future state — not in v1), it returns to the dropped position, not the original

Focus ring on the open peek: moss, offset 3px, visible when tab-focused.

---

## Part 2 — Playing page

_Music, DJ sets, music videos, live sessions. Masonry feel. The cluster where the persistent music player has the most context._

### Layout
- **Corners**: TL home icon, TR download, BL email, BR music player (all persistent)
- **Top-center**: nav pill with **Playing** as the active item (moss-filled background, ink text)
- **No chat input** (homepage only)
- **Content area**: CSS-columns masonry, 3 columns desktop, 2 columns tablet, 1 column mobile. Column gap 24px. Tiles break-inside-avoid

### Tile types (mix freely in the masonry, ~9–12 tiles total)

1. **Mix tile** (tall, ~480×640): waveform background in moss on dark, track title Fraunces 28px, duration + BPM in Manrope 12px caps at top, play button bottom-right (48px coral circle). When playing, waveform has a subtle coral playhead line.
2. **Video tile** (wide, ~480×320): video still with dark scrim, title overlay bottom-left, small duration badge top-right, play button center (40px sage-outlined circle).
3. **Release tile** (square, ~360×360): album art dominant, title + year strip across the bottom in surface-raised with ink text.
4. **Session tile** (portrait, ~300×440): photo of a live set / studio moment, small date caption bottom.
5. **Quote tile** (short, ~360×180): a pull quote about music — Fraunces italic 22px on sage-tinted surface. Breaks up the rhythm.

Mock all five types at least once. Use placeholder colors/shapes in the signature palette (moss, sage, coral, butter, ink) — consistent with homepage thumbnail style.

### Motion annotations
- Page entry: tiles cascade in with 40ms stagger, each translating up 16px + fading in. Spring, 500ms per tile
- Hover: tile lifts 4px, shadow deepens sm→md, 300ms ease-out
- Clicking a mix tile: the tile expands to a *second* peek state showing the player UI in full (same peek mechanic as homepage). Annotate but don't mock it this round.

---

## Part 3 — Creating page

_Case studies and project work. Structured-scatter, not strict grid. The heaviest cluster._

### Layout
- **Corners + nav**: same as Playing, with **Creating** active
- **Content**: 3-column grid with intentional offsets (some tiles hang 30–60px below their row's baseline, creating a scatter-within-structure feel). ~9 project tiles

### Tile spec
- `rounded-[20px]`, surface fill
- Varied aspect ratios mixed within the grid: square (1:1), landscape (4:3), portrait (3:4), wide (16:9)
- **Image area** takes ~75% of the tile
- **Label block** below the image: project title in Fraunces 20px + one-line Manrope 13px meta ("brand identity · 2024")
- Hover: image area scales slightly inside its frame (1.04), entire tile lifts 2px, label fades from muted → full ink

### Example titles to use in the mock
Website Redesign, Branding & Creative Direction, Art Direction, Web Design Project, Art Direction (second), Web Design Project (second), Art Direction (third), Web Design Project (third), Website Redesign (second) — from the wireframe. Use different imagery colors for each so they read as distinct.

---

## Part 4 — Creating detail page (one example case study)

_Long-form case study. Reached by clicking a Creating tile._

### Layout
- **Corners + nav**: same, but TL is a **back arrow** not home icon. Creating still highlighted in the nav pill
- **Container**: centered, `max-w-[960px]`, `rounded-[32px]` surface panel, shadow-md, 48px inner padding
- **Image block at top**: 2×2 grid of project images. Top-left square, top-right wide, bottom-left square, bottom-right wide. Radii 16px. Gap 12px
- **Title**: Fraunces 40px, centered below the image grid, 32px top margin. "Art Direction Project" in the wireframe example
- **Body**: Manrope 15px / 1.65 leading, `max-w-[640px]` centered, 24px top margin from title. Multiple paragraphs. First paragraph slightly larger (17px) as a lede

### Use this body copy in the mock (from the wireframe):
> _As co-founder and design lead at Loominate, I developed the complete brand identity and website for a joint venture between two Web3 companies targeting developers building decentralized products._
>
> _I conducted UX research interviews with lead developers to uncover insights about brand personality and recruitment goals, revealing an opportunity to position the venture as passionate rebels championing decentralization._

### Motion annotations
- Page entry: the clicked tile from Creating expands via `layoutId` into the top-left position of the 2×2 image grid. The rest of the grid staggers in (80ms) with fade+translate. Title fades in. Body paragraphs stagger (60ms) after title lands
- Total entry duration: ~900ms
- Scroll: gentle parallax on the image grid (~-12px translateY at max scroll). Body stays static

---

## Part 5 — Thinking page

_Writing, essays, bookmarks, embedded-post cards. Quieter page, more reading-oriented._

### Layout
- **Corners + nav**: same, **Thinking** active
- **Content**: 3-column equal grid (not masonry — stable rhythm suits reading)
- ~6 tiles visible above the fold, more below

### Tile spec — "post card"
- `rounded-[16px]`, surface fill, 1px border `rgba(20,24,20,0.08)`, shadow-xs
- **Image at top**: 16:9, `rounded-[12px]` (nested radius), sage/moss/coral ambient color blocks as placeholder imagery. Could also be an essay cover in plain moss with the title typeset in Fraunces
- **Body** (below image, 20px padding):
  - Small meta strip: Manrope 11px caps, tracking-wide, muted ink: "ESSAY · 4 MIN" or "LINKEDIN · MAY 2026"
  - Title: Fraunces 18px, 1.3 leading, 2–3 lines max
  - Excerpt: Manrope 13px, ink-muted, 3 lines max with fade-out on the third line
  - Hover: subtle lift (3px), shadow xs→sm, image scales 1.02 inside its frame

### Tile variants to mock
- 2 essay tiles (image = moss or coral color block with the title typeset large)
- 2 linkedin-post-style tiles (image = a photo or diagram, meta reads "LINKEDIN")
- 1 bookmark tile (smaller, just a link icon + source name + title + short excerpt, no image)
- 1 quote tile (pull quote in Fraunces italic, sage background, no image) — provides visual rhythm

### Motion annotations
- Page entry: tiles stagger in 50ms per column (not per tile), waterfall reveal left-to-right
- Inter-cluster transition: cascading out + cascading in (800ms total), feels like a card shuffle

---

## Shared — page transitions (annotate once, applies to all cluster pages)

Clicking a different cluster in the nav pill:
1. The pill's active-item background slides via `layoutId="nav-pill-indicator"` (450ms spring)
2. Current page's tiles cascade out — translate down 20px + fade, 30ms stagger
3. New page's tiles cascade in — translate up from 20px + fade, 40ms stagger, 150ms offset after old page starts leaving
4. Ease: `cubic-bezier(0.16, 1, 0.3, 1)` on translate + fade, spring on pill

Back to home from any cluster: scatter "un-cascades" — tiles fly toward their home positions (if they have a `layoutId` match) or fade out. Home scene reassembles with its idle float.

---

## What to deliver

Five mock pages, in priority order:

1. **Homepage v1.1** — same as v1 plus the download flyout showing in the on-state, plus one peek card shown in its open state (recommend "visuals I made"). *Include all three peek states on one artboard side-by-side if it fits.*
2. **Playing** page, fully populated with the five tile types
3. **Creating** page, structured-scatter grid
4. **Creating detail** — the "Art Direction Project" example
5. **Thinking** page, with the 6 tile variants

Each page: desktop (1440×900) + mobile (375×812). Light mode only. Annotate motion in the margin.

---

## Do not

- Introduce any new font or color outside the locked tokens
- Add scroll-based WebGL or custom cursors
- Add dark mode toggle — still deferred to v2
- Add secondary navigation (breadcrumbs, sub-tabs) — the three clusters + nav pill are the IA
- Use real brand logos (LinkedIn, Bandcamp, etc.) in the mocks — stylized labels only, in the palette
- Add real human faces or photo-realistic imagery — placeholder color blocks and shapes in the signature palette, same spirit as the homepage v1 thumbnails
- Reposition the corner chrome — the four corners are locked
