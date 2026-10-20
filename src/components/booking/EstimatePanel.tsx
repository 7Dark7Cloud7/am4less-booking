import { CalendarClock, Info, ReceiptText, Ruler, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { PUBLIC_PRICING } from '../../domain/config'
import { FREQUENCY_LABELS, currency } from '../../domain/estimate'
import type { JobPlan } from '../../domain/estimate'
import type { Estimate, Frequency } from '../../domain/types'

export function EstimatePanel({
  plan,
  estimate,
  frequency,
  serviceCount
}: {
  plan: JobPlan
  estimate: Estimate
  frequency: Frequency
  serviceCount: number
}) {
  const empty = serviceCount === 0

  return (
    <aside
      aria-live="polite"
      className="card-surface sticky top-[5.5rem] p-5"
      style={{ background: 'var(--color-surface-raised)' }}
    >
      <h2 className="flex items-center gap-2 text-base font-bold">
        <Ruler className="size-5 text-brand-600 dark:text-brand-300" aria-hidden="true" />
        Your job plan
      </h2>

      {empty ? (
        <p className="mt-3 text-sm text-ink-soft">
          Tap the services you want. We size the crew and the time on site as you go, then a crew lead writes back a
          price — usually the same day.
        </p>
      ) : (
        <dl className="mt-4 space-y-3">
          <Metric
            icon={<Users className="size-4" aria-hidden="true" />}
            term="Crew"
            value={`${plan.crewSize} technician${plan.crewSize === 1 ? '' : 's'}`}
            sub={`${plan.crewHours} labour-hours of work`}
          />
          <Metric
            icon={<CalendarClock className="size-4" aria-hidden="true" />}
            term="Time on site"
            value={`About ${plan.elapsedHours} hour${plan.elapsedHours === 1 ? '' : 's'}`}
            sub={plan.cadence}
          />
          <Metric
            icon={<ReceiptText className="size-4" aria-hidden="true" />}
            term="Price"
            value={PUBLIC_PRICING ? currency(estimate.total) : 'Written after survey'}
            sub={
              PUBLIC_PRICING
                ? estimate.recurringMonthly !== null
                  ? `${currency(estimate.recurringMonthly)} approx. per month`
                  : FREQUENCY_LABELS[frequency]
                : plan.needsSurvey
                  ? 'Free walkthrough — no obligation'
                  : 'We confirm it before anyone arrives'
            }
            emphasise
          />
        </dl>
      )}

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-surface-muted p-3 text-xs text-ink-soft">
        <Info className="mt-px size-4 shrink-0" aria-hidden="true" />
        <p>
          {PUBLIC_PRICING
            ? 'Non-binding. Condition, access and waste volume move the final number.'
            : 'We do not publish a rate card. Floor condition, access and waste volume decide the price, so a crew lead writes it after seeing the space — never a call centre.'}
        </p>
      </div>
    </aside>
  )
}

function Metric({
  icon,
  term,
  value,
  sub,
  emphasise = false
}: {
  icon: ReactNode
  term: string
  value: string
  sub: string
  emphasise?: boolean
}) {
  return (
    <div className="flex items-start gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600/10 text-brand-700 dark:text-brand-300">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[0.7rem] font-bold tracking-wide text-ink-faint uppercase">{term}</dt>
        <dd className={emphasise ? 'font-bold text-brand-700 dark:text-brand-300' : 'font-semibold text-ink'}>
          {value}
        </dd>
        <dd className="text-xs text-ink-soft">{sub}</dd>
      </div>
    </div>
  )
}
