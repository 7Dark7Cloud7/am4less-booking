# Agent instructions — AM4LESS booking

Read this before writing code in this repo. `HANDOFF.md` has the full developer brief; this file is
the short list of rules that AI coding assistants (Qoder, Claude, Cursor, Copilot) tend to break.

## Commands

```bash
npm install
npm run dev         # http://localhost:5173
npm run typecheck   # tsc --noEmit — must stay clean
npm run test        # vitest run — domain rules suite, must stay green
npm run build       # typecheck + vite build -> dist/
npm run photos      # rebuild photo assets + photos.generated.ts from photos-src/
npm run icons       # regenerate PWA icons from public/brand/logo-am4less.webp

# Native Android shell (Capacitor). Needs JDK 21 + Android SDK; android/ is gitignored.
npm run native:add    # first time: build:native + cap add android
npm run native:sync   # build:native + cap sync
npm run native:apk    # debug APK at android/app/build/outputs/apk/debug/app-debug.apk
```

CI (`.github/workflows/ci.yml`) runs `npm ci` → `typecheck` → `test` → `build` on every push and PR, then fails
if `PUBLIC_PRICING` is no longer `false`. The tests cover the pure `src/domain/*` layer only — there is no
component or E2E runner, so browser QA is still required (checklist in `HANDOFF.md` §9).

## Product rules — do not violate

1. **Never publish a price.** `src/domain/config.ts` → `PUBLIC_PRICING = false`. The estimator
   (`src/domain/estimate.ts` → `estimateFor`) computes dollars on purpose: those numbers go only to the
   owner's webhook payload, never to the screen. Customer-facing surfaces show `jobPlanFor()` instead —
   crew size, hours on site, visits per month. No `$` may appear in rendered UI while the flag is false —
   `src/domain/pricing-rules.test.ts` walks every bookable line × property type × frequency to prove it.
2. **Only the cleaning lines are bookable.** 9 of the 18 catalogue lines carry `comingSoon: true` in
   `src/domain/services.ts`. They render as greyed "coming soon" cards on `/services` and must stay
   unselectable in the booking wizard. Never add a coming-soon line to a filter, count, CTA or shortcut.
   To launch a line: delete its `comingSoon: true` and let `BOOKABLE` re-derive everything — but ask the owner
   first; `src/domain/services.test.ts` lists the nine bookable ids by name on purpose.
3. **Don't invent business facts.** Phone, WhatsApp, email, hours and coverage all come from
   `src/domain/business.ts` — the only unconfirmed value there is `email`. No fake testimonials, no
   certifications, no guarantees the owner hasn't made.

## Code rules

- Layers, one direction only: `pages → hooks → domain`; browser APIs live in `src/infrastructure`.
  `src/domain/*` must stay importable in Node (no `window`, `localStorage`, `fetch`).
- `noUncheckedIndexedAccess` is ON: `arr[0]` is `T | undefined`. Handle it or add a typed fallback.
- Domain rules are pinned by `src/domain/*.test.ts` (Vitest, node environment — no DOM, no `localStorage`).
  Change a rule and change its test in the same commit; never edit an assertion just to make CI go green.
- Size limits: functions ≤ 50 lines, components ≤ 80 lines, files ≤ 200 lines, nesting ≤ 3.
- No comments unless the *why* is non-obvious. No new abstractions for a single call site.
- Styling: Tailwind v4 with the semantic tokens in `src/index.css` (`text-ink`, `text-ink-soft`,
  `bg-surface-muted`, `border-line`, `brand-*`, `accent-*`). No raw hex, no arbitrary px values, no new
  shadow/radius one-offs.
- Accessibility is a done-state, not a later task: AA contrast in **both** themes, ≥ 44 px tap targets,
  visible focus ring, labels on every input, `aria-live` on wizard status, no horizontal scroll at 320 px.
- Never hand-edit `src/domain/photos.generated.ts` (generated) and never add `/photos/**` back into the
  service worker precache (it blocks install; they are runtime-cached instead).
- The home page runs in the `.lux` world (`obsidian`/`ivory`/`gold` tokens, Outfit + Plus Jakarta Sans).
  It is scoped to `/` only — `Header`/`Footer`/`MobileNav`/`TabBar` take a `lux` tone, everything else keeps
  the light commercial shell. Do not use `lux` tokens in the booking flow, and never publish a price from it.
- Native builds must not ship a service worker: `npm run build:native` runs `vite build --mode native`, which
  skips `vite-plugin-pwa`. A precached `/index.html` in a Capacitor WebView survives APK updates.

## Deploy gotchas

- `vercel.json` must keep the SPA rewrite `/(.*) → /index.html`. **Adding `cleanUrls` breaks every deep
  link** (`/book`, `/gallery`) with a 404. This has already happened once.
- On Windows, the Vercel CLI needs `node --use-system-ca node_modules/vercel/dist/vc.js deploy --prod`,
  otherwise TLS verification fails with `fetch failed`.
- Never commit `.env*` or `.vercel/` (they hold a Vercel OIDC token). They are gitignored — keep it that way.
- Preview deploys sit behind Vercel Authentication; the production alias is public.

## Done means

`npm run typecheck && npm run test && npm run build` clean, the change checked in both themes at 320/390/768/1440, zero
dollar figures in rendered text, coming-soon lines still unselectable, and deep links still resolve.
