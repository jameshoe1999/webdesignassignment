// Set a name for the current cache
var cacheName = "offline-cache-v1.1";

// Default files to always cache
var CACHE_FILES = [
  "/",
  "./menu.html",
  "assets/css/animate-3.7.0.css",
  "assets/css/font-awesome-4.7.0.min.css",
  "assets/css/bootstrap-4.1.3.min.css",
  "assets/css/owl-carousel.min.css",
  "assets/css/jquery.datetimepicker.min.css",
  "assets/js/vendor/jquery-2.2.4.min.js",
  "assets/js/vendor/bootstrap-4.1.3.min.js",
  "assets/js/vendor/wow.min.js",
  "assets/js/vendor/owl-carousel.min.js",
  "assets/js/vendor/jquery.datetimepicker.full.min.js",
  "assets/js/vendor/jquery.nice-select.min.js",
  "assets/js/main.js",
  "assets/js/cart_bundle.js",
  "assets/images/cups/all-berry-bang-cup.png",
  "assets/images/cups/all-berry-bang-hero.png",
  "assets/images/cups/all-berry-bang-ingredient.png",
  "assets/images/cups/Banana-Buzz-cup.png",
  "assets/images/cups/Banana-Buzz-hero.png",
  "assets/images/cups/Banana-Buzz-ingredient.png",
  "assets/images/cups/Berry-Crush-cup.png",
  "assets/images/cups/Berry-Crush-hero.png",
  "assets/images/cups/Berry-Crush-ingredient.png",
  "assets/images/cups/cup-shadow.png",
  "assets/images/cups/Energiser-Blend-cup.png",
  "assets/images/cups/Energiser-Blend-hero.png",
  "assets/images/cups/Energiser-Blend-ingredient.png",
  "assets/images/cups/fruit-background.jpg",
  "assets/images/cups/Immunity-Juice-cup.png",
  "assets/images/cups/Immunity-Juice-hero.png",
  "assets/images/cups/Immunity-Juice-ingredient.png",
  "assets/images/cups/Two-and-Five-Juice-cup.png",
  "assets/images/cups/Two-and-Five-Juice-hero.png",
  "assets/images/cups/Two-and-Five-Juice-ingredient.png",
  "assets/images/logo/logo.png",
  "assets/images/about-bg.jpg",
  "assets/images/banner-bg.jpg",
  "assets/images/menu-bg(1).jpg",
  "assets/images/table-bg(1).jpg",
  "assets/images/food-bg.png",
  "assets/fonts/fontawesome-webfont.woff2?v=4.7.0",
  "assets/fonts/fontawesome-webfont.woff?v=4.7.0",
  "assets/fonts/fontawesome-webfont.ttf?v=4.7.0",
]


self.addEventListener("install", function (e) {
  console.log("[ServiceWorker] Installed");
  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    // Open the cache
    caches.open(cacheName).then(function (cache) {
      // Add all the default files to the cache
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(CACHE_FILES);
    })
  ); // end e.waitUntil
});


self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activated");
  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        // If a cached item is saved under a previous cacheName
        if (thisCacheName !== cacheName) {
          // Delete that cached file
          return caches.delete(thisCacheName);
        }
      }));
    })
  ); // end e.waitUntil
});


self.addEventListener("fetch", function (e) {
  // e.respondWidth Responds to the fetch event
  e.respondWith(
    // Check in cache for the request being made
    caches.match(e.request)
      .then(function (response) {
        // If the request is in the cache
        if (response) {
          return response; // Return the cached version
        }
        return fetch(e.request);
      }) // end caches.match(e.request)
  ); // end e.respondWith
});
