const cacheName = "kiippl-CookieClicker-1.0";
const contentToCache = [
    "Build/66111aa68dab7f57170d26b3463b70e4.loader.js",
    "Build/f9b087cc67ed62bd38c2a172fd0a5203.framework.js.unityweb",
    "Build/5befeddbfbe40014545f80364eec3694.data.unityweb",
    "Build/92625fa1492d671e667dbdadda48b15a.wasm.unityweb",
    "Graphics/loading-screen.css",
    "Graphics/main.css",
    "Graphics/unity-canvas.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
