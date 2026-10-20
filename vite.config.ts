import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'prompt',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'generateSW',
        navigateFallback: '/index.html'
      },
      includeAssets: [
        'icons/favicon-32.png',
        'icons/favicon-192.png',
        'icons/apple-touch-icon.png',
        'brand/logo-am4less.webp'
      ],
      manifest: {
        id: '/',
        name: 'AM4LESS Cleaning — Book & Get Quotes',
        short_name: 'AM4LESS',
        description:
          'Book commercial and residential cleaning, get instant estimates, and manage recurring service. Serving Quakertown, PA and all of Pennsylvania.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['window-title-controls', 'standalone'],
        orientation: 'portrait-primary',
        background_color: '#050b2e',
        theme_color: '#0000f0',
        lang: 'en-US',
        categories: ['business', 'productivity', 'lifestyle'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        shortcuts: [
          { name: 'Book a cleaning', short_name: 'Book', url: '/book', description: 'Start a new booking' },
          { name: 'See our work', short_name: 'Gallery', url: '/gallery', description: 'Photos from real job sites' },
          { name: 'My bookings', short_name: 'Bookings', url: '/account', description: 'View saved bookings' }
        ],
        protocols: [{ protocol: 'https', url_template: 'https://www.am4less.com/book?source=pwa' }],
        edge_side_panel: { preferred_width: 420 },
        screenshots: [{ src: 'icons/og-square.png', sizes: '640x640', type: 'image/png', label: 'AM4LESS booking app' }]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2,webmanifest}'],
        // 2.6 MB of job photos must not block install; they cache on first view instead.
        globIgnores: ['**/photos/**'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /\/photos\/[a-z0-9-]+\.webp$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'job-photos',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2022',
    cssTarget: 'chrome120',
    sourcemap: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: { port: 5173, host: true }
})
