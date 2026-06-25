// Service worker for the family grocery list app.
// Strategy: cache-first for the app shell (HTML + manifest + icon),
// so the app loads instantly and works offline.
// Firebase SDK (gstatic.com) and Firestore API traffic are not intercepted —
// Firestore offline persistence (IndexedDB) handles data availability offline.

const CACHE = 'grocery-v1';
const SHELL = ['/', '/manifest.json', '/icon.svg'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Remove old cache versions on update
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Only intercept same-origin GET requests
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // Serve from cache immediately; revalidate in background
      const network = fetch(event.request).then(response => {
        if (response.ok) {
          caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      });
      return cached || network;
    })
  );
});
