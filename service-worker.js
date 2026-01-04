const CACHE_NAME = "csplano-cache-v1";
const FILES_TO_CACHE = [
  "/csplano/",
  "/csplano/index.html",
  "/csplano/manifest.json",
  "/csplano/style.css",
  "/csplano/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
