import { SERVICE_BY_ID } from './services'
import type { Estimate, EstimateLine, Frequency, Intensity, PropertyType, ServiceItem } from './types'

export interface AddOn {
  id: string
  name: string
  note: string
  /** flat dollars added to the visit */
  amount?: number
  /** fraction added to the services subtotal */
  percent?: number
  /** labour the add-on adds to a visit */
  extraHours: number
}

export const ADD_ONS: readonly AddOn[] = [
  { id: 'eco', name: 'Green Seal certified products', note: 'Low-VOC, fragrance-free', percent: 0.05, extraHours: 0 },
  { id: 'windows', name: 'Interior window cleaning', note: 'Tracks and sills included', percent: 0.08, extraHours: 1.5 },
  { id: 'highdust', name: 'High dusting above 8 ft', note: 'Corners, ledges, beams', amount: 120, extraHours: 1.5 },
  { id: 'autoscrub', name: 'Carpet autoscrub & deodorise', note: 'Room-by-room extraction', percent: 0.12, extraHours: 2 },
  { id: 'afterhours', name: 'After-hours or weekend crew', note: 'Avoids occupied hours', percent: 0.18, extraHours: 0 },
  { id: 'supervise', name: 'On-site crew lead', note: 'Sign-off photos at completion', amount: 145, extraHours: 0 },
  { id: 'consumables', name: 'Consumables supplied', note: 'Paper, liners, soap, sanitiser', amount: 85, extraHours: 0.5 }
] as const

export const ADD_ON_BY_ID = new Map(ADD_ONS.map((a) => [a.id, a]))

/** Occupancy complexity — tighter tolerances and dwell times cost more labour. */
export const PROPERTY_MULTIPLIER: Record<PropertyType, number> = {
  office: 1,
  retail: 1.03,
  school: 1.1,
  medical: 1.18,
  warehouse: 1.05,
  'event-venue': 1.06
}

export const PROPERTY_LABELS: Record<PropertyType, string> = {
  office: 'Office / corporate',
  retail: 'Retail or shopping centre',
  school: 'School or daycare',
  medical: 'Medical or dental facility',
  warehouse: 'Warehouse or industrial',
  'event-venue': 'Event or banquet venue'
}

export function isPropertyType(value: unknown): value is PropertyType {
  return typeof value === 'string' && value in PROPERTY_LABELS
}

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  once: 'One time only',
  weekly: 'Weekly',
  biweekly: 'Every two weeks',
  monthly: 'Monthly',
  quarterly: 'Quarterly'
}

/** Recurring commitments are worth more to the business, so they buy a discount. */
export const FREQUENCY_DISCOUNT: Record<Frequency, number> = {
  once: 0,
  weekly: 0.15,
  biweekly: 0.11,
  monthly: 0.07,
  quarterly: 0.03
}

const VISITS_PER_MONTH: Record<Frequency, number | null> = {
  once: null,
  weekly: 4,
  biweekly: 2,
  monthly: 1,
  quarterly: 1 / 3
}

function serviceLine(service: ServiceItem, squareFeet: number | null, mult: number): EstimateLine | null {
  const p = service.pricing

  if (p.kind === 'per-square-foot') {
    if (!squareFeet) return null
    const byArea = p.rate * squareFeet * mult
    return {
      label: service.name,
      basis: `$${p.rate.toFixed(2)}/sq ft × ${squareFeet.toLocaleString('en-US')} sq ft`,
      amount: round2(Math.max(byArea, p.minCharge * mult))
    }
  }

  if (p.kind === 'hourly') {
    const hours = Math.max(p.minHours, service.durationHours)
    return { label: service.name, basis: `$${p.rate}/hr × ${hours} hrs`, amount: round2(p.rate * hours * mult) }
  }

  if (p.kind === 'flat') {
    return { label: service.name, basis: 'Per visit or unit', amount: round2(p.amount * mult) }
  }

  return null
}

