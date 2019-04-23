var CACHE_NAME = 'scoped-service-workers-global';
var URLS_TO_CACHE = [
    '/',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});