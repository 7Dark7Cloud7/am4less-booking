// Contact sheets of everything in photos-src/ — handy when choosing slugs for new shots.
// Usage: npm run photos:sheet  ->  photos-src/_sheet-a.jpg / _sheet-b.jpg
import sharp from 'sharp'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SRC = process.env.PHOTO_SRC ?? path.join(ROOT, 'photos-src')
const OUT = SRC
const TW = 400, TH = 267, LABEL = 34, COLS = 4

const files = readdirSync(SRC).filter((f) => f.endsWith('.jpg')).sort()

async function sheet(list, out) {
  const rows = Math.ceil(list.length / COLS)
  const W = COLS * TW, H = rows * (TH + LABEL)
  const ops = []
  for (const [i, f] of list.entries()) {
    const x = (i % COLS) * TW, y = Math.floor(i / COLS) * (TH + LABEL)
    const thumb = await sharp(path.join(SRC, f)).resize(TW, TH, { fit: 'cover' }).toBuffer()
    const name = f.replace(/\.jpg$/, '')
    const svg = Buffer.from(
      `<svg width="${TW}" height="${LABEL}"><rect width="${TW}" height="${LABEL}" fill="#111"/>` +
      `<text x="6" y="23" font-family="monospace" font-size="${name.length > 30 ? 15 : 19}" fill="#fff">${
        name.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      }</text></svg>`
    )
    ops.push({ input: thumb, left: x, top: y })
    ops.push({ input: svg, left: x, top: y + TH })
    ops.push({ input: Buffer.from(
      `<svg width="${TW}" height="${TH + LABEL}"><rect x="0.5" y="0.5" width="${TW - 1}" height="${TH + LABEL - 1}" fill="none" stroke="#0f0" stroke-width="3"/></svg>`
    ), left: x, top: y })
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: '#000' } })
    .composite(ops).jpeg({ quality: 88 }).toFile(out)
  console.log(out, list.length, `${W}x${H}`)
}

const half = Math.ceil(files.length / 2)
await sheet(files.slice(0, half), path.join(OUT, '_sheet-a.jpg'))
await sheet(files.slice(half), path.join(OUT, '_sheet-b.jpg'))
