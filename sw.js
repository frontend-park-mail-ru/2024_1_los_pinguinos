const CACHE = 'jimder-cache-v18';
const PRECACHE_URLS = ['/offline', '/176c4714b229b0ae6633.webp'];

const NETWORK_ONLY = ['isAuth', 'cards', 'getAllChats'];

const checkNetOnly = (path) => {
    for (const p of NETWORK_ONLY) {
        if (path.toLowerCase().includes(p.toLowerCase())) {
            return true;
        }
    }

    return false;
};

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        }),
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then((cacheKeys) => {
            return Promise.all(
                cacheKeys.map((currentCache) => {
                    if (currentCache !== CACHE) {
                        return caches.delete(currentCache);
                    }
                }),
            );
        }),
    );
});

self.addEventListener('fetch', async (event) => {
    if (!event.request.url.startsWith('http')) {
        // our domain here (contains - not starts)
        return;
    }
    event.respondWith(
        caches.open(CACHE).then(async (cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    if (!checkNetOnly(event.request.url)) {
                        return cachedResponse;
                    }
                }

                return fetch(event.request)
                    .then((response) => {
                        if (event.request.method === 'GET' && response.ok) {
                            cache.put(event.request, response.clone());
                        }

                        return response;
                    })
                    .catch((error) => {
                        if (cachedResponse) return cachedResponse;
                        self.clients.matchAll().then((clients) => {
                            clients.forEach((client) => {
                                client.postMessage({
                                    offline: true,
                                    error: error,
                                });
                            });
                        });
                    });
            });
        }),
    );
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'ERROR_OCCURRED') {
        self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
                client.postMessage({ cacheRevalidation: true });
            });
        });
        caches.open(CACHE).then((cache) => {
            cache.delete(event.data.filename);
        });
    }
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
