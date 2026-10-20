import { Check } from 'lucide-react'
import { STEPS, type StepIndex } from '../../hooks/useBooking'

export function Stepper({ step, onJump }: { step: StepIndex; onJump: (index: StepIndex) => void }) {
  const percent = (step / (STEPS.length - 1)) * 100

  return (
    <div className="mb-6">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-400 ease-out dark:bg-brand-400"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Booking progress"
        />
      </div>

      <ol className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
        {STEPS.map((label, index) => {
          const done = index < step
          const current = index === step
          return (
            <li key={label} className="flex-1 min-w-max">
              <button
                type="button"
                onClick={() => index <= step && onJump(index as StepIndex)}
                disabled={index > step}
                aria-current={current ? 'step' : undefined}
                className={`flex min-h-[2.75rem] w-full items-center gap-2 rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition-colors ${
                  current
                    ? 'border-brand-600 bg-brand-600 text-white dark:border-brand-400 dark:bg-brand-400 dark:text-brand-950'
                    : done
                      ? 'border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/50 dark:text-brand-200'
                      : 'border-line bg-surface text-ink-faint cursor-not-allowed'
                }`}
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-current text-[0.65rem]">
                  {done ? <Check className="size-3" strokeWidth={3} /> : index + 1}
                </span>
                <span className="whitespace-nowrap">{label}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
