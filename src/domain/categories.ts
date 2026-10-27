import type { ServiceCategory } from './types'

export const CATEGORIES: readonly ServiceCategory[] = [
  {
    id: 'recurring',
    name: 'Recurring Janitorial & Floor Care',
    tagline: 'The work that keeps a building presentable every single day',
    blurb:
      'Scheduled commercial cleaning: surfaces, restrooms, floors, trash and consumables. Contracted weekly, bi-weekly, monthly or quarterly.',
    icon: 'sparkles'
  },
  {
    id: 'event',
    name: 'Event & Event Space Services',
    tagline: 'Clear it overnight, on your deadline',
    blurb:
      'After the last guest leaves we sort waste, clear bottles, scrub floors and restore the venue against a tight overnight deadline — that part is bookable today. Table, chair, staging and tent set-up and temporary LED lighting are on the rollout list.',
    icon: 'party-popper'
  },
  {
    id: 'deep',
    name: 'Deep Maintenance & Specialty Operations',
    tagline: 'The jobs most cleaners will not quote',
    blurb:
      'Upholstery steam extraction and high-pressure exterior washing are bookable now. Water and smoke remediation, mold and biohazard response, and HVAC duct and kitchen exhaust cleaning are the next crews we are certifying.',
    icon: 'waves'
  },
  {
    id: 'moveout',
    name: 'Move-In / Move-Out & Deep Prep',
    tagline: 'Make a vacant space acceptable to the next occupant',
    blurb:
      'Full interior detail for tenants, buyers and landlords: cabinets inside and out, appliances, tubs, scuff removal and sanitisation, timed to your lease or closing date.',
    icon: 'key-round'
  }
] as const

export const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]))
