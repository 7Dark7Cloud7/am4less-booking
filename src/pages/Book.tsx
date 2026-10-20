import { useCallback, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarCheck2 } from 'lucide-react'
import { useBooking, STEPS, type StepIndex } from '../hooks/useBooking'
import { submitBooking, leadMessage } from '../infrastructure/leadDelivery'
import { whatsappHref } from '../domain/business'
import { Stepper } from '../components/booking/Stepper'
import { PropertyStep } from '../components/booking/PropertyStep'
import { ServicesStep } from '../components/booking/ServicesStep'
import { ScheduleStep } from '../components/booking/ScheduleStep'
import { DetailsStep } from '../components/booking/DetailsStep'
import { ReviewStep } from '../components/booking/ReviewStep'
import { EstimatePanel } from '../components/booking/EstimatePanel'
import { SuccessPanel } from '../components/booking/SuccessPanel'
import { Button } from '../components/Button'
import { useReveal } from '../hooks/useReveal'
import type { Booking } from '../domain/types'

const STEP_PROMPTS: Record<StepIndex, { title: string; sub: string }> = {
  0: {
    title: 'What are we cleaning?',
    sub: 'Size and scope decide the crew we send. Your job plan updates on the side as you tap.'
  },
  1: { title: 'When do you need us?', sub: 'Recurring slots let us pre-stage equipment and hold your crew.' },
  2: {
    title: 'Where do we send the quote?',
    sub: 'No card, no deposit, no obligation. A coordinator confirms the slot and writes your price.'
  }
}

export function BookPage() {
  const controller = useBooking()
  const [success, setSuccess] = useState<Booking | null>(null)
  useReveal([success?.reference ?? 'form'])

  const handleSubmit = useCallback(
    async (booking: Booking) => {
      controller.setSubmitting(true)
      const result = await submitBooking(booking)
      controller.setSubmitting(false)
      if (result.ok) {
        setSuccess(booking)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      // Even a failed send keeps the lead — surface the manual path instead.
      setSuccess(booking)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [controller]
  )

  if (success) {
    return (
      <div className="mx-auto max-w-3xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-10">
        <SuccessPanel
          booking={success}
          onReset={() => {
            controller.reset()
            setSuccess(null)
          }}
        />
        {controller.draft.contact.phone && (
          <p className="mt-6 text-center text-sm text-ink-faint">
            Want to talk it through?{' '}
            <a href={whatsappHref(leadMessage(success))} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Message the crew lead
            </a>
            .
          </p>
        )}
      </div>
    )
  }

  const { step, next, back, goTo, estimate, plan, draft } = controller

  return (
    <div className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white dark:bg-brand-400 dark:text-brand-950">
          <CalendarCheck2 className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Book a cleaning</h1>
          <p className="text-sm text-ink-soft">Step {step + 1} of {STEPS.length} · {STEPS[step]}</p>
        </div>
      </div>

      <Stepper step={step} onJump={goTo} />

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-live="polite">
          <h2 className="text-xl font-bold">{STEP_PROMPTS[step].title}</h2>
          <p className="mt-1 mb-6 text-sm text-ink-soft">{STEP_PROMPTS[step].sub}</p>

          {step === 0 && (
            <div className="space-y-10">
              <PropertyStep controller={controller} />
              <ServicesStep controller={controller} />
            </div>
          )}
          {step === 1 && <ScheduleStep controller={controller} />}
          {step === 2 && (
            <div className="space-y-10">
              <DetailsStep controller={controller} />
              <ReviewStep controller={controller} onSubmit={(b) => void handleSubmit(b)} />
            </div>
          )}

          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            {step > 0 && (
              <Button variant="outline" onClick={back} iconLeft={<ArrowLeft className="size-4" aria-hidden="true" />}>
                Back
              </Button>
            )}
            {step < STEPS.length - 1 && (
              <Button onClick={next} iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
                Continue
              </Button>
            )}
            <p className="ms-auto hidden text-xs text-ink-faint sm:block">Autosaved on this device</p>
          </div>
        </section>

        <EstimatePanel plan={plan} estimate={estimate} frequency={draft.frequency} serviceCount={draft.serviceIds.length} />
      </div>
    </div>
  )
}
