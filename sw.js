const CACHE = 'jimder-cache-v0';
const PRECACHE_URLS = [
    '/offline',
    '/176c4714b229b0ae6633.webp',
];
const channel = new BroadcastChannel('sw-messages');

self.addEventListener('install', function(event){
    event.waitUntil(caches.open(CACHE).then((cache) => {
       return cache.addAll(PRECACHE_URLS);
    }));
});

self.addEventListener('activate', function(event) {
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
    if(!event.request.url.startsWith('http')){ // our domain here (contains - not starts)
        return;
    }
    event.respondWith(caches.open(CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                if (!(event.request === '/isAuth'))
                return cachedResponse;
            }

            return fetch(event.request).then((response) => {
                if (event.request.method === 'GET') {
                    cache.put(event.request, response.clone());
                }

                return response;
            }).catch((error) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                channel.postMessage({offline: true});

                return new Response(`${error}`, {status: 408, statusText: 'offline'});
            });
        });
    }));
});

channel.addEventListener('message', (event) => {
    if (event.data.type === 'ERROR_OCCURRED') {
        channel.postMessage({cacheRevaluation: true});
        caches.open(CACHE).then((cache) => {
            cache.delete(event.data.filename);
        });
    }
});
