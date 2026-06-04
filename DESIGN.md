---
name: Patrick's Mindgarden
description: A warm, draggable garden of polaroid memories — a portfolio you wander, not a page you read.
colors:
  base: "#F5EFE1"
  surface: "#FAF4E8"
  surface-raised: "#FFFFFF"
  ink: "#141814"
  ink-muted: "#1418148C"
  ink-faint: "#1418141F"
  ink-hair: "#14181414"
  moss: "#4F6B28"
  sage: "#C5D4A8"
  coral: "#F0A488"
  butter: "#F7DFA0"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(52px, 7vw, 88px)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 72, 'SOFT' 20"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
    fontVariation: "'opsz' 14, 'SOFT' 100"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  thumb: "14px"
  card: "20px"
  tile: "24px"
  detail: "32px"
  polaroid: "4px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "28px"
components:
  button-send:
    backgroundColor: "{colors.moss}"
    textColor: "{colors.surface-raised}"
    rounded: "{rounded.full}"
    size: "34px"
  button-corner:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "44px"
  nav-pill-item:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    typography: "{typography.body}"
    padding: "6px 14px"
  nav-pill-item-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    typography: "{typography.body}"
    padding: "6px 14px"
  card-polaroid:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.polaroid}"
    padding: "8px 8px 32px"
  card-peek:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.detail}"
    padding: "28px"
  input-chatbar:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    typography: "{typography.body}"
    padding: "8px 8px 8px 22px"
---

# Design System: Patrick's Mindgarden

## 1. Overview

**Creative North Star: "The Mindgarden"**

A living garden you wander through, not a page you read. Polaroid cards drift in warm late-afternoon light, bloom outward from center on first arrival, float gently at rest, and can be picked up and tossed around. The whole surface breathes: a soft radial wash from cream center to sage edge, blurred organic color blooms in the corners, and a faint multiply grain so nothing ever looks flat or screen-born. The feeling is a real, sun-warmed place tended by one person, where the visitor is a guest invited to rummage, not a lead being funneled.

The personality is warm and human first, with confident craft underneath and a playful, springy streak in every interaction. Things respond, spring, drift, and bloom; depth is something you feel through soft brown-warm shadows, not something painted on with hard lines. The medium is the proof: the draggable scatter, the working motion, and the tactility *are* the case study for a designer who codes. Restraint here would be a mistake; the imperfection and liveliness are the entire point.

This system explicitly rejects the corporate-agency showreel (cinematic scroll hijacking, full-bleed video spectacle), the editorial-magazine portfolio (giant display-serif slab + tracked uppercase eyebrows + broadsheet grid + monochrome restraint), the SaaS landing page (feature grids, hero-metric templates, CTA stacks), and cold "techie" cosplay (monospace-everything, terminal/dark-mode-because-coding). It is a garden, a desk, a scrapbook — never a dashboard.

**Key Characteristics:**
- Warm cream-to-sage garden surface, never a flat white screen
- Polaroid cards as the primary object: paper, soft shadow, slight rotation, draggable
- Springy, living motion — bloom, float, drift, spring-back — over static states
- Moss green as the single anchor accent in a soft naturalistic palette
- Fraunces italic for voice; Manrope for plain-spoken body; mono only for tiny labels
- Tactile depth via warm diffuse shadows; hard crisp shadows are forbidden

## 2. Colors

A soft naturalistic garden palette: warm cream surfaces, a deep moss accent, and a handful of botanical warm tones (sage, coral, butter) used as seasoning. Warmth lives in the surface and the shadows, not in oversaturation.

### Primary
- **Moss** (`#4F6B28`): The single anchor accent. The "P" mark circle, the chat send button, focus rings, active states, and any moment that needs commitment. Deep, earthy, confident. It carries the brand's voice; use it sparingly and it stays loud.

### Secondary
- **Sage** (`#C5D4A8`): The soft green the garden surface fades toward at its edges, plus the corner blooms. The atmospheric counterpart to moss — the air around the plant, not the plant.
- **Coral** (`#F0A488`): Warm peach seasoning for thumbnails and accents. A blush of human warmth.
- **Butter** (`#F7DFA0`): Soft golden seasoning — the late-afternoon light, used in corner blooms and warm thumbnail accents.

