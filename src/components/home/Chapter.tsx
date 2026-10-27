import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
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
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface-raised shadow-card">
      <Photo slot={data.photo} ratio="16 / 10" className="w-full" />
      <div className="flex flex-1 flex-col p-6">
        <span className="self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-200">{data.eyebrow}</span>
        <h3 className="mt-3 text-2xl font-bold">{data.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{data.body}</p>
        <details className="mt-4 border-t border-line text-sm text-ink-soft">
          <summary className="min-h-11 cursor-pointer content-center font-semibold text-ink">What’s included</summary>
          <ul className="list-disc space-y-2 pb-4 pl-5">{data.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </details>
        <Link to="/services" className="mt-auto inline-flex min-h-11 items-center justify-between border-t border-line pt-3 font-bold text-brand-700 no-underline dark:text-brand-200">
          Explore this service <ArrowUpRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
