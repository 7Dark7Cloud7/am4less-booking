import { ShieldCheck } from 'lucide-react'
import { formatPhone, digits } from '../../domain/validation'
import type { BookingController } from '../../hooks/useBooking'
import { ChoiceCard, TextArea, TextField } from '../Field'

export function DetailsStep({ controller }: { controller: BookingController }) {
  const { draft, patchContact, errors, showErrors } = controller
  const c = draft.contact
  const err = (key: string) => (showErrors ? errors[key] : undefined)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="firstName"
          label="First name"
          required
          autoComplete="given-name"
          value={c.firstName}
          onChange={(value) => patchContact({ firstName: value })}
          error={err('firstName')}
        />
        <TextField
          id="lastName"
          label="Last name"
          required
          autoComplete="family-name"
          value={c.lastName}
          onChange={(value) => patchContact({ lastName: value })}
          error={err('lastName')}
        />
        <TextField
          id="phone"
          label="Mobile phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(267) 555-0142"
          value={c.phone}
          onChange={(value) => patchContact({ phone: formatPhone(value) })}
          error={err('phone')}
          hint="We text a confirmation and a reminder the morning before."
        />
        <TextField
          id="email"
          label="Email"
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={c.email}
          onChange={(value) => patchContact({ email: value.trim() })}
          error={err('email')}
          hint="The written quote lands here."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-6">
        <TextField
          id="address"
          className="sm:col-span-6"
          label="Service address"
          required
          autoComplete="street-address"
          placeholder="Street and unit / suite number"
          value={c.address}
          onChange={(value) => patchContact({ address: value })}
          error={err('address')}
        />
        <TextField
          id="city"
          className="sm:col-span-3"
          label="City"
          required
          autoComplete="address-level2"
          value={c.city}
          onChange={(value) => patchContact({ city: value })}
          error={err('city')}
        />
        <TextField
          id="zip"
          className="sm:col-span-3"
          label="ZIP code"
          required
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={c.zip}
          onChange={(value) => patchContact({ zip: digits(value).slice(0, 5) })}
          error={err('zip')}
        />
      </div>

      <TextArea
        id="notes"
        label="Anything else we should know?"
        placeholder="Stains we should pre-treat, areas to avoid, invoicing contact, building manager name…"
        value={c.notes}
        onChange={(value) => patchContact({ notes: value })}
      />

      <ChoiceCard
        checked={c.consent}
        onChange={() => patchContact({ consent: !c.consent })}
        title="I agree that AM4LESS may contact me about this request"
        subtitle="Calls, text or email about this booking only. No lists, no resale — your number stays with the job."
      />
      {showErrors && errors.consent && (
        <p role="alert" className="text-sm font-semibold text-danger">
          {errors.consent}
        </p>
      )}

      <p className="flex items-start gap-2 text-xs text-ink-faint">
        <ShieldCheck className="mt-px size-4 shrink-0" aria-hidden="true" />
        This form stores your request on this device and sends it to the AM4LESS team. We never ask for a card to book
        or quote.
      </p>
    </div>
  )
}
