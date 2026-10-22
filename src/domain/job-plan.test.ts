import { describe, expect, it } from 'vitest'
import { jobPlanFor } from './estimate'
import type { Frequency, PropertyType } from './types'

/** What a customer sees instead of a price: crew size, hours on site, cadence. */
function plan(ids: string[], addons: string[] = [], sqft: number | null = 10000, property: PropertyType | null = 'office', frequency: Frequency = 'once') {
  return jobPlanFor(ids, addons, sqft, property, frequency)
}

describe('jobPlanFor — crew sizing', () => {
  it('asks the customer to pick a service before sizing anything', () => {
    const p = plan([])
    expect(p.crewHours).toBe(0)
    expect(p.crewSize).toBe(0)
    expect(p.elapsedHours).toBe(0)
    expect(p.headline).toBe('Pick a service to size the crew')
  })

  it('rounds labour-hours to the nearest half hour', () => {
    expect(plan(['rec-office']).crewHours).toBe(10) // 3 hr + 10,000/1,400
    expect(plan(['rec-residential'], ['windows']).crewHours).toBe(5.5) // 4 hr + 1.5 hr add-on
  })

  it('sizes the crew around a five-hour shift', () => {
    const p = plan(['rec-office'])
    expect(p.crewSize).toBe(2)
    expect(p.elapsedHours).toBe(5)
    expect(p.headline).toBe('2-person crew · about 5 hrs on site')
  })

  it('caps the crew at six people no matter how big the site', () => {
    const p = plan(['rec-office'], [], 200000)
    expect(p.crewSize).toBe(6)
    expect(p.elapsedHours).toBe(25)
  })

  it('charges more labour for a tighter building', () => {
    expect(plan(['rec-office'], [], 10000, 'medical').crewHours).toBe(12)
  })

  it('adds add-on labour to the shift', () => {
    expect(plan(['rec-office'], ['autoscrub']).crewHours).toBe(12) // +2 hr
  })
})

describe('jobPlanFor — the coming-soon gate', () => {
  it('gives a gated line no crew, no hours and no survey flag', () => {
    const p = plan(['con-furniture'])
    expect(p.crewHours).toBe(0)
    expect(p.crewSize).toBe(0)
    expect(p.needsSurvey).toBe(false)
  })

  it('ignores gated lines but keeps the bookable ones', () => {
    expect(plan(['rec-office', 'log-haul']).crewHours).toBe(10)
  })

  it('flags a bookable line that needs a walk-through', () => {
    expect(plan(['rec-medical']).needsSurvey).toBe(true)
    expect(plan(['rec-office']).needsSurvey).toBe(false)
  })
})

describe('jobPlanFor — cadence wording', () => {
  it('says one-time for a single visit', () => {
    expect(plan(['rec-office'], [], 10000, 'office', 'once').cadence).toBe('One-time visit')
  })

  it('counts visits per month for weekly and bi-weekly', () => {
    expect(plan(['rec-office'], [], 10000, 'office', 'weekly').cadence).toBe('4 visits a month')
    expect(plan(['rec-office'], [], 10000, 'office', 'biweekly').cadence).toBe('2 visits a month')
  })

  it('uses the singular for a monthly contract', () => {
    expect(plan(['rec-office'], [], 10000, 'office', 'monthly').cadence).toBe('1 visit a month')
  })

  it('switches to a yearly count below monthly', () => {
    expect(plan(['rec-office'], [], 10000, 'office', 'quarterly').cadence).toBe('4 visits a year')
  })
})
