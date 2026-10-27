/**
 * `--mode native` builds ship inside the Capacitor WebView, where no service worker may run
 * (a precached /index.html survives APK updates). Vite aliases `virtual:pwa-register` here
 * because the PWA plugin is not loaded in that mode.
 */
export function registerSW(_options?: { onNeedRefresh?: () => void }): (reload?: boolean) => Promise<void> {
  return () => Promise.resolve()
}
