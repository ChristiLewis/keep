const APP_PREFIX = 'keep-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [

    "./index.html",
    "./manifest.json",
    "./css/styles.css",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png",
    "./js/idb.js",
    "./js/index.js"
];

console.log("Hi from your service-worker.js file!!");

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});


self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheKeepList.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    );
});

//ADD FETCHING LOG TO TRACK AND RETURN RESOURCES
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                //IF CACHE = AVAIL --> CONSOLE MESSAGE
                console.log('responding with cache : ' + e.request.url)
                return request
            }
            else {
                //IF CACHE = !AVAIL---->FETCH REQ
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }
            //REFACTORED CODE OF THE ABOVE
            // return request || fetch(e.request)
        })
    )
})