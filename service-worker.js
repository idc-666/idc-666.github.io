const CACHE_NAME = "v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "https://framerusercontent.com/images/mWvzExg6MygDc3XL3JG6kUXkM.png",
  "https://framerusercontent.com/images/rizRdHVJA7UrXDlGUEY6AgPuT0.png",
]

self.addEventListener("install", (e) => {
  console.log("[SW] Installing...")
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => { 
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener("activate", (e) => {
  console.log("[SW] Activating...")
  const cacheWhitelist = [CACHE_NAME]
  e.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key)
          }
        })
      )
    )
  )
})

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return (
        response ||
        fetch(e.request).catch(() => {
          if (e.request.mode === "navigate") {
            return caches.match("/")
          }
        })
      )
    })
  )
})
