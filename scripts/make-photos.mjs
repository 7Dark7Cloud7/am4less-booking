// Turns the company's original gallery photos into site-ready WebP assets.
// Source: https://www.am4less.com/gallery (Duda CDN; 1060px is the resolution ceiling).
// Usage: drop new .jpg files into photos-src/, add them to MAP below, run `npm run photos`.
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SRC = process.env.PHOTO_SRC ?? path.join(ROOT, 'photos-src')
const OUT = path.join(ROOT, 'public', 'photos')
const GENERATED = path.join(ROOT, 'src', 'domain', 'photos.generated.ts')
const FULL = 1280, THUMB = 640

/** file -> [slug, alt, category] */
const MAP = {
  '20151010_112638': ['floor-scrubber-machine', 'Ride-on auto scrubber stripping a striped VCT corridor', 'floor'],
  '20151010_113057': ['floor-buffing-sanctuary', 'Operator buffing a hardwood sanctuary floor', 'floor'],
  '20210130_051934': ['hospital-treatment-room', 'Finished hospital treatment room with high-gloss flooring', 'medical'],
  '20210130_052017': ['hospital-corridor-gloss', 'Hospital corridor with mirror-finish wax and privacy screens', 'medical'],
  '20210130_052020': ['hospital-wing-cleared', 'Cleared hospital wing floor after strip and wax', 'medical'],
  '20210130_222623': ['hospital-night-crew', 'Overnight crew with air movers and extractors at a nurses station', 'medical'],
  '20210131_002243': ['hospital-empty-wing', 'Empty patient wing with freshly polished floors', 'medical'],
  '20210131_002249': ['hospital-floor-reflection', 'Reflection in a newly waxed hospital floor', 'medical'],
  '20210131_002256': ['nurses-station-finished', 'Nurses station and corridor after a full detail clean', 'medical'],
  '20210131_002305': ['hospital-stretcher-hall', 'Hospital hallway cleared and detailed around stretcher bays', 'medical'],
  '20210131_002311': ['hospital-corridor-detail', 'Clinical corridor with colour-coded floor markings', 'medical'],
  '20210204_061124': ['school-hall-blue-doors', 'School hallway with blue doors and polished tile', 'school'],
  '20210725_115724': ['office-reception-cleared', 'Cleared reception area with sealed baseboards', 'commercial'],
  '20210725_115730': ['clinic-hall-maroon-base', 'Clinic hallway with maroon baseboard and gloss finish', 'commercial'],
  '20210725_135311': ['corridor-mirror-a', 'Mirror-finish corridor wax, corner detail', 'floor'],
  '20210725_135313': ['corridor-mirror-b', 'Mirror-finish corridor wax, ceiling light reflection', 'floor'],
  '20210725_135318': ['corridor-mirror-c', 'Mirror-finish corridor wax, long perspective', 'floor'],
  '20210725_135627': ['crew-mopping-hall', 'Crew member wet-mopping a long facility hallway', 'commercial'],
  'Carpet1': ['carpet-extraction', 'Technician pulling spots and soil from carpet with a rotary extractor', 'carpet'],
  'Church': ['church-pew-rows', 'Sanctuary seating rows before a service turnaround', 'event'],
  'Churche1': ['church-sanctuary-wide', 'Full sanctuary with seating and carpet after cleaning', 'event'],
  'Commercial_office_strip_and_wax': ['warehouse-epoxy-gloss', 'Warehouse office floor ground, sealed and waxed to a high gloss', 'floor'],
  'Locker_room_after': ['locker-room-after', 'Locker room with scrubbed matting and wiped-out benches after cleaning', 'beforeafter'],
  'Locker_room_before': ['locker-room-before', 'Locker room before cleaning: tracked-in soil, debris and left belongings', 'beforeafter'],
  'Medical_office1': ['medical-waiting-room', 'Medical waiting room with vacuumed and spot-treated carpet', 'medical'],
  'Medical_office_Lab': ['medical-exam-room', 'Exam room with disinfected surfaces and equipment', 'medical'],
  'Pick2': ['corridor-blue-doors', 'Facility corridor with mirror finish and blue room doors', 'floor'],
  'SC23': ['school-cafeteria', 'School cafeteria with striped floor sealed and buffed', 'school'],
  'Sc1': ['school-checkered-hall', 'School hallway with checkered tile restored to gloss', 'school'],
  'Sccc': ['classroom-desks', 'Classroom cleaned and reset with desks and boards', 'school'],
  'Sch2': ['office-turnover-empty', 'Emptied office suite ready for move-in handover', 'moveout'],
  'Sch3': ['classroom-blue-doors', 'Classroom detailed before the first school day', 'school'],
  'School1': ['preschool-staged-out', 'Preschool room stripped of furniture for deep cleaning', 'moveout'],
  'School2': ['preschool-reset', 'Preschool room reset with furniture and supplies after cleaning', 'moveout'],
  'School3': ['office-carpet-tiles', 'Office with carpet tiles lifted for deep floor work', 'moveout'],
  'Scoo': ['training-classroom', 'Training classroom set up for a crew certification session', 'training'],
  'Tenis_Court_clean_up_Before': ['court-pressure-before', 'Tennis court before pressure washing: algae, stains and standing water', 'beforeafter'],
  'Tenis_Court_clean_up_after': ['court-pressure-after', 'Tennis court after pressure washing: even, clean playing surface', 'beforeafter'],
  'schh': ['corridor-reflection', 'End-of-corridor reflection showing a uniform wax finish', 'floor']
}

mkdirSync(OUT, { recursive: true })
const manifest = []

for (const [file, [slug, alt, cat]] of Object.entries(MAP)) {
  const buf = await sharp(path.join(SRC, `${file}.jpg`)).toBuffer()
  const meta = await sharp(buf).metadata()
  const w = Math.min(meta.width, FULL)
  const full = `${slug}.webp`
  const thumb = `${slug}-thumb.webp`
  await sharp(buf).resize({ width: w }).webp({ quality: 70, effort: 6 }).toFile(path.join(OUT, full))
  const th = Math.min(meta.width, THUMB)
  await sharp(buf).resize({ width: th }).webp({ quality: 66, effort: 6 }).toFile(path.join(OUT, thumb))
  const made = await sharp(path.join(OUT, full)).metadata()
  manifest.push({ slug, alt, cat, w: made.width, h: made.height })
}

const cats = [...new Set(manifest.map((m) => m.cat))].sort()
const rows = manifest
  .sort((a, b) => (a.cat + a.slug < b.cat + b.slug ? -1 : 1))
  .map((m) => `  { slug: '${m.slug}', alt: '${m.alt.replace(/'/g, "\\'")}', cat: '${m.cat}', w: ${m.w}, h: ${m.h} }`)

const module = `// Generated by scripts/make-photos.mjs — do not edit by hand.
// Source: the company gallery on https://www.am4less.com/gallery
export type GalleryCat =
${cats.map((c) => `  | '${c}'`).join('\n')}

export interface Shot {
  slug: string
  alt: string
  cat: GalleryCat
  w: number
  h: number
}

export const SHOTS: readonly Shot[] = [
${rows.join(',\n')}
]
`

writeFileSync(GENERATED, module)
console.log(`${manifest.length} photos written to public/photos + src/domain/photos.generated.ts`)

