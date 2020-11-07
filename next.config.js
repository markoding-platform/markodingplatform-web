const withPWA = require('next-pwa');
const withImages = require('next-images');

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
});

module.exports = withImages({
	webpack(config) {
		return config;
	},
});
