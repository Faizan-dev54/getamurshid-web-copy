importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAjfawS7F5oeHFPZG34FQKrhd3weoHYfW8",
  authDomain: "get-a-murshid.firebaseapp.com",
  projectId: "get-a-murshid",
  storageBucket: "get-a-murshid.firebasestorage.app",
  messagingSenderId: "1032463433211",
  appId: "1:1032463433211:web:7931ba1bd2b29d39e91f5e",
  measurementId: "G-EKFEE19B5N"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'GetAMurshid';
  const options = {
    body: payload.notification?.body || '',
    icon: '/logo.png',
    badge: '/badge.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});