### Neutral
- **Base / Garden Cream** (`#F5EFE1`): The body background and the warm center of the radial garden wash. The whole page sits on this.
- **Surface** (`#FAF4E8`): A lighter warm tone for resting raised elements (active nav pill, peek close button).
- **Surface Raised** (`#FFFFFF`): True white, reserved for objects that lift off the garden — polaroids, pills, chat bar, corner buttons, peek cards. White = "this is a thing on top of the garden."
- **Ink** (`#141814`): Near-black with a faint green undertone. All primary text and icons.
- **Ink Muted** (`#141814` @ 55%): Secondary text, placeholders, captions. A transparency of ink, never a separate gray.
- **Ink Faint** (`#141814` @ 12%) / **Ink Hair** (`#141814` @ 8%): Hairline borders and dividers only.

### Named Rules
**The Warm-Surface Rule.** The page is never a flat white screen. Content sits on the cream garden wash (`#F5EFE1` → sage), and white (`#FFFFFF`) is reserved exclusively for objects that lift off it. If a large flat white panel fills the viewport, the garden has been paved over — stop.

**The One-Green-Voice Rule.** Moss (`#4F6B28`) is the only saturated accent that carries meaning. It appears on a small fraction of any screen. Sage, coral, and butter are atmospheric seasoning, never primary calls-to-action. Their rarity and softness is the point.

**The Transparency-Not-Gray Rule.** Muted text is a transparency of ink (`#141814` @ 55%), never a separately picked gray. Grays go muddy on the warm surface; ink-on-cream at reduced opacity stays in the same temperature.

## 3. Typography

**Display Font:** Fraunces (variable: `opsz`, `SOFT`, `WONK` axes), with Georgia / serif fallback
**Body Font:** Manrope, with system-ui / sans-serif fallback
**Label/Mono Font:** `ui-monospace, 'SF Mono', Menlo` — tiny labels only

**Character:** Fraunces in italic is the handwriting of the garden — soft, optical, a little wonky, full of personality. Manrope is the plain, friendly speaking voice that keeps everything readable and unfussy. The contrast between an expressive italic serif and a clean humanist sans is the whole hierarchy; weight and style do the work, not a dozen sizes. (Fraunces is a deliberate, shipped identity choice here, not a default — it carries the warmth the brand is built on.)

### Hierarchy
- **Display** (Fraunces italic, `opsz 72 / SOFT 20`, `clamp(52px, 7vw, 88px)`, line-height 1.0, `-0.02em`): Page and detail headlines. Italic, balanced wrapping. The voice at full volume.
- **Title / Peek Label** (Fraunces italic, `opsz 14 / SOFT 100`, ~20px): Card peek labels and section titles. The same handwriting, quieter and softer.
- **Body** (Manrope, 400, 15px, line-height 1.5): All prose, bio, project copy. Cap measure at 65–75ch on detail pages.
- **Label / Eyebrow** (mono, 11px, `0.14em` tracking, uppercase): Reserved for the rare structural label (detail-page eyebrow). Used sparingly — this is the one place uppercase tracking is allowed, and it must not metastasize onto every section.

### Named Rules
**The Italic-Voice Rule.** Display and title type is Fraunces *italic*, not roman. The slant is the personality; an upright Fraunces headline reads as a different, colder brand.

**The Eyebrow-Restraint Rule.** The tiny tracked mono uppercase label is permitted only as an occasional structural marker (e.g. one detail-page eyebrow). Never stack one above every section — that is the AI-scaffold tell PRODUCT.md rejects.

## 4. Elevation

Depth is warm, soft, and tactile — every shadow is tinted brown-warm (`rgb(76 60 30)` / `rgb(68 60 40)`), never neutral-gray and never crisp. Objects feel like real paper resting on a sunlit surface, casting diffuse afternoon shadows. Elevation is also alive: shadows deepen on hover and balloon dramatically while dragging, so lifting a card off the garden feels physical and springy.

### Shadow Vocabulary
- **xs / sm / md / lg** (`--shadow-xs` … `--shadow-lg`): The ambient ramp for raised UI (pills, peek cards). Warm, diffuse, increasing spread.
- **Polaroid** (`--shadow-polaroid`): The signature — a white inset top highlight plus two stacked warm drop shadows. Makes a card read as glossy paper lying on the desk.
- **Polaroid Hover** (`--shadow-polaroid-hover`): Deeper, lifted version on hover. The card rises toward you.
- **Drag** (`--shadow-drag`, `0 32px 64px -16px rgb(76 60 30 / 0.22)`): The dramatic lift while a card is grabbed. Big, soft, high — it's floating now.
- **Pill / Corner** (`--shadow-pill`, `--shadow-corner`): White inset highlight + soft warm drop for floating chrome (nav pill, chat bar, corner buttons).

### Named Rules
**The Warm-Diffuse Rule.** Every shadow is brown-warm and soft-blurred. Crisp, dark, neutral-gray shadows are forbidden — they make the garden look like a 2014 Material card. If the shadow has a hard edge or a cool/gray cast, it's wrong.

