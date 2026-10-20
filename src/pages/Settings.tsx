import { useState } from 'react'
import { Download, Moon, Save, Smartphone, Sun, Trash2, Zap } from 'lucide-react'
import {
  getWebhookUrl,
  isWebhookConfigured,
  setWebhookUrl,
  WEBHOOK_SETTING_KEY
} from '../infrastructure/leadDelivery'
import { leadStore } from '../infrastructure/stores'
import { useAppTheme } from '../components/ThemeProvider'
import { useInstallPrompt } from '../hooks/useInstallPrompt'
import { Button } from '../components/Button'
import { Callout, SectionHeading } from '../components/ui'
import { TextField } from '../components/Field'

export function SettingsPage() {
  const [url, setUrl] = useState(getWebhookUrl)
  const [saved, setSaved] = useState(false)
  const [cleared, setCleared] = useState(false)
  const { isDark, toggle } = useAppTheme()
  const { canInstall, installed, install, isIos } = useInstallPrompt()

  function save() {
    const trimmed = url.trim()
    if (trimmed && !/^https:\/\/[^\s]+$/i.test(trimmed)) return
    setWebhookUrl(trimmed)
    setUrl(trimmed)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  function wipe() {
    leadStore.list().forEach((booking) => leadStore.remove(booking.reference))
    localStorage.removeItem(WEBHOOK_SETTING_KEY)
    setUrl('')
    setCleared(true)
    window.setTimeout(() => setCleared(false), 2500)
  }

  return (
    <section className="mx-auto max-w-3xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-14">
      <SectionHeading
        eyebrow="Owner tools"
        title="Business settings"
        intro="This screen exists so the lead pipeline can be switched on without redeploying anything."
      />

      <div className="mt-8 space-y-6">
        <div className="card-surface p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Zap className="size-5 text-brand-600 dark:text-brand-300" aria-hidden="true" />
            Lead endpoint
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Paste an HTTPS URL that accepts JSON — a Zapier or Make webhook, an n8n node, a Google Apps Script, a
            Supabase edge function, or your own <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">POST /api/leads</code>.
            Every booking is then delivered there automatically and the WhatsApp fallback disappears.
          </p>

          <div className="mt-4">
            <TextField
              id="webhook"
              label="Endpoint URL"
              placeholder="https://hooks.zapier.com/hooks/catch/000000/abcdef/"
              value={url}
              onChange={setUrl}
              hint={
                isWebhookConfigured()
                  ? 'Connected. Bookings post here as JSON.'
                  : 'Leave blank to keep manual WhatsApp / text / email delivery.'
              }
              error={url.trim() && !/^https:\/\/[^\s]+$/i.test(url.trim()) ? 'Must start with https://' : undefined}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <Button onClick={save} iconLeft={<Save className="size-4" aria-hidden="true" />}>
              {saved ? 'Saved' : 'Save endpoint'}
            </Button>
            <Button variant="outline" onClick={() => setUrl('')}>
              Clear field
            </Button>
          </div>

          <p className="mt-4 text-xs text-ink-faint">
            The payload includes reference, name, phone, email, address, property type, square footage, services,
            add-ons, frequency, date, time window, notes and the estimate total.
          </p>
        </div>

        <div className="card-surface p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Smartphone className="size-5 text-brand-600 dark:text-brand-300" aria-hidden="true" />
            Install on a phone
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            {installed
              ? 'This copy is already running as an installed app.'
              : isIos
                ? 'On iPhone or iPad: Share → Add to Home Screen. Android: Chrome menu → Add to Home screen, or use the button below.'
                : 'Chrome menu → Add to Home screen. It then opens full-screen, keeps unfinished quotes, and works offline.'}
          </p>
          {canInstall && (
            <Button
              className="mt-4"
              onClick={() => void install()}
              iconLeft={<Download className="size-4" aria-hidden="true" />}
            >
              Install AM4LESS
            </Button>
          )}
        </div>

        <div className="card-surface p-6">
          <h2 className="text-lg font-bold">Appearance</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Currently in {isDark ? 'dark' : 'light'} mode. The choice is remembered on this device.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={toggle}
            iconLeft={isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
          >
            Switch to {isDark ? 'light' : 'dark'} mode
          </Button>
        </div>

        <div className="card-surface p-6">
          <h2 className="text-lg font-bold text-danger">Reset this device</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Deletes saved bookings, the lead endpoint and any half-finished quote stored here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Button
              variant="outline"
              className="border-danger/60 text-danger"
              onClick={wipe}
              iconLeft={<Trash2 className="size-4" aria-hidden="true" />}
            >
              {cleared ? 'Cleared' : 'Clear saved data'}
            </Button>
          </div>
          <Callout tone="warn">
            There is no server-side archive until you connect an endpoint. Clearing before then permanently loses those
            requests.
          </Callout>
        </div>
      </div>
    </section>
  )
}
