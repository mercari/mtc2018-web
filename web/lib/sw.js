console.log('service worker loaded');

// Enable Offline Google Analytics and Google Maps
workbox.googleAnalytics.initialize();
workbox.routing.registerRoute(
  new RegExp('^https://maps.googleapis.com/maps/api/js*'),
  workbox.strategies.staleWhileRevalidate()
);
