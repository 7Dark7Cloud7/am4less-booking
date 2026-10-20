import { estimateFor } from './estimate'
import { SERVICE_BY_ID } from './services'
import type { Booking, BookingDraft } from './types'

/** AM4-26-7F3K2 style reference: brand, year, then base36 for sortability. */
export function makeReference(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(2)
  const stamp = date.getTime().toString(36).slice(-4).toUpperCase()
  return `AM4-${yy}-${stamp}`
}

export function buildBooking(draft: BookingDraft, submitted = false): Booking {
  const estimate = estimateFor(
    draft.serviceIds,
    draft.addons,
    draft.squareFeet,
    draft.propertyType,
    draft.frequency
  )

  const now = new Date().toISOString()

  return {
    ...draft,
    reference: makeReference(),
    status: submitted ? 'submitted' : 'draft',
    estimate,
    createdAt: now,
    submittedAt: submitted ? now : null
  }
}

export function serviceNames(ids: readonly string[]): string[] {
  return ids.map((id) => SERVICE_BY_ID.get(id)?.name).filter((n): n is string => Boolean(n))
}

export function totalHours(booking: Booking): number {
  return booking.serviceIds.reduce((sum, id) => sum + (SERVICE_BY_ID.get(id)?.durationHours ?? 0), 0)
}

export function formatDate(iso: string | null): string {
  if (!iso) return 'Not selected'
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
