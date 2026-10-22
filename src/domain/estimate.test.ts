import { describe, expect, it } from 'vitest'
import { estimateFor } from './estimate'
import type { Estimate } from './types'

/**
 * estimateFor() is the internal costing model: it feeds the owner's webhook payload only.
 * Nothing here is rendered while PUBLIC_PRICING is false — see pricing-rules.test.ts.
 */
function totalOf(ids: string[], addons: string[] = [], sqft: number | null = 10000, property: 'office' | 'medical' | 'residence' | 'retail' = 'office', frequency: 'once' | 'weekly' = 'once'): Estimate {
  return estimateFor(ids, addons, sqft, property, frequency)
}

describe('estimateFor — pricing models', () => {
  it('prices a per-square-foot line from area', () => {
    const e = totalOf(['rec-office'])
    expect(e.total).toBe(700) // $0.07 x 10,000
    expect(e.lines[0]?.basis).toContain('sq ft')
  })

  it('applies the minimum charge when area is small', () => {
    const e = totalOf(['rec-office'], [], 1000)
    expect(e.total).toBe(150)
    expect(e.lines[0]?.basis).toContain('1,000')
  })

  it('floors a rounded amount to cents', () => {
    const e = totalOf(['rec-floor'], [], 3333, 'retail')
    expect(e.total).toBe(549.28) // 0.16 x 3333 x 1.03
  })

  it('weights labour by property type', () => {
    expect(totalOf(['rec-office'], [], 10000, 'medical').total).toBe(826)
    expect(totalOf(['rec-office'], [], 10000, 'residence').total).toBe(644)
  })

  it('prices an hourly line on its duration', () => {
    expect(totalOf(['rec-residential'], [], null).total).toBe(192) // $48/hr x 4 hrs
  })

  it('prices a flat line once per visit', () => {
    expect(totalOf(['deep-upholstery'], [], null).total).toBe(55)
  })

  it('defers a per-square-foot line when no area is given', () => {
    const e = totalOf(['rec-office'], [], null)
    expect(e.total).toBe(0)
    expect(e.lines[0]?.basis).toBe('Add square footage for a price')
    expect(e.lines[0]?.amount).toBe(0)
  })

  it('sends a quote-only line to a site survey instead of a number', () => {
    const e = totalOf(['con-fixture'], [], null)
    expect(e.needsSiteVisit).toBe(true)
    expect(e.total).toBe(0)
    expect(e.lines[0]?.basis).toContain('site survey')
  })

  it('ignores ids that are not in the catalogue', () => {
    const e = totalOf(['not-a-service', 'rec-office'], ['not-an-addon'])
    expect(e.lines.length).toBe(1)
    expect(e.total).toBe(700)
  })

  it('always flags the estimate as non-binding', () => {
    expect(totalOf(['rec-office']).isEstimateOnly).toBe(true)
  })
})

describe('estimateFor — add-ons, discounts, cadence', () => {
  it('adds a flat add-on as its own line', () => {
    expect(totalOf(['rec-office'], ['supervise']).total).toBe(845) // 700 + 145
  })

  it('percent add-ons key off the cleaning subtotal', () => {
    const e = totalOf(['rec-office'], ['eco'])
    expect(e.lines[1]?.amount).toBe(35) // 5% of 700
    expect(e.lines[1]?.basis).toBe('5% of cleaning work')
    expect(e.total).toBe(735)
  })

  it('stacks flat and percent add-ons', () => {
    expect(totalOf(['rec-office'], ['eco', 'supervise']).total).toBe(880)
  })

  it('rewards a weekly commitment with 15% off', () => {
    const e = estimateFor(['rec-office'], [], 10000, 'office', 'weekly')
    expect(e.discountPercent).toBe(0.15)
    expect(e.discountAmount).toBe(105)
    expect(e.total).toBe(595)
    expect(e.recurringMonthly).toBe(2380)
  })

  it('gives a one-time visit no discount and no monthly figure', () => {
    const e = totalOf(['rec-office'])
    expect(e.discountAmount).toBe(0)
    expect(e.recurringMonthly).toBeNull()
  })

  it('projects quarterly work over a month', () => {
    const e = estimateFor(['rec-office'], [], 10000, 'office', 'quarterly')
    expect(e.discountPercent).toBe(0.03)
    expect(e.total).toBe(679)
    expect(e.recurringMonthly).toBe(226.33)
  })

  it('never lets a discount push the total below zero', () => {
    const e = estimateFor([], ['eco'], 10000, 'office', 'weekly')
    expect(e.total).toBe(0)
  })
})
