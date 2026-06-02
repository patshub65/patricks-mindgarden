---
name: project-page
description: Specialization for writing portfolio project detail pages — both from PDF case study decks and from scratch. Invoke with /project-page when building or migrating a project writeup. Handles the narrative structure, tone, and metadata extraction.
model_invocable: false
user_invocable: true
---

# Project Page — Writing & Migration

Use this skill when:
- Migrating a project from a PDF case study deck to MDX
- Writing a new project page from scratch (e.g., Sponti)
- Improving or expanding an existing project page

## Migration workflow (PDF → MDX)

PDF case study decks are in `/content/raw/`. To migrate:

1. **Read the PDF** using the Read tool with `pages` parameter to avoid token waste. Start with the first 5 pages to understand structure, then read selectively.
2. **Extract**: title, client, role, agency, date, skills used, the narrative arc, key deliverables.
3. **Determine the `kind`**: If the deck has process detail (research, iterations, decisions) → `case-study`. If it's mostly final deliverables with light context → `showcase`.
4. **Write the MDX** following the structure in the `mdx-page` skill.
5. **Note image placeholders** — PDF images can't be extracted programmatically. Add markdown image references with descriptive alt text and flag to the user: "You'll need to export these images from the PDF and save them to `/public/images/creating/{slug}/`."

**Do not fabricate details not in the source material.** If the PDF is vague about process, write a `showcase` page, not a padded `case-study`.

## Writing from scratch (e.g., Sponti)

When no source deck exists, gather information from:
- The GitHub repository (README, code structure, commit history)
- The live deployment (if available)
- Conversation with the user

### Structure for a from-scratch case-study

```
1. The Brief (what problem, for whom, why it matters)
2. My Role (what specifically you owned)
3. Approach (how you tackled it — research, tools, process)
4. Key Decisions (2-3 specific design or technical choices with reasoning)
5. Outcome (what shipped, what you learned, link to live/GitHub)
```

### Sponti-specific context

Sponti is Patrick's bootcamp final project — a social meetup planning app. It's the centerpiece of his "designer who codes" positioning. The page should:
- Show both design thinking AND technical implementation
- Reference the tech stack: React, Next.js, TypeScript
- Mention the scale: 228 commits, auth system, native folder structure
- Frame it as: "I didn't just design mockups — I built the full product"
- Link to GitHub and live deployment

## Narrative guidance

### What makes a good project page on this site

Patrick's positioning is "product/UX/UI designer who codes." Every project page should reinforce at least one of:
- **Design craft**: Visual decisions, typography choices, layout strategy
- **UX thinking**: User research, flow optimization, problem-solving
- **Technical ability**: Implementation details, stack choices, shipping
- **Strategic impact**: Business outcomes, measurable improvements

### Tone

- First person, conversational but professional
- Specific > vague: name the tools, show the numbers, describe the actual decision
- Honest about constraints: "The timeline was 3 weeks" > "We worked efficiently"
- No case-study theater: skip "The Challenge" / "The Solution" / "The Results" headers if the content doesn't warrant them. A showcase can just be a few paragraphs of context + images.

### What to avoid

- Generic deliverable lists ("Designed a responsive, visually appealing website") — be specific about WHAT you designed and WHY
- Padding thin content into case-study structure — use `showcase` kind instead
- Corporate voice ("Leveraging our expertise to deliver a holistic solution")
- Overpromising impact without evidence

## Category assignment

Assign based on the primary skill demonstrated:

| Category | `category` value | Projects |
|---|---|---|
| UX/UI Design | `ux-ui` | Autonomies, Sponti |
| Web Design | `web` | Frachtwerk, MXC, Stetig & Wandel, Green Visions |
| Art & Brand | `brand` | AFAR, Chikai, Keyko, Loominate, Bananas Are Berries |

## Output checklist

After writing a project page, verify:
- [ ] All required frontmatter fields are present and correctly typed
- [ ] `slug` matches the filename
- [ ] `category` matches the peek grid it should appear in
- [ ] `kind` matches the depth of content (don't use `case-study` for thin content)
- [ ] Image paths follow the `/images/creating/{slug}/` convention
- [ ] Alt text is descriptive (not "screenshot" or "image")
- [ ] Tone is first-person, specific, no filler
- [ ] Content doesn't fabricate details not provided by the user or source material
