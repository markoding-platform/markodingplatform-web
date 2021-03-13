module.exports = [
  {
    urlPattern: /\/api\/.*$/i,
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'apis',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
];
