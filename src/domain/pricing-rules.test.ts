import { describe, expect, it } from 'vitest'
import { ADD_ONS, currency, estimateFor, jobPlanFor, pricingSignal } from './estimate'
import { PUBLIC_PRICING } from './config'
import { BOOKABLE, SERVICES } from './services'
import type { Frequency, PropertyType } from './types'

/**
 * Business rule 3b of HANDOFF.md: until the owner publishes a rate card, nothing the
 * customer can see may mention dollars. estimateFor() still computes them for the
 * owner's webhook payload; the customer-facing strings come from jobPlanFor() and
 * pricingSignal(). This suite is the in-repo version of the CI guard.
 */
const DOLLARS = /\$/

const PROPERTY_TYPES: PropertyType[] = [
  'office',
  'retail',
  'school',
  'medical',
  'warehouse',
  'event-venue'
]

const FREQUENCIES: Frequency[] = ['once', 'weekly', 'biweekly', 'monthly', 'quarterly']

describe('no published prices', () => {
  it('keeps the pricing switch off', () => {
    expect(PUBLIC_PRICING).toBe(false)
  })

  it('describes every service scope without a dollar sign', () => {
    for (const service of SERVICES) {
      expect(pricingSignal(service), service.id).not.toMatch(DOLLARS)
    }
  })

  it('names add-ons without quoting a price', () => {
    for (const addon of ADD_ONS) {
      expect(`${addon.name} ${addon.note}`, addon.id).not.toMatch(DOLLARS)
    }
  })

  it('sizes every bookable scope without a dollar sign', () => {
    for (const service of BOOKABLE) {
      for (const property of PROPERTY_TYPES) {
        for (const frequency of FREQUENCIES) {
          const plan = jobPlanFor([service.id], [], 12000, property, frequency)
          const shown = `${plan.headline} ${plan.cadence}`
          expect(shown, `${service.id}/${property}/${frequency}`).not.toMatch(DOLLARS)
        }
      }
    }
  })

  it('keeps the empty-selection headline price-free', () => {
    expect(jobPlanFor([], [], null, null, 'once').headline).not.toMatch(DOLLARS)
  })
})

describe('the internal estimator stays ready for the rate card', () => {
  it('still computes real numbers, so flipping PUBLIC_PRICING is a switch not a rewrite', () => {
    const estimate = estimateFor(['rec-office'], [], 10000, 'office', 'weekly')
    expect(estimate.total).toBeGreaterThan(0)
    expect(currency(estimate.total)).toBe('$595')
  })
})
