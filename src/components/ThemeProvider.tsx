import { createContext, useContext, type ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme'

type ThemeValue = ReturnType<typeof useTheme>

const ThemeContext = createContext<ThemeValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useTheme()
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useAppTheme(): ThemeValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useAppTheme must be used inside ThemeProvider')
  return context
}
