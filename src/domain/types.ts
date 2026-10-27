export type ServiceCategoryId = 'recurring' | 'event' | 'deep' | 'moveout'

export type PropertyType =
  | 'office'
  | 'medical'
  | 'school'
  | 'retail'
  | 'warehouse'
  | 'event-venue'

export type Frequency = 'once' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly'

export type PricingModel =
  | { kind: 'per-square-foot'; rate: number; minCharge: number }
  | { kind: 'hourly'; rate: number; minHours: number }
  | { kind: 'flat'; amount: number }
  | { kind: 'quote-only' }

/** Labour weight of a line item: 1 = wipe-down visit, 3 = multi-crew project. */
export type Intensity = 1 | 2 | 3

export interface ServiceItem {
  id: string
  name: string
  summary: string
  details: string[]
  category: ServiceCategoryId
  pricing: PricingModel
  durationHours: number
  requiresSiteVisit: boolean
  intensity: Intensity
  /** Not bookable yet — shown for breadth, greyed out, excluded from every quote. */
  comingSoon?: boolean
  popular?: boolean
}

export interface ServiceCategory {
  id: ServiceCategoryId
  name: string
  tagline: string
  blurb: string
  icon: string
}

export interface BookingDraft {
  propertyType: PropertyType | null
  squareFeet: number | null
  serviceIds: string[]
  addons: string[]
  frequency: Frequency
  preferredDate: string | null
  preferredTime: TimeSlot | null
  accessNotes: string
  contact: ContactDetails
}

export interface ContactDetails {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  zip: string
  notes: string
  consent: boolean
}

export type TimeSlot = 'morning' | 'midday' | 'evening' | 'overnight'

export interface EstimateLine {
  label: string
  basis: string
  amount: number
}

export interface Estimate {
  lines: EstimateLine[]
  subtotal: number
  discountPercent: number
  discountAmount: number
  total: number
  recurringMonthly: number | null
  isEstimateOnly: boolean
  needsSiteVisit: boolean
}

export type BookingStatus = 'draft' | 'submitted' | 'confirmed' | 'completed' | 'cancelled'

export interface Booking extends BookingDraft {
  reference: string
  status: BookingStatus
  estimate: Estimate
  createdAt: string
  submittedAt: string | null
}

export const EMPTY_CONTACT: ContactDetails = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: 'Quakertown',
  zip: '18951',
  notes: '',
  consent: false
}

export const EMPTY_DRAFT: BookingDraft = {
  propertyType: null,
  squareFeet: null,
  serviceIds: [],
  addons: [],
  frequency: 'once',
  preferredDate: null,
  preferredTime: null,
  accessNotes: '',
  contact: EMPTY_CONTACT
}

export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  morning: '6:00 AM – 10:00 AM',
  midday: '10:00 AM – 2:00 PM',
  evening: '2:00 PM – 6:00 PM',
  overnight: '6:00 PM – 6:00 AM (after hours)'
}