export function estimateFor(
  serviceIds: readonly string[],
  addonIds: readonly string[],
  squareFeet: number | null,
  propertyType: PropertyType | null,
  frequency: Frequency
): Estimate {
  const mult = propertyType ? PROPERTY_MULTIPLIER[propertyType] : 1
  const serviceLines: EstimateLine[] = []
  const deferred: EstimateLine[] = []
  let needsSiteVisit = false

  for (const id of serviceIds) {
    const service = SERVICE_BY_ID.get(id)
    if (!service) continue

    if (service.pricing.kind === 'quote-only') {
      needsSiteVisit = true
      deferred.push({ label: service.name, basis: 'Free site survey — priced on visit', amount: 0 })
      continue
    }

    const line = serviceLine(service, squareFeet, mult)
    if (!line) {
      deferred.push({ label: service.name, basis: 'Add square footage for a price', amount: 0 })
      continue
    }
    serviceLines.push(line)
  }

  const servicesSubtotal = serviceLines.reduce((sum, l) => sum + l.amount, 0)

  const addonLines: EstimateLine[] = []
  for (const id of addonIds) {
    const addon = ADD_ON_BY_ID.get(id)
    if (!addon) continue
    if (typeof addon.amount === 'number') {
      addonLines.push({ label: addon.name, basis: 'Flat add-on', amount: round2(addon.amount) })
    } else if (typeof addon.percent === 'number') {
      addonLines.push({
        label: addon.name,
        basis: `${Math.round(addon.percent * 100)}% of cleaning work`,
        amount: round2(servicesSubtotal * addon.percent)
      })
    }
  }

  const subtotal = round2(servicesSubtotal + addonLines.reduce((sum, l) => sum + l.amount, 0))
  const discountPercent = FREQUENCY_DISCOUNT[frequency]
  const discountAmount = round2(subtotal * discountPercent)
  const total = round2(Math.max(0, subtotal - discountAmount))

  const perMonth = VISITS_PER_MONTH[frequency]
  const recurringMonthly = perMonth ? round2(total * perMonth) : null

  return {
    lines: [...serviceLines, ...addonLines, ...deferred],
    subtotal,
    discountPercent,
    discountAmount,
    total,
    recurringMonthly,
    isEstimateOnly: true,
    needsSiteVisit
  }
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

export function currency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

/* ------------------------------------------------------------------ *
 * Scope language. Until the owner publishes rates the site quotes in
 * labour and time — what a customer can act on — never in dollars.
 * ------------------------------------------------------------------ */

/** What actually drives the cost of a line, without naming a number. */
export function pricingSignal(service: ServiceItem): string {
  switch (service.pricing.kind) {
    case 'per-square-foot':
      return 'Scales with floor area'
    case 'hourly':
      return `Charged by hours on site · ${service.pricing.minHours} hr minimum`
    case 'flat':
      return service.id === 'deep-upholstery' ? 'Priced per piece or room' : 'One fixed price per job'
    case 'quote-only':
      return 'Written price after a free survey'
  }
}

export const INTENSITY_LABELS: Record<Intensity, string> = {
  1: 'Routine visit',
  2: 'Full detail',
  3: 'Crew project'
}

export interface JobPlan {
  /** Technician-hours needed for one visit, all services and add-ons combined. */
  crewHours: number
  crewSize: number
  /** Wall-clock hours the crew spends on site. */
  elapsedHours: number
  visitsPerMonth: number | null
  needsSurvey: boolean
  headline: string
  cadence: string
}

const TARGET_SHIFT = 5

function serviceHours(service: ServiceItem, squareFeet: number | null, mult: number): number {
  const p = service.pricing
  let hours = service.durationHours
  if (p.kind === 'per-square-foot') hours = service.durationHours + (squareFeet ?? 2500) / 1400
  if (p.kind === 'hourly') hours = Math.max(p.minHours, service.durationHours)
  return hours * mult
}

export function jobPlanFor(
  serviceIds: readonly string[],
  addonIds: readonly string[],
  squareFeet: number | null,
  propertyType: PropertyType | null,
  frequency: Frequency
): JobPlan {
  const mult = propertyType ? PROPERTY_MULTIPLIER[propertyType] : 1
  let hours = 0
  let needsSurvey = false

  for (const id of serviceIds) {
    const service = SERVICE_BY_ID.get(id)
    if (!service || service.comingSoon) continue
    if (service.requiresSiteVisit || service.pricing.kind === 'quote-only') needsSurvey = true
    hours += serviceHours(service, squareFeet, mult)
  }
  for (const id of addonIds) {
    const addon = ADD_ON_BY_ID.get(id)
    if (addon) hours += addon.extraHours
  }

  const crewHours = Math.max(0, Math.round(hours * 2) / 2)
  const crewSize = crewHours === 0 ? 0 : Math.min(6, Math.max(1, Math.ceil(crewHours / TARGET_SHIFT)))
  const elapsedHours = crewSize ? Math.ceil(crewHours / crewSize) : 0
  const perMonth = VISITS_PER_MONTH[frequency]

  const headline = crewSize
    ? `${crewSize}-person crew · about ${elapsedHours} hr${elapsedHours === 1 ? '' : 's'} on site`
    : 'Pick a service to size the crew'

  const cadence =
    perMonth === null
      ? 'One-time visit'
      : perMonth >= 1
        ? `${perMonth} visit${perMonth === 1 ? '' : 's'} a month`
        : `${Math.round(perMonth * 12)} visits a year`

  return { crewHours, crewSize, elapsedHours, visitsPerMonth: perMonth, needsSurvey, headline, cadence }
}
