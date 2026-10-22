import { describe, expect, it } from 'vitest'
import { CATEGORIES } from './categories'
import { BOOKABLE, SERVICES, SERVICE_BY_ID, isBookable, servicesInCategory } from './services'

/**
 * The nine lines the owner sells online (HANDOFF.md section 3a). Adding a line here
 * is a business decision, not a code change — if this test fails, ask the owner first.
 */
const BOOKABLE_IDS: string[] = [
  'rec-office',
  'rec-floor',
  'rec-residential',
  'rec-medical',
  'con-dust',
  'evt-rapid',
  'deep-upholstery',
  'deep-pressure',
  'mov-deep'
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
})

describe('bookability — only cleaning lines are bookable', () => {
  it('exposes exactly nine bookable services', () => {
    expect(BOOKABLE.length).toBe(9)
  })

  it('exposes exactly the agreed ids', () => {
    expect(BOOKABLE.map((s) => s.id).sort()).toEqual([...BOOKABLE_IDS].sort())
  })

  it('marks everything else coming soon', () => {
    const gated = SERVICES.filter((s) => !BOOKABLE_IDS.includes(s.id))
    expect(gated.length).toBe(SERVICES.length - 9)
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
    const nonCleaning = ['log-supplies', 'log-haul', 'log-rental', 'evt-setup', 'evt-led']
    for (const id of nonCleaning) expect(isBookable(id), id).toBe(false)
  })
})
