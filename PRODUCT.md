# Product

## Register

brand

## Users

Hiring managers, design leads, and recruiters at product companies in Berlin and remote-EU, evaluating Patrick Caire for Product Designer / UX-UI roles. They arrive from a LinkedIn link, a CV, or a referral, usually skimming many candidates in one sitting, often on a laptop between meetings.

Their job to be done: decide quickly whether this person is worth a conversation. They want proof of taste, range (UX, web, brand), and the rarer signal that he can actually build. The site has to reward a 30-second skim and also a 10-minute deep dive, because the same person may do both.

Secondary visitors: peers, collaborators, and the curious from Patrick's music/DJ side. They explore for fun more than for hiring.

## Product Purpose

A single-page portfolio built as a "mindgarden": an exploded scatter of draggable polaroid cards on a warm garden surface, each opening a peek overlay, with design projects linking through to detail pages. A functional Claude-powered chat bar answers questions about Patrick and routes contact requests.

It exists as a job-search artifact with a thesis: Patrick is a designer with a technical, AI-native edge. The medium proves the message — the site itself is a designed, coded, interactive object, not a template.

Success looks like: a hiring manager remembers it ("the one with the draggable cards"), believes the designer-who-codes claim because they just experienced it, and reaches out. It must ship fast, look unmistakably hand-made, and work flawlessly.

## Brand Personality

Warm and human first, with confident craft and a playful, curious streak. Three physical-object words: a **well-loved desk** (scattered polaroids, things you can pick up and move), a **handwritten note** (personal, a little imperfect, clearly one person's voice), a **garden in late afternoon** (warm light, soft and alive, unhurried).

Voice: first-person, honest, specific, lightly witty. Never corporate, never breathless. Patrick talks like a person who finds the work genuinely interesting, not a brand selling itself. The confidence shows through craft and restraint, not through superlatives.

Emotional goal, weighted: ~40% "there's a real, likeable person here," ~30% "this person clearly has taste and knows what they're doing," ~30% "this is delightful, let me keep poking at it."

## Anti-references

- **Not a corporate/agency portfolio.** No cinematic scroll choreography, full-bleed video heroes, or awwwards-bait spectacle. The craft is intimate and tactile, not a showreel.
- **Not an editorial-magazine portfolio.** Avoid the saturated lane of giant display-serif headlines + tracked uppercase eyebrows + broadsheet grid + monochrome restraint. This is a garden, not a magazine spread.
- **Not a SaaS landing page.** No feature grids, testimonial carousels, stacked CTA heroes, hero-metric templates, or generic marketing scaffolding. Explicitly: not a blog, not a SaaS site, not a landing page.
- **Not a sterile minimalist grid.** Identical card grids and safe centered whitespace would erase the personality. The scatter is intentional; the imperfection is the point.
- **Not cold "techie" costume.** Even though the thesis is technical, avoid monospace-everything, terminal/matrix tropes, or dark-mode-because-it-looks-coding. The technical edge shows through what the site *does*, not through developer cosplay.

## Design Principles

1. **The medium is the proof.** Every interaction should quietly demonstrate the "designer who codes" thesis. Show, don't tell — the draggable scene, the working chat, the motion craft *are* the case study.
2. **A scene to explore, not a page to read.** Reward curiosity. Things move, can be picked up, reveal more on a peek. The visitor is a guest wandering a garden, not a lead being funneled.
3. **Handmade over polished.** Warmth, slight imperfection, and tactility beat clinical perfection. The scatter, the float, the grain, the warm light — these are deliberate signs of a human hand.
4. **One person's voice.** First-person, specific, honest copy throughout. No corporate distance, no buzzwords. If a sentence could appear on any portfolio, rewrite it.
5. **Fast skim, deep dive — both.** Respect the 30-second visitor and the 10-minute one. Surface enough at a glance to intrigue; let detail pages and the chat reward the ones who lean in.

## Accessibility & Inclusion

Best-effort, ship-fast posture — care about it, but it does not gate the launch. Honor the non-negotiables that come almost for free:

- `prefers-reduced-motion`: the intro bloom, idle card float, and peek transitions must have calm/instant fallbacks (already partly in place).
- Body and placeholder text must clear WCAG AA contrast (≥4.5:1) against the warm surface; the muted-ink-on-cream combination is the risk to watch.
- Peek overlays should trap focus, close on Escape, and be dismissible without a mouse.
- Provide meaningful labels/alt text on cards, thumbnails, and corner-nav controls so the experience is legible to assistive tech even though dragging is pointer-first.

Full keyboard parity for the draggable scatter is explicitly out of scope for v1; fix obvious issues and move on.
