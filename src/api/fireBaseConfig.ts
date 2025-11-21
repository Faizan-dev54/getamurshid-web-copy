import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function getDeviceToken(): Promise<string> {
  try {
    if (!('Notification' in window)) return 'web';
    if (Notification.permission === 'default') {
      const p = await Notification.requestPermission();
      if (p !== 'granted') return 'web';
    }
    if (Notification.permission !== 'granted') return 'web';
    let swRegistration: ServiceWorkerRegistration | undefined;
    if ('serviceWorker' in navigator) {
      try {
        swRegistration = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');
        if (!swRegistration) {
          swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        }
        await navigator.serviceWorker.ready;
      } catch (swErr) {
        console.warn('Service worker registration failed', swErr);
      }
    }

    const vapidKey = String(import.meta.env.VITE_FIREBASE_VAPID_KEY);
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: swRegistration });
    return token ?? 'web';
  } catch (err) {
    console.error('getDeviceToken error', err);
    return 'web';
  }
}

export function setupMessageListener() {
  try {
    onMessage(messaging, (payload) => {
      if (payload.notification) {
        new Notification(payload.notification.title || 'GetAMurshid', {
          body: payload.notification.body,
          icon: payload.notification.icon || '/logo.png',
        });
      }
    });
  } catch (e) {
    console.error('setupMessageListener error', e);
  }
}

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    } catch (e) {
      console.error('SW register failed', e);
    }
  }
}

export default { getDeviceToken, setupMessageListener, registerServiceWorker };