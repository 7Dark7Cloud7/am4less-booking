import { describe, expect, it } from 'vitest'
import { buildBooking, formatDate, makeReference, serviceNames, totalHours } from './booking'
import { estimateFor } from './estimate'
import { EMPTY_CONTACT, EMPTY_DRAFT, type BookingDraft } from './types'

const DRAFT: BookingDraft = {
  ...EMPTY_DRAFT,
  propertyType: 'office',
  squareFeet: 10000,
  serviceIds: ['rec-office', 'rec-residential'],
  addons: ['supervise'],
  frequency: 'weekly',
  preferredDate: '2026-11-05',
  preferredTime: 'overnight',
  accessNotes: 'Loading dock on Cherry St',
  contact: { ...EMPTY_CONTACT, firstName: 'Dana', lastName: 'Whitfield', consent: true }
}

describe('makeReference', () => {
  it('is brand-year-base36 and sortable by year', () => {
    const ref = makeReference(new Date('2026-03-04T09:30:00Z'))
    expect(ref).toMatch(/^AM4-26-[0-9A-Z]{4}$/)
  })

  it('defaults to now', () => {
    expect(makeReference()).toMatch(/^AM4-\d{2}-[0-9A-Z]{4}$/)
  })
})

describe('buildBooking', () => {
  it('stamps a draft without a submitted time', () => {
    const booking = buildBooking(DRAFT)
    expect(booking.status).toBe('draft')
    expect(booking.submittedAt).toBeNull()
    expect(booking.reference).toMatch(/^AM4-\d{2}-/)
    expect(booking.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('marks a submitted booking with the same timestamp', () => {
    const booking = buildBooking(DRAFT, true)
    expect(booking.status).toBe('submitted')
    expect(booking.submittedAt).toBe(booking.createdAt)
  })

  it('carries the draft fields unchanged', () => {
    const booking = buildBooking(DRAFT)
    expect(booking.serviceIds).toEqual(DRAFT.serviceIds)
    expect(booking.addons).toEqual(DRAFT.addons)
    expect(booking.contact.consent).toBe(true)
  })

  it('prices the booking with the same estimator the quote uses', () => {
    const expected = estimateFor(DRAFT.serviceIds, DRAFT.addons, DRAFT.squareFeet, DRAFT.propertyType, DRAFT.frequency)
    expect(buildBooking(DRAFT).estimate.total).toBe(expected.total)
    expect(buildBooking(DRAFT).estimate.discountPercent).toBe(0.15)
  })
})

describe('booking helpers', () => {
  it('maps ids to names and drops unknown ids', () => {
    const names = serviceNames(['rec-office', 'not-a-service', 'rec-floor'])
    expect(names.length).toBe(2)
    expect(names[0]).toBe('Commercial janitorial program')
  })

  it('adds durations, treating unknown ids as zero', () => {
    const booking = { ...buildBooking(DRAFT), serviceIds: ['rec-office', 'rec-residential', 'ghost'] }
    expect(totalHours(booking)).toBe(7)
    expect(totalHours({ ...booking, serviceIds: [] })).toBe(0)
  })

  it('says not selected instead of an invalid date', () => {
    expect(formatDate(null)).toBe('Not selected')
    expect(formatDate('2026-11-05')).toBe('Thu, Nov 5, 2026')
  })
})
