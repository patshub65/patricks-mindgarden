export type CardBehavior = 'peek' | 'external'

export interface CardPosition {
  x: number
  y: number
  rot: number
}

export interface MobileCardPosition extends CardPosition {
  size: number
}

export interface HomeCard {
  id: string
  label: string
  size: number
  behavior: CardBehavior
  destination?: string
  desktop: CardPosition
  mobile: MobileCardPosition
  entrance: { rank: number; startRot: number }
}

export const DESIGN_W = 1440
export const DESIGN_H = 800

export const HOME_CARDS: HomeCard[] = [
  {
    id: 'web',
    label: 'Web Design',
    size: 170,
    behavior: 'peek',
    desktop: { x: 55,   y: 55,  rot: -7 },
    mobile:  { x: -18,  y: 150, rot: -8, size: 118 },
    entrance: { rank: 2, startRot: -35 },
  },
  {
    id: 'product',
    label: 'Product Building',
    size: 150,
    behavior: 'peek',
    desktop: { x: 310,  y: 150, rot: 5 },
    mobile:  { x: 200,  y: 100, rot: 6,  size: 110 },
    entrance: { rank: 6, startRot: 22 },
  },
  {
    id: 'brand',
    label: 'Art & Brand',
    size: 155,
    behavior: 'peek',
    desktop: { x: 70,   y: 310, rot: -9 },
    mobile:  { x: 260,  y: 260, rot: -5, size: 110 },
    entrance: { rank: 4, startRot: -28 },
  },
  {
    id: 'writing',
    label: 'Written Things',
    size: 165,
    behavior: 'peek',
    desktop: { x: 380,  y: 530, rot: 4 },
    mobile:  { x: -10,  y: 600, rot: -6, size: 115 },
    entrance: { rank: 5, startRot: -18 },
  },
  {
    id: 'music',
    label: 'Music Production',
    size: 160,
    behavior: 'peek',
    desktop: { x: 640,  y: 15,  rot: -4 },
    mobile:  { x: 260,  y: 450, rot: -4, size: 112 },
    entrance: { rank: 0, startRot: 16 },
  },
  {
    id: 'dj',
    label: 'DJ Sets',
    size: 140,
    behavior: 'external',
    destination: 'https://soundcloud.com/uferkind',
    desktop: { x: 1100, y: 50,  rot: 6 },
    mobile:  { x: -30,  y: 455, rot: 4,  size: 100 },
    entrance: { rank: 3, startRot: -24 },
  },
  {
    id: 'video',
    label: 'Music Video',
    size: 150,
    behavior: 'peek',
    desktop: { x: 1240, y: 260, rot: -5 },
    mobile:  { x: 280,  y: 600, rot: 8,  size: 105 },
    entrance: { rank: 7, startRot: 20 },
  },
  {
    id: 'ux-ui',
    label: 'UX/UI Design',
    size: 160,
    behavior: 'peek',
    desktop: { x: 960,  y: 530, rot: 7 },
    mobile:  { x: 160,  y: 710, rot: -5, size: 110 },
    entrance: { rank: 9, startRot: -26 },
  },
  {
    id: 'visuals',
    label: 'Visual Gallery',
    size: 150,
    behavior: 'peek',
    desktop: { x: 1220, y: 490, rot: -7 },
    mobile:  { x: 25,   y: 60,  rot: 5,  size: 100 },
    entrance: { rank: 1, startRot: 32 },
  },
]

export const PEEK_IDS = new Set(
  HOME_CARDS.filter((c) => c.behavior === 'peek').map((c) => c.id)
)

export const EXTERNAL_IDS = new Set(
  HOME_CARDS.filter((c) => c.behavior === 'external').map((c) => c.id)
)
