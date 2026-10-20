import { Building2, ChevronRight } from 'lucide-react'
import { PROPERTY_LABELS } from '../../domain/estimate'
import type { PropertyType } from '../../domain/types'
import type { BookingController } from '../../hooks/useBooking'
import { TextField } from '../Field'

const PROPERTY_TYPES = Object.keys(PROPERTY_LABELS) as PropertyType[]

const SIZE_PRESETS = [
  { label: 'Under 1,000', value: 850 },
  { label: '1,000 – 5,000', value: 3000 },
  { label: '5,000 – 15,000', value: 10000 },
  { label: '15,000 – 40,000', value: 26000 },
  { label: '40,000+', value: 55000 }
]

export function PropertyStep({ controller }: { controller: BookingController }) {
  const { draft, patch, errors, showErrors } = controller

  return (
    <div className="space-y-7">
      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-sm font-semibold text-ink">What kind of space is this?</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTY_TYPES.map((type) => {
            const active = draft.propertyType === type
            return (
              <button
                key={type}
                type="button"
                aria-pressed={active}
                onClick={() => patch({ propertyType: type })}
                className={`flex min-h-[3.5rem] items-center gap-2.5 rounded-[var(--radius-field)] border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  active
                    ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:border-brand-400 dark:text-brand-100'
                    : 'border-line-strong bg-surface text-ink hover:border-brand-300 hover:bg-surface-muted'
                }`}
              >
                <Building2 className="size-4 shrink-0 opacity-70" aria-hidden="true" />
                {PROPERTY_LABELS[type]}
              </button>
            )
          })}
        </div>
        {showErrors && errors.propertyType && (
          <p role="alert" className="mt-2 text-sm font-semibold text-danger">
            {errors.propertyType}
          </p>
        )}
      </fieldset>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink">
          Rough square footage <span className="text-danger">*</span>
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          {SIZE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              aria-pressed={draft.squareFeet === preset.value}
              onClick={() => patch({ squareFeet: preset.value })}
              className={`min-h-[2.75rem] rounded-full border px-4 text-sm font-semibold transition-colors ${
                draft.squareFeet === preset.value
                  ? 'border-accent-500 bg-accent-500/20 text-accent-700 dark:text-accent-300'
                  : 'border-line-strong bg-surface text-ink-soft hover:border-accent-400'
              }`}
            >
              {preset.label} sq ft
            </button>
          ))}
        </div>
        <div className="max-w-xs">
          <TextField
            id="squareFeet"
            label="Exact figure (optional)"
            type="number"
            inputMode="numeric"
            min={50}
            max={5000000}
            placeholder="e.g. 12,400"
            value={draft.squareFeet === null ? '' : String(draft.squareFeet)}
            onChange={(raw) => patch({ squareFeet: raw === '' ? null : Number(raw) })}
            error={showErrors ? errors.squareFeet : undefined}
            hint="A ballpark is fine — we verify on the walkthrough."
          />
        </div>
      </div>

      <p className="flex items-center gap-2 rounded-[var(--radius-field)] bg-surface-muted p-4 text-sm text-ink-soft">
        <ChevronRight className="size-4 shrink-0 text-brand-600 dark:text-brand-300" aria-hidden="true" />
        The space decides the crew. Medical, school and construction work takes longer per square foot because of
        dwell times and dust, so the crew size and hours in your job plan rise with it.
      </p>
    </div>
  )
}
