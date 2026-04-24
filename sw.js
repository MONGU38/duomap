const CACHE = 'duomap-' + new Date().toISOString();
const urlsToCache = [
  '/duomap/',
  '/duomap/index.html',
  '/duomap/manifest.json',
  '/duomap/icon-192.png',
  '/duomap/icon-512.png'
];
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener('fetch', function(event) {
  if (event.request.url.includes('sw.js')) return;
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
