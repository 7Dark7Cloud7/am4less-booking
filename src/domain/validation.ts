import type { BookingDraft, ContactDetails } from './types'

export type FieldErrors = Record<string, string>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function digits(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatPhone(raw: string): string {
  const d = digits(raw).slice(0, 11)
  const national = d.length === 11 && d.startsWith('1') ? d.slice(1) : d
  if (national.length <= 3) return national
  if (national.length <= 6) return `(${national.slice(0, 3)}) ${national.slice(3)}`
  return `(${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6, 10)}`
}

export function validateContact(c: ContactDetails): FieldErrors {
  const errors: FieldErrors = {}

  if (!c.firstName.trim()) errors.firstName = 'First name is required'
  if (!c.lastName.trim()) errors.lastName = 'Last name is required'

  const phone = digits(c.phone)
  if (!phone) errors.phone = 'We need a number to reach you at'
  else if (phone.length < 10) errors.phone = 'Enter a 10-digit phone number'

  if (!c.email.trim()) errors.email = 'Email is required so we can send the quote'
  else if (!EMAIL_RE.test(c.email.trim())) errors.email = 'That email address looks incomplete'

  if (!c.address.trim()) errors.address = 'Service address is required'
  if (!c.city.trim()) errors.city = 'City is required'

  if (!/^\d{5}$/.test(c.zip.trim())) errors.zip = 'Enter a 5-digit ZIP code'
  if (!c.consent) errors.consent = 'Please confirm we may contact you about this request'

  return errors
}

export function validateDraftForSubmit(draft: BookingDraft): FieldErrors {
  const errors = validateContact(draft.contact)

  if (!draft.propertyType) errors.propertyType = 'Choose the type of property'
  if (draft.serviceIds.length === 0) errors.serviceIds = 'Select at least one service'

  if (draft.squareFeet !== null && (draft.squareFeet < 50 || draft.squareFeet > 5_000_000)) {
    errors.squareFeet = 'Enter a square footage between 50 and 5,000,000'
  }

  if (!draft.preferredDate) errors.preferredDate = 'Pick a target date'
  else if (isPast(draft.preferredDate)) errors.preferredDate = 'Choose today or a future date'

  if (!draft.preferredTime) errors.preferredTime = 'Pick a preferred time window'

  return errors
}

export function isPast(dateIso: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const picked = new Date(`${dateIso}T00:00:00`)
  return picked.getTime() < today.getTime()
}

export function todayIso(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0
}
