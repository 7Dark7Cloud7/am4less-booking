# AM4LESS Booking

Marketing site + online booking app for **AM4LESS**, a commercial & residential cleaning company in Quakertown, PA.

Live production: **https://am4less-booking.vercel.app**
Source: **https://github.com/7Dark7Cloud7/am4less-booking** (public)
(The company domain `am4less.com` still points at the old Duda site — untouched.)

## What it does

- Bookable online quoting wizard (space → services → schedule → contact) with autosaving drafts
- Lead capture with zero backend: leads are stored on-device and handed off via WhatsApp / SMS / email, or POSTed to an optional webhook
- Job-plan output instead of prices: crew size, labour hours on site, visit cadence
- Installable PWA (Android/iOS), dark/light themes, gallery of the company's real job photos

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build to dist/
npm run preview    # serve the built app
```

Node 20.19+ or 22.12+ required (Vite 7).

## Two rules before you change anything

1. **Only the 9 cleaning lines are bookable.** The other 9 catalogue lines carry `comingSoon: true` in `src/domain/services.ts` and render as shadow "coming soon" cards. Remove the flag to launch one.
2. **No published prices.** `PUBLIC_PRICING` in `src/domain/config.ts` is `false` until the owner agrees a rate card. The estimator exists and runs, but its dollar output must never be rendered in the UI while the flag is off.

Full details, architecture map and deploy runbook: **[HANDOFF.md](./HANDOFF.md)**.
