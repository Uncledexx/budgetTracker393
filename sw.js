const cacheName = "sipat-demo";
const assets = ["/", "index.html", "index.css", "index.js", "manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(cacheName).then(c => c.addAll(assets)));
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});