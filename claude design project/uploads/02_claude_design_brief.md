# Patrick's Mindgarden — Hifi Mockup Brief
_For Claude Design · first pass: homepage only_

## What you're designing

A portfolio homepage that is **an exploded scatter of a designer's mind** — ten polaroid-style cards floating in loose arrangement, each a link to a cluster or external node. Not a hero-with-support-cards layout. The cards ARE the hero.

Brand is Patrick Caire — Berlin-based designer, developer, and music maker. The overarching metaphor is "mindgarden": each card is a plant, the page is the garden seen from above.

## Locked tokens

### Palette (warm editorial — derived from reference `image_49.png`)
```
--base:            #F5EFE1   /* warm parchment/linen */
--surface:         #FAF4E8   /* card background */
--surface-raised:  #FFFFFF   /* elevated hover */
--ink:             #141814   /* olive-tinted near-black */
--ink-muted:       rgba(20,24,20,0.55)
--moss:            #4F6B28   /* primary brand accent, used sparingly */
--sage:            #C5D4A8   /* ambient soft green */
--coral:           #F0A488   /* micro-highlight only */
--butter:          #F7DFA0   /* occasional warm highlight */
```

Background is a subtle radial: `--base` at center easing to `--sage` at edges. Never flat.

### Typography (locked — do not substitute)
- **Fraunces** (variable, `opsz` and `SOFT` axes engaged) — all display, headlines, card labels, italic accents
- **Manrope** (variable) — all body, UI, captions, placeholders

Wordmark "Patrick" is Fraunces 96–120px, regular, with `opsz: 144` for the display-tuned variant. Italic is used for single-word inline accents ("mindgarden") inside Manrope sentences.

### Component vernacular
Match the softness of the reference `creative_portfolio_redesign_v1.png`: warm diffuse shadows (not crisp), cards with `rounded-[20px]`, pill-shaped nav with a soft white active-state, 1px borders at ~12% ink opacity. Everything feels translucent and hand-placed, not digital-sharp.

## Layout — homepage

### Four corners (quick nav)

| Position | Content | Notes |
|---|---|---|
| Top-left | *nothing* (hidden on home) | Home icon only appears on non-home pages |
| Top-right | Download icon, 48px circle | Leads to CV/portfolio TLDR page |
| Bottom-right | Music player, 48px collapsed pill | Expands to ~320px with track + controls |
| Bottom-left | Email / contact icon, 48px circle | Hover reveals tooltip "get in touch" |

### Top-center
Nav pill: **Playing · Creating · Thinking** (Fraunces, ~22px). No active state on home (all three inactive-styled). Pill container: `rounded-full`, white-translucent with backdrop-blur, 1px border, shadow-sm.

### Center scene (the mindgarden)
Ten polaroid-style cards scattered in a loose radial around a center text block. Cards rotate between -8° and +8°. They **do not** align to a grid. The center of the scene is occupied by:

- "**Patrick**" — Fraunces 96–120px, centered
- One Manrope paragraph (~380px wide): *"hello there! I'm a designer, creative developer and music nerd bridging craft and code in Berlin."*
- A second line: *"Welcome to my mindgarden — click around. Drag the cards if you like."* — *mindgarden* in Fraunces italic.

The ten cards (see wireframe `Homepage.png` for rough positions):

| # | Label (curved along bottom edge) | Card content |
|---|---|---|
| 1 | Web Design | web project thumbnail |
| 2 | things I've coded | code-art or terminal-style preview |
| 3 | Side-quests | collage of mini-projects |
| 4 | my old art blog | vintage photography thumbnail |
| 5 | things I wrote | document/notes preview |
| 6 | music I make | album art placeholder |
| 7 | DJ sets | waveform/turntable |
| 8 | Music Video | video still |
| 9 | visuals I made | poster/art direction sample |
| 10 | UX Design | wireframe/flow preview |

**Card structure:** `rounded-[20px]`, surface fill, 12px padding. Inside: square image area with 14px radius and 1px inner border. Label on a curved SVG path along the bottom edge, Fraunces italic 14–16px.

### Bottom chat bar
Pill-shaped input, ~640px wide, centered horizontally, ~64px above bottom edge. Placeholder: "What would you like to know?" Send button right-side, 36px, coral-filled circle with arrow.

## Motion (for your mock annotations — not animated in the image, but describe it)

Cards **float idly** (±4px Y, ±1° rotation, 6–10s cycles, staggered). Cards are **draggable** — hover → scale 1.03 + settles upright; drag → scale 1.05 + deeper shadow; drop → stays where placed. Tap (no drag) → navigates. Cursor parallax: all cards drift ±3px with mouse.

Corner icons have **magnetic pull** (±6px toward cursor). Nav-pill switching uses `layoutId` sliding animation (450ms spring).

## What to deliver

**Mock 1 — homepage as described above.** Static mockup (no motion baked in — annotate motion in margin). 1440×900 and 375×812 viewports. Light mode only (dark is deferred to v2).

Once this lands, we'll spec the three cluster pages (Playing, Creating, Thinking — wireframes attached) and one detail page as mock batches 2 and 3.

## Reference images (in the project)

- `Homepage.png` — wireframe for the scattered scene (primary structural reference)
- `creative_portfolio_redesign_v1.png` — UI vernacular: card softness, shadow character, pill nav treatment
- `image_49.png` — palette source + general warmth/mood

## Do not

- Use Inter, Geist, or any substitute font. Locked on Fraunces + Manrope.
- Add emoji anywhere in the UI or copy.
- Use pure black (`#000`) or pure white backgrounds.
- Use neon, gradient CTAs, or any "SaaS premium" gloss.
- Add dark-mode toggle visible in v1.
- Add scroll sections below the fold — the homepage is one viewport.
- Add a sticky header. The four-corner layout IS the chrome.
