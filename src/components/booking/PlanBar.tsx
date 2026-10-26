import { ArrowLeft, ArrowRight, Phone, Send } from 'lucide-react'
import { BUSINESS } from '../../domain/business'
import { PUBLIC_PRICING } from '../../domain/config'
import { currency } from '../../domain/estimate'
import { Button } from '../Button'
import type { Estimate } from '../../domain/types'
import type { JobPlan } from '../../domain/estimate'

interface PlanBarProps {
  plan: JobPlan
  estimate: Estimate
  serviceCount: number
  step: number
  lastStep: number
  onBack: () => void
  onNext: () => void
}

/**
 * Phone-size replacement for the sidebar: the job plan travels with the thumb instead of
 * sitting off-screen at the bottom of the page.
 */
export function PlanBar({ plan, estimate, serviceCount, step, lastStep, onBack, onNext }: PlanBarProps) {
  const headline =
    serviceCount === 0
      ? 'Pick a service — crew and time update here.'
      : `${plan.crewSize} technician${plan.crewSize === 1 ? '' : 's'} · about ${plan.elapsedHours} hr on site · ${
          PUBLIC_PRICING ? currency(estimate.total) : plan.needsSurvey ? 'price after a free walkthrough' : 'a crew lead writes the price'
        }`

  return (
    <div
      className="sticky bottom-0 z-30 -mx-[clamp(1rem,0.5rem+2vw,2rem)] border-t border-line bg-surface/95 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: 'var(--spacing-safe-bottom)' }}
    >
      <div className="px-[clamp(1rem,0.5rem+2vw,2rem)] py-3">
        <p className="mb-2.5 text-xs font-semibold text-ink-soft">{headline}</p>
        <div className="flex items-center gap-2">
          {step > 0 && (
            <Button variant="outline" size="md" onClick={onBack} iconLeft={<ArrowLeft className="size-4" aria-hidden="true" />}>
              Back
            </Button>
          )}
          {step < lastStep ? (
            <Button size="md" className="flex-1" onClick={onNext} iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
              Continue
            </Button>
          ) : (
            <Button
              size="md"
              className="flex-1"
              onClick={() => document.getElementById('send-booking')?.scrollIntoView({ block: 'center' })}
              iconRight={<Send className="size-4" aria-hidden="true" />}
            >
              Review &amp; send
            </Button>
          )}
          <a
            href={BUSINESS.phoneHref}
            aria-label={`Call ${BUSINESS.phoneDisplay}`}
            className="tap-target grid shrink-0 place-items-center rounded-full border border-line-strong text-brand-700 no-underline active:bg-surface-muted dark:text-brand-300"
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
