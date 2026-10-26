import { useState } from 'react'
import { PHOTOS, PHOTO_SHOT, type PhotoKey } from '../domain/media'

interface PhotoProps {
  slot: PhotoKey
  /** Falls back to the caption stored with the photo. */
  alt?: string
  /** CSS aspect-ratio value, e.g. '4 / 3'. */
  ratio?: string
  className?: string
  eager?: boolean
  /** Overlay tint so white text stays legible whatever the photo turns out to be. */
  scrim?: 'none' | 'dark' | 'brand'
}

export function Photo({ slot, alt, ratio = '4 / 3', className = '', eager = false, scrim = 'none' }: PhotoProps) {
  const shot = PHOTO_SHOT[slot]
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-brand-100 dark:bg-brand-900/50 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--color-brand-400),var(--color-brand-800))]">
          <img src="/brand/logo-am4less.webp" alt="" aria-hidden="true" className="size-1/3 max-w-32 opacity-90" loading="lazy" />
        </div>
      ) : (
        <img
          src={PHOTOS[slot]}
          alt={alt ?? shot.alt}
          width={shot.w}
          height={shot.h}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
      {scrim === 'dark' && (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-900/35 to-transparent" />
      )}
      {scrim === 'brand' && (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-brand-950/85 via-brand-900/45 to-transparent" />
      )}
    </div>
  )
}
