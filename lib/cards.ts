export type CardBehavior = 'peek' | 'external'

export interface CardFraction {
  fx: number
  fy: number
  rot: number
}

export interface CardProject {
  slug?: string
  title: string
  href?: string
}

export interface HomeCard {
  id: string
  label: string
  description: string
  accentBg: string
  baseSize: number
  behavior: CardBehavior
  destination?: string
  desktop: CardFraction
  mobile: CardFraction
  entrance: { rank: number; startRot: number }
  projects: CardProject[]
}

const DESIGN_W = 1440

export const HOME_CARDS: HomeCard[] = [
  {
    id: 'web',
    label: 'Web Design',
    description: 'Crafting digital experiences that are thoughtful, clear and impactful.',
    accentBg: '#C4B4E4',
    baseSize: 240,
    behavior: 'peek',
    desktop: { fx: 0.19, fy: 0.23, rot: -5 },
    mobile:  { fx: 0.28, fy: 0.34, rot: -6 },
    entrance: { rank: 2, startRot: -75 },
    projects: [
      { slug: 'stetig-wandel', title: 'Stetig & Wandel' },
      { slug: 'green-visions', title: 'Green Visions' },
      { slug: 'mxc', title: 'MXC' },
    ],
  },
  {
    id: 'product',
    label: 'Product Building',
    description: 'Things I\'ve designed and shipped — from weekend experiments to live apps.',
    accentBg: '#ECC8A8',
    baseSize: 220,
    behavior: 'peek',
    desktop: { fx: 0.44, fy: 0.16, rot: 4 },
    mobile:  { fx: 0.72, fy: 0.28, rot: 5 },
    entrance: { rank: 0, startRot: 50 },
    projects: [
      { slug: 'sponti', title: 'Sponti' },
      { title: 'GitHub', href: 'https://github.com/patshub65' },
    ],
  },
  {
    id: 'ux-ui',
    label: 'UX UI Design',
    description: 'Product design and research — from first principles to shipped interfaces.',
    accentBg: '#E8DED0',
    baseSize: 235,
    behavior: 'peek',
    desktop: { fx: 0.76, fy: 0.22, rot: 6 },
    mobile:  { fx: 0.72, fy: 0.60, rot: 4 },
    entrance: { rank: 3, startRot: -60 },
    projects: [
      { slug: 'frachtwerk', title: 'Frachtwerk' },
      { slug: 'autonomies', title: 'Autonomies' },
      { slug: 'sponti', title: 'Sponti' },
    ],
  },
  {
    id: 'writing',
    label: 'Written Things',
    description: 'Thinking out loud on design, code, and the jump between them.',
    accentBg: '#B8CCA0',
    baseSize: 230,
    behavior: 'peek',
    desktop: { fx: 0.14, fy: 0.62, rot: -8 },
    mobile:  { fx: 0.28, fy: 0.60, rot: -5 },
    entrance: { rank: 4, startRot: -65 },
    projects: [],
  },
  {
    id: 'brand',
    label: 'Art & Brand',
    description: 'Logos, visual systems, and creative direction across brands.',
    accentBg: '#B8C8E4',
    baseSize: 230,
    behavior: 'peek',
    desktop: { fx: 0.44, fy: 0.82, rot: -3 },
    mobile:  { fx: 0.50, fy: 0.80, rot: -4 },
    entrance: { rank: 5, startRot: 55 },
    projects: [
      { slug: 'afar', title: 'AFAR' },
      { slug: 'chikai', title: 'Chikai' },
      { slug: 'keyko', title: 'Keyko' },
      { slug: 'loominate', title: 'Loominate' },
      { slug: 'bananas-are-berries', title: 'Bananas Are Berries' },
    ],
  },
  {
    id: 'visuals',
    label: 'Experiments',
    description: 'Visual play — motion, collage, and things without a brief.',
    accentBg: '#E4C4C8',
    baseSize: 230,
    behavior: 'peek',
    desktop: { fx: 0.84, fy: 0.58, rot: 7 },
    mobile:  { fx: 0.72, fy: 0.80, rot: 6 },
    entrance: { rank: 1, startRot: 70 },
    projects: [],
  },
]

// ── Written Things (LinkedIn posts) ──────────────────────────────────────────

export interface WritingPost {
  /** Short label, e.g. "Apr 2025". Optional — omit until confirmed. */
  date?: string
  /** Headline crafted for the card (not the LinkedIn title). */
  title: string
  /** 1–2 sentence pull-quote from the post. */
  excerpt: string
  /** Full LinkedIn post URL. */
  href: string
}

