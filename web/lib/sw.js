importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

console.log('service worker loaded');

// Enable Offline Google Analytics and Google Maps
workbox.googleAnalytics.initialize();
workbox.routing.registerRoute(
  new RegExp('^https://maps.googleapis.com/maps/api/js*'),
  workbox.strategies.staleWhileRevalidate()
);
