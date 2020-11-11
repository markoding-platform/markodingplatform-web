const withPWA = require('next-pwa');
const withImages = require('next-images');

module.exports = withPWA(withImages({
	pwa: {
		disable: !process.env.PRODUCTION,
		dest: 'public'
	},
	images: {
		domains: ['image.freepik.com'], // next/image for external link freepick just for dummy
		dest: 'public',
	},
	inlineImageLimit: false, // Base4/Data URL encoding is not supported when using the next/image
	fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
	env: {
		TITLE: process.env.TITLE,
		PRODUCTION: process.env.PRODUCTION,
	},
	webpack(config) {
		return config;
	},
}));
