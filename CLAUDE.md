# CLAUDE.md

Operating guide for Claude Code working in this repo. Companion to `SKILL.md` (aesthetic + engineering stance) and `01_technical_brief.md` (full spec).

## Project

Patrick Caire's portfolio — Berlin-based designer/developer. Concept: "mindgarden." Homepage is an exploded scatter of draggable polaroid cards; three clusters (Playing / Creating / Thinking) organize deeper content.

**Not a blog. Not a SaaS site. Not a landing page.** It's a scene you explore.

## Stack

- **Next.js 15** (App Router, RSC default)
- **Tailwind v4** (`@theme` block for tokens; no legacy `tailwind.config.js`)
- **Framer Motion v11** — primary motion library
- **MDX** — content in `/content/{cluster}/{slug}.mdx`
- **`next/font/google`** — Fraunces + Manrope
- **`@phosphor-icons/react`** — icons, strokeWidth 1.5 globally
- **Vercel** deploy

**No GSAP in v1.** Framer Motion covers everything we need. Add only if a specific scroll effect demands it (document the reason).

## Critical architecture rules

1. **RSC by default.** Every file is a Server Component unless it has a genuine reason to be client.
2. **Isolate motion in leaf client components.** The home page is a Server Component that imports `<MindgardenScene />` as a client leaf (`"use client"` at its top). Never mark a layout or page-level file as client.
3. **One shared `layoutId` vocabulary** across Home ↔ cluster ↔ detail pages so card morphs work. Naming: `card-{slug}`.
4. **No `window.addEventListener('scroll')`.** Use Framer's `useScroll` / `useMotionValue`.
5. **No `h-screen`.** Use `min-h-[100dvh]` always.
6. **No CSS `calc()` width math.** Use CSS Grid.

## Design tokens

Source of truth: `globals.css` `@theme` block. Do not inline hex values in components.

```css
@theme {
  --color-base: #F5EFE1;
  --color-surface: #FAF4E8;
  --color-surface-raised: #FFFFFF;
  --color-ink: #141814;
  --color-ink-muted: rgb(20 24 20 / 0.55);
  --color-moss: #4F6B28;
  --color-sage: #C5D4A8;
  --color-coral: #F0A488;
  --color-butter: #F7DFA0;

  --font-display: 'Fraunces', serif;
  --font-body: 'Manrope', sans-serif;

  --shadow-sm: 0 2px 8px rgb(76 60 30 / 0.06);
  --shadow-md: 0 8px 24px -4px rgb(76 60 30 / 0.10);
  --shadow-lg: 0 20px 48px -12px rgb(76 60 30 / 0.14);
  --shadow-drag: 0 32px 64px -16px rgb(76 60 30 / 0.22);

  --radius-card: 20px;
  --radius-tile: 24px;
  --radius-detail: 32px;
}
```

## Motion defaults

Spring config used everywhere unless overridden:
```ts
const spring = { type: "spring", stiffness: 180, damping: 22 };
```

Page transitions: ease `cubic-bezier(0.16, 1, 0.3, 1)`, ~600–800ms. Idle card float: CSS `animation` (pure CSS, no JS per card). Respect `prefers-reduced-motion`.

## Directory layout

```
app/
  (site)/
    page.tsx                  # Home (RSC) → imports <MindgardenScene />
    playing/page.tsx          # RSC → <MasonryGrid cluster="playing" />
    creating/
      page.tsx                # RSC → <ProjectGrid />
      [slug]/page.tsx         # RSC → <CaseStudy /> from MDX
    thinking/page.tsx         # RSC → <FeedGrid />
  layout.tsx                  # RSC — fonts, <CornerNav /> client leaf
  globals.css                 # @theme tokens + reset
components/
  client/                     # all "use client" components
    mindgarden-scene.tsx
    polaroid-card.tsx
    corner-nav.tsx
    music-player.tsx
    chat-input.tsx
    nav-pill.tsx
  server/                     # RSC components
content/
  creating/
  playing/
  thinking/
lib/
  content.ts                  # MDX loader helpers
  cards.ts                    # home card manifest (positions, slugs, destinations)
public/
```

## Content authoring

MDX with frontmatter. Example:
```mdx
---
title: "Boutique 65"
slug: "boutique-65"
cluster: "creating"
kind: "case-study"
heroImage: "/images/boutique-65/hero.jpg"
summary: "Art direction for a Paris furniture label."
tags: ["art direction", "brand"]
externalUrl: null
---

Body content here.
```

Home card manifest lives in `lib/cards.ts` as a typed array. Includes position (`{x, y, rotation}`), label, destination. Position values are percentages of viewport so they stay responsive.

