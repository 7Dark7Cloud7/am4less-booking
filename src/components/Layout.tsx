import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { TabBar } from './TabBar'
import { useReveal } from '../hooks/useReveal'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function Layout() {
  const { pathname } = useLocation()
  useReveal([pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="fixed top-2 left-2 z-[60] -translate-y-[200%] rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white no-underline focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <TabBar />
    </div>
  )
}
