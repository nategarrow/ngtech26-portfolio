import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'@atomic': 'src/atomic/',
			'@components': 'src/atomic/components/',
			'@molecules': 'src/atomic/molecules/',
			'@layout': 'src/atomic/layout/',
			'@lib': 'src/lib/',
			'@types': 'src/lib/types/',
			'@styles': 'src/styles/',
		},
	},
};

export default config;
