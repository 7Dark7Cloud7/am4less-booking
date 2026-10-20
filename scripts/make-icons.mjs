import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const LOGO = 'public/brand/logo-am4less.webp'
const BLUE = '#0000f0'

mkdirSync('public/icons', { recursive: true })

/**
 * The supplied badge is a circle on a light ground. On an Android launcher it
 * sits on arbitrary wallpaper, so every icon is composited onto a solid brand
 * field. Maskable variants shrink the badge into the 80% safe zone so the
 * launcher's circular crop never clips the red ring or the wordmark.
 */
async function render(name, size, scale, { bleed = true, round = false } = {}) {
  const logo = await sharp(LOGO).resize(Math.round(size * scale)).png().toBuffer()

  const over = [{ input: logo, gravity: 'centre' }]
  if (round) {
    const rx = Math.round(size * 0.22)
    const mask = await sharp(
      Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
           <rect width="${size}" height="${size}" rx="${rx}" fill="#fff"/>
         </svg>`
      )
    )
      .png()
      .toBuffer()
    // dest-in must arrive in the same composite call: sharp replaces, not appends.
    over.push({ input: mask, blend: 'dest-in' })
  }

  await sharp({ create: { width: size, height: size, channels: 4, background: bleed ? BLUE : '#ffffff' } })
    .composite(over)
    .png({ palette: true, quality: 92 })
    .toFile(`public/icons/${name}`)
  console.log(`wrote ${name.padEnd(24)} ${size}x${size}  badge-scale=${scale}`)
}

await render('icon-192.png', 192, 0.86, { round: true })
await render('icon-512.png', 512, 0.86, { round: true })
await render('icon-maskable-192.png', 192, 0.6)
await render('icon-maskable-512.png', 512, 0.6)
await render('apple-touch-icon.png', 180, 0.9)

await render('favicon-192.png', 192, 0.94, { round: true })

// At 32px the badge's ring text is unreadable, so the tab icon uses the lion.
const src = await sharp(LOGO).metadata()
const cw = Math.round(src.width * 0.46)
const ch = Math.round(src.height * 0.46)
await sharp(LOGO)
  .extract({
    left: Math.round((src.width - cw) / 2),
    top: Math.round((src.height - ch) / 2) + 3,
    width: cw,
    height: ch
  })
  .resize(32, 32)
  .flatten({ background: BLUE })
  .png({ palette: true })
  .toFile('public/icons/favicon-32.png')
console.log('wrote favicon-32.png              32x32  lion crop')

// Social preview: the badge needs an opaque ground —og: readers flatten alpha.
await render('og-square.png', 640, 0.78)

console.log('icons + brand exports complete')
