import type { CapacitorConfig } from '@capacitor/cli'

/**
 * Native shell config. The web build stays the product — this only wraps `dist/` in an
 * Android/iWebView so the app can go on the Play Store. Generate the platforms with:
 *   npm run native:add
 */
const config: CapacitorConfig = {
  appId: 'com.am4less.booking',
  appName: 'AM4LESS',
  webDir: 'dist',
  backgroundColor: '#ffffff',
  android: {
    // The site is HTTPS-only; never loosen this for a native build.
    allowMixedContent: false,
    webContentsDebuggingEnabled: false
  },
  server: {
    androidScheme: 'https'
  }
}

export default config
