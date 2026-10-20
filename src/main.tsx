import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import { App } from './App'
import { ThemeProvider } from './components/ThemeProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

// Ask once, then let the next visit pick up the new version.
const updateSW = registerSW({
  onNeedRefresh() {
    if (window.confirm('A new version of AM4LESS is ready. Reload to update?')) void updateSW(true)
  }
})