**The Lift-Is-Alive Rule.** Elevation responds to interaction: rest → hover → drag escalates the shadow each step. Static, equal shadows at all states make the scene feel dead; the spring between them is the craft.

## 5. Components

### Buttons
- **Shape:** Fully round (`9999px`). Buttons are pills and circles, never sharp rectangles.
- **Send button** (chat): 34px moss (`#4F6B28`) circle, white icon, scales to 1.05 on hover. The one place the accent goes solid.
- **Corner buttons** (CV / contact / music): 44px white (`#FFFFFF`) circle, ink icon, warm corner shadow; lifts to `--shadow-md` and scales 1.06 on hover.
- **Hover / Focus:** Springy scale-up plus shadow deepen. Focus-visible draws a 2px moss outline at 3px offset.

### Cards / Containers
- **Polaroid card** (signature): White paper, `8px 8px 32px` padding (the fat bottom lip of a real polaroid), `4px` radius, polaroid shadow, square thumbnail inside at `2px` radius. Slight rotation at rest, gentle idle float, `cursor: grab` → `grabbing`. The core object of the whole site.
- **Peek card** (overlay): White, `32px` (detail) radius, `--shadow-lg`, generous `28px` padding, `min(560px, 100%)` wide, scrolls internally. Floats over a blurred dark scrim (`rgb(20 24 20 / 0.4)` + 4px backdrop blur).
- **Shadow Strategy:** Per Elevation — polaroid shadow for cards, lg for peeks. Never flat.
- **Border:** None on raised cards; hairlines (`ink-hair`) only where a divider is genuinely needed.

### Inputs / Fields
- **Chat bar:** A white rounded pill (`8px 8px 8px 22px` padding), borderless transparent input, Manrope 15px, muted-ink placeholder, moss send button on the right. The input is the hero interaction, not a buried form field.
- **Focus:** The whole pill reads as focused via its placeholder/cursor; keep it calm, no harsh border glow.

### Navigation
- **Nav pill / corner nav:** Floating white pill of text items (Manrope 13px, 500). Default muted ink → hover full ink on a faint warm tint → active full ink on surface with `xs` shadow. The homepage scatter is itself the primary navigation; chrome stays in the corners and recedes.

### Signature Component: The Polaroid Scatter
The defining pattern. Cards bloom from center outward on first load (skipped on repeat visits and for reduced-motion), settle into a hand-placed scatter with varied rotations, float idly via CSS keyframes (paused on hover), and are draggable with a dramatic shadow lift. This is the navigation, the content index, and the proof-of-craft all at once. Treat it as the heart of the system; everything else is in service of it.

## 6. Do's and Don'ts

### Do:
- **Do** keep content on the warm garden surface (`#F5EFE1`); reserve pure white (`#FFFFFF`) for objects that lift off it.
- **Do** use moss (`#4F6B28`) as the single meaningful accent, on a small fraction of any screen.
- **Do** set display and title type in Fraunces *italic* with the `opsz`/`SOFT` axes; let weight and slant carry hierarchy.
- **Do** make depth warm, soft, and diffuse (`rgb(76 60 30)` / `rgb(68 60 40)` tints), and escalate it across rest → hover → drag.
- **Do** give interactions a springy, living response — bloom, float, drift, spring-back.
- **Do** honor `prefers-reduced-motion` with calm/instant fallbacks for bloom, float, and peek transitions.
- **Do** treat muted text as a transparency of ink (`#141814` @ 55%), and verify body/placeholder text clears WCAG AA (≥4.5:1) on the cream surface.

### Don't:
- **Don't** pave the garden with a large flat white panel filling the viewport; the cream wash must show through.
- **Don't** build the corporate-agency showreel — no cinematic scroll-hijack, no full-bleed video spectacle.
- **Don't** default to the editorial-magazine lane: no giant roman display-serif slab + tracked uppercase eyebrow above every section + broadsheet grid + monochrome restraint.
- **Don't** introduce SaaS landing-page clichés — feature grids, hero-metric templates, testimonial carousels, stacked CTA heroes.
- **Don't** dress it in cold "techie" costume — no monospace-everything, terminal tropes, or dark-mode-because-it-looks-coding.
- **Don't** use crisp, dark, or neutral-gray shadows; warm and diffuse only.
- **Don't** stack tiny uppercase tracked eyebrows as section grammar; one occasional structural label is the ceiling.
- **Don't** pick a separate gray for muted text; it goes muddy against the warm surface.
- **Don't** set headlines in upright Fraunces; the italic slant is the brand voice.
