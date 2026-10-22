import { describe, expect, it } from 'vitest'
import {
  digits,
  formatPhone,
  hasErrors,
  isPast,
  todayIso,
  validateContact,
  validateDraftForSubmit
} from './validation'
import { EMPTY_CONTACT, EMPTY_DRAFT, type BookingDraft, type ContactDetails } from './types'

const VALID_CONTACT: ContactDetails = {
  firstName: 'Dana',
  lastName: 'Whitfield',
  phone: '2155551234',
  email: 'dana@example.com',
  address: '14 West 4th Street',
  city: 'Quakertown',
  zip: '18951',
  notes: 'Side door, code 4417',
  consent: true
}

function validDraft(): BookingDraft {
  return {
    ...EMPTY_DRAFT,
    propertyType: 'office',
    squareFeet: 8000,
    serviceIds: ['rec-office'],
    preferredDate: todayIso(),
    preferredTime: 'morning',
    contact: VALID_CONTACT
  }
}

function dayOffset(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

describe('phone handling', () => {
  it('keeps digits only', () => {
    expect(digits('(215) 555-1234 ext')).toBe('2155551234')
    expect(digits('no digits here')).toBe('')
  })

  it('formats as the user types', () => {
    expect(formatPhone('')).toBe('')
    expect(formatPhone('21')).toBe('21')
    expect(formatPhone('215')).toBe('215')
    expect(formatPhone('2155')).toBe('(215) 5')
    expect(formatPhone('215555')).toBe('(215) 555')
    expect(formatPhone('2155551234')).toBe('(215) 555-1234')
  })

  it('drops a leading country code and extra digits', () => {
    expect(formatPhone('12155551234')).toBe('(215) 555-1234')
    expect(formatPhone('1-215-555-1234')).toBe('(215) 555-1234')
    expect(formatPhone('21555512345678')).toBe('(215) 555-1234')
  })
})

describe('validateContact', () => {
  it('accepts a complete contact', () => {
    expect(validateContact(VALID_CONTACT)).toEqual({})
  })

  it('rejects the empty form field by field', () => {
    const errors = validateContact(EMPTY_CONTACT)
    expect(Object.keys(errors).sort()).toEqual([
      'address',
      'consent',
      'email',
      'firstName',
      'lastName',
      'phone'
    ])
  })

  it('needs ten digits', () => {
    expect(validateContact({ ...VALID_CONTACT, phone: '2155551' }).phone).toBeTruthy()
    expect(validateContact({ ...VALID_CONTACT, phone: '+1 (215) 555-1234' })).toEqual({})
  })

  it('needs a real email domain', () => {
    expect(validateContact({ ...VALID_CONTACT, email: 'dana@example' }).email).toBeTruthy()
    expect(validateContact({ ...VALID_CONTACT, email: 'dana example.com' }).email).toBeTruthy()
    expect(validateContact({ ...VALID_CONTACT, email: 'dana@example.co' })).toEqual({})
  })

  it('needs a five-digit ZIP', () => {
    expect(validateContact({ ...VALID_CONTACT, zip: '1895' }).zip).toBeTruthy()
    expect(validateContact({ ...VALID_CONTACT, zip: '18951-2207' }).zip).toBeTruthy()
  })

  it('requires consent before contacting', () => {
    expect(validateContact({ ...VALID_CONTACT, consent: false }).consent).toBeTruthy()
  })
})

describe('validateDraftForSubmit', () => {
  it('accepts a complete draft', () => {
    expect(validateDraftForSubmit(validDraft())).toEqual({})
    expect(hasErrors(validateDraftForSubmit(validDraft()))).toBe(false)
  })

  it('requires property type and at least one service', () => {
    const errors = validateDraftForSubmit({ ...validDraft(), propertyType: null, serviceIds: [] })
    expect(errors.propertyType).toBeTruthy()
    expect(errors.serviceIds).toBeTruthy()
  })

  it('leaves square footage optional but bounded', () => {
    expect(validateDraftForSubmit({ ...validDraft(), squareFeet: null }).squareFeet).toBeUndefined()
    expect(validateDraftForSubmit({ ...validDraft(), squareFeet: 49 }).squareFeet).toBeTruthy()
    expect(validateDraftForSubmit({ ...validDraft(), squareFeet: 50 }).squareFeet).toBeUndefined()
    expect(validateDraftForSubmit({ ...validDraft(), squareFeet: 5_000_001 }).squareFeet).toBeTruthy()
  })

  it('refuses a past date and no date at all', () => {
    expect(validateDraftForSubmit({ ...validDraft(), preferredDate: null }).preferredDate).toBeTruthy()
    expect(validateDraftForSubmit({ ...validDraft(), preferredDate: dayOffset(-1) }).preferredDate).toBeTruthy()
    expect(validateDraftForSubmit({ ...validDraft(), preferredDate: dayOffset(1) }).preferredDate).toBeUndefined()
  })

  it('requires a time window', () => {
    expect(validateDraftForSubmit({ ...validDraft(), preferredTime: null }).preferredTime).toBeTruthy()
  })

  it('surfaces contact errors too', () => {
    const errors = validateDraftForSubmit({ ...validDraft(), contact: EMPTY_CONTACT })
    expect(errors.email).toBeTruthy()
    expect(errors.consent).toBeTruthy()
  })
})

describe('dates', () => {
  it('formats today as an ISO calendar date', () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('treats today as bookable and yesterday as past', () => {
    expect(isPast(todayIso())).toBe(false)
    expect(isPast(dayOffset(-1))).toBe(true)
    expect(isPast(dayOffset(30))).toBe(false)
  })
})
