const assets = [
    "/".
    "assets/css/styles.css",
    "assets/js/app"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("assets").then( cache => {
            cache.addAll(assets);
        });
    );
});

// Cache-first Strategy
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open("assets").then( cache => {
            cache.match(event.request).then(res => {
                if(res) {
                    return res;
                } else {
                    return fetch(event.request);
                }
            });
        });
    );
});
