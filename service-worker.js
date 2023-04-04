let CACHE_NAME = 'V1';
let urlsToCache = [
    './',
    './emulator.html',
    './export.html',
    './gb.html',
    './gba-2.html',
    './gba.html',
    './gbc.html',
    './gbindex.html',
    './index_beta.html',
    './index.html',
    './info.html',
    './info.html',
    './launcher.html',
    './launchpad.html',
    './n64.html',
    './n64.html',
    './nds.html',
    './nds2.html',
    './nes.html',
    './nesindex.html',
    './offline.html',
    './recommendations.html',
    './romindex.html',
    './segaMD.html',
    './settings.html',
    './snes.html',
    './testlaunch.html',
    './update.html'
  ];

self.addEventListener('install', function(event) {
// Perform install steps
// Perform install steps


    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});


self.addEventListener("activate", event => {
  // delete any unexpected caches
  event.waitUntil(
    caches
      .keys()
      .then(keys => keys.filter(key => key !== CACHE_NAME))
      .then(keys =>
        Promise.all(
          keys.map(key => {
            console.log(`Deleting cache ${key}`);
            return caches.delete(key);
          })
        )
      )
  );
});