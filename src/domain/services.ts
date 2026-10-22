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
    id: 'rec-residential',
    name: 'Residential recurring clean',
    summary: 'Recurring whole-home cleaning for houses and apartments.',
    details: [
      'Kitchen, baths, floors, dusting and vacuum throughout',
      'Cabinet fronts, appliance exteriors and mirrors',
      'Linens and consumables refreshed on request'
    ],
    category: 'recurring',
    pricing: { kind: 'hourly', rate: 48, minHours: 3 },
    durationHours: 4,
    requiresSiteVisit: false,
    intensity: 1,
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

  // ---- construction ----
  {
    id: 'con-dust',
    name: 'Debris & fine dust removal',
    summary: 'Scrape paint splatter, pull drywall dust, stickers and grout residue.',
    details: [
      'Drywall and sanding dust extracted from all cavities and ledges',
      'Paint, silicone and grout haze removed from frames and glass',
      'Sticker and label residue dissolved without surface damage',
      'HEPA vacuum and damp-wipe two-pass finish'
    ],
    category: 'construction',
    pricing: { kind: 'per-square-foot', rate: 0.22, minCharge: 400 },
    durationHours: 8,
    requiresSiteVisit: false,
    intensity: 3,
    popular: true
  },
  {
    id: 'con-furniture',
    name: 'Furniture unpack & assembly',
    summary: 'Unbox, build and arrange desks, task chairs and modular workstations.',
    details: [
      'Box breakdown and cardboard removed same day',
      'Panel systems, pedestal desks and task chairs assembled',
      'Layout set to your floor plan, levelled and anchored',
      'Packaging hauled off — no dumpsters to fill'
    ],
    category: 'construction',
    pricing: { kind: 'hourly', rate: 68, minHours: 4 },
    durationHours: 6,
    requiresSiteVisit: false,
    intensity: 2,
    comingSoon: true
  },
  {
    id: 'con-fixture',
    name: 'Fixture, ductwork & high-level detail',
    summary: 'Clean light fixtures, overhead ductwork and structural beams before handover.',
    details: [
      'Lens and diffuser removal, wash, reinstall',
      'High-level duct exterior and return grille degreasing',
      'Beams, trusses and sprinkler heads dusted from lift',
      'Certificate-ready clean for the owner walkthrough'
    ],
    category: 'construction',
    pricing: { kind: 'quote-only' },
    durationHours: 10,
    requiresSiteVisit: true,
    intensity: 3,
    comingSoon: true
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

  // ---- logistics ----
  {
    id: 'log-supplies',
    name: 'Supply & chemical logistics',
    summary: 'Move power washers, buffer machines, chemicals and consumables between sites.',
    details: [
      'Secure transport of equipment between active job sites',
      'SDS-compliant handling and containment of chemicals',
      'Fuel, water and power top-up before arrival',
      'Same-day and next-day dispatch windows'
    ],
    category: 'logistics',
    pricing: { kind: 'flat', amount: 165 },
    durationHours: 2,
    requiresSiteVisit: false,
    intensity: 1,
    comingSoon: true
  },
  {
    id: 'log-haul',
    name: 'Bulk waste & furniture hauling',
    summary: 'Clear old furniture, broken appliances, mattresses and scrap for disposal or donation.',
    details: [
      'Load-out of desks, seating, appliances and mattresses',
      'Donation drop-off with receipt where salvageable',
      'Scrap metal separated for recycling revenue',
      'Dumpster fees and tipping charges included in quote'
    ],
    category: 'logistics',
    pricing: { kind: 'flat', amount: 340 },
    durationHours: 4,
    requiresSiteVisit: false,
    intensity: 2,
    comingSoon: true
  },
  {
    id: 'log-rental',
    name: 'Equipment rental transport',
    summary: 'Deliver and retrieve air movers, dehumidifiers and scaffold towers.',
    details: [
      'Drop and pick-up of high-power drying equipment',
      'Scaffold tower delivery, unloading and placement',
      'Daily unit checks during the rental window',
      'Coordinated with your restoration vendor or insurer'
    ],
    category: 'logistics',
    pricing: { kind: 'flat', amount: 190 },
    durationHours: 3,
    requiresSiteVisit: false,
    intensity: 1,
    comingSoon: true
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

/** The nine lines a customer can actually book today. */
export const BOOKABLE = SERVICES.filter((s) => !s.comingSoon)

export function servicesInCategory(id: string): ServiceItem[] {
  return SERVICES.filter((s) => s.category === id)
}

export function isBookable(id: string): boolean {
  const service = SERVICE_BY_ID.get(id)
  return service !== undefined && service.comingSoon !== true
}
