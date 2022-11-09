const assets = [
    "/",
    "/assets/css/styles.css",
    "/assets/js/app",
    "https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap"
];

// EVENTS
self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache(assets);
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
});

// FUNCTIONS
const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
}

// Cache-first Strategy
const cacheFirst = async (request) => {
    const cacheResponse = await caches.match(request);
    return cacheResponse ? cacheResponse : fetch(request);
}
