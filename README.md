# AM4LESS Booking

![CI](https://github.com/7Dark7Cloud7/am4less-booking/actions/workflows/ci.yml/badge.svg)

Marketing site + online booking app for **AM4LESS**, a commercial cleaning company in Quakertown, PA.

Live production: **https://am4less-booking.vercel.app**
Source: **https://github.com/7Dark7Cloud7/am4less-booking** (public)
(The company domain `am4less.com` still points at the old Duda site — untouched.)

## What it does

- Bookable online quoting wizard (space → services → schedule → contact) with autosaving drafts
- Lead capture with zero backend: leads are stored on-device and handed off via WhatsApp / SMS / email, or POSTed to an optional webhook
- Job-plan output instead of prices: crew size, labour hours on site, visit cadence
- Installable PWA (Android/iOS), dark/light themes, gallery of the company's real job photos
- Editorial dark home page; optional Capacitor Android wrapper (`npm run native:apk`)

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run test       # vitest run — the domain rules suite (src/domain/*.test.ts)
npm run build      # typecheck + production build to dist/
npm run preview    # serve the built app

npm run native:apk # build + sync + assembleDebug (needs JDK 21 + Android SDK)
```

Node 20.19+ or 22.12+ required (Vite 7).

## Two rules before you change anything

1. **Only the 7 cleaning lines are bookable.** The other 4 catalogue lines carry `comingSoon: true` in `src/domain/services.ts` and render as shadow "coming soon" cards. Remove the flag to launch one. Post-construction, specialized transport and residential/apartment work were retired on 2026-10-27 and are not in the catalogue at all — the company is commercial only.
2. **No published prices.** `PUBLIC_PRICING` in `src/domain/config.ts` is `false` until the owner agrees a rate card. The estimator exists and runs, but its dollar output must never be rendered in the UI while the flag is off.

Full details, architecture map and deploy runbook: **[HANDOFF.md](./HANDOFF.md)**.

## Licence

Proprietary. The repository is public so a developer can pick the project up — it is not open source.
All rights reserved by AM4LESS; no licence is granted to copy, redistribute, or reuse this code or the
brand assets in `public/brand/` without the owner's written permission.
