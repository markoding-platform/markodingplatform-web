const withPWA = require('next-pwa');
const withImages = require('next-images');

module.exports = withPWA(withImages({
	pwa: {
		dest: 'public'
	},
	images: {
		domains: ['image.freepik.com'],
		dest: 'public',
	}
}));
