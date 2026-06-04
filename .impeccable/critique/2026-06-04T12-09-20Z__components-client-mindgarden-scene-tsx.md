---
target: homepage
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-06-04T12-09-20Z
slug: components-client-mindgarden-scene-tsx
---
# Critique — Homepage (mindgarden scene)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good: hover/drag/peek feedback, chat typing dots. No focus state on cards themselves. |
| 2 | Match System / Real World | 4 | Polaroid + garden metaphor is coherent and human. Plain-language labels. |
| 3 | User Control and Freedom | 3 | Peek has Escape + scrim-close + role=dialog. No focus trap; no "reset scatter" after flinging cards off. |
| 4 | Consistency and Standards | 2 | Nine thumbnails use inconsistent visual languages and an off-palette slate blue (#3a4a6e). Two unrelated layout systems (scaled 1440 canvas vs hand-placed mobile). |
| 5 | Error Prevention | 3 | Send disabled on empty input. Little error surface. |
| 6 | Recognition Rather Than Recall | 3 | Cards are visible nav with labels. But only the small label opens the peek; the obvious target (thumbnail) just drags. |
| 7 | Flexibility and Efficiency | 2 | Labels are tabbable buttons, but tab order follows array order (jumps around screen). No shortcuts; dragging is pointer-only. |
| 8 | Aesthetic and Minimalist Design | 3 | Charming and uncluttered, but the low-chroma sage gradient + mostly dark/green card deck undercut the intended warmth. |
| 9 | Error Recovery | 3 | Chat failure shows plain-language retry message. |
| 10 | Help and Documentation | 2 | Chat is the implicit help, but nothing signals that cards drag or that the label opens content. |
| **Total** | | **28/40** | **Good (low end) — strong concept, held back by responsivity, palette balance, consistency** |

## Anti-Patterns Verdict

**Does it look AI-generated? No — and that's the win.** The draggable polaroid scatter, the velocity tilt, the deck-deal entrance, and the garden metaphor are genuinely distinctive. Nobody mistakes this for a SaaS template. The slop risk here is the inverse of the usual: not generic, but visually *muddy* — the warm-sunny promise of the brand isn't delivered by the actual surface colors.

**Deterministic scan:** `detect.mjs` returned clean (exit 0) across the four homepage components. Weak signal: the scanner reads markup/CSS, and this UI is inline-styled React, so absence of findings isn't a clean bill. The design-review findings below carry the weight.

## Overall Impression

The bones are excellent and the motion is already where it should be. The thing holding the homepage back is that it's built as **two fixed posters** (a 1440×800 desktop canvas and a hand-placed mobile stack) rather than a responsive scene, and the **color story on the surface is drabber than the brand wants** — a low-chroma putty-green gradient under a deck of mostly dark and green tiles. The single biggest opportunity: rebalance the palette toward the warm "late-afternoon garden" the brand promises, and make the scene survive the tablet range and real phone sizes.

## Priority Issues

### [P1] The tablet/laptop range is a dead zone
The scene splits at exactly 768px. Below that: a hand-placed mobile stack. Above: a fixed 1440×800 canvas uniformly scaled by `Math.min(sx, sy, 1.1)`. From ~768–1150px the canvas scales to 0.55–0.8, so a 170px card shrinks to ~95–135px and its 14px label scales to ~8–11px — cramped and barely readable, floating in a letterboxed band with dead margins. On short windows (e.g. 1440×620) the whole scene shrinks rather than reflowing. The wordmark, which lives *outside* the scaled canvas, stays full size — so the size relationship between the central "Patrick" and the surrounding cards drifts with every viewport, risking overlap near center.
**Fix:** Treat the mid-range as a first-class layout, not a shrink. Either scale the wordmark with the canvas (same transform group) so proportions hold, or define a third breakpoint that re-positions cards for ~768–1180px instead of scaling them into illegibility. Cap minimum effective card size so labels never drop below ~12px.

### [P1] Mobile layout is magic-number placement that won't hold across devices
Mobile cards are absolutely positioned with hardcoded x/y (some x up to 280, y up to 710) inside a `minHeight:100dvh` relative container. Absolute children don't extend that container, so cards below the fold (y 600–820) can clip, and x≈280 + 105px width overflows a 360px phone. The centered "Patrick" wordmark sits at ~50% height, directly over several placed cards (e.g. visuals at y60, music at y450). It's tuned for one canvas size; on a 320-wide SE or a 430-wide Pro Max it will overlap and clip differently.
**Fix:** Replace absolute magic numbers with a flow layout that adapts — a loose flex/grid "scattered" arrangement with rotation and small offsets, or compute positions from viewport size. Ensure the container actually contains the cards (no clipped overflow) and the wordmark never overlaps a card.

### [P1] The palette reads flat and dull-green — the warmth is buried
The garden gradient runs cream → **sage (#C5D4A8)**, a low-chroma putty-green close in lightness to the cream, so the wash barely has shape and the only ambient color is a muted grey-green "fog." The genuinely warm tokens (coral, butter) appear *only* as tiny thumbnail accents, never at scene scale, so nothing counters the green. Worse, the card deck itself leans heavy: of nine thumbnails, ~four are green (writing #7a9a5c, music moss, video green-gradient) and four are dark (product #1b1f1a, brand #2a1f14, dj #141814, ux-ui #3a4a6e) — only **two** are warm-bright (visuals butter, web cream). So the warm-sunny garden bg ends up carrying a patchwork of dark/green tiles: heavy and drab, not late-afternoon.
**Fix:** (1) Warm the gradient — bias one edge toward butter/coral with real chroma so "afternoon light" actually shows; add a second warm bloom that isn't near-white. (2) Either lift sage's chroma/shift it livelier, or shrink its area to a rim instead of a full-field fog. (3) Rebalance the card backgrounds so the deck isn't majority dark+green — give 2–3 more cards warm cream/butter/coral grounds.

### [P2] Off-palette slate blue in the UX/UI thumbnail
`ThumbUXUI` uses `#3a4a6e` — a slate blue that exists in no design token and belongs to no part of the palette. Among a warm/green deck it reads as a mistake, not a deliberate accent.
**Fix:** Recolor to something in-system (a deep moss, an ink-charcoal, or a warm aubergine that the palette can adopt as a token). If a "cool" tile is wanted for contrast, add it to `@theme` as a named token so it's intentional.

### [P2] Thumbnails are illegible at display size; peek trigger is the wrong target
The mini-scenes carry real detail (7.5px terminal code, 6.5px "IDENTITY", 32-bar waveform) that dissolves into texture at ~120–150px, and smaller still when the canvas scales down. The craft is mostly invisible at the size it actually renders. Separately, the *thumbnail* (the big obvious target) only drags; the *small label* is the click target that opens the peek — so a first-timer's instinct (click the picture) does nothing.
**Fix:** Simplify thumbnails to one bold, high-contrast motif each that reads at 120px and is distinguishable across the deck. Make the whole card open the peek on a click that isn't a drag (you already track `hasDragged`), so the obvious target works.

## Persona Red Flags

**Casey (Distracted Mobile User):** Cards can overflow/clip on small phones; the wordmark overlaps placed cards; hand-placed positions mean the experience differs unpredictably by device. Primary "explore" action (drag) is undiscoverable with no hint. State (scattered positions) resets on every load.

**Jordan (First-Timer):** Nothing signals the cards are draggable or that they open content. Clicking the thumbnail (the obvious move) does nothing — only the small italic label opens the peek. May not realize the scene is interactive at all beyond the chat bar.

**Sam (Accessibility):** Card labels are tabbable buttons (good) and peek has Escape + role=dialog, but tab order follows array order, not visual order, so focus jumps around the screen. No focus trap inside the peek. Muted subtitle (ink @ 55%) at 11.5–13px needs a contrast check on cream — likely borderline AA.

## Minor Observations
- Two type sizes do almost all the work: a 108px wordmark and a cluster of 13–14px (subtitle, labels, chat). The missing mid-tier makes the type feel flat alongside the giant wordmark.
- Long labels ("Written Things", "Product Building") ellipsis-truncate on smaller scaled cards.
- `resize` listener is unthrottled (fine functionally; fires a lot).
- Subtitle and chat both sit bottom-center; on short viewports they can crowd the lowest cards.

## Questions to Consider
- What would the scene look like if the warm accents (coral/butter) lived in the *atmosphere*, not just inside the thumbnails?
- Could the mid-range (tablet) be a deliberately different scatter rather than a shrunk desktop?
- If a visitor never drags a card, did they get the point? What's the one-glance cue that this is a place to touch?
