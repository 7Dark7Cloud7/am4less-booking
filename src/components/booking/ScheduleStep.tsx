import { CalendarDays, Clock, Lock, Sun, Sunset, Sunrise } from 'lucide-react'
import { FREQUENCY_DISCOUNT, FREQUENCY_LABELS } from '../../domain/estimate'
import { isPast, todayIso } from '../../domain/validation'
import { TIME_SLOT_LABELS, type Frequency, type TimeSlot } from '../../domain/types'
import type { BookingController } from '../../hooks/useBooking'
import { TextArea } from '../Field'

const FREQUENCIES = Object.keys(FREQUENCY_LABELS) as Frequency[]

const SLOT_ICONS: Record<TimeSlot, typeof Sunrise> = {
  morning: Sunrise,
  midday: Sun,
  evening: Sunset,
  overnight: Lock
}

const SLOT_NOTES: Record<TimeSlot, string> = {
  morning: 'Before the first staff arrive',
  midday: 'During trading hours',
  evening: 'As the building winds down',
  overnight: 'Zero disruption — best for offices and retail'
}

export function ScheduleStep({ controller }: { controller: BookingController }) {
  const { draft, patch, errors, showErrors } = controller

  return (
    <div className="space-y-7">
      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-sm font-semibold text-ink">How often do you need us?</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FREQUENCIES.map((frequency) => {
            const active = draft.frequency === frequency
            const discount = FREQUENCY_DISCOUNT[frequency]
            return (
              <button
                key={frequency}
                type="button"
                aria-pressed={active}
                onClick={() => patch({ frequency })}
                className={`flex min-h-[3.75rem] flex-col items-start gap-0.5 rounded-[var(--radius-field)] border px-4 py-3 text-left transition-colors ${
                  active
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/50'
                    : 'border-line-strong bg-surface hover:border-brand-300 hover:bg-surface-muted'
                }`}
              >
                <span className={`text-sm font-bold ${active ? 'text-brand-700 dark:text-brand-100' : 'text-ink'}`}>
                  {FREQUENCY_LABELS[frequency]}
                </span>
                {discount > 0 ? (
                  <span className="text-xs font-semibold text-success">Pre-staged crew — better written rate</span>
                ) : (
                  <span className="text-xs text-ink-faint">Single mobilisation</span>
                )}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink">
            <CalendarDays className="size-4 text-brand-600 dark:text-brand-300" aria-hidden="true" />
            Target date <span className="text-danger">*</span>
          </label>
          <input
            id="preferredDate"
            type="date"
            className="field-control"
            min={todayIso()}
            value={draft.preferredDate ?? ''}
            aria-invalid={showErrors && errors.preferredDate ? true : undefined}
            aria-describedby={showErrors && errors.preferredDate ? 'date-error' : undefined}
            onChange={(event) => patch({ preferredDate: event.target.value || null })}
          />
          {showErrors && errors.preferredDate && (
            <p id="date-error" role="alert" className="mt-1.5 text-xs font-semibold text-danger">
              {errors.preferredDate}
            </p>
          )}
        </div>

        <div>
          <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink">
            <Clock className="size-4 text-brand-600 dark:text-brand-300" aria-hidden="true" />
            Time window <span className="text-danger">*</span>
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(TIME_SLOT_LABELS) as TimeSlot[]).map((slot) => {
              const Icon = SLOT_ICONS[slot]
              const active = draft.preferredTime === slot
              return (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={active}
                  onClick={() => patch({ preferredTime: slot })}
                  className={`flex min-h-[3.25rem] items-center gap-2.5 rounded-[var(--radius-field)] border px-3 py-2 text-left transition-colors ${
                    active
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/50'
                      : 'border-line-strong bg-surface hover:border-brand-300'
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${active ? 'text-brand-600' : 'text-ink-faint'}`} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs font-bold">{TIME_SLOT_LABELS[slot]}</span>
                    <span className="block text-[0.7rem] text-ink-faint">{SLOT_NOTES[slot]}</span>
                  </span>
                </button>
              )
            })}
          </div>
          {showErrors && errors.preferredTime && (
            <p role="alert" className="mt-1.5 text-xs font-semibold text-danger">
              {errors.preferredTime}
            </p>
          )}
        </div>
      </div>

      <TextArea
        id="accessNotes"
        label="Access & logistics"
        placeholder="Alarm code, loading dock, dock hours, pets on site, parking, floor number, badge required…"
        value={draft.accessNotes}
        onChange={(value) => patch({ accessNotes: value })}
        hint="Anything that would slow a crew down on the day. Two lines is plenty."
      />

      {isPast(draft.preferredDate ?? todayIso()) && (
        <p className="text-sm font-semibold text-danger">The date you picked has already passed.</p>
      )}
    </div>
  )
}
