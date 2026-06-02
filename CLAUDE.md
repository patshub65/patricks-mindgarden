# CLAUDE.md

Operating guide for Claude Code in this repo. Skills in `.claude/skills/` provide detailed conventions — this file is the architectural source of truth.

## Project

Patrick Caire's portfolio — Berlin-based product/UX/UI designer who codes. Domain: `patrickcaire.me`. Concept: "mindgarden." A single-page homepage with an exploded scatter of draggable polaroid cards. Each card opens a peek overlay; design projects link through to detail pages.

**Not a blog. Not a SaaS site. Not a landing page.** It's a scene you explore.

**Context**: This site is a job search artifact. Patrick is targeting Product Designer / UX/UI Designer roles in Berlin + remote-EU, positioning as a designer with a technical and AI-native edge. The site must ship fast, look distinctive, and work flawlessly.

## Stack

- **Next.js 15** (App Router, RSC default) — use `next dev --turbopack` for local dev
- **React 19**
- **Tailwind v4** (`@theme` block for tokens; no legacy `tailwind.config.js`)
- **Framer Motion v12** — primary motion library
- **MDX** — content in `/content/creating/{slug}.mdx`
- **`next/font/google`** — Fraunces + Manrope
- **`@phosphor-icons/react`** — icons, strokeWidth 1.5 globally
- **Vercel** deploy to `patrickcaire.me`

**No GSAP in v1.** Framer Motion covers everything needed.

## Architecture

### Single-page + detail pages

There are no cluster pages. The site has two route types:

1. **`/`** — Homepage. Single-page with polaroid card scatter. All cards open peek overlays.
2. **`/creating/[slug]`** — Detail pages for projects. Rendered from MDX in `/content/creating/`.

No `/playing`, `/creating`, `/thinking` index routes. No NavPill component. The homepage IS the navigation.

### RSC by default

Every file is a Server Component unless it needs client APIs. Page and layout files are never `"use client"`. Interactive components are leaf client files in `components/client/`.

### Critical rules

1. **No `h-screen`.** Use `min-h-[100dvh]` always.
2. **No CSS `calc()` width math.** Use CSS Grid.
3. **No `window.addEventListener('scroll')`.** Use Framer's `useScroll` / `useMotionValue`.
4. **No inline hex colors.** Use CSS variables from `globals.css @theme`.
5. **Use `next/image`** for all images — automatic lazy loading, format conversion, sizing.

## Design tokens

Source of truth: `globals.css` `@theme` block. Full reference in `.claude/skills/design-tokens.md`.

## Directory layout

```
app/
  (site)/
    page.tsx                  # Home (RSC) → imports <HomeSceneLoader />
    creating/
      [slug]/page.tsx         # Detail page (RSC) → renders MDX
  layout.tsx                  # RSC — fonts, <CornerNav /> client leaf
  globals.css                 # @theme tokens + reset
  api/
    chat/route.ts             # Claude Haiku streaming + Resend email forwarding
components/
  client/                     # all "use client" components
    mindgarden-scene.tsx      # Card scatter, peeks, chat bar
    polaroid-card.tsx         # Individual draggable card
    corner-nav.tsx            # CV download (top-right), contact (bottom-left), music (bottom-right)
    music-player.tsx          # HTML5 Audio corner player
    peek-overlay.tsx          # Overlay for card content
    thumbnails.tsx            # Card thumbnail renderers
    home-scene-loader.tsx     # Dynamic import wrapper
    nav-pill.tsx              # DEPRECATED — no longer used, remove when cleaning up
  server/                     # RSC components
    cluster-header.tsx        # DEPRECATED — no cluster pages, remove when cleaning up
content/
  creating/                   # All MDX project files
  raw/                        # Source PDFs for content migration (not deployed)
lib/
  content.ts                  # MDX loader helpers
  cards.ts                    # Home card manifest (positions, slugs, behaviors)
public/
  images/creating/{slug}/     # Project images
```

## Homepage cards (9 cards)

| # | ID | Label | Behavior | Peek content |
|---|---|---|---|---|
| 1 | `ux-ui` | UX/UI Design | peek | Autonomies + Sponti → detail pages |
| 2 | `web` | Web Design | peek | Frachtwerk, MXC, S&W, Green Visions → detail pages |
| 3 | `brand` | Art & Brand | peek | AFAR, Chikai, Keyko, Loominate, Bananas Are Berries → detail short pages |
| 4 | `product` | Product Building | peek | Sponti (GitHub + live), bootcamp work, mindgarden |
| 5 | `writing` | Written Things | peek | LinkedIn post cards |
| 6 | `music` | Music Production | peek | Originals / embedded player |
| 7 | `video` | Music Video | peek | YouTube iframe (Nachtgarten: `Rk2tmIkQnAw`) |
| 8 | `visuals` | Visual Gallery | peek | Image grid |
| 9 | `dj` | DJ Sets | external | → soundcloud.com/uferkind |

Note: Sponti appears in both UX/UI (design story) and Product Building (code/shipping story). This is intentional — it proves both halves of "designer who codes."

## Content tiers

| Tier | Layout | Route | Projects |
|---|---|---|---|
| **Peek only** | Thumbnail + label in overlay | None | Bootcamp projects, LinkedIn posts, music, visuals, video |
| **Detail short** (`kind: "showcase"`) | Hero, 2-3 paragraphs, skills, a few images | `/creating/[slug]` | AFAR, Chikai, Keyko, Loominate, Bananas Are Berries, Green Visions, Stetig & Wandel |
| **Detail full** (`kind: "case-study"`) | Full narrative: brief → approach → decisions → outcome | `/creating/[slug]` | Sponti, Autonomies, Frachtwerk, MXC |

