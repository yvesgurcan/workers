const CACHE_NAME = 'service-worker-lifecycle';
const URLS_TO_CACHE = [
    '/',
    '/main.css',
    '/main.js'
];

const addAllToCache = async (urls) => {
    const cache = await caches.open(CACHE_NAME)
    return await cache.addAll(urls);
}

self.addEventListener('install', event => {
    console.log('install');
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
    console.log('fetch');
    event.respondWith(handleFetchRequest(event));
});