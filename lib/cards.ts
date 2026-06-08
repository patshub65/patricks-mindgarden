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

export const DESIGN_W = 1440
export const DESIGN_H = 900

export const HOME_CARDS: HomeCard[] = [
  {
    id: 'web',
    label: 'Web Design',
    description: 'Crafting digital experiences that are thoughtful, clear and impactful.',
    accentBg: '#C4B4E4',
    baseSize: 240,
    behavior: 'peek',
    desktop: { fx: 0.13, fy: 0.22, rot: -5 },
    mobile:  { fx: 0.28, fy: 0.34, rot: -6 },
    entrance: { rank: 2, startRot: -35 },
    projects: [
      { slug: 'frachtwerk', title: 'Frachtwerk' },
      { slug: 'mxc', title: 'MXC' },
      { slug: 'stetig-wandel', title: 'Stetig & Wandel' },
      { slug: 'green-visions', title: 'Green Visions' },
    ],
  },
  {
    id: 'product',
    label: 'Product Building',
    description: 'Things I\'ve designed and shipped — from weekend experiments to live apps.',
    accentBg: '#ECC8A8',
    baseSize: 220,
    behavior: 'peek',
    desktop: { fx: 0.46, fy: 0.12, rot: 4 },
    mobile:  { fx: 0.72, fy: 0.28, rot: 5 },
    entrance: { rank: 0, startRot: 16 },
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
    desktop: { fx: 0.84, fy: 0.20, rot: 6 },
    mobile:  { fx: 0.72, fy: 0.60, rot: 4 },
    entrance: { rank: 3, startRot: -24 },
    projects: [
      { slug: 'autonomies', title: 'Autonomies' },
      { slug: 'sponti', title: 'Sponti' },
    ],
  },
  {
    id: 'writing',
    label: 'Read & Written',
    description: 'Thinking out loud — mostly on design, craft, and the city.',
    accentBg: '#B8CCA0',
    baseSize: 230,
    behavior: 'peek',
    desktop: { fx: 0.12, fy: 0.64, rot: -8 },
    mobile:  { fx: 0.28, fy: 0.60, rot: -5 },
    entrance: { rank: 4, startRot: -28 },
    projects: [],
  },
  {
    id: 'brand',
    label: 'Art & Brand',
    description: 'Logos, visual systems, and creative direction across brands.',
    accentBg: '#B8C8E4',
    baseSize: 230,
    behavior: 'peek',
    desktop: { fx: 0.46, fy: 0.76, rot: -3 },
    mobile:  { fx: 0.50, fy: 0.80, rot: -4 },
    entrance: { rank: 5, startRot: 22 },
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
    desktop: { fx: 0.86, fy: 0.64, rot: 7 },
    mobile:  { fx: 0.72, fy: 0.80, rot: 6 },
    entrance: { rank: 1, startRot: 32 },
    projects: [],
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

export const MOBILE_MAX = 700

export function resolveLayout(vw: number, vh: number): StageLayout {
  const mode: LayoutMode = vw < MOBILE_MAX ? 'mobile' : 'wide'

  if (mode === 'wide') {
    const bleedX = -40
    const bleedY = -40
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
