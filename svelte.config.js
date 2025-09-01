import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'], // Tell SvelteKit to recognize .md files

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'] // Tell Mdsvex to handle .md files
		})
	],

	kit: {
		adapter: adapter() // Keep the node adapter from our previous fix
	}
};

export default config;
