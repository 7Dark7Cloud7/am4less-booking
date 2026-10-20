const LOGO = '/brand/logo-am4less.webp'

/**
 * The badge is 160px artwork, so it is never rendered much larger than that and
 * the wordmark is always set as live text rather than relying on the tiny type
 * inside the ring.
 */
export function BrandMark({ size = 40, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <img
        src={LOGO}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="shrink-0 rounded-full object-contain"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span className="min-w-0 truncate font-[family-name:var(--font-display)] leading-none">
          <span className="block text-[1.06rem] font-extrabold tracking-tight text-brand-700 dark:text-brand-300">
            AM4<span className="text-accent-600 dark:text-accent-400">LESS</span>
          </span>
          <span className="mt-0.5 block text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Cleaning Services
          </span>
        </span>
      )}
    </span>
  )
}
