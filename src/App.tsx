import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'

const HomePage = lazy(() => import('./pages/Home').then((m) => ({ default: m.HomePage })))
const ServicesPage = lazy(() => import('./pages/Services').then((m) => ({ default: m.ServicesPage })))
const GalleryPage = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.GalleryPage })))
const AboutPage = lazy(() => import('./pages/About').then((m) => ({ default: m.AboutPage })))
const TrainingPage = lazy(() => import('./pages/Training').then((m) => ({ default: m.TrainingPage })))
const CareersPage = lazy(() => import('./pages/Careers').then((m) => ({ default: m.CareersPage })))
const ContactPage = lazy(() => import('./pages/Contact').then((m) => ({ default: m.ContactPage })))
const BookPage = lazy(() => import('./pages/Book').then((m) => ({ default: m.BookPage })))
const AccountPage = lazy(() => import('./pages/Account').then((m) => ({ default: m.AccountPage })))
const SettingsPage = lazy(() => import('./pages/Settings').then((m) => ({ default: m.SettingsPage })))
const NotFoundPage = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFoundPage })))

function RouteFallback() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center" role="status" aria-live="polite">
      <span className="mx-auto block size-10 animate-spin rounded-full border-4 border-line border-t-brand-600" />
      <p className="mt-4 text-sm text-ink-soft">Loading…</p>
    </div>
  )
}

export function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="book" element={<BookPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