## Project categories

| Category | `category` frontmatter | Projects |
|---|---|---|
| UX/UI Design | `ux-ui` | Autonomies, Sponti |
| Web Design | `web` | Frachtwerk, MXC, Stetig & Wandel, Green Visions |
| Art & Brand | `brand` | AFAR, Chikai, Keyko, Loominate, Bananas Are Berries |

## Resolved design decisions

### About peek
Clicking the "Patrick" wordmark opens a peek overlay with:
- Styled "P" initial in moss-green circle (photo placeholder — swap when asset arrives)
- Bio copy (approved):

> I'm Patrick — a designer, creative developer, and music nerd living in Berlin. I work across UX, web, brand, and code, usually at the point where the brief gets interesting and the tools start feeling like instruments.
>
> Currently open to new opportunities — especially teams where design and engineering sit at the same table.
>
> Want to know more? Ask below ↓

### Chat bar (homepage)
Real functional AI chat, not decorative.
- Model: **Claude Haiku** (fast, cheap)
- Answers questions about Patrick (work, background, availability, projects)
- "Contact Patrick" flow: visitor asks → Haiku confirms → Resend sends email to Patrick
- Guardrails: refuses off-topic, short system prompt grounded in bio + project facts
- No memory between sessions, no conversation persistence
- `ANTHROPIC_API_KEY` and `RESEND_API_KEY` in `.env.local` (both available)
- Domain for system prompt: `patrickcaire.me`

### Corner nav
- **Top-right**: download CV (`/public/cv-patrick-caire.pdf`)
- **Bottom-left**: contact hub — tap to fan out email (`mailto:patrick.caire@gmail.com`) then LinkedIn
- **Bottom-right**: music player — HTML5 Audio, hardcoded MP3 from `/public`

### Music player
- Corner player: HTML5 Audio, plays a hardcoded MP3 (unreleased original music, file TBD)
- DJ sets card: external link to `soundcloud.com/uferkind`
- These are two separate things

### Intro animation
- Cards bloom from center outward to scattered positions (already implemented in `mindgarden-scene.tsx`)
- Patrick wordmark fades in after cards settle
- Skipped on repeat visits (`sessionStorage`) and for `prefers-reduced-motion`

### Detail page template
One shared `<DetailPage>` component. `kind` field in MDX frontmatter controls layout:
- `case-study`: full narrative with sections
- `showcase`: lighter — hero, paragraphs, images, skills
- `external-link`: shows "View project →" link (reserved, not used in v1)

## Content source

Projects migrated from `patrickcaire.framer.website`. PDF case study decks in `/content/raw/`.

| Project | Category | Kind | Source |
|---|---|---|---|
| Sponti | ux-ui | case-study | Write from scratch (GitHub + live app) |
| Autonomies | ux-ui | case-study | PDF deck |
| Frachtwerk | web | case-study | PDF deck |
| MXC | web | case-study | PDF deck |
| Stetig & Wandel | web | showcase | PDF deck |
| Green Visions | web | showcase | Framer site text |
| AFAR | brand | showcase | Framer site text |
| Chikai | brand | showcase | Framer site text |
| Keyko | brand | showcase | Framer site text |
| Loominate | brand | showcase | Framer site text |
| Bananas Are Berries | brand | showcase | Framer site text |

## What NOT to build

- No dark mode toggle in v1
- No contact form — bottom-left corner fans to email + LinkedIn
- No analytics/tracking in v1
- No login, no CMS, no comments
- No generic SaaS patterns: feature grids, testimonial carousels, CTA hero stacks
- No cluster index pages (`/playing`, `/creating`, `/thinking`)
- No NavPill — homepage cards are the navigation
- No shared-element card morph on page transition — clean fade only in v1

## Skills reference

| Skill | Location | Auto-invoke | Purpose |
|---|---|---|---|
| `component-scaffold` | `.claude/skills/` | yes | File structure, naming, RSC/client split |
| `design-tokens` | `.claude/skills/` | yes | Color, type, shadow, radius, motion system |
| `editorial-frontend` | `.claude/skills/` | yes | Aesthetic stance, anti-patterns, pre-flight checklist |
| `mdx-page` | `.claude/skills/` | user-invocable | MDX content template and frontmatter schema |
| `project-page` | `.claude/skills/` | user-invocable | Writing/migrating project detail pages |
| `grill-me` | `.claude/skills/` | user-invocable | Decision-tree interview for plans |

## Workflow for new work

1. Check this file and relevant skills before starting.
2. Before importing any package, run `cat package.json` — never assume a package is installed.
3. Use existing tokens; don't introduce new colors or radii without adding them to `@theme`.
4. For any component with motion, state, or browser APIs — `"use client"` at the top, keep it a leaf.
5. Use `next/image` for all images.
6. Before committing, run the pre-flight checklist from `editorial-frontend` skill.

## Assets still needed from Patrick

| Asset | Blocks | Status |
|---|---|---|
| Photo for About peek | About overlay | Using "P" placeholder |
| MP3 file for music player | Corner player | TBD |
| Hero images for projects | Detail pages | Export from PDF decks |
| LinkedIn posts to include | Written Things peek | TBD |
| YouTube video IDs for Playing | Music Production peek | TBD |
