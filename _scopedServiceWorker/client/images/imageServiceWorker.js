var CACHE_NAME = 'scoped-service-workers-images';
var URLS_TO_CACHE = [
    '/images',
    '/images/img1.png',
    '/images/img2.png',
    '/images/img3.png',
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

self.addEventListener('fetch', function (event) {
    console.log(event, 'image worker');
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    console.log('fetch with image worker', response);
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {
                        console.log('response', response)
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        console.log('save to cache', response)
                        return caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                    }
                );
            })
    );
});