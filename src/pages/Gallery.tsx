import { useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { GALLERY_FILTERS, SHOTS, fullSrc, thumbSrc, type GalleryCat, type Shot } from '../domain/media'
import { RouteButton } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/ui'

type Filter = GalleryCat | 'all'

function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!el.open) el.showModal()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    el.addEventListener('close', onClose)
    window.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('close', onClose)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-0 grid max-h-dvh w-full max-w-[min(100%,64rem)] place-items-center bg-transparent p-0 backdrop:bg-inverse/85 backdrop:backdrop-blur-sm"
    >
      <div className="flex min-h-0 w-full flex-col items-center gap-3 p-3 sm:p-6">
        <img
          src={fullSrc(shot)}
          alt={shot.alt}
          width={shot.w}
          height={shot.h}
          className="max-h-[72dvh] w-auto max-w-full rounded-[var(--radius-card)] object-contain shadow-[var(--shadow-lift)]"
        />
        <div className="flex w-full items-start justify-between gap-4">
          <p className="text-sm text-inverse-ink">{shot.alt}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  )
}

export function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Shot | null>(null)
  const shown = useMemo(() => (filter === 'all' ? SHOTS : SHOTS.filter((s) => s.cat === filter)), [filter])

  return (
    <div className="am4-route">
      <PageHero
        title={<>Our work.<br /><span>Photos, not promises.</span></>}
        intro={`${SHOTS.length} real job-site photos from offices, schools, healthcare and exteriors across Bucks and Lehigh County. No stock imagery — tap any photo to see it full size.`}
      />

      <div className="mx-auto max-w-7xl px-[clamp(1rem,0.5rem+2vw,2rem)] py-10">
        <div
          role="group"
          aria-label="Filter photos by type of work"
          className="no-scrollbar -mx-[clamp(1rem,0.5rem+2vw,2rem)] flex snap-x gap-2 overflow-x-auto px-[clamp(1rem,0.5rem+2vw,2rem)] pb-3"
        >
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-[2.75rem] shrink-0 snap-start rounded-full border px-4 text-sm font-semibold transition-colors ${
                filter === f.id
                  ? 'border-am4-blue bg-am4-blue text-white'
                  : 'border-line-strong bg-surface text-ink-soft hover:border-brand-400 hover:text-brand-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {shown.length} photos shown
        </p>

        <div className="mt-6 columns-2 gap-3 md:columns-3 lg:columns-4 [column-fill:_balance]">
          {shown.map((shot) => (
            <button
              key={shot.slug}
              type="button"
              onClick={() => setOpen(shot)}
              aria-label={`Open photo: ${shot.alt}`}
              className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-muted text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <img
                src={thumbSrc(shot)}
                alt=""
                width={shot.w}
                height={shot.h}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
              />
              <span className="block p-2.5 text-xs font-semibold text-ink-soft line-clamp-2">{shot.alt}</span>
            </button>
          ))}
        </div>

        <div className="card-surface mt-10 p-8 text-center">
          <SectionHeading
            title="Want this standard in your building?"
            intro="Send the square footage and the room types. A crew lead scopes it and you get a written number back."
            center
          />
          <RouteButton to="/book" variant="primary" size="lg" className="mt-6">
            Start my booking
          </RouteButton>
        </div>
      </div>

      {open && <Lightbox shot={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
