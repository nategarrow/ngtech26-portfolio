import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@components': 'src/lib/components/',
			'@lib': 'src/lib/',
			'@molecules': 'src/lib/molecules/',
			'@styles': 'src/lib/styles/',
			'@types': 'src/lib/types/',
		},
	},
};

export default config;
