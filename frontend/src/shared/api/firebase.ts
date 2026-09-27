import { env, isFirebaseConfigured } from '@/shared/config'

/**
 * Firebase en el frontend solo se usa para Analytics (Hosting no necesita SDK).
 * Se importa de forma diferida para no cargar ~150 kB en el primer render.
 */
export async function initAnalytics() {
  if (!isFirebaseConfigured || !env.VITE_FIREBASE_MEASUREMENT_ID || import.meta.env.DEV) return
  const [{ initializeApp, getApps, getApp }, { getAnalytics, isSupported }] = await Promise.all([
    import('firebase/app'),
    import('firebase/analytics'),
  ])
  if (!(await isSupported())) return
  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: env.VITE_FIREBASE_API_KEY,
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.VITE_FIREBASE_APP_ID,
        measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
      })
  getAnalytics(app)
}
