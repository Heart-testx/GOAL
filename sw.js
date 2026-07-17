// SaveGoal - minimal service worker
// Purpose: lets the app show notifications via registration.showNotification(),
// and brings the app to the front when a notification is tapped.
// NOTE: this does NOT implement server-sent Web Push (that needs a backend +
// the Push API with a VAPID key). It only supports local, in-browser reminders
// triggered while the app/tab has been opened recently. See index.html for details.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
