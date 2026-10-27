import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildBooking } from '../domain/booking'
import { estimateFor, isPropertyType, jobPlanFor } from '../domain/estimate'
import { isBookable } from '../domain/services'
import { validateDraftForSubmit } from '../domain/validation'
import { draftStore } from '../infrastructure/stores'
import type { BookingDraft, Booking } from '../domain/types'

export const STEPS = ['Space & services', 'Schedule', 'Contact & send'] as const
export type StepIndex = 0 | 1 | 2

/** A draft autosaved before a line went on hold must not carry it forward. */
function loadDraft(): BookingDraft {
  const stored = draftStore.load()
  const live = stored.serviceIds.filter(isBookable)
  const propertyType = isPropertyType(stored.propertyType) ? stored.propertyType : null
  return { ...stored, serviceIds: live, propertyType }
}

export function useBooking() {
  const [draft, setDraft] = useState<BookingDraft>(loadDraft)
  const [step, setStep] = useState<StepIndex>(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<Booking | null>(null)
  const firstRender = useRef(true)

  // Autosave: a half-finished quote is a lead we do not want to lose.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const id = window.setTimeout(() => draftStore.save(draft), 350)
    return () => window.clearTimeout(id)
  }, [draft])

  const estimate = useMemo(
    () => estimateFor(draft.serviceIds, draft.addons, draft.squareFeet, draft.propertyType, draft.frequency),
    [draft.serviceIds, draft.addons, draft.squareFeet, draft.propertyType, draft.frequency]
  )

  const plan = useMemo(
    () => jobPlanFor(draft.serviceIds, draft.addons, draft.squareFeet, draft.propertyType, draft.frequency),
    [draft.serviceIds, draft.addons, draft.squareFeet, draft.propertyType, draft.frequency]
  )

  const patch = useCallback((next: Partial<BookingDraft>) => {
    setDraft((current) => ({ ...current, ...next }))
    setErrors({})
  }, [])

  const patchContact = useCallback((next: Partial<BookingDraft['contact']>) => {
    setDraft((current) => ({ ...current, contact: { ...current.contact, ...next } }))
  }, [])

  const toggleService = useCallback((id: string) => {
    setDraft((current) => ({
      ...current,
      serviceIds: current.serviceIds.includes(id)
        ? current.serviceIds.filter((s) => s !== id)
        : [...current.serviceIds, id]
    }))
    setErrors((e) => ({ ...e, serviceIds: '' }))
  }, [])

  const toggleAddon = useCallback((id: string) => {
    setDraft((current) => ({
      ...current,
      addons: current.addons.includes(id) ? current.addons.filter((a) => a !== id) : [...current.addons, id]
    }))
  }, [])

  const validateStep = useCallback(
    (index: StepIndex): Record<string, string> => {
      if (index === 0) {
        const e: Record<string, string> = {}
        if (!draft.propertyType) e.propertyType = 'Choose what kind of property this is'
        if (!draft.squareFeet) e.squareFeet = 'Rough square footage — an estimate is fine'
        else if (draft.squareFeet < 50 || draft.squareFeet > 5_000_000)
          e.squareFeet = 'Enter a number between 50 and 5,000,000'
        if (draft.serviceIds.length === 0) e.serviceIds = 'Pick at least one service to continue'
        return e
      }
      if (index === 1) {
        const e: Record<string, string> = {}
        if (!draft.preferredDate) e.preferredDate = 'Pick the date you need us on site'
        if (!draft.preferredTime) e.preferredTime = 'Pick the time window that works'
        return e
      }
      return {}
    },
    [draft]
  )

  const goTo = useCallback(
    (index: StepIndex) => {
      setShowErrors(false)
      setErrors({})
      setStep(index)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    []
  )

  const next = useCallback(() => {
    const stepErrors = validateStep(step)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      setShowErrors(true)
      return false
    }
    if (step < STEPS.length - 1) goTo((step + 1) as StepIndex)
    return true
  }, [goTo, step, validateStep])

  const back = useCallback(() => {
    if (step > 0) goTo((step - 1) as StepIndex)
  }, [goTo, step])

  const previewBooking = useCallback(() => buildBooking(draft), [draft])

  const canSubmit = useMemo(() => Object.keys(validateDraftForSubmit(draft)).length === 0, [draft])

  const reset = useCallback(() => {
    draftStore.clear()
    setDraft(loadDraft())
    setStep(0)
    setErrors({})
    setShowErrors(false)
    setSubmitted(null)
  }, [])

  return {
    draft,
    patch,
    patchContact,
    toggleService,
    toggleAddon,
    estimate,
    plan,
    step,
    goTo,
    next,
    back,
    errors,
    showErrors,
    canSubmit,
    submitting,
    setSubmitting,
    submitted,
    setSubmitted,
    previewBooking,
    reset
  }
}

export type BookingController = ReturnType<typeof useBooking>
