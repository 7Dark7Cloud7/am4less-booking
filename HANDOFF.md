# Developer handoff — AM4LESS booking site

Everything a developer needs to pick this project up cold. Read sections 1–3 before touching code.

---

## 1. What this is

A single-page React application (installable PWA) for **AM4LESS**, a commercial & residential
cleaning company in Quakertown, PA (Bucks & Lehigh County). It replaces a marketing-only Duda
site with an **online client-acquisition tool**: browse services → get a scoped quote request →
send it to the crew — no account, no card, no backend required.

- **Source control:** https://github.com/7Dark7Cloud7/am4less-booking (private) — `main`, full app + `photos-src/`
- **Live production:** https://am4less-booking.vercel.app (Vercel project `am4less-booking`, team `7dark7cloud7s-projects`)
- **Company domain:** `am4less.com` still points at the old Duda site. DNS was deliberately **not** switched — that is a business decision pending the owner (see §10).
- **Build status:** typecheck + production build clean; deployed and smoke-tested.

### Routes

| Route | Page |
|---|---|
| `/` | Home — hero, proof strip, popular services, gallery teaser |
| `/services` | Full catalogue (bookable + coming-soon shadow cards), search, category filter |
| `/gallery` | Filterable masonry gallery of the company's real job photos, lightbox |
| `/about` | Company, values, coverage |
| `/training` | AM4LESS Academy (crew certification) |
| `/careers` | Join the crew |
| `/contact` | Contact/deadline form + WhatsApp/phone/email deep links |
| `/book` | **The booking wizard** (primary conversion flow) |
| `/account` | "My bookings" — saved leads on this device, crew plan per booking |
| `/settings` | Lead webhook URL, theme, install prompt |
| `*` | 404 |

---

## 2. Quick start

```bash
npm install
npm run dev        # http://localhost:5173 (host: true, so LAN/phone testing works)
npm run typecheck  # tsc --noEmit
npm run build      # typecheck && vite build  -> dist/
npm run preview    # serve dist/ locally
```

Node **20.19+ or 22.12+** (Vite 7 requirement; developed on Node 24).

Asset scripts (rarely needed, see §7):

```bash
npm run photos       # rebuild public/photos + src/domain/photos.generated.ts from photos-src/
npm run photos:sheet # contact sheets of photos-src/ for picking new photo slugs
npm run icons        # regenerate PWA icons from public/brand/logo-am4less.webp
```

**There are no automated tests in the repo.** Correctness is verified by typecheck, build, and
browser QA (see §9). Adding Vitest for the pure `src/domain/*` functions would be a good first task.

---

## 3. Two rules you must not break

These come directly from the business owner and are the most important context in this document.

### 3a. Only the 9 cleaning lines are bookable

The catalogue in `src/domain/services.ts` lists **18 lines**. The owner offers cleaning today;
construction, event-production, logistics and some deep-maintenance lines are marketed but
**not yet serviced**. Nine lines carry `comingSoon: true`.

- `BOOKABLE` (same file) = `SERVICES.filter(s => !s.comingSoon)` — use it anywhere you count or list what a customer can actually buy.
- `/services` shows coming-soon lines as greyed shadow cards ("Coming soon"), never selectable.
- The booking wizard never offers them: `ServicesStep` filters the category strip to categories that have a bookable line, and `useBooking.loadDraft()` silently drops any stale draft service id that is no longer bookable.
- Counts on Home, About, Training and the Services hero all read from `BOOKABLE.length` — do not hardcode "9".

**To launch a line:** delete its `comingSoon: true` in `services.ts`. The filter strip, counts,
wizard and job planner all pick it up automatically.

### 3b. No published prices until the owner sets a rate card

