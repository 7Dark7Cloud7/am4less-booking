import { Photo } from '../Photo'
import type { PhotoKey } from '../../domain/media'

export interface ChapterData {
  eyebrow: string
  title: string
  body: string
  bullets: readonly string[]
  meta: readonly { label: string; value: string }[]
  photo: PhotoKey
  inset: PhotoKey
  flip?: boolean
}

export function Chapter({ data }: { data: ChapterData }) {
  const { eyebrow, title, body, bullets, meta, photo, inset, flip } = data

  return (
    <article className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={flip ? 'lg:order-2' : ''}>
        <p className="lux-eyebrow">{eyebrow}</p>
        <h3 className="mt-5 text-[clamp(1.8rem,3.2vw,2.9rem)] font-light text-lux-fg">{title}</h3>
        <p className="mt-5 max-w-lg leading-relaxed text-lux-fg-soft">{body}</p>

        <ul className="mt-8 border-t border-white/10">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-4 border-b border-white/10 py-3.5 text-sm text-lux-fg/85">
              <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rotate-45 bg-accent-400" />
              {bullet}
            </li>
          ))}
        </ul>

        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-[0.6rem] font-semibold tracking-[0.24em] text-lux-fg-faint uppercase">{item.label}</dt>
              <dd className="mt-1 text-sm font-medium text-lux-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={`relative pb-10 ${flip ? 'lg:order-1' : ''}`}>
        <Photo slot={photo} ratio="4 / 5" scrim="dark" className="w-full" />
        <div className="absolute bottom-0 left-4 w-[44%] border-4 border-lux-base sm:-bottom-8 sm:left-0">
          <Photo slot={inset} ratio="4 / 3" className="w-full" />
        </div>
        <span aria-hidden="true" className="absolute top-6 -left-px h-16 w-px bg-accent-400/80" />
      </div>
    </article>
  )
}
