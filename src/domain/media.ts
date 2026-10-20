import { SHOTS, type GalleryCat, type Shot } from './photos.generated'

export { SHOTS }
export type { GalleryCat, Shot }

export const fullSrc = (shot: Shot) => `/photos/${shot.slug}.webp`
export const thumbSrc = (shot: Shot) => `/photos/${shot.slug}-thumb.webp`

const bySlug = new Map(SHOTS.map((s) => [s.slug, s]))
const FIRST_SHOT: Shot = SHOTS[0] ?? { slug: 'hero-crew', alt: 'AM4LESS crew on site', cat: 'commercial', w: 1280, h: 800 }
export const shot = (slug: string): Shot => bySlug.get(slug) ?? FIRST_SHOT

/** Named slots used by <Photo>; values are the company's own job photos. */
const SLOT_SLUGS = {
  heroCrew: 'warehouse-epoxy-gloss',
  postConstruction: 'office-carpet-tiles',
  eventSetup: 'church-sanctuary-wide',
  pressureWashing: 'court-pressure-after',
  upholstery: 'carpet-extraction',
  specialtyOps: 'hospital-night-crew',
  moveOut: 'office-turnover-empty',
  floorCare: 'floor-scrubber-machine',
  beforeAfterA: 'locker-room-before',
  beforeAfterB: 'locker-room-after',
  training: 'training-classroom',
  aboutTeam: 'crew-mopping-hall'
} as const

export type PhotoKey = keyof typeof SLOT_SLUGS

export const PHOTO_SHOT: Record<PhotoKey, Shot> = Object.fromEntries(
  Object.entries(SLOT_SLUGS).map(([key, slug]) => [key, shot(slug)])
) as Record<PhotoKey, Shot>

export const PHOTOS: Record<PhotoKey, string> = Object.fromEntries(
  Object.entries(PHOTO_SHOT).map(([key, s]) => [key, fullSrc(s)])
) as Record<PhotoKey, string>

export const GALLERY_FILTERS: { id: GalleryCat | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'floor', label: 'Floor care' },
  { id: 'medical', label: 'Healthcare' },
  { id: 'school', label: 'Schools' },
  { id: 'carpet', label: 'Carpet & upholstery' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'event', label: 'Event spaces' },
  { id: 'moveout', label: 'Move-in / out' },
  { id: 'beforeafter', label: 'Before & after' },
  { id: 'training', label: 'Training' }
]

/** Category id -> photo, so `/services` and the booking wizard stay in sync. */
export const CATEGORY_PHOTO: Record<string, PhotoKey> = {
  recurring: 'heroCrew',
  construction: 'postConstruction',
  event: 'eventSetup',
  logistics: 'floorCare',
  deep: 'specialtyOps',
  moveout: 'moveOut'
}
