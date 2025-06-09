self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "https://framerusercontent.com/images/mWvzExg6MygDc3XL3JG6kUXkM.png",
        "https://framerusercontent.com/images/rizRdHVJA7UrXDlGUEY6AgPuT0.png"
      ])
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
