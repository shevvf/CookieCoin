const cacheName = "kiippl-CookieClicker-1.0";
const contentToCache = [
    "Build/5b9d7702d77d0846765a43fd0d996b9a.loader.js",
    "Build/b23df975f8e5254d744e590fde34094d.framework.js.unityweb",
    "Build/efa52e190ec40ecc1847188b1d917688.data.unityweb",
    "Build/c8c6fb337f4579c9fface19ee25385fa.wasm.unityweb",
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
