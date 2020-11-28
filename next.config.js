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
      ],
      dest: 'public',
    },
    inlineImageLimit: false,
    fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    env: {
      TITLE: process.env.TITLE,
      BRANCH: process.env.BRANCH,
      SECRET: process.env.SECRET,
    },
    webpack(config) {
      return config;
    },
  })
);
