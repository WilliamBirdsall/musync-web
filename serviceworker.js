const assets = [
    "/",
    "assets/css/styles.css",
    "assets/js/app",
    "https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("assets").then( cache => {
            cache.addAll(assets);
        })
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
