import { useCallback, useEffect, useState } from 'react'
import { themeStore } from '../infrastructure/stores'

type Mode = 'light' | 'dark'

function systemMode(): Mode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(mode: Mode): void {
  document.documentElement.dataset.theme = mode
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#050b2e' : '#0000f0')
}

export function useTheme() {
  const [mode, setMode] = useState<Mode>(() => themeStore.load() ?? systemMode())

  useEffect(() => {
    apply(mode)
  }, [mode])

  // Follow the OS until the user makes an explicit choice.
  useEffect(() => {
    const stored = themeStore.load()
    if (stored) return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => setMode(event.matches ? 'dark' : 'light')
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setMode((current) => {
      const next: Mode = current === 'dark' ? 'light' : 'dark'
      themeStore.save(next)
      return next
    })
  }, [])

  return { mode, toggle, isDark: mode === 'dark' }
}
