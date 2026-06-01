export type CardBehavior = 'navigate' | 'peek' | 'external'
export type ClusterId = 'playing' | 'creating' | 'thinking'

export interface CardPosition {
  /** Pixel offsets relative to a 1440×800 design canvas */
  x: number
  y: number
  /** Base rotation in degrees (seeded, not random per render) */
  rot: number
}

export interface MobileCardPosition extends CardPosition {
  size: number
}

export interface HomeCard {
  id: string
  label: string
  /** px width of the polaroid on desktop */
  size: number
  behavior: CardBehavior
  /** For 'navigate': internal route. For 'external': full URL. For 'peek': undefined. */
  destination?: string
  desktop: CardPosition
  mobile: MobileCardPosition
  /** Stagger rank (0 = first to fly out from center). Extra initial rotation for flair. */
  entrance: { rank: number; startRot: number }
}

/**
 * Design canvas dimensions — card positions are authored for this size.
 * The scene component centers and scales this canvas to fit the viewport.
 */
export const DESIGN_W = 1440
export const DESIGN_H = 800

/**
 * Card positions form a wreath around the center "Patrick" wordmark.
 * Safe zone (no cards): roughly x 460–980, y 280–520.
 *
 * Layout strategy:
 *   Left side:  3 cards  (web, sidequests, artblog)
 *   Upper-mid:  2 cards  (code, music)
 *   Right side: 3 cards  (dj, video, visuals)
 *   Lower-mid:  2 cards  (writing, ux)
 *
 * This gives 5 cards on each horizontal half of the canvas.
 */
export const HOME_CARDS: HomeCard[] = [
  {
    id: 'web',
    label: 'Web Design',
    size: 170,
    behavior: 'navigate',
    destination: '/creating',
    //  ← far top-left
    desktop: { x: 55,   y: 55,  rot: -7 },
    mobile:  { x: -18,  y: 150, rot: -8, size: 118 },
    entrance: { rank: 2, startRot: -35 },
  },
  {
    id: 'code',
    label: "things I've coded",
    size: 150,
    behavior: 'navigate',
    destination: '/creating',
    //  ← upper-left area, staggered from web
    desktop: { x: 310,  y: 150, rot: 5 },
    mobile:  { x: 200,  y: 100, rot: 6,  size: 110 },
    entrance: { rank: 6, startRot: 22 },
  },
  {
    id: 'sidequests',
    label: 'Side-quests',
    size: 155,
    behavior: 'peek',
    //  ← left edge, mid-height
    desktop: { x: 70,   y: 310, rot: -9 },
    mobile:  { x: 260,  y: 260, rot: -5, size: 110 },
    entrance: { rank: 4, startRot: -28 },
  },
  {
    id: 'artblog',
    label: 'my old art blog',
    size: 140,
    behavior: 'external',
    destination: 'https://art-sponge.com/',
    //  ← bottom-left
    desktop: { x: 40,   y: 530, rot: 8 },
    mobile:  { x: -30,  y: 310, rot: 7,  size: 105 },
    entrance: { rank: 8, startRot: 30 },
  },
  {
    id: 'writing',
    label: 'things I wrote',
    size: 165,
    behavior: 'navigate',
    destination: '/thinking',
    //  ↓ bottom-center-left (below safe zone, pushed right)
    desktop: { x: 380,  y: 530, rot: 4 },
    mobile:  { x: -10,  y: 600, rot: -6, size: 115 },
    entrance: { rank: 5, startRot: -18 },
  },
  {
    id: 'music',
    label: 'music I make',
    size: 160,
    behavior: 'navigate',
    destination: '/playing',
    //  ↑ top-center-right (above safe zone)
    desktop: { x: 640,  y: 15,  rot: -4 },
    mobile:  { x: 260,  y: 450, rot: -4, size: 112 },
    entrance: { rank: 0, startRot: 16 },
  },
  {
    id: 'dj',
    label: 'DJ sets',
    size: 140,
    behavior: 'external',
    destination: 'https://soundcloud.com/uferkind',
    //  → top-right area
    desktop: { x: 1100, y: 50,  rot: 6 },
    mobile:  { x: -30,  y: 455, rot: 4,  size: 100 },
    entrance: { rank: 3, startRot: -24 },
  },
  {
    id: 'video',
    label: 'Music Video',
    size: 150,
    behavior: 'peek',
    //  → right edge, mid-height
    desktop: { x: 1240, y: 260, rot: -5 },
    mobile:  { x: 280,  y: 600, rot: 8,  size: 105 },
    entrance: { rank: 7, startRot: 20 },
  },
  {
    id: 'ux',
    label: 'UX Design',
    size: 160,
    behavior: 'navigate',
    destination: '/creating',
    //  ↓ bottom-center-right (below safe zone, pushed right)
    desktop: { x: 960,  y: 530, rot: 7 },
    mobile:  { x: 160,  y: 710, rot: -5, size: 110 },
    entrance: { rank: 9, startRot: -26 },
  },
  {
    id: 'visuals',
    label: 'visuals I made',
    size: 150,
    behavior: 'peek',
    //  → far right, lower
    desktop: { x: 1220, y: 490, rot: -7 },
    mobile:  { x: 25,   y: 60,  rot: 5,  size: 100 },
    entrance: { rank: 1, startRot: 32 },
  },
]

/** Card IDs that open a peek overlay instead of navigating */
export const PEEK_IDS = new Set(
  HOME_CARDS.filter((c) => c.behavior === 'peek').map((c) => c.id)
)

/** Card IDs that are external links */
export const EXTERNAL_IDS = new Set(
  HOME_CARDS.filter((c) => c.behavior === 'external').map((c) => c.id)
)
