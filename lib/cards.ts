export type CardBehavior = 'peek' | 'external'

/** A card's resting place, stored as a fraction of the stage so it reflows to any
 *  viewport instead of being baked into a fixed 1440×800 canvas. */
export interface CardFraction {
  fx: number
  fy: number
  rot: number
}

export interface HomeCard {
  id: string
  label: string
  /** Desktop base size in px (capped maximum); scaled down + floored for smaller stages. */
  baseSize: number
  behavior: CardBehavior
  destination?: string
  /** Wide-stage composition (≥700px): the loved desktop scatter, as fractions. */
  desktop: CardFraction
  /** Mobile composition (<700px): a taller, scrollable garden, as fractions. */
  mobile: CardFraction
  entrance: { rank: number; startRot: number }
}

/** Reference proportions for the wide scatter. Used only to scale card sizes. */
export const DESIGN_W = 1440
export const DESIGN_H = 800

export const HOME_CARDS: HomeCard[] = [
  {
    id: 'web',
    label: 'Web Design',
    baseSize: 170,
    behavior: 'peek',
    desktop: { fx: 0.097, fy: 0.175, rot: -7 },
    mobile:  { fx: 0.22,  fy: 0.42,  rot: -8 },
    entrance: { rank: 2, startRot: -35 },
  },
  {
    id: 'product',
    label: 'Product Building',
    baseSize: 150,
    behavior: 'peek',
    desktop: { fx: 0.267, fy: 0.281, rot: 5 },
    mobile:  { fx: 0.76,  fy: 0.45,  rot: 6 },
    entrance: { rank: 6, startRot: 22 },
  },
  {
    id: 'brand',
    label: 'Art & Brand',
    baseSize: 155,
    behavior: 'peek',
    desktop: { fx: 0.102, fy: 0.484, rot: -9 },
    mobile:  { fx: 0.28,  fy: 0.58,  rot: -5 },
    entrance: { rank: 4, startRot: -28 },
  },
  {
    id: 'writing',
    label: 'Written Things',
    baseSize: 165,
    behavior: 'peek',
    desktop: { fx: 0.321, fy: 0.766, rot: 4 },
    mobile:  { fx: 0.26,  fy: 0.76,  rot: -6 },
    entrance: { rank: 5, startRot: -18 },
  },
  {
    id: 'music',
    label: 'Music Production',
    baseSize: 160,
    behavior: 'peek',
    desktop: { fx: 0.5,   fy: 0.119, rot: -4 },
    mobile:  { fx: 0.74,  fy: 0.30,  rot: -4 },
    entrance: { rank: 0, startRot: 16 },
  },
  {
    id: 'dj',
    label: 'DJ Sets',
    baseSize: 140,
    behavior: 'external',
    destination: 'https://soundcloud.com/uferkind',
    desktop: { fx: 0.8125, fy: 0.15, rot: 6 },
    mobile:  { fx: 0.74,   fy: 0.62, rot: 4 },
    entrance: { rank: 3, startRot: -24 },
  },
  {
    id: 'video',
    label: 'Music Video',
    baseSize: 150,
    behavior: 'peek',
    desktop: { fx: 0.913, fy: 0.419, rot: -5 },
    mobile:  { fx: 0.72,  fy: 0.79,  rot: 8 },
    entrance: { rank: 7, startRot: 20 },
  },
  {
    id: 'ux-ui',
    label: 'UX/UI Design',
    baseSize: 160,
    behavior: 'peek',
    desktop: { fx: 0.722, fy: 0.7625, rot: 7 },
    mobile:  { fx: 0.48,  fy: 0.93,   rot: -5 },
    entrance: { rank: 9, startRot: -26 },
  },
  {
    id: 'visuals',
    label: 'Visual Gallery',
    baseSize: 150,
    behavior: 'peek',
    desktop: { fx: 0.899, fy: 0.706, rot: -7 },
    mobile:  { fx: 0.24,  fy: 0.30,  rot: 5 },
    entrance: { rank: 1, startRot: 32 },
  },
]

export const PEEK_IDS = new Set(
  HOME_CARDS.filter((c) => c.behavior === 'peek').map((c) => c.id)
)

export const EXTERNAL_IDS = new Set(
  HOME_CARDS.filter((c) => c.behavior === 'external').map((c) => c.id)
)

// ── Responsive layout resolver ──────────────────────────────────────────────
// Turns the viewport into concrete per-card pixel positions + sizes. Cards are
// laid out at REAL pixel sizes (no CSS transform scale), so labels stay legible
// at every breakpoint. Positions are clamped fully on-stage, so nothing clips.

export type LayoutMode = 'wide' | 'mobile'

export interface ResolvedCard {
  id: string
  label: string
  behavior: CardBehavior
  destination?: string
  size: number
  x: number
  y: number
  rot: number
  entrance: { rank: number; startRot: number }
}

export interface StageLayout {
  mode: LayoutMode
  /** Drag walls — cards bounce / are constrained inside this box. */
  stageW: number
  stageH: number
  cards: ResolvedCard[]
}

const clampN = (min: number, v: number, max: number) => Math.max(min, Math.min(v, max))

/** Breakpoint between the wide full-viewport scene and the tall mobile garden. */
export const MOBILE_MAX = 700

export function resolveLayout(vw: number, vh: number): StageLayout {
  const mode: LayoutMode = vw < MOBILE_MAX ? 'mobile' : 'wide'

  if (mode === 'wide') {
    const pad = 24
    // Cap the layout box so the scatter stays composed on ultrawide monitors,
    // and centre it in the viewport.
    const layoutW = Math.min(vw, 1600)
    const layoutH = Math.min(vh, 900)
    const offsetX = (vw - layoutW) / 2
    const offsetY = (vh - layoutH) / 2
    // Size scale vs the reference width, floored so cards never go illegible.
    const k = clampN(0.62, layoutW / DESIGN_W, 1.06)

    const cards = HOME_CARDS.map((c): ResolvedCard => {
      const size = Math.max(116, Math.round(c.baseSize * k))
      const cx = offsetX + c.desktop.fx * layoutW
      const cy = offsetY + c.desktop.fy * layoutH
      const x = clampN(pad, cx - size / 2, vw - size - pad)
      const y = clampN(pad, cy - size / 2, vh - size - pad)
      return {
        id: c.id, label: c.label, behavior: c.behavior, destination: c.destination,
        size, x, y, rot: c.desktop.rot, entrance: c.entrance,
      }
    })
    return { mode, stageW: vw, stageH: vh, cards }
  }

  // Mobile: a tall, scrollable garden. Cards get vertical room so they don't
  // cram or overlap the wordmark, and the page scrolls past the fold.
  const pad = 14
  const bottomPad = 150 // keep the lowest cards clear of the raised chat + corner buttons
  const stageW = vw
  const stageH = Math.max(vh * 1.35, 780)
  const k = clampN(0.5, vw / 430, 1)

  const cards = HOME_CARDS.map((c): ResolvedCard => {
    const size = Math.max(104, Math.round(c.baseSize * 0.72 * k))
    const cx = c.mobile.fx * stageW
    const cy = c.mobile.fy * stageH
    const x = clampN(pad, cx - size / 2, stageW - size - pad)
    const y = clampN(pad, cy - size / 2, stageH - size - bottomPad)
    return {
      id: c.id, label: c.label, behavior: c.behavior, destination: c.destination,
      size, x, y, rot: c.mobile.rot, entrance: c.entrance,
    }
  })
  return { mode, stageW, stageH, cards }
}
