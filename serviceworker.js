const assets = [
    "/",
    "/assets/css/styles.css",
    "/assets/js/app",
    "https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("assets").then( cache => {
            cache.addAll(assets);
        })
    );
});

// Cache-first Strategy
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.open("assets").then( cache => {
            cache.match(e.request).then(res => {
                if(res) {
                    return res;
                } else {
                    return fetch(e.request);
                }
            });
        })
    );
});
