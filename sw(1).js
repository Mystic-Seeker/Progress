// Service Worker for Weekly Progress Tracker with Notifications (v8 - Network-First)
const CACHE_NAME = 'weekly-tracker-v10';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn('Cache add skipped for:', url, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Network-First for HTML & JS so updates appear immediately without cache staleness
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  if (e.request.mode === 'navigate' || url.includes('app.js') || url.endsWith('.html') || url.endsWith('/')) {
    e.respondWith(
      fetch(e.request)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return networkRes;
        })
        .catch(() => caches.match(e.request).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Cache-First for images, icons, and manifest
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return (
        cached ||
        fetch(e.request).then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return networkRes;
        })
      );
    })
  );
});

// ---- Background 1-hour reminders (works when the browser wakes the worker) ----
function swOpenDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('progress-reminders', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('kv');
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function swGet(db, key) {
  return new Promise((resolve) => {
    const r = db.transaction('kv').objectStore('kv').get(key);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => resolve(undefined);
  });
}
function swSet(db, key, value) {
  return new Promise((resolve) => {
    const tx = db.transaction('kv', 'readwrite');
    tx.objectStore('kv').put(value, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => resolve(false);
  });
}

async function checkRemindersInWorker() {
  try {
    if (self.Notification && Notification.permission !== 'granted') return;
    const db = await swOpenDB();
    const allEvents = (await swGet(db, 'events')) || {};
    const notified = (await swGet(db, 'notified')) || [];

    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const todays = allEvents[key] || [];
    let changed = false;

    for (const evt of todays) {
      if (evt.completed || !evt.time || evt.alertOneHour === false) continue;
      if (evt.notified || notified.includes(evt.id)) continue;
      const [h, m] = evt.time.split(':').map(Number);
      const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
      const diffMin = Math.floor((eventTime - now) / 60000);
      if (diffMin <= 60 && diffMin >= 0) {
        const hour12 = h % 12 || 12;
        const label = `${hour12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
        await self.registration.showNotification(`⏰ 1-Hour Reminder: ${evt.title}`, {
          body: `Event starts in ${diffMin} minutes (at ${label})!`,
          icon: 'icon-192.png',
          badge: 'icon-192.png',
          vibrate: [250, 100, 250, 100, 300],
          tag: 'event-' + evt.id,
          renotify: true,
          requireInteraction: true
        });
        notified.push(evt.id);
        changed = true;
      }
    }
    if (changed) await swSet(db, 'notified', notified);
  } catch (err) {
    console.warn('Worker reminder check failed', err);
  }
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-reminders') {
    event.waitUntil(checkRemindersInWorker());
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'check-reminders') {
    event.waitUntil(checkRemindersInWorker());
  }
});

// Handle notification click to open the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});
