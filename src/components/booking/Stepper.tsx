import { Check } from 'lucide-react'
import { STEPS, type StepIndex } from '../../hooks/useBooking'

/** Phone-width labels: the full names only fit from 640px up. */
const SHORT_LABELS: Record<(typeof STEPS)[number], string> = {
  'Space & services': 'Space',
  Schedule: 'Schedule',
  'Contact & send': 'Contact'
}

export function Stepper({ step, onJump }: { step: StepIndex; onJump: (index: StepIndex) => void }) {
  const percent = (step / (STEPS.length - 1)) * 100

  return (
    <div className="mb-6">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-am4-blue transition-[width] duration-400 ease-out"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Booking progress"
        />
      </div>

      <ol className="mt-4 flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {STEPS.map((label, index) => {
          const done = index < step
          const current = index === step
          return (
            <li key={label} className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => index <= step && onJump(index as StepIndex)}
                disabled={index > step}
                aria-label={`Step ${index + 1} of ${STEPS.length}: ${label}`}
                aria-current={current ? 'step' : undefined}
                className={`flex min-h-[2.75rem] w-full items-center justify-center gap-1.5 rounded-full border px-2 py-1.5 text-left text-xs font-semibold transition-colors sm:justify-start sm:gap-2 sm:px-3 ${
                  current
                    ? 'border-am4-blue bg-am4-blue text-am4-soft'
                    : done
                      ? 'border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/50 dark:text-brand-200'
                      : 'border-line bg-surface text-ink-faint cursor-not-allowed'
                }`}
              >
                <span className="hidden size-5 shrink-0 place-items-center rounded-full border border-current text-[0.65rem] sm:grid">
                  {done ? <Check className="size-3" strokeWidth={3} /> : index + 1}
                </span>
                <span className="truncate sm:hidden">{SHORT_LABELS[label]}</span>
                <span className="hidden truncate sm:inline">{label}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