// TODO: swap each `href` for the individual LinkedIn post URL (currently the
// profile activity feed as a fallback). Add `date` labels once confirmed.
const LINKEDIN_ACTIVITY = 'https://www.linkedin.com/in/patrickcaire/recent-activity/all/'

export const WRITING_POSTS: WritingPost[] = [
  {
    title: 'Why designers should understand code',
    excerpt:
      'The point was never to become a developer. It was to stop being the person who has to trust everyone else’s definition of “that’s not technically feasible.”',
    href: LINKEDIN_ACTIVITY,
  },
  {
    title: 'Design generalists fit the Zeitgeist',
    excerpt:
      'I don’t see how being great at one thing only cuts it anymore. Through the amalgamation of many forays, I’ve built an approach, an eye, and the ability to move from the highest abstraction down to the tiniest detail.',
    href: LINKEDIN_ACTIVITY,
  },
  {
    title: 'AI clears the fog — you still walk the trail',
    excerpt:
      'AI shows us the path, but it doesn’t walk it for us. My job as a design engineer is to understand the terrain well enough to survive the hike.',
    href: LINKEDIN_ACTIVITY,
  },
  {
    title: 'The ugliest website I’ve ever made',
    excerpt:
      'The first site I coded from scratch was the ugliest thing I’ve ever created — Times New Roman, clashing colors, zero alignment. But when the layout was actually responsive? Felt pretty good.',
    href: LINKEDIN_ACTIVITY,
  },
]

export type LayoutMode = 'wide' | 'mobile'

export interface ResolvedCard {
  id: string
  label: string
  description: string
  accentBg: string
  behavior: CardBehavior
  destination?: string
  projects: CardProject[]
  size: number
  x: number
  y: number
  rot: number
  entrance: { rank: number; startRot: number }
}

export interface StageLayout {
  mode: LayoutMode
  stageW: number
  stageH: number
  cards: ResolvedCard[]
}

const clampN = (min: number, v: number, max: number) => Math.max(min, Math.min(v, max))

const MOBILE_MAX = 700

export function resolveLayout(vw: number, vh: number): StageLayout {
  const mode: LayoutMode = vw < MOBILE_MAX ? 'mobile' : 'wide'

  if (mode === 'wide') {
    const bleedX = 24
    const bleedY = 24
    const layoutW = Math.min(vw, 1600)
    const layoutH = Math.min(vh, 960)
    const offsetX = (vw - layoutW) / 2
    const offsetY = (vh - layoutH) / 2
    const k = clampN(0.68, layoutW / DESIGN_W, 1.1)

    const cards = HOME_CARDS.map((c): ResolvedCard => {
      const size = Math.max(150, Math.round(c.baseSize * k))
      const cx = offsetX + c.desktop.fx * layoutW
      const cy = offsetY + c.desktop.fy * layoutH
      const x = clampN(bleedX, cx - size / 2, vw - size - bleedX)
      // No top bleed — cards must not escape above the viewport
      const y = clampN(8, cy - size / 2, vh - size - bleedY)
      return {
        id: c.id, label: c.label, description: c.description,
        accentBg: c.accentBg, behavior: c.behavior, destination: c.destination,
        projects: c.projects, size, x, y, rot: c.desktop.rot, entrance: c.entrance,
      }
    })
    return { mode, stageW: vw, stageH: vh, cards }
  }

  // Mobile: 2-column grid layout, no scatter
  const colCount = 2
  const padH = 12
  const gapH = 12
  const stageW = vw
  const cardW = Math.floor((stageW - padH * 2 - gapH * (colCount - 1)) / colCount)
  // Reserve space for H1 + subtext above the grid (hero starts at ~88px from top)
  const heroH = Math.max(Math.round(vh * 0.38), 300)

  const cards = HOME_CARDS.map((c, i): ResolvedCard => {
    const size = cardW
    const col = i % colCount
    const row = Math.floor(i / colCount)
    const x = padH + col * (size + gapH)
    const y = heroH + row * (size + gapH)
    return {
      id: c.id, label: c.label, description: c.description,
      accentBg: c.accentBg, behavior: c.behavior, destination: c.destination,
      projects: c.projects, size, x, y, rot: 0, entrance: c.entrance,
    }
  })

  const rowCount = Math.ceil(HOME_CARDS.length / colCount)
  const stageH = heroH + rowCount * (cardW + gapH) + 80
  return { mode, stageW, stageH, cards }
}