## Workflow for new work

1. Read the relevant section of `01_technical_brief.md` first.
2. Check `SKILL.md` for the aesthetic/engineering stance.
3. Before importing any package, run `cat package.json` — never assume a package is installed.
4. Use existing tokens; don't introduce new colors or radii without adding them to `@theme`.
5. For any component with motion, perpetual animation, or drag — `"use client"` at the top and keep it a leaf.
6. Before committing, pre-flight checklist (from `SKILL.md`).

## What NOT to build

- No dark mode toggle in v1 (tokens should still be written with theming in mind — use semantic CSS vars — but no toggle UI).
- No contact form. Bottom-left corner icon fans out to email + LinkedIn only.
- No live LinkedIn embeds. Thinking cards are styled-static MDX.
- No analytics/tracking in v1.
- No login, no CMS, no comments.
- No generic SaaS patterns: feature grids, testimonial carousels, CTA hero stacks, logo cloud.
- No scatter-canvas layout for Creating in v1 — use responsive CSS Grid (scatter canvas is a v2 upgrade once content is richer).
- No shared-element card morph on page transition in v1 — use clean fade + staggered card entry. Morph is v2.
- No LinkedIn UI mimicry in Thinking — use site's own design system for post cards.
- No SocialPill sidebar — `components/client/social-pill.tsx` is deleted; social links surface contextually in content.

## Resolved design decisions

### Homepage intro animation
First-class feature — not a placeholder. The existing `intro-animation.tsx` is a rough skeleton; rebuild it properly.
- Letters of "Patrick's Mindgarden" rise from baseline one by one
- Polaroid cards bloom from *behind* the title while it is still on screen
- Title fades out, scene is revealed — immersive, mind-like, not a generic loader
- Skipped on repeat visits (`sessionStorage`) and for `prefers-reduced-motion`

### Nav pill
- **Hidden on `/`** — the polaroid cards are the navigation on the homepage
- **Fades in on cluster pages** (`/playing`, `/creating`, `/thinking`, detail pages) as part of the page entrance

### Page transitions (v1)
Clean fade + staggered card entry on cluster pages. No shared-element morph until v2.

### Chat bar (homepage)
Real functional AI chat, not decorative.
- Model: **Claude Haiku** (keep costs low)
- Answers questions about Patrick (work, background, availability)
- Can forward a message to Patrick via email on request
- System prompt to be written when domain/bio details are finalised
- `readOnly` on the current input is a placeholder — needs full implementation

### About
No separate `/about` page. Instead: clicking the "Patrick" wordmark (or a small avatar near it) opens a **peek overlay** containing:
- A photo of Patrick
- A short bio blurb
- A nudge: "Want to know more? Ask below ↓" pointing at the chat bar

**Draft bio copy (Patrick to edit):**
> I'm Patrick — a designer, creative developer, and music nerd living in Berlin. I work across UX, web, brand, and code, usually at the point where the brief gets interesting and the tools start feeling like instruments.
>
> When I'm not designing, I'm making music, pressing vinyl, and DJing as Uferkind. This site is my mindgarden — everything I make, think about, and play with, kept in the same place without being filed into folders.
>
> Want to know more? Ask below ↓

### Music player (bottom-right corner)
- **Corner player**: HTML5 Audio, plays a hardcoded MP3 from `/public` (unreleased original music)
- **DJ sets card on homepage**: external link to `soundcloud.com/uferkind` (already wired in `cards.ts`)
- These are two separate things — do not conflate them

### Peek behavior (homepage cards)
Three cards use `behavior: 'peek'`:
- **`video`** — embed (YouTube or Vimeo iframe)
- **`visuals`** — image grid inside peek overlay
- **`sidequests`** — floating masonry peek window, no navigation link, no cluster page behind it

### Cluster ownership
- **Creating** (`/creating`): professional projects — UX / Code / Web / Brand filter tabs. Source: old site projects (10 total). Has case study detail pages. Code tab launches thin (Mindgarden site, movie decision app, bootcamp final project ~May 25).
- **Playing** (`/playing`): music, DJ, personal/cultural work. Masonry layout. Content types: YouTube embeds (videos/reels/shorts), music original tiles, DJ embed tiles, and cultural/design projects (e.g. Bananas Are Berries) which get their own detail pages. DJ sets homepage card links to `soundcloud.com/uferkind`.
- **Thinking** (`/thinking`): LinkedIn post replicas (own design system, small "Originally posted on LinkedIn ↗" attribution link per card), bookmarks, and inspiration. Pure curation — no original long-form authoring.

