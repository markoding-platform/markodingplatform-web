const withPWA = require('next-pwa');
const withImages = require('next-images');

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  images: {
    domains: ['articles.kalcare.com'],
    dest: 'public',
  },
});

module.exports = withImages({
  inlineImageLimit: false, // Base4/Data URL encoding is not supported when using the next/image
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  webpack(config) {
    return config;
  },
});
