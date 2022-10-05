const cacheName = 'cache-insects';

// When the browser reads this for the 1st time, it caches all the files mentioned in the list //

self.addEventListener('install', function(event) {
 event.waitUntil(
    caches.open(cacheName).then(function(cache) {
        return cache.addAll(['/insects/', '/insects/index.html', '/insects/butterflies.jpg', '/insects/butterfly.jpg', '/insects/dragonfly.jpg']);
        })
    );
});

// If the user requests a ressource (file, HTMl, image, JavaScript, etc...) then look for it online. If NOT available online, get the file from the cache
self.addEventListener('fetch', function(event) {
 event.respondWith(
    fetch(event.request).catch(() =>
        caches.open(cacheName).then(cache => cache.match(event.request))
        )
    );
});