### Creating cluster layout
Responsive **CSS Grid** with mixed aspect-ratio tiles and filter tabs (UX / Code / Web / Brand).
Filter is a client component; grid reflow animated with Framer Motion `layout`.

### Detail pages
One shared `<DetailPage>` base template with a `cluster` prop. Creating detail pages are tighter/process-focused. Playing detail pages are looser/more image-heavy. `kind` field in MDX frontmatter controls what renders inside the template (e.g. `case-study` shows full body; `external-link` shows a "View project →" link instead). No separate route structures per kind.

### Corner nav
- **Top-right**: download CV (`/public/cv-patrick-caire.pdf`) — single PDF in v1, no one-pager yet
- **Bottom-left**: contact hub — tap to fan out email (`mailto:`) then LinkedIn. No other social links in the corner.
- **Bottom-right**: music player — HTML5 Audio, hardcoded MP3 from `/public`

### Chat API
- Route: `/api/chat` — Claude Haiku, streaming responses
- Email forwarding via **Resend** when visitor asks to contact Patrick
- System prompt: TBD (blocked on domain + bio finalisation)
- `ANTHROPIC_API_KEY` and `RESEND_API_KEY` required in `.env.local`

### Music video peek
YouTube embed: `https://www.youtube.com/watch?v=Rk2tmIkQnAw` (Nachtgarten). Real iframe, not placeholder.

### Content source
Projects migrated from `patrickcaire.framer.website`. Known projects:
Loominate, Autonomies, Chikai, AFAR, Keyko, Bananas Are Berries, MXC, Frachtwerk, Green Visions, Stetig & Wandel.
Case studies: Autonomies (decentralized music marketplace), MXC Foundation, Frachtwerk, Stetig & Wandel.
Gallery content: art direction, print/digital, illustration, photography, posters, album covers, event materials.

### Domain / deployment
**TBD** — resolve before writing the chat system prompt. Final domain affects metadata, OG tags, and the AI's self-description.

## Build roadmap — target launch Friday 2026-05-08

### Phase 1 — Homepage (Monday 05-04)
- Rebuild intro animation: letters rise from baseline, cards bloom from behind title, title fades to reveal scene
- Hide NavPill on `/`, fade it in on cluster pages
- Refactor CornerNav: bottom-left becomes email + LinkedIn fan-out; delete `social-pill.tsx`
- Wire video peek with real YouTube iframe (`Rk2tmIkQnAw`)
- Build About peek overlay (bio draft + photo placeholder until asset arrives)
- Wire MusicPlayer with HTML5 Audio (placeholder MP3 until file arrives)

### Phase 2 — Chat API (Tuesday 05-05)
- `/api/chat` server route — Claude Haiku, streaming
- Resend email forwarding when visitor asks to contact Patrick
- Remove `readOnly` from chat bar input, wire up submission
- Placeholder system prompt (finalise when domain is confirmed)

### Phase 3 — Cluster pages (Tuesday–Wednesday 05-05/06)
- Creating: CSS Grid + filter tabs (UX/Code/Web/Brand) + MDX content migration from old site
- Playing: Masonry + YouTube embed tiles + music tiles
- Thinking: LinkedIn post cards in site design system with "Originally posted on LinkedIn ↗" attribution

### Phase 4 — Detail pages (Wednesday 05-06)
- Shared `<DetailPage>` template with `cluster` prop variations
- Wire `/creating/[slug]` page
- Add `/playing/[slug]` route for Bananas Are Berries etc.
- Populate with migrated content from `patrickcaire.framer.website`

### Phase 5 — Polish + deploy (Thursday 05-07)
- Mobile layout pass across all pages
- Page transitions: fade + staggered card entry on cluster pages
- Accessibility pass (focus rings, aria labels, reduced motion)
- Vercel deploy + domain wiring + OG tags + metadata

### Friday 05-08 — content fill, smoke test, ship

## Assets needed from Patrick (content blockers)

| Asset | Blocks |
|---|---|
| Photo for About peek | About overlay |
| MP3 file for music player | Corner player |
| Hero images for projects | Creating grid tiles |
| Bio copy approval | About peek + chat system prompt |
| Domain confirmed | Chat system prompt, OG tags, metadata |
| LinkedIn posts to include | Thinking cluster |
| YouTube video IDs for Playing | Playing masonry embeds |
| Bananas Are Berries detail content | Playing [slug] page |

## Open questions (resolve with Patrick before affected work)

- Domain / primary URL for the live site
- Which MP3 file to use for the corner music player
- Patrick's photo asset for the About peek overlay
- Bio copy approval (draft is in the About section above)
- LinkedIn posts and YouTube video IDs for cluster content
