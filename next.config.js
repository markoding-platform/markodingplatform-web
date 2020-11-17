const withPWA = require('next-pwa');
const withImages = require('next-images');
const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = withPWA(
  withImages({
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public',
    },
    images: {
      domains: ['image.freepik.com'], // next/image for external link freepick just for dummy
      dest: 'public',
    },
    inlineImageLimit: false,
    fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    env: {
      TITLE: process.env.TITLE,
    },
    webpack(config) {
      return config;
    },
  })
);
