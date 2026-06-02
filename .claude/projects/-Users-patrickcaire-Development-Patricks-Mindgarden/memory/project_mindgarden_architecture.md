---
name: mindgarden-architecture
description: Resolved architecture decisions from June 1 2026 grill session — single-page homepage, 9 cards, peek overlays, three content tiers, no cluster pages.
metadata:
  type: project
---

Decided 2026-06-01 in grill session. These override the original `01_technical_brief.md`.

**Single-page architecture**: No cluster routes (`/playing`, `/creating`, `/thinking`). Homepage is the only "page." All 9 cards open peek overlays. Design projects link through to detail pages at `/creating/[slug]`.

**9 cards** (down from 10 — dropped "art blog", merged "side-quests" into "Visual Gallery"):
1. UX/UI Design (peek) 2. Web Design (peek) 3. Art & Brand (peek) 4. Product Building (peek) 5. Written Things (peek) 6. Music Production (peek) 7. Music Video (peek) 8. Visual Gallery (peek) 9. DJ Sets (external → SoundCloud)

**Three content tiers**: peek only (no route), detail short (`kind: "showcase"`), detail full (`kind: "case-study"`). Same route structure, different MDX frontmatter `kind` values.

**Three project categories**: UX/UI (`ux-ui`), Web Design (`web`), Art & Brand (`brand`).

**Why:** Patrick is in an active job search sprint. The site needs to ship fast. Single-page eliminates 3 cluster page layouts, NavPill logic, and page transition complexity. Peeks give visitors enough context; detail pages exist for the strongest projects that sell his skills.

**How to apply:** Don't build cluster pages. Don't build NavPill visibility logic. All navigation flows through peek overlays from the homepage.
