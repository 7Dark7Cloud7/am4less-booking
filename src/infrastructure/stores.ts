import { EMPTY_DRAFT } from '../domain/types'
import type { Booking, BookingDraft, BookingStatus } from '../domain/types'

const DRAFT_KEY = 'am4:booking-draft'
const LEADS_KEY = 'am4:leads'
const THEME_KEY = 'am4:theme'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or blocked (private mode) — the booking still sends live */
  }
}

/** The in-progress quote survives a refresh, a closed tab, or a dropped mobile connection. */
export const draftStore = {
  load(): BookingDraft {
    const stored = read<Partial<BookingDraft>>(DRAFT_KEY, {})
    return {
      ...EMPTY_DRAFT,
      ...stored,
      contact: { ...EMPTY_DRAFT.contact, ...(stored.contact ?? {}) }
    }
  },
  save(draft: BookingDraft): void {
    write(DRAFT_KEY, draft)
  },
  clear(): void {
    localStorage.removeItem(DRAFT_KEY)
  }
}

/** Every submitted request is stored on the device, so a failed send can be retried. */
export const leadStore = {
  list(): Booking[] {
    return read<Booking[]>(LEADS_KEY, []).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },
  add(booking: Booking): void {
    const all = read<Booking[]>(LEADS_KEY, [])
    write(LEADS_KEY, [booking, ...all].slice(0, 60))
  },
  find(reference: string): Booking | undefined {
    return read<Booking[]>(LEADS_KEY, []).find((b) => b.reference === reference)
  },
  setStatus(reference: string, status: BookingStatus): void {
    const all = read<Booking[]>(LEADS_KEY, [])
    write(
      LEADS_KEY,
      all.map((b) => (b.reference === reference ? { ...b, status } : b))
    )
  },
  remove(reference: string): void {
    write(
      LEADS_KEY,
      read<Booking[]>(LEADS_KEY, []).filter((b) => b.reference !== reference)
    )
  },
  markDelivered(reference: string): void {
    const all = read<Booking[]>(LEADS_KEY, [])
    write(
      LEADS_KEY,
      all.map((b) =>
        b.reference === reference ? { ...b, status: 'submitted', submittedAt: new Date().toISOString() } : b
      )
    )
  }
}

export const themeStore = {
  load(): 'light' | 'dark' | null {
    return read<'light' | 'dark' | null>(THEME_KEY, null)
  },
  save(mode: 'light' | 'dark'): void {
    write(THEME_KEY, mode)
  }
}
