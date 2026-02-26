// public/service-worker.js
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting()); // Activate the service worker immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // Take control of all clients
});

self.addEventListener("push", (event) => {
  const data = event.data?.json();
  const { title, body } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icons/icon-192x192.png", // Add your app icon
      badge: "/icons/badge-72x72.png" // Add your badge icon
    })
  );
});
