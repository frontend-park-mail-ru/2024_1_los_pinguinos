const CACHE = 'jimder-cache-v0';

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
    if(!event.request.url.startsWith('http')){
        return;
    }
    event.respondWith(caches.open(CACHE).then((cache) => {
        return fetch(event.request).then((response) => {
            if (event.request.method === 'GET') {
                cache.put(event.request, response.clone()).catch(error => error);
            }

            return response;
            },
        ).catch((error) => {
            error;

            return cache.match(event.request).then((res) => {
                if (res) {
                    return cache.match(event.request);
                }
                else {
                    return new Response('You are offline', { status: 408, statusText: 'offline' });
                }
            });
        });
    }));
});
