import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, MessageCircle, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { estimateFor, jobPlanFor, currency, PROPERTY_LABELS } from '../domain/estimate'
import { PUBLIC_PRICING } from '../domain/config'
import { SERVICE_BY_ID } from '../domain/services'
import { EMPTY_DRAFT, type Frequency, type PropertyType } from '../domain/types'
import { BUSINESS, whatsappHref } from '../domain/business'
import { draftStore } from '../infrastructure/stores'
import { RouteButton } from './Button'

interface Job {
  id: string
  propertyType: PropertyType
  label: string
}

const JOBS: Job[] = [
  { id: 'rec-office', propertyType: 'office', label: 'Office janitorial' },
  { id: 'rec-residential', propertyType: 'residence', label: 'Home cleaning' },
  { id: 'con-dust', propertyType: 'construction-site', label: 'Post-construction' },
  { id: 'mov-deep', propertyType: 'residence', label: 'Move-in / out' },
  { id: 'deep-pressure', propertyType: 'retail', label: 'Pressure washing' }
]

const SIZES = [
  { label: '~1,000 sq ft', value: 850 },
  { label: '~5,000', value: 3000 },
  { label: '~15,000', value: 10000 },
  { label: '~40,000', value: 26000 },
  { label: '60,000+', value: 60000 }
]

const FREQS: { value: Frequency; label: string }[] = [
  { value: 'once', label: 'One time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every 2 wks' },
  { value: 'monthly', label: 'Monthly' }
]

/**
 * The short path: three taps to a number, and the chosen scope is written into
 * the same draft the full wizard reads, so nothing has to be re-entered.
 */
export function QuickQuote() {
  const [job, setJob] = useState(JOBS[0]!)
  const [squareFeet, setSquareFeet] = useState(3000)
  const [frequency, setFrequency] = useState<Frequency>('weekly')

  const estimate = useMemo(
    () => estimateFor([job.id], [], squareFeet, job.propertyType, frequency),
    [job, squareFeet, frequency]
  )
  const plan = useMemo(
    () => jobPlanFor([job.id], [], squareFeet, job.propertyType, frequency),
    [job, squareFeet, frequency]
  )

  const serviceName = SERVICE_BY_ID.get(job.id)?.name ?? 'Cleaning'
  const low = Math.round(estimate.total * 0.88)
  const high = Math.round(estimate.total * 1.18)

  const seedDraft = () =>
    draftStore.save({ ...EMPTY_DRAFT, propertyType: job.propertyType, squareFeet, frequency, serviceIds: [job.id] })

  const scope = `${serviceName}, ${squareFeet.toLocaleString('en-US')} sq ft (${PROPERTY_LABELS[job.propertyType]}), ${frequency}`
  const waText = PUBLIC_PRICING
    ? `Quick quote from am4less.com: ${scope}. Ballpark ${currency(low)}–${currency(high)} per visit.`
    : `Quick quote from am4less.com: ${scope}. Please send a written price.`

  return (
    <div className="rounded-[var(--radius-card)] border border-white/15 bg-white/8 p-5 backdrop-blur-sm sm:p-6">
      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-accent-400 uppercase">
        <Zap className="size-4" aria-hidden="true" />
        Three taps to a crew
      </p>

      <Field label="What do you need?">
        <Chips options={JOBS.map((j) => ({ value: j.id, label: j.label }))} value={job.id} onPick={(id) => setJob(JOBS.find((j) => j.id === id)!)} />
      </Field>

      <Field label="How big is the space?">
        <Chips options={SIZES.map((s) => ({ value: String(s.value), label: s.label }))} value={String(squareFeet)} onPick={(v) => setSquareFeet(Number(v))} />
      </Field>

      <Field label="How often?">
        <Chips options={FREQS.map((f) => ({ value: f.value, label: f.label }))} value={frequency} onPick={(v) => setFrequency(v as Frequency)} />
      </Field>

      <div className="mt-5 rounded-[var(--radius-field)] bg-brand-950/45 p-4">
        {PUBLIC_PRICING && estimate.total > 0 ? (
          <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">
            {currency(low)}–{currency(high)}
            <span className="ms-1 text-sm font-semibold text-brand-200">per visit</span>
          </p>
        ) : (
          <>
            <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white sm:text-3xl">
              {plan.headline}
            </p>
            <p className="mt-1 text-sm text-brand-100">
              {plan.crewHours} labour-hours of work · {plan.cadence}
            </p>
          </>
        )}
        <p className="mt-2 text-xs text-brand-200">
          {PUBLIC_PRICING
            ? 'Ballpark only. A crew lead confirms size, access and soil level before any price is locked.'
            : 'We price the visit, not a guess. Send this scope and a crew lead writes back a number — usually the same day.'}
        </p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <RouteButton to="/book" variant="accent" onClick={seedDraft}>
          Book this scope
          <ArrowRight className="size-4" aria-hidden="true" />
        </RouteButton>
        <a
          href={whatsappHref(waText)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full border border-white/35 px-5 text-[0.95rem] font-semibold text-white no-underline transition-colors hover:bg-white/10"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Send to {BUSINESS.phoneDisplay}
        </a>
      </div>
      <p className="mt-3 text-center text-xs text-brand-200">
        Need several services or a strict deadline?{' '}
        <Link to="/book" onClick={seedDraft} className="font-semibold text-white underline">
          Use the full booking form
        </Link>
        .
      </p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-semibold text-brand-100">{label}</p>
      {children}
    </div>
  )
}

function Chips({ options, value, onPick }: { options: { value: string; label: string }[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="radiogroup">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onPick(option.value)}
            className={`min-h-[2.875rem] shrink-0 rounded-full border px-3.5 text-sm font-semibold transition-colors ${
              active
                ? 'border-white bg-white text-brand-900'
                : 'border-white/25 bg-white/5 text-brand-100 hover:border-white/50'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
