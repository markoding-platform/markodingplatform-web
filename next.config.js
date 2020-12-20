const withPWA = require('next-pwa');
const withImages = require('next-images');
const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = withPWA(
  withImages({
    pwa: {
      disable: process.env.STAGE !== 'production',
      dest: 'public',
    },
    images: {
      domains: [
        'image.freepik.com',
        'skilvul-prod-01.s3.ap-southeast-1.amazonaws.com',
        'skilvul-dev-01.s3.ap-southeast-1.amazonaws.com',
        'inovasi.markoding.com',
      ],
      dest: 'public',
    },
    inlineImageLimit: false,
    fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    env: {
      TITLE: process.env.TITLE,
      WEB_URL: process.env.WEB_URL,
      MARKODING_API_URL: process.env.MARKODING_API_URL,
      SSO_WEB_URL: process.env.SSO_WEB_URL,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      FIREBASE_VAPID_KEY: process.env.FIREBASE_VAPID_KEY,
    },
    webpack(config) {
      return config;
    },
  })
);