- `src/domain/config.ts` → `export const PUBLIC_PRICING = false`. **This is the single switch.**
- Real internal rates exist (owner's planning numbers, Bucks/Lehigh market) in each service's `pricing` field in `services.ts`. They are used by the estimator and by the job planner — they are never displayed.
- `estimateFor()` in `src/domain/estimate.ts` still computes real dollars. Its only consumer is the **webhook payload** (`estimateTotal`, `estimateMonthly` in `src/infrastructure/leadDelivery.ts`) — i.e. numbers go to the owner's own endpoint, never to the customer's screen.
- What the customer sees instead is the **JobPlan** from `jobPlanFor()`: crew size, crew-hours, hours on site, visits per month, "written price after a free survey". Rendered by `EstimatePanel`, `Account`, `ReviewStep`.
- **Rule of thumb: no `$` may appear in rendered UI while the flag is `false`.** Before shipping copy changes, grep the built output for dollars.
- When the owner finally publishes rates: flip the flag, then re-surface price blocks using `currency()` / `estimate.lines` — the plumbing is already there (`EstimatePanel` has the price branch behind the flag).

---

## 4. Architecture

Clean-architecture-ish layering, one-way dependencies: `pages → hooks → domain`, with
`infrastructure` as browser-side adapters. No backend, no server code.

```
src/
├── domain/            Pure business logic — no React, no browser APIs
│   ├── services.ts        18-line catalogue + rates + BOOKABLE / isBookable()
│   ├── categories.ts      6 categories (id, name, tagline, blurb)
│   ├── estimate.ts        estimateFor() [internal $] + jobPlanFor() [public scope] + add-ons
│   ├── booking.ts         draft -> Booking, reference generator (AM4-YY-XXXX), date fmt
│   ├── validation.ts      per-step + submit validation, used by the wizard
│   ├── faq.ts             FAQ content (10 entries, all de-priced)
│   ├── business.ts        phone / WhatsApp / email / hours / social / deep-link builders
│   ├── config.ts          PUBLIC_PRICING switch
│   ├── media.ts           named photo slots (SLOT_SLUGS) + gallery filters
│   ├── photos.generated.ts  GENERATED by npm run photos — never edit by hand
│   └── types.ts           Booking, BookingDraft, Estimate, enums, EMPTY_DRAFT
├── infrastructure/    Browser adapters (localStorage, fetch)
│   ├── stores.ts          draftStore / leadStore / themeStore  (am4:* keys)
│   ├── leadDelivery.ts    submitBooking(): save lead -> optional webhook POST
│   └── message.ts         plain-text booking summary for WhatsApp/SMS/email
├── hooks/             useBooking (wizard state machine + autosave), useTheme,
│                      useInstallPrompt (PWA), useReveal (scroll animations)
├── components/        Layout, Header, TabBar (mobile bottom nav), Button, Field, Photo,
│                      QuickQuote, Faq, + booking/ step components (Stepper, PropertyStep,
│                      ServicesStep, ScheduleStep, DetailsStep, ReviewStep, EstimatePanel,
│                      SuccessPanel, BookingSummary)
└── pages/             One file per route (see §1). All lazy-loaded.
```

Conventions in force: functions ≤ 50 lines, components ≤ 80 lines, files ≤ 200 lines;
`noUncheckedIndexedAccess` is ON (mind `array[0]` — it is `T | undefined`); no comments unless
the *why* is non-obvious. Styling is Tailwind v4 CSS-first (`@theme` in `src/index.css`), brand
palette in oklch derived from the logo (blue `#0000F0`, red `#BD3544`), semantic tokens only:
`text-ink`, `text-ink-soft`, `text-ink-faint`, `bg-surface`, `bg-surface-muted`, `border-line`,
`brand-*`, `accent-*`. Dark mode is a `[data-theme='dark']` custom variant.

### How a booking flows

1. `/book` wizard (3 steps) keeps everything in `useBooking` state.
2. Every change autosaves the draft to localStorage `am4:booking-draft` (350 ms debounce) — a refresh or dropped connection never loses the lead.
3. Submit → `buildBooking()` (validation + reference + snapshot of the estimate) → `submitBooking()`:
   - always saved to localStorage `am4:leads` (last 60 kept), visible on `/account`,
   - if a webhook URL is configured (`/settings`, key `am4:webhook-url`), POST the JSON payload,
   - on failure/absence the success panel still shows, with one-tap WhatsApp / SMS / email hand-off using the same message text.
4. `/account` lists saved bookings with a status chip (`draft` → `submitted`) and the JobPlan.

Webhook payload (flat JSON, `src/infrastructure/leadDelivery.ts` → `toPayload`): `reference`,
`source`, `name`, `phone`, `email`, `address`, `propertyType`, `squareFeet`, `frequency`,
`services[]`, `addons[]`, `preferredDate`, `preferredTime`, `accessNotes`, `message`, `consent`,
`estimateTotal`, `estimateMonthly`, `createdAt`. Any HTTPS endpoint works (Zapier, Make, n8n,
Apps Script, Supabase Edge Function, custom API). A future backend only needs to receive this.

---

## 5. Where to edit what

| Thing | File |
|---|---|
| Phone, email, hours, socials, area served | `src/domain/business.ts` — **email is a placeholder, see §10** |
| Services, descriptions, internal rates, coming-soon flags | `src/domain/services.ts` |
| Category names/blurbs | `src/domain/categories.ts` |
| FAQ entries | `src/domain/faq.ts` |
| Add-ons and their labour impact | `src/domain/estimate.ts` (`ADD_ONS`) |
| Crew-sizing heuristics | `src/domain/estimate.ts` (`jobPlanFor`, `TARGET_SHIFT`) |
| Photo slots used by pages | `src/domain/media.ts` (`SLOT_SLUGS`) |
| Brand colours, fonts, base styles | `src/index.css` |
| Nav items (header + mobile tab bar) | `src/components/Header.tsx`, `src/components/TabBar.tsx` |
| PWA manifest, icons, shortcuts, caching | `vite.config.ts` |
| Routes | `src/App.tsx` |

---

## 6. Brand assets

- Logo: `public/brand/logo-am4less.webp` (the owner's real logo; also used for icons).
- PWA icons generated from it by `npm run icons` (`scripts/make-icons.mjs`) — badge composited on a solid `#0000f0` field, maskable variants shrunk into the 80 % safe zone.
- OG/social image: `public/icons/og-square.png`, favicons in `public/icons/`.

---

## 7. Photo pipeline (real job photos)

The owner's photos come from the old site's gallery (`https://www.am4less.com/gallery`, Duda CDN).
**1060 px is the true source resolution ceiling** — do not expect larger.

- **Originals** (39 jpgs, ~3.3 MB) live in `photos-src/` in the repo so the pipeline is reproducible.
- `npm run photos` (`scripts/make-photos.mjs`) for each file in its `MAP`: writes `public/photos/{slug}.webp` (capped 1280 w, q70) and `{slug}-thumb.webp` (capped 640 w, q66), then regenerates `src/domain/photos.generated.ts` (slug, alt, category, w, h).
- The `MAP` also holds each photo's **alt text** — treat it as real content, it is the gallery's SEO.
- Pages never reference files directly: `src/domain/media.ts` maps named slots (`heroCrew`, `postConstruction`, `eventSetup`, …) to slugs. To change which photo a page shows, change the slug in `SLOT_SLUGS`.
- New photos from the owner: drop the files in `photos-src/`, add `MAP` entries, run `npm run photos`, update `SLOT_SLUGS` if a page should use one. `npm run photos:sheet` renders contact sheets to pick from.

---

## 8. PWA / service worker

Configured in `vite.config.ts` (`vite-plugin-pwa`, `generateSW`):

- `registerType: 'prompt'` + `skipWaiting: false` — a new deploy shows an in-app "update available" confirm instead of swapping under the user's feet. Keep it that way.
- `globIgnores: ['**/photos/**']` — the ~2.6 MB of job photos must **not** block install; they are runtime-cached `CacheFirst` for 180 days instead (`job-photos` cache).
- Google Fonts runtime-cached `CacheFirst` (1 year).
- Offline: app shell works offline; `/photos/` images appear once viewed.
- Manifest: standalone, portrait, shortcuts for **Book / Gallery / My bookings**, `id`, maskable icons.
- `sw.js` and `registerSW.js` are served with `must-revalidate` (see `vercel.json` + `public/_headers`) so update prompts actually fire.

---

## 9. Deploy runbook (Vercel)

Config: `vercel.json` (framework `vite`, SPA rewrite, cache/security headers) + `public/_redirects`
(`/*  /index.html  200`) + `public/_headers` (same headers for non-Vercel static hosts).

```bash
# from the project root
node --use-system-ca node_modules/vercel/dist/vc.js deploy --prod
```

- **`--use-system-ca` is required on Windows**: plain Node cannot verify Vercel's TLS chain with its bundled CA store and every command fails with `fetch failed`. (On macOS/Linux plain `npx vercel` works.)
- First run on a new machine: `vercel link` then `vercel login`. `.env.local` (holds a `VERCEL_OIDC_TOKEN`) and `.vercel/` are gitignored — **do not ship them in a handoff archive**; relink instead.
- **Never add `cleanUrls` back to `vercel.json`.** It shadows the SPA rewrite, and every deep link (`/book`, `/gallery`, …) returns 404. This was found the hard way once.
- Deployment protection is **on for preview URLs** (per-deployment URLs ask for Vercel login; the production alias is public). If clients need to preview staging builds, change it in the Vercel project settings.
- Any other static host (Netlify/Cloudflare Pages): deploy `dist/` with `_redirects` + `_headers` and everything behaves the same.

### QA checklist before shipping changes

1. `npm run typecheck && npm run build` clean.
2. **No `$` anywhere in rendered UI** (while `PUBLIC_PRICING` is false).
3. Coming-soon lines: visible as shadow cards on `/services`, impossible to select in the wizard.
4. 320 px viewport: no horizontal scroll (long emails/addresses wrap — `overflow-wrap` is set globally for this).
5. Both themes: check contrast (the project standard is WCAG AA 4.5:1 minimum; coming-soon cards were tuned to 7.4:1 light / 9.1:1 dark).
6. Tap targets ≥ 44 px on mobile; the bottom tab bar is the primary mobile nav.
7. Deep links (`/book`, `/gallery`) return the SPA through the rewrite, not 404.
8. Submit a test booking end-to-end; confirm `/account` shows it and the WhatsApp/SMS/email hand-off opens pre-filled.

---

## 10. Open items — require the owner's input

1. **Email address is invented.** `bookings@am4less.com` in `src/domain/business.ts` is a placeholder (the old site publishes no email). Confirm the real inbox or replace it before it goes on customer-facing material. Everything else in that file is real data scraped from am4less.com.
2. **DNS.** `am4less.com` still resolves to the Duda site. Pointing it at this deployment is a business call (and a Duda contract question).
3. **Old site content bug.** The live Duda About page still contains a line about "Natural Impression Landscaping" (template remnant). This project does not repeat it; the owner should fix or retire the old page.
4. **Rate card.** When the owner sets published rates, flip `PUBLIC_PRICING` (§3b).
5. **More photos.** The owner said more job photos are coming — pipeline is ready (§7).

---

## 11. What was handed over

Two channels, identical contents:

1. **GitHub** — https://github.com/7Dark7Cloud7/am4less-booking (private). Clone, `npm install`, `npm run dev`.
   To work on it, the developer needs to be added as a collaborator: repo **Settings → Collaborators → Add people**.
2. **ZIP** — `am4less-booking-handoff.zip` (the folder owner keeps locally), same tree, built with
   `node_modules/`, `dist/`, `dev-dist/`, `.vercel/` and `.env.local` excluded.

`.env.local` and `.vercel/` were deliberately **not** shared: they hold a `VERCEL_OIDC_TOKEN` and this
machine's Vercel link. On a new machine, `vercel login` + `vercel link` re-creates both. The Vercel project
itself (`am4less-booking`) can be handed over by transferring the project or adding the developer as a
team member — no tokens need to change hands.

---

## 12. Vibe coding with this repo

`AGENTS.md` at the repo root is read automatically by Qoder, Claude Code, Cursor and Copilot agent mode.
It carries the short version of §3 plus the code/deploy rules, so an AI assistant starts with the owner's
constraints instead of discovering them by breaking them.

Recommended first prompt for whoever takes this over:

> Read `AGENTS.md` and `HANDOFF.md` §3 before changing anything. Then <your task>. Keep `PUBLIC_PRICING`
> false, keep coming-soon lines unselectable, and finish only when `npm run typecheck && npm run build`
> passes and the checklist in `HANDOFF.md` §9 holds at 320 px in both themes.

The three things an assistant will get wrong if you don't stop it: (a) re-introducing dollar prices,
(b) letting a `comingSoon` line into the booking wizard or a count, (c) adding `cleanUrls` to `vercel.json`.
