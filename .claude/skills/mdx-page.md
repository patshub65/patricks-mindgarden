---
name: mdx-page
description: Template and schema for MDX content pages. Invoke with /mdx-page when creating new content files for the mindgarden — project pages, writing posts, or any MDX-based content. Defines frontmatter schema, content structure, and image referencing.
model_invocable: false
user_invocable: true
---

# MDX Page — Content Template

Use this skill when creating new `.mdx` files in the `/content/` directory.

## File location

All MDX files live under `/content/creating/` — there are no other content subdirectories in v1. The filename is the slug: `/content/creating/{slug}.mdx`.

## Frontmatter schema

Every MDX file must have this frontmatter block:

```yaml
---
title: "Project Name"
slug: "project-name"
cluster: "creating"
kind: "case-study" | "showcase" | "external-link"
category: "ux-ui" | "web" | "brand"
heroImage: "/images/creating/{slug}/hero.jpg"
summary: "One sentence. What this project is and what you did."
tags: ["tag1", "tag2"]
externalUrl: null | "https://..."
date: "2024"
role: "Role title"
client: "Client name"
agency: "Agency name" | null
skills: ["Figma", "React", "Framer Motion"]
---
```

### Field reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Display name of the project |
| `slug` | yes | Must match filename (without `.mdx`) |
| `cluster` | yes | Always `"creating"` in v1 |
| `kind` | yes | Controls which detail layout renders |
| `category` | yes | Which peek grid this appears in: `ux-ui`, `web`, or `brand` |
| `heroImage` | yes | Path relative to `/public/` |
| `summary` | yes | One sentence, shown in peek grid thumbnails |
| `tags` | yes | Lowercase, used for filtering and display |
| `externalUrl` | no | If set, detail page shows "View project →" link |
| `date` | yes | Year or year range (`"2022"`, `"2023–2024"`) |
| `role` | yes | Your role on the project |
| `client` | yes | Client/company name |
| `agency` | no | Agency context if applicable (`"Loominate"`, `"Jut-so"`) |
| `skills` | yes | Tools and technologies used — displayed as tags |

### `kind` values

- **`case-study`** (detail full): Full narrative — problem, approach, decisions, outcome. For: Sponti, Autonomies, Frachtwerk, MXC.
- **`showcase`** (detail short): Hero image, 2-3 paragraphs, skills, a few images. No deep process narrative. For: AFAR, Chikai, Keyko, Loominate, Bananas Are Berries, Green Visions, Stetig & Wandel.
- **`external-link`**: No detail page — links out. Currently unused but reserved.

## Content structure by kind

### case-study

```mdx
---
(frontmatter)
---

{/* Hero image is rendered by the detail page template from heroImage frontmatter */}

## The Brief

One paragraph. What the client needed, what the problem was.

## Approach

2-3 paragraphs. How you tackled it — research, strategy, key decisions.

## Key Decisions

Specific design or technical decisions and why you made them.
Use subheadings (###) if there are multiple distinct decisions.

## Outcome

What shipped, what impact it had, what you learned.

{/* Images are referenced as standard markdown images */}
![Description](/images/creating/{slug}/detail-01.jpg)
```

### showcase

```mdx
---
(frontmatter)
---

Short description of the project — what it is, what you did, the context. 2-3 paragraphs max.

![Description](/images/creating/{slug}/detail-01.jpg)

![Description](/images/creating/{slug}/detail-02.jpg)
```

## Image conventions

- All images in `/public/images/creating/{slug}/`
- Hero image: `hero.jpg` (required)
- Detail images: `detail-01.jpg`, `detail-02.jpg`, etc.
- Use descriptive alt text — this is a UX designer's portfolio, a11y matters
- Images are standard markdown `![alt](/path)` — no custom components needed in v1

## Tone

This is not a corporate case study. It's Patrick's personal site — the voice is:
- First person ("I designed...", "We chose...")
- Specific and concrete, not vague ("redesigned the navigation to reduce clicks from 4 to 2", not "improved the user experience")
- Honest about constraints and tradeoffs
- No filler: "Elevate," "Seamless," "Unleash," "Next-gen"
- No startup-slop: "Leveraging," "Cutting-edge," "Holistic approach"

## Creating a new MDX page — checklist

1. Create the file at `/content/creating/{slug}.mdx`
2. Fill in all required frontmatter fields
3. Create the image directory at `/public/images/creating/{slug}/`
4. Write content matching the `kind` structure above
5. Verify the slug matches an entry in the peek grid data (or add one)
