import type { ServiceItem } from './types'

/**
 * Rates here are the owner's internal planning numbers for the Bucks/Lehigh
 * County market. They are not published — see PUBLIC_PRICING in domain/config.
 */
export const SERVICES: readonly ServiceItem[] = [
  // ---- recurring ----
  {
    id: 'rec-office',
    name: 'Commercial janitorial program',
    summary: 'Daily or scheduled cleaning of offices, common areas and restrooms.',
    details: [
      'Desks, surfaces, glass partitions and touchpoint disinfection',
      'Restroom sanitation, consumable restock and trap emptying',
      'Break room, kitchenette and appliance wipe-down',
      'Trash, recycling and cardboard removal'
    ],
    category: 'recurring',
    pricing: { kind: 'per-square-foot', rate: 0.07, minCharge: 150 },
    durationHours: 3,
    requiresSiteVisit: false,
    intensity: 1,
    popular: true
  },
  {
    id: 'rec-floor',
    name: 'Hard floor care, strip & wax',
    summary: 'Burnishing, stripping, sealing and waxing VCT, concrete and tile.',
    details: [
      'Machine strip of old finish and neutraliser rinse',
      'Two to three coats of commercial sealer and wax',
      'High-speed burnish between appointments',
      'Carpet vacuum, spot treat and edge detail'
    ],
    category: 'recurring',
    pricing: { kind: 'per-square-foot', rate: 0.16, minCharge: 275 },
    durationHours: 5,
    requiresSiteVisit: false,
    intensity: 2,
    popular: true
  },
  {
    id: 'rec-medical',
    name: 'Medical & school-grade disinfection',
    summary: 'Infection-control protocols for clinics, schools and care facilities.',
    details: [
      'Hospital-grade disinfectant with documented dwell time',
      'Exam room, waiting area and classroom turnover',
      'Colour-coded tooling to prevent cross-contamination',
      'OSHA-compliant sharps and biohazard handling'
    ],
    category: 'recurring',
    pricing: { kind: 'per-square-foot', rate: 0.11, minCharge: 220 },
    durationHours: 4,
    requiresSiteVisit: true,
    intensity: 2
  },

  // ---- event ----
  {
    id: 'evt-setup',
    name: 'Event set-up & tear-down',
    summary: 'Tables, chairs, stages, tents and temporary barriers in and out.',
    details: [
      'Delivery, layout and levelling to seating chart',
      'Stage, dance floor and tent component assembly',
      'Barrier and crowd-flow placement',
      'Post-event strip and return to original configuration'
    ],
    category: 'event',
    pricing: { kind: 'hourly', rate: 62, minHours: 4 },
    durationHours: 6,
    requiresSiteVisit: false,
    intensity: 2,
    comingSoon: true
  },
  {
    id: 'evt-led',
    name: 'LED & stage lighting assistance',
    summary: 'Hang and position temporary LED strips, ambient lighting and signage.',
    details: [
      'LED strip run, controller placement and cable management',
      'Batten, par and uplight positioning to your lighting plan',
      'Truss- and beam-mounted rigging with certified anchor points',
      'De-rig and coiled storage at wrap'
    ],
    category: 'event',
    pricing: { kind: 'hourly', rate: 78, minHours: 3 },
    durationHours: 5,
    requiresSiteVisit: true,
    intensity: 2,
    comingSoon: true
  },
  {
    id: 'evt-rapid',
    name: 'Post-event rapid cleanup',
    summary: 'Waste sorting, bottle clearing and floor scrub against an overnight deadline.',
    details: [
      'Sorting for landfill, recycling and donation streams',
      'Bottle, glass and confetti extraction from soft goods',
      'Autoscrub pass on hard floors and spill treatment on carpet',
      'Venue handed over ready for the next morning booking'
    ],
    category: 'event',
    pricing: { kind: 'per-square-foot', rate: 0.13, minCharge: 450 },
    durationHours: 7,
    requiresSiteVisit: false,
    intensity: 3,
    popular: true
  },

  // ---- deep ----
  {
    id: 'deep-upholstery',
    name: 'Upholstery & fabric care',
    summary: 'Steam cleaning, stain extraction and leather conditioning.',
    details: [
      'Hot-water extraction on office chairs, sofas and theater seating',
      'Enzyme treatment for organic and grease-based stains',
      'pH-balanced leather clean and conditioning',
      'Low-moisture dry method for delicate fabrics'
    ],
    category: 'deep',
    pricing: { kind: 'flat', amount: 55 },
    durationHours: 3,
    requiresSiteVisit: false,
    intensity: 2
  },
  {
    id: 'deep-disaster',
    name: 'Disaster, mold & biohazard restoration',
    summary: 'Water extraction, smoke and soot remediation, contained hazardous cleanup.',
    details: [
      'Category 1–3 water extraction and structural drying',
      'HEPA containment negative-pressure for mold remediation',
      'Smoke, soot and odour treatment with thermal fogging',
      'Crime-scene and biohazard cleanup with disposal manifests'
    ],
    category: 'deep',
    pricing: { kind: 'quote-only' },
    durationHours: 12,
    requiresSiteVisit: true,
    intensity: 3,
    comingSoon: true
  },
  {
    id: 'deep-pressure',
    name: 'Pressure washing & exterior',
    summary: 'Facades, parking lots, sidewalks, gutters and roofs.',
    details: [
      'Soft-wash on siding and roof to protect coatings',
      'High-pressure surface cleaning on concrete and asphalt',
      'Gutter clear and downflush, debris hauled off',
      'Before-and-after photo documentation for your file'
    ],
    category: 'deep',
    pricing: { kind: 'per-square-foot', rate: 0.09, minCharge: 295 },
    durationHours: 5,
    requiresSiteVisit: false,
    intensity: 2,
    popular: true
  },
  {
    id: 'deep-hvac',
    name: 'HVAC, duct & kitchen exhaust cleaning',
    summary: 'Internal air systems, vent covers and commercial kitchen hoods.',
    details: [
      'Register, trunk-line and plume cleaning with negative air',
      'Coil, blower and drain-pan treatment',
      'Kitchen hood, filter and exhaust fan degreasing',
      'NADCA-aligned method with post-clean verification'
    ],
    category: 'deep',
    pricing: { kind: 'quote-only' },
    durationHours: 8,
    requiresSiteVisit: true,
    intensity: 3,
    comingSoon: true
  },

  // ---- moveout ----
  {
    id: 'mov-deep',
    name: 'Move-in / move-out deep clean',
    summary: 'Full interior detail timed to your lease or closing date.',
    details: [
      'Cabinets, drawers and closets degreased inside and out',
      'Oven, range, fridge and dishwasher interior detail',
      'Tub, tile, grout and toilet sanitisation',
      'Scuff removal, window interiors and track vacuum'
    ],
    category: 'moveout',
    pricing: { kind: 'per-square-foot', rate: 0.19, minCharge: 275 },
    durationHours: 6,
    requiresSiteVisit: false,
    intensity: 2,
    popular: true
  }
] as const

export const SERVICE_BY_ID = new Map(SERVICES.map((s) => [s.id, s]))

/** The seven lines a customer can actually book today. */
export const BOOKABLE = SERVICES.filter((s) => !s.comingSoon)

export function servicesInCategory(id: string): ServiceItem[] {
  return SERVICES.filter((s) => s.category === id)
}

export function isBookable(id: string): boolean {
  const service = SERVICE_BY_ID.get(id)
  return service !== undefined && service.comingSoon !== true
}
