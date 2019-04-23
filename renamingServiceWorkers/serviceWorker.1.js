const CACHE_NAME = 'service-worker-lifecycle';
const URLS_TO_CACHE = [
    '/',
    '/main.css',
    '/main.js'
];

const addAllToCache = async (urls) => {
    console.log('add')
    const cache = await caches.open(CACHE_NAME)
    return await cache.addAll(urls);
}

self.addEventListener('install', event => {
    self.skipWaiting();
    return event.waitUntil(addAllToCache(URLS_TO_CACHE))
});

const handleFetchRequest = async (event) => {
    const result = await caches.match(event.request)
    if (result) {
        return result;
    }

    const response = await fetch(event.request)
    return response;
}

self.addEventListener('fetch', event => {
    event.respondWith(handleFetchRequest(event));
});