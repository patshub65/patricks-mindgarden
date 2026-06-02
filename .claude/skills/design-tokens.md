---
name: design-tokens
description: Auto-invoked background knowledge for the mindgarden design system. Colors, typography, shadows, radii, motion, and spacing conventions. Ensures all generated UI is visually consistent without the user needing to re-explain the system.
model_invocable: true
user_invocable: false
---

# Design Tokens — Mindgarden

Reference these tokens whenever generating UI code. Never introduce new values without adding them to the `@theme` block in `globals.css`.

## Colors

| Token | Value | Use |
|---|---|---|
| `--color-base` | `#F5EFE1` | Page background, warm parchment |
| `--color-surface` | `#FAF4E8` | Slightly lifted panels, nav pill background |
| `--color-surface-raised` | `#FFFFFF` | Cards, overlays, inputs |
| `--color-ink` | `#141814` | Primary text (off-black, never pure `#000`) |
| `--color-ink-muted` | `rgb(20 24 20 / 0.55)` | Secondary text, captions |
| `--color-ink-faint` | `rgb(20 24 20 / 0.12)` | Borders, dividers |
| `--color-ink-hair` | `rgb(20 24 20 / 0.08)` | Hairline borders, subtle separators |
| `--color-moss` | `#4F6B28` | Primary accent — CTAs, focus rings, active states |
| `--color-sage` | `#C5D4A8` | Background blooms, soft accent |
| `--color-coral` | `#F0A488` | Warm highlight, variant cards |
| `--color-butter` | `#F7DFA0` | Warm highlight, variant cards, light-on-dark text |

**Rules:**
- Never use pure `#000000` or `#FFFFFF` for text or backgrounds
- Max one saturated accent in foveal focus at a time
- Stay in the warm palette — no cool greys, no blue-purple gradients
- Reference via `var(--color-*)` in CSS/Tailwind, never inline hex

## Typography

| Role | Font | Token |
|---|---|---|
| Display / headings | Fraunces (variable, optical size + SOFT axes) | `var(--font-display)` |
| Body / UI | Manrope | `var(--font-body)` |
| Mono (code, stamps) | SF Mono / Menlo | `var(--font-mono)` |

**Fraunces usage patterns** (from existing components):
- Large display: `font-size: 108px`, `font-variation-settings: '"opsz" 144, "SOFT" 30'`, `letter-spacing: -0.02em`
- Card labels: `font-size: 14px`, `font-variation-settings: '"opsz" 14, "SOFT" 100'`, `font-style: italic`
- Section titles: `font-size: 20px`, `font-variation-settings: '"opsz" 36, "SOFT" 60'`, `font-style: italic`
- Page headings: `clamp(52px, 7vw, 88px)`, `font-variation-settings: '"opsz" 72, "SOFT" 20'`

**Mono usage** (eyebrows, stamps, dates):
- `font-size: 10-11px`, `letter-spacing: 0.1-0.14em`, `text-transform: uppercase`, `color: var(--color-ink-muted)`

**Banned fonts**: Inter, Roboto, Arial, system-ui as deliberate choices.

Fonts are loaded via `next/font/google` in `app/layout.tsx` — never import fonts elsewhere.

## Shadows

All shadows are warm-tinted (`rgb(76 60 30 / ...)` or `rgb(68 60 40 / ...)`), diffuse, never crisp.

| Token | Use |
|---|---|
| `--shadow-xs` | Subtle lift — active nav items |
| `--shadow-sm` | Resting cards, tiles |
| `--shadow-md` | Hover state, elevated panels |
| `--shadow-lg` | Overlays, peek cards |
| `--shadow-drag` | Active drag state |
| `--shadow-polaroid` | Resting polaroid card (includes inner highlight) |
| `--shadow-polaroid-hover` | Polaroid hover |
| `--shadow-pill` | Nav pill, chat bar |
| `--shadow-corner` | Corner action buttons |

## Radii

| Token | Value | Use |
|---|---|---|
| `--radius-card` | `20px` | Standard card corners |
| `--radius-tile` | `24px` | Larger tiles, cluster grid items |
| `--radius-detail` | `32px` | Peek overlays, detail containers |
| `--radius-thumb` | `14px` | Thumbnail images |
| `--radius-full` | `9999px` | Pills, circles, buttons |

## Motion

**Spring config** (interactive elements):
```ts
{ type: "spring", stiffness: 180, damping: 22 }
```

**Page transitions**: ease `[0.16, 1, 0.3, 1]`, 600-800ms

**Idle card float** (CSS-only in `globals.css`):
- Duration: `7-11s` per card, staggered delays
- Vertical drift: `4px`
- Rotation drift: `±1.2deg`
- Paused on hover, disabled for `prefers-reduced-motion`

**Hover feedback**: `scale(1.03-1.06)`, `translate(0, -2px)`, shadow escalation
**Press feedback**: `scale(0.98)` or `-translate-y-[1px]`
**Entrance stagger**: `40-180ms` between siblings

## Spacing conventions

- Page padding: `48px` horizontal on desktop, `24px` on mobile
- Card gap: `20px` in grids
- Section bottom padding: `80px` desktop, `60px` mobile
- Inner card padding: `8px` (polaroid), `28px` (peek/think tiles), `10-14px` (captions)

## Elevation hierarchy

1. **Page background**: `--color-base` + garden gradient
2. **Surface panels**: `--color-surface` + `--shadow-xs`
3. **Cards/tiles**: `--color-surface-raised` + `--shadow-sm`
4. **Hover/active**: same background + `--shadow-md`
5. **Overlays**: `--color-surface-raised` + `--shadow-lg` + backdrop blur
6. **Drag state**: `--shadow-drag`
