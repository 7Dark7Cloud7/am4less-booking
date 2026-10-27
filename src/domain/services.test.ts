import { describe, expect, it } from 'vitest'
import { CATEGORIES } from './categories'
import { BOOKABLE, SERVICES, SERVICE_BY_ID, isBookable, servicesInCategory } from './services'

/**
 * The seven lines the owner sells online (HANDOFF.md section 3a). Adding a line here
 * is a business decision, not a code change — if this test fails, ask the owner first.
 */
const BOOKABLE_IDS: string[] = [
  'rec-office',
  'rec-floor',
  'rec-medical',
  'evt-rapid',
  'deep-upholstery',
  'deep-pressure',
  'mov-deep'
]

/**
 * Retired on 2026-10-27: the owner no longer markets post-construction, transport or
 * residential/apartment work. None of these ids may come back without the owner.
 */
const RETIRED_IDS = [
  'con-dust',
  'con-furniture',
  'con-fixture',
  'log-supplies',
  'log-haul',
  'log-rental',
  'rec-residential',
  'rec-apartment'
]

describe('catalogue integrity', () => {
  it('gives every service a unique id', () => {
    expect(new Set(SERVICES.map((s) => s.id)).size).toBe(SERVICES.length)
  })

  it('indexes every service by id', () => {
    expect(SERVICE_BY_ID.size).toBe(SERVICES.length)
  })

  it('puts every service in a declared category', () => {
    const declared = new Set<string>(CATEGORIES.map((c) => c.id))
    const orphans = SERVICES.filter((s) => !declared.has(s.category)).map((s) => s.id)
    expect(orphans).toEqual([])
  })

  it('populates each category it claims to serve', () => {
    for (const category of CATEGORIES) {
      expect(servicesInCategory(category.id).length, category.id).toBeGreaterThan(0)
    }
  })

  it('lists only the four categories the owner sells', () => {
    expect(CATEGORIES.map((c) => c.id)).toEqual(['recurring', 'event', 'deep', 'moveout'])
  })

  it('has dropped the retired lines from the catalogue entirely', () => {
    for (const id of RETIRED_IDS) expect(SERVICE_BY_ID.has(id), id).toBe(false)
  })
})

describe('bookability — only cleaning lines are bookable', () => {
  it('exposes exactly seven bookable services', () => {
    expect(BOOKABLE.length).toBe(7)
  })

  it('exposes exactly the agreed ids', () => {
    expect(BOOKABLE.map((s) => s.id).sort()).toEqual([...BOOKABLE_IDS].sort())
  })

  it('marks everything else coming soon', () => {
    const gated = SERVICES.filter((s) => !BOOKABLE_IDS.includes(s.id))
    expect(gated.length).toBe(SERVICES.length - 7)
    for (const service of gated) {
      expect(service.comingSoon, service.id).toBe(true)
    }
  })

  it('reports bookable ids as bookable and gated ids as not', () => {
    for (const id of BOOKABLE_IDS) expect(isBookable(id), id).toBe(true)
    for (const service of SERVICES) {
      if (!BOOKABLE_IDS.includes(service.id)) expect(isBookable(service.id), service.id).toBe(false)
    }
  })

  it('rejects an unknown id instead of defaulting to bookable', () => {
    expect(isBookable('does-not-exist')).toBe(false)
    expect(isBookable('')).toBe(false)
  })

  it('keeps every bookable line a real cleaning scope', () => {
    const nonCleaning = ['evt-setup', 'evt-led']
    for (const id of nonCleaning) expect(isBookable(id), id).toBe(false)
  })
})
